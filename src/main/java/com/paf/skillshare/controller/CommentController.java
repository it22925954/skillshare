package com.paf.skillshare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paf.skillshare.model.Comment;
import com.paf.skillshare.service.CommentService;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin("*")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsForPost(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getAllCommentsForPost(postId));
    }

    @PostMapping("/user/{userId}/post/{postId}")
    public ResponseEntity<Comment> addComment(
            @PathVariable Long userId,
            @PathVariable Long postId,
            @RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.createComment(userId, postId, comment));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }
}
