package com.example.michel.rest_api.models.auxiliary_models.response_body.room;

import com.example.michel.rest_api.models.Place;
import com.example.michel.rest_api.models.PlaceImage;
import com.example.michel.rest_api.models.auxiliary_models.response_body.space.SpaceData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class RoomData extends SpaceData {
    private Integer spaceCount;

    public RoomData(Integer spaceCount, Integer thingCount, Place place, List<PlaceImage> placeImages) {
        super(thingCount, place, placeImages);
        this.spaceCount = spaceCount;
    }
}
