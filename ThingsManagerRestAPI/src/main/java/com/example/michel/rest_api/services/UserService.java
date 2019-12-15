package com.example.michel.rest_api.services;

import com.example.michel.rest_api.models.User;
import com.example.michel.rest_api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public User findByUserEmail(String email) {
        return userRepository.findByUserEmail(email);
    }
}
