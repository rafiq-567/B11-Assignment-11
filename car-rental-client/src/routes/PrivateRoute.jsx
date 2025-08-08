import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const{user, loading}= useContext(AuthContext)
    if(loading){
        return <span className="loading loading-spinner loading-md"></span>
    }
    if(!user){
        return <Navigate to="/logIn"></Navigate>
    }
    return children;
};

export default PrivateRoute;