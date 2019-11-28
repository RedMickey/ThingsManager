package com.example.michel.rest_api.services;

import com.example.michel.rest_api.repositories.PlaceImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaceImageService {
    @Autowired
    private PlaceImageRepository placeImageRepository;
}
