package com.example.Spring.airbnbProperty.resources;

import com.example.Spring.airbnbProperty.models.User;
import com.example.Spring.airbnbProperty.services.UserService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/user", consumes = "application/json")
public class UserResource {
    // get delete insert
    private final UserService service;
    @Autowired

    public UserResource(UserService service) {
        this.service = service;
    }

    @PostMapping("/insert")
    public User insertOne(@RequestBody User user) throws BadRequestException {
        return service.insertOne(user);
    }

}
