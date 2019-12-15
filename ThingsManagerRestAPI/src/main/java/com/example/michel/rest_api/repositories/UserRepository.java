package com.example.michel.rest_api.repositories;

import com.example.michel.rest_api.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUserEmail(String email);

    List<User> findAll();
}
