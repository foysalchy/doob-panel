import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [shopInfo, setShopInfo] = useState('');
    const [loading, setLoading] = useState(true);
    const [checkUpData, setCheckUpData] = useState({})
    const [checkUpDarazData, setCheckUpDarazData] = useState({})
    const [checkUpWoocommerceData, setCheckUpWoocommerceData] = useState({})
    const [reviewCheckUpData, setReviewCheckUpData] = useState({})
    const [invoiceData, setInvoiceData] = useState({})
    const [userAddProduct, setUserAddProduct] = useState(null)
    const [selectProductData, setSelectProductData] = useState([]);
    const [orderStage, setOrderStage] = useState([]);
    const logOut = () => {
        setLoading(true);
        const cookies = Cookies.get();
        for (const cookieName in cookies) {
            const decodedValue = decodeURIComponent(cookies[cookieName]);
            Cookies.remove(cookieName, { path: '/' });
            Cookies.remove(cookieName, { path: '/seller' });
            Cookies.remove(cookieName, { path: '/admin' });
            Cookies.remove(cookieName, { path: '/admin/warehouse' });
        }

        setUser('');
        setShopInfo('');
        setLoading(false);
    };

    const setCookie = (name, value) => {
        document.cookie = `${name}=${encodeURIComponent(value)}`;
    };

    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    };

    const checkUserCookie = () => {
        const userCookie = getCookie('DoobUser');
        if (userCookie) {
            const userData = JSON.parse(userCookie);
            setUser(userData);
        }
        setLoading(false);
    };

    const checkShopCookie = () => {
        const userCookie = getCookie('SellerShop');
        if (userCookie) {
            const userData = JSON.parse(userCookie);
            setShopInfo(userData);
        }
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = () => {
            checkUserCookie();
            checkShopCookie();
        };

        unsubscribe();

        return () => {

        };
    }, []);

    const authInfo = {
        user,
        setUser,
        logOut,
        setCookie,
        loading,
        setLoading,
        shopInfo,
        setShopInfo,
        checkUpData,
        setCheckUpData,
        invoiceData,
        setInvoiceData,
        reviewCheckUpData,
        setReviewCheckUpData,
        checkUpWoocommerceData,
        setCheckUpWoocommerceData,
        userAddProduct,
        setUserAddProduct,
        selectProductData,
        setSelectProductData,
        orderStage,
        setOrderStage
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default UserProvider;