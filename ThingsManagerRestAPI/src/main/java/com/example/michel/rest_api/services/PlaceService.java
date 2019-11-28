package com.example.michel.rest_api.services;

import com.example.michel.rest_api.models.Place;
import com.example.michel.rest_api.repositories.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaceService {
    @Autowired
    private PlaceRepository placeRepository;

    public Place getPlaceById(Integer idPlace) {
        Place place = placeRepository.findPlaceByIdPlace(idPlace);
        return place;
    }

}
