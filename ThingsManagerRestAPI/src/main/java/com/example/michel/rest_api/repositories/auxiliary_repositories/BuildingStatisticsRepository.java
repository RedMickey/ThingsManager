package com.example.michel.rest_api.repositories.auxiliary_repositories;

import com.example.michel.rest_api.models.auxiliary_models.response_body.building.BuildingStatistics;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Collections;
import java.util.List;

@Repository
public class BuildingStatisticsRepository {
    @PersistenceContext
    private EntityManager em;

    public List<BuildingStatistics> getBuildingStatisticsList(Integer userId) {
        Query query = em.createNativeQuery(
                "select p.id_place, p.place_name, p.creation_timestamp, count(DISTINCT op1.id_place) as room_count, " +
                        "count(DISTINCT op2.id_place) as space_count, count(DISTINCT i.id_item) as thing_count " +
                        "from place p left join place op1 on p.id_place = op1.id_outer_place " +
                        "left join place op2 on op1.id_place = op2.id_outer_place " +
                        "left join item i on i.id_place in (p.id_place, op1.id_place, op2.id_place) " +
                        "where p.id_place_type=:placeTypeId and p.id_user=:userId group by p.id_place", BuildingStatistics.class
        );
        query.setParameter("placeTypeId", 1);
        query.setParameter("userId", userId);

        return Collections.checkedList(query.getResultList(), BuildingStatistics.class);
    }

    public BuildingStatistics getBuildingStatisticsByPlaceId(Integer userId, Integer placeId) {
        Query query = em.createNativeQuery(
                "select p.id_place, p.place_name, p.creation_timestamp, count(DISTINCT op1.id_place) as room_count, " +
                        "count(DISTINCT op2.id_place) as space_count, count(DISTINCT i.id_item) as thing_count " +
                        "from place p left join place op1 on p.id_place = op1.id_outer_place " +
                        "left join place op2 on op1.id_place = op2.id_outer_place " +
                        "left join item i on i.id_place in (p.id_place, op1.id_place, op2.id_place) " +
                        "where p.id_place_type=:placeTypeId and p.id_user=:userId and p.id_place=:placeId group by p.id_place", BuildingStatistics.class
        );
        query.setParameter("placeTypeId", 1);
        query.setParameter("userId", userId);
        query.setParameter("placeId", placeId);

        return (BuildingStatistics)query.getSingleResult();
    }
}
