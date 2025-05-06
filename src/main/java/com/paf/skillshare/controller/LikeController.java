package com.paf.skillshare.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paf.skillshare.model.Like;
import com.paf.skillshare.service.LikeService;

@RestController
@RequestMapping("/api/likes")
@CrossOrigin("*")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("/user/{userId}/post/{postId}")
    public ResponseEntity<Like> likePost(@PathVariable Long userId, @PathVariable Long postId) {
        return ResponseEntity.ok(likeService.likePost(userId, postId));
    }

    @DeleteMapping("/user/{userId}/post/{postId}")
    public ResponseEntity<?> unlikePost(@PathVariable Long userId, @PathVariable Long postId) {
        likeService.unlikePost(userId, postId);
        return ResponseEntity.ok(Map.of("message", "Successfully unliked post"));
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Like>> getLikes(@PathVariable Long postId) {
        return ResponseEntity.ok(likeService.getLikesForPost(postId));
    }
}

