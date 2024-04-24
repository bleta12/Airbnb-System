package com.example.Spring.airbnbProperty.services;


import com.example.Spring.airbnbProperty.models.Reservation;

import com.example.Spring.airbnbProperty.repository.ReserveRepositoryInterface;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReserveService {

    private final ReserveRepositoryInterface repo;

    @Autowired
    public ReserveService(ReserveRepositoryInterface repositoryInterface) {
        this.repo = repositoryInterface;
    }
    // get insert delete
    public Reservation insertOne(Reservation reservation) throws BadRequestException {

        return repo.save(reservation);
    }
}
