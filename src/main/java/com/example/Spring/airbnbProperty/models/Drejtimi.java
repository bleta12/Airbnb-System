package com.example.Spring.airbnbProperty.models;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "Drejtimi")
public class Drejtimi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private int duration;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "universiteti_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Universiteti universiteti;

}
