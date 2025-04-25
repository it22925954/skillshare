package com.paf.skillshare.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf.skillshare.dto.PostDTO;
import com.paf.skillshare.model.Post;
import com.paf.skillshare.model.User;
import com.paf.skillshare.repository.PostRepository;
import com.paf.skillshare.repository.UserRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    // public List<Post> getAllPosts() {
    //     return postRepository.findAll();
    // }

    // public Post getPostById(Long id) {
    //     return postRepository.findById(id).orElseThrow();
    // }

    // public List<Post> getPostsByUserId(Long userId) {
    //     return postRepository.findByUserId(userId);
    // }
    public List<PostDTO> getAllPosts() {
        return postRepository.findAll().stream().map(this::convertToDTO).toList();
    }
    
    public PostDTO getPostById(Long id) {
        return convertToDTO(postRepository.findById(id).orElseThrow());
    }
    
    public List<PostDTO> getPostsByUserId(Long userId) {
        return postRepository.findByUserId(userId).stream().map(this::convertToDTO).toList();
    }
    

    public Post createPost(Long userId, Post post) {
        User user = userRepository.findById(userId).orElseThrow();
        post.setUser(user);
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
    private PostDTO convertToDTO(Post post) {
    int likeCount = post.getLikes() != null ? post.getLikes().size() : 0;

    return PostDTO.builder()
            .id(post.getId())
            .caption(post.getCaption())
            .imageUrl(post.getImageUrl())
            .createdAt(post.getCreatedAt())
            .user(post.getUser())
            .likeCount(likeCount)
            .build();
}

}
