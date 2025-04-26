package com.paf.skillshare.service;

import com.paf.skillshare.model.Notification;
import com.paf.skillshare.model.User;
import com.paf.skillshare.repository.NotificationRepository;
import com.paf.skillshare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    public void createNotification(Long userId, String type, String message) {
        User user = userRepository.findById(userId).orElseThrow();

        Notification notification = Notification.builder()
                .user(user)
                .type(type)
                .message(message)
                .read(false)
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsForUser(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public void markAsRead(Long notificationId) {
        Notification n = notificationRepository.findById(notificationId).orElseThrow();
        n.setRead(true);
        notificationRepository.save(n);
    }
}
