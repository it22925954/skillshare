package com.paf.skillshare.controller;

import com.paf.skillshare.model.Like;
import com.paf.skillshare.model.Post;
import com.paf.skillshare.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    @PutMapping("/{id}")
public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post post) {
    return ResponseEntity.ok(postService.updatePost(id, post));
}

}
