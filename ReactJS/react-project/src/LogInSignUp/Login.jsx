import React from 'react'
import './stylels.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { useState } from "react";



function Login() {

  const [username, setUsername] = useState('') // useState to store username
  const [password, setPassword] = useState('') // useState to store Password


  function validateform(){

    if (username.length == 0) {
      alert('Username can not be empty!')
      return
    }

    if (password.length < 8) {
      alert(
        'Password must contain greater than or equal to 8 characters.',
      )
      return
    }

     
     let countUpperCase = 0
    
     let countLowerCase = 0
   
     let countDigit = 0
  
     let countSpecialCharacters = 0
 
     for (let i = 0; i < password.length; i++) {
       const specialChars = [
         '!',
         '@',
         '#',
         '$',
         '%',
         '^',
         '&',
         '*',
         '(',
         ')',
         '_',
         '-',
         '+',
         '=',
         '[',
         '{',
         ']',
         '}',
         ':',
         ';',
         '<',
         '>',
       ]
 
       if (specialChars.includes(password[i])) {
         countSpecialCharacters++;
       } else if (!isNaN(password[i] * 1)) {
         countDigit++;
       } else {
         if (password[i] == password[i].toUpperCase()) {
           countUpperCase++;
         }
         if (password[i] == password[i].toLowerCase()) {
           countLowerCase++;
         }
       }
     }
 
     if (countLowerCase == 0) {
       alert('Invalid password, Passwords must contain a minimum of 1 lower case letter , and a minimum of 1 upper case letter, 1 number and a minimum 1 special character: ~`!@#$%^&*()-_+={}[]|\;:"<>,./?')
       return
     }
 
     if (countUpperCase == 0) {
       alert('Invalid password, Passwords must contain a minimum of 1 lower case letter , and a minimum of 1 upper case letter, 1 number and a minimum 1 special character: ~`!@#$%^&*()-_+={}[]|\;:"<>,./?')
       return
     }
 
     if (countDigit == 0) {
       alert('Invalid password, Passwords must contain a minimum of 1 lower case letter , and a minimum of 1 upper case letter, 1 number and a minimum 1 special character: ~`!@#$%^&*()-_+={}[]|\;:"<>,./?')
       return
     }
 
     if (countSpecialCharacters == 0) {
       alert('Invalid password, Passwords must contain a minimum of 1 lower case letter , and a minimum of 1 upper case letter, 1 number and a minimum 1 special character: ~`!@#$%^&*()-_+={}[]|\;:"<>,./?')
       return
     }

 
     alert('Form is valid')
  }






  return (
    <div className='login temaplate d-flex justify-content-center align-items-center  vh-100 .bg-light'>
        <div className='form_container p-5 rounded '>
<form>
    <h3  className='text-center'>Log in</h3>
    <div className='mb-2'>
    <label htmlFor='username'>Username</label>
       <input type='text' placeholder='Enter your username' onChange={(e) => setUsername(e.target.value)} className='form-control'></input>
      
    </div>
    <div className='mb-2'>
    <label htmlFor='password'>Password</label>
       <input type='password' placeholder='Enter your password'  onChange={(e) => setPassword(e.target.value)} className='form-control'></input>
      
    </div>
    <div className='form-check mb-3'>
    <label htmlFor='check' className='form-check-label'> Remember me</label>
       <input type='checkbox'  className=' form-check-input  ' id='check'></input>
      
    </div>
    <div className='d-grid'>
            <button type="submit "className='btn btn-danger' onClick={() => {validateform()}}>Sign in</button>
      
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