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
                <h1 className="text-center text-2xl py-52 leading-relaxed">
                    You are not authorized to access this page. Please login as an admin.
                    <br />
                    <Link to="/sign-in">
                        <button
                            className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none"
                        >
                            Login
                        </button>
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
