import React from 'react';

const FavoriteItem = ({ name, description, image, onEdit, onDelete }) => {
  return (
    <div className="card">
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <button className="btn btn-primary mr-2" onClick={onEdit}>Edit</button>
        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default FavoriteItem;