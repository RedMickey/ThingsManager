package com.example.michel.rest_api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

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
    /*@Column(name = "id_category")
    private Integer idCategory;
    @Column(name = "id_place")
    private Integer idPlace;*/
    @OneToOne
    @JoinColumn(name="id_category")
    private Category category;
    @OneToOne
    @JoinColumn(name="id_place")
    private Place place;
    @OneToOne
    @JoinColumn(name="id_status")
    private ItemStatus itemStatus;
    private String description;
    @Column(name = "id_user")
    private int idUser;
    @Column(name = "creation_timestamp")
    private Timestamp creationTimestamp;
    @Column(name = "update_timestamp")
    private Timestamp updateTimestamp;

    public Item cloneWithoutPlaces(){
        return new Item(
            this.idItem, this.itemName, this.category,
                null, this.itemStatus, this.description,
                this.idUser, this.creationTimestamp, this.updateTimestamp
        );
    }
}
