package com.example.Spring.airbnbProperty.services;


import com.example.Spring.airbnbProperty.models.Drejtimi;
import com.example.Spring.airbnbProperty.repository.DrejtimiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DrejtimiService {


    private final DrejtimiRepo repo;

  @Autowired
    public DrejtimiService(DrejtimiRepo repo) {
        this.repo = repo;
    }

    public Drejtimi createDrejtimi(Drejtimi drejtimi) {
      return repo.save(drejtimi);
    }

    public Iterable<Drejtimi> getDrejtimi() {
      return repo.findAll();
    }


}
