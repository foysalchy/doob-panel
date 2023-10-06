import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/UserProvider';
import UseSupperAdmin from '../Hooks/UseSupperAdmin';
import { Link, Navigate, useLocation } from 'react-router-dom';

const SupperAdminRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isSupperAdmin, isSupperAdminLoading] = UseSupperAdmin(user?.email)

    const location = useLocation()

    if (loading || isSupperAdminLoading) {
        return (
            <>
                <h1 className="text-center text-2xl py-52">
                    You are not authorized to access this page. Please login as an admin.
                    <br />
                    <Link to="/login">
                        <button className="btn btn-primary mt-6">Login</button>
                    </Link>
                </h1>
            </>
        )
    }

    if (user && isSupperAdmin) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default SupperAdminRouter;