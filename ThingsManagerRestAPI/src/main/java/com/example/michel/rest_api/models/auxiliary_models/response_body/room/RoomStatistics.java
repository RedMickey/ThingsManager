package com.example.michel.rest_api.models.auxiliary_models.response_body.room;

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
public class RoomStatistics {
    @Id
    @Column(name = "id_place")
    private Integer idPlace;
    @Column(name = "place_name")
    private String placeName;
    @Column(name = "id_outer_place")
    private Integer idOuterPlace;
    @Column(name = "outer_place_name")
    private String outerPlaceName;
    @Column(name = "space_count")
    private Integer spaceCount;
    @Column(name = "thing_count")
    private Integer thingCount;
    @Column(name = "creation_timestamp")
    private Timestamp creationTimestamp;
}
