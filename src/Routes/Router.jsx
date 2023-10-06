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
import AdminBlogs from "../Pages/AdminItem/Blogs/AdminBlogs";
import AdminRoute from "./AdminRouter";
import AddBlog from "../Pages/AdminItem/Blogs/AddBlog";
import SupperAdminRouter from "./SupperAdminRouter";
import Product from "../Pages/Product/Product";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '*',
                element: <Error />
            },
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
                path: "/products",
                element: <Product />,
            },

        ],
    },
    // {
    //     path: "/shop",
    //     element: <MainLayout />,
    //     children: [
    //         {
    //             path: '*',
    //             element: <Home></Home>
    //         },
    //         {
    //             path: '/shop/:id',
    //             element: <ShopHome />
    //         },


    //     ],
    // },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            // {
            //     path: '*', // Wildcard route for any unknown paths under '/admin'
            //     element: <AdminRoute><AdminDashboard /> </AdminRoute>
            // },
            {
                path: 'dashboard',
                element: <SupperAdminRouter> <AdminDashboard /></SupperAdminRouter>
            },
            {
                path: 'blog',
                element: <SupperAdminRouter> <AdminBlogs /></SupperAdminRouter>
            },
            {
                path: 'new-blog',
                element: <SupperAdminRouter> <AddBlog /></SupperAdminRouter>
            },
            // Add more child routes as needed
        ]
    },
    // {
    //     path: "/seller",
    //     element: <UserLayout />,
    //     children: [
    //         {
    //             path: '*',
    //             element: <HomeSeller />
    //         },

    //     ]
    // },
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