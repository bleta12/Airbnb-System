package com.example.Spring.airbnbProperty.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "reservation")
public class Reservation {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private double cmimi;
    private LocalDate startDate;
    private LocalDate endDate;
    private String cardNumber;
    private String cvv;
    private String expirationDate;
    private String country;
    private int numberOfGuests;

}
