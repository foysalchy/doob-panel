import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import showAlert from "../../../../Common/alert";
import FilterByCategory from "../../ProductManagement/SellerProductManagement/SellerAllProduct/ProductSellerEditPage/FilterByCategory";
 
export default function EditSlot() {
      const id = useParams().id;
      const { shopInfo } = useContext(AuthContext);
      const navigate = useNavigate();

      const handleGoBack = () => {
            navigate(-1);
      };

      const { data: campaignDefaultData = {}, refetch: reload } = useQuery({
            queryKey: ["campaignData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/get-single-campaign?id=${id}`,
                  );
                  const data = await res.json();
                  console.log("data", data);
                  return data.data;
            },
      });




      const { data: products = [], refetch } = useQuery({
            queryKey: ["products"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/all-products/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });


      const [loading, setLoading] = useState(false);
      const [isChecked, setIsChecked] = useState(campaignDefaultData.isFlash);

 const [selected_category, set_selected_category] = useState([]);
      const [sortOption, setSortOption] = useState();
      const handleSortChange = (e) => {
            setSortOption(e.target.value);
        };


      useEffect(() => {
            const selected = products?.filter((product) => product.campaignId === id);

            const transformedData = selected.map((item, index) => ({
                  value: item,
                  label: (
                        <div className="flex cursor-pointer gap-4 items-center">
                              <div className="flex gap-2 items-center">
                                    <span>{index + 1}</span>
                                    <img
                                          src={item?.images[0]?.src}
                                          className="border border-black rounded-sm"
                                          style={{
                                                marginRight: "8px",
                                                height: "24px",
                                                width: "24px",
                                          }}
                                    />
                              </div>
                              {item.name.split(" ").slice(0, 10).join(" ") + "..."}
                        </div>
                  )
            }));
            setSelectedProducts(transformedData);
      }, [id]);

      const filteredData = products.length
      ? products
          .filter((product) => {
              // Category filter logic
              return selected_category?.length
                  ? selected_category.every((category, index) => category === product?.categories?.[index]?.name)
                  : true;
          })
          .sort((a, b) => {
              // Sorting logic based on the selected option
              switch (sortOption) {
                  case "top_sale":
                      return b.total_sales - a.total_sales; // Assuming `sales` is the field to determine top-selling
                  case "low":
                      return a.regular_price - b.regular_price; // Price low to high
                  case "high":
                      return b.regular_price - a.regular_price; // Price high to low
                  case "random":
                      return Math.random() - 0.5; // Random sort
                  default:
                      return 0;
              }
          })
      : [];
      const [selectedProducts, setSelectedProducts] = useState([]);
      const [prices, setPrices] = useState({});



      const handleProductChange = (selectedOptions) => {
            setSelectedProducts(selectedOptions);


            console.log(selectedOptions);
            const newPrices = { ...prices };

            selectedOptions.forEach((option) => {
                  console.log(option);
                  if (!newPrices) {
                        newPrices.campaignPrice = 0;
                  }
            });
            setPrices(newPrices);
      };

      const handlePriceChange = (product, newPrice) => {
            console.log(product, newPrice);
            product.campaignPrice = newPrice;

            setPrices((prevPrices) => ({ ...prevPrices, product }));
      };

      const handleRemoveProduct = (product) => {
            setSelectedProducts((prevSelected) =>
                  prevSelected.filter((p) => p !== product)
            );
            setPrices((prevPrices) => {
                  const newPrices = { ...prevPrices };
                  delete newPrices[product.value];
                  return newPrices;
            });
      };


      const updateCampaign = (data, form) => {

            fetch(
                  `https://doob.dev/api/v1/seller/update-single-campaign?id=${id}`,
                  {
                        method: "PUT",
                        headers: {
                              "content-type": "application/json",
                        },
                        body: JSON.stringify(data), // Pass the data object to JSON.stringify
                  }
            )
                  .then((res) => res.json())
                  .then((responseData) => {
                        console.log("responseData", responseData);
                        showAlert("success", "", "success");
                        setLoading(false);
                        reload();
                        // form.reset();
                        handleGoBack();
                  });
      };
      const handleSubmit = async (e) => {
            setLoading(true);
            e.preventDefault();
            const form = e.target;
            const name = form.name.value;
            const MetaTag = "";
            const MetaDescription = "";
            const startTime =   "";
            const endTime =   "";

            // console.log("startTime", startTime);
            // return;
            const imageFormData = new FormData();
            let image = campaignDefaultData?.image ?? form.image.files[0];
            if (form.image.files[0]) {
                  image = form.image.files[0];
                  imageFormData.append("image", image);
                  image = await uploadImage(imageFormData);
            }
            let MetaImage ="";
           
            const shopId = shopInfo._id;
            const products = selectedProducts?.map(({ value }) => ({ product: value }));

            const formData = {
                  name,
                  image,
                  MetaTag,
                  MetaDescription,
                  MetaImage,
                  // shopId,
                  products,
                  isFlash: false,
                  startTime,
                  endTime,
                  shopId: shopInfo._id,
                  status: true,
            };
            updateCampaign(formData, form);
            refetch()
      };



      async function uploadImage(formData) {
            const url = "https://doob.dev/api/v1/image/upload-image";
            const response = await fetch(url, {
                  method: "POST",
                  body: formData,
            });
            const imageData = await response.json();
            return imageData.imageUrl;
      }









      return (
            <div className="">
                  <button
                        onClick={() => handleGoBack()}
                        type="button"
                        className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <FaLongArrowAltLeft />
                        </span>
                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                              Go Back
                        </span>
                  </button>

                  <h2 className="text-2xl font-semibold text-black mb-6 text-center">
                        Update the slot for your shop
                  </h2>

                  <div>
                        <div className=" border-black p-10 rounded border-dashed border-2  my-4">
                              <form onSubmit={handleSubmit} action="">
                                    <div className="mb-4">
                                          <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-900"
                                          >
                                                Name
                                          </label>
                                          <input
                                                required
                                                type="text"
                                                defaultValue={campaignDefaultData?.name ?? ""}
                                                id="name"
                                                name="name"
                                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring border-black"
                                                placeholder="Enter your name"
                                          />
                                    </div>

                                    <div className="mb-4">
                                          <label
                                                htmlFor="image"
                                                className="block text-sm font-medium text-gray-900"
                                          >
                                                Image Upload
                                          </label>
                                          <input
                                                // required
                                                type="file"
                                                // defaultValue={campaignDefaultData?.image ?? ""}
                                                id="image"
                                                name="image"
                                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring border-black"
                                          />
                                    </div>

                                    

                                    <div className="mb-4">
                                          <label
                                                htmlFor="image"
                                                className="block text-sm font-medium text-gray-900"
                                          >
                                               Fillter By Category
                                          </label>
                                          <FilterByCategory set_selected_category={set_selected_category} selected_category={selected_category} />

                                    </div>
                                    <div className="mb-4">
                                          <label
                                                htmlFor="sortx"
                                                className="block text-sm font-medium text-gray-900"
                                          >
                                               Fillter By
                                          </label>
                                          <select   className="mt-1 p-2 w-full  bg-white rounded-md focus:outline-none focus:ring border-black"
                                       id="sortx" onChange={handleSortChange}>
                                          <option value="top_sale">Top Selling</option>
                                          <option value="low">Price Low To High</option>
                                          <option value="high">Price High To Low</option>
                                          <option value="random">Random</option>
                                          </select>
                                    </div>
                                    
                                    

                                   
 
                                    <div className="">
                                          <label
                                                htmlFor="metaDescription"
                                                className="block text-sm font-medium text-gray-900"
                                          >
                                                Select Product
                                          </label>

                                          <Select
                                                name=""
                                                placeholder="Select your product"
                                                options={filteredData?.length && filteredData?.map((data, i) => ({
                                                      value: data,
                                                      label: (
                                                            <div className="flex cursor-pointer gap-4 items-center">
                                                                  <div className="flex gap-2 items-center">
                                                                        <span>{i + 1}</span>
                                                                        <img
                                                                              src={data?.images[0]?.src}
                                                                              className="border border-black rounded-sm"
                                                                              style={{
                                                                                    marginRight: "8px",
                                                                                    height: "24px",
                                                                                    width: "24px",
                                                                              }}
                                                                        />
                                                                  </div>
                                                                  {data.name.split(" ").slice(0, 10).join(" ") + "..."}
                                                            </div>
                                                      ),
                                                }))}
                                                isMulti
                                                isSearchable
                                                onChange={handleProductChange}
                                                value={selectedProducts}
                                          />
                                    </div>

                                    <div className="flex flex-col gap-2 mt-4">
                                          {selectedProducts?.length ? selectedProducts?.map((product, i) => (
                                                <div
                                                      key={i + 200}
                                                      className="flex p-2 px-4 rounded border border-black  gap-2 justify-between items-center"
                                                >
                                                      <div className="flex items-start">
                                                            <img
                                                                  className="border border-black rounded-sm"
                                                                  style={{
                                                                        marginRight: "8px",
                                                                        height: "24px",
                                                                        width: "24px",
                                                                  }}
                                                                  src={product?.value?.images[0]?.src}
                                                                  alt=""
                                                            />
                                                            {product?.value?.name.split(" ").slice(0, 10).join(" ") +
                                                                  "..."}
                                                      </div>

                                                      <div className="flex gap-4 items-center">
                                                            <span>Regular Price: {product.value.price}</span>
                                                            <input
                                                                  type="hidden"
                                                                  placeholder="Slot Price"
                                                                  className="py-0.5 px-2 border border-black"
                                                                  value={product.value.campaignPrice || ""}
                                                                  onChange={(e) =>
                                                                        handlePriceChange(product.value, e.target.value)
                                                                  }
                                                            />
                                                            <button
                                                                  type="button"
                                                                  className="bg-red-500 px-2 py-0.5 rounded ml-4"
                                                                  onClick={() => handleRemoveProduct(product)}
                                                            >
                                                                  Remove
                                                            </button>
                                                      </div>
                                                </div>
                                          )) : ''}
                                    </div>

                                    <button
                                          disabled={loading || !selectedProducts.length}
                                          type="submit"
                                          className="group mt-4 relative inline-flex items-center cursor-pointer bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring  disabled:bg-gray-500 disabled:cursor-no-drop"
                                    >
                                          <span className="absolute -start-full transition-all group-hover:start-4">
                                                <FaLongArrowAltRight />
                                          </span>
                                          <span className="text-sm font-medium transition-all group-hover:ms-4">
                                                {loading ? "Uploading ..." : "Update the Slot"}
                                          </span>
                                    </button>
                              </form>
                        </div>
                  </div>
            </div>
      );
}
