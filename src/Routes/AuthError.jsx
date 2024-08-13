import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/UserProvider';
import { Navigate, useLocation } from 'react-router';
import Lottie from "lottie-react";
import groovyWalkAnimation from './Loading.json';

const AuthError = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    const location = useLocation()
    if (loading) {
        return (
            <>
                <h1  className="grid h-screen px-4 bg-black place-content-center"> <Lottie animationData={groovyWalkAnimation} loop={true} /> Check User</h1>
            </>
        )
    }

    if (!user) {
        return children
    }

    return <Navigate to={"/"} state={{ from: location }} replace></Navigate>
};

export default AuthError;