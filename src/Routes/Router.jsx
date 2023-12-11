import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";



import AdminLayout from "../Layout/AdminLayout";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import SellerDashLayout from "../Layout/SellerDashLayout";

import AdminBlogs from "../Pages/AdminItem/Blogs/AdminBlogs";

import AddBlog from "../Pages/AdminItem/Blogs/AddBlog";
import SupperAdminRouter from "./SupperAdminRouter";


import AddProduct from "../Pages/AdminItem/Products/AddProduct";
import ManageProduct from "../Pages/AdminItem/Products/ManageProduct/ManageProduct";

import AdminSingleBlog from "../Pages/AdminItem/Blogs/AdminSingleBlog";
import AddCatagorys from "../Pages/AdminItem/Catagorys/AddCatagorys";

import AddPrice from "../Pages/AdminItem/PriceMangement/AddPrice";
import AddFaq from "../Pages/AdminItem/Faq/AddFaq";

import AdminFaq from "../Pages/AdminItem/Faq/AdminFaq";

import PageManagement from "../Pages/AdminItem/PageManagement/PageManagement";
import AddPage from "../Pages/AdminItem/PageManagement/AddPage";

import CatagoryManagement from "../Pages/AdminItem/Catagorys/CatagoryManagement";
import ManageService from "../Pages/AdminItem/Services/ManageService";
import AddService from "../Pages/AdminItem/Services/AddService";

import ContactManagement from "../Pages/AdminItem/Contract/ContactManagement";
import AddContact from "../Pages/AdminItem/Contract/AddContact";
import Settings from "../Pages/AdminItem/Settings/Settings";
import SellerDomainManagement from "../Pages/AdminItem/Settings/SellerDomainManagement/SellerDomainManagement";
import PaymentGetWay from "../Pages/AdminItem/Settings/PaymentGetWay/PaymentGetWay";
import SendEmail from "../Pages/AdminItem/Settings/SendEmail/SendEmail";

import ShopLayout from "../Layout/Shop/ShopLayout";

import IsSelllerRegistration from "./IsSelllerRegistration";

import ShopAllBlog from "../Pages/Shop/ShopBlog/ShopAllBlog";
import ShopSingleBlog from "../Pages/Shop/ShopBlog/ShopSingleBlog";

import ShopPage from "../Pages/Shop/ShopPage/ShopPage";
import SupportTicketManagement from "../Pages/AdminItem/SupportTicket/AllsuportTicket/SupportTicketManagement";

import ShippingManagement from "../Pages/AdminItem/Settings/ShipingIntigration/ShippingManagement";

import SiteContent from "../Pages/AdminItem/Settings/SiteContent/SiteContent";


import SellerManagement from "../Pages/AdminItem/SellerManagement/SellerManagement";
import WareHouseManagement from "../Pages/AdminItem/WareHouseManagement/WareHouseManagement";
import AreaListForWarehouse from "../Pages/AdminItem/WareHouseManagement/List/AreaListForWarehouse";
import ManageRack from "../Pages/AdminItem/WareHouseManagement/List/ManageRack";
import ManageSelf from "../Pages/AdminItem/WareHouseManagement/List/ManageSelf";
import ManageCell from "../Pages/AdminItem/WareHouseManagement/List/ManageCell";
import DarazIntrigration from "../Pages/AdminItem/IntrigrationDaraz/DarazIntrigration";
import Daraz from "../Pages/AdminItem/Settings/Daraz/Daraz";
import ListOfWarehouse from "../Pages/AdminItem/WareHouseManagement/ListOfWarehouse";
import { SellerPath } from "./SellerPath";
import { homePath } from "./HomeRouter";
import Error from "../Pages/Home/Error/Error";
import Product from "../Pages/Home/Product/Product";
import PriceMangement from "../Pages/AdminItem/PriceMangement/PriceMangement";
import ProductDetails from "../Pages/Home/Product/ProductDetails/ProductDetails";
import Home from "../Pages/Shop/pages/Home/Home";
import ScrollToTop from "../SrollTop";
import ShopSignIn from "../Pages/Shop/pages/Home/Auth/ShopSignIn";
import ShopSignUp from "../Pages/Shop/pages/Home/Auth/ShopSignUp";



const Router = createBrowserRouter([

  // Main Layout 
  {
    path: "/",
    element: <>
      <ScrollToTop />
      <MainLayout />
    </>,
    children: homePath
  },

  // Seller Route 
  {
    path: "/seller",
    element: (
      <>
        <ScrollToTop />
        <IsSelllerRegistration>
          <SellerDashLayout />
        </IsSelllerRegistration>
      </>
    ),
    children: SellerPath
  },

  // Shop Layout 
  {
    path: "/shop",
    element: <>
      <ScrollToTop />
      <ShopLayout />
    </>,
    children: [
      {
        path: ':id/',
        element: <Home />,
        loader: async ({ params }) => {
          const id = params.id;
          return fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/${id}`);
        },
      },
      {
        path: ':id/sign-in',
        element: <ShopSignIn />,
        loader: async ({ params }) => {
          const id = params.id;
          return fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/${id}`);
        },
      },
      {
        path: ':id/sign-up',
        element: <ShopSignUp />,
        loader: async ({ params }) => {
          const id = params.id;
          return fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/${id}`);
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
          return fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/blog/${id}`);
        },
      },
      {
        path: ':id/blog/:blogId',
        element: <ShopSingleBlog />,
        loader: async ({ params }) => {
          const id = params.id;
          const blogId = params.blogId;
          const response = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/blog/${id}/${blogId}`);
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
          const response = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/page/${shopId}/${pageId}`);
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
      (<>
        <ScrollToTop />
        <SupperAdminRouter>
          <AdminLayout />
        </SupperAdminRouter>
      </>),
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
          return fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/all-blogs/${id}`);
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
        path: "settings/daraz-setup",
        element: <Daraz />
      },
      {
        path: "support-ticket",
        element: <SupportTicketManagement />
      },
      {
        path: "settings/site-content",
        element: <SiteContent />
      },
      {
        path: "seller-management",
        element: <SellerManagement />
      },
      {
        path: "warehouse",
        element: <WareHouseManagement />
      },
      {
        path: "warehouse/warehouse-management",
        element: <ListOfWarehouse />
      },
      {
        path: "warehouse/area-management",
        element: <AreaListForWarehouse />
      },
      {
        path: "warehouse/rack-management",
        element: <ManageRack />
      },
      {
        path: "warehouse/self-management",
        element: <ManageSelf />
      },
      {
        path: "warehouse/cell-management",
        element: <ManageCell />
      },
      {
        path: "add-daraz",
        element: <DarazIntrigration />
      }
    ],
  }

]);
export default Router;


