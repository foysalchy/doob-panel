import DarazIntegration from "../Pages/AdminItem/IntrigrationDaraz/DarazIntrigration";
import SellerDashboard from "../Pages/Dashboard/SellerDashboard/SellerDashboard";
import SellerAddContactPage from "../Pages/SellerItems/ContactPages/SellerAddContactPage";
import SellerManageContact from "../Pages/SellerItems/ContactPages/SellerManageContact";
import AddDomain from "../Pages/SellerItems/DomainManagement/AddDomain";
import AddSellerPage from "../Pages/SellerItems/PageManagement/AddSellerPage";
import SellerPageManagement from "../Pages/SellerItems/PageManagement/SellerPageManagement";
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
import SellerEmail from "../Pages/SellerItems/Sittings/SellerEmail/SellerEmail";
import SellerPaymentGetaway from "../Pages/SellerItems/Sittings/SellerPaymentGetway/SellerPaymentGetway";
import SellerSittingsPage from "../Pages/SellerItems/Sittings/SellerSittingsPage";
import SellerShipping from "../Pages/SellerItems/Sittings/Shiping/SellerShiping";
import SellerSupportTicket from "../Pages/SellerItems/SupportTicket/SupportTicket";
import UpdateShopProfile from "../Pages/SellerItems/UpdateShopProfile/UpdateShopProfile";

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
        path: "add-daraz",
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

]

export { SellerPath }