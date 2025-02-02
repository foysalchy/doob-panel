import CategorieItems from "../Layout/Shop/ShopComponents/categorieItems";
import Error from "../Pages/Home/Error/Error";
import ShopAllBlog from "../Pages/Shop/ShopBlog/ShopAllBlog";
import ShopSingleBlog from "../Pages/Shop/ShopBlog/ShopSingleBlog";
import ShopPage from "../Pages/Shop/ShopPage/ShopPage";
import ConfirmOrder from "../Pages/Shop/pages/ConfirmOrder/ConfirmOrder";
import ShopSignIn from "../Pages/Shop/pages/Home/Auth/ShopSignIn";
import ShopSignUp from "../Pages/Shop/pages/Home/Auth/ShopSignUp";
import FlashProduct from "../Pages/Shop/pages/Home/FlashProduct/FlashProduct";
import Home from "../Pages/Shop/pages/Home/Home";
import SeeShopAllProduct from "../Pages/Shop/pages/Home/SeeShopAllProduct/SeeShopAllProduct";
import SeeShopUpcomingProduct from "../Pages/Shop/pages/Home/SeeShopAllProduct/SeeShopUpcomingProduct";
import AddressBook from "../Pages/Shop/pages/Home/UserProfile/ProfileUpdate/AddressBook";
import ProfileUpdate from "../Pages/Shop/pages/Home/UserProfile/ProfileUpdate/ProfileUpdate";
import UserProfile from "../Pages/Shop/pages/Home/UserProfile/UserProfile";
import AddToCard from "../Pages/Shop/pages/Product/AddToCard/AddToCard";
import UserMyOrder from "../Pages/Shop/pages/Product/MyOrder/UserMyOrder";
import CategoryByProduct from "../Pages/Shop/pages/Product/OneProduct/CategoryByProduct/CategoryByProduct";
import ProductInformation from "../Pages/Shop/pages/Product/OneProduct/ProductInformation";
import Payment from "../Pages/Shop/pages/Product/ProductCheckOut/Payment";
import ProductCheckout from "../Pages/Shop/pages/Product/ProductCheckOut/ProductCheckout";
import Search_Item from "../Pages/Shop/pages/Search/Search_Item";
import UserSupportTicket from "../Pages/Shop/pages/ShopUser/SupportTicket/SupportTicket";
import TrackOrder from "../Pages/Shop/pages/ShopUser/TrackOrder/TrackOrder";
import UserWishList from "../Pages/Shop/pages/ShopUser/UserWishList";
import Product from "./../Pages/Home/Product/Product";
import NavigateToLogin from "./NavigateToLogin";
import IsUserRegistration from "./isUserRegistration";

