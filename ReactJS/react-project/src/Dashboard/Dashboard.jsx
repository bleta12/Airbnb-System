
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';


function Dashboard() {

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


  return (
    <div id="page-top">
      <div id="wrapper">
        <ul
          className="navbar-nav sidebar sidebar-dark accordion"
          style={{
            minHeight: "100vh",
            position: "fixed",
            top: "0",
            bottom: "0",
            overflowY: "auto",
            background: "linear-gradient(to bottom,rgb(96, 147, 229),rgb(132, 187, 224))"
          }}
          id="accordionSidebar"
        >
          {/* Sidebar - Brand */}
          <li className="sidebar-brand d-flex align-items-center justify-content-center mb-5">
            <p className="sidebar-brand mx-0 mt-3 text-center">
              <Link
                className="text-light fw-bold fs-5 link-body-emphasis link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                to="/Profile"
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <span className="d-block">Welcome</span>
                <span className="d-block fw-normal">{decodedToken ? decodedToken.sub : "Guest"}</span>
              </Link>
            </p>
          </li>

          {/* Divider */}
          <hr className="sidebar-divider my-0" />
          {/* Nav Item - Dashboard */}
          <li className="nav-item active">
            <Link className="nav-link" to={"/"}>
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
          </li>
          {/* Divider */}
          <hr className="sidebar-divider" />
          {/* Heading */}
          <div className="sidebar-heading">Interface</div>
          {/* Nav Item - Pages Collapse Menu */}
          <li className="nav-item">
            <button
              className="nav-link collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <i className="fas fa-address-book"></i>
              <span>Activity</span>
            </button>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components:</h6>
                <Link className="collapse-item" to={"/MyProperty"}>
                  My Property
                </Link>
                <Link className="collapse-item" to={"/MyFavorite"}>
                  My Favorites
                </Link>
              </div>
            </div>
          </li>
          {/* Nav Item - Utilities Collapse Menu */}
          <li className="nav-item">
            <button
              className="nav-link collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseUtilities"
              aria-expanded="false"
              aria-controls="collapseUtilities"
            >
              <i className="fas fa-angle-right"></i>
              <span>Reservations</span>
            </button>
            <div
              id="collapseUtilities"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Reservations:</h6>
                <Link className="collapse-item" to={"/MyReservation"}>
                  My Reservations
                </Link>
              </div>

            </div>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/AddProperty/AddProperty">
              <i className="fas fa-building h-5"></i>
              <span>Host a Property</span>
            </Link>
          </li>
          {/* Divider */}
          {decodedToken?.role === 'ADMIN' && (
  <>
    <hr className="sidebar-divider" />
    {/* Heading */}
    <div className="sidebar-heading">
      <span className="d-block fw-normal">Hi {decodedToken?.role}</span>
    </div>
    
    {/* Admin-only Nav Item */}
    <li className="nav-item">
      <button
        className="nav-link collapsed"
        data-bs-toggle="collapse"
        data-bs-target="#adminPanel"
        aria-expanded="false"
        aria-controls="adminPanel"
      >
        <i className="fas fa-fw fa-cogs"></i>
        <span>Admin Panel</span>
      </button>
      <div id="adminPanel" className="collapse" aria-labelledby="headingAdmin" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Admin Features:</h6>
          <Link className="collapse-item" to="/ManageUsers">
              <span>Manage Users</span>
         </Link>          
         <a className="collapse-item" href="settings.html">Settings</a>
        </div>
      </div>
    </li>
  </>
)}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
