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
import BrightAlert from "bright-alert";

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
       const [minPrice, setMinPrice] = useState('');
            const [maxPrice, setMaxPrice] = useState('');
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

      const handleSelectChange = (product) => {
            setSelectedOption(product);
            // Perform any other actions based on the selected product
            
      };

      const filteredProducts = allProduct.length &&
  allProduct.filter((product) => {
    // Filter by name (case insensitive)
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by price range (if both minPrice and maxPrice are provided)
    let matchesPriceRange = true;
    if (minPrice && maxPrice) {
      const productPrice = parseFloat(product.price);
      matchesPriceRange = productPrice >= minPrice && productPrice <= maxPrice;
    }

    // Check if the product.id matches any item_id in productsx and exclude them
    const isExcluded = productsx.some((prod) => prod.item_id === product.id);

    // Return product if it matches search term, price range, and is not excluded
    return matchesSearchTerm && matchesPriceRange && !isExcluded;
  });

    
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

            const warehouse = form.warehouse ? form.warehouse.value:'';
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
            const Images = product.images.map((url) => ({
                  src: url.src,
                  name: url.name,
            }));
            console.log(Images, 'Images');

            const renamedData = [{
                  name: product.name,
                  image: [Images[0].src] || null,
                  quantity: product.stock_quantity ?? 0,
                  SKU: product.sku,
                  price: product.price || "",
                  offerPrice: null,
                  offerDate: null,
                  offerEndDate: null,
                  ability: true,
                  vendor: false,
                  size: "",
            }];

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
                  price: product.price,
                  sale_price: product.sale_price,
                  purchasable: true, // You can modify this based on your logic
                  vendor: 'woo',
                  total_sales: 0,
                  package_width: product.dimensions.width,
                  package_length: product.dimensions.length,
                  package_height: product.dimensions.height,
                  weight: product.weight,
                  createdAt: Date.now(),
                  status: !adminWare, // You can modify this based on your logic
                  featuredImage: { src: Images[0].src },
                  images: Images.slice(1),
                  dCat: dCat,
                  videos: ' ',
                  sku: product.sku,
                  metaTitle: product.name,
                  metaDescription: product.short_description ?? ' ',
                  MetaImage: Images[0],
                  warrantyTypes: '',
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
            console.log(transformedData, 'transformedData');
            // new setup end

            fetch("https://doob.dev/api/v1/seller/woo-product/", {
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
                                refetchx()
                                                            refetch(),
                                                          
                                                            BrightAlert("Product add successful");
                                                            setLoading(false);
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
                                                 
                                                      <>
                                                            {allProduct?.length ? (
                                                                  <div className="flex">
                                                                        <input
                                                                              type="text"
                                                                              className="border w-full p-2 rounded-md bg-white flex items-center space-x-2"
                                                                              placeholder="Search products"
                                                                              value={searchTerm}
                                                                              onChange={(e) => setSearchTerm(e.target.value)}
                                                                        />
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
                                                                  </div>
                                                            ) : (
                                                                  <span className="border w-full p-2 rounded-md bg-white flex items-center space-x-2">
                                                                        <span>
                                                                              Your Products are loading, so please wait...
                                                                        </span>
                                                                  </span>
                                                            )}
                                                      </>
                                                 
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
                                          { allProduct.length ? (
                                                 <div className="mt-1 p-2 bar bg-white border rounded-md">
                                                      {filteredProducts.length ? (
                                                            <div className="grid grid-cols-4 gap-4">
                                                                  {filteredProducts?.map((product, i) => (
                                                                        <div
                                                                              key={i}
                                                                             onClick={() => handleSelectChange(product)}
                                                                              className="cursor-pointer hover:bg-gray-100 p-2   items-center space-x-2"
                                                                        >
                                                                              <div className="w-6">
                                                                                    {" "}
                                                                                
                                                                              </div>
                                                                              {console.log(product,'productx')}
                                                                              <img
                                                                                    src={product.images[0].src}
                                                                                    alt={`Product ${i + 1}`}
                                                                                    className="border border-black rounded-sm mb-2"
                                                                                    style={{ height: "200px", width: "100%" }}
                                                                              />
                                                                              <span className="ptitlec">{`   ${product.name}`}</span>
                                                                              <p className="text-green-800"  ><b>{`   ${product.price}`}.Tk</b> </p>

                                                                              <a  href={product.permalink || '#'} className=" block text-center py-2  w-[100%] mt-2 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-red-700 hover:bg-orange" target="_blank">View On Woo</a>
                                                                              <button      type="submit" className="  h-10 w-[100%] mt-2 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none">Add Store</button>
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


                                    {/* <OnlySyncCategory
                                          setDCat={setDCat}
                                          dCat={dCat}
                                    />

                                    <WareHouse
                                          shopInfo={shopInfo}
                                          adminWare={adminWare}
                                          setAdminWare={setAdminWare}
                                    />
                                    <Meta /> */}
                                    {/* <div className="mt-4">
                                       
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
                                    </div> */}
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
