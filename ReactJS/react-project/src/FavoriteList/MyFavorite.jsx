import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import axiosInstance from '../axiosInstance';
import { jwtDecode } from 'jwt-decode';

const MyFavorite = () => {
    const [cards, setCards] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const [decodedToken, setDecodedToken] = useState(null);

  
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

        axiosInstance
            .get(`/favorite`, { params: { userId: decodedToken.id } })
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setCards(response.data); 
                    console.log('Fetched favorite properties:', response.data);
                } else {
                    console.warn('API response is not an array:', response.data);
                    setCards([]); 
                }
            })
            .catch((error) => {
                console.error('Error fetching user favorite properties:', error);
                setCards([]); 
            });
    }, [decodedToken]);

    const removeFromFavorites = (cardId) => {
        if (!decodedToken?.id) return;

        axiosInstance
            .delete('/favorite', {
                data: {
                    user: { id: decodedToken.id },
                    property: { id: cardId },
                },
            })
            .then(() => {
                setCards((prevCards) => prevCards.filter((card) => card.property.id !== cardId));
                console.log('Property removed from favorites:', cardId);
            })
            .catch((error) => {
                console.error('Error removing property from favorites:', error);
            });
    };


    return (
        <div className="container d-flex p-0" style={{ margin: 0, padding: 0 }}>
            <div
                className="navbar-nav sidebar sidebar-dark accordion"
                style={{ margin: 0, padding: 0 }}
            >
                <Dashboard />
            </div>

            <div className="container mt-4 ms-5 mt-5">
            <div className="row mb-5 ms-5">
            <div className="col">
                <h2 className="mb-3">Favorite Properties</h2>
                <p className="text-muted mb-2">
                Explore your favorite properties here. View details, save new favorites, and keep track of the places you love. Your dream stays are just a click away!  
                </p> 
            </div>
            </div>    
                {cards && cards.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-4 g-4 ms-5">
                        {cards.map((card) => (
                            <div key={card.property.id} className="col">
                                <div className="card shadow-sm rounded border-0" style={{ overflow: 'hidden' }}>
                                  
                                <button
                                        className="btn btn-sm btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
                                        style={{ zIndex: 1 }}
                                        onClick={() => removeFromFavorites(card.property.id)}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>



                                    {card.property.attributes &&
                                        Array.isArray(card.property.attributes) &&
                                        card.property.attributes.map(
                                            (attr, index) =>
                                                attr.photo1 && (
                                                    <Link
                                                        to={`../product/${card.property.id}`}
                                                        key={index}
                                                        className="text-decoration-none"
                                                    >
                                                        <img
                                                            src={attr.photo1}
                                                            className="card-img-top"
                                                            alt={card.property.name}
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
                                        <h5 className="card-title">{card.property.name}</h5>
                                        <p className="card-text text-muted">
                                            <i className="fas fa-map-marker-alt"></i> {card.property.location}
                                        </p>
                                        <p className="card-text">
                                            <strong>€{card.property.price}</strong> / night
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ marginTop: '150px', marginLeft: '50px' }}>
                        <div className="text-center p-2 bg-light rounded border">
                            <p className="text-muted fs-5">
                                You don't have a favorite property yet. Go explore available properties on the{' '}
                                <Link to="/" className="text-primary">
                                    Home
                                </Link>{' '}
                                page.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyFavorite;