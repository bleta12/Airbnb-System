package com.example.Spring.airbnbProperty.models;

import jakarta.persistence.*;


@Entity
@Table(name = "reservation")
public class Reservation {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private double cmimi;
    private int checkin;
    private int checkout;
    private String password;
    

}


