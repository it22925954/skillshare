package com.paf.skillshare.service;

import com.paf.skillshare.model.Comment;
import com.paf.skillshare.model.Post;
import com.paf.skillshare.model.User;
import com.paf.skillshare.repository.CommentRepository;
import com.paf.skillshare.repository.PostRepository;
import com.paf.skillshare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Comment> getAllCommentsForPost(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    public Comment createComment(Long userId, Long postId, Comment comment) {
        User user = userRepository.findById(userId).orElseThrow();
        Post post = postRepository.findById(postId).orElseThrow();
        comment.setUser(user);
        comment.setPost(post);
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
