package com.example.Spring.airbnbProperty.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "ligjerata")
public class Ligjerata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lectureID;

    private String lectureName;

    @ManyToOne
    @JoinColumn(name = "lecturerID")
    private Ligjeruesi ligjeruesi;
}
