import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import SignUpSeller from "../Pages/Authentication/SignUpSeller/SignUpSeller";
import SignInSeller from "../Pages/Authentication/SignInSeller/SignInSeller";
import Error from "../Pages/Error/Error";
import ForgetPass from "../Pages/Authentication/ForgetPass/ForgetPass";
import AdminLayout from "../Layout/AdminLayout";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import SellerDashLayout from "../Layout/SellerDashLayout";
import SellerDashboard from "../Pages/Dashboard/SellerDashboard/SellerDashboard";
import ShopHome from "../Pages/Shop/ShopHome/ShopHome";
import AdminBlogs from "../Pages/AdminItem/Blogs/AdminBlogs";
import AdminRoute from "./AdminRouter";
import AddBlog from "../Pages/AdminItem/Blogs/AddBlog";
import SupperAdminRouter from "./SupperAdminRouter";
import Product from "../Pages/Product/Product";
import AdminBlogPage from "../Pages/AdminItem/AdminBlogPage";
import AddProduct from "../Pages/AdminItem/Products/AddProduct";
import ManageProduct from "../Pages/AdminItem/Products/ManageProduct/ManageProduct";
import SingleBlog from "../Pages/Blogs/SingleBlog";
import AdminSingleBlog from "../Pages/AdminItem/Blogs/AdminSingleBlog";
import ProductDetails from "../Pages/Product/ProductDetails/ProductDetails";
import AddCatagorys from "../Pages/AdminItem/Catagorys/AddCatagorys";
import PriceMangement from "../Pages/AdminItem/PriceMangement/PriceMangement";
import Price from "../Pages/Price/Price";
import AddPrice from "../Pages/AdminItem/PriceMangement/AddPrice";
import AddFaq from "../Pages/AdminItem/Faq/AddFaq";
import Faq from "../Pages/Faq/Faq";
import SingleFaq from "../Pages/Faq/SingleFaq";
import FaqLayout from "../Pages/Faq/FaqLayout";
import AdminFaq from "../Pages/AdminItem/Faq/AdminFaq";
import ResetPass from "../Pages/Authentication/ForgetPass/ResetPass";
import SellerRoute from "./SellerRoute";
import PageManagement from "../Pages/AdminItem/PageManagement/PageManagement";
import AddPage from "../Pages/AdminItem/PageManagement/AddPage";
import Trams from "../Pages/CustomPages/Trams";
import CatagoryManagement from "../Pages/AdminItem/Catagorys/CatagoryManagement";
import ManageService from "../Pages/AdminItem/Services/ManageService";
import AddService from "../Pages/AdminItem/Services/AddService";
import MainService from "../Pages/Service/MainService";
import Contract from "../Pages/AdminItem/Contract/Contract";
import ContactManagement from "../Pages/AdminItem/Contract/ContactManagement";
import AddContact from "../Pages/AdminItem/Contract/AddContact";
import Settings from "../Pages/AdminItem/Settings/Settings";
import SellerDomainManagement from "../Pages/AdminItem/Settings/SellerDomainManagement/SellerDomainManagement";
import PaymentGetWay from "../Pages/AdminItem/Settings/PaymentGetWay/PaymentGetWay";
import SendEmail from "../Pages/AdminItem/Settings/SendEmail/SendEmail";
import Profile from "../Pages/Profile/Profile";
import ShopLayout from "../Layout/Shop/ShopLayout";

import IsSelllerRegistration from "./IsSelllerRegistration";
import AddSellerBlog from "../Pages/SellerItems/SellersBlog/AddBlog/AddSellerBlog";
import SellerManageBlog from "../Pages/SellerItems/SellersBlog/ManageBlogs/SellerManageBlog";
import SellerShopInfo from "../Pages/SellerItems/SellerShopInfo/SellerShopInfo";
import ShopBlog from "../Pages/Shop/ShopBlog/ShopSingleBlog";
import ShopAllBlog from "../Pages/Shop/ShopBlog/ShopAllBlog";
import ShopSingleBlog from "../Pages/Shop/ShopBlog/ShopSingleBlog";
import SellerAddContactPage from "../Pages/SellerItems/ContactPages/SellerAddContactPage";
import SellerManageContact from "../Pages/SellerItems/ContactPages/SellerManageContact";
import AddSellerPage from "../Pages/SellerItems/PageManagement/AddSellerPage";
import SellerPageManagement from "../Pages/SellerItems/PageManagement/SellerPageManagement";
import ShopPage from "../Pages/Shop/ShopPage/ShopPage";
import SupportTicketManagement from "../Pages/AdminItem/SupportTicket/AllsuportTicket/SupportTicketManagement";
import AuthError from "./AuthError";
import SellerSupportTicket from "../Pages/SellerItems/SupportTicket/SupportTicket";
import AddSupportTicket from "../Pages/SellerItems/SupportTicket/AddSupportTicket";
import UpdateShopProfile from "../Pages/SellerItems/UpdateShopProfile/UpdateShopProfile";
import AddDomain from "../Pages/SellerItems/DomainManagement/AddDomain";
import ShippingManagement from "../Pages/AdminItem/Settings/ShipingIntigration/ShippingManagement";
import SingleService from "../Pages/Service/SingleService";
import SiteContent from "../Pages/AdminItem/Settings/SiteContent/SiteContent";
import SellerSittingsPage from "../Pages/SellerItems/Sittings/SellerSittingsPage";



