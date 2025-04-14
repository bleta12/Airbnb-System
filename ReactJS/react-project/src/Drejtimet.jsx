import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

const Drejtimet = () => {
 


  const [drejtimet, setDrejtimet] = useState([]);
  
  useEffect(() => {
   
    axiosInstance.get('/drejtimi/get')
      .then(response => {
        setDrejtimet(response.data);
      })
      .catch(error => {
        console.error("Error fetching players:", error);
      });

    }, []);

  

  return (
    <div className="container mt-5">
      <h2>Lista e Drejtimeve</h2>
      <ul className="list-group">
        {drejtimet.map((player) => (
          <li key={player.id} className="list-group-item">
            <span>Drejtimi: {player.name} Duration: {player.duration}</span>
            
          </li>
        ))}
      </ul>

    </div>
  );

}
export default Drejtimet;
