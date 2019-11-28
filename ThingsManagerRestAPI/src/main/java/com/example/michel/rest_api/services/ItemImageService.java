package com.example.michel.rest_api.services;

import com.example.michel.rest_api.repositories.ItemImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemImageService {
    @Autowired
    private ItemImageRepository itemImageRepository;
}
