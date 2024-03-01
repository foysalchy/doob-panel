import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../AuthProvider/UserProvider';
import { useEffect } from 'react';

const UseShop = () => {
    const [shopInfo, setShopInfo] = useState(false);
    const [isShopInfoLoading, setIsShopInfoLoading] = useState(true);
    const { user, loading } = useContext(AuthContext);
    console.log(user);


    useEffect(() => {

        if (loading) {
            setIsShopInfoLoading(true)
        }
        else {
            if (user?.email) {
                fetch(`http://localhost:5001/api/v1/shop/checkshop?shopEmail=${user?.shopEmail}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setShopInfo(data.seller);
                        setIsShopInfoLoading(false);
                    });
            }
            else {
                setIsShopInfoLoading(false);
            }
        }
    }, [user?.email, setShopInfo, loading]);
    return [shopInfo, isShopInfoLoading];
};

export default UseShop;