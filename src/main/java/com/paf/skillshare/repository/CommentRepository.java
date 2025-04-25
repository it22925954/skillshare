package com.paf.skillshare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.paf.skillshare.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostId(Long postId);
}