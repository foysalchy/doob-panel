import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/UserProvider';
import UseShop from '../Hooks/UseShop';
import { Navigate, useLocation } from 'react-router-dom';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json";


const IsSelllerRegistration = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [shopInfo, isShopInfoLoading] = UseShop(user?.email)

    const location = useLocation()

    if (isShopInfoLoading ) {
        return (
            <>
                <h1 className='text-2xl h-full flex justify-center items-center'> <Lottie animationData={groovyWalkAnimation} loop={true} /></h1>
            </>
        )
    }

    if (shopInfo && user) {
        return children
    }

    return <Navigate to="/seller/shop-register" state={{ from: location }} replace></Navigate>
};

export default IsSelllerRegistration;