import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/UserProvider';
import useSeller from '../Hooks/UseSeller';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json";



const SellerRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
    const [isSeller, isSellerLoading] = useSeller(user?.email)

    const location = useLocation()

    if (isSellerLoading) {
        return (
            <>
                <>
                    <h1 className='text-2xl h-full flex justify-center items-center'>
                        <Lottie animationData={groovyWalkAnimation} loop={true} /></h1>
                </>
            </>
        )
    }

    if (isSeller) {
        return children
    }

    return <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>
};

export default SellerRoute;
