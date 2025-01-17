package com.example.Spring.airbnbProperty.repository;


import com.example.Spring.airbnbProperty.models.ReviewProperty;
import com.example.Spring.airbnbProperty.models.dtos.ReviewPropertyWithUsername;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewPropertyRepositoryInterface extends CrudRepository<ReviewProperty,Integer> {


    @Query("SELECT new com.example.Spring.airbnbProperty.models.dtos.ReviewPropertyWithUsername(" +
            "r.ratingValue, r.comment, u.username) " +
            "FROM ReviewProperty r JOIN r.user u " +
            "WHERE r.property.id = :propertyId")
    List<ReviewPropertyWithUsername> findReviewsWithUsernameByPropertyId(@Param("propertyId") Integer propertyId);

}
