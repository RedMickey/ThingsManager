package com.example.michel.rest_api.repositories;

import com.example.michel.rest_api.models.PlaceImage;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PlaceImageRepository extends CrudRepository<PlaceImage, Integer> {
    List<PlaceImage> findAllByIdPlace(Integer idPlace);

    void deleteAllByIdPlace(Integer idPlace);
}
