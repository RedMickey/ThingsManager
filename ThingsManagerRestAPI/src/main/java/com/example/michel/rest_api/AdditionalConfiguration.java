package com.example.michel.rest_api;

import com.example.michel.rest_api.services.search.BuildingSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;

@EnableAutoConfiguration
@Configuration
public class AdditionalConfiguration {

    /* @Autowired
    private EntityManager bentityManager;

    @Bean
    BuildingSearchService buildingSearchService() {
        BuildingSearchService buildingSearchService = new BuildingSearchService(bentityManager);
        buildingSearchService.initializeBuildingSearchService();
        return buildingSearchService;
    }*/
}
