package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerator;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class AirbnbRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AirbnbRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    public AirbnbProperty insertOne(AirbnbProperty airbnbProperty){
        String sql = "INSERT INTO airbnb_property (name, description) VALUES (?, ?)";
        jdbcTemplate.update(sql, airbnbProperty.getName(), airbnbProperty.getDescription());
        return airbnbProperty;
    }


}
