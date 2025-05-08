package com.example.Spring.airbnbProperty.resources;

import com.example.Spring.airbnbProperty.models.Postimi;
import com.example.Spring.airbnbProperty.services.PostimiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/postime")
@CrossOrigin(origins = "http://localhost:3000")
public class PostimiResource {
    private final PostimiService service;

    @Autowired
    public PostimiResource(PostimiService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public Postimi create(@RequestBody Postimi post) {
        return service.create(post);
    }

    @GetMapping("/get")
    public Iterable<Postimi> getAll() {
        return service.getAll();
    }

    @GetMapping("/getById/{id}")
    public Postimi getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/edit/{id}")
    public Postimi update(@PathVariable Long id, @RequestBody Postimi post) {
        return service.update(id, post);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
