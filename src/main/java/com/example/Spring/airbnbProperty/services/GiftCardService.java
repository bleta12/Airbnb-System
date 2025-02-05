package com.example.Spring.airbnbProperty.services;

import com.example.Spring.airbnbProperty.models.GiftCard;
import com.example.Spring.airbnbProperty.repository.GiftCardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GiftCardService {

    private final GiftCardRepository giftCardRepository;

    public GiftCardService(GiftCardRepository giftCardRepository) {
        this.giftCardRepository = giftCardRepository;
    }

    public void saveGiftCard(GiftCard giftCard) {
        giftCardRepository.save(giftCard);
    }

    public List<GiftCard> getAllGiftCards() {
        return giftCardRepository.findAll();
    }
}
