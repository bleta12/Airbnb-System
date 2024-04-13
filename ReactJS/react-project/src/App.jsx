

import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import PropertyView from "./PropertyView/PropertyView";
import Navbar from './Navbar';


function App() {


   return(
    <Router>
      <Navbar/>
      <div className="content">
      <Routes>
        <Route exact path="/PropertyView/PropertyView" element={<PropertyView />}/>
      </Routes>
      </div>

     
   
     </Router>

   );


}

export default App;
