package com.paf.skillshare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.paf.skillshare.model.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByPostId(Long postId);
    Optional<Like> findByUserIdAndPostId(Long userId, Long postId);
}
