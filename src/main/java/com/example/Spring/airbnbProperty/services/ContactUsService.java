package com.example.Spring.airbnbProperty.repository;

import com.example.contactform.models.ContactUs;
import com.example.contactform.repository.ContactUsRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactUsService {

    private final ContactUsRepository contactUsRepository;

    public ContactUsService(ContactUsRepository contactUsRepository) {
        this.contactUsRepository = contactUsRepository;
    }

    // Save message to database
    public ContactUs saveMessage(ContactUs message) {
        return contactUsRepository.save(message); // Ensure this method is inherited properly
    }
}
