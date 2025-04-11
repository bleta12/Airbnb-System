package com.example.Spring.airbnbProperty.models.dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {


    private double cmimi;
    private LocalDate startDate;
    private LocalDate endDate;
    private int totalGuests;
    private int kids;
    private int adults;



}
