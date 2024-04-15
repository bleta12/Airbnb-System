package airbnbProperty.models;


import lombok.Data;

@Data
public class Signup {
    private String name;
    private String lastname;
    private String email;
    private String password;
}