package com.paf.skillshare.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.paf.skillshare.dto.PostDTO;
import com.paf.skillshare.dto.UserDTO;
import com.paf.skillshare.model.Post;
import com.paf.skillshare.model.User;
import com.paf.skillshare.repository.PostRepository;
import com.paf.skillshare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public List<PostDTO> getAllPosts() {
        return postRepository.findAll().stream().map(this::convertToDTO).toList();
    }

    public PostDTO getPostById(Long id) {
        return convertToDTO(postRepository.findById(id).orElseThrow());
    }

    public List<PostDTO> getPostsByUserId(Long userId) {
        return postRepository.findByUserId(userId).stream().map(this::convertToDTO).toList();
    }

    public Post createPost(Long userId, String caption, MultipartFile imageFile) {
        User user = userRepository.findById(userId).orElseThrow();

        // Simulate image upload
        String imageUrl = "/uploads/" + imageFile.getOriginalFilename();

        Post post = new Post();
        post.setCaption(caption);
        post.setImageUrl(imageUrl);
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
                .likeCount(likeCount)
                .user(UserDTO.builder()
                        .id(post.getUser().getId())
                        .username(post.getUser().getUsername())
                        .profilePictureUrl(post.getUser().getProfilePicture()) // ✅ fixed name
                        .build())
                .build();
    }
}
