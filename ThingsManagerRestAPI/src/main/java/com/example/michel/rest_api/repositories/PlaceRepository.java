package com.example.michel.rest_api.repositories;

import com.example.michel.rest_api.models.Place;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface PlaceRepository extends CrudRepository<Place, Integer> {

    Place findPlaceByIdPlace(Integer idPlace);

    List<Place> findPlacesByIdUserAndIdPlaceType(Integer userId, Integer placeType);

    /*@Query("SELECT p FROM Place p WHERE p.id_outer_place = ?1")
    List<Place> findPlacesByIdUserAndIdOuterPlace(Integer outerPlaceId);*/

    List<Place> findPlacesByIdUserAndOuterPlace(Integer userId, Place place);

    Place findPlaceByIdUserAndIdPlace(Integer userId, Integer placeId);
}
