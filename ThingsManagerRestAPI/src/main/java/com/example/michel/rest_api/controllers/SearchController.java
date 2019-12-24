package com.example.michel.rest_api.controllers;

import com.example.michel.rest_api.models.Place;

import com.example.michel.rest_api.services.search.BuildingSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private BuildingSearchService buildingSearchService;

    @RequestMapping(value = "/place", method = RequestMethod.POST)
    public List<Place> search(@RequestBody Map<String, String> req) {
        List<Place> searchResults = null;
        searchResults = buildingSearchService.fuzzySearch(req.get("searchTmp"));
        return searchResults;
    }
}
