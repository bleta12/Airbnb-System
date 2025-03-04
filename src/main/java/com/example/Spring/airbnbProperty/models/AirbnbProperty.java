package com.example.Spring.airbnbProperty.models;




import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
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
    private String location;
    private Boolean GardenView;
    private Boolean Kitchen;
    private Boolean DedicatedWorkspace;
    private Boolean PetsAllowed;
    private Boolean Essentials;
    private Boolean MountainView;
    private Boolean Wifi;
    private Boolean FreeParking;
    private Boolean CentralAirConditioning;
    private Boolean FirstAidKit;
    @Column(precision = 12, scale = 2)
    private BigDecimal price;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    private List<PropertyImage> attributes = new ArrayList<>();


    @Override
    public String toString() {
        return "AirbnbProperty{" +
                "id=" + id +
                ", wifi=" + Wifi +
                ", freeParking=" + FreeParking +
                ", dedicatedWorkspace=" + DedicatedWorkspace +
                ", kitchen=" + Kitchen +
                ", mountainView=" + MountainView +
                ", petsAllowed=" + PetsAllowed +
                ", essentials=" + Essentials +
                ", centralAirConditioning=" + CentralAirConditioning +
                ", firstAidKit=" + FirstAidKit +
                ", gardenView=" + GardenView +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", price='" + price + '\'' +
                ", description='" + description + '\'' +
                ", userId=" + user +
                '}';
    }



}
