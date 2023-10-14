import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../AuthProvider/UserProvider"

const UseSupperAdmin = () => {
    const [isSupperAdmin, setIsSupperAdmin] = useState(false)
    const [isSupperAdminLoading, setIsSupperAdminLoading] = useState(true)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user?.email) {
            fetch(`https://salenow-kmg7yawl2-salenow-backend.vercel.app/users/supperadmin/${user?.email}`)
                .then((res) => res.json())
                .then(async (data) => {
                    await setIsSupperAdmin(data?.isAdmin)
                    await setIsSupperAdminLoading(false)
                })
        }
    }, [user?.email, setIsSupperAdmin])
    return [isSupperAdmin, isSupperAdminLoading]
}

export default UseSupperAdmin