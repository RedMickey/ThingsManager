package com.example.michel.rest_api.models.auxiliary_models.request_body.place;

import com.example.michel.rest_api.models.Place;
import lombok.Data;

@Data
public class PlaceData {
    private Place place;
    private String[] placeImages64Base;
}
