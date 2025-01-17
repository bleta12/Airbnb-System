package com.example.Spring.airbnbProperty.services;


import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import com.example.Spring.airbnbProperty.models.ReviewProperty;
import com.example.Spring.airbnbProperty.models.User;
import com.example.Spring.airbnbProperty.models.dtos.ReviewPropertyWithUsername;
import com.example.Spring.airbnbProperty.repository.AirbnbRepositoryInterface;
import com.example.Spring.airbnbProperty.repository.ReviewPropertyRepositoryInterface;
import com.example.Spring.airbnbProperty.repository.UserRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewPropertyService {

    private final ReviewPropertyRepositoryInterface repo;
    private final UserRepositoryInterface userRepo;
    public final AirbnbRepositoryInterface airbnbRepo;

    @Autowired
    public ReviewPropertyService(ReviewPropertyRepositoryInterface repo, UserRepositoryInterface userRepo, AirbnbRepositoryInterface airbnbRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
        this.airbnbRepo = airbnbRepo;
    }


    public ReviewProperty createReview(ReviewProperty reviewProperty) {

        User user = userRepo.findById(reviewProperty.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        AirbnbProperty property = airbnbRepo.findById(reviewProperty.getProperty().getId())
                .orElseThrow(() -> new IllegalArgumentException("Property not found"));

        reviewProperty.setUser(user);
        reviewProperty.setProperty(property);

        return repo.save(reviewProperty);
    }


    public List<ReviewPropertyWithUsername> getReviews(int idProperty) {

        return repo.findReviewsWithUsernameByPropertyId(idProperty);

    }

}
