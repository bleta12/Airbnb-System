package com.example.Spring.airbnbProperty.services;

import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import com.example.Spring.airbnbProperty.repository.AirbnbRepositoryInterface;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AirbnbService {

    private final AirbnbRepositoryInterface repo;

    @Autowired
    public AirbnbService(AirbnbRepositoryInterface repositoryInterface) {
        this.repo = repositoryInterface;
    }
    // get insert delete
    public AirbnbProperty insertOne(AirbnbProperty airbnbProperty) throws BadRequestException {
        if(airbnbProperty.getName() == null){
            throw new BadRequestException("Name must be supplied!");
        }
        return repo.save(airbnbProperty);
    }
}
