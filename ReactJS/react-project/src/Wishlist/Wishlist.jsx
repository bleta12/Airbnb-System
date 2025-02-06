/*import React from 'react';
import { Link } from 'react-router-dom';
import { BsHeartFill } from 'react-icons/bs';

const Wishlist = ({ favorites, properties }) => {
    // Filter the properties to only include those that are marked as favorites
    const favoriteProperties = properties.filter(property => favorites.includes(property.id));

    return (
        <div className="container mt-4">
            <h2>Your Wishlist</h2>
            {favoriteProperties.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {favoriteProperties.map((property) => (
                        <div key={property.id} className="col">
                            <div className="card shadow-sm rounded border-0">
                                {property.attributes.map((attr, index) =>
                                    attr.photo1 && (
                                        <Link to={`../product/${property.id}`} key={index} className="text-decoration-none">
                                            <img
                                                src={attr.photo1}
                                                className="card-img-top"
                                                alt={property.name}
                                                style={{ objectFit: 'cover', height: '200px' }}
                                            />
                                        </Link>
                                    )
                                )}
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="card-title text-truncate" title={property.name}>
                                            {property.name}
                                        </h5>
                                        <BsHeartFill className="text-danger" style={{ fontSize: '1.5rem' }} />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="card-text text-muted m-0">{property.location}</p>
                                        <span className="fw-bold fs-6">€{property.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted">You have no items in your wishlist.</p>
            )}
        </div>
    );
};

export default Wishlist;*/
