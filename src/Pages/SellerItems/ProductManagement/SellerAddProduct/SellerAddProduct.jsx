import { useContext, useEffect } from "react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import InputProductName from "./Components/SellerInputProductName";
import SincronusCategory from "./Components/SincronusCategory";
import Description from "./Components/Description";
import Stock from "./Components/Stock";
import ServiceWarranty from "./Components/ServiceWarranty";
import Delivery from "./Components/Delivery";
import WareHouse from "./Components/WareHouse";
import Meta from "./Components/Meta";
import Swal from "sweetalert2";
import Variants from "./Components/Variants";
import DarazOption from "./Components/DarazOption";
import UploadImage from "./Components/UploadImage";
import BrightAlert from "bright-alert";
import { Link, useNavigate } from "react-router-dom";
import showAlert from "../../../../Common/alert";


const SellerAddProduct = () => {
      const { shopInfo } = useContext(AuthContext);
      const [isPaid, setIsPaid] = useState(false); // State to manage visibility
      const [shipping, setShipping] = useState('Defult');
      const [isChecked, setIsChecked] = useState(true);
      const [datazCategory, setDarazOption] = useState([]);
      const [loading, setLoading] = useState(false);
      const [daraz, setDaraz] = useState(false);
      const [dCat, setDCat] = useState(["", "", "", ""]);
      const [woo, setWoo] = useState(false);
      const [adminWare, setAdminWare] = useState(false);
      const [coverPhoto, setCoverPhoto] = useState("");
      const [description, setDescription] = useState("");
      const [banglaDescription, setBanglaDescription] = useState("");
      const [shortDescription, setShortDescription] = useState("");
      const [primeCat, setPrimeCat] = useState("");
      const [youtube, setYoutube] = useState("");
      const [multiVendor, setMultiVendor] = useState(false);
      const [allImage, setAllImage] = useState([]);
      const [checkAlert, setCheckAlert] = useState(false);
      const [draft, setDraft] = useState(false);
      const [productNote, setProductnote] = useState('ok');
      const [inputFields, setInputFields] = useState([
            {
                  name: "",
                  image: [],
                  quantity: "",
                  SKU: `${shopInfo.shopId}_${Math.random().toString().slice(2, 10)}`, // Generate random 8-digit number
                  price: "",
                  offerPrice: 0,
                  ability: false,
            },
      ]);

      
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
                  ProductCost: 1,
                  size: [],
            },
      ]);

      const [brandName, setBrandName] = useState();

      const imageUpload = (image) => {
            const formData = new FormData();
            formData.append("image", image);
            console.log(image, "filessssss");
            const url = `https://doob.dev/api/v1/image/upload-image?shopId=${shopInfo._id}`;

            return fetch(url, {
                  method: "POST",
                  body: formData,
            })
                  .then((res) => res.json())
                  .then((imageData) => {
                        const imageUrl = imageData.imageUrl;
                        return imageUrl;
                  });
      };
      const navigate = useNavigate();
      const DarazImage = async (image) => {
            const imageBlob = new Blob([image], { type: "image/jpeg" });

            const formData = new FormData();
            formData.append("image", imageBlob);

            const url = `https://doob.dev/api/v1/daraz/daraz-image/${shopInfo._id}`;

            try {
                  const response = await fetch(url, {
                        method: "POST",
                        body: formData,
                  });

                  if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response?.status}`);
                  }

                  const imageData = await response.json();
                  const imageUrl = imageData.url;
                  if (!imageUrl) {
                        showAlert(`${imageData.message}`, "", "warning");
                  }
                  return imageUrl;
            } catch (error) {
                  console.error("Error:", error.message);
                  throw error;
            }
      };

      const ourData = [
            "Product Description",
            "Video URL",
            "Name",
            "Price",
            "Color Family",
            "Images",
            "Warranty Type",
            "SellerSKU",
            "Quantity",
            "Special Price",
            "Package Weight(kg)",
            "Package Weight (kg)",
            "Option",
            "adminWare",
            "Package Length (cm)",
            "English description",
            "Package Width (cm)",
            "Package Height (cm)",
            "Name in English language",
            "Short Description En",
            "Brand",
            "size",
            "Size",
      ];

      const filteredData =
            datazCategory?.length &&
            datazCategory?.filter((item) => !ourData.includes(item.label));

      useEffect(() => {
            if (allImage.length < 2) {
                  console.log(allImage.length, "test.");
                  setCheckAlert(true);
            } else {
                  setCheckAlert(false);
            }

            console.log("alert", checkAlert);
      }, [allImage]);

      const [isRedirectModal, setIsRedirectModal] = useState(false);
     
      const formSubmit = async (e) => {
            console.log(variantInput, 'variantInputvariantInput')

            setLoading(true);
            e.preventDefault();
            const form = e.target;
            const BnName = form.productNameBn.value;
            const product_note = form?.product_note?.value || '';
            const sku = form.ProductSKU.value;
            const EnName = form.productNameEn.value;
            const megaCategory = form?.megaCategory?.value;
            const Subcategory = form?.subCategory?.value || null;
            const miniCategory = form?.miniCategory?.value || null;
            const extraCategory = form?.extraCategory?.value || null;

            const categories = [
                  { name: megaCategory },
                  Subcategory && { name: Subcategory },
                  miniCategory && { name: miniCategory },
                  extraCategory && { name: extraCategory },
            ];

            const warehouse = form.warehouse.value;
            const area = (form.area && form.area.value) || null;
            const rack = (form.rack && form.rack.value) || null;
            const self = (form.self && form.self.value) || null;
            const cell = (form.cell && form.cell.value) || null;

            const warehouseValue = [
                  { name: warehouse },
                  { name: area },
                  { name: rack },
                  { name: self },
                  { name: cell },
            ];

            const warrantyTypes = form?.warrantyTypes?.value;

            const packageWidth = form?.packageWidth?.value;
            const productLength = form?.productLength?.value;
            const productWidth = form?.productWidth?.value;
            const productHight = form?.productHight?.value;
            const low_stock_warning = form?.low_stock_warning?.value;
            const DeliveryCharge = isPaid ? form?.DeliveryChargeDhaka?.value : 0;
            const DeliveryChargeOutside = isPaid ? form?.DeliveryChargeOutside?.value : 0;

            const MetaTag = form.productNameEn.value;
            const MetaTagMetaDescription = form?.short_description?.value;


            console.log('hit ok')
            const darazOptionData =
                  filteredData?.length &&
                  filteredData?.map((item) => {
                        const fieldName = item.name;
                        const fieldValue = form?.[fieldName]?.value;
                        return { [fieldName]: fieldValue };
                  });

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

            const formData = new FormData();

            let galleryImageUrls = [];
            for (let i = 0; i < allImage.length; i++) {
                  // const imageUrl = await uploadImage(images[i].file);
                  let imageUrl;
                  if (!daraz) {
                        imageUrl = await imageUpload(allImage[i].file);
                  } else {
                        imageUrl = await DarazImage(allImage[i].file);
                  }
                  formData.append(`photo${i + 2}`, imageUrl);
                  const imgArray = {
                        name: `photo ${i}`,
                        src: imageUrl,
                  };
                  galleryImageUrls.push(imgArray);
            }
            
            const slag=  `${EnName}-${Math.floor(Math.random() * 1501)}`
            .replace(/[^a-zA-Z0-9-]+/g, '-') // Replace non-alphanumeric characters (excluding '-') with '-'
            .replace(/--+/g, '-') // Replace multiple '-' with a single '-'
            .replace(/^-+|-+$/g, ''); // Trim '-' from start and end
       
            const data = {
                  videoUrl: youtube,
                  brandName,
                  BnName,
                  name: EnName,
                  slag,
                  daraz,
                  woo,
                  product_note,
                  shipping:'Defult',
                  categories,
                  warehouse: warehouseValue,
                  shortDescription: form?.short_description?.value,
                  description: form?.description?.value,
                  banglaDescription: form?.bangla_description?.value || '',
                  sku: sku,
                  regular_price: inputFields[0].price,
                  stock_quantity: inputFields[0].quantity,
                  price: inputFields[0]?.offerPrice ?? 0,
                  purchasable: true,
                  total_sales: 0,
                  weight: packageWidth,
                  length: productLength,
                  width: productWidth,
                  height: productHight,
                  multiVendor: multiVendor,
                  adminCategory,
                  variantData: variantInput,
                  primaryCat: primeCat,
                  dCat: dCat,
                  metaTitle: MetaTag,
                  metaDescription: MetaTagMetaDescription,
                  MetaImage: galleryImageUrls[0],
                  status: !adminWare,
                  createdAt: Date.now(),
                  featuredImage: galleryImageUrls[0],
                  images: galleryImageUrls.slice(1),
                  videos: youtube,
                  variations: inputFields,
                  warrantyTypes,
                  rating_count: 0,
                  shopId: shopInfo._id,
                  seller: shopInfo?.seller,
                  adminWare,
                  darazOptionData,
                  upcoming: isChecked,
                  low_stock_warning,
                  DeliveryCharge,
                  DeliveryChargeOutside,
                  draft
            };

            fetch("https://doob.dev/api/v1/seller/normal-product/", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ data }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        if (data.error) {
                              BrightAlert(`${data.message}`, "", "warning");
                              setLoading(false);
                        } else {
                              //setIsRedirectModal(data?.insertedId);
                              navigate("/seller/product-management/manage");
                              BrightAlert("Product add successful");
                              setLoading(false);
                        }
                  });
      };
      const inside = shopInfo.inside
      const outside = shopInfo.outside
      return (
            <div>
                  {/*  modal body */}
                  {isRedirectModal && (
                        <>
                              <div
                                    className={`fixed left-0 top-0 right-0 bottom-0 flex h-full min-h-screen w-full z-[1000] bg-[#0000005b] items-center justify-center bg-dark/90 px-4 py-5 ${isRedirectModal ? "block" : "hidden"
                                          }`}
                              >
                                    <div className="w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]">
                                          <h1 className="text-2xl font-bold">Go Now</h1>
                                          <div className="flex flex-col gap-3 mt-3">
                                                <Link
                                                      className="py-2 bg-blue-600 text-white rounded-md"
                                                      to={`/shop/${shopInfo.name}/product/${isRedirectModal}`}
                                                >
                                                      View Product
                                                </Link>
                                                <Link
                                                      className="py-2 bg-blue-600 text-white rounded-md"
                                                      to="/seller/product-management/manage"
                                                >
                                                      {" "}
                                                      Go to Product Management
                                                </Link>
                                                {/* should reload the current page */}
                                                <button
                                                      onClick={() => window.location.reload()}
                                                      className="py-2 bg-blue-600 text-white rounded-md"
                                                // to="/seller/product-management/add-product"
                                                >
                                                      {" "}
                                                      Add Another
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </>
                  )}
                  <form className="border p-2" onSubmit={formSubmit} action="">
                        <div className="mt-10">
                              <UploadImage
                                    allImage={allImage}
                                    setAllImage={setAllImage}
                                    youtube={youtube}
                                    setYoutube={setYoutube}
                                    coverPhoto={coverPhoto}
                                    setCoverPhoto={setCoverPhoto}
                              />
                        </div>

                        <InputProductName brandName={brandName} setBrandName={setBrandName} />

                        <SincronusCategory
                              datazCategory={datazCategory}
                              setProductnote={setProductnote}
                              productNote={productNote}
                              setDarazOption={setDarazOption}
                              setInputFields={setInputFields}
                              daraz={daraz}
                              setDaraz={setDaraz}
                              woo={woo}
                              setWoo={setWoo}
                              setPrimeCat={setPrimeCat}
                              multiVendor={multiVendor}
                              setMultiVendor={setMultiVendor}
                              setDCat={setDCat}
                              dCat={dCat}
                        />

                        <WareHouse
                              multiVendor={multiVendor}
                              shopInfo={shopInfo}
                              adminWare={adminWare}
                              setAdminWare={setAdminWare}
                        />



                        <div id="description">
                              <Description
                                    draft={draft}
                                    banglaDescription={banglaDescription}
                                    setBanglaDescription={setBanglaDescription}
                                    shortDescription={shortDescription}
                                    setShortDescription={setShortDescription}
                                    description={description}
                                    setDescription={setDescription}
                              />
                        </div>
                        <div className="my-4 mt-10">
                              <Variants
                                    setVariantInput={setVariantInput}
                                    variantInput={variantInput}
                                    multiVendor={multiVendor}
                                    setMultiVendor={setMultiVendor}
                                    adminWare={adminWare}
                                    daraz={daraz}
                                    inputFields={inputFields}
                                    setInputFields={setInputFields}
                                    datazCategory={datazCategory}
                              />
                        </div>
                        {daraz && datazCategory?.length ? (
                              <DarazOption datazCategory={datazCategory} />
                        ) : (
                              ""
                        )}

                        <ServiceWarranty />
                        <Delivery setShipping={setShipping} shipping={shipping} isPaid={isPaid} setIsPaid={setIsPaid} inside={inside} outside={outside} />

                        {/* <Meta draft={draft} /> */}
                        <div className="mt-4">
                              {loading ? (
                                    <div>
                                          <button
                                                type="button"
                                                className="group relative cursor-not-allowed inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
                                          >
                                                <span className="text-sm font-medium">Loading...</span>
                                                <svg
                                                      className="animate-spin h-4 w-4 ml-3 text-white"
                                                      viewBox="0 0 24 24"
                                                >
                                                      <circle
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                      />
                                                </svg>
                                          </button>
                                          <button
                                                type="submit"
                                                disabled={allImage.length < 3}
                                                className={`${loading || coverPhoto
                                                      ? "group relative cursor-pointer inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
                                                      : "group relative inline-flex items-center bar overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none mt-4 cursor-not-allowed"
                                                      } ${allImage.length < 3
                                                            ? "bg-red-500 cursor-not-allowed"
                                                            : "bg-gray-700 cursor-pointer"
                                                      }`}
                                          >
                                                <span className="absolute -end-full transition-all group-hover:end-4">
                                                      <BsArrowRight />
                                                </span>
                                                <span className="text-sm font-medium transition-all group-hover:me-4">
                                                      Upload Product
                                                </span>
                                          </button>
                                    </div>
                              ) : (
                                    <div className="flex gap-4">
                                          <button
                                                type="submit"
                                                disabled={allImage.length < 3}
                                                className={`${loading || coverPhoto
                                                      ? "group relative cursor-pointer inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
                                                      : "group relative inline-flex items-center bar overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none mt-4 cursor-not-allowed"
                                                      } ${allImage.length < 3
                                                            ? "bg-red-500 cursor-not-allowed"
                                                            : "bg-gray-700 cursor-pointer"
                                                      }`}
                                          >
                                                <span className="absolute -end-full transition-all group-hover:end-4">
                                                      <BsArrowRight />
                                                </span>
                                                <span className="text-sm font-medium transition-all group-hover:me-4">
                                                      Upload Product
                                                </span>
                                          </button>
                                          <button
                                                type="submit"
                                                onClick={() => setDraft(true)}
                                                className={`${loading || coverPhoto
                                                      ? "group relative cursor-pointer inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
                                                      : "group relative inline-flex items-center bar overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none mt-4 cursor-not-allowed"
                                                      } ${allImage.length < 3
                                                            ? "bg-red-500 cursor-not-allowed"
                                                            : "bg-gray-700 cursor-pointer"
                                                      }`}
                                          >
                                                <span className="absolute -end-full transition-all group-hover:end-4">
                                                      <BsArrowRight />
                                                </span>
                                                <span className="text-sm font-medium transition-all group-hover:me-4">
                                                      Draft
                                                </span>
                                          </button>
                                    </div>
                              )}
                        </div>
                  </form>
            </div>
      );
};

export default SellerAddProduct;
