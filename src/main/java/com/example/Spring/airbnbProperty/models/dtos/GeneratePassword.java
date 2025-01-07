package com.example.Spring.airbnbProperty.models.dtos;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GeneratePassword {

    private String currentPassword;
    private String newPassword;


}
