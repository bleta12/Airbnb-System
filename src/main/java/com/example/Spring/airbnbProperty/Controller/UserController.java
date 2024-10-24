package com.example.Spring.airbnbProperty.Controller;


import com.example.Spring.airbnbProperty.models.User;
import com.example.Spring.airbnbProperty.exception.UserNotFoundException;
import com.example.Spring.airbnbProperty.repository.UserRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
  /*  @Autowired
    private UserRepositoryInterface userRepositoryInterface;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return userRepositoryInterface.save(newUser);
    }

    @GetMapping("/user")
    Iterable<User> getAllUsers() {
        return userRepositoryInterface.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepositoryInterface.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return userRepositoryInterface.findById(id)
                .map(user -> {
                    user.setLastname(newUser.getLastname());
                    user.setPhoneNumber(newUser.getPhoneNumber());
                    user.setPassword(newUser.getPassword());
                    user.setUsername(newUser.getUsername());
                    user.setName(newUser.getName());
                    user.setEmail(newUser.getEmail());
                    return userRepositoryInterface.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id){
        if(!userRepositoryInterface.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepositoryInterface.deleteById(id);
        return  "User with id "+id+" has been deleted success.";
    }*/
}

