package com.example.michel.rest_api.repositories;

import com.example.michel.rest_api.models.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Integer> {
}
