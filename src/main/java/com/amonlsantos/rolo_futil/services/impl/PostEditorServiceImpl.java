package com.amonlsantos.rolo_futil.services.impl;

import com.amonlsantos.rolo_futil.domain.CreatePostRequest;
import com.amonlsantos.rolo_futil.domain.PostStatus;
import com.amonlsantos.rolo_futil.domain.UpdatePostRequest;
import com.amonlsantos.rolo_futil.domain.entities.Post;
import com.amonlsantos.rolo_futil.domain.entities.User;
import com.amonlsantos.rolo_futil.services.AuthorizationService;
import com.amonlsantos.rolo_futil.services.PostEditorService;
import com.amonlsantos.rolo_futil.services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.amonlsantos.rolo_futil.domain.Permission.*;

@Service
@RequiredArgsConstructor
public class PostEditorServiceImpl implements PostEditorService {

    private final PostService postService;
    private final AuthorizationService authorizationService;

    @Override
    @Transactional
    public Post writePost(User user, CreatePostRequest request) {
        authorizationService.checkPermission(user.getId(), POST_CREATE);
        return postService.createPost(user, request);
    }

    @Override
    @Transactional
    public Post editPost(User user, UUID postId, UpdatePostRequest request) {
        Post existing = postService.getPost(postId);

        if (isOwner(existing, user)) {
            authorizationService.checkPermission(user.getId(), POST_EDIT_OWN);
        } else {
            authorizationService.checkPermission(user.getId(), POST_EDIT_ANY);
        }

        return postService.updatePost(postId, request);
    }

    @Override
    @Transactional
    public Post publishPost(User user, UUID postId) {
        authorizationService.checkPermission(user.getId(), POST_PUBLISH);

        Post post = postService.getPost(postId);
        post.setStatus(PostStatus.PUBLISHED);

        return postService.updatePost(postId, toUpdateRequest(post));
    }

    @Override
    @Transactional
    public Post unpublishPost(User user, UUID postId) {
        authorizationService.checkPermission(user.getId(), POST_PUBLISH);

        Post post = postService.getPost(postId);
        post.setStatus(PostStatus.DRAFT);

        return postService.updatePost(postId, toUpdateRequest(post));
    }

    @Override
    @Transactional
    public void deletePost(User user, UUID postId) {
        authorizationService.checkPermission(user.getId(), POST_DELETE);
        postService.deletePost(postId);
    }

    @Override
    public List<Post> viewDrafts(User user) {
        authorizationService.checkPermission(user.getId(), POST_VIEW_DRAFTS);
        return postService.getDraftPosts(user);
    }

    private boolean isOwner(Post post, User user) {
        return post.getAuthor().getId().equals(user.getId());
    }

    private UpdatePostRequest toUpdateRequest(Post post) {
        return UpdatePostRequest.builder()
                .title(post.getTitle())
                .content(post.getContent())
                .status(post.getStatus())
                .categoryId(post.getCategory().getId())
                .tagIds(post.getTags().stream()
                        .map(tag -> tag.getId())
                        .collect(Collectors.toSet()))
                .build();
    }
}
