import React from 'react'
import './stylels.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

function Login() {
  return (
    <div className='login temaplate d-flex justify-content-center align-items-center  vh-100 bg-primary'>
        <div className='form_container p-5 rounded bg-white'>
<form>
    <h3  className='text-center'>Log in</h3>
    <div className='mb-2'>
    <label htmlFor='email'>Email</label>
       <input type='email' placeholder='Enter your email' className='form-control'></input>
    </div>
    <div className='mb-2'>
    <label htmlFor='password'>Password</label>
       <input type='password' placeholder='Enter your password' className='form-control'></input>
    </div>
    <div className='form-check mb-3'>
    <label htmlFor='check' className='form-check-label'> Remember me</label>
       <input type='checkbox'  className=' form-check-input  ' id='check'></input>
      
    </div>
    <div className='d-grid'>
            <button className='btn btn-danger'>Sign in</button>
    </div>
    <p className='text-end mt-2'>
        Forgot your <Link to="" className='ms-2'>password?</Link> 
        Dont have an account? <Link to="/LogInSignUp/SignUp" className='ms-2'>Sign Up</Link>
    </p>
</form>
</div>
    </div>
  )
}
export default Login;