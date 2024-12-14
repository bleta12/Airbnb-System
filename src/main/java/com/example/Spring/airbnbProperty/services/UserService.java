package com.example.Spring.airbnbProperty.services;


import com.example.Spring.airbnbProperty.exception.UserNotFoundException;
import com.example.Spring.airbnbProperty.models.MyUser;
import com.example.Spring.airbnbProperty.models.User;
import com.example.Spring.airbnbProperty.repository.UserRepositoryInterface;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService  {

    private final UserRepositoryInterface repo;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    @Autowired
    public UserService(UserRepositoryInterface repositoryInterface) {
        this.repo = repositoryInterface;
    }

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JWTService jwtService;


    // get insert delete
    public User insertOne(User user) throws BadRequestException {
        if(user.getName() == null){
            throw new BadRequestException("Name must be supplied!");
        }
        if(user.getPassword()==null){
            throw new BadRequestException("Password must be supplied!");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }
    public User getUserById(Long id) throws UserNotFoundException {
        Optional<User> user = repo.findById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new UserNotFoundException("User not found with id: " + id);
        }
    }

    public List<User> getAllUsers() {
        return (List<User>) repo.findAll();
    }

    public User updateUser(Long id, User updatedUser) throws UserNotFoundException {
        if (repo.existsById(id)) {
            updatedUser.setId(id);
            return repo.save(updatedUser);
        } else {
            throw new UserNotFoundException("User not found with id: " + id);
        }
    }

    public void deleteUser(Long id) throws UserNotFoundException {
        if (repo.existsById(id)) {
            repo.deleteById(id);
        } else {
            throw new UserNotFoundException("User not found with id: " + id);
        }
    }


    public String verify(User user) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));

        if (authentication.isAuthenticated()){
            return jwtService.generateToken(user.getUsername());
        }
        return "fail";

    }


}

