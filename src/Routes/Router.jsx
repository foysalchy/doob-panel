import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import SignUpSeller from "../Pages/Authentication/SignUpSeller/SignUpSeller";
import SignInSeller from "../Pages/Authentication/SignInSeller/SignInSeller";
import Error from "../Pages/Error/Error";

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
                path: '*',
                element: <Error />
            }
        ],
    },
]);
export default Router