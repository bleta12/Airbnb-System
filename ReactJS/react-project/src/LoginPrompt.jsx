import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from './bacgroundExploreStay.webp';

const LoginPrompt = () => {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate("/LogInSignUp/Login"); 
  };

  const handleSignUpClick = () => {
    navigate("/LogInSignUp/SignUp"); 
  };

  const pageStyle = {
    position: "relative",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
    padding: "20px"
  };

  const overlayStyle = {
    background: "rgba(0, 0, 0, 0.6)", // Dark overlay for better text visibility
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "450px",
    width: "90%"
  };

  const headingStyle = {
    fontSize: "2.5rem",
    marginBottom: "15px"
  };

  const textStyle = {
    fontSize: "1.2rem",
    marginBottom: "25px"
  };

  const buttonStyle = {
    border: "none",
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
    margin: "5px"
  };

  const loginButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#007bff",
    color: "white"
  };

  const signUpButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28a745",
    color: "white"
  };

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}>
        <h1 style={headingStyle}>Welcome to Our Site!</h1>
        <p style={textStyle}>
          It looks like you're not logged in. To get the full experience, please log in.  
          If you don’t have an account yet, sign up and join us!
        </p>
        <button
          style={loginButtonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          onClick={handleLoginClick}
        >
          Log In
        </button>
        <button
          style={signUpButtonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1e7e34")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          onClick={handleSignUpClick}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPrompt;
