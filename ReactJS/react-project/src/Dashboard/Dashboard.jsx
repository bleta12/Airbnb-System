
import { useState , useEffect} from "react";
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
              <i className="fas fa-fw fa-cog"></i>
              <span>Components</span>
            </button>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Components:</h6>
                <a className="collapse-item" href="buttons.html">
                  Buttons
                </a>
                <a className="collapse-item" href="cards.html">
                  Cards
                </a>
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
              <i className="fas fa-fw fa-wrench"></i>
              <span>Utilities</span>
            </button>
            <div
              id="collapseUtilities"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Utilities:</h6>
                <a className="collapse-item" href="utilities-color.html">
                  Colors
                </a>
                <a className="collapse-item" href="utilities-border.html">
                  Borders
                </a>
                <a className="collapse-item" href="utilities-animation.html">
                  Animations
                </a>
                <a className="collapse-item" href="utilities-other.html">
                  Other
                </a>
              </div>
            </div>
          </li>
          {/* Divider */}
          <hr className="sidebar-divider" />
          {/* Heading */}
          <div className="sidebar-heading">Addons</div>
          {/* Nav Item - Pages Collapse Menu */}
          <li className="nav-item">
            <button
              className="nav-link collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePages"
              aria-expanded="false"
              aria-controls="collapsePages"
            >
              <i className="fas fa-fw fa-folder"></i>
              <span>Pages</span>
            </button>
            <div
              id="collapsePages"
              className="collapse"
              aria-labelledby="headingPages"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Login Screens:</h6>
                <a className="collapse-item" href="login.html">
                  Login
                </a>
                <a className="collapse-item" href="register.html">
                  Register
                </a>
                <a className="collapse-item" href="forgot-password.html">
                  Forgot Password
                </a>
                <div className="collapse-divider"></div>
                <h6 className="collapse-header">Other Pages:</h6>
                <a className="collapse-item" href="404.html">
                  404 Page
                </a>
                <a className="collapse-item" href="blank.html">
                  Blank Page
                </a>
              </div>
            </div>
          </li>
          {/* Nav Item - Charts */}
          <li className="nav-item">
            <Link className="nav-link" to="/AddProperty/AddProperty">
              <i className="fas fa-building h-5"></i>
              <span>New Property</span>
            </Link>
          </li>
          {/* Nav Item - Tables */}
          <li className="nav-item">
            <a className="nav-link" href="tables.html">
              <i className="fas fa-fw fa-table"></i>
              <span>Tables</span>
            </a>
          </li>
          {/* Divider */}
          <hr className="sidebar-divider d-none d-md-block" />
          {/* Sidebar Toggler (Sidebar) */}
          {/* Sidebar Message */}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
