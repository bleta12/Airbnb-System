
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';


function Navbar(){

    return(             
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-xl">
                <Link className="navbar-brand" to="/Home/Home">
                    <span className="fw-bold text-info">ExploreStay</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="main-nav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item mt-1">
                            <Link className="nav-link" to="/contact">Favorites</Link>
                        </li>
                        <li className="nav-item mt-1">
                            <Link className="nav-link" to="/contact">Contact Us</Link>
                        </li>
                        <li className="nav-item d-md-none">
                            <Link className="nav-link border-start border-info mt-1 ps-2" to="/login">Log in</Link>
                        </li>
                        <li className="nav-item d-md-none">
                            <Link className="nav-link border-start border-info mt-1 ps-2" to="/LogInSignUp/SignUp">Sign up</Link>
                        </li>
                        <li className="nav-item d-md-none">
                            <Link className="nav-link border-start border-info mt-1 ps-2" to="/login">My Account</Link>
                        </li>
                        <li className="nav-item d-none d-md-inline">
                            <Link className="btn btn-outline-secondary ms-3 rounded-pill mt-1" to="/LogInSignUp/Login">Log in</Link>
                        </li>
                        <li className="nav-item  d-none d-md-inline">
                            <Link className="btn btn-outline-primary ms-1 rounded-pill mt-1" to="/LogInSignUp/SignUp">Sign up</Link>
                        </li>
                        <li className="nav-item d-none d-md-inline">
                          <Link to="/profile" className="nav-link ms-3">
                         <img src={require("./Navbar/icons8-account-48.png")} alt="Profile" style={{ width: '35px', height: '35px' }} />
                          </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  
    );
    
}
export default Navbar;


