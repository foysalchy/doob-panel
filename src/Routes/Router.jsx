import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import SignUpSeller from "../Pages/Authentication/SignUpSeller/SignUpSeller";
import SignInSeller from "../Pages/Authentication/SignInSeller/SignInSeller";
import Error from "../Pages/Error/Error";
import ForgetPass from "../Pages/Authentication/ForgetPass/ForgetPass";
import Trams from "../Pages/Trams & Condition/Trams";
import AdminLayout from "../Layout/AdminLayout";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import UserLayout from "../Layout/UserLayout";
import HomeSeller from "../Pages/HomeSeller/HomeSeller.jsx/HomeSeller";
import SellerDashLayout from "../Layout/SellerDashLayout";
import SellerDashboard from "../Pages/Dashboard/SellerDashboard/SellerDashboard";
import ShopHome from "../Pages/Shop/ShopHome/ShopHome";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/sign-up",
                element: <SignUpSeller />,
            },
            {
                path: "/sign-in",
                element: <SignInSeller />,
            },
            {
                path: "/forget-pass",
                element: <ForgetPass />,
            },
            {
                path: "/terms",
                element: <Trams />,
            },
            {
                path: '*',
                element: <Error />
            }
        ],
    },
    {
        path: "/shop",
        element: <MainLayout />,
        children: [
            {
                path: '*',
                element: <Home></Home>
            },
            {
                path: '/shop/:id',
                element: <ShopHome />
            },


        ],
    },
    {
        path: "/admin/dashboard",
        element: <AdminLayout />,
        children: [
            {
                path: '*',
                element: <AdminDashboard />
            },

        ]
    },
    {
        path: "/admin",
        element: <MainLayout />,
        children: [
            {
                path: '*',
                element: <Home />
            },

        ]
    },
    {
        path: "/seller",
        element: <UserLayout />,
        children: [
            {
                path: '*',
                element: <HomeSeller />
            },

        ]
    },
    {
        path: "/seller/dashboard",
        element: <SellerDashLayout />,
        children: [
            {
                path: '*',
                element: <SellerDashboard />
            },

        ]
    }
]);
export default Router