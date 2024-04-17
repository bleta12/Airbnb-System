import React, { useState } from 'react';
import FavoriteItem from './FavoriteItem';
import AddFavoriteForm from './AddFavoriteForm';

const Favorit = () => {
  const [favorites, setFavorites] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddFavorite = (favorite) => {
    if (editIndex !== null) {
      const newFavorites = [...favorites];
      newFavorites[editIndex] = favorite;
      setFavorites(newFavorites);
      setEditIndex(null);
    } else {
      setFavorites([...favorites, favorite]);
    }
  };

  const handleEditFavorite = (index) => {
    setEditIndex(index);
    const favoriteToEdit = favorites[index];
    
  };

  const handleDeleteFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
  };

  return (
    <div className="container mt-4">
      <h1>Favorite List</h1>
      <AddFavoriteForm onAdd={handleAddFavorite} editIndex={editIndex} favorites={favorites} />
      <hr />
      <div className="row">
        {favorites.map((favorite, index) => (
          <div key={index} className="col-md-4 mb-4">
            <FavoriteItem {...favorite} onEdit={() => handleEditFavorite(index)} onDelete={() => handleDeleteFavorite(index)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorit;