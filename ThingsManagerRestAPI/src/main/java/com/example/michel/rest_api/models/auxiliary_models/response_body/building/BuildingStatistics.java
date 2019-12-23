package com.example.michel.rest_api.models.auxiliary_models.response_body.building;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
/*@SqlResultSetMapping(
        name="BuildingStatistics",
        classes={
                @ConstructorResult(
                        targetClass=BuildingStatistics.class,
                        columns={
                                @ColumnResult(name="id_place", type=Integer.class),
                                @ColumnResult(name="place_name", type=String.class),
                                @ColumnResult(name="room_count", type = Integer.class),
                                @ColumnResult(name="space_count", type = Integer.class),
                                @ColumnResult(name="thing_count", type = Integer.class),
                                @ColumnResult(name="creation_timestamp", type = Timestamp.class)
                        })
        })*/
public class BuildingStatistics {
    @Id
    @Column(name = "id_place")
    private Integer idPlace;
    @Column(name = "place_name")
    private String placeName;
    @Column(name = "room_count")
    private Integer roomCount;
    @Column(name = "space_count")
    private Integer spaceCount;
    @Column(name = "thing_count")
    private Integer thingCount;
    @Column(name = "creation_timestamp")
    private Timestamp creationTimestamp;

    /*public BuildingStatistics(Integer idPlace, String placeName, Integer roomCount, Integer spaceCount) {
        this.idPlace = idPlace;
        this.placeName = placeName;
        this.roomCount = roomCount;
        this.spaceCount = spaceCount;
    }*/
}
