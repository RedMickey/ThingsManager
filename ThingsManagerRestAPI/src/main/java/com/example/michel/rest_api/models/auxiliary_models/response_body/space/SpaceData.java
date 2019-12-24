package com.example.michel.rest_api.models.auxiliary_models.response_body.space;

import com.example.michel.rest_api.models.Place;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpaceData {
    private Integer thingCount;
    private Place place;
}
