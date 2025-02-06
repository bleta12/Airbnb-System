package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.GiftCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface GiftCardRepository extends JpaRepository<GiftCard, Long> {
}
