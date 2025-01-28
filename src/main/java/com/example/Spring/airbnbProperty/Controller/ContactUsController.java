package com.example.contactform.controller;

import com.example.contactform.models.ContactUs;
import com.example.contactform.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000") // Allows frontend to access the backend
public class ContactUsController {
    private final ContactService contactService;

    public ContactUsController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<String> submitMessage(@RequestBody ContactUs contactMessage) {
        contactService.saveMessage(contactMessage);  // Fix: Using correct variable name
        return ResponseEntity.ok("Message received! We will contact you soon.");
    }
}
