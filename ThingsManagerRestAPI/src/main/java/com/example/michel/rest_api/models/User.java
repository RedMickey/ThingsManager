package com.example.michel.rest_api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sys_user", schema = "public", catalog = "thingsManager")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sys_user")
    private Integer idUser;
    @Column(name = "user_email")
    private String userEmail;
    private String login;
    private String name;
    private String surname;
    private String password;
}
