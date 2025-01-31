package com.example.Spring.airbnbProperty.Controller;


import com.example.Spring.airbnbProperty.models.ContactUs;
import com.example.Spring.airbnbProperty.services.ContactUsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000") // Lejon frontend-in të komunikojë me backend-in
public class  ContactUsController {
    private final ContactUsService contactService;

    public ContactUsController(ContactUsService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<String> submitMessage(@RequestBody ContactUs contactMessage) {
        contactService.saveMessage(contactMessage);
        return ResponseEntity.ok("Message received! We will contact you soon.");
    }

    @GetMapping
    public ResponseEntity<List<ContactUs>> getAllMessages() {
        List<ContactUs> messages = contactService.getAllMessages();
        return ResponseEntity.ok(messages);
    }
}
