package com.example.Spring.airbnbProperty.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "postimet")
public class Postimi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private String authorName;

    @OneToMany(mappedBy = "postimi", cascade = CascadeType.ALL)
    private List<Komenti> komentet;
}

