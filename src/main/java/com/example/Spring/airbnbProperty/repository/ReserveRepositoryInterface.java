package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ReserveRepositoryInterface  extends CrudRepository<Reservation,Integer> {



}
