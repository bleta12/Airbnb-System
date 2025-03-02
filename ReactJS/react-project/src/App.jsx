import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";
import PropertyView from "./PropertyView/PropertyView";
import SignUp from './LogInSignUp/SignUp';
import Home from './Home/Home';
import Reservation from './Reservation/reservation';
import Login from './LogInSignUp/Login';
import AddProperty from './AddProperty/AddProperty';
import Footer from './NavbarFooter/Footer';
import MyFavorite from './FavoriteList/MyFavorite';
import Navbar from './NavbarFooter/Navbar';  
import Icones from './components/Icones';
import Cards from './components/Cards';
import Search from './components/Search';
import Dashboard from './Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MyProfile from './Dashboard/MyProfile';
import MyProperty from './Dashboard/MyProperty';
import ContactUs from './Contact/ContactUs';
import GiftCardPage from './Dashboard/GiftCardPage';
import LoginPrompt from "./LoginPrompt";
import MyReservations from "./Dashboard/MyReservations";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true); 
  };

  const handleLogout = () => {
    setIsAuthenticated(false); 
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      setIsAuthenticated(true);
    }
  }, []);

  console.log("isAuthenticated", isAuthenticated);

  
  const Layout = ({ children }) => (
    <>
      <Navbar onLogOut={handleLogout} />
      <main>{children}</main> 
     
    </>
  );

  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/product/:id" element={<PropertyView />} />
        <Route path="/LogInSignUp/Login" element={<Login onLogin={handleLogin} />} />
        <Route path="/LogInSignUp/SignUp" element={<SignUp />} />
        <Route path="/components/Icones" element={<Icones />} />
        <Route path="/components/Cards" element={<Cards />} />
        <Route path="/components/Search" element={<Search />} />
        <Route path="/ContactUs" element={<ContactUs />} />

      
        {isAuthenticated ? (
          <>
            <Route path="/AddProperty/AddProperty" element={<AddProperty />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Profile" element={<MyProfile />} />
            <Route path="/MyProperty" element={<MyProperty />} />
            <Route path="/GiftCardPage" element={<GiftCardPage />} />
            <Route path="/MyFavorite" element={<MyFavorite />} />
            <Route path="/Reservation/reservation" element={<Reservation />} />
            <Route path="/MyReservation" element={<MyReservations />} />

          </>
        ) : (
          <Route path="*" element={<LoginPrompt />} />  
        )}
      </Routes>
    </Router>
  );
}

export default App;
