package com.example.Spring.airbnbProperty.resources;

import com.example.Spring.airbnbProperty.models.FavoriteProperty;
import com.example.Spring.airbnbProperty.repository.FavoritePropertyInterface;
import com.example.Spring.airbnbProperty.services.FavoritePropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

public class FavoritePropertyResources {



    @Autowired
    private FavoritePropertyService favoritePropertyService;

    // Create a new favorite property
    @PostMapping
    public ResponseEntity<FavoriteProperty> createFavoriteProperty(@RequestBody FavoriteProperty favoriteProperty) {
        FavoriteProperty createdFavoriteProperty = favoritePropertyService.createFavoriteProperty(favoriteProperty);
        return new ResponseEntity<>(createdFavoriteProperty, HttpStatus.CREATED);
    }

    // Get all favorite properties
    @GetMapping
    public ResponseEntity<List<FavoriteProperty>> getAllFavoriteProperties() {
        List<FavoriteProperty> favoriteProperties = favoritePropertyService.getAllFavoriteProperties();
        return new ResponseEntity<>(favoriteProperties, HttpStatus.OK);
    }

    // Get a favorite property by ID
    @GetMapping("/{id}")
    public ResponseEntity<FavoriteProperty> getFavoritePropertyById(@PathVariable Long id) {
        Optional<FavoriteProperty> favoriteProperty = favoritePropertyService.getFavoritePropertyById(id);
        return favoriteProperty
                .map(property -> new ResponseEntity<>(property, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update a favorite property
    @PutMapping("/{id}")
    public ResponseEntity<FavoriteProperty> updateFavoriteProperty(@PathVariable Long id, @RequestBody FavoriteProperty updatedFavoriteProperty) {
        if (favoritePropertyService.existsById(id)) {
            FavoriteProperty savedFavoriteProperty = favoritePropertyService.updateFavoriteProperty(id, updatedFavoriteProperty);
            return new ResponseEntity<>(savedFavoriteProperty, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete a favorite property
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFavoriteProperty(@PathVariable Long id) {
        if (favoritePropertyService.existsById(id)) {
            favoritePropertyService.deleteFavoriteProperty(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
