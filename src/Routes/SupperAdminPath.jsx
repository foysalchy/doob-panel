import AddBlog from "../Pages/AdminItem/Blogs/AddBlog";
import AdminBlogs from "../Pages/AdminItem/Blogs/AdminBlogs";
import AdminSingleBlog from "../Pages/AdminItem/Blogs/AdminSingleBlog";
import AddCatagorys from "../Pages/AdminItem/Catagorys/AddCatagorys";
import CatagoryManagement from "../Pages/AdminItem/Catagorys/CatagoryManagement";
import AddContact from "../Pages/AdminItem/Contract/AddContact";
import ContactManagement from "../Pages/AdminItem/Contract/ContactManagement";
import AddFaq from "../Pages/AdminItem/Faq/AddFaq";
import AdminFaq from "../Pages/AdminItem/Faq/AdminFaq";
import AddPage from "../Pages/AdminItem/PageManagement/AddPage";
import PageManagement from "../Pages/AdminItem/PageManagement/PageManagement";
import AddPrice from "../Pages/AdminItem/PriceMangement/AddPrice";
import PriceMangement from "../Pages/AdminItem/PriceMangement/PriceMangement";
import AddProduct from "../Pages/AdminItem/Products/AddProduct";
import ManageProduct from "../Pages/AdminItem/Products/ManageProduct/ManageProduct";
import SellerManagement from "../Pages/AdminItem/SellerManagement/SellerManagement";
import AddService from "../Pages/AdminItem/Services/AddService";
import ManageService from "../Pages/AdminItem/Services/ManageService";
import Daraz from "../Pages/AdminItem/Settings/Daraz/Daraz";
import PaymentGetWay from "../Pages/AdminItem/Settings/PaymentGetWay/PaymentGetWay";
import SellerDomainManagement from "../Pages/AdminItem/Settings/SellerDomainManagement/SellerDomainManagement";
import SendEmail from "../Pages/AdminItem/Settings/SendEmail/SendEmail";
import Settings from "../Pages/AdminItem/Settings/Settings";
import ShippingManagement from "../Pages/AdminItem/Settings/ShipingIntigration/ShippingManagement";
import SiteContent from "../Pages/AdminItem/Settings/SiteContent/SiteContent";
import SupportTicketManagement from "../Pages/AdminItem/SupportTicket/AllsuportTicket/SupportTicketManagement";
import AreaListForWarehouse from "../Pages/AdminItem/WareHouseManagement/List/AreaListForWarehouse";
import ManageCell from "../Pages/AdminItem/WareHouseManagement/List/ManageCell";
import ManageRack from "../Pages/AdminItem/WareHouseManagement/List/ManageRack";
import ManageSelf from "../Pages/AdminItem/WareHouseManagement/List/ManageSelf";
import ListOfWarehouse from "../Pages/AdminItem/WareHouseManagement/ListOfWarehouse";
import WareHouseManagement from "../Pages/AdminItem/WareHouseManagement/WareHouseManagement";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import DarazIntrigration from "../Pages/AdminItem/IntrigrationDaraz/DarazIntrigration";
import AdminSittings from "../Pages/AdminItem/AdminSittings/AdminSittings";

const SupperAdminPath = [
    {
        path: "dashboard",
        element: (
            <AdminDashboard />
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
    },
    {
        path: 'content-management',
        element: <AdminSittings />
    }

]

export { SupperAdminPath }