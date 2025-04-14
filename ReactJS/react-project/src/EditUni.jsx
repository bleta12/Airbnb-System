import { useState, useEffect } from "react";
import axiosInstance from "../src/axiosInstance";

const EditUni = () => {
  const [name, setName] = useState(null); 
  const [city, setCity] = useState(null); 
  

  const [selectedUni, setSelectedUni] = useState('');
  const [unis, setUnis] = useState([]);
  

  const [selectedDrejtimiId, setSelectedDrejtimiId] = useState('');
  const [drejtimet, setDrejtimet] = useState([]);
  
  useEffect(() => {
   
    axiosInstance.get('/uni/get')
      .then(response => {
        setUnis(response.data);
      })
      .catch(error => {
        console.error("Error fetching players:", error);
      });

    }, []);

  
  const handlePlayerSubmit = async (event) => {
    event.preventDefault();


    try {
      const response = await axiosInstance.put(`/uni/edit/${selectedUni.id}`, {
        name: name,
        city: city,
      });

      if (response.data) {
        console.log("Player updated successfully:", response.data);
        
        setUnis(prevUnis =>
          prevUnis.map(uni =>
            uni.id === selectedUni.id ? { ...uni, name, city } : uni
          )
        );
        setSelectedUni(null); 
      }
    } catch (error) {
      console.error("Error updating player:", error.response?.data || error.message);
    }
  };

  

  
  const handleEditClick = (uni) => {
    setSelectedUni(uni);
    setName(uni.name);
    setCity(uni.city);
  };

  

  

  const deleteUser = (id) => {
    
    axiosInstance
      .delete(`/uni/delete/${id}`) 
      .then((response) => {
          
        setUnis(unis.filter((user) => user.id !== id));
        
        
      })
      .catch((error) => {
        console.error("There was an error deleting the user:", error);
        alert("An error occurred while deleting the user.");
      });
  
};

  return (
    <div className="container mt-5">
      <h2>Players List</h2>
      <ul className="list-group">
        {unis.map((player) => (
          <li key={player.id} className="list-group-item">
            <span>Uni: {player.name} City: {player.city}</span>
            <button
              onClick={() => handleEditClick(player)}
              className="btn btn-warning btn-sm float-end ms-3"
            >
              Edit
            </button>
            <button
              onClick={() => deleteUser(player.id)} 
              className="btn btn-warning btn-sm float-end ms-3"
            >
              Delete
            </button>
            
          </li>
        ))}
      </ul>

      {/* Modal for Editing Player */}
      {selectedUni && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Uni</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedUni(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handlePlayerSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City:
                    </label>
                    <input
                      type="city"
                      className="form-control"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>



                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
export default EditUni;
