package com.example.Spring.airbnbProperty.models.dtos;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserDTO {
    private long id;
    private String name;
    private String lastname;
    private String email;
    private String username;
    private String phoneNumber;
    private String profilePicture;
    private String facebook;
    private String instagram;
    private String snapchat;
    private String twitter;

    public UserDTO(long id, String name, String lastname, String email, String username, String phoneNumber, String profilePicture, String facebook, String instagram, String snapchat, String twitter) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.profilePicture = profilePicture;
        this.facebook = facebook;
        this.instagram = instagram;
        this.snapchat = snapchat;
        this.twitter = twitter;
    }


}
