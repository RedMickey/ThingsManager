package com.example.michel.rest_api.repositories;

import com.example.michel.rest_api.models.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CategoryRepository extends CrudRepository<Category, Integer> {
}
