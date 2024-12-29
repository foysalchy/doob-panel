import React, { useContext, useEffect, useState,useRef } from "react";
import { BsCart2, BsDownload } from "react-icons/bs";
import {
      FaBasketShopping,
      FaCircle,
      FaFacebook,
      FaInstagram,
      FaXTwitter,
} from "react-icons/fa6";

import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import {
      Link,
      useLoaderData,
      useLocation,
      useNavigate,
} from "react-router-dom";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
import MetaHelmet from "../../../../../Helmate/Helmate";
import { PiCopy, PiDownload, PiPlay } from "react-icons/pi";
import VideoPlayer from "../../../../../Hooks/VideoPlayer";

import SellerTopSellingProduct from "../SellerTopSellingProduct/SellerTopSellingProduct";
import ProductReviews from "../../../../Home/Product/ProductDetails/ProductReviews";
import LoaderData from "../../../../../Common/LoaderData";
import showAlert from "../../../../../Common/alert";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const ProductInformation = () => {
      const product = useLoaderData();
      // const [selectedImage, setSelectedImage] = useState(product.data.featuredImage.src);
      const [quantity, setQuantity] = useState(1);
      const location = useLocation();
      const [loader, setLoader] = useState(false);
      const [active, setActive] = useState('desc');
      const { shop_id, shopUser, setSelectProductData } =
            useContext(ShopAuthProvider);

      const pathname = window.location.pathname;
      const idMatch = pathname.match(/\/shop\/([^/]+)/);
      const shopId = idMatch ? idMatch[1] : null;
      const [sizes, set_sizes] = useState([]);
      const [selectedSize, setSelectedSize] = useState(null)

      const {
            data: shop = {},
      } = useQuery({
            queryKey: ["shop"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/${shopId}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const [variations, setVariations] = useState(null);
      const [disOn, setDisOn] = useState(false);

      const [imageList, setImageList] = useState([
            product?.data?.featuredImage,
            ...product?.data?.images,
      ]);

      const [showVariant, setShowVariant] = useState(imageList);
      const blankImg = "https://doob.dev/api/v1/image/66036ed3df13bd9930ac229c.jpg";

      const handleImageClick = (imageUrl) => {
            setSelectedImage(imageUrl);
      };



      const [selectedImage, setSelectedImage] = useState(
            imageList.length > 0 ? imageList[0]?.src : blankImg
      );

      const [clickImage, setClickImage] = useState(
            imageList.length > 0 ? imageList[0].src : ""
      );

      const path = useLocation();
      const handleVariation = (variation) => {

            const variantImages = variation?.image || [];
            const productImages = product?.data.images || [];


            // Combine variantImages with imageList
            const mergedImages = [...imageList, ...variantImages];

            setShowVariant(mergedImages);
            console.log(showVariant, 'variationx')
      };



      useEffect(() => {
            setVariations(product?.data?.variations[0]);
            setShowVariant(product?.data.images);
            set_sizes(product?.data?.variations[0]);

            if (imageList.length > 0) {
                  setSelectedImage(imageList[0]?.src);
            } else {
                  product?.data?.featuredImage?.src
                        ? product?.data?.featuredImage?.src
                        : blankImg;
            }
      }, [path.pathname]);

      useEffect(() => {

            set_sizes(product?.data?.variations[0]);
      }, [product]);

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

      const addToCart = (data) => {
            setLoader(true);
            const product = data.data;
            const addToCard = {
                  userId: shopUser?._id,
                  quantity: quantity,
                  img: selectedImage,
                  productName: variations?.name
                        ? `${product.name} - ${variations?.name}`
                        : product.name,
                  price:
                        variations?.offerPrice !== undefined
                              ? variations.offerPrice
                              : variations?.price !== undefined
                                    ? variations.price
                                    : product.price,
                  regular_price: product.regular_price,
                  warehouse: product.warehouse,
                  productId: product._id,
                  shopId: shop_id.shop_id,
                  variations,
                  selectedSize,
                  delivery_charge: parseInt(product?.DeliveryCharge) ?? 40,
            };

            if (!shopUser) {
                  const getData = localStorage.getItem(`addToCart-${shopId}`);
                  const cartProduct = JSON.parse(getData);
                  if (cartProduct) {
                        const existingProductIndex = cartProduct.findIndex(
                              (item) => item.productId === addToCard.productId
                        );
                        if (existingProductIndex !== -1) {
                              // Update the quantity of the existing product
                              cartProduct[existingProductIndex].quantity += quantity;
                              localStorage.setItem(`addToCart-${shopId}`, JSON.stringify(cartProduct));
                              showAlert("Product quantity updated in cart", "", "success");
                        } else {
                              // Add the product to the cart
                              const updatedCart = [...cartProduct, addToCard];
                              localStorage.setItem(`addToCart-${shopId}`, JSON.stringify(updatedCart));
                              showAlert("Product added to cart", "", "success");
                        }
                  } else {
                        localStorage.setItem(`addToCart-${shopId}`, JSON.stringify([addToCard]));
                        showAlert("Product added to cart", "", 'success');
                  }
                  setLoader(false);
            } else {
                  try {
                        fetch(
                              `https://doob.dev/api/v1/shop/user/add-to-cart?token=${shopUser._id}`,
                              {
                                    method: "POST",
                                    headers: {
                                          "Content-Type": "application/json",
                                          "ngrok-skip-browser-warning": "69420",
                                    },
                                    body: JSON.stringify(addToCard),
                              }
                        )
                              .then((res) => res.json())
                              .then((data) => {
                                    // console.log("🚀 ~ .then ~ data:", data);
                                    setLoader(false);
                                    BrightAlert(data.message);
                                    console.log(data);
                              });
                  } catch (error) {
                        console.log(error);
                  }
            }
      };
      const [guest, setGuest] = useState(true);
      const { data: new_products = [] } = useQuery({
            queryKey: ["new_products"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/product/${shop_id.shop_id}/new-product`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const navigate = useNavigate();
      const buyNowHandler = (data) => {
            const product = data.data;
            const userId = shopUser?._id || 0;


            if (!userId && !guest) {
                  console.log(location?.pathname, "shop");
                  // addToCart(data);
                  navigate(`/shop/${shopId}/sign-in`, {
                        replace: true,
                        state: { from: location?.pathname },
                  });
            } else {
                  const buyNowInfo = [
                        {
                              userId: userId,
                              quantity: quantity,
                              img: selectedImage,
                              productName: variations?.name
                                    ? `${product.name} - ${variations?.name}`
                                    : product.name,
                              price:
                                    variations?.offerPrice !== undefined
                                          ? variations.offerPrice
                                          : variations?.price !== undefined
                                                ? variations.price
                                                : product.price,
                              regular_price: product.regular_price,
                              productId: product._id,
                              shopId: shop_id.shop_id,
                              warehouse: product.warehouse,
                              selectedSize,
                              variations,
                              delivery_charge: parseInt(product?.DeliveryCharge) ?? 40,
                        },
                  ];
                  setSelectProductData(buyNowInfo);
                  navigate(
                        `/shop/${shopId}/user/order?shop_id=${shop_id.shop_id}&userId=${userId}`
                  );
            }
      };

      const {
            data: comments = {},
            isLoading,
            refetch,
      } = useQuery({
            queryKey: ["comments"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/product-comment?id=${product?.data?._id}`
                  );
                  const data = await res.json();
                  return data?.comments;
            },
      });

      const totalStars =
            comments?.length &&
            comments?.reduce((total, comment) => total + comment.star, 0) /
            comments?.length;

      const convertedRating = (` ${totalStars}` / 10) * 5 || 0;


      const queryURL = (() => {
            let url = `https://doob.dev/api/v1/seller/relavent-products?shopId=${shop_id?.shop_id}`;

            const relaventBrand = product?.data?.brandName;
            const relaventCategories = product?.data?.categories
                  ?.filter((item) => item?.name !== "")
                  .map((item) => item?.name);
            const relaventWarehouse = product?.data?.warehouse
                  ?.filter((item) => item?.name !== "")
                  .map((item) => item?.name);

            if (relaventBrand) {
                  url += `&brandName=["${relaventBrand}"]`;
            }

            if (relaventCategories.length > 0) {
                  url += `&categories=[${relaventCategories
                        .map((category) => `"${category}"`)
                        .join(",")}]`;
            }

            if (relaventWarehouse.length > 0) {
                  url += `&warehouse=[${relaventWarehouse
                        .map((warehouse) => `"${warehouse}"`)
                        .join(",")}]`;
            }

            return url;
      })();

      // console.log(queryURL);

      // console.log(queryURL);
      const {
            data: releventProduct = [],
            reload,
            isLoading: loadingRelevent,
      } = useQuery({
            queryKey: ["releventProductData"],
            queryFn: async () => {
                  const res = await fetch(queryURL);
                  const data = await res.json();
                  return data;
            },
      });


      const handleDownload = async () => {
            const zip = new JSZip();
            const imgFolder = zip.folder("images");



            const imagePromises = showVariant.map(async (imageUrl, index) => {
                  const response = await fetch(imageUrl.src ?? imageUrl);
                  const blob = await response.blob();
                  imgFolder.file(`image${index + 1}.jpg`, blob);
            });

            await Promise.all(imagePromises);

            zip.generateAsync({ type: "blob" }).then((content) => {
                  saveAs(content, "images.zip");
            });
      };

      const [copyStatus, setCopyStatus] = useState(false);
      const handleCopyDescription = () => {
            const description = product?.data?.description;
            if (description) {
                  navigator.clipboard
                        .writeText(description)
                        .then(() => {
                              setCopyStatus(true);
                              setTimeout(() => {
                                    setCopyStatus(false);
                              }, 3000);
                        })
                        .catch((err) => {
                              console.error("Failed to copy description: ", err);
                        });
            }
      };



      useEffect(() => {
            if (product?.data?.variations?.length) {
                  // Get the first unique variation
                  const uniqueVariations = [...new Map(product.data.variations.map(variation => [variation.name, variation])).values()];
                  const firstVariation = uniqueVariations[0];

                  console.log(firstVariation, 'firstVariation');

                  if (firstVariation) {
                        const firstSameNameVariation = product.data.variations.find(item => item.name === firstVariation.name);
                        const sameNameVariations = product.data.variations.filter(item => item.name === firstVariation.name);
                        set_sizes(sameNameVariations);
                        handleVariation(firstSameNameVariation);
                        setVariations(sameNameVariations[0]);
                  }
            }
      }, [product]);

      const containerRef = useRef(null);


      const [innerHeight, setInnerHeight] = useState(false);

            useEffect(() => {
              // Function to check height
              const checkHeight = () => {
            //     if (containerRef.current) {
            //       const height = containerRef.current.clientHeight;
            //       if (height > 700) {
                  
            //         setInnerHeight(true)
            //       } else {
                    
            //         setInnerHeight(false)
            //       }
            //       console.log(innerHeight,height,'heightheight')
            //     }
            setInnerHeight(true)
              };
        
              // Check height on mount and resize
              checkHeight();
              window.addEventListener('resize', checkHeight);
          
              // Cleanup on unmount
              return () => {
                window.removeEventListener('resize', checkHeight);
              };
            }, [product,path.pathname]);



      return (
            <section className="px-2 py-4  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 mx-auto">
                  <MetaHelmet
                        title={product.data.metaTitle}
                        description={product.data.metaDescription}
                        image={product.data.MetaImage}
                  />
                  <div className="py-4">
                        {/* Breadcrumbs */}
                        <div className="w-[100%] bg-green mx-auto px-4 md:px-4 lg:px-12 ">
                              <div className="flex flex-wrap items-center space-x-2 text-gray-400  text-sm">
                                    <Link
                                          to={`/shop/${shopId}`}
                                          className="hover:underline hover:text-gray-600"
                                    >
                                          Home
                                    </Link>
                                    {product.data.categories
                                          .filter((category) => category && category.name)
                                          .map((category, index) => [
                                                <span key={`arrow-${index}`}>
                                                      <svg
                                                            className="h-5 w-5 leading-none text-gray-300"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M9 5l7 7-7 7"
                                                            />
                                                      </svg>
                                                </span>,
                                                <Link
                                                      key={`category-${index}`}
                                                      to={`/shop/${shopId}/categories/${shop_id.shop_id}/${category.name}`}
                                                      className="hover:underline hover:text-gray-600"
                                                >
                                                      {category?.name}
                                                </Link>,
                                          ])}
                              </div>
                        </div>
                        <div className="md:grid md:grid-cols-4">
                              <div className="col-span-3 mx-auto border border-gray-300 px-4 md:px-4 lg:px-12 mt-6 ">
                                    <div className="flex flex-col md:flex-row -mx-4  border-gray-300 py-4">
                                          <div className="md:flex-1 px-4">
                                                <div>
                                                      <div className="h-64  md:h-[22rem] rounded-lg bg-gray-100 mb-4">
                                                            <div className="h-64 md:h-full rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                                                                  {selectedImage ? (
                                                                        <img
                                                                              className="md:w-94 w-full object-cover border rounded h-full"
                                                                              src={selectedImage}
                                                                              srcSet={selectedImage}
                                                                              alt="Selected Image"
                                                                        />
                                                                  ) : (
                                                                        <div className="w-full">
                                                                              {product?.data?.videos ? (
                                                                                    <div className="w-full h-full relative">
                                                                                          <VideoPlayer url={product?.data?.videos} />
                                                                                    </div>
                                                                              ) : (
                                                                                    <img
                                                                                          className="md:w-94 w-full object-cover h-full rounded-lg"
                                                                                          src={product?.featuredImage?.src}
                                                                                          srcSet={product?.featuredImage?.src}
                                                                                          alt={product?.name}
                                                                                    />
                                                                              )}
                                                                        </div>
                                                                  )}
                                                            </div>
                                                      </div>
                                                      <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-6  -m-4 text-white">
                                                            {product?.data?.videos && (
                                                                  <button
                                                                        style={{
                                                                              backgroundImage: `url(https://img.youtube.com/vi/${product?.data?.videos.split("v=")[1].split("&")[0]
                                                                                    }/0.jpg)`,
                                                                        }}
                                                                        className="bg-[#00000081] text-white flex items-center justify-center rounded text-xl  relative md:h-16 h-14 mt-4 bar overflow-hidden border border-[black]"
                                                                        onClick={() => setSelectedImage(null)}
                                                                  >
                                                                        <PiPlay />
                                                                  </button>
                                                            )}
                                                            <div
                                                                  // onClick={() => setVariations(null)}

                                                                  className="m-4 w-full md:w-11/12 rounded"
                                                            >
                                                                  <Link
                                                                        className="block relative md:h-16 h-10 rounded bar overflow-hidden border border-[black]"
                                                                        onClick={() => handleImageClick(product?.data.featuredImage?.src)}
                                                                  >
                                                                        <img
                                                                              alt={product?.name}
                                                                              className="object-cover cursor-pointer block w-full h-full p-1  "
                                                                              src={product?.data.featuredImage?.src}
                                                                              srcSet={product?.data.featuredImage?.src}
                                                                        />
                                                                  </Link>
                                                            </div>
                                                            {showVariant?.map((imageUrl, index) => (
                                                                  <div
                                                                        // onClick={() => setVariations(null)}
                                                                        key={index}
                                                                        className="m-4 w-full md:w-11/12 rounded"
                                                                  >
                                                                        <Link
                                                                              className="block relative md:h-16 h-14 rounded bar overflow-hidden border border-[black]"
                                                                              onClick={() => handleImageClick(imageUrl.src ?? imageUrl)}
                                                                        >
                                                                              <img
                                                                                    alt={`ecommerce${index + 1}`}
                                                                                    className="object-cover cursor-pointer block w-full h-full p-1  "
                                                                                    src={imageUrl.src ?? imageUrl}
                                                                                    srcSet={imageUrl.src ?? imageUrl}
                                                                              />
                                                                        </Link>
                                                                  </div>
                                                            ))}


                                                      </div>
                                                </div>
                                          </div>

                                          <div className="lg:w-1/2 w-full lg:pl-5 lg:py-5 mt-6 lg:mt-0 px-2">
                                                <h1 className="text-gray-900 text-xl title-font font-medium mb-1">

                                                      {variations?.name
                                                            ? `${product?.data?.name}`
                                                            : product?.data.name}
                                                </h1>
                                                <h2 className="text-sm title-font   tracking-widest ">
                                                      Brand: {product.data.brandName}
                                                </h2>
                                                <div className="flex my-2 items-center">
                                                      <div className="flex items-center">
                                                            <div className="flex">
                                                                  <span className="flex items-center">
                                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                                              <span
                                                                                    className="w-4 h-4"
                                                                                    key={star}
                                                                                    style={{
                                                                                          color: star <= totalStars ? "gold" : "gray",
                                                                                    }}
                                                                              >
                                                                                    <svg
                                                                                          fill="currentColor"
                                                                                          stroke="currentColor"
                                                                                          strokeLinecap="round"
                                                                                          strokeLinejoin="round"
                                                                                          strokeWidth={2}
                                                                                          className="w-4 h-4 "
                                                                                          viewBox="0 0 24 24"
                                                                                    >
                                                                                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                                                    </svg>
                                                                              </span>
                                                                        ))}
                                                                        <span className="text-gray-600 ml-2">
                                                                              {/* {product?.data?.rating / 5 || 0} */}
                                                                              {totalStars}
                                                                        </span>
                                                                  </span>
                                                            </div>
                                                      </div>
                                                      <div className="flex item-center">
                                                            <div className="flex items-center">
                                                                  {" "}
                                                                  <FaCircle className="text-[#DBDBDB] text-[8px] mx-2 md:mx-4" />
                                                                  <FaBasketShopping className="text-[#DBDBDB] mr-2 text-[16px]" />
                                                                  <p className="md:text-sm  text-[10px]">
                                                                        {product?.data?.total_sales + " "} Sold
                                                                  </p>
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="flex justify-between items-center pb-3">
                                                      <div className="title-font font-medium md:text-2xl text-lg text-gray-900 flex items-center gap-2 ">
                                                            <span className="">Price: </span>{" "}
                                                            <div className="flex items-center gap-2">
                                                                  {!variations && (
                                                                        <div className="line-through text-lg flex  text-gray-700">
                                                                              <span
                                                                                    className="kalpurush"
                                                                                    style={{ fontSize: "28px" }}
                                                                              >
                                                                                    ৳
                                                                              </span>
                                                                              {product.data.regular_price}
                                                                        </div>
                                                                  )}
                                                                  {variations?.price ? (
                                                                        variations?.offerPrice ? (
                                                                              <div className="flex gap-3">
                                                                                    <del className="flex  line-through text-lg ">
                                                                                          {" "}
                                                                                          <span
                                                                                                className="kalpurush"
                                                                                                style={{ fontSize: "28px" }}
                                                                                          >
                                                                                                ৳
                                                                                          </span>
                                                                                          {variations?.price}
                                                                                    </del>
                                                                                    <div className="flex  gap-1">
                                                                                          <span
                                                                                                className="kalpurush"
                                                                                                style={{ fontSize: "28px" }}
                                                                                          >
                                                                                                ৳
                                                                                          </span>
                                                                                          <span> {variations?.offerPrice}</span>
                                                                                    </div>
                                                                              </div>
                                                                        ) : (
                                                                              <div className="flex">
                                                                                    <span
                                                                                          className="kalpurush"
                                                                                          style={{ fontSize: "28px" }}
                                                                                    >
                                                                                          ৳
                                                                                    </span>
                                                                                    {variations?.price}
                                                                              </div>
                                                                        )
                                                                  ) : (
                                                                        <div className="flex">
                                                                              <span
                                                                                    className="kalpurush"
                                                                                    style={{ fontSize: "28px" }}
                                                                              >
                                                                                    ৳
                                                                              </span>
                                                                              {product.data.price}
                                                                        </div>
                                                                  )}
                                                                  <br />
                                                            </div>
                                                      </div>

                                                      <div className="flex items-center ">
                                                            <a
                                                                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                                                        window.location.href
                                                                  )}`}
                                                                  target="_blank"
                                                                  rel="noopener noreferrer"
                                                                  className="mr-2"
                                                            >
                                                                  <FaFacebook />
                                                            </a>
                                                            <a
                                                                  href={`https://www.instagram.com/share?url=${encodeURIComponent(
                                                                        window.location.href
                                                                  )}`}
                                                                  target="_blank"
                                                                  rel="noopener noreferrer"
                                                                  className="mr-2"
                                                            >
                                                                  <FaInstagram />
                                                            </a>
                                                            <a
                                                                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                                                        window.location.href
                                                                  )}`}
                                                                  target="_blank"
                                                                  rel="noopener noreferrer"
                                                            >
                                                                  <FaXTwitter />
                                                            </a>
                                                      </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                      <label htmlFor="Quantity" className="xsr-only">
                                                            Quantity:
                                                      </label>

                                                      <div className="flex items-center gap-1 border border-gray-900  rounded">
                                                            <button
                                                                  type="button"
                                                                  onClick={handleDecrease}
                                                                  className="w-6 h-10 leading-10 text-gray-900 transition hover:opacity-75"
                                                            >
                                                                  -
                                                            </button>

                                                            <input
                                                                  type="number"
                                                                  id="Quantity"
                                                                  value={quantity}
                                                                  onChange={handleManualInput}
                                                                  className="h-10 md:w-12 text-center w-12 text-sm  border px-1 border-gray-900 [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                                            />

                                                            <button
                                                                  type="button"
                                                                  onClick={handleIncrease}
                                                                  className="w-6 h-10 leading-10 text-gray-600 transition text-sm hover:opacity-75 "
                                                            >
                                                                  +
                                                            </button>
                                                      </div>
                                                </div>

                                                <p className="mb-2 mt-4">Variations: {variations?.name}</p>
                                                {
                                                      <div className="flex  gap-2  items-center   mb-5">

                                                            {[...new Map(product?.data?.variations?.map(variation => [variation.name, variation])).values()]
                                                                  .map((variation, index) => {
                                                                        // Get the first variation with the same name to use its image
                                                                        const firstSameNameVariation = product?.data?.variations?.find(item => item.name === variation.name);

                                                                        return (
                                                                              <div

                                                                                    onClick={() => {
                                                                                          handleVariation(firstSameNameVariation)
                                                                                          // Filter all variations with the same name
                                                                                          const sameNameVariations = product?.data?.variations?.filter(
                                                                                                item => item.name === variation.name
                                                                                          );


                                                                                          set_sizes(sameNameVariations); // Set sizes based on the filtered variations
                                                                                    }}
                                                                                    className={`w-[50px] border rounded p-1 h-[50px] object-cover`}
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
                                                }
                                                {sizes && sizes.length > 1 && (
                                                      <>

                                                            Size: {variations?.size}
                                                            <div className="flex flex-wrap gap-2 my-2">
                                                                  {sizes.map((variation, index) => (
                                                                        <div
                                                                              onClick={() => {
                                                                                    setVariations(variation);
                                                                                    setIndexSer(index);
                                                                              }}
                                                                              className={`border rounded p-1 h-[50px] flex items-center justify-center cursor-pointer hover:bg-gray-200`}
                                                                              key={index}
                                                                        >
                                                                              {variation?.size}
                                                                        </div>
                                                                  ))}
                                                            </div>
                                                      </>
                                                )}
                                                <div className="mbc">
                                                      <div className="   gap-3 py-1 space-x-4 justify-between">
                                                            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-2 items-center gap-3">
                                                                  <button
                                                                        type="button"
                                                                        onClick={() => addToCart(product)}
                                                                        className="h-10 px-2 py-2 font-semibold rounded bg-gray-950 hover:bg-gray-800 text-white"
                                                                  >
                                                                        {loader ? "Loading.." : "Add to Cart"}
                                                                  </button>

                                                                  <button
                                                                        onClick={() => buyNowHandler(product)}
                                                                        type="button"
                                                                        className="h-10 md:block  px-2 py-2 s font-semibold  rounded bg-blue-500 hover:bg-indigo-500 text-white"
                                                                  >
                                                                        Buy Now
                                                                  </button>

                                                                  <a
                                                                        href={`tel:${shop.shopNumber}`}
                                                                        className="text-center  md:hidden block  px-2 py-2 w-[100%] font-semibold rounded bg-green-500 hover:bg-indigo-500 text-white"
                                                                  >
                                                                        কল করুন
                                                                  </a>
                                                            </div>
                                                      </div>
                                                      <div className="  md:flex hidden  gap-3 py-1 space-x-4 justify-between">
                                                            <div className="block w-[100%]  items-center gap-3">

                                                                  <a
                                                                        href={`tel:${shop.shopNumber}`}
                                                                        className="text-center   md:block px-2 py-2 w-[100%] font-semibold rounded bg-green-500 hover:bg-indigo-500 text-white"
                                                                  >
                                                                        অর্ডারের জন্য কল করুন
                                                                        <p>{shop.shopNumber}</p>
                                                                  </a>

                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <div className="border md:block hidden mt-6 w-full">
                                    <div className="p-4">
                                          <h2 className="text-lg font-semibold mb-4">Relevant Products</h2>
                                          <div className="space-y-4">
                                                {loadingRelevent && <LoaderData />}
                                                {releventProduct
                                                      ?.filter((item) => item?._id !== product?.data?._id)
                                                      ?.slice(0, 3)
                                                      ?.map((product, index) => (
                                                            <Link
                                                                  to={`/shop/${shopId}/product/${product?._id}`}
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
                                                                              {product?.name?.slice(0, 40)}
                                                                        </p>
                                                                        <div className="flex gap-3">
                                                                              {parseInt(product?.discountPrice) > 0 &&
                                                                                    parseInt(product?.price) !==
                                                                                    parseInt(product?.discountPrice) ? (
                                                                                    <>
                                                                                          <div>
                                                                                                <span className="kalpurush">৳</span>
                                                                                                <span>{user ? product?.price : 0}</span>
                                                                                          </div>
                                                                                          <del> ৳{product?.discountPrice ?? 0}</del>
                                                                                    </>
                                                                              ) : parseInt(product?.discountPrice) > 0 ? (
                                                                                    <div>
                                                                                          <span className="kalpurush">৳</span>{" "}
                                                                                          {product?.discountPrice}
                                                                                    </div>
                                                                              ) : (
                                                                                    <div>
                                                                                          <span className="kalpurush">৳</span>{" "}
                                                                                          {product?.price}
                                                                                    </div>
                                                                              )}
                                                                        </div>
                                                                  </div>
                                                            </Link>
                                                      ))}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div>
                        <style jsx>{`
          .overlap {
            background: linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.8) 0%,
              rgba(255, 255, 255, 0.6) 20%,
              rgba(255, 255, 255, 0.4) 40%,
              rgba(255, 255, 255, 0.2) 60%,
              rgba(0, 0, 0, 0.2) 80%,
              rgba(0, 0, 0, 0.4) 100%
            );
            position: relative;
          }
        .overlap:after {
width: 100px;
  height: 52px;
background: black;
box-shadow: 0px 0px 34px white;
content: 'Load More';
position: absolute;
bottom: 10px;
right: 0;
left: 0;
margin: auto;
text-align: center;
line-height: 50px;
border-radius: 5PX;
color: white;
cursor: pointer;
}
            @media(max-width:500px){
            .mbc div button{
            flex:1}
            .mbc div{
            position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9999999;
    background: white;
    padding: 15px;
            }
            }
        `}</style>
                        <div>
                              <div className="flex  gap-5 items-center border-b ">
                                    <h2 onClick={() => setActive('desc')}
                                          className={active === 'desc' ? "bg-green-500 py-2 px-5 rounded cursor-pointer" : " py-2 cursor-pointer px-5 rounded"}

                                    >
                                          <span className="font-medium text-xl ">
                                                Description
                                          </span>
                                    </h2>
                                    <h2 className={active === 'spec' ? "bg-green-500 py-2 px-5 rounded cursor-pointer" : "cursor-pointer py-2 px-5 rounded"} onClick={() => setActive('spec')}>
                                          <span className="font-medium text-xl ">
                                                Specification
                                          </span>
                                    </h2>
                                    <h2 className={active === 'review' ? "bg-green-500 py-2 px-5 rounded cursor-pointer" : "cursor-pointer py-2 px-5 rounded"} onClick={() => setActive('review')}>
                                          <span className="font-medium text-xl ">
                                                Review
                                          </span>
                                    </h2>

                              </div>
                        </div>
                        {active === 'desc' && (
                             <div>
                             {innerHeight == true ? (
                               <div
                                 ref={containerRef}
                                 onClick={() => setDisOn(!disOn)}
                                 className={`${disOn ? "h-full" : "h-[700px] overlap"} overflow-hidden`}
                               >
                                 <div onClick={() => setDisOn(!disOn)}>
                                   <div
                                     className="mb-2 text_editor text-start"
                                     dangerouslySetInnerHTML={{
                                       __html: product.data.shortDescription,
                                     }}
                                   />
                                   <div
                                     className="mt-4 text_editor"
                                     dangerouslySetInnerHTML={{
                                       __html: product?.data?.description,
                                     }}
                                   />
                                 </div>
                               </div>
                             ) : (
                               <div
                                 ref={containerRef}
                                 className={`${disOn ? "h-full" : " "} overflow-hidden`}
                               >
                                 <div>
                                   <div
                                     className="mb-2 text_editor text-start"
                                     dangerouslySetInnerHTML={{
                                       __html: product.data.shortDescription,
                                     }}
                                   />
                                   <div
                                     className="mt-4 text_editor"
                                     dangerouslySetInnerHTML={{
                                       __html: product?.data?.description,
                                     }}
                                   />
                                   {/* <p className="text-gray-700">{metaTitle}</p> */}
                                 </div>
                               </div>
                             )}
                           </div>
                           
                              
                        )}
                          <div className="border sm:block md:hidden mt-6 w-full">
                                                <div className="p-4">
                                                      <h2 className="text-lg font-semibold mb-4">Relavent Product</h2>
                                                      <div className="space-y-4">
                                                            {releventProduct
                                                                  ?.filter((item) => item?._id !== product?.data?._id)
                                                                  ?.slice(0, 3)
                                                                  ?.map((productx, index) => (
                                                                        <Link
                                                                              to={`/shop/${shopId}/product/${productx?._id}`}
                                                                              key={productx?._id}
                                                                              className="border w-full duration-150 group hover:shadow-lg flex items-start gap-2 p-3 rounded"
                                                                        >
                                                                              <img
                                                                                    alt={product?.name}
                                                                                    className="w-20 h-20 bg-gray-200 rounded mb-2"
                                                                                    height="80"
                                                                                    src={
                                                                                          productx?.featuredImage?.src
                                                                                                ? productx?.featuredImage?.src
                                                                                                : productx?.images[0]?.src
                                                                                    }
                                                                                    style={{
                                                                                          aspectRatio: "80/80",
                                                                                          objectFit: "cover",
                                                                                    }}
                                                                                    width="80"
                                                                              />
                                                                              <div className="">
                                                                                    <p className="font-medium group-hover:text-blue-500 duration">
                                                                                          {productx?.name?.slice(0, 40)}
                                                                                    </p>
                                                                                    <p className="text-red-500">৳{productx?.price}</p>
                                                                              </div>
                                                                        </Link>
                                                                  ))}
                                                      </div>
                                                </div>
                                          </div>
                        {active === 'spec' && (
                              <div className="specification">
                                    {product?.data?.darazOptionData?.map((productx, index) => (
                                          <div key={index}>
                                                {Object.entries(productx).map(([key, value], idx) => (
                                                      key !== 'short_description' && key !== 'promotion_whitebkg_image' && ( // Skip 'short_description'
                                                            <p key={idx}>
                                                                  <strong>{key}</strong>: {value}
                                                            </p>
                                                      )
                                                ))}
                                          </div>
                                    ))}
                              </div>
                        )}
                        {active === 'review' && (
                              <div className="max-w-7xl mx-auto  my-6">
                                    <div className="border md:p-6 p-3 rounded">
                                          <ProductReviews comments={comments} />
                                    </div>
                              </div>
                        )}
                        <div className="max-w-7xl mx-auto my-6">
                              <div className="border md:p-6 px-2 py-3 rounded">
                                    <SellerTopSellingProduct productFind={product?.data} />
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default ProductInformation;
