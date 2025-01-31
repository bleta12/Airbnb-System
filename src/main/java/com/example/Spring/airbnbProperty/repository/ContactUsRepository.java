package com.example.Spring.airbnbProperty.repository;


import com.example.Spring.airbnbProperty.models.ContactUs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactUsRepository extends JpaRepository<ContactUs, Long> {
}

