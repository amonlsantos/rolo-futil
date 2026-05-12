package com.amonlsantos.rolo_futil.services;

import com.amonlsantos.rolo_futil.domain.CreatePostRequest;
import com.amonlsantos.rolo_futil.domain.UpdatePostRequest;
import com.amonlsantos.rolo_futil.domain.entities.Post;
import com.amonlsantos.rolo_futil.domain.entities.User;

import java.util.List;
import java.util.UUID;

public interface PostEditorService {

    Post writePost(User user, CreatePostRequest request);

    Post editPost(User user, UUID postId, UpdatePostRequest request);

    Post publishPost(User user, UUID postId);

    Post unpublishPost(User user, UUID postId);

    void deletePost(User user, UUID postId);

    List<Post> viewDrafts(User user);
}
