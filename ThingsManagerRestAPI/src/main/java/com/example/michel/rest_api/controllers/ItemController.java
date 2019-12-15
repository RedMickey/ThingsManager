package com.example.michel.rest_api.controllers;

import com.example.michel.rest_api.models.Item;
import com.example.michel.rest_api.models.auxiliary_models.response_body.ItemWithPlaces;
import com.example.michel.rest_api.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping(value = "/getAllItems", produces = "application/json")
    public List<ItemWithPlaces> getAllItems(@RequestBody Map<String, Integer> req){
        return itemService.getItemsWithPlacesByIdUser(req.get("userId"));
    }

    @PostMapping(value = "/getItem", produces = "application/json")
    public ItemWithPlaces getItem(@RequestBody Map<String, Integer> req){
        return itemService.getItemWithPlaces(req.get("itemId"), req.get("userId"));
    }
}
