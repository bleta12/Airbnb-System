package com.example.Spring.airbnbProperty.services;


import com.example.Spring.airbnbProperty.models.User;
import com.example.Spring.airbnbProperty.repository.UserRepositoryInterface;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}

