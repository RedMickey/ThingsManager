package com.example.michel.rest_api.repositories.auxiliary_repositories;

import com.example.michel.rest_api.models.auxiliary_models.response_body.space.SpaceStatistics;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Collections;
import java.util.List;

@Repository
public class SpaceStatisticsRepository {
    @PersistenceContext
    private EntityManager em;

    public List<SpaceStatistics> getSpaceStatisticsList(Integer userId) {
        Query query = em.createNativeQuery(
                "select p.id_place, p.place_name, p.creation_timestamp, p.id_outer_place, " +
                        "op1.id_place as id_room, op1.place_name as room_name, " +
                        "op2.id_place as id_building, op2.place_name as building_name, " +
                        "(select count(i.id_item) from item i where i.id_place = p.id_place) as thing_count " +
                        "from place p left join place op1 on p.id_outer_place = op1.id_place " +
                        "left join place op2 on op1.id_outer_place = op2.id_place " +
                        "where p.id_place_type=3 and p.id_user=:userId", SpaceStatistics.class
        );
        query.setParameter("userId", userId);

        return Collections.checkedList(query.getResultList(), SpaceStatistics.class);
    }

    public SpaceStatistics getSpaceStatisticsByPlaceId(Integer userId, Integer placeId) {
        Query query = em.createNativeQuery(
                "select p.id_place, p.place_name, p.creation_timestamp, p.id_outer_place, " +
                        "op1.id_place as id_room, op1.place_name as room_name, " +
                        "op2.id_place as id_building, op2.place_name as building_name, " +
                        "(select count(i.id_item) from item i where i.id_place = p.id_place) as thing_count " +
                        "from place p left join place op1 on p.id_outer_place = op1.id_place " +
                        "left join place op2 on op1.id_outer_place = op2.id_place " +
                        "where p.id_place_type=3 and p.id_user=:userId and p.id_place=:placeId", SpaceStatistics.class
        );
        query.setParameter("userId", userId);
        query.setParameter("placeId", placeId);

        return (SpaceStatistics)query.getSingleResult();
    }
}
