package com.example.Spring.airbnbProperty.services;

import com.example.Spring.airbnbProperty.models.UserManagement;
import com.example.Spring.airbnbProperty.repository.UserManagementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserManagementService {
    private final UserManagementRepository userManagementRepository;

    // Constructor for dependency injection
    public UserManagementService(UserManagementRepository userManagementRepository) {
        this.userManagementRepository = userManagementRepository;
    }

    // Get all users from the database
    public List<UserManagement> getAllUsers() {
        return userManagementRepository.findAll();
    }

    // Save a new user to the database
    public UserManagement saveUser(UserManagement user) {
        return userManagementRepository.save(user);
    }

    // Delete a user by their ID
    public void deleteUser(Long id) {
        userManagementRepository.deleteById(id);
    }
}
