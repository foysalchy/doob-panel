import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/UserProvider';
import UseShop from '../Hooks/UseShop';
import { Navigate, useLocation } from 'react-router-dom';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json";


const IsSelllerRegistration = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [shopInfo, isShopInfoLoading] = UseShop(user?.shopId)
    console.log(user?.shopId, 'shopInfo');

    const location = useLocation()

    if (isShopInfoLoading) {
        return (
            <>
                <h1  className="grid h-screen px-4 bg-black place-content-center"> <Lottie animationData={groovyWalkAnimation} loop={true} /></h1>
            </>
        )
    }

    if (shopInfo && user) {
        return children
    }

    return <Navigate to="/shop-register" state={{ from: location }} replace></Navigate>
};

export default IsSelllerRegistration;