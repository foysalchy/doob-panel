import { useQuery } from "@tanstack/react-query";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword, signOut, onAuthStateChanged, FacebookAuthProvider } from 'firebase/auth'
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
    const [auth, setAuth] = useState()


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

            setAuth(getAuth(app))

        }
    }, [shopCredential, isLoading, isError, shopId, shop_id, load, refetch]);

    const [loading, setLoading] = useState(true);

    const [side, setSide] = useState(true)
    const [token, setToken] = useState(false)





    const googleProvider = new GoogleAuthProvider();
    const provider = new FacebookAuthProvider();


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
                console.log(errorMessage);
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

    const saveUser = (name, email) => {
        const user = { name, email }
        fetch("https://salenow-v2-backend.vercel.app/api/v1/shop/auth", {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const token = data.token
                localStorage.setItem('token', token)
                setToken(token)
            })

    }


    const updateProfile = (name) => {
        console.log(name);
        (auth.currentUser, {
            displayName: name,
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
            alert("profile Updated")

            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }




    const loginWithEmail = (email, password) => {
        console.log(email, password);
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const email = user?.email
                const name = user?.displayName
                saveUser(email, name)
                console.log(user);
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
    }


    const Google = () => {
        setLoading(true)
        signInWithPopup(auth, googleProvider)

            .then(async (result) => {
                const user = result.user
                const name = user?.displayName
                const email = user?.email
                if (
                    user
                ) {
                    saveUser(name, email)
                }

            })
            .catch((error) => {
                const errorMessage = error.message;

            });
    }

    const Facebook = () => {
        setLoading(true)
        signInWithPopup(auth, FacebookAuthProvider)

            .then(async (result) => {
                const user = result.user
                const name = user?.displayName
                const email = user?.email
                if (
                    user
                ) {
                    saveUser(name, email)
                }

            })
            .catch((error) => {
                const errorMessage = error.message;

            });
    }

    const logOut = () => {
        setLoading(true)
        signOut(auth)
            .then(() => {

                localStorage.removeItem('token')

            })
            .catch((error) => {
                // An error happened.
            });
    }

    console.log(auth !== undefined, 'auth');

    useEffect(() => {
        const tokenData = localStorage.getItem('token');
        setToken(tokenData)
        let unsubscribe;

        if (tokenData && token && auth !== undefined && auth !== "") {
            console.log(auth, "count");
            unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setLoading(false);
                setShopUser(currentUser);
            });
        } else {
            setLoading(false);
            setShopUser(null);
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [token])

    console.log(auth === undefined, 'auth');

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
        updateProfile,
        token
    };

    return (
        <ShopAuthProvider.Provider value={authInfo}>{children}</ShopAuthProvider.Provider>
    );
};

export default ShopAuth;