const ShopPath = [
      {
            path: ":id/",
            element: <Home />,
            loader: async ({ params }) => {
                  const id = params.id;
                  return fetch(`https://doob.dev/api/v1/shop/${id}`);
            },
      },
      {
            path: ":id/sign-in",
            element: <ShopSignIn />,
            loader: async ({ params }) => {
                  const id = params.id;
                  return fetch(`https://doob.dev/api/v1/shop/${id}`);
            },
      },
      {
            path: ":id/sign-up",
            element: <ShopSignUp />,
            loader: async ({ params }) => {
                  const id = params.id;
                  return fetch(`https://doob.dev/api/v1/shop/${id}`);
            },
      },
      {
            path: ":id/track-order",
            element: (

                  <TrackOrder />

            ),
      },
      {
            path: "categories",
            element: (
                  <NavigateToLogin>
                        <CategorieItems />
                  </NavigateToLogin>
            ),
      },

      {
            path: ":id/user",
            element: (
                  <IsUserRegistration>
                        <UserProfile />
                  </IsUserRegistration>
            ),
            children: [
                  {
                        path: "my-profile",
                        element: <ProfileUpdate />,
                  },
                  {
                        path: "my-address",
                        element: <AddressBook />,
                  },
                  {
                        path: "my-orders",
                        element: <UserMyOrder />,
                  },
                  {
                        path: "my-support",
                        element: <UserSupportTicket />,
                  },
                  {
                        path: "my-wish-list",
                        element: <UserWishList />,
                  },
            ],
      },

      {
            path: ":id/product/:productID", // Use a dynamic route parameter for the product ID
            element: <ProductInformation />,
            loader: async ({ params }) => {
                  const id = params.id;
                  const productID = params.productID;
                  return fetch(
                        `https://doob.dev/api/v1/shop/product/${id}/product/${productID}`
                  );
            },
      },
      {
            path: ":id/flash-product/:productID", // Use a dynamic route parameter for the product ID
            element: <FlashProduct />,
            loader: async ({ params }) => {
                  const id = params.id;
                  const productID = params.productID;
                  return fetch(
                        `https://doob.dev/api/v1/shop/product/${id}/product/${productID}`
                  );
            },
      },
      {
            path: ":id/categories/:shopId/:categoryId",
            element: <CategoryByProduct />,
            loader: async ({ params }) => {
                  console.log("params:", params); // Log params to the console

                  const shopId = params.shopId;
                  const categoryName = params.categoryId;

                  if (categoryName !== null) {
                        console.log("Fetching data for categoryName:", categoryName);

                        const response = await fetch(
                              `https://doob.dev/api/v1/shop/product/${shopId}/categories?category=${encodeURIComponent(
                                    categoryName
                              )}`
                        );
                        const data = await response.json();

                        console.log("Fetched data:", data);

                        return data;
                  } else {
                        // Handle the case when categoryName is not present
                        console.error("categoryName is not defined in the query parameters");
                        return null; // or handle it appropriately
                  }
            },
      },
      {
            path: ":id/shop-upcoming-product",
            element: <SeeShopUpcomingProduct />,
      },
      {
            path: ":id/shop-new-product",
            element: <SeeShopAllProduct />,
      },
      {
            path: ":id/blog", // Use a dynamic route parameter for the product ID
            element: <ShopAllBlog />,
            loader: async ({ params }) => {
                  const id = params.id;
                  return fetch(`https://doob.dev/api/v1/seller/blog/${id}`);
            },
      },
      {
            path: ":id/blog/:blogId",
            element: <ShopSingleBlog />,
            loader: async ({ params }) => {
                  const id = params.id;
                  const blogId = params.blogId;
                  const response = await fetch(
                        `https://doob.dev/api/v1/seller/blog/${id}/${blogId}`
                  );
                  const data = await response.json();
                  return data;
            },
      },
      {
            path: ":id/pages/:pageId",
            element: <ShopPage />,
            loader: async ({ params }) => {
                  const pageId = params.pageId;
                  const shopId = params.id;
                  const response = await fetch(
                        `https://doob.dev/api/v1/seller/page/${shopId}/${pageId}`
                  );
                  const data = await response.json();
                  return data;
            },
      },
      {
            path: ":id/user/cart",
            element: <AddToCard />,
      },
      {
            path: ":id/user/payment",
            element: (

                  <Payment />

            ),
            loader: async (params) => {
                  const urlObj = new URL(params.request.url);
                  const url = urlObj.href;
                  const shopIdRegex = /shop_id=([^&]+)/;

                  const shopIdMatch = url.match(shopIdRegex);

                  if (shopIdMatch) {
                        const shopId = shopIdMatch[1];

                        try {
                              const response = await fetch(
                                    `https://doob.dev/api/v1/seller/payment-getaway/${shopId}`
                              );
                              const data = await response.json();
                              console.log(data, "dtata");
                              return data;
                        } catch (error) {
                              console.error("Error fetching data:", error);

                              return null;
                        }
                  } else {
                        console.log("shop_id or userId not found in the URL");
                  }
            },
      },
      {
            path: ":id/user/order",
            element: (

                  <ProductCheckout />

            ),
            loader: async (params) => {
                  const urlObj = new URL(params.request.url);

                  const url = urlObj.href;
                  const shopIdRegex = /shop_id=([^&]+)/;
                  const userIdRegex = /userId=([^&]+)/;

                  const shopIdMatch = url.match(shopIdRegex);
                  const userIdMatch = url.match(userIdRegex);

                  if (shopIdMatch && userIdMatch) {
                        const shopId = shopIdMatch[1];
                        const userId = userIdMatch[1];
                        try {
                              const response = await fetch(
                                    `https://doob.dev/api/v1/shop/user-address?userId=${userId}&shopId=${shopId}&token=${userId}`,
                                    {
                                          headers: {
                                                "ngrok-skip-browser-warning": "69420",
                                          },
                                    }
                              );
                              const data = await response.json();
                              return data;
                        } catch (error) {
                              console.error("Error fetching data:", error);

                              return null;
                        }
                  } else {
                        console.log("shop_id or userId not found in the URL");
                  }
            },
      },
      {
            path: ":id/confirm-order",
            element: <ConfirmOrder />,
      },
      {
            path: ":id/user/success",
            element: (
                  <IsUserRegistration>
                        <Payment />
                  </IsUserRegistration>
            ),
      },
      {
            path: ":id/search",
            element: <Search_Item />,
      },

      {
            path: "*",
            element: <Error />,
      },
];

export { ShopPath };
