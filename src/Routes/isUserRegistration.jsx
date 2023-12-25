import { useContext } from "react";
import { ShopAuthProvider } from "../AuthProvider/ShopAuthProvide";
import { useLocation } from "react-router-dom";
import { Navigate, useLocation } from 'react-router-dom';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json"

const IsUserRegistration = ({ children }) => {
    const { shopUser, loading } = useContext(ShopAuthProvider)


    const location = useLocation()

    if (isShopInfoLoading) {
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

export default IsUserRegistration;