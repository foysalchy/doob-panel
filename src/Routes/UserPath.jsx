import UserDashboard from "../Pages/Dashboard/UserDashboard/UserDashboard";
import UserOrders from "../Pages/UserItems/UserOrders/UserOrders";
import UserWishlist from "../Pages/UserItems/UserWishlist/UserWishlist";


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
            <UserOrders />
        ),
    }
    , {
        path: "wishlist",
        element: (
            <UserWishlist />
        ),
    }
    

]