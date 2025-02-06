import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import  axiosInstance  from '../axiosInstance';
import { jwtDecode } from 'jwt-decode';

const Cards = ({ filteredProperties }) => {
    const [cards, setCards] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    const accessToken = localStorage.getItem('accessToken');
    const [decodedToken, setDecodedToken] = useState(null);

    const [favoriteIds, setFavoriteIds] = useState(new Set());

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setDecodedToken(decoded); 
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found');
    }
  }, [accessToken]);



  useEffect(() => {
    if (!decodedToken?.id) return; 

    axiosInstance.get(`/favorite`, { params: { userId: decodedToken.id } })
        .then(response => {
            
            const ids = new Set(response.data.map(fav => fav.property.id)); 
            setFavoriteIds(ids);
        })
        .catch(error => console.error('Error fetching favorites:', error));
}, [decodedToken]);


const toggleFavorite = (cardId) => {
    setFavoriteIds(prevFavorites => {
        const newFavorites = new Set(prevFavorites);
        const isFavorite = newFavorites.has(cardId);

        if (isFavorite) {
            newFavorites.delete(cardId);
            axiosInstance.delete('/favorite', {
                data: { 
                    user: { id: decodedToken.id },
                    property: { id: cardId }
                }
            })
            .then(response => {
                console.log('Property removed from favorites:', response?.data);
            })
            .catch(error => {
                console.error('Error removing favorite:', error);
            });
        } else {
            newFavorites.add(cardId);
            axiosInstance.post('/favorite', {
                user: { id: decodedToken.id },
                property: { id: cardId },
            })
            .then(response => {
                console.log('Property added to favorites:', response?.data);
            })
            .catch(error => {
                console.error('Error adding favorite:', error);
            });
            
           setShowNotification(true);
           setTimeout(() => setShowNotification(false), 2000);
        }

        return newFavorites;
    });

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
                                        {[...favoriteIds].includes(card.id) ? (
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
                                        <p className="card-text text-muted m-0"><i className="fas fa-map-marker-alt"></i> {card.location}</p>
                                        <p className="card-text">
                                            <strong>€{card.price}</strong> / night
                                        </p>
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
