import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cards from './components/Cards';
import Favorites from './FavoriteList/favorit';

const App = () => {
  const [favorites, setFavorites] = useState([]); // Global state for favorites

  // Toggle favorite function
  const toggleFavorite = (cardId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(cardId)
        ? prevFavorites.filter((id) => id !== cardId) // Remove if already in favorites
        : [...prevFavorites, cardId] // Add if not in favorites
    );
  };

  const properties = [
    {
      id: 1,
      name: "Alyeska Resort",
      location: "Alaska, United States",
      price: 300,
      attributes: [{ photo1: "https://example.com/image1.jpg" }],
    },
    {
      id: 2,
      name: "Whistler Blackcomb",
      location: "British Columbia, Canada",
      price: 500,
      attributes: [{ photo1: "https://example.com/image2.jpg" }],
    },
    {
      id: 3,
      name: "Aspen Snowmass",
      location: "Colorado, United States",
      price: 400,
      attributes: [{ photo1: "https://example.com/image3.jpg" }],
    },
  ];

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">All Properties</Link>
          <Link className="nav-link" to="/favorites">Favorites</Link>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          {/* Pass global favorites and toggleFavorite function to Cards */}
          <Route
            path="/"
            element={
              <Cards
                filteredProperties={properties}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            }
          />
          {/* Pass global favorites and toggleFavorite function to Favorites */}
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                properties={properties}
                toggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
