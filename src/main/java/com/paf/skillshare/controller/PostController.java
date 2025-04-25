package com.paf.skillshare.controller;

import com.paf.skillshare.dto.PostDTO;
import com.paf.skillshare.model.Post;
import com.paf.skillshare.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin("*")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
public ResponseEntity<List<PostDTO>> getAllPosts() {
    return ResponseEntity.ok(postService.getAllPosts());
}

@GetMapping("/{id}")
public ResponseEntity<PostDTO> getPostById(@PathVariable Long id) {
    return ResponseEntity.ok(postService.getPostById(id));
}

@GetMapping("/user/{userId}")
public ResponseEntity<List<PostDTO>> getPostsByUser(@PathVariable Long userId) {
    return ResponseEntity.ok(postService.getPostsByUserId(userId));
}


    @PostMapping("/{userId}")
    public ResponseEntity<Post> createPost(@PathVariable Long userId, @RequestBody Post post) {
        return ResponseEntity.ok(postService.createPost(userId, post));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok().build();
    }
}
