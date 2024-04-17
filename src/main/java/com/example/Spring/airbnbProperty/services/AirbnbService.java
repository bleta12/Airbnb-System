package com.example.Spring.airbnbProperty.services;

import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import com.example.Spring.airbnbProperty.repository.AirbnbRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AirbnbService {

    private final AirbnbRepository repository;

    @Autowired
    public AirbnbService(AirbnbRepository repository) {
        this.repository = repository;
    }
    // get insert delete
    public AirbnbProperty insertOne(AirbnbProperty airbnbProperty) throws BadRequestException {
        if(airbnbProperty.getName() == null){
            throw new BadRequestException("Name must be supplied!");
        }
        return repository.insertOne(airbnbProperty);
    }
}
