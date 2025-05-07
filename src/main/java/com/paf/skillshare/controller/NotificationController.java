package com.paf.skillshare.controller;

import com.paf.skillshare.model.Notification;
import com.paf.skillshare.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin("*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> getUserNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.getNotificationsForUser(userId));
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok(Map.of("message", "Notification marked as read"));
    }

    @PostMapping("/test")
    public ResponseEntity<?> testCreate(@RequestBody Map<String, String> data) {
        Long userId = Long.parseLong(data.get("userId"));
        String type = data.get("type");
        String message = data.get("message");

        notificationService.createNotification(userId, type, message);
        return ResponseEntity.ok(Map.of("message", "Test notification sent"));
    }

}
