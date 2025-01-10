package com.example.Spring.airbnbProperty.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateProperty {
    private AirbnbProperty airbnbProperty;
    private PropertyImage propertyImage;
    private User user;

}
