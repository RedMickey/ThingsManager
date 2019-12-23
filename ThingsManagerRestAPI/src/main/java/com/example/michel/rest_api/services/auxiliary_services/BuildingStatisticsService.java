package com.example.michel.rest_api.services.auxiliary_services;

import com.example.michel.rest_api.models.auxiliary_models.response_body.building.BuildingStatistics;
import com.example.michel.rest_api.repositories.auxiliary_repositories.BuildingStatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuildingStatisticsService {

    @Autowired
    private BuildingStatisticsRepository buildingStatisticsRepository;

    public List<BuildingStatistics> getBuildingStatisticsList(Integer userId) {
        return buildingStatisticsRepository.getBuildingStatisticsList(userId);
    }

    public BuildingStatistics getBuildingStatisticsByPlaceId(Integer userId, Integer placeId){
        return buildingStatisticsRepository.getBuildingStatisticsByPlaceId(userId, placeId);
    }
}
