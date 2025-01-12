package com.example.Spring.airbnbProperty.exception;

public class UnauthorizedException extends RuntimeException {


    public UnauthorizedException(String message) {
        super(message);
    }

    public UnauthorizedException(String message, Throwable cause) {
        super(message, cause);
    }
}
