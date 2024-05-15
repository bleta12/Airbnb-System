
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropertyView from "./PropertyView/PropertyView";
import SignUp from './LogInSignUp/SignUp';
import Home from './Home/Home';
import Reservation from './Reservation/reservation';
import Login from './LogInSignUp/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProperty from './AddProperty/AddProperty';
import Footer from './NavbarFooter/Footer';
import Favorit from './FavoriteList/Favorit';
import Navbar from './NavbarFooter/Navbar';
/*import Home from './components/Home';*/
import Icones from './components/Icones';
import Cards from './components/Cards';
import Slider from './components/Slider';

function App() {

  return (
    <Router>

      <Routes>
        <Route exact path="/Reservation/reservation" element={<Reservation />} />
        <Route exact path="/Home/Home" element={<Home />} />
        <Route exact path="/PropertyView/PropertyView" element={<PropertyView />} />
        <Route exact path="/LogInSignUp/Login" element={<Login />} />
        <Route exact path="/LogInSignUp/SignUp" element={<SignUp />} />
        <Route exact path="/AddProperty/AddProperty" element={<AddProperty />} />
        <Route exact path="/NavbarFooter/Footer" element={<Footer />} />
        <Route exact path="/FavoriteList/Favorit" element={<Favorit />} />
        <Route exact path="/components/Home" element={<Home />} />
        <Route exact path="/components/Icones" element={<Icones />} />
        <Route exact path="/NavbarFooter/Navbar" element={<Navbar />} />
        <Route exact path="/components/Cards" element={<Cards />} />
        <Route exact path="/components/Slider" element={<Slider />} />


      </Routes>

    </Router>

  );
}

export default App;
/*<Route exact path="/Reservation/reservation" element={<Reservation />}/>  */