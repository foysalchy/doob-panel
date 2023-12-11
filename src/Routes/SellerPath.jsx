import DarazIntegration from "../Pages/AdminItem/IntrigrationDaraz/DarazIntrigration";
import SellerDashboard from "../Pages/Dashboard/SellerDashboard/SellerDashboard";
import SellerAddContactPage from "../Pages/SellerItems/ContactPages/SellerAddContactPage";
import SellerManageContact from "../Pages/SellerItems/ContactPages/SellerManageContact";
import AddDomain from "../Pages/SellerItems/DomainManagement/AddDomain";
import AddSellerPage from "../Pages/SellerItems/PageManagement/AddSellerPage";
import SellerPageManagement from "../Pages/SellerItems/PageManagement/SellerPageManagement";
import AddDarazProduct from "../Pages/SellerItems/ProductManagement/AddDarazProduct/AddDarazProduct";
import AddWooProduct from "../Pages/SellerItems/ProductManagement/AddWooProduct/AddWooProduct";
import SellerAddProduct from "../Pages/SellerItems/ProductManagement/SellerAddProduct/SellerAddProduct";
import SellerAllProducts from "../Pages/SellerItems/ProductManagement/SellerProductManagement/SellerAllProduct/SellerAllProducts";
import SellerProductManagement from "../Pages/SellerItems/ProductManagement/SellerProductManagement/SellerProductManagement";
import CategoriesManagement from "../Pages/SellerItems/SellerCatagory/CategoriesManagement/CategoriesManagement";
import ExtraCategoriesManagement from "../Pages/SellerItems/SellerCatagory/ExtraCategory/ExtraCategoriesManagement";
import MageCategoriesManagement from "../Pages/SellerItems/SellerCatagory/MegaCategory/MageCategoriesManagement";
import MiniCategoriesManagement from "../Pages/SellerItems/SellerCatagory/MiniCategory/MiniCategoriesManagement";
import AddExtraCategory from "../Pages/SellerItems/SellerCatagory/ModalForCategory/AddExtraCategory";
import AddMagaCategory from "../Pages/SellerItems/SellerCatagory/ModalForCategory/AddMagaCategory";
import AddMiniCategory from "../Pages/SellerItems/SellerCatagory/ModalForCategory/AddMiniCategory";
import AddSubCategory from "../Pages/SellerItems/SellerCatagory/ModalForCategory/AddSubCategory";
import SubCategoriesManagement from "../Pages/SellerItems/SellerCatagory/SubCategory/SubCategoriesManagement";
import AddSellerBlog from "../Pages/SellerItems/SellersBlog/AddBlog/AddSellerBlog";
import SellerManageBlog from "../Pages/SellerItems/SellersBlog/ManageBlogs/SellerManageBlog";
import AddBrand from "../Pages/SellerItems/SiteContent/Brand/AddBrand";
import BrandMangement from "../Pages/SellerItems/SiteContent/Brand/BrandMangement";
import AddCampaign from "../Pages/SellerItems/SiteContent/Campain/AddCampain";
import CampaignManagement from "../Pages/SellerItems/SiteContent/Campain/CampaignManagement";
import AddCopon from "../Pages/SellerItems/SiteContent/Copon/AddCopon";
import CoponManagement from "../Pages/SellerItems/SiteContent/Copon/CoponManagement";
import AddFeature from "../Pages/SellerItems/SiteContent/Feature/AddFeature";
import FeatureManagement from "../Pages/SellerItems/SiteContent/Feature/FeatureManagement";
import AddPopUp from "../Pages/SellerItems/SiteContent/PopUp/AddPopUp";
import PopupManagement from "../Pages/SellerItems/SiteContent/PopUp/PopupManagement";
import SiteContentSeller from "../Pages/SellerItems/SiteContent/SiteContentSeller";
import AddSlider from "../Pages/SellerItems/SiteContent/Slider/AddSlider";
import SliderManagement from "../Pages/SellerItems/SiteContent/Slider/SliderManagement";
import SellerEmail from "../Pages/SellerItems/Sittings/SellerEmail/SellerEmail";
import SellerLoginCredintiial from "../Pages/SellerItems/Sittings/SellerLoaginCredintial/SellerLoginCredintiial";
import SellerPaymentGetaway from "../Pages/SellerItems/Sittings/SellerPaymentGetway/SellerPaymentGetway";
import SellerSittingsPage from "../Pages/SellerItems/Sittings/SellerSittingsPage";
import SellerShipping from "../Pages/SellerItems/Sittings/Shiping/SellerShiping";
import SellerSupportTicket from "../Pages/SellerItems/SupportTicket/SupportTicket";
import UpdateShopProfile from "../Pages/SellerItems/UpdateShopProfile/UpdateShopProfile";
import SellerAreaListForWarehouse from "../Pages/SellerItems/Warehouse/List/SellerAreaListForWarehouse";
import SellerManageCell from "../Pages/SellerItems/Warehouse/List/SellerManageCell";
import SellerManageRack from "../Pages/SellerItems/Warehouse/List/SellerManageRack";
import SellerManageSelf from "../Pages/SellerItems/Warehouse/List/SellerManageSelf";
import SellerListOfWarehouse from "../Pages/SellerItems/Warehouse/SellerListOfWarehouse";
import SellerWareHouseManagement from "../Pages/SellerItems/Warehouse/SellerWareHouseManagement";

