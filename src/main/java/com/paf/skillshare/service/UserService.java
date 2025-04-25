package com.paf.skillshare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf.skillshare.model.User;
import com.paf.skillshare.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public User createUser(User user) {
        System.out.println("Creating user: " + user);
        return userRepository.save(user);
    }
    

    public User updateUser(Long id, User updatedUser) {
        User user = getUserById(id);
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setBio(updatedUser.getBio());
        user.setProfilePicture(updatedUser.getProfilePicture());
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
