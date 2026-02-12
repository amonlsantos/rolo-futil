package com.amonlsantos.rolo_futil.repositories;

import com.amonlsantos.rolo_futil.domain.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
}
