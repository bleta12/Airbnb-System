package com.example.Spring.airbnbProperty.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "gift_cards")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GiftCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String amount;
    private String recipientEmail;

    @Column(columnDefinition = "TEXT")
    private String message;
}
