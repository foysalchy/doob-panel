import { useContext, useEffect } from "react";
import { ShopAuthProvider } from "../AuthProvider/ShopAuthProvide";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json"
import { AuthContext } from "../AuthProvider/UserProvider";



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

const IsUserRegistration = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    console.log(user?.role !== "user");
    useEffect(() => {
        // Check if the user is not logged in and not loading
        if (user == '' && user?.role !== "user" && !loading) {
            console.log("this navigate");
            navigate(`/`);
        }

        // Cleanup function
        return () => {
            // Perform cleanup if needed
        };
    }, [user, loading]);

    // Show loading message if loading is true
    if (loading) {
        return <h1 className="text-black">Loading...</h1>;
    }

    // Render children or null
    return user ? children : null;
};
export default IsUserRegistration;