import React from 'react';
import { useNavigate } from 'react-router-dom';
import './button.css'; 

function Reservation() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <button className="button" onClick={() => navigate(-1)}></button>
      <div>
        <h1>Confirm and pay</h1>
      </div>
    </div>
  );
}

export default Reservation;
