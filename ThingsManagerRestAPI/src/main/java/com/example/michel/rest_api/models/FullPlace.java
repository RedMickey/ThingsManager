package com.example.michel.rest_api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;

import javax.persistence.*;
import java.sql.Timestamp;

@Indexed
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "place", schema = "public", catalog = "thingsManager")
public class FullPlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_place")
    private Integer idPlace;
    private String description;
    @Field
    @Column(name = "place_name")
    private String placeName;
    @Column(name = "id_outer_place")
    private Integer idOuterPlace;
    @Column(name = "id_place_type")
    private int idPlaceType;
    @Generated(GenerationTime.INSERT)
    @Column(name = "id_status")
    private Integer idStatus;
    @Column(name = "id_user")
    private int idUser;
    @Generated(GenerationTime.INSERT)
    @Column(name = "creation_timestamp", insertable=false)
    private Timestamp creationTimestamp;
    @Generated(GenerationTime.ALWAYS)
    @Column(name = "update_timestamp", insertable=false)
    private Timestamp updateTimestamp;
}
