package com.example.michel.rest_api.repositories.auxiliary_repositories;

import com.example.michel.rest_api.models.auxiliary_models.response_body.room.RoomStatistics;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Collections;
import java.util.List;

@Repository
public class RoomStatisticsRepository {
    @PersistenceContext
    private EntityManager em;

    public List<RoomStatistics> getRoomStatisticsList(Integer userId) {
        Query query = em.createNativeQuery(
                "select p.id_place, p.place_name, p.creation_timestamp, p.id_outer_place, " +
                        "(select pb.place_name from place pb where pb.id_place = p.id_outer_place) as outer_place_name, " +
                        "count(DISTINCT op1.place_name) as space_count, count(DISTINCT i.id_item) as thing_count " +
                        "from place p left join place op1 on p.id_place = op1.id_outer_place " +
                        "left join item i on i.id_place in (p.id_place, op1.id_place) " +
                        "where p.id_place_type=2 and p.id_user=:userId group by p.id_place", RoomStatistics.class
        );
        query.setParameter("userId", userId);

        return Collections.checkedList(query.getResultList(), RoomStatistics.class);
    }

    public RoomStatistics getRoomStatisticsByPlaceId(Integer userId, Integer placeId) {
        Query query = em.createNativeQuery(
                "select p.id_place, p.place_name, p.creation_timestamp, p.id_outer_place, " +
                        "(select pb.place_name from place pb where pb.id_place = p.id_outer_place) as outer_place_name, " +
                        "count(DISTINCT op1.place_name) as space_count, count(DISTINCT i.id_item) as thing_count " +
                        "from place p left join place op1 on p.id_place = op1.id_outer_place " +
                        "left join item i on i.id_place in (p.id_place, op1.id_place) " +
                        "where p.id_place_type=2 and p.id_user=:userId and p.id_place=:placeId group by p.id_place", RoomStatistics.class
        );
        query.setParameter("userId", userId);
        query.setParameter("placeId", placeId);

        return (RoomStatistics)query.getSingleResult();
    }
}
