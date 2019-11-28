package com.example.michel.rest_api.repositories;

import com.example.michel.rest_api.models.Place;
import org.springframework.data.repository.CrudRepository;

public interface PlaceRepository extends CrudRepository<Place, Integer> {

    Place findPlaceByIdPlace(Integer idPlace);
}
