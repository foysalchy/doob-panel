
// { name: 'Domain Management', route: 'domain-management' },
// { name: 'Channel Integration', route: 'channel-integration' },
// { name: 'Warehouse', route: 'warehouse' },
// { name: 'Staf Account', route: 'staf-account' },
//access route
// const managementPermission = (check) => {
//     return prices?.permissions?.some(itm => itm?.name === check)
// };


import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/UserProvider';
import UseShop from '../Hooks/UseShop';
import { Navigate, useLocation } from 'react-router-dom';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json";
import { useQuery } from '@tanstack/react-query';


const IsDomainManagement = ({ children }) => {
    const { user, loading, shopInfo } = useContext(AuthContext)

    const { data: prices = [], loader } = useQuery({
        queryKey: ["prices"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}`);
            const data = await res.json();
            localStorage.setItem('price', JSON.stringify(data?.data));
            return data?.data;
        },
    });

    // { name: 'Domain Management', route: 'domain-management' },
    // { name: 'Channel Integration', route: 'channel-integration' },
    // { name: 'Warehouse', route: 'warehouse' },
    // { name: 'Staf Account', route: 'staf-account' },
    //access route

    let check = prices?.permissions?.some(itm => itm?.name === 'Domain Management')
    console.log(check);
    if (check) {
        return children
    }

    return <Navigate to="*" state={{ from: location }} replace></Navigate>
};

export default IsDomainManagement;