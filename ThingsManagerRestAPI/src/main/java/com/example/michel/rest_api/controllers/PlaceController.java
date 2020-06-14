package com.example.michel.rest_api.controllers;

import com.example.michel.rest_api.models.Place;
import com.example.michel.rest_api.models.auxiliary_models.request_body.place.PlaceData;
import com.example.michel.rest_api.models.auxiliary_models.response_body.building.BuildingData;
import com.example.michel.rest_api.models.auxiliary_models.response_body.building.BuildingStatistics;
import com.example.michel.rest_api.models.auxiliary_models.response_body.room.RoomData;
import com.example.michel.rest_api.models.auxiliary_models.response_body.room.RoomStatistics;
import com.example.michel.rest_api.models.auxiliary_models.response_body.space.SpaceData;
import com.example.michel.rest_api.models.auxiliary_models.response_body.space.SpaceStatistics;
import com.example.michel.rest_api.services.PlaceImageService;
import com.example.michel.rest_api.services.PlaceService;
import com.example.michel.rest_api.services.auxiliary_services.BuildingStatisticsService;
import com.example.michel.rest_api.services.auxiliary_services.RoomStatisticsService;
import com.example.michel.rest_api.services.auxiliary_services.SpaceStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/place")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @Autowired
    private BuildingStatisticsService buildingStatisticsService;

    @Autowired
    private RoomStatisticsService roomStatisticsService;

    @Autowired
    private SpaceStatisticsService spaceStatisticsService;

    @Autowired
    private PlaceImageService placeImageService;

    /*@PostMapping(value = "/getPlaceById", produces = "application/json")
    public Place getPlaceById(@RequestBody Map<String, Integer> req){
        return placeService.getPlaceById(req.get("idPlace"));
    }*/

    /*******************************************************Building************************************************************/

    @PostMapping(value = "/getBuildingStatistics", produces = "application/json")
    public List<BuildingStatistics> getBuildingStatistics(@RequestBody Map<String, Integer> req) {
        return buildingStatisticsService.getBuildingStatisticsList(req.get("userId"));
    }

    @PostMapping(value = "/getBuildingData", produces = "application/json")
    public BuildingData getBuildingData(@RequestBody Map<String, Integer> req) {
        Place building = placeService.findPlaceByIdUserAndIdPlace(req.get("userId"), req.get("placeId"));
        BuildingStatistics buildingStatistics = buildingStatisticsService.getBuildingStatisticsByPlaceId(req.get("userId"), req.get("placeId"));
        return new BuildingData(
                buildingStatistics.getRoomCount(), buildingStatistics.getSpaceCount(),
                buildingStatistics.getThingCount(), building
        );
    }

    /***************************************************Room****************************************************************/

    @PostMapping(value = "/getRoomStatistics", produces = "application/json")
    public List<RoomStatistics> getRoomStatistics(@RequestBody Map<String, Integer> req) {
        return roomStatisticsService.getRoomStatisticsList(req.get("userId"));
    }

    @PostMapping(value = "/getRoomData", produces = "application/json")
    public RoomData getRoomData(@RequestBody Map<String, Integer> req) {
        Place room = placeService.findPlaceByIdUserAndIdPlace(req.get("userId"), req.get("placeId"));
        RoomStatistics roomStatistics = roomStatisticsService.getRoomStatisticsByPlaceId(req.get("userId"), req.get("placeId"));
        return new RoomData(
                roomStatistics.getSpaceCount(), roomStatistics.getThingCount(), room
        );
    }

    /***************************************************Space****************************************************************/

    @PostMapping(value = "/getSpaceStatistics", produces = "application/json")
    public List<SpaceStatistics> getSpaceStatistics(@RequestBody Map<String, Integer> req) {
        return spaceStatisticsService.getSpaceStatisticsList(req.get("userId"));
    }

    @PostMapping(value = "/getSpaceData", produces = "application/json")
    public SpaceData getSpaceData(@RequestBody Map<String, Integer> req) {
        Place space = placeService.findPlaceByIdUserAndIdPlace(req.get("userId"), req.get("placeId"));
        SpaceStatistics spaceStatistics = spaceStatisticsService.getSpaceStatisticsByPlaceId(req.get("userId"), req.get("placeId"));
        return new SpaceData(spaceStatistics.getThingCount(), space);
    }

    /*******************************************************General************************************************************/

    @PostMapping(value = "/getPlacesByPlaceType", produces = "application/json")
    public List<Place> getPlacesByPlaceType(@RequestBody Map<String, Integer> req) {
        return placeService.findPlacesByIdUserAndIdPlaceType(req.get("userId"), req.get("placeTypeId"));
    }

    @PostMapping(value = "/getPlaceById", produces = "application/json")
    public Place getPlaceById(@RequestBody Map<String, Integer> req) {
        return placeService.findPlaceByIdUserAndIdPlace(req.get("userId"), req.get("placeId"));
    }

    @PostMapping(value = "/savePlace", produces = "application/json")
    public Place savePlace(@RequestBody Place place) {
        return placeService.savePlace(place);
    }

    @PostMapping(value = "/savePlaceAndImages", produces = "application/json")
    public Place savePlaceAndImages(@RequestBody PlaceData placeData) {
        Place newPlace = placeService.savePlace(placeData.getPlace());
        placeImageService.saveImages(placeData.getPlaceImages64Base(), newPlace.getIdPlace());
        return placeData.getPlace();
    }

    @PostMapping(value = "/deletePlaceById", produces = "application/json")
    public Map deletePlaceById(@RequestBody Map<String, Integer> req) {
        placeService.deletePlaceById(req.get("placeId"));
        return Collections.singletonMap("deleted", true);
    }

    @PostMapping(value = "/getPlacesByOuterPlaceId", produces = "application/json")
    public List<Place> getPlacesByOuterId(@RequestBody Map<String, Integer> req) {
        return placeService.findPlacesByIdUserAndIdOuterPlace(req.get("userId"), req.get("outerPlaceId"));
    }
}
