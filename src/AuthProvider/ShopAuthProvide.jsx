import { useQuery } from "@tanstack/react-query";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword, signOut, onAuthStateChanged, FacebookAuthProvider, sendPasswordResetEmail, updatePassword } from 'firebase/auth'
import React, { useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const ShopAuthProvider = createContext();

const ShopAuth = ({ children }) => {
    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);
    const [reloadUser, setReloadUser] = useState(false)
    const [defaultAddress, setDefaultAddress] = useState()
    const shopId = idMatch ? idMatch[1] : null;
    const [selectProductData, setSelectProductData] = useState([])

    const { data: shopCredential = {}, isLoading, isError, refetch } = useQuery({
        queryKey: ["firebase"],
        queryFn: async () => {
            try {
                const res = await fetch(`https://backend.doob.com.bd/api/v1/shop/firebase/${shopId}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                    }
                });
                const data = await res.json();
                return data;
            } catch (error) {
                throw error; // Rethrow the error to mark the query as failed
            }
        },
    });
    const [orderStage, setOrderStage] = useState([]);



    const { data: shop_id = {}, isLoading: load, refetch: reload } = useQuery({
        queryKey: ["shop_id"],
        queryFn: async () => {
            try {
                const res = await fetch(`https://backend.doob.com.bd/api/v1/shop/shopId/${shopId}`);
                const data = await res.json();
                return data;
            } catch (error) {
                throw error; // Rethrow the error to mark the query as failed
            }
        },
        enabled: !!shopId
    });


    const [shopUser, setShopUser] = useState('');
    const [auth, setAuth] = useState();

    useEffect(() => {
        if (shopId !== null && reload) {
            reload();
            refetch();
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

            setAuth(getAuth(app));
        }
    }, [shopCredential, isLoading, isError, shopId, shop_id, load, refetch]);

    const [loading, setLoading] = useState(true);
    const [side, setSide] = useState(true);
    const [token, setToken] = useState(false);

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const createUser = (email, password, name) => {
        setLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                saveUser(name, email);
                alert('Registration Successful');
                updateProfile(auth.currentUser, {
                    displayName: name,
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false);
                // Handle specific error codes and show appropriate messages
                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        alert('Email is already in use.');
                        break;
                    case 'auth/invalid-email':
                        alert('Invalid email address.');
                        break;
                    case 'auth/weak-password':
                        alert('Password is too weak. Choose a stronger password.');
                        break;
                    default:
                        alert(`Error: ${errorMessage}`);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const saveUser = (name, email, provider) => {
        const user = { name, email, provider, shopId: shopId };
        fetch("https://backend.doob.com.bd/api/v1/shop/auth", {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                const user = data.user;
                if (user) {
                    const userJSON = JSON.stringify(user);

                    localStorage.setItem(`${shopId}`, userJSON);

                    setToken(user);
                    setShopUser(user)

                }

            });
    };

    const loginWithEmail = (email, password) => {

        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const email = user?.email;
                const name = user?.displayName;
                const provider = 'Email'
                saveUser(name, email, provider);
            })
            .catch((error) => {
                const errorCode = error.code;
                switch (errorCode) {
                    case 'auth/user-not-found':
                        alert('User not found. Check your email address.');
                        break;
                    case 'auth/invalid-email':
                        alert('Invalid email address.');
                        break;
                    case 'auth/wrong-password':
                        alert('Invalid password. Check your password.');
                        break;
                    default:
                        alert(`Error: ${errorCode}`);
                }
            });
    };

    const Google = () => {
        setLoading(true);
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                const user = result.user;
                const name = user?.displayName;
                const email = user?.email;
                const provider = 'Google';
                if (user) {
                    saveUser(name, email, provider);
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
            });
    };

    const Facebook = () => {
        setLoading(true);
        signInWithPopup(auth, facebookProvider)
            .then(async (result) => {
                const user = result.user;
                const name = user?.displayName;
                const email = user?.email;
                if (user) {
                    saveUser(name, email, provider = "Facebook");
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
            });
    };

    const logOut = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                localStorage.removeItem(`${shopId}`);
                setShopUser('')
                setToken(false);
                setLoading(false);
            })
            .catch((error) => {
            });
    };


    const ForgetPass = (email) => {
        const Auth = getAuth();
        sendPasswordResetEmail(Auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }


    const ChangePass = (newPassword) => {
        const auth = getAuth();
        const user = auth.currentUser;

        updatePassword(user, newPassword).then(() => {
            alert('Password Updated')
        }).catch((error) => {
            // An error ocurred
            // ...
        });
    }


    useEffect(() => {
        let unsubscribe;
        setLoading(true)
        const tokenData = localStorage.getItem(`${shopId}`);
        const user = JSON.parse(tokenData);

        if (user?.shopId === shopId) {
            setToken(user);
            setShopUser(user);
            setLoading(false);
        } else {
            setLoading(false);
            setShopUser(null);
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);


    const authInfo = {
        shopUser,
        shopCredential,
        Google,
        shop_id,
        createUser,
        loginWithEmail,
        logOut,
        setLoading,
        loading,
        side,
        setSide,
        token,
        shopId,
        Facebook,
        setShopUser,
        setToken,
        ForgetPass,
        ChangePass,
        selectProductData,
        setSelectProductData,
        orderStage,
        setOrderStage,
        defaultAddress,
        setDefaultAddress,
        reloadUser,
        setReloadUser
    };

    return (
        <ShopAuthProvider.Provider value={authInfo}>{children}</ShopAuthProvider.Provider>
    );
};

export default ShopAuth;

