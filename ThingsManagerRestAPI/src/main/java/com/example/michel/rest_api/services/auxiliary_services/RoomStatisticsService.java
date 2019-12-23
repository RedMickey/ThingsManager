package com.example.michel.rest_api.services.auxiliary_services;

import com.example.michel.rest_api.models.auxiliary_models.response_body.room.RoomStatistics;
import com.example.michel.rest_api.repositories.auxiliary_repositories.RoomStatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomStatisticsService {

    @Autowired
    RoomStatisticsRepository roomStatisticsRepository;

    public List<RoomStatistics> getRoomStatisticsList(Integer userId) {
        return  roomStatisticsRepository.getRoomStatisticsList(userId);
    }

    public RoomStatistics getRoomStatisticsByPlaceId(Integer userId, Integer placeId) {
        return roomStatisticsRepository.getRoomStatisticsByPlaceId(userId, placeId);
    }
}
