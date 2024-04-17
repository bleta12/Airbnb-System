package com.example.Spring.airbnbProperty.resources;

import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import com.example.Spring.airbnbProperty.services.AirbnbService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = "/properties", consumes = "application/json")
public class AirbnbResource {
    // get delete insert

    private final AirbnbService service;

    @Autowired
    public AirbnbResource(AirbnbService service) {
        this.service = service;
    }
    // get insert delete
    @PostMapping("/insert")
    public AirbnbProperty insertOne(@RequestBody AirbnbProperty airbnbProperty) throws BadRequestException {

        return service.insertOne(airbnbProperty);
    }


}
