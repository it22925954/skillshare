package com.paf.skillshare.controller;

import com.paf.skillshare.model.User;
import com.paf.skillshare.repository.UserRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already taken");
        }

        User saved = userRepository.save(user); // In production, hash password
        return ResponseEntity.ok(toResponse(saved));
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail())
        .filter(user -> user.getPassword().equals(loginRequest.getPassword()));

if (optionalUser.isPresent()) {
    return ResponseEntity.ok(toResponse(optionalUser.get()));
} else {
    return ResponseEntity.status(401).body("Invalid credentials");
}

    }

    private AuthResponse toResponse(User user) {
        return new AuthResponse(user.getId(), user.getUsername(), user.getEmail(), user.getProfilePicture(), user.getBio());
    }

    // 🧾 Simple response class
    record AuthResponse(Long userId, String username, String email, String profilePicture, String bio) {}
}
