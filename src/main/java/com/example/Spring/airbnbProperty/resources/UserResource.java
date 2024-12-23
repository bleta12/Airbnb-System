package com.example.Spring.airbnbProperty.resources;

import com.example.Spring.airbnbProperty.exception.UserNotFoundException;
import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import com.example.Spring.airbnbProperty.models.CreateProperty;
import com.example.Spring.airbnbProperty.models.User;
//import com.example.Spring.airbnbProperty.models.CreateProperty;
import com.example.Spring.airbnbProperty.repository.UserRepositoryInterface;
import com.example.Spring.airbnbProperty.services.UserService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/user")
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
    @PostMapping("/login")
    public String login(@RequestBody User user) throws BadRequestException {
        return service.verify(user);
    }
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) throws UserNotFoundException {
        return service.getUserById(id);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) throws UserNotFoundException {
        return service.updateUser(id, updatedUser);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) throws UserNotFoundException {
        service.deleteUser(id);
    }



}
