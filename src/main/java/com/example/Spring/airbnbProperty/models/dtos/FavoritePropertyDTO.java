package com.example.Spring.airbnbProperty.models.dtos;


import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FavoritePropertyDTO {

    private AirbnbProperty property;
    private String comment;

}
