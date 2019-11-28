package com.example.michel.rest_api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Place {
    @Id
    @Column(name = "id_place")
    private int idPlace;
    private String description;
    @Column(name = "place_name")
    private String placeName;
    @Column(name = "id_outer_place")
    private Integer idOuterPlace;
    @Column(name = "id_place_type")
    private int idPlaceType;
    @Column(name = "id_user")
    private int idUser;
}
