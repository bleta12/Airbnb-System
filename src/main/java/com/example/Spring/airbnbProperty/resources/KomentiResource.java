package com.example.Spring.airbnbProperty.resources;

import com.example.Spring.airbnbProperty.models.Komenti;
import com.example.Spring.airbnbProperty.services.KomentiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/komente")
@CrossOrigin(origins = "http://localhost:3000")
public class KomentiResource {
    private final KomentiService service;

    @Autowired
    public KomentiResource(KomentiService service) {
        this.service = service;
    }

    @PostMapping("/create/{postId}")
    public Komenti create(@PathVariable Long postId, @RequestBody Komenti komenti) {
        return service.create(postId, komenti);
    }

    @GetMapping("/get")
    public List<Komenti> getAll() {
        return service.getAll();
    }

    @GetMapping("/getByPost/{postId}")
    public List<Komenti> getByPostId(@PathVariable Long postId) {
        return service.getByPost(postId);
    }

    @PutMapping("/edit/{id}")
    public Komenti update(@PathVariable Long id, @RequestBody Komenti komenti) {
        return service.update(id, komenti);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
