package com.paf.skillshare.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf.skillshare.model.Like;
import com.paf.skillshare.model.Post;
import com.paf.skillshare.model.User;
import com.paf.skillshare.repository.LikeRepository;
import com.paf.skillshare.repository.PostRepository;
import com.paf.skillshare.repository.UserRepository;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public Like likePost(Long userId, Long postId) {
        if (likeRepository.findByUserIdAndPostId(userId, postId).isPresent()) {
            throw new RuntimeException("User already liked this post");
        }

        User user = userRepository.findById(userId).orElseThrow();
        Post post = postRepository.findById(postId).orElseThrow();

        Like like = Like.builder()
                .user(user)
                .post(post)
                .likedAt(LocalDateTime.now())
                .build();

        return likeRepository.save(like);
    }

    public void unlikePost(Long userId, Long postId) {
        Like like = likeRepository.findByUserIdAndPostId(userId, postId)
                .orElseThrow(() -> new RuntimeException("Like not found"));

        likeRepository.delete(like);
    }

    public List<Like> getLikesForPost(Long postId) {
        return likeRepository.findByPostId(postId);
    }
}
