import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

/*const Cards = ({ filteredProperties }) => {
    const [favorites, setFavorites] = useState([]);
    const [cards, setCards] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    const toggleFavorite = (cardId) => {
        if (favorites.includes(cardId)) {
            setFavorites(favorites.filter((id) => id !== cardId));
        } else {
            setFavorites([...favorites, cardId]);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
        }
    };*/

const Cards = ({ filteredProperties, favorites, toggleFavorite }) => {
    const [cards, setCards] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    const handleFavoriteClick = (cardId) => {
        toggleFavorite(cardId);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
    };


    useEffect(() => {
        setCards(filteredProperties);
    }, [filteredProperties]);

    return (
        <div className="container mt-4">
            {cards && cards.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {cards.map((card) => (
                        <div key={card.name} className="col">
                            <div className="card shadow-sm rounded border-0" style={{ overflow: 'hidden' }}>
                                {card.attributes.map(
                                    (attr, index) =>
                                        attr.photo1 && (
                                            <Link to={`../product/${card.id}`} key={index} className="text-decoration-none">
                                                <img
                                                    src={attr.photo1}
                                                    className="card-img-top"
                                                    alt={card.name}
                                                    style={{
                                                        objectFit: 'cover',
                                                        height: '200px',
                                                        transition: 'transform 0.3s',
                                                    }}
                                                    onMouseOver={(e) =>
                                                        (e.currentTarget.style.transform = 'scale(1.05)')
                                                    }
                                                    onMouseOut={(e) =>
                                                        (e.currentTarget.style.transform = 'scale(1)')
                                                    }
                                                />
                                            </Link>
                                        )
                                )}
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="card-title text-truncate" title={card.name}>
                                            {card.name}
                                        </h5>
                                        {favorites.includes(card.id) ? (
                                            <BsHeartFill
                                                onClick={() => toggleFavorite(card.id)}
                                                className="text-danger"
                                                style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                            />
                                        ) : (
                                            <BsHeart
                                                onClick={() => toggleFavorite(card.id)}
                                                className="text-muted"
                                                style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                            />
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="card-text text-muted m-0">{card.location}</p>
                                        <span className="fw-bold fs-6">€{card.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className="d-flex justify-content-center align-items-center mt-5 mb-5"
                    style={{ height: '300px' }}
                >
                    <p className="text-center text-muted fs-4">
                        There are no properties with these attributes.
                    </p>
                </div>
            )}

            {showNotification && (
                <div
                    className="position-fixed bottom-0 end-0 p-3"
                    style={{
                        zIndex: 1050,
                        transition: 'opacity 0.5s ease-in-out',
                    }}
                >
                    <div className="toast show align-items-center text-white bg-success border-0">
                        <div className="d-flex">
                            <div className="toast-body">Added to Favorites!</div>
                            <button
                                type="button"
                                className="btn-close btn-close-white me-2 m-auto"
                                onClick={() => setShowNotification(false)}
                                aria-label="Close"
                            ></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cards;
