package com.example.Spring.airbnbProperty.services;

import com.example.Spring.airbnbProperty.models.AirbnbProperty;

import com.example.Spring.airbnbProperty.models.CreateProperty;

import com.example.Spring.airbnbProperty.models.User;
import com.example.Spring.airbnbProperty.models.dtos.GetAirBnbPropertiesRequest;
import com.example.Spring.airbnbProperty.repository.AirbnbRepositoryInterface;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class AirbnbService {

    private final AirbnbRepositoryInterface repo;
    private final PropertyImageService imageService;


    @Autowired
    public AirbnbService(AirbnbRepositoryInterface repositoryInterface, PropertyImageService imageService) {
        this.repo = repositoryInterface;
        this.imageService = imageService;

    }

    public boolean isBlank(String name) {
        return name == null || name.equals("");
    }

    // get insert delete
    public AirbnbProperty insertOne(CreateProperty createProperty) throws BadRequestException {
        if (isBlank(createProperty.getAirbnbProperty().getName())) {
            throw new BadRequestException("Property name must be supplied!");
        } else if (isBlank(createProperty.getAirbnbProperty().getDescription())) {
            throw new BadRequestException("Description must be supplied");
        }
        else if (isBlank(createProperty.getAirbnbProperty().getLocation())) {
            throw new BadRequestException("Location must be supplied");
        }
        if (createProperty.getAirbnbProperty().getEssentials() == null) {
            createProperty.getAirbnbProperty().setEssentials(false);
        }
        if (createProperty.getAirbnbProperty().getDedicatedWorkspace() == null) {
            createProperty.getAirbnbProperty().setDedicatedWorkspace(false);
        }
        if (createProperty.getAirbnbProperty().getCentralAirConditioning() == null) {
            createProperty.getAirbnbProperty().setCentralAirConditioning(false);
        }
        if (createProperty.getAirbnbProperty().getKitchen() == null) {
            createProperty.getAirbnbProperty().setKitchen(false);
        }
        if (createProperty.getAirbnbProperty().getFreeParking() == null) {
            createProperty.getAirbnbProperty().setFreeParking(false);
        }
        if (createProperty.getAirbnbProperty().getFirstAidKit() == null) {
            createProperty.getAirbnbProperty().setFirstAidKit(false);
        }
        if (createProperty.getAirbnbProperty().getWifi() == null) {
            createProperty.getAirbnbProperty().setWifi(false);
        }
        if (createProperty.getAirbnbProperty().getMountainView() == null) {
            createProperty.getAirbnbProperty().setMountainView(false);
        }
        if (createProperty.getAirbnbProperty().getPetsAllowed() == null) {
            createProperty.getAirbnbProperty().setPetsAllowed(false);
        }
        if (createProperty.getAirbnbProperty().getGardenView() == null) {
            createProperty.getAirbnbProperty().setGardenView(false);
        }

        User user = createProperty.getUser();
        AirbnbProperty propertySaved = createProperty.getAirbnbProperty();
        propertySaved.setUser(user);
        propertySaved = repo.save(createProperty.getAirbnbProperty());
        imageService.insertOne(propertySaved, createProperty.getPropertyImage());
        return propertySaved;
    }

    public Iterable<AirbnbProperty> getOne() {
        return repo.findAll();
    }


    public Iterable<AirbnbProperty> getAirbnbPropertyWithFilters(GetAirBnbPropertiesRequest request)throws BadRequestException {
        AirbnbProperty probe = new AirbnbProperty();

        if (request.getCentralAirConditioning() != null) {
            probe.setCentralAirConditioning(request.getCentralAirConditioning());
        } if (request.getMountainView() != null) {
            probe.setMountainView(request.getMountainView());
        } if (request.getEssentials() != null) {
            probe.setEssentials(request.getEssentials());
        } if (request.getDedicatedWorkspace() != null) {
            probe.setDedicatedWorkspace(request.getDedicatedWorkspace());
        } if (request.getFirstAidKit() != null) {
            probe.setFirstAidKit(request.getFirstAidKit());
        } if (request.getFreeParking() != null) {
            probe.setFreeParking(request.getFreeParking());
        } if (request.getKitchen() != null) {
            probe.setKitchen(request.getKitchen());
        }if (request.getGardenView() != null) {
            probe.setGardenView(request.getGardenView());
        } if (request.getWifi() != null) {
            probe.setWifi(request.getWifi());
        } if (request.getPetsAllowed() != null) {
            probe.setPetsAllowed(request.getPetsAllowed());
        }



        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnorePaths("id", "name", "description","location")
                .withIgnoreNullValues()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);

        Example<AirbnbProperty> example = Example.of(probe, matcher);
        Iterable<AirbnbProperty> airbnbPropertie = repo.findAll(example);
        if (!airbnbPropertie.iterator().hasNext()) {
           return new ArrayList<>();
        }
        return airbnbPropertie;
    }

    public List<AirbnbProperty> search(String keyword){
        return repo.searchProperty(keyword);

    }

    public AirbnbProperty getById(int id){
       return repo.getById(id);
    }
}

/* GardenView;
     Kitchen;
     DedicatedWorkspace;
     PetsAllowed;
     Essentials;
     MountainView;
     Wifi;
     FreeParking;
     CentralAirConditioning;
   */