import { useQuery } from "@tanstack/react-query";
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



export const ShopAuthProvider = createContext();

const ShopAuth = ({ children }) => {
    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;



    const { data: shopCredential = {}, isLoading, isError, refetch } = useQuery({
        queryKey: ["firebase"],
        queryFn: async () => {
            try {
                const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/firebase/${shopId}`);
                const data = await res.json();
                return data;
            } catch (error) {
                console.error("Error fetching shop data:", error);
                throw error; // Rethrow the error to mark the query as failed
            }
        },
    });
    const { data: shop_id = {}, isLoading: load, refetch: reload } = useQuery({
        queryKey: ["shop_id"],
        queryFn: async () => {
            try {
                const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/shopId/${shopId}`);
                const data = await res.json();
                return data;
            } catch (error) {
                console.error("Error fetching shop data:", error);
                throw error; // Rethrow the error to mark the query as failed
            }
        },
        enabled: !!shopId
    });



    const [shopUser, setShopUser] = useState('');
    let auth;


    useEffect(() => {

        if (shopId !== null && reload) {
            reload();
            refetch()
        }

        if (!isLoading && !isError && Object.keys(shopCredential).length > 0) {
            const firebaseConfig = {
                apiKey: shopCredential.apiKey,
                authDomain: shopCredential.authDomain,
                projectId: shopCredential.projectId,
                storageBucket: shopCredential.storageBucket,
                messagingSenderId: shopCredential.messagingSenderId,
                appId: shopCredential.appId,
                measurementId: shopCredential.measurementId,
            };


            const app = initializeApp(firebaseConfig);
            const analytics = getAnalytics(app);

            auth = getAuth(app);

        }
    }, [shopCredential, isLoading, isError, shopId, shop_id, load, refetch]);

    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    // const githubProvider = new GithubAuthProvider();

    const Google = () => {

        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // const Github = () => {
    //     setLoading(true);
    //     return signInWithPopup(auth, githubProvider);
    // };

    // const RegistrationInEmail = (email, password) => {
    //     setLoading(true);
    //     return createUserWithEmailAndPassword(auth, email, password);
    // };

    // const loginWithEamil = (email, password) => {
    //     setLoading(true);
    //     return signInWithEmailAndPassword(auth, email, password);
    // };

    // const logOut = () => {
    //     setLoading(true);
    //     signOut(auth)

    // };
    // const forgetPass = (email) => {
    //     if (email === true) {
    //         sendPasswordResetEmail(auth, email)
    //             .then(() => {
    //                 Swal.fire("We are sent a mail", "Please Check Your Mail", "success");
    //             })
    //             .catch((error) => { });
    //     } else {
    //         Swal.fire("Sorry Sir", "Please input your email", "info");
    //     }
    // };

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         setLoading(false);
    //         setUser(user);
    //     });
    //     return () => {
    //         setLoading(true);
    //         unsubscribe();
    //     };
    // }, []);

    const authInfo = {
        shopUser,
        shopCredential,
        Google,
        shop_id,
        // Github,
        // RegistrationInEmail,
        // logOut,
        // forgetPass,
        // loginWithEamil,
        // loading,
        // setLoading
    };
    return (
        // Use ShopAuthProvider.Provider here instead of AuthContext.Provider
        <ShopAuthProvider.Provider value={authInfo}>{children}</ShopAuthProvider.Provider>
    );
};

export default ShopAuth;
