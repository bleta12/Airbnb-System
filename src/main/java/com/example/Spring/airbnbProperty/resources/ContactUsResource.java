package com.example.Spring.airbnbProperty.resources;

import com.example.Spring.airbnbProperty.models.ContactUs;
import com.example.Spring.airbnbProperty.services.ContactUsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactUsResource {
    private final ContactUsService contactUsService;

    public ContactUsResource(ContactUsService contactUsService) {
        this.contactUsService = contactUsService;
    }

    @PostMapping
    public ResponseEntity<String> submitMessage(@RequestBody ContactUs contactMessage) {
        contactUsService.saveMessage(contactMessage);
        return ResponseEntity.ok("Message received! We will contact you soon.");
    }

    @GetMapping
    public ResponseEntity<List<ContactUs>> getAllMessages() {
        List<ContactUs> messages = contactUsService.getAllMessages();
        return ResponseEntity.ok(messages);
    }
}
