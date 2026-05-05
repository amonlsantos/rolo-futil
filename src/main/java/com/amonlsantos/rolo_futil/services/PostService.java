package com.amonlsantos.rolo_futil.services;

import com.amonlsantos.rolo_futil.domain.CreatePostRequest;
import com.amonlsantos.rolo_futil.domain.UpdatePostRequest;
import com.amonlsantos.rolo_futil.domain.entities.Post;
import com.amonlsantos.rolo_futil.domain.entities.User;

import java.util.List;
import java.util.UUID;

public interface PostService {
    Post getPost(UUID id);
    List<Post> getAllPosts(UUID categoryId, UUID tagId);
    List<Post> getDraftPosts(User user);
    Post createPost(User user, CreatePostRequest createPostRequest);
    Post updatePost(UUID id, UpdatePostRequest updatePostRequest);
    void deletePost(UUID id);
}
