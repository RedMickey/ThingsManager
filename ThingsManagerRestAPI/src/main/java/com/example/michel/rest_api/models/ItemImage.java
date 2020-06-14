package com.example.michel.rest_api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "item_image", schema = "public", catalog = "thingsManager")
public class ItemImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item_image")
    private int idItemImage;
    @Column(name = "image_location")
    private String imageLocation;
    private Integer priority;
    @Column(name = "id_item")
    private int idItem;
}
