package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.AirbnbProperty;


import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;





public interface AirbnbRepositoryInterface extends CrudRepository<AirbnbProperty, Integer>,QueryByExampleExecutor<AirbnbProperty> {



}
