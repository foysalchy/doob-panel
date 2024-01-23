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
import AdminStaffManagement from "../Pages/AdminItem/AdminStaff/AdminStaffManagement";
import AdminNewStaff from "../Pages/AdminItem/AdminStaff/AdminNewStaff";
import AdminPos from "../Pages/AdminItem/AdminPos/AdminPos";
import CheckStaff from "../Hooks/CheckStaff";
import ContentManagement from "../Pages/AdminItem/ContentManagement/ContentManagement";
import AdminPopupManagement from "../Pages/AdminItem/ContentManagement/AdminPopUp/AdminPopupManagement";
import AdminAddPopUp from "../Pages/AdminItem/ContentManagement/AdminPopUp/AdminAddPopUp";
import AddNotice from "../Pages/AdminItem/ContentManagement/SellerNotice/AddNotice";
import AdminNoticeManager from "../Pages/AdminItem/ContentManagement/SellerNotice/AdminNoticeManager";
import AdminAnouncement from "../Pages/AdminItem/ContentManagement/Anouncement/AdminAnouncement";
import AddAnouncement from "../Pages/AdminItem/ContentManagement/Anouncement/AddAnouncement";
import CategoryManagement from "../Pages/AdminItem/CategoryManagement/CategoryManagement";
import MegaCategoryManagement from "../Pages/AdminItem/CategoryManagement/MegaCategoryManagement/MegaCategoryManagement";
import ExtraCategoryManagement from "../Pages/AdminItem/CategoryManagement/ExtraCategoryManagement/ExtraCategoryManagement";
import MiniCategoryManagement from "../Pages/AdminItem/CategoryManagement/MiniCategoryManagement/MiniCategoryManagement";
import SubCategoryManagement from "../Pages/AdminItem/CategoryManagement/SubCategoryManagement/SubCategoryManagement";
import AddMegaCategory from "../Pages/AdminItem/CategoryManagement/MegaCategoryManagement/AddMegaCategory";
import AddSubCategory from "../Pages/AdminItem/CategoryManagement/SubCategoryManagement/AddSubCategory";
import AddMiniCategory from "../Pages/AdminItem/CategoryManagement/MiniCategoryManagement/AddMiniCategory";
import AddExtraCategory from "../Pages/AdminItem/CategoryManagement/ExtraCategoryManagement/AddExtraCategory";
import AdminFeatureImage from "../Pages/AdminItem/ContentManagement/FeaturImage/AdminFeatureImage";
import AdminFeatureImageAdd from "../Pages/AdminItem/ContentManagement/FeaturImage/AdminFeatureImageAdd";
import AdminSliderAdd from "../Pages/AdminItem/ContentManagement/SliderManagenent/AdminSliderAdd";
import AdminSliderManagement from "../Pages/AdminItem/ContentManagement/SliderManagenent/AdminSliderManagement";

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
            <CheckStaff>
                <AdminBlogs />
            </CheckStaff>
        ),
    },
    {
        path: "blog/new-blog",
        element: <CheckStaff>
            <AddBlog />
        </CheckStaff>
    },

    {
        path: "manage-product",
        element: <CheckStaff>
            <ManageProduct />
        </CheckStaff>
    },
    {
        path: "manage-product/add-Product",
        element:
            <AddProduct />
    },
    {
        path: "manage-category",
        element: <CheckStaff>
            <CatagoryManagement />
        </CheckStaff>
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
        element: <CheckStaff>
            <PriceMangement />
        </CheckStaff>
    },
    {
        path: "price-management/add-pricing",
        element: <AddPrice />
    },
    {
        path: "category-management",
        element: <CheckStaff>
            <CategoryManagement />
        </CheckStaff>
    },
    {
        path: "category-management/mega-category-management",
        element: <CheckStaff>
            <MegaCategoryManagement />
        </CheckStaff>
    },
    {
        path: "category-management/mega-category-management/add",
        element: <CheckStaff>
            <AddMegaCategory />
        </CheckStaff>
    },
    {
        path: "category-management/sub-category-management",
        element: <CheckStaff>
            <SubCategoryManagement />
        </CheckStaff>
    },
    {
        path: "category-management/sub-category-management/add",
        element: <CheckStaff>
            <AddSubCategory />
        </CheckStaff>
    },
    {
        path: "category-management/mini-category-management",
        element: <CheckStaff>
            <MiniCategoryManagement />
        </CheckStaff>
    },
    {
        path: "category-management/mini-category-management/add",
        element: <CheckStaff>
            <AddMiniCategory />
        </CheckStaff>
    },
    {
        path: "category-management/extra-category-management",
        element: <CheckStaff>
            <ExtraCategoryManagement />
        </CheckStaff>
    },
    {
        path: "category-management/extra-category-management/add",
        element: <CheckStaff>
            <AddExtraCategory />
        </CheckStaff>
    },
    {
        path: "faq",
        element: <CheckStaff>
            <AdminFaq />
        </CheckStaff>
    },
    {
        path: "faq/add-faq",
        element: <AddFaq />
    },
    {
        path: "page-management",
        element: <CheckStaff>
            <PageManagement />
        </CheckStaff>
    },
    {
        path: "page-management/add-page",
        element: <AddPage />
    },
    {
        path: "services",
        element: <CheckStaff>
            <ManageService />
        </CheckStaff>
    },
    {
        path: "services/add-service",
        element: <AddService />
    },
    {
        path: "contact",
        element: <CheckStaff>
            <ContactManagement />
        </CheckStaff>
    },
    {
        path: "contact/add-contact",
        element: <AddContact />
    },
    {
        path: "settings",
        element: <CheckStaff>
            <Settings />
        </CheckStaff>
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
        element: <CheckStaff>
            <SupportTicketManagement />
        </CheckStaff>
    },
    {
        path: "settings/site-content",
        element: <SiteContent />
    },
    {
        path: "seller-management",
        element: <CheckStaff>
            <SellerManagement />
        </CheckStaff>
    },
    {
        path: "warehouse",
        element: <CheckStaff>
            <WareHouseManagement />
        </CheckStaff>
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
        element: <CheckStaff>
            <DarazIntrigration />
        </CheckStaff>
    },
    {
        path: 'content-management',
        element: <CheckStaff>
            <ContentManagement />
        </CheckStaff>
    },
    {
        path: 'content-management/admin-popup',
        element: <CheckStaff>
            <AdminPopupManagement />
        </CheckStaff>
    },
    {
        path: 'content-management/admin-popup/add',
        element: <CheckStaff>
            <AdminAddPopUp />
        </CheckStaff>
    },
    {
        path: 'content-management/seller-notice',
        element: <CheckStaff>
            <AdminNoticeManager />
        </CheckStaff>
    },
    {
        path: 'content-management/seller-notice/add',
        element: <CheckStaff>
            <AddNotice />
        </CheckStaff>
    },
    {
        path: 'content-management/admin-anouncement',
        element: <CheckStaff>
            <AdminAnouncement />
        </CheckStaff>
    },
    {
        path: 'content-management/admin-anouncement/add',
        element: <CheckStaff>
            <AddAnouncement />
        </CheckStaff>
    },
    {
        path: 'content-management/feature-image',
        element: <CheckStaff>
            <AdminFeatureImage />
        </CheckStaff>
    },
    {
        path: 'content-management/feature-image/add',
        element: <CheckStaff>
            <AdminFeatureImageAdd />
        </CheckStaff>
    },
    {
        path: 'content-management/slider',
        element: <CheckStaff>
            <AdminSliderManagement />
        </CheckStaff>
    },
    {
        path: 'content-management/slider/add',
        element: <CheckStaff>
            <AdminSliderAdd />
        </CheckStaff>
    },
    {
        path: 'staff-management',
        element: <CheckStaff>
            <AdminStaffManagement />
        </CheckStaff>
    },
    {
        path: 'staff-management/new-staff',
        element: <AdminNewStaff />
    },
    {
        path: 'admin-pos',
        element: <CheckStaff>
            <AdminPos />
        </CheckStaff>
    },


]

export { SupperAdminPath }