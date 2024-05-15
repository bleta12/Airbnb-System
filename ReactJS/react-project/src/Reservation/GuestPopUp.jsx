import React, { useState } from "react";

function GuestPopUp({ onClose,onSave }) {
  const [adults, setAdults] = useState();
  const [kids, setKids] = useState();

  const handleAdultsChange = (event) => {
    setAdults(parseInt(event.target.value));
  };

  const handleKidsChange = (event) => {
    setKids(parseInt(event.target.value));
  };

  
  const handleConfirm = () => {
    if (adults >= 1 || kids >= 1) {
      onSave({ adults, kids });
    } else {
      window.alert("Please select at least one guest.");
    }
  };

  

  return (
    <div className="guest-popup">
      <h2>Select number of guests</h2>
      <div>
        <label htmlFor="adults">Adults:</label>
        <select id="adults" value={adults} onChange={handleAdultsChange}>
          {Array.from({ length: 10 }, (_, i) => i ).map((value) => (   // i+1 eshte qe me figuru ne popup,by default 1 tek Adults
            <option key={value} value={value}>
              {value}
            </option>
          ))}  
        </select>
      </div>
      <div>
        <label htmlFor="kids">Kids:</label>
        <select id="kids" value={kids} onChange={handleKidsChange}>
          {Array.from({ length: 10 }, (_, i) => i).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <button className="confirm-button" onClick={handleConfirm}>Save</button>
      <button className="cancel-button" onClick={onClose}>Cancel</button>
    </div>
  );
}

export default GuestPopUp;
