package com.example.michel.rest_api.models.auxiliary_models.response_body;

import com.example.michel.rest_api.models.Item;
import com.example.michel.rest_api.models.Place;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemWithPlaces {
    private Place[] places;
    private Item item;
}
