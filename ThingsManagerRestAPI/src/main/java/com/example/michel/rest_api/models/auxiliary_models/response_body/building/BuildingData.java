package com.example.michel.rest_api.models.auxiliary_models.response_body.building;

import com.example.michel.rest_api.models.Place;
import com.example.michel.rest_api.models.PlaceImage;
import com.example.michel.rest_api.models.auxiliary_models.response_body.room.RoomData;
import lombok.Data;

import java.util.List;

@Data
public class BuildingData extends RoomData {
    private Integer roomCount;

    public BuildingData(Integer roomCount, Integer spaceCount, Integer thingCount, Place place, List<PlaceImage> placeImages) {
        super(spaceCount, thingCount, place, placeImages);
        this.roomCount = roomCount;
    }
}
