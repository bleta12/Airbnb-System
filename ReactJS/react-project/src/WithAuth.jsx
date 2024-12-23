import React from 'react';
import { Navigate } from 'react-router-dom';

const WithAuth = (Component) => {
    return (props) => {
        const token = localStorage.getItem('token');
        console.log("yeeey");
        if (!token) {
            return <Navigate to="/LogInSignUp/Login" />;
        }
        return <Component {...props} />;
    };
};

export default WithAuth;
