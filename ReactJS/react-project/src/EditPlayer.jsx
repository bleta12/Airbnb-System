import { useState, useEffect } from "react";
import axiosInstance from "../src/axiosInstance";

const PlayerList = () => {
  const [players, setPlayers] = useState([]); 
  const [selectedPlayer, setSelectedPlayer] = useState(null); 
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [teams, setTeams] = useState([]);
  
  
  useEffect(() => {
   
    axiosInstance.get('/player/get')
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        console.error("Error fetching players:", error);
      });


    axiosInstance.get('/team/get')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, []);

  
  const handlePlayerSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitting Player:", { name, number, birthYear, selectedTeamId });

    try {
      const response = await axiosInstance.put(`/player/edit/${selectedPlayer.id}`, {
        name: name,
        number: number,
        birthYear: birthYear,
        team: { id: selectedTeamId }
      });

      if (response.data) {
        console.log("Player updated successfully:", response.data);
        
        setPlayers(prevPlayers =>
          prevPlayers.map(player =>
            player.id === selectedPlayer.id ? { ...player, name, number, birthYear, team: { id: selectedTeamId } } : player
          )
        );
        setSelectedPlayer(null); 
      }
    } catch (error) {
      console.error("Error updating player:", error.response?.data || error.message);
    }
  };

  
  const handleTeamChange = (event) => {
    setSelectedTeamId(event.target.value);
  };

  
  const handleEditClick = (player) => {
    setSelectedPlayer(player);
    setName(player.name);
    setNumber(player.number);
    setBirthYear(player.birthYear);
    setSelectedTeamId(player.team.id); 
  };

  return (
    <div className="container mt-5">
      <h2>Players List</h2>
      <ul className="list-group">
        {players.map((player) => (
          <li key={player.id} className="list-group-item">
            <span>{player.name} (Number: {player.number})</span>
            <button
              onClick={() => handleEditClick(player)}
              className="btn btn-warning btn-sm float-end ms-3"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      {/* Modal for Editing Player */}
      {selectedPlayer && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Player</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedPlayer(null)}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerList;
