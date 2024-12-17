import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import React, { useContext, useEffect, useState } from "react";
import { FaBasketShopping, FaCircle, FaMessage } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import { TbShoppingBagPlus } from "react-icons/tb";
import {
      Link,
      useLoaderData,
      useLocation,
      useNavigate,
      useParams,
} from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import MetaHelmet from "../../../../Helmate/Helmate";
import ModalForPayment from "./ModalForPayment";
import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";
import ReleventProduct from "./ReleventProduct";
import VideoPlayer from "../../../../Hooks/VideoPlayer";
import { PiDownload, PiPlay } from "react-icons/pi";
import LoaderData from "../../../../Common/LoaderData";
import JSZip from "jszip";
import showAlert from "../../../../Common/alert";

const StarRating = ({ rating, onRatingChange }) => {

      return (
            <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                        <span
                              key={star}
                              onClick={() => onRatingChange(star)}
                              className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"
                                    }`}
                        >
                              ★
                        </span>
                  ))}
            </div>
      );
};

const ProductDetails = () => {
      const { user, shopInfo } = useContext(AuthContext);
      const location = useParams();
      const [selectedSize, setSelectedSize] = useState(null)

      const [active, setActive] = useState('desc');
      const navigate = useNavigate();
      const [loader, setLoader] = useState(false);
      const [userName, setUserName] = useState(user?.name);
      const [variationData, setVariationData] = useState(null);
      const [sizes, set_sizes] = useState([]);
      const [indexSer, setIndexSer] = useState(0);
console.log(location?.id,'onex','firehas')

      const { data: myData = {}, refetch: refetchMega, isLoading } = useQuery({
            queryKey: ["product_details_1"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/single-product?id=${location?.id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });
      console.log(myData,'myData')

      useEffect(() => {
            refetchMega()
      }, [location]);


      const productFind = myData?.data ;


console.log(myData,productFind,'producxxtFind')







      if (variationData) {
            console.log(variationData?.name);
      } else {
            productFind?.name;
      }

      const [quantity, setQuantity] = useState(1);
      const [banifit, setBanifit] = useState({
            productCost: parseInt(productFind?.variantData[indexSer]?.sellingPrice),
            sellingPrice: parseInt(productFind?.variantData[indexSer]?.sellingPrice),
            profit: 0,
            profitPercent: 0,
      });

      const allUpdateInfo = () => {
            const price = parseInt(productFind?.variantData[indexSer]?.sellingPrice);
            const quantityPars = parseInt(quantity);
            const productCost = quantityPars * price;
            console.log(quantityPars, 'quantityPars')
            // Compare your quantity   nahid, mahadi, and murshed
            const product1Quantity = productFind?.variantData[indexSer]?.product1?.quantity;
            const product2Quantity = productFind?.variantData[indexSer]?.product2?.quantity;
            const product3Quantity = productFind?.variantData[indexSer]?.product3?.quantity;

            const product1QuantityPrice =
                  productFind?.variantData[indexSer]?.product1?.quantityPrice;
            const product2QuantityPrice =
                  productFind?.variantData[indexSer]?.product2?.quantityPrice;
            const product3QuantityPrice =
                  productFind?.variantData[indexSer]?.product3?.quantityPrice;

            let profit = 0;
            let profitPercent = 0;
            let sealingPrice = price;
            let total = productCost;
            // ...
            const updatedProductCost = total;

            if (quantity >= product1Quantity && quantity < product2Quantity) {
                  console.log(quantity * product1QuantityPrice);
                  // const productQuantityPrice = (total / quantity) * quantity;
                  // const countProfit = (product1QuantityPrice / product1Quantity) * quantity;
                  sealingPrice = quantity * product1QuantityPrice;
                  profit = productCost - sealingPrice;
                  profitPercent = (profit / sealingPrice) * 100;
                  console.log("profit 1 : ", profit);
            } else if (quantity >= product2Quantity && quantity < product3Quantity) {
                  // const productQuantityPrice = (total / quantity) * quantity;
                  // const countProfit = (product2QuantityPrice / product2Quantity) * quantity;
                  sealingPrice = quantity * product2QuantityPrice;
                  profit = productCost - sealingPrice;
                  profitPercent = (profit / sealingPrice) * 100;
            } else if (product3QuantityPrice < 1) {
                  sealingPrice = quantity * product2QuantityPrice;
                  profit = productCost - sealingPrice;
                  profitPercent = (profit / sealingPrice) * 100;
            } else if (quantity >= product3Quantity) {
                  sealingPrice = quantity * product3QuantityPrice;
                  profit = productCost - sealingPrice;
                  profitPercent = (profit / sealingPrice) * 100;
            } else {
                  sealingPrice = total;
            }

            // ...

            setBanifit({
                  ...banifit,
                  productCost: updatedProductCost,
                  sellingPrice: sealingPrice,
                  profit: profit,
                  profitPercent: parseFloat(profitPercent).toFixed(2),
            });
      };


      const [selected_image, setSelected_image] = useState(false);
      const [image_list, setImage_list] = useState(
            variationData ? variationData.image : productFind?.images
      );


      useEffect(() => {
            if (!isLoading && productFind) {
                  console.log('new one com')
                  const firstVariation = productFind?.variations[0]; // Get the first variation

                  if (firstVariation) {
                        const sameNameVariations = productFind?.variations?.filter(
                              item => item.name === firstVariation.name // Compare with the name of the first variation
                        );
                        handleVariation(sameNameVariations)
                        // Set the first matched variation and update sizes
                        setVariationData(sameNameVariations?.[0] || null); // Set the first matching variation
                        setIndexSer(0); // Assuming indexSer is for the first variation
                        set_sizes(sameNameVariations); // Set all variations with the same name
                  } else {
                        // Handle cases where no variations are present
                        setVariationData(null);
                        setIndexSer(null);
                        set_sizes([]);
                  }
                  allUpdateInfo();
            }
      }, [productFind, isLoading]);




      useEffect(() => {
            if (variationData) {
                  setImage_list(variationData?.image);
            } else {
                  setImage_list(productFind?.images);
            }
      }, [variationData]);

      const path = useLocation();


      const handleDecrease = () => {
            if (quantity > 1) {
                  setQuantity(quantity - 1);
            }
      };

      const handleIncrease = () => {
            setQuantity(quantity + 1);
      };

      const handleManualInput = (e) => {
            const inputQuantity = parseInt(e.target.value, 10);

            if (!isNaN(inputQuantity) && inputQuantity > 0) {
                  setQuantity(inputQuantity);
            }
      };

      useEffect(() => {
            allUpdateInfo();
      }, [quantity]);
      useEffect(() => {
            console.log('okkkkk')
            allUpdateInfo();
      }, [quantity, indexSer, path.pathname]);

      const convertedRating = (2 / 10) * 5;

      const handleStore = (id, getway, userInfo) => {
            if (shopInfo) {
                  const data = {
                        shopId: shopInfo?.shopId,
                        shopName: shopInfo?.shopName,
                        shopUid: shopInfo?._id,
                        quantity: quantity,
                        sellingPrice: banifit.sellingPrice,
                        getway: getway,
                        userInfo,
                  };
                  console.log(data);
                  fetch(`https://doob.dev/api/v1/seller/web-store?id=${id}`, {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                  })
                        .then((res) => res.json())
                        .then((data) => {
                              showAlert("Success", "", "success");
                        });
            } else {
                  navigate("/sign-in");
            }
      };

      const [comment, setComment] = useState("");
      const [photo, setPhoto] = useState(null);
      const [invoice, setInvoice] = useState(false);

      const [rating, setRating] = useState(0);

      const handleCommentChange = (e) => {
            setComment(e.target.value);
      };

      const handlePhotoChange = (e) => {
            const selectedPhoto = e.target.files[0];
            setPhoto(selectedPhoto);
      };

      const handleRatingChange = (newRating) => {
            setRating(newRating);
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            const selectedFile = e.target.photo.files[0];
            const imageFormData = new FormData();
            imageFormData.append("image", selectedFile);

            try {
                  // Upload the image and get the URL
                  const imageUrl = await uploadImage(imageFormData);

                  // Construct imgData object with the image URL
                  const imgData = {
                        image: imageUrl,
                        link: window.location.href,
                  };

                  // Construct the data object for posting the comment
                  const data = {
                        name: userName ? userName : "", // Fixed 'user2' to 'user'
                        comment,
                        photo: imgData,
                        rating,
                        productId: myData?.data?._id,
                        shopId: myData?.data?.shopId,
                  };

                  // Post the comment data to the backend
                  const response = await fetch(
                        "https://doob.dev/api/v1/seller/add-new-comment",
                        {
                              method: "post",
                              headers: {
                                    "content-type": "application/json",
                                    "ngrok-skip-browser-warning": "69420",
                              },
                              body: JSON.stringify(data),
                        }
                  );

                  // Handle the response
                  const responseData = await response.json();
                  const user = responseData.user;
                  showAlert(" Comment sent Success", "", "success");
                  console.log(responseData, "uploaded");
            } catch (error) {
                  console.error("Error posting comment:", error);
            }
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

      const { data: comments = {}, refetch: reload } = useQuery({
            queryKey: ["comments"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/product-comment?id=${productFind?._id}`
                  );
                  const data = await res.json();
                  return data?.comments;
            },
      });
      const add_to_cart = (product) => {

            const productData = {
                  product_name: product?.name,
                  product_id: product?._id,
                  product_price: product?.price,
                  product_quantity: quantity,
                  product_image: product?.images[0]?.src,
                  product_seller: product?.shopId,
                  sellingPrice: banifit.sellingPrice,
                  delivery: product?.DeliveryCharge,
                  warehouse: product?.warehouse,
            };

            // need to save on localStorage

            const getCart =
                  JSON.parse(localStorage.getItem(`cart-product-${user._id}`)) || [];
            const productFind = getCart.find(
                  (item) => item.product_id === productData.product_id
            );

            console.log("product add in cart", getCart);

            if (productFind) {
                  productFind.product_quantity =
                        productFind.product_quantity + productData.product_quantity;
                  localStorage.setItem(`cart-product-${user._id}`, JSON.stringify(getCart));
            } else {
                  getCart.push(productData);
                  localStorage.setItem(`cart-product-${user._id}`, JSON.stringify(getCart));
            }

            showAlert(" Product Add in Cart", "", "success");
      };

      const balk_buy = () => {
            const product = productFind;
            const newData = {
                  product_id: product?._id,
                  product_seller: product?.shopId,
                  shopId: shopInfo?.shopId,
                  shopName: shopInfo?.shopName,
                  shopUid: shopInfo?._id,
                  seller: shopInfo?.seller,
                  quantity: 0,
                  sellingPrice: banifit.sellingPrice,
                  warehouse: product?.warehouse,
            };
            fetch(`https://doob.dev/api/v1/seller/balk-order-update`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newData),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        BrightAlert("Product added on your store");
                  });
            console.log(newData);
      };

      const {
            data: releventProduct = [],
            refetch,
            isLoading: loadingRelevent,
      } = useQuery({
            queryKey: ["releventExclusiveProduct"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/new-products");
                  const data = await res.json();
                  return data;
            },
      });


      const [variations, setVariations] = useState(null);
      const [disOn, setDisOn] = useState(false);
      const [showVariant, setShowVariant] = useState(productFind?.images);
      const blankImg = "https://doob.dev/api/v1/image/66036ed3df13bd9930ac229c.jpg";

      const handleImageClick = (imageUrl) => {
            setSelectedImage(imageUrl);
      };

      let imageList = productFind ? productFind?.images : [];
      const [selectedImage, setSelectedImage] = useState(
            imageList?.length > 0 ? imageList[0]?.src : blankImg
      );

      const [clickImage, setClickImage] = useState(
            imageList?.length > 0 ? imageList[0].src : ""
      );


      // const handleVariation = (variation) => {
      //       setVariations(variation);
      //       setShowVariant(
      //             variation?.image ? variation?.image : product?.data?.images
      //       );
      // };
      const handleVariation = (variation) => {


            const variantImages = variation[0]?.image || [];
            const variantThumb = Array.isArray(variation[0]?.singleImg) 
            ? variation[0].singleImg 
            : [variation[0]?.singleImg].filter(Boolean); // Ensure no `null` or `undefined`
            setSelected_image(variation[0]?.singleImg ??  variation[0]?.image[0])
           

            
            // Combine variantImages with imageList
            const mergedImages = [...imageList,...variantThumb, ...variantImages];

            setShowVariant(mergedImages);
            console.log(variation[0], 'variationx')
      };

      useEffect(() => {
            setVariations(productFind?.variations[0]);
            setShowVariant(productFind?.images);

            if (imageList?.length > 0) {
                  setSelectedImage(imageList[0]?.src);
            }
            else {

                  productFind?.featuredImage?.src
                        ?? blankImg;
            }
      }, [path.pathname]);



      const handleDownload = async () => {
            const zip = new JSZip();
            const imgFolder = zip.folder("images");

            const imagePromises = showVariant?.map(async (imageUrl, index) => {
                  const response = await fetch(imageUrl.src ?? imageUrl);
                  const blob = await response.blob();
                  imgFolder.file(`image${index + 1}.jpg`, blob);
            });

            await Promise.all(imagePromises);

            zip.generateAsync({ type: "blob" }).then((content) => {
                  saveAs(content, "images.zip");
            });
      };

      return (
            <section className="relative">
                  <div className="py-4">
                        <MetaHelmet
                              title={productFind?.metaTitle}
                              description={productFind?.metaDescription}
                              image={productFind?.MetaImage}
                        />



                        <div className="max-w-7xl  grid md:grid-cols-4 mx-auto mt-6 ">
                              <div className="flex flex-col md:flex-row md:col-span-3 border md:border-r-transparent border-gray-300 py-4">
                                    <div className="md:flex-1 md:px-4 px-2">
                                          <div>
                                                <div className="h-64  md:h-[22rem] rounded-lg bg-gray-100 mb-4">
                                                      <div className="h-64 border md:h-full rounded-lg bg-gray-100 mb-4 flex items-center justify-center bar overflow-hidden">
                                                            {selected_image ? (
                                                                  <img
                                                                        className="md:w-94 w-full object-cover h-full rounded-lg"
                                                                        src={selected_image}
                                                                        srcSet={selected_image}
                                                                        alt="product image"
                                                                  />
                                                            ) : (
                                                                  <div className="w-full">
                                                                        {productFind?.videos ? (
                                                                              <div className="w-full h-full relative">
                                                                                    <VideoPlayer thum={""} url={productFind?.videos} />
                                                                              </div>
                                                                        ) : (
                                                                              <img
                                                                                    className="md:w-94 w-full object-cover h-full rounded-lg"
                                                                                    src={productFind?.featuredImage?.src}
                                                                                    srcSet={productFind?.featuredImage?.src}
                                                                                    alt={productFind?.name}
                                                                              />
                                                                        )}
                                                                  </div>
                                                            )}
                                                      </div>
                                                </div>
                                                <div className="mt-3 grid md:grid-cols-8 grid-cols-5 gap-2">
                                                      {productFind?.videos && (
                                                            <button
                                                                  className="bg-[#00000081] text-white flex items-center justify-center rounded text-xl"
                                                                  onClick={() => setSelected_image(null)}
                                                            >
                                                                  <PiPlay />
                                                            </button>
                                                      )}
                                                      <div className="">
                                                            <button
                                                                  className="block relative w-full md:h-[50px] h-[60px] rounded bar overflow-hidden border"
                                                                  onClick={() => setSelected_image(productFind?.featuredImage?.src)}
                                                            >
                                                                  <img
                                                                        alt={productFind?.name}
                                                                        className="object-cover cursor-pointer block w-full h-full p-1 rounded-lg"
                                                                        src={productFind?.featuredImage?.src}
                                                                        srcSet={productFind?.featuredImage?.src}
                                                                  />
                                                            </button>
                                                      </div>
                                                      {console.log(image_list,'image_list')}
                                                      {Array.isArray(showVariant) &&
                                                            showVariant?.map((imageUrl, index) => (
                                                                  <div key={index} className="">
                                                                        <button
                                                                              className="block relative w-full md:h-[50px] h-[60px] rounded bar overflow-hidden border"
                                                                              onClick={() => setSelected_image(imageUrl?.src ?? imageUrl)}
                                                                        >
                                                                              <img
                                                                                    alt={`ecommerce${index + 1}`}
                                                                                    className="object-cover cursor-pointer block w-full h-full p-1 rounded-lg"
                                                                                    src={imageUrl?.src ?? imageUrl}
                                                                                    srcSet={imageUrl?.src ?? imageUrl}
                                                                              />
                                                                        </button>
                                                                  </div>
                                                            ))}

                                                      {productFind?.variations?.length && (
                                                            <button
                                                                  className="bg-primary  w-full h-full  ro flex items-center justify-center "
                                                                  onClick={handleDownload}
                                                            >
                                                                  <PiDownload className="text-3xl" />
                                                            </button>
                                                      )}
                                                </div>
                                          </div>
                                    </div>
                                    <br />
                                    <div className="md:flex-1 md:px-4 px-2">
                                          <div className="flex items-center">
                                                {productFind?.variantData[indexSer]?.product2?.quantity > quantity ? (
                                                      <p className="text-sm font-medium text-green-400 ml-1 flex items-center">
                                                            <MdDone className="text-green-400" /> In Stock
                                                      </p>
                                                ) : (
                                                      <p className="text-sm font-medium text-red-400 ml-1 flex items-center">
                                                            <MdDone className="text-red-400" /> Out Stock
                                                      </p>
                                                )}
                                          </div>

                                          <h2 className=" leading-tight tracking-tight font-bold text-gray-800 text-xl">
                                                {productFind?.name}
                                          </h2>
                                          <div>



                                                {user ? (
                                                      <div className="my-2">
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-red-100 py-3 md:text-md px-2">
                                                                  <div className=" text-start sm:text-center md:border-r-2 border-gray-400">
                                                                        <h6 className="font-bold text-xl">
                                                                              <span className="kalpurush">৳</span>
                                                                              {isNaN(banifit.sellingPrice)
                                                                                    ? "0"
                                                                                    : parseInt(banifit.sellingPrice)}
                                                                        </h6>

                                                                        <p className="text-sm text-[#606060]">
                                                                              Product Costing
                                                                        </p>
                                                                  </div>
                                                                  <div className="text-start sm:text-center  md:border-r-2 border-gray-400">
                                                                        <h6 className="font-bold text-xl text-red-400">
                                                                              <span className="kalpurush">৳</span>
                                                                              {isNaN(banifit.productCost)
                                                                                    ? "0"
                                                                                    : parseInt(banifit.productCost)}
                                                                        </h6>
                                                                        <p className="text-sm text-[#606060]">
                                                                              Selling Price
                                                                        </p>
                                                                  </div>
                                                                  <div className="text-start sm:text-center  md:border-r-2 border-gray-400">
                                                                        <h6 className="font-bold text-xl">
                                                                              <span className="kalpurush">৳</span>
                                                                              {isNaN(banifit.profit)
                                                                                    ? "0"
                                                                                    : parseInt(banifit.profit)}
                                                                        </h6>
                                                                        <p className="text-sm text-[#606060]">Your Profit</p>
                                                                  </div>
                                                                  <div className="text-start sm:text-center ">
                                                                        <h6 className="font-bold text-xl">
                                                                              {isNaN(banifit.profitPercent)
                                                                                    ? "0"
                                                                                    : parseInt(banifit.profitPercent)}
                                                                              %
                                                                        </h6>
                                                                        <p className="text-sm text-[#606060]">Your Profit</p>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                ) : (
                                                      <div className="my-3">
                                                            <div className="grid grid-cols-2 md:grid-cols-4 bg-red-100 py-3 px-2">
                                                                  <div className="text-start sm:text-center  md:border-r-2 border-gray-400">
                                                                        <h6 className="font-bold text-xl text-red-400">0</h6>
                                                                        <p className="text-sm text-[#606060]">
                                                                              Product Costing
                                                                        </p>
                                                                  </div>
                                                                  <div className="text-start sm:text-center  md:border-r-2 border-gray-400">
                                                                        <h6 className="font-bold text-xl">0</h6>
                                                                        <p className="text-sm text-[#606060]">
                                                                              Selling Price
                                                                        </p>
                                                                  </div>
                                                                  <div className="text-start sm:text-center  md:border-r-2 border-gray-400">
                                                                        <h6 className="font-bold text-xl">0</h6>
                                                                        <p className="text-sm text-[#606060]">Your Profit</p>
                                                                  </div>
                                                                  <div className="text-start sm:text-center ">
                                                                        <h6 className="font-bold text-xl">{0}%</h6>
                                                                        <p className="text-sm text-[#606060]">Your Profit</p>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                )
                                                }
                                                {user ? (
                                                      <div className="my-3">
                                                            <div className={`grid gap-3 grid-cols-2 ${productFind?.variantData[indexSer]?.product3?.quantityPrice > 1 ? 'md:grid-cols-3' : 'md:grid-cols-2'} bg-red-100 py-3 px-2`}>
                                                                  <div className="text-start   md:border-r-2 border-gray-400">
                                                                        <h6 className="font-bold text-center text-xl text-red-400">
                                                                              <span className="kalpurush font-extrabold">৳</span>{productFind?.variantData[indexSer]?.product1?.quantityPrice}

                                                                        </h6>
                                                                        <p className="text-sm text-[#606060]">
                                                                              <div className="flex justify-center text-gray-500 text-lg space-x-1">
                                                                                    <h2>
                                                                                          {productFind?.variantData[indexSer]?.product1?.quantity}
                                                                                    </h2>
                                                                                    <span>-</span>
                                                                                    <h2>
                                                                                          {productFind?.variantData[indexSer]?.product2?.quantity -
                                                                                                1}
                                                                                    </h2>{" "}
                                                                                    <span>Qty</span>
                                                                              </div>

                                                                        </p>
                                                                  </div>

                                                                  <div className="text-start   md:border-r-2 border-gray-400">
                                                                        <h6 className="font-bold text-center text-xl text-red-400">
                                                                              <span className="kalpurush">৳</span>{productFind?.variantData[indexSer]?.product2?.quantityPrice}
                                                                        </h6>

                                                                        <div className="flex justify-center text-gray-500 text-lg space-x-1">
                                                                              <div className="flex justify-start text-lg text-gray-500 space-x-1">
                                                                                    <h2>
                                                                                          {productFind?.variantData[indexSer]?.product2?.quantity}
                                                                                    </h2>
                                                                                    <span>-</span>
                                                                                    <h2>
                                                                                          {productFind?.variantData[indexSer]?.product3?.quantityPrice < 1 ? (
                                                                                                // Show this content if quantityPrice is less than 1
                                                                                                <span>Unlimited</span>
                                                                                          ) : (
                                                                                                // Otherwise, show this text
                                                                                                <span><span className="kalpurush">৳</span>{productFind?.variantData[indexSer]?.product3?.quantity - 1}</span>
                                                                                          )}

                                                                                    </h2>
                                                                                    <span>Qty</span>
                                                                              </div>
                                                                        </div>

                                                                  </div>
                                                                  {productFind?.variantData[indexSer]?.product3?.quantityPrice > 1 && (
                                                                        <div className="text-start  ">
                                                                              <h6 className="font-bold text-center text-xl text-red-400">
                                                                                    <span className="kalpurush">৳</span>{productFind?.variantData[indexSer]?.product3?.quantityPrice}
                                                                              </h6>
                                                                              <h2 className="flex justify-center text-lg text-gray-500 space-x-1">
                                                                                    {productFind?.variantData[indexSer]?.product3?.quantity} -
                                                                                    Unlimited
                                                                              </h2>

                                                                              <p className="text-sm text-[#606060]">

                                                                              </p>
                                                                        </div>
                                                                  )}
                                                            </div>
                                                      </div>
                                                ) : (
                                                      <div className="my-3">
                                                            <div className=" bg-red-100 p-3">
                                                                  <p className="tracking-wide ">
                                                                        <Link
                                                                              className="text-[18px] text-nowrap text-center text-red-500"
                                                                              to={"/sign-in"}
                                                                        >
                                                                              Login to view Price
                                                                        </Link>
                                                                  </p>
                                                            </div>
                                                      </div>
                                                )
                                                }
                                          </div>

                                          <div className="flex flex-col gap-2 mb-3">
                                                <p className="capitalize">Variations : {variationData?.name}</p>
                                                <div className="flex flex-wrap gap-3">

                                                      {[...new Map(productFind?.variations?.map(variation => [variation.name, variation])).values()]
                                                            .map((variation, index) => {
                                                                  // Get the first variation with the same name to use its image
                                                                  const firstSameNameVariation = productFind?.variations?.find(item => item.name === variation.name);

                                                                  return (
                                                                        <div
                                                                              onClick={() => {
                                                                                    // Filter all variations with the same name
                                                                                    const sameNameVariations = productFind?.variations?.filter(
                                                                                          item => item.name === variation.name
                                                                                    );
                                                                                    handleVariation(sameNameVariations)
                                                                                    setVariationData(firstSameNameVariation); // Set all variations with the same name
                                                                                    setIndexSer(index);
                                                                                    set_sizes(sameNameVariations); // Set sizes based on the filtered variations
                                                                              }}
                                                                              className={`w-[50px] capitalize border rounded p-1 h-[50px] object-cover`}
                                                                              key={index}
                                                                        >
                                                                              <img
                                                                                    className="w-full h-full"
                                                                                    // Use the image from the first variation with the same name
                                                                                    src={firstSameNameVariation.singleImg ? firstSameNameVariation.singleImg : firstSameNameVariation?.image || 'default-image-url.jpg'}
                                                                                    alt={variation?.name}
                                                                              />
                                                                        </div>
                                                                  );
                                                            })
                                                      }


                                                </div>

                                          </div>



                                          {sizes && sizes.length > 1 && (
                                                <div className="capitalize">

                                                      Size: {variationData.size}
                                                      <div className="flex flex-wrap gap-2 my-2">
                                                            {sizes.map((variation, index) => (
                                                                  <div
                                                                        onClick={() => {
                                                                              setVariationData(variation);
                                                                              setIndexSer(index);
                                                                        }}
                                                                        className={`border capitalize rounded p-1 h-[50px] flex items-center justify-center cursor-pointer hover:bg-gray-200`}
                                                                        key={index}
                                                                  >
                                                                        {variation?.size}
                                                                  </div>
                                                            ))}
                                                      </div>
                                                </div>
                                          )}




                                          <div className="md:flex hidden py-4 space-x-4">
                                                <div>
                                                      <label htmlFor="Quantity" className="sr-only">
                                                            {" "}
                                                            Quantity{" "}
                                                      </label>

                                                      <div className="flex items-center gap-1">
                                                            <button
                                                                  type="button"
                                                                  onClick={handleDecrease}
                                                                  className="md:w-6 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                                            >
                                                                  -
                                                            </button>

                                                            <input
                                                                  type="number"
                                                                  id="Quantity"
                                                                  value={quantity}
                                                                  onChange={handleManualInput}
                                                                  className="h-10 w-12 rounded border px-1 text-center border-gray-900 [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                                            />

                                                            <button
                                                                  type="button"
                                                                  onClick={handleIncrease}
                                                                  className="w-6 h-10 leading-10 text-gray-600 transition hover:opacity-75 "
                                                            >
                                                                  +
                                                            </button>
                                                      </div>
                                                </div>

                                               {productFind?.variations?.[indexSer]?.quantity > quantity ? (

                                                      <>
                                                            <div className="md:block hidden">
                                                                  {shopInfo ? (
                                                                        <button
                                                                              onClick={balk_buy}
                                                                              className="h-10 md:px-4 flex items-center px-2 whitespace-nowrap py-2 text-sm rounded bg-orange-600 hover:bg-orange-500 text-white"
                                                                              type="button"
                                                                        >
                                                                              Add Store
                                                                        </button>
                                                                  ) : (
                                                                        <Link
                                                                              to={"/sign-in"}
                                                                              className="h-10 md:px-4 flex items-center px-2 whitespace-nowrap py-2 text-sm rounded bg-orange-600 hover:bg-orange-500 text-white"
                                                                              type="button"
                                                                        >
                                                                              Add Store
                                                                        </Link>
                                                                  )}
                                                            </div>


                                                            <div className=" md:flex hidden flex-wrap gap-2">
                                                                  {shopInfo ? (
                                                                        <button
                                                                              onClick={() => setInvoice(productFind?._id)}
                                                                              type="button"
                                                                              className="h-10 flex  items-center md:px-6 px-4 py-2 text-sm rounded bg-indigo-600 hover:bg-indigo-500 text-white text-nowrap"
                                                                        >
                                                                              Buy Now
                                                                        </button>
                                                                  ) : (
                                                                        <Link
                                                                              to={"/sign-in"}
                                                                              type="button"
                                                                              className="h-10 flex  items-center md:px-6 px-4 py-2 text-sm rounded bg-indigo-600 hover:bg-indigo-500 text-white text-nowrap"
                                                                        >
                                                                              Buy Now
                                                                        </Link>
                                                                  )}

                                                                  <button
                                                                        onClick={() => add_to_cart(productFind)}
                                                                        type="button"
                                                                        className="h-10 md:px-8 px-2 py-2 text-sm rounded bg-gray-600 hover:bg-gray-500 text-white text-nowrap"
                                                                  >
                                                                        <TbShoppingBagPlus className="text-2xl" />
                                                                  </button>

                                                            </div>
                                                      </>
                                                ) : (
                                                      <p className="rounded border py-2 border-red-500 w-full text-sm font-medium text-red-400 ml-1   text-center">
                                                            Out Stock
                                                      </p>
                                                )}
                                                {invoice && (
                                                      <ModalForPayment
                                                            quantity={quantity}
                                                            seller={productFind.shopId}
                                                            product={productFind}
                                                            handleStore={handleStore}
                                                            invoice={invoice}
                                                            setInvoice={setInvoice}
                                                            sellingPrice={banifit.sellingPrice}
                                                            banifit={banifit}
                                                      />
                                                )}
                                          </div>


                                          <div className="bg-[#fdfdfd] fixed-shadow md:hidden shadow-xl flex  gap-2 items-center fixed bottom-0 h-[65px] right-0 w-screen px-2 z-[700]">
                                                {shopInfo ? (
                                                      <button
                                                            onClick={balk_buy}
                                                            className="h-10 w-full md:px-4 flex justify-center items-center px-2 whitespace-nowrap py-2 text-sm rounded bg-orange-600 hover:bg-orange-500 text-white"
                                                            type="button"
                                                      >
                                                            Add Store
                                                      </button>
                                                ) : (
                                                      <Link
                                                            to={"/sign-in"}
                                                            className="h-10 w-full justify-center md:px-4 flex items-center px-2 whitespace-nowrap py-2 text-sm rounded bg-orange-600 hover:bg-orange-500 text-white"
                                                            type="button"
                                                      >
                                                            Add Store
                                                      </Link>
                                                )}

                                                <div className="flex text-center flex-wrap gap-2">
                                                      {shopInfo ? (
                                                            <button
                                                                  onClick={() => setInvoice(productFind?._id)}
                                                                  type="button"
                                                                  className="h-10 w-full flex items-center text-center justify-center  py-2 text-sm rounded bg-indigo-600 hover:bg-indigo-500 text-white text-nowrap"
                                                            >
                                                                  Buy Now
                                                            </button>
                                                      ) : (
                                                            <Link
                                                                  to={"/sign-in"}
                                                                  type="button"
                                                                  className="h-10 w-[110px] flex items-center text-center justify-center py-2 text-sm rounded bg-indigo-600 hover:bg-indigo-500 text-white text-nowrap"
                                                            >
                                                                  Buy Now
                                                            </Link>
                                                      )}
                                                </div>
                                                <button
                                                      onClick={() => add_to_cart(productFind)}
                                                      type="button"
                                                      className="h-10 md:px-8 w-full px-2 flex justify-center py-2 text-sm rounded bg-gray-600 hover:bg-gray-500 text-white text-nowrap"
                                                >
                                                      <TbShoppingBagPlus className="text-2xl" />
                                                </button>
                                          </div>

                                          <div className="md:hidden flex items-center w-full border border-indigo-500 rounded text-lg bar overflow-hidden h-[40px]">
                                                <button
                                                      onClick={handleDecrease}
                                                      className="bg-indigo-500 text-white px-2 h-full w-full"
                                                >
                                                      -
                                                </button>
                                                <input
                                                      value={quantity}
                                                      onChange={handleManualInput}
                                                      type="number"
                                                      className="bg-transparent h-full text-black text-center w-[150px] "
                                                />
                                                <button
                                                      onClick={handleIncrease}
                                                      className="bg-indigo-500 text-white px-2 h-full w-full"
                                                >
                                                      +
                                                </button>
                                          </div>
                                    </div>
                              </div>

                              <div className="border hidden md:block w-full">
                                    <div className="px-2 md:px-4 py-4">
                                          <h2 className="text-lg font-semibold mb-4">New Exclusive</h2>
                                          <div className="space-y-4">
                                                {loadingRelevent && <LoaderData />}
                                                {releventProduct?.slice(0, 3)?.map((product, index) => (
                                                      <Link
                                                            to={`/products/${product?._id}`}
                                                            key={product?._id}
                                                            className="border w-full duration-150 group hover:shadow-lg flex items-start gap-2 p-3 rounded"
                                                      >
                                                            <img
                                                                  alt={product?.name}
                                                                  className="w-20 h-20 bg-gray-200 rounded mb-2"
                                                                  height="80"
                                                                  src={
                                                                        product?.featuredImage?.src
                                                                              ? product?.featuredImage?.src
                                                                              : product?.images[0]?.src
                                                                  }
                                                                  style={{
                                                                        aspectRatio: "80/80",
                                                                        objectFit: "cover",
                                                                  }}
                                                                  width="80"
                                                            />
                                                            <div className="">
                                                                  <p className="font-medium group-hover:text-blue-500 duration">
                                                                        {product?.name?.slice(0, 50)}
                                                                  </p>
                                                                  {/* <p className="text-red-500">৳{product?.price}</p> */}

                                                                  <p className="tracking-wide ">
                                                                        {user ? (
                                                                              <div className="flex gap-3">

                                                                                    <div>
                                                                                          <span className="kalpurush">৳</span>{" "}
                                                                                          {product?.variantData?.[0]?.product1?.quantityPrice ?? 0}


                                                                                    </div>

                                                                              </div>
                                                                        ) : (
                                                                              <Link
                                                                                    className="text-[12px] text-red-500"
                                                                                    to={"/sign-up"}
                                                                              >
                                                                                    Login to view Price
                                                                              </Link>
                                                                        )}
                                                                  </p>
                                                            </div>
                                                      </Link>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <div className="max-w-7xl m-auto  my-6">
                        {/* comment form */}
                        {user && (
                              <div className="bg-gray-100 hidden py-2 px-3">
                                    <form
                                          className="border-b border-gray-400 mx-auto mt-2"
                                          onSubmit={handleSubmit}
                                    >
                                          <div className="mb-4">
                                                <label
                                                      htmlFor="comment"
                                                      className="block text-gray-700 text-sm font-bold mb-2"
                                                >
                                                      Comment
                                                </label>
                                                <textarea
                                                      id="comment"
                                                      name="comment"
                                                      placeholder="write your comment..."
                                                      rows="4"
                                                      value={comment}
                                                      onChange={handleCommentChange}
                                                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                                ></textarea>
                                          </div>

                                          <div className="mb-4">
                                                <label
                                                      htmlFor="photo"
                                                      className="block text-gray-700 text-sm font-bold mb-2"
                                                >
                                                      Upload Photo
                                                </label>
                                                <input
                                                      type="file"
                                                      id="photo"
                                                      name="photo"
                                                      onChange={handlePhotoChange}
                                                      className="w-full border bg-white border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-indigo-500"
                                                />
                                          </div>

                                          <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                      Rating
                                                </label>
                                                <StarRating
                                                      rating={rating}
                                                      onRatingChange={handleRatingChange}
                                                />
                                          </div>

                                          <div className="mb-6">
                                                <button
                                                      type="submit"
                                                      className="bg-indigo-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-indigo-700"
                                                >
                                                      Post Comment
                                                </button>
                                          </div>
                                    </form>
                              </div>
                        )}
                        <div className="bg-white hidden p-2 mt-8">
                              <h3 className="mt-2 font-semibold pb-4">All Comment</h3>
                              {Array.isArray(comments) &&
                                    comments.map((comment, index) => (
                                          <div key={comment?._id} className="flex mb-3">
                                                <div className="flex-shrink-0  mr-3">
                                                      <div className="mt-2 rounded-full bg-gray-100 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
                                                            {comment?.name ? comment?.name.charAt(0) : "🙎‍♂️"}
                                                      </div>
                                                </div>
                                                <div className="flex-1 border bg-gray-50 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                                      <h5 className="font-[500]">{comment?.name}</h5>{" "}
                                                      <p className="text-sm text-gray-500">{comment?.comment}</p>
                                                </div>
                                          </div>
                                    ))}
                        </div>
                        {/* end comment */}

                        <br />

                  </div>
                  <div className="max-w-7xl mx-auto  my-6">
                        <div className="flex  gap-3 items-center border-b ">
                              <h2 onClick={() => setActive('desc')}
                                    className={active === 'desc' ? "bg-green-500 py-2 px-5 rounded cursor-pointer" : " py-2 cursor-pointer px-5 rounded"}

                              >
                                    <span className="font-medium  sm lg:text-lg ">
                                          Description
                                    </span>
                              </h2>

                              <h2 className={active === 'review' ? "bg-green-500 py-2 px-5 rounded cursor-pointer" : "cursor-pointer py-2 px-5 rounded"} onClick={() => setActive('review')}>
                                    <span className="font-medium lg:text-lg ">
                                          Review
                                    </span>
                              </h2>

                        </div>
                  </div>
                  <div className="max-w-7xl mx-auto  my-6">
                        {productFind?.description && active == 'desc' && (
                              <div className="border bar overflow-hidden p-6 rounded">
                                    <ProductDescription
                                          metaTitle={productFind?.metaTitle}
                                          description={productFind?.description}
                                          shortDescription={productFind?.shortDescription}
                                          productFind={productFind}
                                    />
                              </div>
                        )}
                  </div>
                  {comments && active == 'review' && (
                        <div className="max-w-7xl mx-auto  my-6">
                              <div className="border md:p-6 p-3 rounded">
                                    <ProductReviews comments={comments} />
                              </div>
                        </div>
                  )}


                  <div className="border sm:block md:hidden w-full">
                        <div className="px-2 md:px-4 py-4">
                              <h2 className="text-lg font-semibold mb-4">New Exclusive</h2>
                              <div className="space-y-4">
                                    {loadingRelevent && <LoaderData />}

                                    {Array.isArray(releventProduct) && releventProduct.slice(0, 3).map((product, index) => (
                                          <Link
                                                to={`/products/${product?._id}`}
                                                key={product?._id}
                                                className="border w-full duration-150 group hover:shadow-lg flex items-start gap-2 p-3 rounded"
                                          >
                                                <img

                                                      alt={product?.name}

                                                      className="w-20 h-20 bg-gray-200 rounded mb-2"
                                                      height="80"
                                                      src={
                                                            product?.featuredImage?.src
                                                                  ? product?.featuredImage?.src
                                                                  : product?.images[0]?.src
                                                      }
                                                      style={{
                                                            aspectRatio: "80/80",
                                                            objectFit: "cover",
                                                      }}
                                                      width="80"
                                                />
                                                <div className="">
                                                      <p className="font-medium group-hover:text-blue-500 duration">
                                                            {product?.name?.slice(0, 50)}
                                                      </p>
                                                      {/* <p className="text-red-500">৳{product?.price}</p> */}

                                                      <p className="tracking-wide ">
                                                            {user ? (
                                                                  <div className="flex gap-3">

                                                                        <div>
                                                                              <span className="kalpurush">৳</span>{" "}
                                                                              {product?.variantData?.[0]?.product1?.quantityPrice ?? 0}

                                                                        </div>

                                                                  </div>
                                                            ) : (
                                                                  <Link
                                                                        className="text-[12px] text-red-500"
                                                                        to={"/sign-up"}
                                                                  >
                                                                        Login to view Price
                                                                  </Link>
                                                            )}
                                                      </p>
                                                </div>
                                          </Link>
                                    ))}
                              </div>
                        </div>
                  </div>
                  <div className="max-w-7xl mx-auto my-6">
                        <div className="border pt-2 rounded">
                              <ReleventProduct productFind={productFind} />
                        </div>
                  </div>
                  {/* <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">
        <div className="border p-6 rounded">
          <TrendingProducts />
        </div>
      </div> */}
            </section>
      );
};

export default ProductDetails;
