package com.example.michel.rest_api.controllers;

import com.example.michel.rest_api.models.Place;
import com.example.michel.rest_api.services.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/place")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @PostMapping(value = "/getPlaceById", produces = "application/json")
    public Place getPlaceById(@RequestBody Map<String, Integer> req){
        return placeService.getPlaceById(req.get("idPlace"));
    }
}
