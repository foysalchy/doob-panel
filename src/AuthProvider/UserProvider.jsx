import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import Swal from "sweetalert2";
import app from '../Firebase/firebase';


export const AuthContext = createContext();

const UserProvider = ({ children }) => {

    const auth = getAuth(app);
    const [user, setUser] = useState();
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

        document.cookie = `${'user'}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        setUser('')



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
        const userCookie = getCookie('user');
        if (userCookie) {
            const userData = JSON.parse(userCookie);

            setUser(userData)

        } else {
            console.log('User cookie not found');
        }
    };


    useEffect(() => {
        const unsubscribe = (user) => {
            setLoading(false);
            checkUserCookie()
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
        setLoading
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default UserProvider;