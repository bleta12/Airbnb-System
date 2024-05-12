package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.PropertyImage;
import org.springframework.data.repository.CrudRepository;

public interface ImageRepositoryInterface  extends CrudRepository<PropertyImage,Integer>
{
}
