/*import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cards from './components/Cards';
import Wishlist from './wishlist/Wishlist';

function App() {
    const [favorites, setFavorites] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Cards
                            filteredProperties={filteredProperties}
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    }
                />
                <Route
                    path="/wishlist"
                    element={<Wishlist favorites={favorites} properties={filteredProperties} />}
                />
            </Routes>
        </Router>
    );
}

export default App;*/
