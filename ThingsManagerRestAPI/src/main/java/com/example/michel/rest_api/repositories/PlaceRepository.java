package com.example.michel.rest_api.repositories;

import com.example.michel.rest_api.models.Place;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface PlaceRepository extends CrudRepository<Place, Integer> {

    Place findPlaceByIdPlace(Integer idPlace);

    List<Place> findPlacesByIdUserAndIdPlaceType(Integer userId, Integer placeType);

    Place findPlaceByIdUserAndIdPlace(Integer userId, Integer placeId);
}
