package com.example.Spring.airbnbProperty.resources;

import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import com.example.Spring.airbnbProperty.models.CreateProperty;
import com.example.Spring.airbnbProperty.models.dtos.GetAirBnbPropertiesRequest;
import com.example.Spring.airbnbProperty.services.AirbnbService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping(path = "/properties")
public class AirbnbResource {
    // get delete insert
    private final AirbnbService service;

    @Autowired
    public AirbnbResource(AirbnbService service) {
        this.service = service;
    }

    @PostMapping(value="/insert",consumes ="application/json")
    public AirbnbProperty insertOne(@RequestBody CreateProperty airbnbProperty) throws BadRequestException {
        return service.insertOne(airbnbProperty);
    }

    @GetMapping("/get")
    public Iterable<AirbnbProperty> getAll() {
        return service.getOne();
    }

    @GetMapping("/getByFilters")
    public Iterable<AirbnbProperty> getAirbnbPropertyWithFilters( GetAirBnbPropertiesRequest request) {
        return service.getAirbnbPropertyWithFilters(request);
    }

}


