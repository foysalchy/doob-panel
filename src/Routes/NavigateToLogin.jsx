import { useContext, useEffect } from "react";
import { ShopAuthProvider } from "../AuthProvider/ShopAuthProvide";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json"



// const IsUserRegistration = ({ children }) => {
//     const { shopUser, shopId, loading } = useContext(ShopAuthProvider);
//     const location = useLocation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!shopUser) {
//             navigate(`/shop/${shopId}`);
//         }

//         // Cleanup function
//         return () => {
//             // Perform cleanup if needed
//         };
//     }, [shopUser, navigate, shopId]);

//     // Render children or null
//     return shopUser ? children : null;
// };

const NavigateToLogin = ({ children }) => {
    const { shopUser, shopId, loading } = useContext(ShopAuthProvider);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is not logged in and not loading
        if (!shopUser && !loading) {
            navigate(`/shop/${shopId}/sign-in`);
        }

        // Cleanup function
        return () => {
            // Perform cleanup if needed
        };
    }, [shopUser, loading, navigate, shopId]);

    // Show loading message if loading is true
    if (loading) {
        return <p>Loading...</p>;
    }

    // Render children or null
    return shopUser ? children : null;
};
export default NavigateToLogin;