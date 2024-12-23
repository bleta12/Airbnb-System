package com.example.Spring.airbnbProperty.models.dtos;

public class TokenRefreshResponse {

    private String accessToken;


    public TokenRefreshResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
