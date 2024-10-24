import { useEffect, useState } from 'react';
import './signUp.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




function SignUp() {

    const navigate = useNavigate();

   const [inputFields,setInputFields]=useState({
       name:"",
       lastname:"",
       email:"",
       password:"",
       username:""
   })

   const [errors, setErrors] = useState({});
   const [submitting, setSubmitting] = useState(false);
    
   
   const [successMessage, setSuccessMessage] = useState('');


   const validateValues = (inputValues) => {
      const errors = {};
      const nonLetterRegex = /[^a-zA-Z]/;
  
      if (!inputValues.name) {
          errors.name = "Name can not be empty!";
      } else if (nonLetterRegex.test(inputValues.name)) {
          errors.name = "Name should only contain letters!";
      }
  
      if (!inputValues.lastname) {
          errors.lastname = "Lastname can not be empty!";
      } else if (nonLetterRegex.test(inputValues.lastname)) {
          errors.lastname = "Lastname should only contain letters!";
      }
  
      if (!inputValues.email) {
          errors.email = "Email can not be empty!";
      } else {
          const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
          if (!emailRegex.test(inputValues.email)) {
              errors.email = "Your email should be like: test@example.com";
          }
      }
  
      if (!inputValues.username) {
          errors.username = "Username can not be empty!";
      }
  
      if (!inputValues.password) {
          errors.password = "Password can not be empty!";
      } else if (inputValues.password.length < 8) {
          errors.password = "Password needs to be at least 8 characters!";
      }
  
      return errors;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateValues({ ...inputFields, [name]: value })[name],
    }));
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateValues(inputFields)[name],
    }));
  };

    const handleSubmit = (event) => {
      event.preventDefault();
      setErrors(validateValues(inputFields));
      setSubmitting(true);
    };

    const finishSubmit= async()=>{
      console.log(inputFields);
      try{
          const response = await axios.post('http://localhost:8080/api/user/insert',{
            name:inputFields.name,
            lastname:inputFields.lastname,
            email:inputFields.email,
            password:inputFields.password,
            username:inputFields.username
          });
 
          console.log(response.data);
          setSuccessMessage('Account created successfully! Redirecting to login...');

      }catch(error){
        console.error('Error posting data:', error.response ? error.response.data : error.message);
      }


    };

    useEffect(()=>{
         if(Object.keys(errors).length === 0 && submitting){
            finishSubmit();
            setSubmitting(false);
         }
    },[errors]);


    useEffect(()=>{
        
        if(successMessage){
            const timer = setTimeout(() => {
                navigate('/Login'); 
                setSuccessMessage(''); 
              }, 2000); 
          
              return () => clearTimeout(timer);
        }

    },[successMessage,navigate]);

  return (
    <div className='signup template d-flex justify-content-center align-items-center '>
        <div className='form_container p-5 rounded '>
<form onSubmit={handleSubmit}>
    <h3  className='text-center mb-5 fs-2'>Sign up</h3>
    <div className='mb-2'>
    <label htmlFor='fname' className='ms-2'>First Name:</label>
       <input type='text' name='name'autoComplete='name' placeholder='' className='form-control'value={inputFields.name} onChange={handleChange} onBlur={handleBlur}></input>
    </div>
    {errors.name ? (<p className="error fs-6"> {errors.name}</p>) : null}
    <div className='mb-2'>
    <label htmlFor='lname' className='ms-2'>Last Name:</label>
       <input type='text' name='lastname' placeholder='' className='form-control'value={inputFields.lastname} onChange={handleChange} onBlur={handleBlur}></input>
    </div>
    {errors.lastname ? (<p className="error fs-6"> {errors.lastname}</p>) : null}
    <div className='mb-2'>
    <label htmlFor='email' className='ms-2'>Email:</label>
       <input type='email' name='email'autoComplete='email' placeholder='e.g., name@example.com' className='form-control' value={inputFields.email} onChange={handleChange} onBlur={handleBlur}></input>
    </div>
    {errors.email ? (<p className="error fs-6"> {errors.email}</p>) : null}
    <div className='mb-2'>
    <label htmlFor='email' className='ms-2'>Username:</label>
       <input type='text' name='username' placeholder='' autoComplete='username' className='form-control' value={inputFields.username} onChange={handleChange} onBlur={handleBlur}></input>
    </div>
    {errors.username ? (<p className="error fs-6"> {errors.username}</p>) : null}
    <div className='mb-2'>
    <label htmlFor='password' className='ms-2'>Password:</label>
       <input type='password' name='password'autocomplete="password" placeholder='Create a strong password' className='form-control' value={inputFields.password} onChange={handleChange} onBlur={handleBlur}></input>
    </div>
    {errors.password ? (<p className="error fs-6"> {errors.password}</p>) : null}
    <div className='d-grid mt-5' >
            <button className='btn1' type='submit'>Sign up</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
   
</form>
</div>
    </div>
  )
}

export default SignUp;



