package com.example.Spring.airbnbProperty.models.dtos;

import com.example.Spring.airbnbProperty.models.User;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserProfilePasswordUpdateDto {

   private User user;
   private GeneratePassword password;

}
