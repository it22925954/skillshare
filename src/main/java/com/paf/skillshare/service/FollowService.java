package com.paf.skillshare.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf.skillshare.model.Follow;
import com.paf.skillshare.model.User;
import com.paf.skillshare.repository.FollowRepository;
import com.paf.skillshare.repository.UserRepository;

@Service
public class FollowService {

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private UserRepository userRepository;

    public Follow followUser(Long followerId, Long followingId) {
        if (followerId.equals(followingId)) {
            throw new RuntimeException("User cannot follow themselves");
        }

        if (followRepository.findByFollowerIdAndFollowingId(followerId, followingId).isPresent()) {
            throw new RuntimeException("Already following this user");
        }

        User follower = userRepository.findById(followerId).orElseThrow();
        User following = userRepository.findById(followingId).orElseThrow();

        Follow follow = Follow.builder()
                .follower(follower)
                .following(following)
                .followedAt(LocalDateTime.now())
                .build();

        return followRepository.save(follow);


    }

    public void unfollowUser(Long followerId, Long followingId) {
        Follow follow = followRepository.findByFollowerIdAndFollowingId(followerId, followingId)
                .orElseThrow(() -> new RuntimeException("Not following"));

        followRepository.delete(follow);
    }

    public List<Follow> getFollowers(Long userId) {
        return followRepository.findByFollowingId(userId);
    }

    public List<Follow> getFollowing(Long userId) {
        return followRepository.findByFollowerId(userId);
    }

    public int getFollowersCount(Long userId) {
        return followRepository.findByFollowingId(userId).size();
    }

    public int getFollowingCount(Long userId) {
        return followRepository.findByFollowerId(userId).size();
    }

}
