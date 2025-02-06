package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.FavoriteProperty;
import com.example.Spring.airbnbProperty.models.dtos.FavoritePropertyDTO;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoritePropertyInterface  extends CrudRepository<FavoriteProperty,Integer> {



    @Query("SELECT new com.example.Spring.airbnbProperty.models.dtos.FavoritePropertyDTO(f.property, f.comment) " +
            "FROM FavoriteProperty f WHERE f.user.id = :userId")
    List<FavoritePropertyDTO> findByUserId(@Param("userId") Long userId);


    @Query("Select count(f) > 0 from FavoriteProperty f where f.user.id = :userId and f.property.id = :propertyId")
    boolean existsByUserIdAndPropertyId(@Param("userId") Long userId, @Param("propertyId") int propertyId);


    @Modifying
    @Transactional
    @Query("DELETE FROM FavoriteProperty f WHERE f.user.id = :userId AND f.property.id = :propertyId")
    void deleteFavoriteProperty(@Param("userId") Long userId, @Param("propertyId") int propertyId);



}
