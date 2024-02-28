import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/UserProvider';
import UseShop from '../Hooks/UseShop';
import { Navigate, useLocation } from 'react-router-dom';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json";
import { useQuery } from '@tanstack/react-query';

const PrivateRoute = ({ children },) => {
    const { user, loading, shopInfo } = useContext(AuthContext);

    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/seller\/([^/]+)/);
    const sellerPath = idMatch ? idMatch[1] : null;

    const { data: prices = [], isLoading } = useQuery({
        queryKey: ["prices"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}`);
            const data = await res.json();
            localStorage.setItem('price', JSON.stringify(data?.data));
            return data?.data;
        },
    });

    if (isLoading) {
        return <div></div>
    }

    // Check for the 'POS' permission
    const check = prices?.permissions?.some(itm => itm?.route === sellerPath);

    if (check || user.staffRole) {
        return children;
    }

    // Redirect to dashboard if the user doesn't have access to POS
    return <Navigate to="/seller/dashboard" state={{ from: sellerPath }} replace />;
};

export default PrivateRoute;
