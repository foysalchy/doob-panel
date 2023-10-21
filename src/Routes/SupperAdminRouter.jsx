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

    if (isSupperAdminLoading) {
        return (
            <>
                <>
                    <h1 className='text-2xl h-full flex justify-center items-center'>
                        <Lottie animationData={groovyWalkAnimation} loop={true} />Supper Admin</h1>
                </>
            </>
        )
    }

    if (user && isSupperAdmin) {
        return children
    }

    return <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>
};

export default SupperAdminRouter;