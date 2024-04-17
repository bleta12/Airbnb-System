package com.example.Spring.airbnbProperty.models;

import jakarta.persistence.*;


@Table(name="Test")

@Entity
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int userId;

    private int propertyId;

    private int ratingValue;


}
