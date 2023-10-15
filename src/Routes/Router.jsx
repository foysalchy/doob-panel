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
import SellerShopInfoHome from "../Pages/SellerShopInfo/SellerShopInfoHome";

const Router = createBrowserRouter([
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
        path: "manageproduct",
        element: (
          <SupperAdminRouter>
            <ManageProduct />
          </SupperAdminRouter>
        ),
      },
      {
        path: "manageproduct/addProduct",
        element: (
          <SupperAdminRouter>
            <AddProduct></AddProduct>
          </SupperAdminRouter>
        ),
      },
      {
        path: "managecategory",
        element: (
          <SupperAdminRouter>
            <CatagoryManagement />
          </SupperAdminRouter>
        ),
      },
      {
        path: "managecategory/addcategory",
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
        path: "pricemanagement",
        element: (
          <SupperAdminRouter>
            <PriceMangement />
          </SupperAdminRouter>
        ),
      },
      {
        path: "pricemanagement/addpricing",
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
        path: "faq/addfaq",
        element: (
          <SupperAdminRouter>
            <AddFaq />
          </SupperAdminRouter>
        ),
      },
      {
        path: "pagemanagement",
        element: (
          <SupperAdminRouter>
            <PageManagement />
          </SupperAdminRouter>
        ),
      },
      {
        path: "pagemanagement/addpage",
        element: (
          <SupperAdminRouter>
            <AddPage />
          </SupperAdminRouter>
        ),
      },
    ],
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
    path: "/seller",
    element: <SellerDashLayout />,
    children: [
      {
        path: "*",
        element: (
          <SellerRoute>
            <SellerDashboard />
          </SellerRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <SellerRoute>
            <SellerDashboard />
          </SellerRoute>
        ),
      },
      {
        path: "shop-info-home",
        element: (
          // <SellerRoute>
          <SellerShopInfoHome />
          // </SellerRoute>
        ),
      },
    ],
  },
]);
export default Router;
