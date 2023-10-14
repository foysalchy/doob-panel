import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../AuthProvider/UserProvider"

const useSeller = () => {
    const [isSeller, setIsSeller] = useState(false)
    const [isSellerLoading, setIsSellerLoading] = useState(true)
    const { user, loading } = useContext(AuthContext)
    useEffect(() => {
        if (user?.email) {
            fetch(`https://salenow-kmg7yawl2-salenow-backend.vercel.app/users/seller/${user?.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setIsSeller(data?.isSeller)
                    setIsSellerLoading(false)
                })
        }
    }, [user?.email, setIsSeller, loading])
    return [isSeller, isSellerLoading]
}

export default useSeller