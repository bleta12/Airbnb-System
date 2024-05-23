package com.example.Spring.airbnbProperty.services;


import com.example.Spring.airbnbProperty.exception.UserNotFoundException;
import com.example.Spring.airbnbProperty.models.User;
import com.example.Spring.airbnbProperty.repository.UserRepositoryInterface;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepositoryInterface repo;

    @Autowired
    public UserService(UserRepositoryInterface repositoryInterface) {
        this.repo = repositoryInterface;
    }
    // get insert delete
    public User insertOne(User user) throws BadRequestException {
        if(user.getName() == null){
            throw new BadRequestException("Name must be supplied!");
        }
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
}

