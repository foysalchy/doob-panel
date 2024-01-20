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
  // Invoice Routes
  {
    path: "/userinvoice/:id",
    element: <>    <ScrollToTop /> <UserInvoice />
    </>
  },
  {
    path: "/darazinvoice/:id",
    element: <>
      <ScrollToTop /><DarazInvoice />
    </>
  },
  {
    path: "/invoice/:id",
    element: <>
      <ScrollToTop /><Invoice />
    </>
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


  // Shop Route 
  {
    path: "/shop",
    element: <>
      <ScrollToTop />
      <ShopLayout />
    </>,
    children: ShopPath
  },
  // order and review Route  ,

  // Admin Route

  {
    path: "/admin",
    element:
      (<>
        <ScrollToTop />
        <SupperAdminRouter>
          <AdminLayout />
        </SupperAdminRouter>
      </>),
    children:SupperAdminPath},

]);
export default Router;


