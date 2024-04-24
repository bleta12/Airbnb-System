<<<<<<< Updated upstream:src/main/java/com/example/Spring/airbnbProperty/models/Reservation.java
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


=======
package airbnbProperty.models;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
@Entity

@Table(name="Reserve")

public class Reservation {
    @Id


    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private double  cmimi;
    private String Lista;
    private int checkin;
    private int checkout;

}
>>>>>>> Stashed changes:src/main/java/airbnbProperty/models/Reservation.java
