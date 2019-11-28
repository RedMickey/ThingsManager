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
@Table(name = "place_image", schema = "public", catalog = "thingsManager")
public class PlaceImage {
    @Id
    @Column(name = "id_place_image")
    private int idPlaceImage;
    @Column(name = "image_location")
    private String imageLocation;
    private Integer priority;
    @Column(name = "id_place")
    private int idPlace;
}
