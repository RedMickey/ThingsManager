package com.example.michel.rest_api.services.auxiliary_services;

import com.example.michel.rest_api.models.auxiliary_models.response_body.space.SpaceStatistics;
import com.example.michel.rest_api.repositories.auxiliary_repositories.SpaceStatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpaceStatisticsService {
    @Autowired
    SpaceStatisticsRepository spaceStatisticsRepository;

    public List<SpaceStatistics> getSpaceStatisticsList(Integer userId) {
        return  spaceStatisticsRepository.getSpaceStatisticsList(userId);
    }

    public SpaceStatistics getSpaceStatisticsByPlaceId(Integer userId, Integer placeId) {
        return spaceStatisticsRepository.getSpaceStatisticsByPlaceId(userId, placeId);
    }
}
