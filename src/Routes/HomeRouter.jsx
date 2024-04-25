import AdminBlogPage from "../Pages/AdminItem/AdminBlogPage";
import AdminTrackOrder from "../Pages/AdminItem/AdminTrackOrder/AdminTrackOrder";
import Contract from "../Pages/AdminItem/Contract/Contract";
import ForgetPass from "../Pages/Authentication/ForgetPass/ForgetPass";
import ResetPass from "../Pages/Authentication/ForgetPass/ResetPass";
import SignInSeller from "../Pages/Authentication/SignInSeller/SignInSeller";
import SignUpSeller from "../Pages/Authentication/SignUpSeller/SignUpSeller";
import About from "../Pages/Home/About/About";
import SingleBlog from "../Pages/Home/Blogs/SingleBlog";
import Trams from "../Pages/Home/CustomPages/Trams";
import Error from "../Pages/Home/Error/Error";
import Faq from "../Pages/Home/Faq/Faq";
import FaqLayout from "../Pages/Home/Faq/FaqLayout";
import SingleFaq from "../Pages/Home/Faq/SingleFaq";
import Home from "../Pages/Home/Home/Home";
import Price from "../Pages/Home/Price/Price";
import CardProduct from "../Pages/Home/Product/CardProduct/CardProduct";
import CommonCategory from "../Pages/Home/Product/CommonCategory/CommonCategory";
import Product from "../Pages/Home/Product/Product";
import ProductDetails from "../Pages/Home/Product/ProductDetails/ProductDetails";
import MainService from "../Pages/Home/Service/MainService";
import ServicePaymentFailed from "../Pages/Home/Service/ServicePaymentFailed";
import ServicePaymentSuccess from "../Pages/Home/Service/ServicePaymentSuccess";
import SingleService from "../Pages/Home/Service/SingleService";
import Profile from "../Pages/Profile/Profile";
import SellerShopInfo from "../Pages/SellerItems/SellerShopInfo/SellerShopInfo";
import UserPayment from "../Pages/UserItems/UserServiceCheckout/UserPayment";
import UserServiceCheckout from "../Pages/UserItems/UserServiceCheckout/UserServiceCheckout";
import ScrollToTop from "../SrollTop";
import AuthError from "./AuthError";
import SellerRoute from "./SellerRoute";

const homePath = [
  {
    path: "*",
    element: <Error />,
  },
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/sign-up",
    element: (
      <AuthError>
        <SignUpSeller />
      </AuthError>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <AuthError>
        {" "}
        <SignInSeller />
      </AuthError>
    ),
  },
  {
    path: "/forget-pass",
    element: <ForgetPass />,
  },

  {
    path: "/reset-password/:id",
    element: <ResetPass />,
    loader: ({ params }) => `${params.id}`,
  },
  {
    path: "/price",
    element: <Price />,
  },
  {
    path: "/services",
    element: <MainService />,
  },
  {
    path: "/services-payment-successful",
    loader: () =>
      fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/getaway`),
    element: <ServicePaymentSuccess />,
  },
  {
    path: "/services-payment-failed",
    element: <ServicePaymentFailed />,
  },
  {
    path: "/service/:id",
    element: <SingleService />,
    loader: ({ params }) =>
      fetch(
        `https://salenow-v2-backend.vercel.app/api/v1/admin/service/${params.id}`
      ),
  },
  {
    path: "user-service-checkout/:id",
    loader: ({ params }) =>
      fetch(
        `https://salenow-v2-backend.vercel.app/api/v1/admin/service/${params.id}`
      ),
    element: <UserServiceCheckout />,
  },
  {
    path: "user-service-payment",
    loader: () =>
      fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/getaway`),
    element: <UserPayment />,
  },
  {
    path: "/contact",
    element: <Contract />,
  },
  {
    path: "/blogs",
    element: <AdminBlogPage />,
  },
  {
    path: "/blogs/:id",
    element: <SingleBlog />,
    loader: ({ params }) =>
      fetch(
        `https://salenow-v2-backend.vercel.app/api/v1/admin/all-blogs/${params.id}`
      ),
  },
  {
    path: "/faq",
    element: <FaqLayout></FaqLayout>,
    children: [
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/faq/:id",
        element: <SingleFaq />,
        loader: ({ params }) =>
          fetch(
            `https://salenow-v2-backend.vercel.app/api/v1/admin/faq/${params.id}`
          ),
      },
    ],
  },
  {
    path: "/pages/:id",
    element: <Trams />,
    loader: ({ params }) =>
      fetch(
        `https://salenow-v2-backend.vercel.app/api/v1/admin/page/${params.id}`
      ),
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  // {
  //     path: "/my-cart",
  //     element: <CardProduct />,
  // },
  {
    path: "/admin-track-order",
    element: <AdminTrackOrder />,
  },
];

export { homePath };
