import React from 'react'
import './stylels.css'
import { Link ,useNavigate,useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import React, { useState } from "react";
import axios from 'axios';

function Login() {

  let navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password:""
  });

  const { username,password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.username]: e.target.value });};

  const onSubmit = async (e) => {e.preventDefault();
    await axios.post("http://localhost:8080/api/user", user);
    navigate("\Dashboard");
  };

  return (
    <div className='login temaplate d-flex justify-content-center align-items-center  vh-100 .bg-light'>
        <div className='form_container p-5 rounded '>
<form onSubmit={(e) => onSubmit(e)}>
    <h3  className='text-center'>Log in</h3>
    <div className='mb-2'>
    <label htmlFor='username'>Username</label>
       <input type='text' placeholder='Enter your username' value={username} className='form-control'   onChange={(e) => onInputChange(e)}></input>
      
    </div>
    <div className='mb-2'>
    <label htmlFor='password'>Password</label>
       <input type='password' placeholder='Enter your password' value={password}  className='form-control'   onChange={(e) => onInputChange(e)}></input>
      
    </div>
    <div className='form-check mb-3'>
    <label htmlFor='check' className='form-check-label'> Remember me </label>
       <input type='checkbox'  className=' form-check-input  ' id='check'></input>
      
    </div>
    <div className='d-grid'>
            <button type="submit "className='btn btn-danger' >Sign in</button>
      
    </div>
    <p className='text-end mt-2'>
        Dont have an account? <Link to="/LogInSignUp/SignUp" className='ms-2'>Sign Up</Link>
    </p>
</form>
</div>
    </div>
  );
}
export default Login;