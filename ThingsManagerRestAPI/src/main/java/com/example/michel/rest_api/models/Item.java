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
public class Item {
    @Id
    @Column(name = "id_item")
    private int idItem;
    @Column(name = "item_name")
    private String itemName;
    @Column(name = "id_category")
    private Integer idCategory;
    @Column(name = "id_place")
    private Integer idPlace;
    private String description;
    @Column(name = "id_user")
    private int idUser;
}
