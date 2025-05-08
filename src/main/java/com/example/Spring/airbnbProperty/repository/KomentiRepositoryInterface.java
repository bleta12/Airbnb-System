package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.Komenti;
import com.example.Spring.airbnbProperty.models.Postimi;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface KomentiRepositoryInterface extends CrudRepository<Komenti, Long> {
    List<Komenti> findByPostimi(Postimi postimi);
}
