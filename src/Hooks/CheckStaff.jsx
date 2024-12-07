import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/UserProvider';
import UseShop from '../Hooks/UseShop';
import { Navigate, useLocation } from 'react-router-dom';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json";
import { useQuery } from '@tanstack/react-query';

const CheckStaff = ({ children },) => {
    const { user, loading, shopInfo } = useContext(AuthContext);

    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/admin\/([^/]+)/);
    const sellerPath = idMatch ? idMatch[1] : null;

    // Check for the 'POS' permission
    const check = user?.permissions?.some(itm => itm?.route === sellerPath);

    // if (check || !user.staffRole) {
    //     return children;
    // }

    // Redirect to dashboard if the user doesn't have access to POS
    // return <Navigate to="/admin/dashboard" state={{ from: sellerPath }} replace />;

    return children;
};

export default CheckStaff;
