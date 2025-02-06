package com.example.Spring.airbnbProperty.resources;

import com.example.Spring.airbnbProperty.models.GiftCard;
import com.example.Spring.airbnbProperty.services.GiftCardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/giftcards")
@CrossOrigin(origins = "http://localhost:3000")
public class GiftCardResource {

    private final GiftCardService giftCardService;

    public GiftCardResource(GiftCardService giftCardService) {
        this.giftCardService = giftCardService;
    }


    @PostMapping
    public ResponseEntity<String> purchaseGiftCard(@RequestBody GiftCard giftCard) {
        giftCardService.saveGiftCard(giftCard);
        return ResponseEntity.ok("Gift Card purchased successfully!");
    }


    @GetMapping
    public ResponseEntity<List<GiftCard>> getAllGiftCards() {
        List<GiftCard> giftCards = giftCardService.getAllGiftCards();
        return ResponseEntity.ok(giftCards);
    }
}
