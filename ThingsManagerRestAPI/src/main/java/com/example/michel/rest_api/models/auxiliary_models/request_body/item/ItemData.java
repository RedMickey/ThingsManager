package com.example.michel.rest_api.models.auxiliary_models.request_body.item;

import com.example.michel.rest_api.models.Item;
import com.example.michel.rest_api.models.ItemImage;
import lombok.Data;

import java.util.List;

@Data
public class ItemData {
    private Item item;
    private List<ItemData> itemImages;
}
