package com.example.michel.rest_api.controllers;

import com.example.michel.rest_api.models.Place;
import com.example.michel.rest_api.models.User;
import com.example.michel.rest_api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping(value = "/sign-up", produces = "application/json")
    public User signUp(@RequestBody User user){
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        User insertedUser = userService.save(user);
        insertedUser.setPassword("");
        return insertedUser;
    }

    @PostMapping(value = "/getUser", produces = "application/json")
    public User signUp(@RequestBody Map<String, String> req){
        User user = userService.findByUserEmail(req.get("userEmail"));
        user.setPassword("");
        return user;
    }

    @PostMapping(value = "/test", produces = "application/json")
    public Map test(@RequestBody Map<String, Integer> req){
        System.out.println(req.get("ttt2"));
        return Collections.singletonMap("test", "test");
    }
}
