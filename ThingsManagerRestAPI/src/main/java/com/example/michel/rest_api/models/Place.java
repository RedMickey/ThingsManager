package com.example.michel.rest_api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_place")
    private Integer idPlace;
    private String description;
    @Column(name = "place_name")
    private String placeName;
    /*@Column(name = "id_outer_place")
    private Integer idOuterPlace;*/
    @OneToOne
    @JoinColumn(name="id_outer_place")
    private Place outerPlace;
    @Column(name = "id_place_type")
    private int idPlaceType;
    @Generated(GenerationTime.INSERT)
    @OneToOne
    @JoinColumn(name="id_status")
    private ItemStatus itemStatus;
    @Column(name = "id_user")
    private int idUser;
    @Generated(GenerationTime.INSERT)
    @Column(name = "creation_timestamp", insertable=false)
    private Timestamp creationTimestamp;
    @Generated(GenerationTime.ALWAYS)
    @Column(name = "update_timestamp", insertable=false)
    private Timestamp updateTimestamp;

    public Place cloneWithoutOuterPlaces(){
        return new Place(
            this.idPlace, this.description, this.placeName,
                null, this.idPlaceType, this.itemStatus, this.idUser,
                this.creationTimestamp, this.updateTimestamp
        );
    }
}
