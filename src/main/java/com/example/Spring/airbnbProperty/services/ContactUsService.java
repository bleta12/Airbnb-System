package com.example.Spring.airbnbProperty.services;


import com.example.Spring.airbnbProperty.models.ContactUs;
import com.example.Spring.airbnbProperty.models.dtos.TokenResponse;
import com.example.Spring.airbnbProperty.models.dtos.UserDTO;
import com.example.Spring.airbnbProperty.models.dtos.UserProfilePasswordUpdateDto;
import com.example.Spring.airbnbProperty.models.enums.Role;
import com.example.Spring.airbnbProperty.repository.ContactUsRepository;
import com.example.Spring.airbnbProperty.repository.UserRepositoryInterface;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactUsService {

    private final ContactUsRepository contactUsRepository;

    public ContactUsService(ContactUsRepository contactUsRepository) {
        this.contactUsRepository = contactUsRepository;
    }

    // Save message to the database with basic error handling
    public ContactUs saveMessage(ContactUs message) {
        try {
            return contactUsRepository.save(message);
        } catch (DataIntegrityViolationException e) {
            // Handle any specific DB errors here
            throw new RuntimeException("Message could not be saved: Integrity violation");
        } catch (Exception e) {
            // Handle other exceptions
            throw new RuntimeException("An error occurred while saving the message");
        }
    }

    // Retrieve all messages
    public List<ContactUs> getAllMessages() {
        return contactUsRepository.findAll();
    }
}
