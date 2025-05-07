package com.paf.skillshare.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostDTO {
    private Long id;
    private String caption;
    private String imageUrl;
    private LocalDateTime createdAt;
    private int likeCount;
    private UserDTO user;
}
