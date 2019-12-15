package com.example.michel.rest_api.services;

import com.example.michel.rest_api.models.Item;
import com.example.michel.rest_api.models.Place;
import com.example.michel.rest_api.models.auxiliary_models.response_body.ItemWithPlaces;
import com.example.michel.rest_api.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    public List<Item> findAllByIdUser(Integer userId) {
        return itemRepository.findAllByIdUser(userId);
    }

    public List<ItemWithPlaces> getItemsWithPlacesByIdUser(Integer userId) {
        List<Item> items = itemRepository.findAllByIdUser(userId);
        return items.stream().map(this::createItemWithPlaces)
                .collect(Collectors.toList());
    }

    public ItemWithPlaces getItemWithPlaces(Integer itemId, Integer userId) {
        Item item = itemRepository.getByIdItemAndIdUser(itemId, userId);
        return createItemWithPlaces(item);
    }

    public ItemWithPlaces createItemWithPlaces(Item item) {
        Place[] places = new Place[3];
        Arrays.fill(places, new Place());
        mapPlacesToArray(item.getPlace(), places);
        return new ItemWithPlaces(places, item.cloneWithoutPlaces());
    }

    private void mapPlacesToArray(Place place, Place[] places) {
        if (place != null) {
            mapPlacesToArray(place.getOuterPlace(), places);
            places[place.getIdPlaceType()-1] = place.cloneWithoutOuterPlaces();
        }
    }

}
