package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.PropertyImage;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ImageRepositoryInterface  extends CrudRepository<PropertyImage,Integer>
{

    @Modifying
    @Query("UPDATE PropertyImage p SET p.photo1 = :photo1, p.photo2 = :photo2, p.photo3 = :photo3, p.photo4 = :photo4, p.photo5 = :photo5 WHERE p.id = :id")
    int updatePropertyImages(@Param("id") int id,
                             @Param("photo1") String photo1,
                             @Param("photo2") String photo2,
                             @Param("photo3") String photo3,
                             @Param("photo4") String photo4,
                             @Param("photo5") String photo5);


}
