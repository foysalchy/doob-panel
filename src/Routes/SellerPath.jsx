import PrivateRoute from "../Hooks/PrivateRoute";
import DarazIntegration from "../Pages/AdminItem/IntrigrationDaraz/DarazIntrigration";
import SellerDashboard from "../Pages/Dashboard/SellerDashboard/SellerDashboard";
import SellerAddContactPage from "../Pages/SellerItems/ContactPages/SellerAddContactPage";
import SellerManageContact from "../Pages/SellerItems/ContactPages/SellerManageContact";
import AddDomain from "../Pages/SellerItems/DomainManagement/AddDomain";
import FinanceReport from "../Pages/SellerItems/Finance/FinanceReport";
import InventoryManagement from "../Pages/SellerItems/Inventory/InventoryManagement";
import MediaManager from "../Pages/SellerItems/MeadManager/MediaManager";
import OmniChat from "../Pages/SellerItems/OmniChat/OmniChat";
import CustomerReturn from "../Pages/SellerItems/OrderManagment/CustomerReturn/CustomerReturn";
import ManageDarazOrder from "../Pages/SellerItems/OrderManagment/DarazOrder/ManageDarazOrder";
import DarazOrderCheckup from "../Pages/SellerItems/OrderManagment/DarazOrderCkeckup/DarazOrderCheckup";
import ClimAndReturn from "../Pages/SellerItems/OrderManagment/ManageOrder/ClimAndReturn/ClimAndReturn";
import ListOfClaimOrder from "../Pages/SellerItems/OrderManagment/ManageOrder/ClimAndReturn/ListOfClaimOrder";
import ManageOrder from "../Pages/SellerItems/OrderManagment/ManageOrder/ManageOrder";
import ManageWebOrder from "../Pages/SellerItems/OrderManagment/ManageOrder/ManageWebOrder";
import ManageReviews from "../Pages/SellerItems/OrderManagment/ManageReviews/ManageReviews";
import OrderCheckup from "../Pages/SellerItems/OrderManagment/OrderCkeckup/OrderCheckup";
import OrderManagement from "../Pages/SellerItems/OrderManagment/OrderManagement";
import ScheduleDropOffs from "../Pages/SellerItems/OrderManagment/ScheduleDropOffs/ScheduleDropOffs";
import WooCommerceOrderCheckup from "../Pages/SellerItems/OrderManagment/WooCommerceOrderCkeckup/WooCommerceOrderCheckup";
import ManageWooCommerceOrder from "../Pages/SellerItems/OrderManagment/WoocommerceOrder/ManageWooCommerceOrder";
import AddSellerPage from "../Pages/SellerItems/PageManagement/AddSellerPage";
import SellerPageManagement from "../Pages/SellerItems/PageManagement/SellerPageManagement";
import AddDarazProduct from "../Pages/SellerItems/ProductManagement/AddDarazProduct/AddDarazProduct";
import AddWooProduct from "../Pages/SellerItems/ProductManagement/AddWooProduct/AddWooProduct";
import SellerAddProduct from "../Pages/SellerItems/ProductManagement/SellerAddProduct/SellerAddProduct";
import ProductSellerEditPage from "../Pages/SellerItems/ProductManagement/SellerProductManagement/SellerAllProduct/ProductSellerEditPage/ProductSellerEditPage";
import SellerAllProducts from "../Pages/SellerItems/ProductManagement/SellerProductManagement/SellerAllProduct/SellerAllProducts";
import CommissionHistory from "../Pages/SellerItems/ReportManagement/CummissionHistory/CummissionHistory";
import CustomerHistory from "../Pages/SellerItems/ReportManagement/CustomerHistory/CustomerHistory";
import FinanceHistory from "../Pages/SellerItems/ReportManagement/FinanceHistory/FinanceHistory";
import PosHistory from "../Pages/SellerItems/ReportManagement/PosHistory/PosHistory";
import ReportManagement from "../Pages/SellerItems/ReportManagement/ReportManagement";
import SalesHistory from "../Pages/SellerItems/ReportManagement/SalesHistory/SalesHistory";
import SubscriberHisroy from "../Pages/SellerItems/ReportManagement/SubscriberHistory/SubscriberHisroy";
import SystemLog from "../Pages/SellerItems/ReportManagement/SystemLog/SystemLog";
import UserSearchHistory from "../Pages/SellerItems/ReportManagement/UserSearchHistory/UserSearchHistory";
import WarehouseHistory from "../Pages/SellerItems/ReportManagement/WarehouseHistory/WarehouseHistory";
import ExtraCategoriesManagement from "../Pages/SellerItems/SellerCatagory/ExtraCategory/ExtraCategoriesManagement";
import MageCategoriesManagement from "../Pages/SellerItems/SellerCatagory/MegaCategory/MageCategoriesManagement";
import MiniCategoriesManagement from "../Pages/SellerItems/SellerCatagory/MiniCategory/MiniCategoriesManagement";
import AddExtraCategory from "../Pages/SellerItems/SellerCatagory/ModalForCategory/AddExtraCategory";
import AddMagaCategory from "../Pages/SellerItems/SellerCatagory/ModalForCategory/AddMagaCategory";
import AddMiniCategory from "../Pages/SellerItems/SellerCatagory/ModalForCategory/AddMiniCategory";
import AddSubCategory from "../Pages/SellerItems/SellerCatagory/ModalForCategory/AddSubCategory";
import SubCategoriesManagement from "../Pages/SellerItems/SellerCatagory/SubCategory/SubCategoriesManagement";
import SellerStockManagement from "../Pages/SellerItems/SellerStockManagement/SellerStockManagement";
import AddSellerBlog from "../Pages/SellerItems/SellersBlog/AddBlog/AddSellerBlog";
import AddBlogCategory from "../Pages/SellerItems/SellersBlog/AddBlogCategory/AddBlogCategory";
import BlogCategorySeller from "../Pages/SellerItems/SellersBlog/BlogCategorySeller/BlogCategorySeller";
import SellerManageBlog from "../Pages/SellerItems/SellersBlog/ManageBlogs/SellerManageBlog";
import SellerBlogComment from "../Pages/SellerItems/SellersBlog/SellerBlogComment/SellerBlogComment";
import ServiceManagementSaller from "../Pages/SellerItems/ServiceMangaementSaller/ServiceManagementSaller";
import AddBrand from "../Pages/SellerItems/SiteContent/Brand/AddBrand";
import BrandMangement from "../Pages/SellerItems/SiteContent/Brand/BrandMangement";
import AddCampaign from "../Pages/SellerItems/SiteContent/Campain/AddCampain";
import CampaignManagement from "../Pages/SellerItems/SiteContent/Campain/CampaignManagement";
import EditCampaign from "../Pages/SellerItems/SiteContent/Campain/EditCampaign";
import AddCopon from "../Pages/SellerItems/SiteContent/Copon/AddCopon";
import CoponManagement from "../Pages/SellerItems/SiteContent/Copon/CoponManagement";
import AddFeature from "../Pages/SellerItems/SiteContent/Feature/AddFeature";
import FeatureManagement from "../Pages/SellerItems/SiteContent/Feature/FeatureManagement";
import Frame from "../Pages/SellerItems/SiteContent/Frame/Frame";
import AddPopUp from "../Pages/SellerItems/SiteContent/PopUp/AddPopUp";
import PopupManagement from "../Pages/SellerItems/SiteContent/PopUp/PopupManagement";
import AddSlider from "../Pages/SellerItems/SiteContent/Slider/AddSlider";
import SliderManagement from "../Pages/SellerItems/SiteContent/Slider/SliderManagement";
import AddPriceRole from "../Pages/SellerItems/Sittings/AddPriceRole/AddPriceRole";
import PriceRole from "../Pages/SellerItems/Sittings/AddPriceRole/PriceRole";
import SellerEmailSetup from "../Pages/SellerItems/Sittings/EmailSetup/EmailSetup";
import FacebookPixel from "../Pages/SellerItems/Sittings/FacebookPixel/FacebookPixel";
import SellerEmail from "../Pages/SellerItems/Sittings/SellerEmail/SellerEmail";
import SellerLoginCredintiial from "../Pages/SellerItems/Sittings/SellerLoaginCredintial/SellerLoginCredintiial";
import SellerPaymentGetaway from "../Pages/SellerItems/Sittings/SellerPaymentGetway/SellerPaymentGetway";
import SellerShipping from "../Pages/SellerItems/Sittings/Shiping/SellerShiping";
import AddNewStaff from "../Pages/SellerItems/StafManagement/AddNewStaff";
import StafManagement from "../Pages/SellerItems/StafManagement/StafManagement";
import SubscriptionModel from "../Pages/SellerItems/SubcribtionModel/SubscriptionModel";
import SellerSupportTicket from "../Pages/SellerItems/SupportTicket/SupportTicket";
import UserSupportTicketForShop from "../Pages/SellerItems/SupportTicket/UserSupportTicket";
import UpdateShopProfile from "../Pages/SellerItems/UpdateShopProfile/UpdateShopProfile";
import SellerAreaListForWarehouse from "../Pages/SellerItems/Warehouse/List/SellerAreaListForWarehouse";
import SellerManageCell from "../Pages/SellerItems/Warehouse/List/SellerManageCell";
import SellerManageRack from "../Pages/SellerItems/Warehouse/List/SellerManageRack";
import SellerManageSelf from "../Pages/SellerItems/Warehouse/List/SellerManageSelf";
import SellerListOfWarehouse from "../Pages/SellerItems/Warehouse/SellerListOfWarehouse";
import Withdrow from "../Pages/SellerItems/Withdrow/Withdrow";

