package com.example.michel.rest_api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "place_type", schema = "public", catalog = "thingsManager")
public class PlaceType {
    @Id
    @Column(name = "id_place_type")
    private int idPlaceType;
    @Column(name = "place_type_name")
    private String placeTypeName;
}
