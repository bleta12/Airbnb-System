import React, { useState, useEffect } from 'react';
import Dashboard from "../Dashboard/Dashboard";


import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const FavoriteList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', imageUrl: '' });


  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);


  useEffect(() => {
    if (selectedCategory) {
      axios.get(`http://localhost:5000/api/items?category=${selectedCategory}`)
        .then(response => setItems(response.data))
        .catch(error => console.error('Error fetching items:', error));
    }
  }, [selectedCategory]);

  const handleAddItem = () => {
    axios.post('http://localhost:5000/api/items', { ...newItem, category: selectedCategory })
      .then(response => {
        setItems([...items, response.data]);
        setNewItem({ name: '', description: '', imageUrl: '' });
      })
      .catch(error => console.error('Error adding item:', error));
  };

  return (
    <>
      <div className="container d-flex p-0" style={{ margin: 0, padding: 0 }}>

        <div
          className="navbar-nav sidebar sidebar-dark accordion"
          style={{ margin: 0, padding: 0 }}
        >
          <Dashboard />
        </div>
        <div
          className="main-body flex-grow-1 ms-lg-5 mt-5"
          style={{
            marginLeft: "150px",
            padding: "15px",
          }}
        >
          <div className="container mt-5">
            <h1 className="text-center mb-4">Favorite List</h1>

            {/* Category Selector */}
            <div className="mb-4">
              <h4>Select Category</h4>
              <div className="btn-group">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`btn btn-${selectedCategory === category.id ? 'primary' : 'outline-primary'}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Items List */}
            {selectedCategory && (
              <div>
                <h4>Items in {categories.find(cat => cat.id === selectedCategory)?.name}</h4>
                <div className="row">
                  {items.map(item => (
                    <div key={item.id} className="col-md-4 mb-4">
                      <div className="card">
                        <img src={item.imageUrl} className="card-img-top" alt={item.name} />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Item */}
                <div className="mt-4">
                  <h4>Add New Item</h4>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Item Name"
                      value={newItem.name}
                      onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                    />
                    <textarea
                      className="form-control mb-2"
                      placeholder="Description"
                      value={newItem.description}
                      onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                    ></textarea>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Image URL"
                      value={newItem.imageUrl}
                      onChange={e => setNewItem({ ...newItem, imageUrl: e.target.value })}
                    />
                    <button className="btn btn-success" onClick={handleAddItem}>Add Item</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoriteList;
