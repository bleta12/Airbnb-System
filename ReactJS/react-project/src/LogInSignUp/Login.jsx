import React from 'react'
import './stylels.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

function Login() {
  return (
    <div className='login temaplate d-flex justify-content-centre align-items-centre  vh-100 bg-primary'>
        <div className='form_container p-5 rounded bg-white'>
<form>
    <h3  className='text-centre'>Log in</h3>
    <div className='mb-2'>
    <label htmlFor='email'>Email</label>
       <input type='email' placeholder='Enter your email' className='form-control'></input>
    </div>
    <div className='mb-2'>
    <label htmlFor='password'>Password</label>
       <input type='password' placeholder='Enter your password' className='form-control'></input>
    </div>
    <div className='mb-2'>
    <label htmlFor='check' className='custom-input-label ms-2'> Remember me</label>
       <input type='checkbox'  className='custom-control custom-checkbox' id='check'></input>
      
    </div>
    <div className='d-grid'>
            <button className='btn btn-primary'>Sign in</button>
    </div>
    <p className='text-end mt-2'>
        Forgot your <a href='#'> Password?</a> <Link to="/signup/" className='ms-2'>Sign Up</Link>
    </p>
</form>
</div>
    </div>
  )
}

export default Login;