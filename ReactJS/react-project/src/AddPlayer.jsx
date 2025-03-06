import { useState,useEffect } from "react";
import axiosInstance from "../src/axiosInstance";

const AddPlayer = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const handlePlayerSubmit = async (event) => {
    event.preventDefault(); 
    
    console.log("Submitting Player:", { name, number, birthYear });

    try {
      const response = await axiosInstance.post(`/player/create`, {
       
          name: name,
          number: number,
          birthYear: birthYear,
          "team":{
            id:selectedTeamId
          }
       
      });

      setName("");
      setNumber("");
      setBirthYear("");
      selectedTeamId("");

      if (response.data) {
        console.log("Response Data:", response.data);
      }
    } catch (error) {
      console.error("Error creating player:", error.response?.data || error.message);
    }
  };



  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');


  useEffect(() => {
    axiosInstance.get('/team/get')  
      .then(response => {
        setTeams(response.data); 
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, []);


  const handleTeamChange = (event) => {
    setSelectedTeamId(event.target.value);
  };





  return (
    <div className="container mt-5">
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
          <label htmlFor="number" className="form-label">
            Number:
          </label>
          <input
            type="number"
            className="form-control"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="birthYear" className="form-label">
            Birth Year:
          </label>
          <input
            type="number"
            className="form-control"
            id="birthYear" 
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="team" className="form-label">Select a Team:</label>
          <select
            id="team"
            name="team"
            value={selectedTeamId}
            onChange={handleTeamChange}
            className="form-select"
          >
            <option value="" disabled>Select a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
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

export default AddPlayer;
