

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useContext } from "react";
import { ShopAuthProvider } from "../AuthProvider/ShopAuthProvide";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const { shopCredential } = useContext(ShopAuthProvider);


// Ensure shopCredential is available
if (!shopCredential) {
    // Handle the case where shopCredential is not available
    return false;
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app