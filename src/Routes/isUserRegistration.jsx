import { useContext, useEffect } from "react";
import { ShopAuthProvider } from "../AuthProvider/ShopAuthProvide";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json"



const IsUserRegistration = ({ children }) => {
    const { shopUser, shopId } = useContext(ShopAuthProvider);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!shopUser) {
            navigate(`/shop/${shopId}`);
        }

        // Cleanup function
        return () => {
            // Perform cleanup if needed
        };
    }, [shopUser, navigate, shopId]);

    // Render children or null
    return shopUser ? children : null;
};

export default IsUserRegistration;