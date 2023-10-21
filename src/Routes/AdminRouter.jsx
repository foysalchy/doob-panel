import { useContext } from "react"
import { AuthContext } from "../AuthProvider/UserProvider"
import useAdmin from "../Hooks/UseAdmin"
import { Link, useLocation } from "react-router-dom"
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)

    const location = useLocation()

    if (isAdminLoading) {
        return (
            <>

                <h1 className='text-2xl h-full flex justify-center items-center'> <Lottie animationData={groovyWalkAnimation} loop={true} /></h1>

            </>
        )
    }

    if (isAdmin && user) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
}

export default AdminRoute