const Router = createBrowserRouter([

  // Main Layout 
  {
    path: "/",
    element: <MainLayout />,
    children: [
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
        element: <AuthError><SignUpSeller /></AuthError>,
      },
      {
        path: "/sign-in",
        element: <AuthError> <SignInSeller /></AuthError>,
      },
      {
        path: "/forget-pass",
        element: <ForgetPass />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
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
        path: "/service/:id",
        element: <SingleService />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/admin/service/${params.id}`)
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
          fetch(`http://localhost:5000/admin/all-blogs/${params.id}`),
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
              fetch(`https://salenow-v2-backend.vercel.app/admin/faq/${params.id}`),
          },
        ],
      },
      {
        path: "/pages/:id",
        element: <Trams />,
        loader: ({ params }) =>
          fetch(`https://salenow-v2-backend.vercel.app/admin/page/${params.id}`),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/seller/shop-register",
        element: (
          <SellerRoute>
            <SellerShopInfo />
          </SellerRoute>
        ),
      },
    ],
  },

  // Seller Route 
  {
    path: "/seller",
    element: (
      <IsSelllerRegistration>
        <SellerDashLayout />
      </IsSelllerRegistration>
    ),
    children: [
      {
        path: "dashboard",
        element: <SellerDashboard />
      },
      {
        path: "manage-blogs",
        element: <SellerManageBlog />
      },
      {
        path: "manage-blogs/add-blog",
        element: <AddSellerBlog />
      },
      {
        path: "manage-contact",
        element: <SellerManageContact />
      },
      {
        path: "manage-contact/add-contact",
        element: <SellerAddContactPage />
      },
      {
        path: "manage-pages",
        element: <SellerPageManagement />
      },
      {
        path: "manage-pages/add-page",
        element: <AddSellerPage />
      },
      {
        path: "support-tickets",
        element: <SellerSupportTicket />
      },
      {
        path: "shop-profile",
        element: <UpdateShopProfile />
      },
      {
        path: "domain-management",
        element: <AddDomain />
      },
      {
        path: "settings",
        element: <SellerSittingsPage />
      },

    ],
  },

  // Shop Layout 
  {
    path: "/shop",
    element: <ShopLayout />,
    children: [
      {
        path: ':id',  // Use a dynamic route parameter for the product ID
        element: <Product />,
        loader: async ({ params }) => {
          const id = params.id;
          return fetch(`https://salenow-v2-backend.vercel.app/shop/${id}`);
        },
      },
      {
        path: ':id/:id',  // Use a dynamic route parameter for the product ID
        element: <ProductDetails />
      },
      {
        path: ':id/blog',  // Use a dynamic route parameter for the product ID
        element: <ShopAllBlog />,
        loader: async ({ params }) => {
          const id = params.id;
          return fetch(`https://salenow-v2-backend.vercel.app/seller/blog/${id}`);
        },
      },
      {
        path: ':id/blog/:blogId',
        element: <ShopSingleBlog />,
        loader: async ({ params }) => {
          const id = params.id;
          const blogId = params.blogId;
          const response = await fetch(`https://salenow-v2-backend.vercel.app/seller/blog/${id}/${blogId}`);
          const data = await response.json();
          return data;
        },
      },
      {
        path: ':id/pages/:pageId',
        element: <ShopPage />,
        loader: async ({ params }) => {
          const pageId = params.pageId
          const shopId = params.id
          const response = await fetch(`https://salenow-v2-backend.vercel.app/seller/page/${shopId}/${pageId}`);
          const data = await response.json();
          return data;
        },
      },
      {
        path: '*',
        element: <Error />
      },
    ],
  },
  // Admin Layout 

  {
    path: "/admin",
    element:
      (<SupperAdminRouter>
        <AdminLayout />
      </SupperAdminRouter>),
    children: [
      // {
      //     path: '*', // Wildcard route for any unknown paths under '/admin'
      //     element: <AdminRoute><AdminDashboard /> </AdminRoute>
      // },
      {
        path: "dashboard",
        element: (
          < AdminDashboard />
        ),
      },
      {
        path: "blog",
        element: (
          <AdminBlogs />
        ),
      },
      {
        path: "blog",
        element: (
          <AdminBlogs />
        ),
      },
      {
        path: "blog/new-blog",
        element: <AddBlog />
      },

      {
        path: "manage-product",
        element: <ManageProduct />
      },
      {
        path: "manage-product/add-Product",
        element: <AddProduct></AddProduct>
      },
      {
        path: "manage-category",
        element: <CatagoryManagement />
      },
      {
        path: "manage-category/add-category",
        element: <AddCatagorys />
      },
      {
        path: "blogs/:id",
        element: <AdminSingleBlog />,
        loader: async ({ params }) => {
          const id = params.id;
          return fetch(`http://localhost:5000/admin/all-blogs/${id}`);
        },
      },
      {
        path: "price-management",
        element: <PriceMangement />
      },
      {
        path: "price-management/add-pricing",
        element: <AddPrice />
      },
      {
        path: "faq",
        element: <AdminFaq />
      },
      {
        path: "faq/add-faq",
        element: <AddFaq />
      },
      {
        path: "page-management",
        element: <PageManagement />
      },
      {
        path: "page-management/add-page",
        element: <AddPage />
      },
      {
        path: "services",
        element: <ManageService />
      },
      {
        path: "services/add-service",
        element: <AddService />
      },
      {
        path: "contact",
        element: <ContactManagement />
      },
      {
        path: "contact/add-contact",
        element: <AddContact />
      },
      {
        path: "settings",
        element: <Settings />
      },
      {
        path: "settings/seller-domain",
        element: <SellerDomainManagement />
      },
      {
        path: "settings/payment-management",
        element: <PaymentGetWay />
      },
      {
        path: "settings/send-email",
        element: <SendEmail />
      },
      {
        path: "settings/shipping",
        element: <ShippingManagement />
      },
      {
        path: "support-ticket",
        element: <SupportTicketManagement />
      },
      {
        path: "settings/site-content",
        element: <SiteContent />
      },
    ],
  }

]);
export default Router;
