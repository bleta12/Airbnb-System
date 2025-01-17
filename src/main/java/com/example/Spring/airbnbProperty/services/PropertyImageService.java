package com.example.Spring.airbnbProperty.services;

import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import com.example.Spring.airbnbProperty.models.PropertyImage;
import com.example.Spring.airbnbProperty.repository.ImageRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PropertyImageService {

    public ImageRepositoryInterface imageRepo;

    @Autowired
    public PropertyImageService(ImageRepositoryInterface imageRepo) {
        this.imageRepo = imageRepo;
    }

    public void insertOne(AirbnbProperty property, PropertyImage propertyImage) {
        propertyImage.setProperty(property);
        imageRepo.save(propertyImage);
    }

    public int updatePropertyImage(PropertyImage image){
        return imageRepo.updatePropertyImages(image.getId(), image.getPhoto1(), image.getPhoto2(), image.getPhoto3(), image.getPhoto4(), image.getPhoto5());
    }
}
