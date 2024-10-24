import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

const Cards = ({ filteredProperties }) => {
    const [favorites, setFavorites] = useState([]);
    const [cards, setCards] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    const toggleFavorite = (cardId) => {
        if (favorites.includes(cardId)) {
            setFavorites(favorites.filter(id => id !== cardId));
        } else {
            setFavorites([...favorites, cardId]);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
        }
    };

    useEffect(() => {
        setCards(filteredProperties);
    }, [filteredProperties]);

    return (
        <>
            <div className="container mt-4">
                {cards && cards.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {cards.map((card) => (
                            <div key={card.name} className="col">
                                <Link to={`../product/${card.id}`} className="text-decoration-none">
                                    <div className="card">
                                        {card.attributes.map((attr, index) => (
                                            attr.photo1 && (
                                                <img
                                                    key={index}
                                                    src={attr.photo1}
                                                    className="card-img-top"
                                                    alt={card.name}
                                                    style={{ objectFit: 'cover', height: '200px' }}
                                                />
                                            )
                                        ))} 
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h5 className="card-title">{card.name}</h5>
                                                {favorites.includes(card.id) ? (
                                                    <BsHeartFill onClick={() => toggleFavorite(card.id)} style={{ cursor: 'pointer' }} />
                                                ) : (
                                                    <BsHeart onClick={() => toggleFavorite(card.id)} style={{ cursor: 'pointer' }} />
                                                )}
                                            </div>
                                            <p className="card-text">{card.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center mt-5 mb-5" style={{ height: '300px' }}>
                        <p className="text-center text-muted">
                            There are no properties with these attributes.
                        </p>
                    </div>
                )}

                <div className={`modal ${showNotification ? 'show' : ''}`} style={{ display: showNotification ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h5 className="modal-title">Added to Favorites!</h5>
                            </div>
                        </div>
                    </div>
                </div>

              
            </div>
        </>
    );
};

export default Cards;
