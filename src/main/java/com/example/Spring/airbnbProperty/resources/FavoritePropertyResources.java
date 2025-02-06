package com.example.Spring.airbnbProperty.resources;


import com.example.Spring.airbnbProperty.models.FavoriteProperty;
import com.example.Spring.airbnbProperty.models.dtos.FavoritePropertyDTO;
import com.example.Spring.airbnbProperty.services.FavoritePropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "/favorite")
public class FavoritePropertyResources {


    private final FavoritePropertyService service;

    @Autowired
    public FavoritePropertyResources(FavoritePropertyService service) {
        this.service = service;
    }

    @PostMapping
    public FavoriteProperty createFavorite(@RequestBody FavoriteProperty favProperty){
        return service.createFavorite(favProperty);
    }

    @GetMapping
    public List<FavoritePropertyDTO> getFavProperty(@RequestParam long userId){
        return service.getFavProperty(userId);
    }

    @DeleteMapping
    public void deleteFavoriteProperty(@RequestBody FavoriteProperty favoriteProperty){
         service.deleteFavoriteProperty(favoriteProperty);
    }

}
