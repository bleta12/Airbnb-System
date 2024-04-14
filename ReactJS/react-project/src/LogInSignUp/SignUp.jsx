import React from 'react'
import './stylels.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

function SignUp() {
  return (
    <div className='signup temaplate d-flex justify-content-center align-items-center  vh-100 bg-primary'>
        <div className='form_container p-5 rounded bg-white'>
<form>
    <h3  className='text-center'>Sign up</h3>
    <div className='mb-2'>
    <label htmlFor='fname'>First Name</label>
       <input type='text' placeholder='Enter your first name' className='form-control'></input>
    </div>
    <div className='mb-2'>
    <label htmlFor='lname'>Last Name</label>
       <input type='text' placeholder='Enter your last name' className='form-control'></input>
    </div>
    <div className='mb-2'>
    <label htmlFor='email'>Email</label>
       <input type='email' placeholder='Enter your email' className='form-control'></input>
    </div>
    <div className='mb-2'>
    <label htmlFor='password'>Password</label>
       <input type='password' placeholder='Enter your password' className='form-control'></input>
    </div>
    <div className='d-grid mt-2' >
            <button className='btn btn-primary'>Sign up</button>
    </div>
    <p className='text-end mt-2'>
      Already registred <Link to="/LogInSignUp/Login" className='ms-2'>Sign in</Link>
    </p>
</form>
</div>
    </div>
  )
}

export default SignUp;



