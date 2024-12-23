package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.FavoriteProperty;
import org.springframework.data.repository.CrudRepository;

public interface FavoritePropertyInterface  extends CrudRepository<FavoriteProperty,Integer> {
}
