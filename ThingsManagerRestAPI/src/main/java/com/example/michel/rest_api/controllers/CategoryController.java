package com.example.michel.rest_api.controllers;

import com.example.michel.rest_api.models.Category;
import com.example.michel.rest_api.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping(value = "/getCategories", produces = "application/json")
    public Iterable<Category> getCategories(@RequestBody Map<String, Integer> req) {
        return categoryService.findAll();
    }
}
