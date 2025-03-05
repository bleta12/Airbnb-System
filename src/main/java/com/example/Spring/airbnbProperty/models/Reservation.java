package com.example.Spring.airbnbProperty.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    private int totalGuests;
    private int kids;
    private int adults;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AirbnbProperty airbnbProperty;



}
