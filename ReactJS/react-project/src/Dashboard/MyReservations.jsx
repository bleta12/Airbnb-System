import React, { useEffect, useState } from "react";
import Dashboard from '../Dashboard/Dashboard';
import axiosInstance from '../axiosInstance';
import { jwtDecode } from 'jwt-decode';




const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
      const accessToken = localStorage.getItem('accessToken');
      const [decodedToken, setDecodedToken] = useState(null);
  
    
      useEffect(() => {
          if (accessToken) {
              try {
                  const decoded = jwtDecode(accessToken);
                  setDecodedToken(decoded);
              } catch (error) {
                  console.error('Error decoding token:', error);
              }
          } else {
              console.log('No token found');
          }
      }, [accessToken]);

  useEffect(() => {
    if (!decodedToken?.id) return;
    const fetchReservations = async () => {
      const response = await axiosInstance.get(`/reservation`, { params: { userId: decodedToken.id } })
      setReservations(response.data);
    };
    fetchReservations();
  }, [decodedToken]);


  return (
    <div className="container-fluid p-0">
      <div className="d-flex">
        {/* Sidebar */}
        <div className="navbar-nav sidebar sidebar-dark accordion" style={{ margin: 0, padding: 0 }}>
          <Dashboard />
        </div>

        {/* Main Content */}
        <div className="container mt-5 ms-5">
          {/* Title Section */}
          <div className="mb-4 text-center">
            <h2>Your Reservation History</h2>
            <p className="text-muted">Here are the details of your previous reservations.</p>
          </div>

          {/* Reservation Cards */}
          <div className="row gy-4 mb-4">
            {reservations.length > 0 ? (
              reservations.map((reservation, index) => (
                <div className="col-md-6 col-lg-4" key={index}>
                  <div className="card shadow-sm" style={{ borderRadius: '10px' }}>
                    <div className="card-body">
                      <h5 className="card-title text-primary">Reservation Summary</h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <i className="fas fa-dollar-sign text-success"></i> <strong>Price:</strong> €{reservation.cmimi}
                        </li>
                        <li className="list-group-item">
                          <i className="fas fa-calendar-alt text-warning"></i> <strong>Start Date:</strong> {reservation.startDate}
                        </li>
                        <li className="list-group-item">
                          <i className="fas fa-calendar-alt text-warning"></i> <strong>End Date:</strong> {reservation.endDate}
                        </li>
                        <li className="list-group-item">
                          <i className="fas fa-users text-info"></i> <strong>Total Guests:</strong> {reservation.totalGuests}
                        </li>
                        <li className="list-group-item">
                          <i className="fas fa-bed text-primary"></i> <strong>Adults:</strong> {reservation.adults}
                        </li>
                        <li className="list-group-item">
                          <i className="fas fa-child text-danger"></i> <strong>Kids:</strong> {reservation.kids}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-12">No reservations found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReservations;