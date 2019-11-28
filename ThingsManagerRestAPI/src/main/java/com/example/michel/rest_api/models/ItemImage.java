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
@Table(name = "item_image", schema = "public", catalog = "thingsManager")
public class ItemImage {
    @Id
    @Column(name = "id_item_image")
    private int idItemImage;
    @Column(name = "image_location")
    private String imageLocation;
    private Integer priority;
    @Column(name = "id_item")
    private int idItem;
}
