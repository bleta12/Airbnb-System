package com.example.Spring.airbnbProperty.services;

import com.example.Spring.airbnbProperty.models.AirbnbProperty;

import com.example.Spring.airbnbProperty.models.CreateProperty;
import com.example.Spring.airbnbProperty.repository.AirbnbRepositoryInterface;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AirbnbService {

    private final AirbnbRepositoryInterface repo;
    private final PropertyImageService imageService;


    @Autowired
    public AirbnbService(AirbnbRepositoryInterface repositoryInterface, PropertyImageService imageService) {
        this.repo = repositoryInterface;
        this.imageService = imageService;
    }

    public boolean isBlank(String name){
        return name==null || name.equals("");
    }
    // get insert delete
    public AirbnbProperty insertOne(CreateProperty createProperty) throws BadRequestException {
        if(isBlank(createProperty.getAirbnbProperty().getName())){
            throw new BadRequestException("Property name must be supplied!");
        }else if(isBlank(createProperty.getAirbnbProperty().getDescription())){
            throw new BadRequestException("Description must be supplied");
        }

        AirbnbProperty propertySaved = repo.save(createProperty.getAirbnbProperty());
        imageService.insertOne(propertySaved,createProperty.getPropertyImage());
        return propertySaved;
    }
}
