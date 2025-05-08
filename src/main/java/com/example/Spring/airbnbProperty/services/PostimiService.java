package com.example.Spring.airbnbProperty.services;

import com.example.Spring.airbnbProperty.models.Postimi;
import com.example.Spring.airbnbProperty.repository.PostimiRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostimiService {
    private final PostimiRepositoryInterface repo;

    @Autowired
    public PostimiService(PostimiRepositoryInterface repo) {
        this.repo = repo;
    }

    public Postimi create(Postimi post) {
        return repo.save(post);
    }

    public Iterable<Postimi> getAll() {
        return repo.findAll();
    }

    public Postimi getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Postimi nuk u gjet"));
    }

    public Postimi update(Long id, Postimi updated) {
        Postimi post = getById(id);
        post.setTitle(updated.getTitle());
        post.setContent(updated.getContent());
        post.setAuthorName(updated.getAuthorName());
        return repo.save(post);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
