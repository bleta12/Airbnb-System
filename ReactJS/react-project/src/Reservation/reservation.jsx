import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./button.css";


function Reservation() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleReservation = () => {
  };

  return (
<<<<<<< Updated upstream
    <div className="reservation-container">
      <div className="reservation-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          
        </button>
        <div className="confirm-container">
          <h1 className="confirm">Confirm and Pay</h1>
          <span className="txt">
            <h6>Your Trip</h6>
          </span>
        </div>
      </div>

      <div className="reservation-content">
        <div className="date-container">
          <h4>Date</h4>
          <div className="calendar-container">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Check-in"
              className="date-picker"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Check-out"
              className="date-picker"
            />
          </div>
        </div>

        <div className="guests-container">
          <h4>Guest</h4>
          <select className="custom-select" id="guestsSelect">
            <option selected>Edit</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>

      <div className="reservation-footer">
        <button className="reserve-button" onClick={handleReservation}>
          Reserve
        </button>
        <hr />
        <h3>Pay With</h3>
        
=======
    <>
    <div class="main-container">

    <div className="container ms-10">
      <button className="button" onClick={() => navigate(-1)}></button>
      <h1> Confirm and pay</h1>
>>>>>>> Stashed changes
      </div>
      <div className="container ps-5">
        <div>
     <span><h5>Your Trip</h5></span> 
      <span><h5>Dates</h5></span>
      <span><h5>Guests</h5></span>
      </div>
      </div>
      <div className='container mt-5'>
        <form action="">
          <label htmlFor="GuestNumber">Check the number of guests:</label>
          <input type="text" name="" id="" className='form-control' />
        </form>
      </div>
      </div>
      </>
  );
}


export default Reservation;
