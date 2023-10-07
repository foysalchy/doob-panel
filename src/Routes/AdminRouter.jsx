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
                <h1 className="text-center text-2xl py-52">
                    You are not authorized to access this page. Please login as an admin.
                    <br />
                    <Link to="/sign-in">
                        <button className="btn btn-primary mt-6">Login</button>
                    </Link>
                </h1>
            </>
        )
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
}

export default AdminRoute
