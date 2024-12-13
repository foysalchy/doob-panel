import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import WareHouse from "../SellerAddProduct/Components/WareHouse";
import {

      useNavigate,
} from "react-router-dom";
import BrightAlert from "bright-alert";
import { BsArrowRight } from "react-icons/bs";
import OnlySyncCategory from "../SellerAddProduct/Components/OnlySyncCategory";
import Variants from "../SellerAddProduct/Components/Variants";
import showAlert from "../../../../Common/alert";

const AddDarazProduct = () => {
      const { shopInfo } = useContext(AuthContext);

      // console.log("🚀 ~ file ~ shopInfo:", shopInfo.daraz);
      const [adminWare, setAdminWare] = useState(true);
      const [loading, setLoading] = useState(false);
      const [dCat, setDCat] = useState(["", "", "", ""]);
      const [selectedOption, setSelectedOption] = useState(null);
      const [searchTerm, setSearchTerm] = useState("");
      const [minPrice, setMinPrice] = useState('');
      const [maxPrice, setMaxPrice] = useState('');
      const [multiVendor, setMultiVendor] = useState(false);
      const [inputFields, setInputFields] = useState(false);
      const [variantInput, setVariantInput] = useState();
      const [daraz_option, setDaraz_Option] = useState({});
      const navigate = useNavigate();
      const { data: Products = [], refetch } = useQuery({
            queryKey: ["allProduct"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/daraz-product/${shopInfo._id}`
                  );
                  const data = await res.json();
                  if (data.message) {
                        BrightAlert(`${data.message}`, "", "warning");
                  } else {
                        return data;
                  }

            },
      });


      const handleSelectChange = (product) => {
            setSelectedOption(product);
            console.log(product, 'productx')
            // Perform any other actions based on the selected product
      };
            const {
                  data: productsx = [],refetch:refetchx
                
            } = useQuery({
                  queryKey: ["productsx"],
                  queryFn: async () => {
                        const res = await fetch(
                              `https://doob.dev/api/v1/seller/all-products/${shopInfo._id}`
                        );
                        const data = await res.json();
                        return data;
                  },
            });
            console.log(productsx,'productsx')

      const filteredProductsToDisplay =
      Products.length &&
      Products.filter((product) => {
        const matchesSearch = product.attributes.name_en
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
    
        const matchesPriceRange = product.skus.some((sku) => {
          const price = sku.special_price > 0 ? sku.special_price : sku.price;
          const matchesMinPrice = !minPrice || price >= parseFloat(minPrice);
          const matchesMaxPrice = !maxPrice || price <= parseFloat(maxPrice);
    
          return matchesMinPrice && matchesMaxPrice;
        });
    
        return matchesSearch && matchesPriceRange;
      });

      const excludedProductIds = new Set(productsx.map((product) => product.item_id));

const filteredProducts =
  Products.length &&
  filteredProductsToDisplay.filter(
    (product) => !excludedProductIds.has(product.item_id)
  );
    
