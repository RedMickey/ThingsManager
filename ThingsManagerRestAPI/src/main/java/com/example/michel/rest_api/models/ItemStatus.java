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
@Table(name = "item_status", schema = "public", catalog = "thingsManager")
public class ItemStatus {
    @Id
    @Column(name = "id_status")
    private int idStatus;
    @Column(name = "status_name")
    private String statusName;
}
