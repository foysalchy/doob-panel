import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import Swal from "sweetalert2";
import app from '../Firebase/firebase';
import Cookies from 'js-cookie';


export const AuthContext = createContext();

const UserProvider = ({ children }) => {

    const auth = getAuth(app);
    const [user, setUser] = useState('');
    const [shopInfo, setShopInfo] = useState('')
    const [loading, setLoading] = useState(true);

    const RegistrationInEmail = (email, password,) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);

    };

    const loginWithEamil = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        const cookies = Cookies.get();
        for (const cookieName in cookies) {
            const decodedValue = decodeURIComponent(cookies[cookieName]);
            Cookies.remove(cookieName, { path: '/' });
            Cookies.remove(cookieName, { path: '/seller' });
            Cookies.remove(cookieName, { path: '/admin' });
        }
        setUser('');
        setShopInfo('');

    };



    const forgetPass = (email) => {
        if (email === true) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    Swal.fire("We are sent a mail", "Please Check Your Mail", "success");
                })
                .catch((error) => { });
        } else {
            Swal.fire("Sorry Sir", "Please input your email", "info");
        }
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
        setLoading(false)
        const userCookie = getCookie('SaleNowUser');

        if (userCookie) {
            const userData = JSON.parse(userCookie);

            setUser(userData)
            setLoading(false)

        } else {
            setLoading(true)
        }
    };


    const checkShopCookie = () => {
        setLoading(true)
        const userCookie = getCookie('SellerShop');


        if (userCookie) {
            const userData = JSON.parse(userCookie);

            setShopInfo(userData)
            setLoading(false)

        } else {

            setLoading(false)
        }
    };


    useEffect(() => {
        const unsubscribe = () => {
            setLoading(false);
            checkUserCookie()
            checkShopCookie()
        };
        return () => {
            setLoading(true);
            unsubscribe();
        };
    }, []);


    const authInfo = {
        user,
        setUser,
        RegistrationInEmail,
        logOut,
        forgetPass,
        loginWithEamil,
        setCookie,
        loading,
        setLoading,
        shopInfo,
        setShopInfo
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default UserProvider;