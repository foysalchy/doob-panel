import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/UserProvider';
import UseSupperAdmin from '../Hooks/UseSupperAdmin';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json";

const SupperAdminRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isSupperAdmin, isSupperAdminLoading] = UseSupperAdmin(user?.email)

    const location = useLocation()

    if (loading || isSupperAdminLoading) {
        return (
            <>
                <>
                    <h1  className="grid h-screen px-4 bg-black place-content-center">
                        <Lottie animationData={groovyWalkAnimation} loop={true} /> </h1>
                </>
            </>
        )
    }

    if (isSupperAdmin && user) {
        return children
    }

    return <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>
};

export default SupperAdminRouter;