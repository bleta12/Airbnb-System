package com.example.Spring.airbnbProperty.models.dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReviewPropertyWithUsername {
    private int ratingValue;
    private String comment;
    private String username;

    public ReviewPropertyWithUsername(int ratingValue, String comment, String username) {
        this.ratingValue = ratingValue;
        this.comment = comment;
        this.username = username;
    }
}