console.log(filteredProducts,'filteredProducts')

      const {
            data: darazShop = [],
            isLoading,
            refetch: refetchShop,
      } = useQuery({
            queryKey: ["darazShopBd"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/seller-daraz-accounts?id=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data[0];
            },
      });
      const dataSubmit = async (e) => {
            e.preventDefault();
            console.log('lllllllllllllllllllllllllll')
            setLoading(true);
            // const product = e.target.darazProduct.value
            const form = e.target;
            const warehouse = form.warehouse ? form.warehouse.value : "";
            const area = form.area ? form.area.value : "";
            const rack = form.rack ? form.rack.value : "";
            const self = form.self ? form.self.value : "";
            const cell = form.cell ? form.cell.value : "";

            const adminMegaCategory = form?.adminMegaCategory?.value;
            const adminSubCategory = form?.adminSubCategory?.value;
            const adminMiniCategory = form?.adminMiniCategory?.value;
            const adminExtraCategory = form?.adminExtraCategory?.value;

            const adminCategory = [
                  adminMegaCategory,
                  adminSubCategory,
                  adminMiniCategory,
                  adminExtraCategory,
            ];

            console.log(adminCategory, 'dddddddddd');

            // return;
            const megaCategory = form?.megaCategory?.value || '';
            const Subcategory = form?.subCategory?.value || '';
            const miniCategory = form?.miniCategory?.value || '';
            const extraCategory = form?.extraCategory?.value || '';

            const categories = [
                  { name: megaCategory },
                  Subcategory && { name: Subcategory },
                  miniCategory && { name: miniCategory },
                  extraCategory && { name: extraCategory },
            ];


            // return;

            const warehouseValue = [
                  { name: warehouse },
                  { name: area },
                  { name: rack },
                  { name: self },
                  { name: cell },
            ];
           
            const originalData = selectedOption;
            console.log(originalData.skus, 'sku');
            const renamedData = originalData.skus.map((item) => ({
                  name: item.saleProp.color_family || "",
                  image: item.Images || null,
                  quantity: item.quantity || "",
                  SKU: item.SellerSku || "",
                  price: item.price || "",
                  offerPrice: item.special_price || 0,
                  offerDate: item.special_from_time || null,
                  offerEndDate: item.special_to_time || null,
                  ability: false,
                  vendor: false,
                  size: item.size || "",

            }));
            // Function to generate and set variantInput
            setVariantInput([]);  // Clear variantInput initially

            const variantInputData = renamedData.map((item) => {
                  const price = item.offerPrice > 0 ? item.offerPrice : item.price; // Use offerPrice or fallback to price

                  return {
                        product1: {
                              quantity: 1,
                              quantityPrice: Math.round(price - (price * 0.30)), // Round the result
                        },
                        product2: {
                              quantity: 10,
                              quantityPrice: Math.round(price - (price * 0.33)), // Round the result
                        },
                        product3: {
                              quantity: 50,
                              quantityPrice: Math.round(price - (price * 0.35)), // Round the result
                        },
                        sellingPrice: price,
                        ProductCost: Math.round(price - (price * 0.30)),
                  };

            });

            // Now update the state with the complete array of variantInputData
            setVariantInput(variantInputData);





            const filterSKU = originalData.skus.map(item => ({
                  shop_sku: item.ShopSku,
                  seller_sku: item.SellerSku,
                  sku_id: item.SkuId,
                  shop: darazShop?.shop2?.data?.name ?? darazShop?.result?.account
            }));

            const Images = originalData.images.map((url) => ({ src: url }));





            const transformedData = {
                  videoUrl: originalData.videos,
                  brandName: originalData.attributes.brand,
                  BnName: originalData.attributes.name,
                  name: originalData.attributes.name_en,
                  daraz: true,
                  woo: false, // You didn't provide this information in the original data
                  categories: categories,
                  warehouse: warehouseValue,
                  shortDescription: originalData.attributes.short_description_en,
                  description: originalData.attributes.description || originalData.attributes.description_en,
                  stock_quantity: originalData.skus[0].quantity,
                  regular_price: originalData.skus[0].price,
                  price: originalData.skus[0].special_price || originalData.skus[0].price,
                  sale_price: originalData.skus[0].special_price || originalData.skus[0].price,
                  purchasable: true, // You can modify this based on your logic
                  vendor: originalData.skus[0].source,
                  total_sales: 0,
                  package_width: originalData.skus[0].package_width,
                  package_length: originalData.skus[0].package_length,
                  package_height: originalData.skus[0].package_height,
                  weight: originalData.skus[0].package_weight,
                  createdAt: Date.now(),
                  status: !adminWare, // You can modify this based on your logic
                  featuredImage: Images[0],
                  images: Images.slice(1),
                  dCat: dCat,
                  videos: originalData.videos,
                  sku: originalData.skus[0].SellerSku,
                  metaTitle: originalData.attributes.name,
                  metaDescription: originalData.attributes.description,
                  MetaImage: Images[0],
                  warrantyTypes: originalData.skus[0].warrantyTypes,
                  rating_count: 0,
                  variations: renamedData,
                  shopId: shopInfo._id, // You need to define shopInfo
                  adminWare: adminWare,
                  item_id: originalData.item_id,
                  multiVendor: multiVendor,
                  adminCategory,
                  variantData: variantInputData,
                  seller: shopInfo?.seller,
                  darazSku: filterSKU,
                  darazOptionData: daraz_option
            };

            console.log(variantInputData, 'transformedData');
            fetch("https://doob.dev/api/v1/seller/daraz-product/", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ data: transformedData }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data, 'xxxx');
                        if (data.error == 'error') {
                              BrightAlert(`${data.message}`, "", "warning");
                              setLoading(false);
                        } else {
                              //setIsRedirectModal(data?.insertedId);
                              // navigate("/seller/product-management/edit/");
                              refetchx()
                              refetch(),
                            
                              BrightAlert("Product add successful");
                              setLoading(false);
                        }

                  });
      };

      console.log(daraz_option);



      const { data: previousAccount = [], refetch: reload } = useQuery({
            queryKey: ["previousAccount"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/daraz/get-privious-account?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });



      const switchAccount = (previous_id) => {
            const current_id = darazShop._id
            fetch(
                  `https://doob.dev/api/v1/daraz/switching-your-daraz?id=${previous_id}&loginId=${current_id}`,
                  {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json",
                        },
                  }
            )
                  .then((response) => response.json())
                  .then((data) => {
                        console.log(data);
                        if (data.status === true) {
                              BrightAlert("Account Switched", "", "success");
                              refetchShop();
                              reload();

                        }
                        else {
                              BrightAlert(data.message, "", "warning");
                        }
                  });
      };

      const [selectedAccount, setSelectedAccount] = useState("");

      const handleChange = (event) => {
            const selectedOldId = event.target.value;
            console.log(selectedOldId);
            setSelectedAccount(selectedOldId);
            switchAccount(selectedOldId);
            refetchShop()
            reload();

      };

      const isWithin28Days = (createdAt) => {
            const currentTime = new Date().getTime();
            const differenceInMilliseconds = currentTime - new Date(createdAt).getTime();
            const millisecondsIn28Days = 28 * 24 * 60 * 60 * 1000; // 28 days in milliseconds
            return differenceInMilliseconds < millisecondsIn28Days;
      };

      useEffect(() => {
            const keysToRemove = [
                  "name",
                  "short_description",
                  "description",
                  "description_en",
                  "short_description_en",
                  "name_en",
                  'brand'
            ];

            if (selectedOption && typeof selectedOption === 'object' && selectedOption.attributes) {
                  // Create a filtered attributes object excluding the keys in keysToRemove
                  const filteredAttributes = Object.entries(selectedOption.attributes).reduce((acc, [key, value]) => {
                        if (!keysToRemove.includes(key)) {
                              // Add the remaining attributes to the new object
                              acc[key] = value;
                        }
                        return acc;
                  }, {});

                  // Convert the filtered attributes to an array of objects
                  const newDataArray = Object.entries(filteredAttributes).map(([key, value]) => ({
                        [key]: value,
                  }));

                  console.log("New data array:", newDataArray);

                  // You can set this array to your state or use it elsewhere as needed
                  setDaraz_Option(newDataArray);
            } else {
                  console.log("selectedOption is empty or not valid.");
            }
      }, [selectedOption]);


      return (
            <div>
                  {shopInfo.darazLogin ? (
                        <div>
                              <div className="flex justify-end items-center gap-12 mt-8 w-full">
                                    <div className="bg-gray-50 px-4 py-2 rounded text-blue-500 flex items-center gap-2">
                                          <h1 className="whitespace-nowrap">Switch Account</h1>
                                          <hr className="flex-grow mx-2 border-t border-blue-500" />
                                          <select
                                                className="w-full px-4 py-2 border rounded bg-[#d2d2d2] text-sm"
                                                // value={selectedAccount}
                                                onChange={handleChange}
                                          >
                                                <option value="">
                                                      {darazShop?.shop2?.data?.name ?? darazShop?.result?.account}
                                                </option>
                                                {(() => {
                                                      const seenNames = new Set();
                                                      return previousAccount
                                                            .filter((item) => darazShop?.shop2?.data?.name !== item?.shop2?.data?.name)
                                                            .filter((item) => {
                                                                  const name = item?.shop2?.data?.name;
                                                                  if (name && !seenNames.has(name)) {
                                                                        seenNames.add(name);
                                                                        return true;
                                                                  }
                                                                  return false;
                                                            })
                                                            .map((shopSingle) => {
                                                                  const isRecent = isWithin28Days(shopSingle?.createdAt);
                                                                  const isBlocked = shopSingle?.isAdmin === "block";

                                                                  return (
                                                                        <option
                                                                              disabled={isBlocked}
                                                                              style={{
                                                                                    color: isBlocked ? "#ffffff" : isRecent ? "" : "#ffffff",
                                                                                    backgroundColor: isBlocked || !isRecent ? "#ff0000" : "",
                                                                              }}
                                                                              key={shopSingle._id}
                                                                              value={shopSingle._id}
                                                                        >
                                                                              {shopSingle?.shop2?.data?.name ?? shopSingle?.result?.account}
                                                                              {!isRecent && <span> Almost 28 days</span>}
                                                                        </option>
                                                                  );
                                                            });
                                                })()}
                                          </select>
                                    </div>
                              </div>
                              <div className="border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded">
                                    <div className="flex flex-col">
                                          <span className="font-bold">Add Daraz Product.</span>
                                          <small>
                                                Having accurate product information raises discoverability.
                                          </small>
                                    </div>

                                    <form onSubmit={dataSubmit} className="mt-4" action="">
                                          <div className="relative inline-block w-full">
                                                <button
                                                      className="w-full flex"
                                                      type="button"
                                                      onClick={() => handleSelectChange(false)}
                                                >
                                                      {selectedOption ? (
                                                            <span className="border w-full p-2 px-4 rounded-md bg-white flex items-center space-x-2">
                                                                  <img
                                                                        src={selectedOption.images[0]}
                                                                        alt={`Selected Product`}
                                                                        className="border border-black rounded-sm"
                                                                        style={{ height: "24px", width: "24px" }}
                                                                  />
                                                                  <span>{selectedOption.attributes.name}</span>
                                                            </span>
                                                      ) : (
                                                            <>
                                                                  {Products?.length ? (
                                                                        <>
                                                                              <input
                                                                                    type="text"
                                                                                    className="border w-full p-2 rounded-md bg-white flex items-center space-x-2"
                                                                                    placeholder="Search products"
                                                                                    value={searchTerm}
                                                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                                              />
                                                                        </>
                                                                  ) : (
                                                                        <span className="border w-full p-2 rounded-md bg-white flex items-center space-x-2">
                                                                              <span>
                                                                                    Your Products are loading so Please wait ...
                                                                              </span>
                                                                              {/* Additional text goes here */}
                                                                        </span>
                                                                  )}
                                                                   {/* Price Range Filter */}
                                                                  <div className="flex space-x-4 ">
                                                                        <input
                                                                        type="number"
                                                                        className="border p-2 rounded-md"
                                                                        placeholder="Min Price"
                                                                        value={minPrice}
                                                                        onChange={(e) => setMinPrice(e.target.value)}
                                                                        />
                                                                        <input
                                                                        type="number"
                                                                        className="border p-2 rounded-md"
                                                                        placeholder="Max Price"
                                                                        value={maxPrice}
                                                                        onChange={(e) => setMaxPrice(e.target.value)}
                                                                        />
                                                                  </div>
                                                            </>
                                                      )}
                                                </button>
                                                {loading ? (
                                                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                                                <div className="bg-white p-4 rounded-md shadow-md">
                                                      <div className="flex items-center space-x-2">
                                                      <div className="w-6 h-6 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                                                      <span className="text-gray-700">Please Wait...</span>
                                                      </div>
                                                </div>
                                                </div>
                                                ) : (
                                                <></>
                                                )}

                                                {/* Dropdown with Search */}
                                                {Products.length ? (
                                                      <div className="mt-1 p-2 bar bg-white border rounded-md">
                                                      {filteredProducts.length ? (
                                                            <div className="grid grid-cols-4 gap-4">
                                                            {filteredProducts.map((product, i) => (
                                                            <div
                                                                  key={i}
                                                                  onClick={() => handleSelectChange(product)}
                                                                  className="cursor-pointer hover:bg-gray-100 p-2   items-center space-x-2"
                                                            >
                                                                  
                                                                  <img
                                                                  src={product.images[0]}
                                                                  alt={`Product ${i + 1}`}
                                                                  className="border border-black rounded-sm mb-2"
                                                                  style={{ height: "200px", width: "100%" }}
                                                                  />
                                                                  <div>
                                                                              <span className="ptitlec">{product.attributes.name_en}</span>
                                                                  </div>
                                                                  {(() => {
                                                                        const lowestPriceSku = product.skus.reduce((minSku, currentSku) => {
                                                                        const currentPrice = currentSku.special_price > 0 ? currentSku.special_price : currentSku.price;
                                                                        const minPrice = minSku.special_price > 0 ? minSku.special_price : minSku.price;

                                                                        return currentPrice < minPrice ? currentSku : minSku;
                                                                        });

                                                                        return (
                                                                        <div key={lowestPriceSku.id} className="flex">
                                                                        
                                                                              {lowestPriceSku.special_price > 0 ? (
                                                                              <div>
                                                                              <span className="line-through text-gray-500">{lowestPriceSku.price}.TK</span> {/* Original price */}
                                                                              <span className="ml-2 text-red-500">{lowestPriceSku.special_price}.TK</span> {/* Special price */}
                                                                              </div>
                                                                              ) : (
                                                                              <div>{lowestPriceSku.price}.TK</div> /* Only show price if no special price */
                                                                              )}
                                                                        </div>
                                                                        );
                                                                        })()}


                                                                  <a  href={product.skus[0].Url || '#'} className=" block text-center py-2  w-[100%] mt-2 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-red-700 hover:bg-orange" target="_blank">View On Daraz</a>
                                                                  <button className="  h-10 w-[100%] mt-2 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none">Add Store</button>
                                                            </div>
                                                            ))}
                                                            </div>
                                                      ) : (
                                                            "No product found"
                                                      )}
                                                      </div>
                                                      ) : (
                                                      ""
                                                      )}

                                          </div>

                                          {/* 
                                          <WareHouse
                                                shopInfo={shopInfo}
                                                adminWare={adminWare}
                                                setAdminWare={setAdminWare}
                                          />
                                          <OnlySyncCategory
                                                setDCat={setDCat}
                                                dCat={dCat}
                                          /> */}


                                         
                                    </form>
                              </div>
                        </div>
                  ) : (
                        <div className="bg-red-100 border-l-4 border-red-500  py-6 text-center  rounded-md">
                              <h1 className="text-red-700 font-bold">
                                    Please First Connect Your Daraz Account
                              </h1>
                        </div>
                  )}
            </div>
      );
};

export default AddDarazProduct;
