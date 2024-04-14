

import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import PropertyView from "./PropertyView/PropertyView";
import SignUp from './LogInSignUp/SignUp';
import Home from './Home/Home';
import Reservation from './Reservation/reservation';


function App() {


   return(
    <Router>
    
      <Routes>
      <Route exact path="/Reservation/reservation" element={<Reservation />}/>  

        <Route exact path="/Home/Home" element={<Home />}/>  
        <Route exact path="/PropertyView/PropertyView" element={<PropertyView />}/>
        <Route exact path="/LogInSignUp/SignUp" element={<SignUp/>}/>
      </Routes>
      

     
   
     </Router>

   );


}

export default App;
