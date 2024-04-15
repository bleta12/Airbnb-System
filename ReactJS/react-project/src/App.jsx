

import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import PropertyView from "./PropertyView/PropertyView";
import SignUp from './LogInSignUp/SignUp';
import Home from './Home/Home';
import Login from './LogInSignUp/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Reservation from './Reservation/reservation';
import AddProperty from './AddProperty/AddProperty';
import Footer from './NavbarFooter/Footer';


function App() {


   return(
    <Router>
    
      <Routes>
      <Route exact path="/Reservation/reservation" element={<Reservation />}/>  

        <Route exact path="/Home/Home" element={<Home />}/>  
        <Route exact path="/PropertyView/PropertyView" element={<PropertyView />}/>
        <Route exact path="/LogInSignUp/Login" element={<Login/>}/>
        <Route exact path="/LogInSignUp/SignUp" element={<SignUp/>}/>
        <Route exact path="/AddProperty/AddProperty" element={<AddProperty />}/>  
        <Route exact path="/NavbarFooter/Footer" element={<Footer/>}/>  
      </Routes>
      
     </Router>

   );


}

export default App;
