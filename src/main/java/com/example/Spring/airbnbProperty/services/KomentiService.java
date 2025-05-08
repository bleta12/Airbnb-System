package com.example.Spring.airbnbProperty.services;

import com.example.Spring.airbnbProperty.models.Komenti;
import com.example.Spring.airbnbProperty.models.Postimi;
import com.example.Spring.airbnbProperty.repository.KomentiRepositoryInterface;
import com.example.Spring.airbnbProperty.repository.PostimiRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KomentiService {
    private final KomentiRepositoryInterface repo;
    private final PostimiRepositoryInterface postimiRepo;

    @Autowired
    public KomentiService(KomentiRepositoryInterface repo, PostimiRepositoryInterface postimiRepo) {
        this.repo = repo;
        this.postimiRepo = postimiRepo;
    }

    public Komenti create(Long postId, Komenti komenti) {
        Postimi post = postimiRepo.findById(postId).orElseThrow(() -> new RuntimeException("Postimi nuk ekziston"));
        komenti.setPostimi(post);
        return repo.save(komenti);
    }

    public List<Komenti> getAll() {
        return (List<Komenti>) repo.findAll();
    }

    public Komenti getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Komenti nuk u gjet"));
    }

    public List<Komenti> getByPost(Long postId) {
        Postimi post = postimiRepo.findById(postId).orElseThrow(() -> new RuntimeException("Postimi nuk ekziston"));
        return repo.findByPostimi(post);
    }

    public Komenti update(Long id, Komenti updated) {
        Komenti k = getById(id);
        k.setText(updated.getText());
        return repo.save(k);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
