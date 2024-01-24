 import Orders from "../Pages/Dashboard/UserDashboard/Orders/Orders";
import UserDashboard from "../Pages/Dashboard/UserDashboard/UserDashboard";
import Wishlist from "../Pages/Dashboard/UserDashboard/Wishlist/Wishlist";
 

export const UserPath = [
    {
        path: "dashboard",
        element: (
            <UserDashboard />
        ),
    },
    {
        path: "orders",
        element: (
            <Orders />
        ),
    }, {
        path: "wishlist",
        element: (
            <Wishlist />
        ),
    },

]