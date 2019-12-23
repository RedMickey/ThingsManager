package com.example.michel.rest_api.models.auxiliary_models.response_body.room;

import com.example.michel.rest_api.models.Place;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomData {
    private Integer spaceCount;
    private Integer thingCount;
    private Place place;
}
