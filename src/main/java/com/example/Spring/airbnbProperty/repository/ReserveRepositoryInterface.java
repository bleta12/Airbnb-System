package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface ReserveRepositoryInterface  extends CrudRepository<Reservation,Integer> {
}