// `https://salenow-v2-backend.vercel.app/api/v1/seller/daraz-product/${shopInfo._id}


const SellerPath = [
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
    {
        path: "settings/auth-credential",
        element: <SellerLoginCredintiial />
    },
    {
        path: "settings/payment-management",
        element: <SellerPaymentGetaway />
    },
    {
        path: "settings/send-email",
        element: <SellerEmail />
    },
    {
        path: "settings/shipping",
        element: <SellerShipping />
    },
    {
        path: "channel-integration",
        element: <DarazIntegration />
    },
    {
        path: "categories-management",
        element: <CategoriesManagement />
    },
    {
        path: "categories-management/mega-categories-management",
        element: <MageCategoriesManagement />
    },
    {
        path: "categories-management/mega-categories-management/add",
        element: <AddMagaCategory />
    },
    {
        path: "categories-management/sub-categories-management",
        element: <SubCategoriesManagement />
    },
    {
        path: "categories-management/sub-categories-management/add",
        element: <AddSubCategory />
    },
    {
        path: "categories-management/mini-categories-management",
        element: <MiniCategoriesManagement />
    },
    {
        path: "categories-management/mini-categories-management/add",
        element: <AddMiniCategory />
    },
    {
        path: "categories-management/extra-categories-management",
        element: <ExtraCategoriesManagement />
    },
    {
        path: "categories-management/extra-categories-management/add",
        element: <AddExtraCategory />
    },
    {
        path: "content-management",
        element: <SiteContentSeller />
    },
    {
        path: "content-management/slider-management",
        element: <SliderManagement />
    },
    {
        path: "content-management/slider-management/add",
        element: <AddSlider />
    },
    {
        path: "content-management/feature-management",
        element: <FeatureManagement />
    },
    {
        path: "content-management/feature-management/add",
        element: <AddFeature />
    },
    {
        path: "content-management/popup-management",
        element: <PopupManagement />
    },
    {
        path: "content-management/popup-management/add",
        element: <AddPopUp />
    },
    {
        path: "content-management/promo-code-management",
        element: <CoponManagement />
    },
    {
        path: "content-management/promo-code-management/add",
        element: <AddCopon />
    },
    {
        path: "content-management/brand-management",
        element: <BrandMangement />
    },
    {
        path: "content-management/brand-management/add",
        element: <AddBrand />
    },
    {
        path: "content-management/campaign-management",
        element: <CampaignManagement />
    },
    {
        path: "content-management/campaign-management/add",
        element: <AddCampaign />
    },
    {
        path: "product-management",
        element: <SellerProductManagement />
    },
    {
        path: "product-management/manage",
        element: <SellerAllProducts />
    },
    {
        path: "product-management/add-daraz-product",
        element: <AddDarazProduct />,


    },
    {
        path: "product-management/add-woo-product",
        element: <AddWooProduct />
    },
    {
        path: "product-management/add-product",
        element: <SellerAddProduct />
    },
    {
        path: "warehouse",
        element: <SellerWareHouseManagement />
    },
    {
        path: "warehouse/warehouse-management",
        element: <SellerListOfWarehouse />
    },
    {
        path: "warehouse/area-management",
        element: <SellerAreaListForWarehouse />
    },
    {
        path: "warehouse/rack-management",
        element: <SellerManageRack />
    },
    {
        path: "warehouse/self-management",
        element: <SellerManageSelf />
    },
    {
        path: "warehouse/cell-management",
        element: <SellerManageCell />
    },




]

export { SellerPath }