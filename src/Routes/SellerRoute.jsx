import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/UserProvider';
import useSeller from '../Hooks/UseSeller';
import { Link, Navigate, useLocation } from 'react-router-dom';



const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isSeller, isSellerLoading] = useSeller(user?.email)

    const location = useLocation()

    if (loading || isSellerLoading) {
        return (
            <>
                <h1 className="text-center text-2xl py-52">
                    You are not authorized to access this page. Please login as an Seller.
                    <br />
                    <Link to="/login">
                        <button className="btn btn-primary mt-6">Login</button>
                    </Link>
                </h1>
            </>
        )
    }

    if (user && isSeller) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default SellerRoute;