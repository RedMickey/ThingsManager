package com.example.michel.rest_api.services;

import com.example.michel.rest_api.models.Place;
import com.example.michel.rest_api.repositories.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceService {
    @Autowired
    private PlaceRepository placeRepository;

    public Place getPlaceById(Integer idPlace) {
        return placeRepository.findPlaceByIdPlace(idPlace);
    }

    public List<Place> findPlacesByIdUserAndIdPlaceType(Integer userId, Integer placeTypeId) {
        return placeRepository.findPlacesByIdUserAndIdPlaceType(userId, placeTypeId);
    }

    public Place findPlaceByIdUserAndIdPlace(Integer userId, Integer placeId) {
        return placeRepository.findPlaceByIdUserAndIdPlace(userId, placeId);
    }

    public Place savePlace(Place place) {
        return placeRepository.save(place);
    }

    public void deletePlaceById(Integer placeId) {
        placeRepository.deleteById(placeId);
    }

}