const SellerPath = [
  {
    path: "dashboard",
    element: <SellerDashboard />,
  },
  {
    path: "manage-blogs",
    element: <SellerManageBlog />,
  },
  {
    path: "manage-blogs/add-blog",
    element: <AddSellerBlog />,
  },
  {
    path: "manage-blogs/add-blog-category",
    element: <AddBlogCategory />,
  },
  {
    path: "manage-blogs/blog-category",
    element: <BlogCategorySeller />,
  },
  {
    path: "manage-contact",
    element: <SellerManageContact />,
  },
  {
    path: "manage-contact/add-contact",
    element: <SellerAddContactPage />,
  },
  {
    path: "manage-pages",
    element: <SellerPageManagement />,
  },
  {
    path: "manage-pages/add-page",
    element: <AddSellerPage />,
  },
  {
    path: "support-tickets",
    element: <SellerSupportTicket />,
  },
  {
    path: "user-tickets",
    element: <UserSupportTicketForShop />,
  },
  {
    path: "shop-profile",
    element: <UpdateShopProfile />,
  },
  {
    path: "domain-management",
    element: (
      <PrivateRoute>
        <AddDomain />
      </PrivateRoute>
    ),
  },

  {
    path: "settings/price-role",
    element: <PriceRole />,
  },
  {
    path: "settings/add-price-role",
    element: <AddPriceRole />,
  },
  {
    path: "settings/auth-credential",
    element: <SellerLoginCredintiial />,
  },
  {
    path: "settings/payment-management",
    element: <SellerPaymentGetaway />,
  },
  {
    path: "settings/send-email",
    element: <SellerEmail />,
  },
  {
    path: "settings/shipping",
    element: <SellerShipping />,
  },
  {
    path: "settings/email-setup",
    element: <SellerEmailSetup />,
  },
  {
    path: "channel-integration",
    element: (
      <PrivateRoute>
        <DarazIntegration />
      </PrivateRoute>
    ),
  },

  {
    path: "categories-management/mega-categories-management",
    element: <MageCategoriesManagement />,
  },
  {
    path: "categories-management/mega-categories-management/add",
    element: <AddMagaCategory />,
  },
  {
    path: "categories-management/sub-categories-management",
    element: <SubCategoriesManagement />,
  },
  {
    path: "categories-management/sub-categories-management/add",
    element: <AddSubCategory />,
  },
  {
    path: "categories-management/mini-categories-management",
    element: <MiniCategoriesManagement />,
  },
  {
    path: "categories-management/mini-categories-management/add",
    element: <AddMiniCategory />,
  },
  {
    path: "categories-management/extra-categories-management",
    element: <ExtraCategoriesManagement />,
  },
  {
    path: "categories-management/extra-categories-management/add",
    element: <AddExtraCategory />,
  },

  {
    path: "content-management/slider-management",
    element: <SliderManagement />,
  },
  {
    path: "content-management/slider-management/add",
    element: <AddSlider />,
  },
  {
    path: "content-management/frame",
    element: <Frame />,
  },
  {
    path: "content-management/feature-management",
    element: <FeatureManagement />,
  },
  {
    path: "content-management/feature-management/add",
    element: <AddFeature />,
  },
  {
    path: "content-management/popup-management",
    element: <PopupManagement />,
  },
  {
    path: "content-management/popup-management/add",
    element: <AddPopUp />,
  },
  {
    path: "content-management/promo-code-management",
    element: <CoponManagement />,
  },
  {
    path: "content-management/promo-code-management/add",
    element: <AddCopon />,
  },
  {
    path: "content-management/brand-management",
    element: <BrandMangement />,
  },
  {
    path: "content-management/brand-management/add",
    element: <AddBrand />,
  },
  {
    path: "content-management/campaign-management",
    element: <CampaignManagement />,
  },
  {
    path: "content-management/campaign-management/add",
    element: <AddCampaign />,
  },
  {
    path: "content-management/campaign-management/edit/:id",
    element: <EditCampaign />,
  },

  {
    path: "product-management/manage",
    element: <SellerAllProducts />,
  },
  {
    path: "product-management/edit/:id",
    element: <ProductSellerEditPage />,
  },
  {
    path: "product-management/add-daraz-product",
    element: <AddDarazProduct />,
  },
  {
    path: "product-management/add-woo-product",
    element: <AddWooProduct />,
  },
  {
    path: "product-management/add-product",
    element: <SellerAddProduct />,
  },

  {
    path: "warehouse/warehouse-management",
    element: (
      <PrivateRoute>
        <SellerListOfWarehouse />
      </PrivateRoute>
    ),
  },
  {
    path: "warehouse/area-management",
    element: <SellerAreaListForWarehouse />,
  },
  {
    path: "warehouse/rack-management",
    element: (
      <PrivateRoute>
        <SellerManageRack />
      </PrivateRoute>
    ),
  },
  {
    path: "warehouse/self-management",
    element: (
      <PrivateRoute>
        <SellerManageSelf />
      </PrivateRoute>
    ),
  },
  {
    path: "warehouse/cell-management",
    element: (
      <PrivateRoute>
        <SellerManageCell />
      </PrivateRoute>
    ),
  },

  {
    path: "orders",
    element: <OrderManagement />,
  },
  {
    path: "service",
    element: <ServiceManagementSaller />,
  },
  {
    path: "stock-management",
    element: <SellerStockManagement />,
  },

  {
    path: "orders/manage-order",
    element: <ManageOrder />,
  },
  {
    path: "service/manage-service",
    element: <ServiceManagementSaller />,
  },
  {
    path: "orders/web-store-order",
    element: <ManageWebOrder />,
  },
  {
    path: "orders/customer-return",
    element: <CustomerReturn />,
  },
  {
    path: "orders/refand-order",
    element: <ScheduleDropOffs />,
  },
  {
    path: "orders/claim-return",
    element: <ClimAndReturn />,
  },
  {
    path: "orders/claim-order-list",
    element: <ListOfClaimOrder />,
  },
  {
    path: "orders/manage-order/order-checkup",
    element: <OrderCheckup />,
  },
  {
    path: "orders/daraz-order/:id",
    element: <DarazOrderCheckup />,
  },
  {
    path: "orders/woo-commerce-order/woocommerce-order-checkup",
    element: <WooCommerceOrderCheckup />,
  },
  {
    path: "orders/manage-review",
    element: <ManageReviews />,
  },
  {
    path: "daraz-invoice/:id",
  },

  {
    path: "refand-order",
    element: "schedule_drop-offs",
  },
  {
    path: "customer-return",
    element: "customer_return",
  },
  {
    path: "orders/daraz-order",
    element: <ManageDarazOrder />,
  },
  {
    path: "orders/woo-commerce-order",
    element: <ManageWooCommerceOrder />,
  },
  {
    path: "staff-account",
    element: (
      <PrivateRoute>
        <StafManagement />
      </PrivateRoute>
    ),
  },
  {
    path: "staff-account/add-new-staff",
    element: <AddNewStaff />,
  },
  {
    path: "report-management",
    element: (
      // <PrivateRoute>
      <ReportManagement />
    ),
    // </PrivateRoute>
  },
  {
    path: "facebook-pixel",
    element: (
      // <PrivateRoute>
      <FacebookPixel />
    ),
    // </PrivateRoute>
  },
  {
    path: "report-management/sales-report",
    element: <SalesHistory />,
  },
  {
    path: "report-management/pos-report",
    element: <PosHistory />,
  },
  {
    path: "report-management/finance-report",
    element: <FinanceHistory />,
  },
  {
    path: "report-management/customer-report",
    element: <CustomerHistory />,
  },
  {
    path: "report-management/warehouse-report",
    element: <WarehouseHistory />,
  },
  {
    path: "report-management/subscriber-report",
    element: <SubscriberHisroy />,
  },
  // {
  //   path: "report-management/seller-sales-report",
  //   element: <SubscriberHisroy />,
  // },
  {
    path: "report-management/packaging-cost-report",
    element: <CommissionHistory />,
  },
  // {
  //     path: "report-management/packaging-cost-report",
  //     element: <CommissionHistory />
  // },
  {
    path: "report-management/user-search-report",
    element: <UserSearchHistory />,
  },
  {
    path: "report-management/system-log",
    element: <SystemLog />,
  },
  {
    path: "subscription-management",
    element: <SubscriptionModel />,
  },
  {
    path: "inventory-management",
    element: <InventoryManagement />,
  },
  {
    path: "blog-comments",
    element: <SellerBlogComment />,
  },
  {
    path: "media-manager",
    element: <MediaManager />,
  },
  {
    path: "withdraw",
    element: <Withdrow />,
  },
  {
    path: "finance",
    element: <FinanceReport />,
  },
  {
    path: "omni-chat",
    element: <OmniChat />,
  },
];

export { SellerPath };
