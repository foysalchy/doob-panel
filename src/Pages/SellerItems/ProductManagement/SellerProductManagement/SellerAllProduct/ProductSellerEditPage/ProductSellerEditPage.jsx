import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../../../AuthProvider/UserProvider";
import SellerInputProductName from "../../../SellerAddProduct/Components/SellerInputProductName";
import EditAdminCategoryforSeller from "../EditAdminCategoryforSeller";
import EditDarazCategory from "../EditDarazCategory";
import EditDelivery from "../EditDelavery";
import EditMeta from "../EditMeta";
import ServiceWarranty from "../EditServiceWaranty";
import EditSincronusCategory from "../EditSincronusCategory";
import EditWareHouse from "../EditWarehiuses";
import ImageUploadSeller from "../ImageUploadSeller";
import SellerEditDiscription from "../SellerEditDiscription";
import SellerEditVariantData from "../SellerEditVariantData";
import showAlert from "../../../../../../Common/alert";
import BrightAlert from "bright-alert";


const ProductSellerEditPage = () => {
  const id = useParams().id;

  const navigate = useNavigate();

  const { state } = useLocation();
  const { shopInfo } = useContext(AuthContext);



  const product = state;

  console.log(product?._id);
  console.log(product);

  const [allImage, setAllImage] = useState([
    product?.featuredImage,
    ...product?.images,
  ]);
  const [isChecked, setIsChecked] = useState(true);
  const [datazCategory, setDarazOption] = useState([]);
  const [loading, setLoading] = useState(false);
  const [daraz, setDaraz] = useState(product?.daraz ?? false);
  const [woo, setWoo] = useState(false);
  const [adminWare, setAdminWare] = useState(true);
  const [coverPhoto, setCoverPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [banglaDescription, setBanglaDescription] = useState("");
  const [youtube, setYoutube] = useState("");

  const [multiVendor, setMultiVendor] = useState(adminWare);
  // ! for admin category
  // const [adminMegaCategory, setAdminMegaCategory] = useState("");
  // const [adminSubCategory, setAdminSubCategory] = useState("");
  // const [adminMiniCategory, setAdminMiniCategory] = useState("");
  // const [adminExtraCategory, setAdminExtraCategory] = useState("");

  const [processedImages, setProcessedImages] = useState([]);
  const [primeCat, setPrimeCat] = useState("");
  // const shopInfo = { _id: "yourShopId" };

  const imageUploadEdit = (image, index) => {
    const formData = new FormData();
    formData.append("image", image.file);
    const url = `https://doob.dev/api/v1/image/upload-image?shopId=${shopInfo._id}`;

    return fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageUrl = imageData.imageUrl;
        const updatedImages = [...allImage];
        updatedImages[index] = { name: `photo${index}`, src: imageUrl };
        setAllImage(updatedImages);
        return { name: `photo${index}`, src: imageUrl };
      });
  };

  const handleImageProcessing = async () => {
    try {
      const processed = await Promise.all(
        allImage.map((image, index) => {
          if (!image.src) {
            return imageUploadEdit(image, index);
          } else {
            return Promise.resolve({ name: `photo${index}`, src: image.src });
          }
        })
      );
      return processed;
    } catch (error) {
      console.error("Error during image processing:", error);
      // Handle the error appropriately, maybe show a message to the user
      return []; // Return an empty array in case of error
    }
  };

  const [inputFields, setInputFields] = useState([
    {
      name: "",
      image: null,
      quantity: "",
      SKU: "",
      price: "",
      offerPrice: "",
      ability: false,
    },
  ]);

  const [variantInput, setVariantInput] = useState({
    product1: {},
    product2: {},
    product3: {},
    sellingPrice: "",
    ProductCost: "",
  });

  useEffect(() => {
    setInputFields(product?.variations);
    setVariantInput(product?.variantData);
    setMultiVendor(product?.multiVendor);
    setCoverPhoto(product?.images?.[0]?.src);
    setAdminWare(product?.adminWare);
  }, [product]);
  const [brandName, setBrandName] = useState();

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
  ];

  const filteredData =
    datazCategory?.length &&
    datazCategory?.filter((item) => !ourData?.includes(item.label));

  const formSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();

    setLoading(true);

    const processed = await handleImageProcessing();

    const form = e.target;
    const BnName = form.productNameBn.value;
    const sku = form.ProductSKU.value;
    const EnName = form.productNameEn.value;
    const megaCategory = form?.megaCategory?.value;
    const Subcategory = form?.subCategory?.value || null;
    const miniCategory = form?.miniCategory?.value || null;
    const extraCategory = form?.extraCategory?.value || null;
    const short_description_form = form?.short_description?.value;
    const description_form = form?.description?.value;
    const banglaDescription_form = form?.banglaDescription?.value;
    const low_stock_warning = form?.low_stock_warning?.value;
    // return;

    const categories = [
      { name: megaCategory },
      Subcategory && { name: Subcategory },
      miniCategory && { name: miniCategory },
      extraCategory && { name: extraCategory },
    ];

    // return;
   const warehouse = form?.warehouse?.value || product?.warehouse[0]?.name;
