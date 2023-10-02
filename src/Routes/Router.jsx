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
        path: "/dashboard",
        element: <AdminLayout />,
        children: [
            {
                path: '/dashboard',
                element: <AdminDashboard />
            }
        ]
    }
]);
export default Router