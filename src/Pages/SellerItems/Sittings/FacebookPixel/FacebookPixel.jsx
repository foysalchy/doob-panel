import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import showAlert from "../../../../Common/alert";
const FacebookPixel = () => {
      const [pixel, setPixel] = useState("");
      const [google, setGoogle] = useState("");
      const { shopInfo } = useContext(AuthContext);

      const { data: seller_facebook_pixel = {}, refetch } = useQuery({
            queryKey: ["seller-facebook-pixel"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/get-facebook-id?shopId=${shopInfo.shopId}`
                  );
                  const data = await res.json();
                  setPixel(data.data.pixel);
                  setGoogle(data.data.google);
                  return data.data;
            },
      });

      console.log(seller_facebook_pixel);

      const handleChange = (e) => {
            setPixel(e.target.value);
      };
      const handleChangeg = (e) => {
            setGoogle(e.target.value);
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            const data = { pixel: pixel, google: google, shopId: shopInfo.shopId };
            fetch("https://doob.dev/api/v1/seller/update-facebook-id", {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert("success", "", "success");
                        setPixel("");
                        refetch()
                  });
      };

      return (
            <div className="px-4 py-2 border border-gray-300 rounded-md shadow-md">

                  <form onSubmit={handleSubmit}>
                        <h2 className="text-lg font-semibold mb-2">Facebook Pixel : {seller_facebook_pixel?.pixel}</h2>
                        <input
                              type="text"
                              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                              placeholder="Enter Facebook Pixel ID"

                              value={pixel}
                              onChange={handleChange}
                              required
                        />

                        <h2 className="text-lg mt-5 font-semibold mb-2">Google  Analytics: {seller_facebook_pixel?.google}</h2>
                        <input
                              type="text"
                              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                              placeholder="Enter Google Measurement ID For Analytics"
                              value={google}
                              onChange={handleChangeg}
                              required
                        />
                        <button
                              type="submit"
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none"
                        >
                              Submit
                        </button>
                  </form>
            </div>
      );
};

export default FacebookPixel;
