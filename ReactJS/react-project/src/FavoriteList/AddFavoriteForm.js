import React, { useState, useEffect } from 'react';

const AddFavoriteForm = ({ onAdd, editIndex, favorites }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (editIndex !== null) {
      const favoriteToEdit = favorites[editIndex];
      setName(favoriteToEdit.name);
      setDescription(favoriteToEdit.description);
      setImage(favoriteToEdit.image);
    }
  }, [editIndex, favorites]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !image) return;
    onAdd({ name, description, image });
    setName('');
    setDescription('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Image URL:</label>
        <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">{editIndex !== null ? 'Update' : 'Add'}</button>
      {editIndex !== null && (
        <button type="button" className="btn btn-secondary ml-2" /*onClick={() => setEditIndex(null)}*/>Cancel</button>
      )}
    </form>
  );
};

export default AddFavoriteForm;