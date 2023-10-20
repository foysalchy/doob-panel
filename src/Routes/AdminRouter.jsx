import { useContext } from "react"
import { AuthContext } from "../AuthProvider/UserProvider"
import useAdmin from "../Hooks/UseAdmin"
import { Link, useLocation } from "react-router-dom"

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)

    const location = useLocation()

    if (loading || isAdminLoading) {
        return (
            <>

                <h1 className='text-2xl h-full flex justify-center items-center'>Loading For Admin ....</h1>

            </>
        )
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
}

export default AdminRoute