import { createBrowserRouter } from "react-router-dom";
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
import SellerShopInfo from "../Pages/SellerItem/SellerShopInfo/SellerShopInfo";
import IsSelllerRegistration from "./IsSelllerRegistration";



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
          fetch(`http://localhost:5000/admin/blogs/${params.id}`),
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
              fetch(`http://localhost:5000/admin/faq/${params.id}`),
          },
        ],
      },
      {
        path: "/pages/:id",
        element: <Trams />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/admin/page/${params.id}`),
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
          return fetch(`http://localhost:5000/shop/${id}`);
        },
      },
      {
        path: ':id/:id',  // Use a dynamic route parameter for the product ID
        element: <ProductDetails />
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
    element: <AdminLayout />,
    children: [
      // {
      //     path: '*', // Wildcard route for any unknown paths under '/admin'
      //     element: <AdminRoute><AdminDashboard /> </AdminRoute>
      // },
      {
        path: "dashboard",
        element: (
          <SupperAdminRouter>
            {" "}
            <AdminDashboard />
          </SupperAdminRouter>
        ),
      },
      {
        path: "blog",
        element: (
          <SupperAdminRouter>
            {" "}
            <AdminBlogs />
          </SupperAdminRouter>
        ),
      },
      {
        path: "blog",
        element: (
          <SupperAdminRouter>
            <AdminBlogs />
          </SupperAdminRouter>
        ),
      },
      {
        path: "blogs/new-blog",
        element: (
          <SupperAdminRouter>
            <AddBlog />
          </SupperAdminRouter>
        ),
      },

      {
        path: "manage-product",
        element: (
          <SupperAdminRouter>
            <ManageProduct />
          </SupperAdminRouter>
        ),
      },
      {
        path: "manage-product/add-Product",
        element: (
          <SupperAdminRouter>
            <AddProduct></AddProduct>
          </SupperAdminRouter>
        ),
      },
      {
        path: "manage-category",
        element: (
          <SupperAdminRouter>
            <CatagoryManagement />
          </SupperAdminRouter>
        ),
      },
      {
        path: "manage-category/add-category",
        element: (
          <SupperAdminRouter>
            <AddCatagorys />
          </SupperAdminRouter>
        ),
      },
      {
        path: "blogs/:id",
        element: (
          <SupperAdminRouter>
            <AdminSingleBlog />
          </SupperAdminRouter>
        ),
        loader: async ({ params }) => {
          const id = params.id;
          return fetch(`http://localhost:5000/admin/blogs/${id}`);
        },
      },
      {
        path: "price-management",
        element: (
          <SupperAdminRouter>
            <PriceMangement />
          </SupperAdminRouter>
        ),
      },
      {
        path: "price-management/add-pricing",
        element: (
          <SupperAdminRouter>
            <AddPrice />
          </SupperAdminRouter>
        ),
      },
      {
        path: "faq",
        element: (
          <SupperAdminRouter>
            <AdminFaq />
          </SupperAdminRouter>
        ),
      },
      {
        path: "faq/add-faq",
        element: (
          <SupperAdminRouter>
            <AddFaq />
          </SupperAdminRouter>
        ),
      },
      {
        path: "page-management",
        element: (
          <SupperAdminRouter>
            <PageManagement />
          </SupperAdminRouter>
        ),
      },
      {
        path: "page-management/add-page",
        element: (
          <SupperAdminRouter>
            <AddPage />
          </SupperAdminRouter>
        ),
      },
      {
        path: "services",
        element: (
          <SupperAdminRouter>
            <ManageService />
          </SupperAdminRouter>
        ),
      },
      {
        path: "services/add-service",
        element: (
          <SupperAdminRouter>
            <AddService />
          </SupperAdminRouter>
        ),
      },
      {
        path: "contact",
        element: (
          <SupperAdminRouter>
            <ContactManagement />
          </SupperAdminRouter>
        ),
      },
      {
        path: "contact/add-contact",
        element: (
          <SupperAdminRouter>
            <AddContact />
          </SupperAdminRouter>
        ),
      },
      {
        path: "settings",
        element: (
          <SupperAdminRouter>
            <Settings />
          </SupperAdminRouter>
        ),
      },
      {
        path: "settings/seller-domain",
        element: (
          <SupperAdminRouter>
            <SellerDomainManagement />
          </SupperAdminRouter>
        ),
      },
      {
        path: "settings/payment-management",
        element: (
          <SupperAdminRouter>
            <PaymentGetWay />
          </SupperAdminRouter>
        ),
      },
      {
        path: "settings/send-email",
        element: (
          <SupperAdminRouter>
            <SendEmail />
          </SupperAdminRouter>
        ),
      },
    ],
  },

  {
    path: "/seller",
    element: (
      <IsSelllerRegistration>
        <SellerDashLayout />
      </IsSelllerRegistration>
    ),
    children: [
      {
        path: "*",
        element: (

          <SellerDashboard />


        ),
      },
      {
        path: "dashboard",
        element: (

          <SellerDashboard />

        ),
      },

    ],
  },
]);
export default Router;
