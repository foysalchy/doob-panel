import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/UserProvider';
import useSeller from '../Hooks/UseSeller';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';



const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isSeller, isSellerLoading] = useSeller(user?.email)

    const location = useLocation()

    if (loading || isSellerLoading) {
        return (
            <>
                <h1 className="text-center text-2xl py-52 leading-relaxed">
                    You are not authorized to access this page. <br /> Please login as an seller.
                    <br className='mb-10' />
                    <Link to="/sign-in">
                        <button
                            className="inline-flex gap-4 items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none"
                        >
                            <BiLogIn></BiLogIn> Login
                        </button>
                    </Link>
                </h1>
            </>
        )
    }

    if (user && isSeller) {
        return children
    }

    return <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>
};

export default SellerRoute;