const area = form?.area?.value || product?.warehouse[1]?.name;
const rack = form?.rack?.value || product?.warehouse[2]?.name;
const self = form?.self?.value || product?.warehouse[3]?.name;
const cell = form?.cell?.value || product?.warehouse[4]?.name;


    const warehouseValue = [
      { name: warehouse },
      { name: area },
      { name: rack },
      { name: self },
      { name: cell },
    ];
console.log(warehouseValue,'warehouseValuewarehouseValue')
    const warrantyTypes = form?.warrantyTypes?.value;

    const packageWidth = form?.packageWidth?.value;
    const productLength = form?.productLength?.value;
    const productWidth = form?.productWidth?.value;
    const productHight = form?.productHight?.value;
    const DeliveryCharge = form?.DeliveryChargeDhaka?.value;
    const DeliveryChargeOutside = form?.DeliveryChargeOutside?.value;

    const MetaTag = form?.MetaTag?.value;
    const MetaTagMetaDescription = form?.MetaDescription?.value;
    const MetaImageFile = form?.MetaImage?.files[0];
    const MetaImage = await imageUpload(MetaImageFile);

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

    // setLoading(false);
    // return;

    const formData = new FormData();
    console.log(processedImages);

    const data = {
      videoUrl: youtube,
      brandName,
      BnName,
      name: EnName,
      daraz: daraz ?? product?.daraz,
      woo,
      categories,
      warehouse: warehouseValue,
      shortDescription: short_description_form,
      description: description_form,
      banglaDescription: banglaDescription_form,
      sku: sku,
      regular_price: inputFields[0].price,
      stock_quantity: inputFields[0].quantity,
      price: inputFields[0].offerPrice,
      purchasable: true,
      total_sales: 0,
      weight: packageWidth,
      length: productLength,
      width: productWidth,
      height: productHight,
      multiVendor: multiVendor,
      adminCategory,
      variantData: variantInput,
      primaryCat:primeCat,
      // color,
      // size,
      // material,
      // warrantyTime,
      // warrantyDescription,
      // shippingCost,
      // isFreeShipping,
      // isReturnable,
      // returnDays,
      // returnPolicy,
      // refundPolicy,
      // otherDetails,
      metaTitle: MetaTag,
      // metaKeywords,
      metaDescription: MetaTagMetaDescription,
      MetaImage,
      // barcode,
      // taxClassId,

      // shortDescription,
      // longDescription,
      status: false,
      createdAt: Date.now(),
      // updatedAt,

      featuredImage: processed[0],
      images: processed.slice(1),
      videos: youtube,
      // attributes,
      variations: inputFields,
      warrantyTypes,
      rating_count: 0,
      shopId: shopInfo._id,

      adminWare,
      darazOptionData,
      upcoming: isChecked,
      low_stock_warning,
      DeliveryCharge,
      DeliveryChargeOutside,
      _id: product?._id,
    };


  

    fetch(
      `https://doob.dev/api/v1/seller/normal-product?id=${product?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          BrightAlert(`${data.message}`, "", "warning");
          setLoading(false);
        } else {
          BrightAlert(`${data.message}`, "", "success");
          setLoading(false);
          navigate("/seller/product-management/manage");
        }
      });
  };

  return (
    <div>
      <form className="border md:p-10 p-2" onSubmit={formSubmit} action="">
        <h2 className="font-bold text-xl">Edit Product</h2>

        <div className="mt-10">
          <ImageUploadSeller
            allImage={allImage}
            setAllImage={setAllImage}
            product={product}
            youtube={youtube}
            setYoutube={setYoutube}
            coverPhoto={coverPhoto}
            setCoverPhoto={setCoverPhoto}
          />
        </div>
        <SellerInputProductName
          product={product}
          brandName={brandName}
          setBrandName={setBrandName}
        />
        <EditSincronusCategory
          product={product}
          datazCategory={datazCategory}
          setDarazOption={setDarazOption}
          // setInputFields={setInputFields}
          setPrimeCat={setPrimeCat}
          daraz={daraz}
          setDaraz={setDaraz}
          woo={woo}
          setWoo={setWoo}
        />

  {!product?.oldId && (
        <EditWareHouse
          product={product}
          shopInfo={shopInfo}
          adminWare={adminWare}
          setAdminWare={setAdminWare}
        />
        )}
        {/* <label
          htmlFor="Toggle3"
          className={`inline-flex items-center py-4 rounded-md cursor-pointer ${
            isChecked ? "text-gray-800" : ""
          }`}
        >
          <input
            id="Toggle3"
            type="checkbox"
            className="hidden peer"
            checked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
          />
          <span
            className={`px-4 py-2 rounded-l-md ${
              isChecked ? " bg-gray-300" : "bg-violet-400"
            }`}
          >
            Upcoming Product
          </span>
          <span
            className={`px-4 py-2 rounded-r-md ${
              isChecked ? " bg-violet-400" : "bg-gray-300"
            }`}
          >
            For You Product
          </span>
        </label> */}
        <div>
          <SellerEditDiscription
            product={product}
            shortDescription={shortDescription}
            setShortDescription={setShortDescription}
            description={description}
            setDescription={setDescription}
          />
        </div>
        <div className="my-4 mt-10">
          <SellerEditVariantData
            product={product}
            setVariantInput={setVariantInput}
            variantInput={variantInput}
            multiVendor={multiVendor}
            setMultiVendor={setMultiVendor}
            adminWare={adminWare}
            daraz={daraz}
            inputFields={inputFields}
            setInputFields={setInputFields}
          />
        </div>
        {!product?.oldId && (
          <div>
        {multiVendor === true && (
          <div>
            Wholsale Category
            <EditAdminCategoryforSeller product={product} />
          </div>
        )}</div> )}
 
        {!product?.daraz && daraz && datazCategory?.length ? (
          <EditDarazCategory product={product} datazCategory={datazCategory} />
        ) : (
          ""
        )}
        <ServiceWarranty product={product} />
        <EditDelivery product={product} />
        <EditMeta product={product} />
        <div className="mt-4">
          {loading ? (
            <button
              type="button"
              className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
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
          ) : (
            <button
              type="submit"
              className={
                loading || coverPhoto
                  ? "group relative cursor-pointer inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
                  : "group relative inline-flex items-center overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none mt-4 cursor-not-allowed"
              }
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <BsArrowRight />
              </span>

              <span className="text-sm font-medium transition-all group-hover:me-4">
                Edit Product
              </span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductSellerEditPage;
