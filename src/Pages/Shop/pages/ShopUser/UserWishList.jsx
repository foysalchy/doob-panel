import React, { useContext, useEffect, useState } from "react";
import { ShopAuthProvider } from "../../../../AuthProvider/ShopAuthProvide";
import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import { useLocation, useNavigate } from "react-router-dom";

const UserWishList = () => {
  const { shopUser, shop_id, shopId, setSelectProductData } =
    useContext(ShopAuthProvider);

  const {
    data: wishlist = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/shop/user/wishlist?userId=${shopUser._id}&shopId=${shop_id.shop_id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const removeWishlist = (wishListId) => {
    fetch(
      `https://doob.dev/api/v1/shop/user/wishlist?wishlistId=${wishListId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        BrightAlert({ timeDuration: 1000 });
        refetch();
      });
  };

  const navigate = useNavigate();
  const location = useLocation();

  const buyNowHandler = (data) => {
    let product = data;
    delete product._id;
    if (!shopUser) {
      navigate(`/shop/${shopId}/sign-in`, {
        replace: true,
        state: { from: location?.pathname },
      });
    } else {
      const buyNowInfo = [product];
      setSelectProductData(buyNowInfo);
      navigate(
        `/shop/${shopId}/user/order?shop_id=${shop_id.shop_id}&userId=${shopUser._id}`
      );
      refetch();
    }
  };

  //user paler update

  return (
    <div className="max-w-4xl mx-auto ">
      <h1 className="text-2xl font-semibold">Your Favorite Items</h1>
      <p className="text-sm text-gray-600 mt-2">
        There are {wishlist?.length} products in this list
      </p>
      <div className="mt-6 bg-white shadow rounded-lg w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b ">
              <th className="p-4 px-6">Product</th>
              <th className="p-4 px-6">Price</th>
              <th className="p-4 px-6">Stock Status</th>
              <th className="p-4 px-6">Action</th>
              <th className="p-4 px-6">Remove</th>
            </tr>
          </thead>
          <tbody>
            {wishlist?.data?.map((list) => (
              <tr className="border-b">
                <td className="py-4 px-6  flex items-center space-x-4">
                  <img
                    alt="Hollow Port"
                    className="h-12 w-12 rounded border object-cover"
                    height="50"
                    src={list?.img}
                    style={{
                      aspectRatio: "50/50",
                      objectFit: "cover",
                    }}
                    width="50"
                  />
                  <div className="">
                    <div className="font-medium">{list?.productName}</div>
                    <div className="text-sm text-gray-500">
                      Awesome yellow t-shirt
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6  ">৳{list?.price}</td>
                <td className="py-4 px-6  ">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    In Stock
                  </span>
                </td>
                <td className="py-4 px-6 ">
                  <button
                    onClick={() => buyNowHandler(list)}
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Buy Now
                  </button>
                </td>
                <td className="py-4 px-6 ">
                  <button
                    onClick={() => removeWishlist(list?._id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserWishList;
