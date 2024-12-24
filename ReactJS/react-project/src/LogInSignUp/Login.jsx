import { useEffect, useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

   const [inputFields, setInputFields] = useState({
       username: "",
       password: ""
   });

   const [errors, setErrors] = useState({});
   const [submitting, setSubmitting] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const validateValues = (inputValues) => {
      const errors = {};
  
      if (!inputValues.username) {
          errors.username = "Username can not be empty!";
      }
  
      if (!inputValues.password) {
          errors.password = "Password can not be empty!";
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

    const finishSubmit = async () => {
      try {
          const response = await axios.post('http://localhost:8080/api/user/login', {
            username: inputFields.username,
            password: inputFields.password
          });
          

          localStorage.setItem('accessToken', response.data.accessToken);  
          localStorage.setItem('refreshToken', response.data.refreshToken);
          console.log("qka osht tu u rujt"+response); 
          navigate('/'); 
        
      } catch (error) {
          console.error('Error logging in:', error.response ? error.response.data : error.message);
          setErrorMessage('Invalid credentials, please try again.');
      }
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            finishSubmit();
            setSubmitting(false);
        }
    }, [errors]);

  return (
    <div className="background">
        <div className="overlay">
            <div className="login template d-flex justify-content-center align-items-center ">
                <div className="form_container p-5 rounded mt-5">
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-center mb-5 fs-2">Log in</h3>
                        <div className="mb-2">
                            <label htmlFor="username" className="ms-2">Username:</label>
                            <input
                                type="text"
                                name="username"
                                placeholder=""
                                className="form-control"
                                autoComplete='username'
                                value={inputFields.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.username && (<p className="error fs-7">{errors.username}</p>)}

                        <div className="mb-2">
                            <label htmlFor="password" className="ms-2">Password:</label>
                            <input
                                type="password"
                                name="password"
                                autocomplete="current-password"
                                className="form-control"
                                value={inputFields.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.password && (<p className="error fs-7">{errors.password}</p>)}

                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        <div className="d-grid mt-5">
                            <button className="btn1 mb-3" type="submit">Log in</button>
                        </div>
                        <span className=''>You dont have an account? </span>
                         <Link className="navbar-brand" to="/LogInSignUp/SignUp">
                         <span className="fw-bold fs-6 text-info"> Sign up</span>
                         </Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;
