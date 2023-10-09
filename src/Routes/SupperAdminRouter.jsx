import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/UserProvider';
import UseSupperAdmin from '../Hooks/UseSupperAdmin';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';

const SupperAdminRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isSupperAdmin, isSupperAdminLoading] = UseSupperAdmin(user?.email)

    const location = useLocation()

    if (loading || isSupperAdminLoading) {
        return (
            <div className='w-full'>
                <h1 className="text-center text-2xl py-52 leading-relaxed">
                    You are not authorized to access this page. <br /> Please login as an admin.
                    <br className='mb-10' />
                    <Link to="/sign-in">
                        <button
                            className="inline-flex gap-4 items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none"
                        >
                            <BiLogIn></BiLogIn> Login
                        </button>
                    </Link>
                </h1>
            </div>
        )
    }

    if (user && isSupperAdmin) {
        return children
    }

    return <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>
};

export default SupperAdminRouter;