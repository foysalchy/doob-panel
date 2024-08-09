import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AdminLayout from "../Layout/AdminLayout";
import SellerDashLayout from "../Layout/SellerDashLayout";
import SupperAdminRouter from "./SupperAdminRouter";
import ShopLayout from "../Layout/Shop/ShopLayout";

import IsSelllerRegistration from "./IsSelllerRegistration";
import { SellerPath } from "./SellerPath";
import { homePath } from "./HomeRouter";
import ScrollToTop from "../SrollTop";

import { ShopPath } from "./ShopPath";
import { SupperAdminPath } from "./SupperAdminPath";
import OrderReviewLayout from "../Layout/OrderReviewLayout";
import ManageReviews from "../Pages/SellerItems/OrderManagment/ManageReviews/ManageReviews";
import Invoice from "../Pages/Invoice/Invoice";
import DarazInvoice from "../Pages/Invoice/DarazInvoice";
import UserInvoice from "../Pages/Invoice/UserInvoice";
import CheckStaff from "../Hooks/CheckStaff";
import IsUserRegistration from "./isUserRegistration";
import UserLayout from "../Layout/UserLayout";
import { UserPath } from "./UserPath";
import SellerShopInfo from "../Pages/SellerItems/SellerShopInfo/SellerShopInfo";
import SellerRoute from "./SellerRoute";
import PrivateRoute from "../Hooks/PrivateRoute";
import Pos from "../Pages/SellerItems/Pos/Pos";
import PoroductLayout from "../Layout/PoroductLayout";
import Product from "../Pages/Home/Product/Product";
import CommonCategory from "../Pages/Home/Product/CommonCategory/CommonCategory";
import ProductDetails from "../Pages/Home/Product/ProductDetails/ProductDetails";
import EmailVerify from "../Common/EmailVerify";
import CardProduct from "../Pages/Home/Product/CardProduct/CardProduct";
import AdminTrackOrder from "../Pages/AdminItem/AdminTrackOrder/AdminTrackOrder";
import ConfirmOrder from "../Pages/Shop/pages/ConfirmOrder/ConfirmOrder";
import SellerConfirmOrder from "../Pages/Shop/pages/ConfirmOrder/SellerConfirmOrder";
import SeeAllProduct from "../Pages/Home/Product/SeeAllProduct/SeeAllProduct";
import SeeShopAllProduct from "../Pages/Shop/pages/Home/SeeShopAllProduct/SeeShopAllProduct";
import PublicPosInvoice from "../Pages/SellerItems/PublicPosInvoice/PublicPosInvoice";
import AdminDarazInvoice from "../Pages/Invoice/AdminDarazInvoice";

const Router = createBrowserRouter([
  // Main Layout
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <MainLayout />
      </>
    ),
    children: homePath,
  },
  {
    path: "/email-verify",
    element: <EmailVerify />,
  },
  // Invoice Routes
  {
    path: "/userinvoice/:id",
    element: (
      <>
        {" "}
        <ScrollToTop /> <UserInvoice />
      </>
    ),
  },
  {
    path: "/darazinvoice/:id",
    element: (
      <>
        <ScrollToTop />
        <DarazInvoice />
      </>
    ),
  },

  
  {
    path: "/invoice/:id",
    element: (
      <>
        <ScrollToTop />
        <Invoice />
      </>
    ),
  },
  {
    path: "/pos-invoice/:id",
    element: (
      <>
        {/* <ScrollToTop /> */}
        <PublicPosInvoice />
      </>
    ),
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
    children: SellerPath,
  },

  {
    path: "/seller/pos",
    element: (
      <PrivateRoute>
        <Pos />
      </PrivateRoute>
    ),
  },
  {
    path: "/user",
    element: (
      <>
        <ScrollToTop />
        <IsUserRegistration>
          <UserLayout />
        </IsUserRegistration>
      </>
    ),
    children: UserPath,
  },

  // Shop Route
  {
    path: "/shop",
    element: (
      <>
        <ScrollToTop />
        <ShopLayout />
      </>
    ),
    children: ShopPath,
  },
  // order and review Route  ,

  // Admin Route

  {
    path: "/admin",
    element: (
      <>
        <ScrollToTop />
        <SupperAdminRouter>
          <AdminLayout />
        </SupperAdminRouter>
      </>
    ),
    children: SupperAdminPath,
  },

  {
    path: "/shop-register",
    element: (
      <SellerRoute>
        <SellerShopInfo />
      </SellerRoute>
    ),
  },

  {
    path: "/products",
    element: <PoroductLayout />,
    children: [
      {
        path: "",
        element: (
          <>
            {/* <ScrollToTop /> */}
            <Product />
          </>
        ),
      },
      {
        path: "category/:categoryId",
        element: <CommonCategory />,
        loader: async ({ params }) => {
          const categoryName = params.categoryId;
          const response = await fetch(
            `https://doob.dev/api/v1/seller/admin-category-item?id=${categoryName}`
          );
          const data = await response.json();
          return data?.data;
        },
      },
      {
        path: ":id",
        loader: ({ params }) =>
          fetch(
            `https://doob.dev/api/v1/admin/single-product?id=${params?.id}`
          ),
        element: (
          <>
            {/* <ScrollToTop /> */}
            <ProductDetails />
          </>
        ),
      },
      {
        path: "my-card",
        element: <CardProduct />,
      },

      {
        path: "admin-track-order",
        element: <AdminTrackOrder />,
      },

      {
        path: "confirm-order",
        element: <SellerConfirmOrder />,
      },
      {
        path: "new-product",
        loader: async () => {
          try {
            const response = await fetch(
              `https://doob.dev/api/v1/admin/new-products`
            );
            const data = await response.json();
            return data;
          } catch (error) {
            console.error("Error fetching new products:", error);
            return null; // Return null in case of an error
          }
        },
        element: <SeeAllProduct />,
      },
      {
        path: "upcoming-product",
        loader: async () => {
          try {
            const response = await fetch(
              `https://doob.dev/api/v1/admin/upcoming-products`
            );
            const data = await response.json();
            return data;
          } catch (error) {
            console.error("Error fetching new products:", error);
            return null; // Return null in case of an error
          }
        },
        element: <SeeAllProduct />,
      },
    ],
  }
]);
export default Router;
