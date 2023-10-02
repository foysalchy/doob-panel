import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import Swal from "sweetalert2";
import app from '../Firebase/firebase';


export const AuthContext = createContext();

const UserProvider = ({ children }) => {

    const auth = getAuth(app);
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    console.log(user);
    const RegistrationInEmail = (email, password,) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);

    };

    const loginWithEamil = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setUser('')
        setLoading(true);
        signOut(auth)

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

    useEffect(() => {
        const unsubscribe = (user) => {
            setLoading(false);
            setUser(user);
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
        loading,
        setLoading
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default UserProvider;