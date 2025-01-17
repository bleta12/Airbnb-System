package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.FavoriteProperty;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FavoritePropertyInterface  extends CrudRepository<FavoriteProperty,Integer> {





}
