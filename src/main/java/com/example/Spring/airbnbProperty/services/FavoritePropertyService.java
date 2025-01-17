package com.example.Spring.airbnbProperty.services;

import com.example.Spring.airbnbProperty.models.FavoriteProperty;
import com.example.Spring.airbnbProperty.repository.FavoritePropertyInterface;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class FavoritePropertyService {
   /* @Autowired
    private final FavoritePropertyInterface favoritePropertyRepository;

    public FavoritePropertyService(FavoritePropertyInterface favoritePropertyRepository) {
        this.favoritePropertyRepository = favoritePropertyRepository;
    }


    public FavoriteProperty createFavoriteProperty(FavoriteProperty favoriteProperty) {
        return favoritePropertyRepository.save(favoriteProperty);
    }


    public List<FavoriteProperty> getAllFavoriteProperties() {
        return (List<FavoriteProperty>) favoritePropertyRepository.findAll();
    }


    public Optional<FavoriteProperty> getFavoritePropertyById(Long id) {
        return favoritePropertyRepository.findById(Math.toIntExact(id));
    }


    public FavoriteProperty updateFavoriteProperty(Long id, FavoriteProperty updatedFavoriteProperty) {
        updatedFavoriteProperty.setId(Math.toIntExact(id));
        return favoritePropertyRepository.save(updatedFavoriteProperty);
    }


    public void deleteFavoriteProperty(Long id) {
        favoritePropertyRepository.deleteById(Math.toIntExact(id));
    }


    public boolean existsById(Long id) {
        return favoritePropertyRepository.existsById(Math.toIntExact(id));
    }*/
}
