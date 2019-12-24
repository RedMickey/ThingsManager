package com.example.michel.rest_api.models.auxiliary_models.response_body.space;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpaceStatistics {
    @Id
    @Column(name = "id_place")
    private Integer idPlace;
    @Column(name = "place_name")
    private String placeName;
    @Column(name = "id_outer_place")
    private Integer idOuterPlace;
    @Column(name = "id_room")
    private Integer idRoom;
    @Column(name = "room_name")
    private String roomName;
    @Column(name = "id_building")
    private Integer idBuilding;
    @Column(name = "building_name")
    private String buildingName;
    @Column(name = "thing_count")
    private Integer thingCount;
    @Column(name = "creation_timestamp")
    private Timestamp creationTimestamp;
}
