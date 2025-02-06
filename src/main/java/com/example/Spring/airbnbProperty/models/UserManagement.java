package com.example.Spring.airbnbProperty.models;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserManagement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String avatar;
    private String role;
    private String dateAdded;
    private String lastActive;

    // Constructors
    public UserManagement() {}

    public UserManagement(String name, String email, String avatar, String role, String dateAdded, String lastActive) {
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.role = role;
        this.dateAdded = dateAdded;
        this.lastActive = lastActive;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getDateAdded() { return dateAdded; }
    public void setDateAdded(String dateAdded) { this.dateAdded = dateAdded; }

    public String getLastActive() { return lastActive; }
    public void setLastActive(String lastActive) { this.lastActive = lastActive; }
}
