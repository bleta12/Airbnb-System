package com.example.Spring.airbnbProperty.services;

import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import com.example.Spring.airbnbProperty.models.FavoriteProperty;
import com.example.Spring.airbnbProperty.models.User;
import com.example.Spring.airbnbProperty.models.dtos.FavoritePropertyDTO;
import com.example.Spring.airbnbProperty.repository.AirbnbRepositoryInterface;
import com.example.Spring.airbnbProperty.repository.FavoritePropertyInterface;
import com.example.Spring.airbnbProperty.repository.UserRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class FavoritePropertyService {

    public final FavoritePropertyInterface repo;
    public final UserRepositoryInterface userRepo;
    public final AirbnbRepositoryInterface airbnbRepo;

    @Autowired
    public FavoritePropertyService(FavoritePropertyInterface repo, UserRepositoryInterface userRepo, AirbnbRepositoryInterface airbnbRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
        this.airbnbRepo = airbnbRepo;
    }


    public FavoriteProperty createFavorite(FavoriteProperty favProperty) {
        User user = userRepo.findById(favProperty.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        AirbnbProperty property = airbnbRepo.findById(favProperty.getProperty().getId())
                .orElseThrow(() -> new IllegalArgumentException("Property not found"));

            if (repo.existsByUserIdAndPropertyId(user.getId(),property.getId())){
                  throw new IllegalArgumentException("The property already exist");
            }else
            {
                favProperty.setUser(user);
                favProperty.setProperty(property);
                return repo.save(favProperty);
            }
    }

    public List<FavoritePropertyDTO> getFavProperty(long userId) {
       return repo.findByUserId(userId);
    }


    public void deleteFavoriteProperty(FavoriteProperty favoriteProperty) {
        long Userid = favoriteProperty.getUser().getId();
        int propertyId = favoriteProperty.getProperty().getId();
         repo.deleteFavoriteProperty(Userid,propertyId);
    }
}
