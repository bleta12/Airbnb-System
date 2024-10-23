package com.example.Spring.airbnbProperty.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "FavoriteProperty")
public class FavoriteProperty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int propertyId;
    private int userId;

}
