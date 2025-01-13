package com.example.Spring.airbnbProperty.resources;


import com.example.Spring.airbnbProperty.models.ReviewProperty;
import com.example.Spring.airbnbProperty.services.ReviewPropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/reviews")
public class ReviewPropertyResource {

    private final ReviewPropertyService service;

   @Autowired
    public ReviewPropertyResource(ReviewPropertyService reviewPropertyService) {
        this.service = reviewPropertyService;
    }

    @PostMapping("/createReview")
    public ReviewProperty createReview(@RequestBody ReviewProperty reviewProperty){
       return service.createReview(reviewProperty);

    }

}
