import React, { useEffect, useState } from "react";
import axios from "axios";

const ReservationsPage = ({ userId }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await axios.get(`http://localhost:8080/api/reservations/user/${userId}`);
      setReservations(response.data);
    };
    fetchReservations();
  }, [userId]);

  return (
   
    <div>
      <h1>My Reservations</h1>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            <p>Property ID: {reservation.propertyId}</p>
            <p>Check-In: {reservation.checkInDate}</p>
            <p>Check-Out: {reservation.checkOutDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );

};

export default ReservationsPage;