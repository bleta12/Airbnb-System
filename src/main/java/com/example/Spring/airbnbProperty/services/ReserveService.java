package com.example.Spring.airbnbProperty.services;


import com.example.Spring.airbnbProperty.exception.UserNotFoundException;
import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import com.example.Spring.airbnbProperty.models.Reservation;

import com.example.Spring.airbnbProperty.models.User;
import com.example.Spring.airbnbProperty.repository.AirbnbRepositoryInterface;
import com.example.Spring.airbnbProperty.repository.ReserveRepositoryInterface;
import com.example.Spring.airbnbProperty.repository.UserRepositoryInterface;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReserveService {

    private final ReserveRepositoryInterface repo;
    private final UserRepositoryInterface userRepo;
    private final AirbnbRepositoryInterface propertyRepo;


    @Autowired
    public ReserveService(ReserveRepositoryInterface repositoryInterface, UserRepositoryInterface userRepo, AirbnbRepositoryInterface propertyRepo) {
        this.repo = repositoryInterface;
        this.userRepo = userRepo;
        this.propertyRepo = propertyRepo;
    }


    // get insert delete
    public Reservation insertOne(Reservation reservation) throws BadRequestException, UserNotFoundException {

        long userId=reservation.getUser().getId();
        User existingUser = userRepo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

          reservation.setUser(existingUser);


        int propertyId=reservation.getAirbnbProperty().getId();
        AirbnbProperty existingProperty = propertyRepo.findById(propertyId)
                .orElseThrow(() -> new UserNotFoundException("Property not found with id: " + propertyId));

        reservation.setAirbnbProperty(existingProperty);

        return repo.save(reservation);
    }
}
