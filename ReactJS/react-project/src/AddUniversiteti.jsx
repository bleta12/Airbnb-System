import { useState } from "react";
import axiosInstance from "./axiosInstance";

const AddUniversiteti = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  

  const handlePlayerSubmit = async (event) => {
    event.preventDefault(); 
    
    try {
      const response = await axiosInstance.post(`/uni/create`, {
       
          name: name,
          city:city
         
      });

      setName("");
      setCity("");
    
      if (response.data) {
        console.log("Response Data:", response.data);
      }
    } catch (error) {
      console.error("Error creating player:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handlePlayerSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
           Team Name:
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
            type="text"
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
  );
};

export default AddUniversiteti;
