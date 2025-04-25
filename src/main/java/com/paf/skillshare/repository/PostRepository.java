package com.paf.skillshare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.paf.skillshare.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserId(Long userId);
}
