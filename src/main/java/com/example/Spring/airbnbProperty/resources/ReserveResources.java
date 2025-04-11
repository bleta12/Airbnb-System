package com.example.Spring.airbnbProperty.resources;


import com.example.Spring.airbnbProperty.exception.UserNotFoundException;
import com.example.Spring.airbnbProperty.models.Reservation;
import com.example.Spring.airbnbProperty.models.dtos.ReservationDTO;
import com.example.Spring.airbnbProperty.services.ReserveService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/reservation")
public class ReserveResources {
    // get delete insert
    private final ReserveService service;
    @Autowired
    public ReserveResources(ReserveService service) {
        this.service = service;
    }

    @PostMapping("/insert")
    public Reservation insertOne(@RequestBody Reservation reservation) throws BadRequestException, UserNotFoundException {
        int totalGuests = reservation.getAdults() + reservation.getKids();
        reservation.setTotalGuests(totalGuests);

        return service.insertOne(reservation);

        }


    @GetMapping
    public List<ReservationDTO> getReservation(@RequestParam long userId){
        return service.getMyReservation(userId);
    }
    }



