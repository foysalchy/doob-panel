import Error from "../Pages/Home/Error/Error";
import ShopAllBlog from "../Pages/Shop/ShopBlog/ShopAllBlog";
import ShopSingleBlog from "../Pages/Shop/ShopBlog/ShopSingleBlog";
import ShopPage from "../Pages/Shop/ShopPage/ShopPage";
import ShopSignIn from "../Pages/Shop/pages/Home/Auth/ShopSignIn";
import ShopSignUp from "../Pages/Shop/pages/Home/Auth/ShopSignUp";
import Home from "../Pages/Shop/pages/Home/Home";
import AddressBook from "../Pages/Shop/pages/Home/UserProfile/ProfileUpdate/AddressBook";
import ProfileUpdate from "../Pages/Shop/pages/Home/UserProfile/ProfileUpdate/ProfileUpdate";
import UserProfile from "../Pages/Shop/pages/Home/UserProfile/UserProfile";
import AddToCard from "../Pages/Shop/pages/Product/AddToCard/AddToCard";
import UserMyOrder from "../Pages/Shop/pages/Product/MyOrder/UserMyOrder";
import CategoryByProduct from "../Pages/Shop/pages/Product/OneProduct/CategoryByProduct/CategoryByProduct";
import ProductInformation from "../Pages/Shop/pages/Product/OneProduct/ProductInformation";
import Payment from "../Pages/Shop/pages/Product/ProductCheckOut/Payment";
import ProductCheckout from "../Pages/Shop/pages/Product/ProductCheckOut/ProductCheckout";
import Product from './../Pages/Home/Product/Product';
import IsUserRegistration from "./isUserRegistration";

const ShopPath = [
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
        path: ':id/user',
        element: <IsUserRegistration><UserProfile /></IsUserRegistration>,
        children: [
            {
                path: 'my-profile',
                element: <ProfileUpdate />,
            },
            {
                path: 'my-address',
                element: <AddressBook />,
            },
            {
                path: 'my-orders',
                element: <UserMyOrder />,
            }
        ]
    },

    {
        path: ':id/product/:productID',  // Use a dynamic route parameter for the product ID
        element: <ProductInformation />,
        loader: async ({ params }) => {
            const id = params.id;
            const productID = params.productID;
            return fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/product/${id}/product/${productID}`);
        },
    },
    {
        path: ':id/categories/:shopId/:categoryId',
        element: <CategoryByProduct />,
        loader: async ({ params }) => {
            console.log('params:', params); // Log params to the console

            const shopId = params.shopId;
            const categoryName = params.categoryId

            if (categoryName !== null) {
                console.log('Fetching data for categoryName:', categoryName);

                const response = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/product/${shopId}/categories?category=${encodeURIComponent(categoryName)}`);
                const data = await response.json();

                console.log('Fetched data:', data);

                return data;
            } else {
                // Handle the case when categoryName is not present
                console.error('categoryName is not defined in the query parameters');
                return null; // or handle it appropriately
            }
        },
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
        path: ":id/user/cart",
        element: <IsUserRegistration> <AddToCard /></IsUserRegistration>,
        loader: async (params) => {
            const urlObj = new URL(params.request.url)

            console.log(urlObj);
            const url = urlObj.href
            const shopIdRegex = /shop_id=([^&]+)/;
            const userIdRegex = /userId=([^&]+)/;

            const shopIdMatch = url.match(shopIdRegex);
            const userIdMatch = url.match(userIdRegex);

            if (shopIdMatch && userIdMatch) {
                const shopId = shopIdMatch[1];
                const userId = userIdMatch[1];
                try {
                    const response = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/user/add-to-cart?userId=${userId}&shopId=${shopId}&token=${userId}`, {
                        headers: {
                            "ngrok-skip-browser-warning": "69420",
                        }
                    });
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching data:", error);

                    return null;
                }

            } else {
                console.log("shop_id or userId not found in the URL");
            }


        }
    },
    {
        path: ":id/user/payment",
        element: <IsUserRegistration> <Payment /></IsUserRegistration>,
        loader: async (params) => {
            const urlObj = new URL(params.request.url)
            const url = urlObj.href
            const shopIdRegex = /shop_id=([^&]+)/;

            const shopIdMatch = url.match(shopIdRegex);

            if (shopIdMatch) {
                const shopId = shopIdMatch[1];

                try {
                    const response = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/payment-getaway/${shopId}`);
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching data:", error);

                    return null;
                }

            } else {
                console.log("shop_id or userId not found in the URL");
            }


        }
    },
    {
        path: ":id/user/order",
        element: <IsUserRegistration><ProductCheckout /></IsUserRegistration>,
        loader: async (params) => {
            const urlObj = new URL(params.request.url)


            const url = urlObj.href
            const shopIdRegex = /shop_id=([^&]+)/;
            const userIdRegex = /userId=([^&]+)/;

            const shopIdMatch = url.match(shopIdRegex);
            const userIdMatch = url.match(userIdRegex);

            if (shopIdMatch && userIdMatch) {
                const shopId = shopIdMatch[1];
                const userId = userIdMatch[1];
                try {
                    const response = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/user-address?userId=${userId}&shopId=${shopId}&token=${userId}`, {
                        headers: {
                            "ngrok-skip-browser-warning": "69420",
                        }
                    });
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching data:", error);

                    return null;
                }

            } else {
                console.log("shop_id or userId not found in the URL");
            }


        }
    },
    // {
    //     path: ":id/user/my-orders",
    //     element: <IsUserRegistration><UserMyOrder /></IsUserRegistration>,

    // },

    {
        path: '*',
        element: <Error />
    },
]

export { ShopPath }