import React from 'react';
import { Link } from 'react-router-dom';
import { BsHeartFill } from 'react-icons/bs';

const Favorites = ({ favorites = [], properties = [], toggleFavorite }) => {

  const favoriteProperties = properties.filter((property) => favorites.includes(property.id));

  return (
    <div className="favorites-page">
      {/* Hero Section */}
      <div className="hero-section text-center text-white py-5" style={{
        background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
        borderRadius: '10px',
        marginBottom: '30px',
      }}>
        <h1>Your Favorite Properties</h1>
        <p className="lead">Discover the properties you love most</p>
      </div>

      {favoriteProperties.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {favoriteProperties.map((property) => (
            <div key={property.id} className="col">
              <div
                className="card shadow-sm rounded border-0"
                style={{
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {property.attributes.map(
                  (attr, index) =>
                    attr.photo1 && (
                      <Link to={`../product/${property.id}`} key={index}>
                        <img
                          src={attr.photo1}
                          className="card-img-top"
                          alt={property.name}
                          style={{
                            objectFit: 'cover',
                            height: '200px',
                            filter: 'brightness(90%)',
                          }}
                        />
                      </Link>
                    )
                )}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5
                      className="card-title text-truncate"
                      title={property.name}
                      style={{ color: '#2c3e50', fontWeight: 'bold' }}
                    >
                      {property.name}
                    </h5>
                    <BsHeartFill
                      onClick={() => toggleFavorite(property.id)}
                      className="text-danger"
                      style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-text text-muted m-0">{property.location}</p>
                    <span className="fw-bold text-success">€{property.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5"
          style={{ height: '300px' }}
        >
          <img
            src="https://via.placeholder.com/150"
            alt="No favorites"
            style={{ width: '150px', marginBottom: '20px' }}
          />
          <p className="text-center text-muted fs-4">
            No favorites added yet. Start exploring properties now!
          </p>
          <Link to="/" className="btn btn-primary">
            Browse Properties
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
