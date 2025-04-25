package com.paf.skillshare.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    private String profilePicture;
    private String bio;

    // For OAuth 2.0 login (to be used later)
    private String provider; // e.g., google, github
    private String providerId;

    // One-to-many relationships to be defined later (Post, Comment, etc.)
    // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    // private List<Post> posts;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Post> posts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Like> likes;

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Follow> following;

    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Follow> followers;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Notification> notifications;

}
