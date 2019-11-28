package com.example.michel.rest_api.repositories;

import com.example.michel.rest_api.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}
