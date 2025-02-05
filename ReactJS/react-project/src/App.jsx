
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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





function App() {

  return (
    <Router>

      <Routes>
        <Route exact path="/Reservation/reservation" element={<Reservation />} />
        <Route exact path="" element={<Home />} />
        <Route exact path="/product/:id" element={<PropertyView />} />
        <Route exact path="/LogInSignUp/Login" element={<Login />} />
        <Route exact path="/LogInSignUp/SignUp" element={<SignUp />} />
        <Route exact path="/AddProperty/AddProperty" element={<AddProperty />} />
        <Route exact path="/NavbarFooter/Footer" element={<Footer />} />
        <Route exact path="/components/Icones" element={<Icones />} />
        <Route exact path="/NavbarFooter/Navbar" element={<Navbar />} />
        <Route exact path="/components/Cards" element={<Cards />} />
        <Route exact path="/components/Search" element={<Search />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/Profile" element={<MyProfile />} />
        <Route exact path="/MyProperty" element={<MyProperty />} />
        <Route exact path="/ContactUs" element={<ContactUs />} />
        <Route exact path="/GiftCardPage" element={<GiftCardPage />} />
        <Route exact path="/MyFavorite" element={<MyFavorite />} />







      </Routes>

    </Router>

  );
}

export default App;
/*<Route exact path="/Reservation/reservation" element={<Reservation />}/>  */