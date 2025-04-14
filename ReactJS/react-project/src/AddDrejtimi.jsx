import { useState,useEffect } from "react";
import axiosInstance from "../src/axiosInstance";

const AddDrejtimi = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const handleDrejtimiSubmit = async (event) => {
    event.preventDefault(); 
    
    

    try {
      const response = await axiosInstance.post(`/drejtimi/create`, {
       
          name: name,
          duration: duration,
          "universiteti":{
            id:selectedUniId
          }
       
      });

      setName("");
      setDuration("");
      selectedUniId("");

      if (response.data) {
        console.log("Response Data:", response.data);
      }
    } catch (error) {
      console.error("Error creating player:", error.response?.data || error.message);
    }
  };



  const [unis, setUnis] = useState([]);
  const [selectedUniId, setSelectedUniId] = useState('');


  useEffect(() => {
    axiosInstance.get('/uni/get')  
      .then(response => {
        setUnis(response.data); 
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, []);


  const handleUniChange = (event) => {
    setSelectedUniId(event.target.value);
  };





  return (
    <div className="container mt-5">
      <form onSubmit={handleDrejtimiSubmit}>
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
          <label htmlFor="number" className="form-label">
            Duration:
          </label>
          <input
            type="number"
            className="form-control"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="team" className="form-label">Select a Team:</label>
          <select
            id="uni"
            name="uni"
            value={selectedUniId}
            onChange={handleUniChange}
            className="form-select"
          >
            <option value="" disabled>Select Uni</option>
            {unis.map((uni) => (
              <option key={uni.id} value={uni.id}>
                {uni.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AddDrejtimi;
