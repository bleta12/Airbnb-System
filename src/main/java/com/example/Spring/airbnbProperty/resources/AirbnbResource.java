package com.example.Spring.airbnbProperty.resources;

import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import com.example.Spring.airbnbProperty.models.CreateProperty;
import com.example.Spring.airbnbProperty.services.AirbnbService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/properties", consumes = "application/json")
public class AirbnbResource {
    // get delete insert
    private final AirbnbService service;

    @Autowired
    public AirbnbResource(AirbnbService service) {
        this.service = service;
    }

    @PostMapping("/insert")
    public AirbnbProperty insertOne(@RequestBody CreateProperty airbnbProperty) throws BadRequestException {
        return service.insertOne(airbnbProperty);
    }


}
