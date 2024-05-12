package com.example.Spring.airbnbProperty.models;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class AirbnbProperty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private boolean GardenView;
    private boolean Kitchen;
    private boolean DedicatedWorkspace;
    private boolean PetsAllowed;
    private boolean Essentials;
    private boolean MountainView;
    private boolean Wifi;
    private boolean FreeParking;
    private boolean CentralAirConditioning;
    private boolean FirstAidKit;


    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    private List<PropertyImage> attributes = new ArrayList<>();




}
