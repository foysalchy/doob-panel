import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import Meta from "../SellerAddProduct/Components/Meta";
import OnlySyncCategory from "../SellerAddProduct/Components/OnlySyncCategory";
import Variants from "../SellerAddProduct/Components/Variants";
import WareHouse from "../SellerAddProduct/Components/WareHouse";
import showAlert from "../../../../Common/alert";

const AddWooProduct = () => {
      const { shopInfo } = useContext(AuthContext);
      const [adminWare, setAdminWare] = useState(true);
      const [loading, setLoading] = useState(false);
      const [selectedOption, setSelectedOption] = useState(null);
      const [inputFields, setInputFields] = useState(false);
      const [dCat, setDCat] = useState(["", "", "", ""]);
      const [variantInput, setVariantInput] = useState([
            {
                  product1: {
                        quantity: 1,
                        quantityPrice: 1,
                  },
                  product2: {
                        quantity: 10,
                        quantityPrice: 1,
                  },
                  product3: {
                        quantity: 50,
                        quantityPrice: 1,
                  },
                  sellingPrice: 1,
            },
      ]);

      const [searchTerm, setSearchTerm] = useState("");
      const [multiVendor, setMultiVendor] = useState(true);
      const { data: allProduct = [], refetch } = useQuery({
            queryKey: ["woo-product"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/woo-product/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const handleSelectChange = (product) => {
            setSelectedOption(product);
            // Perform any other actions based on the selected product
      };

      const filteredProducts =
            allProduct.length &&
            allProduct.filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

      const imageUpload = async (image) => {
            const formData = new FormData();
            formData.append("image", image);

            const url = `https://doob.dev/api/v1/image/upload-image`;

            const res = await fetch(url, {
                  method: "POST",
                  body: formData,
            });
            const imageData = await res.json();
            const imageUrl = imageData.imageUrl;
            return imageUrl;
      };

      const dataSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);

            const form = e.target;
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

            const product = selectedOption;
            const MetaTag = form?.MetaTag?.value;
            const MetaTagMetaDescription = form?.MetaDescription?.value;
            // const MetaImageFile = form?.MetaImage?.files[0]
            // const MetaImage = await imageUpload(MetaImageFile)

            const warehouse = form.warehouse.value;
            const area = form?.area?.value || null;
            const rack = form?.rack?.value || null;
            const self = form?.self?.value || null;
            const cell = form?.cell?.value || null;

            const warehouseValue = [
                  { name: warehouse },
                  { name: area },
                  { name: rack },
                  { name: self },
                  { name: cell },
            ];

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

            // console.log(categories);

            const data = product;
            data.shopId = shopInfo._id;
            data.metaTitle = MetaTag;
            data.seller = shopInfo?.seller;
            data.metaDescription = MetaTagMetaDescription;
            // data.MetaImage = MetaImage
            data.warehouseValue = warehouseValue;
            data.adminWare = adminWare;
            data.woo = true;
            (data.daraz = false),
                  (data.multiVendor = multiVendor),
                  (data.adminCategory = adminCategory),
                  (data.variantData = variantInput[0]);
            data.categories = categories;

            // console.log(data?.categories);

            // new setup foysal
            const Images = product.images.map((url) => ({ src: url }));

            const renamedData = {
                  name: "",
                  image: Images[0] || null,
                  quantity: product.stock_quantity ?? 0,
                  SKU: product.sku,
                  price: product.price || "",
                  offerPrice: 0,
                  offerDate: null,
                  offerEndDate: null,
                  ability: false,
                  vendor: false,
                  size: "",
            };
            
            const price = product.price;
            
            const variantInputData = {
                  product1: {
                        quantity: 1,
                        quantityPrice: Math.round(price - (price * 0.30)),
                  },
                  product2: {
                        quantity: 10,
                        quantityPrice: Math.round(price - (price * 0.33)),
                  },
                  product3: {
                        quantity: 50,
                        quantityPrice: Math.round(price - (price * 0.35)),
                  },
                  sellingPrice: price,
                  ProductCost: Math.round(price - (price * 0.30)),
            };
            
            const transformedData = {
                  videoUrl: null,
                  brandName: 'No Brand',
                  BnName: product.name,
                  name: product.name,
                  daraz: false,
                  woo: true, // You didn't provide this information in the original data
                  categories: categories,
                  warehouse: warehouseValue,
                  shortDescription: product.short_description,
                  description: product.description,
                  stock_quantity: product.stock_quantity ?? 0,
                  regular_price: product.regular_price,
                  price:product.price,
                  sale_price: product.sale_price,
                  purchasable: true, // You can modify this based on your logic
                  vendor:'woo',
                  total_sales: 0,
                  package_width: product.dimensions.width,
                  package_length: product.dimensions.length,
                  package_height: product.dimensions.height,
                  weight: product.weight,
                  createdAt: Date.now(),
                  status: !adminWare, // You can modify this based on your logic
                  featuredImage: Images[0],
                  images: Images.slice(1),
                  dCat: dCat,
                  videos: ' ',
                  sku: product.sku,
                  metaTitle:  product.name,
                  metaDescription: product.short_description??' ',
                  MetaImage: Images[0],
                  warrantyTypes:'',
                  rating_count: 0,
                  variations: renamedData, //pending
                  shopId: shopInfo._id,  
                  adminWare: adminWare,
                  item_id: product.id, 
                  multiVendor: multiVendor,
                  adminCategory,
                  variantData: variantInputData, //pending
                  seller: shopInfo?.seller,
                  darazSku: null,
                  darazOptionData: null
            };
           // new setup end
           
            fetch("http://localhost:5001/api/v1/seller/woo-product/", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ transformedData }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setLoading(false);
                        console.log(data);
                        if (data.error) {
                              showAlert(`${data.message}`, "", "warning");
                        } else {
                              showAlert("success", "", "success");
                        }
                  });
      };

      return (
            <div>
                  {!shopInfo.woo ? (
                        <div>
                              <h1 className="text-center">Add Woo Product</h1>
                              <form onSubmit={dataSubmit} className="mt-4" action="">
                                    <div className="relative inline-block w-full">
                                          <button
                                                className="w-full"
                                                type="button"
                                                onClick={() => handleSelectChange(false)}
                                          >
                                                {selectedOption ? (
                                                      <span className="border w-full p-2 px-4 rounded-md bg-white flex items-center space-x-2">
                                                            <img
                                                                  src={selectedOption.images[0].src}
                                                                  alt={`Selected Product`}
                                                                  className="border border-black rounded-sm"
                                                                  style={{ height: "24px", width: "24px" }}
                                                            />
                                                            <span className="capitalize">{selectedOption.name}</span>
                                                      </span>
                                                ) : (
                                                      <>
                                                            {allProduct?.length ? (
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
                                                                              Your Products are loading, so please wait...
                                                                        </span>
                                                                  </span>
                                                            )}
                                                      </>
                                                )}
                                          </button>

                                          {/* Dropdown with Search */}
                                          {!selectedOption && allProduct.length ? (
                                                <div className="mt-1 p-2 max-h-40 bar overflow-y-scroll bg-white border rounded-md">
                                                      {filteredProducts.length ? (
                                                            <span>
                                                                  {filteredProducts?.map((product, i) => (
                                                                        <div
                                                                              key={i}
                                                                              onClick={() => handleSelectChange(product)}
                                                                              className="cursor-pointer hover:bg-gray-100 p-2 flex items-center space-x-2"
                                                                        >
                                                                              <div className="w-6">
                                                                                    {" "}
                                                                                    <span>{i + 1}</span>
                                                                              </div>
                                                                              <img
                                                                                    src={product.images[0].src}
                                                                                    alt={`Product ${i + 1}`}
                                                                                    className="border border-black rounded-sm"
                                                                                    style={{ height: "24px", width: "24px" }}
                                                                              />
                                                                              <span className="capitalize">{`   ${product.name}`}</span>
                                                                        </div>
                                                                  ))}
                                                            </span>
                                                      ) : (
                                                            "No product found"
                                                      )}
                                                </div>
                                          ) : (
                                                ""
                                          )}
                                    </div>

                                    
                                    <OnlySyncCategory
                                                setDCat={setDCat}
                                                dCat={dCat}
                                          />

                                    <WareHouse
                                          shopInfo={shopInfo}
                                          adminWare={adminWare}
                                          setAdminWare={setAdminWare}
                                    />
                                    <Meta />
                                    <div className="mt-4">
                                          {/* {
                        loading ?
                            <button type='button' className="group relative cursor-not-allowed inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4">
                                <span className="text-sm font-medium">
                                    Loading...
                                </span>
                                <svg className="animate-spin h-4 w-4 ml-3 text-white" viewBox="0 0 24 24">

                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                </svg>
                            </button>

                            :
                            <button type='submit'

                                className={!loading ? "group relative cursor-pointer inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 " : "group relative inline-flex items-center bar overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none mt-4 cursor-not-allowed"}

                            >
                                <span className="absolute -end-full transition-all group-hover:end-4">
                                    <BsArrowRight />
                                </span>

                                <span className="text-sm font-medium transition-all group-hover:me-4">
                                    Upload Product
                                </span>
                            </button>
                    } */}

                                          <button
                                                type="submit"
                                                className={
                                                      !loading
                                                            ? "group relative cursor-pointer inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
                                                            : "group relative inline-flex items-center bar overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none mt-4 cursor-not-allowed"
                                                }
                                          >
                                                <span className="absolute -end-full transition-all group-hover:end-4">
                                                      <BsArrowRight />
                                                </span>

                                                <span className="text-sm font-medium transition-all group-hover:me-4">
                                                      Upload Product
                                                </span>
                                          </button>
                                    </div>
                              </form>
                        </div>
                  ) : (
                        <div className="bg-red-100 border-l-4 border-red-500  py-6 text-center  rounded-md">
                              <h1 className="text-red-700 font-bold">
                                    Please First Connect Your Wocommerce Account
                              </h1>
                        </div>
                  )}
            </div>
      );
};

export default AddWooProduct;
