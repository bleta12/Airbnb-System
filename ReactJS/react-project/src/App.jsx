

import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import PropertyView from "./PropertyView/PropertyView";
import SignUp from './LogInSignUp/SignUp';
import Login from './LogInSignUp/Login';
import Home from './Home/Home';


function App() {


   return(
    <Router>
    
      <Routes>
        <Route exact path="/Home/Home" element={<Home />}/>  
        <Route exact path="/PropertyView/PropertyView" element={<PropertyView />}/>
        <Route exact path="/LogInSignUp/Login" element={<Login/>}/>
        <Route exact path="/LogInSignUp/SignUp" element={<SignUp/>}/>
      </Routes>
      

     
   
     </Router>

   );


}

export default App;
