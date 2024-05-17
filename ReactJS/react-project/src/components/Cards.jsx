import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../NavbarFooter/Navbar';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

const Cards = () => {
    const [favorites, setFavorites] = useState([]);
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

    const cards = [
        {
            id: 1,
            image: require("./icons8-pool-50.png"),
            title: "Pool",
            description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        },


    ];

    return (
        <>

            <div className="container mt-4">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {cards.map((card) => (
                        <div key={card.id} className="col">
                            <Link to={`#`} className="text-decoration-none">
                                <div className="card">
                                    <img src={card.image} className="card-img-top" alt={card.title} />
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="card-title">{card.title}</h5>
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
                <div className={`modal ${showNotification ? 'show' : ''}`} style={{ display: `${showNotification ? 'block' : 'none'}`, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h5 className="modal-title">Added to Favorites!</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary">Show More</button>
                </div>
            </div>
        </>
    );
};

export default Cards;