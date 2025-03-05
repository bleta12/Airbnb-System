package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.AirbnbProperty;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.query.QueryByExampleExecutor;

import java.math.BigDecimal;
import java.util.List;


public interface AirbnbRepositoryInterface extends CrudRepository<AirbnbProperty, Integer>,QueryByExampleExecutor<AirbnbProperty> {
    @Query("SELECT p FROM AirbnbProperty p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))" )

    List<AirbnbProperty> searchProperty(@Param("keyword") String keyword);

    @Query("SELECT p FROM AirbnbProperty p WHERE p.id = :id")
    AirbnbProperty getById(@Param("id") int id);

    @Query("SELECT p FROM AirbnbProperty p WHERE p.user.id = :id")
    List<AirbnbProperty> getByUserId(@Param("id") long id);


    @Query("SELECT p.price FROM AirbnbProperty p WHERE p.id = :propertyId")
    BigDecimal findPropertyPrice(@Param("propertyId") int propertyId);


}
