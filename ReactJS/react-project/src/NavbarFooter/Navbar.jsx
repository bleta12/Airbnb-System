
import { Link, useNavigate } from 'react-router-dom';



function Navbar() {

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    navigate('/LogInSignUp/Login');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light mb-5 ms-1 p-0">
      <div className="container-xl p-0 mt-3 mb-3">
        <Link className="navbar-brand" to="">
          <span className="fw-bold fs-3 text-info">ExploreStay</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mt-1">
              <Link className="nav-link fw-medium" to="/FavoriteList/Favorit">Favorites</Link>
            </li>
            <li className="nav-item mt-1">
              <Link className="nav-link fw-medium" to="/ContactUs/Contact">Contact Us</Link>
            </li>
            {!accessToken && !refreshToken ? (
              <>
                <li className="nav-item d-md-none">
                  <Link className="nav-link border-start border-info mt-1 ps-2" to="/LogInSignUp/Login">
                    Log In
                  </Link>
                </li>
                <li className="nav-item d-md-none">
                  <Link className="nav-link border-start border-info mt-1 ps-2" to="/LogInSignUp/SignUp">Sign up</Link>
                </li>
              </>
            ) : (

              <li className="nav-item d-md-none">
                <button
                  className="nav-link border-start border-info mt-1 ps-2"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            )}

            <li className="nav-item d-md-none">
              <Link className="nav-link border-start border-info mt-1 ps-2" to="/Profile">My Account</Link>
            </li>
            {

              !accessToken && !refreshToken ? (
                <>
                  <li className="nav-item d-none d-md-inline">
                    <Link className="btn btn-outline-secondary ms-3 rounded-pill mt-1" to="/LogInSignUp/Login">
                      Log In
                    </Link>
                  </li>
                  <li className="nav-item  d-none d-md-inline">
                    <Link className="btn btn-outline-primary ms-1 rounded-pill mt-1" to="/LogInSignUp/SignUp">Sign up</Link>
                  </li>
                </>
              ) : (

                <li className="nav-item d-none d-md-inline">
                  <button
                    className="btn btn-outline-secondary ms-3 rounded-pill mt-1"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </li>
              )}

            <li className="nav-item d-none d-md-inline">
              <Link to="/Profile" className="nav-link ms-3">
                <img src={require("./icons8-account-48.png")} alt="Profile" style={{ width: '35px', height: '35px' }} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );

}
export default Navbar;


