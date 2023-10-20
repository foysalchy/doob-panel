import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../AuthProvider/UserProvider';
import { useEffect } from 'react';

const UseShop = () => {
    const [shopInfo, setShopInfo] = useState(false);
    const [isShopInfoLoading, setIsShopInfoLoading] = useState(true);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/shop/checkshop/${user?.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setShopInfo(data);
                    setIsShopInfoLoading(false);
                });
        }
    }, [user?.email, setShopInfo]);
    return [shopInfo, isShopInfoLoading];
};

export default UseShop;