package com.example.Spring.airbnbProperty.resources;

import com.example.Spring.airbnbProperty.exception.UserNotFoundException;
import com.example.Spring.airbnbProperty.models.User;
import com.example.Spring.airbnbProperty.models.dtos.GeneratePassword;
import com.example.Spring.airbnbProperty.models.dtos.TokenResponse;
import com.example.Spring.airbnbProperty.models.dtos.UserDTO;
import com.example.Spring.airbnbProperty.models.dtos.UserProfilePasswordUpdateDto;
import com.example.Spring.airbnbProperty.services.UserService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


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
    @PostMapping(value = "/insert/profilePicture", consumes = "application/json")
    public Optional<User> insertPhoto(@RequestBody User user) throws BadRequestException {
        return service.insertPhoto(user);
    }
    @PostMapping("/login")
    public TokenResponse login(@RequestBody User user) throws BadRequestException {
        return service.verify(user);
    }
    @GetMapping("userProfileById/{id}")
    public UserDTO getUserProfileById(@PathVariable Long id) throws UserNotFoundException {
        return service.getUserProfileById(id);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }


    @PutMapping(value="/updateUserProfile/{id}",consumes ="application/json")
    public UserDTO updateUserProfile(@PathVariable Long id, @RequestBody UserProfilePasswordUpdateDto userProfilePasswordUpdateDto) throws UserNotFoundException {
        return service.updateUserProfile(id, userProfilePasswordUpdateDto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) throws UserNotFoundException {
        service.deleteUser(id);
    }

    @GetMapping("/getOwner/{propertyId}")
    public UserDTO getOwner(@PathVariable int propertyId) {
        return service.getOwner(propertyId);
    }


}
