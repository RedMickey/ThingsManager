package com.example.michel.rest_api.security_d.user;

import org.springframework.security.core.userdetails.User;

public class CustomUserDetails extends User {
    private static final long serialVersionUID = 1L;

    public CustomUserDetails(UserEntity user) {
        super(user.getUserEmail(), user.getPassword(), user.getGrantedAuthoritiesList());
    }
}
