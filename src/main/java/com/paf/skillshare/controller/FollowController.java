package com.paf.skillshare.controller;

import com.paf.skillshare.model.Follow;
import com.paf.skillshare.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/follows")
@CrossOrigin("*")
public class FollowController {

    @Autowired
    private FollowService followService;

    @PostMapping("/follower/{followerId}/following/{followingId}")
    public ResponseEntity<Follow> follow(@PathVariable Long followerId, @PathVariable Long followingId) {
        return ResponseEntity.ok(followService.followUser(followerId, followingId));
    }

    @DeleteMapping("/follower/{followerId}/following/{followingId}")
    public ResponseEntity<?> unfollow(@PathVariable Long followerId, @PathVariable Long followingId) {
        followService.unfollowUser(followerId, followingId);
        return ResponseEntity.ok(Map.of("message", "Successfully unfollowed"));
    }

    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<Follow>> getFollowers(@PathVariable Long userId) {
        return ResponseEntity.ok(followService.getFollowers(userId));
    }

    @GetMapping("/following/{userId}")
    public ResponseEntity<List<Follow>> getFollowing(@PathVariable Long userId) {
        return ResponseEntity.ok(followService.getFollowing(userId));
    }

    @GetMapping("/count/followers/{userId}")
    public ResponseEntity<Map<String, Integer>> getFollowersCount(@PathVariable Long userId) {
        int count = followService.getFollowersCount(userId);
        return ResponseEntity.ok(Map.of("followers", count));
    }

    @GetMapping("/count/following/{userId}")
    public ResponseEntity<Map<String, Integer>> getFollowingCount(@PathVariable Long userId) {
        int count = followService.getFollowingCount(userId);
        return ResponseEntity.ok(Map.of("following", count));
    }
    

}
