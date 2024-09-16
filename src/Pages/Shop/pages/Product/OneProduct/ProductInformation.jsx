import React, { useContext, useEffect, useState } from "react";
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
  const { shop_id, shopUser, setSelectProductData } =
    useContext(ShopAuthProvider);

  const pathname = window.location.pathname;
  const idMatch = pathname.match(/\/shop\/([^/]+)/);
  const shopId = idMatch ? idMatch[1] : null;

  console.log(product?.data?.shopId, "<<<=====>>>", shop_id?.shop_id);

  const [variations, setVariations] = useState(null);
  const [disOn, setDisOn] = useState(false);

  const [imageList, setImageList] = useState([
    product?.data?.featuredImage,
    ...product?.data?.images,
  ]);
  console.log(product,'productproductproduct')
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
    setVariations(variation);
    setShowVariant(
      variation?.variantImag ? variation?.variantImag : product?.data.images
    );
  };

  useEffect(() => {
    setVariations(product?.data?.variations[0]);
    setShowVariant(product?.data.images);

    if (imageList.length > 0) {
      setSelectedImage(imageList[0]?.src);
    } else {
      product?.data?.featuredImage?.src
        ? product?.data?.featuredImage?.src
        : blankImg;
    }
  }, [path.pathname]);

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
      productId: product._id,
      shopId: shop_id.shop_id,
      variations,
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
          showAlert("Product quantity updated in cart","","success");
        } else {
          // Add the product to the cart
          const updatedCart = [...cartProduct, addToCard];
          localStorage.setItem(`addToCart-${shopId}`, JSON.stringify(updatedCart));
          showAlert("Product added to cart","","success");
        }
      } else {
        localStorage.setItem(`addToCart-${shopId}`, JSON.stringify([addToCard]));
        showAlert("Product added to cart","",'success');
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
    }  else{
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
        variations,
        delivery_charge: parseInt(product?.DeliveryCharge) ?? 40,
      },
    ];
    setSelectProductData(buyNowInfo);
    navigate(
      `/shop/${shopId}/user/order?shop_id=${shop_id.shop_id}&userId=${userId}`
    );}
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

  // console.log(
  //   "convertedRating",
  //   convertedRating,
  //   "and ",
  //   product?.data?.rating_count
  // );

  console.log(product?.data, "product");

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
  console.log(showVariant);

  const handleDownload = async () => {
    const zip = new JSZip();
    const imgFolder = zip.folder("images");



    const imagePromises = showVariant.map(async (imageUrl, index) => {
      const response = await fetch(imageUrl.src);
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
                              alt="product image"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-6 md:grid-cols-7 lg:grid-cols- gap-2 -m-4 text-white">
                    {product?.data?.videos && (
                      <button
                        style={{
                          backgroundImage: `url(https://img.youtube.com/vi/${product?.data?.videos.split("v=")[1].split("&")[0]
                            }/0.jpg)`,
                        }}
                        className="bg-[#00000081] text-white flex items-center justify-center rounded text-xl  relative md:h-16 h-14 mt-4 overflow-hidden border border-[black]"
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
                          className="block relative md:h-16 h-10 rounded overflow-hidden border border-[black]"
                          onClick={() => handleImageClick(product?.data.featuredImage?.src)}
                        >
                          <img
                            alt={`doob`}
                            className="object-cover cursor-pointer block w-full h-full p-1  "
                            src={product?.data.featuredImage?.src}
                            srcSet={ product?.data.featuredImage?.src}
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
                          className="block relative md:h-16 h-14 rounded overflow-hidden border border-[black]"
                          onClick={() => handleImageClick(imageUrl.src)}
                        >
                          <img
                            alt={`ecommerce${index + 1}`}
                            className="object-cover cursor-pointer block w-full h-full p-1  "
                            src={imageUrl.src}
                            srcSet={imageUrl.src}
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
                    {product?.data?.variations &&
                      product?.data?.variations.map((variation, index) => (
                        <div
                          onClick={() => handleVariation(variation)}
                          key={index}
                          className="w-[50px] h-[50px] border border-gray-300"
                        >
                          <img
                            onClick={() =>
                              setShowVariant(variation?.variantImag)
                            }
                            src={
                              !product?.data
                                ? variation?.image[0]
                                : variation?.image
                            }
                            alt=""
                            className="w-full h-full"
                          />
                        </div>
                      ))}
                  </div>
                }
                <div className="mbc">
                  <div className="flex  gap-3 py-1 space-x-4 justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="h-10 w-[120px] px-2 py-2 font-semibold rounded bg-gray-950 hover:bg-gray-800 text-white"
                      >
                        {loader ? "Loading.." : "Add to Cart"}
                      </button>

                      <button
                        onClick={() => buyNowHandler(product)}
                        type="button"
                        className="h-10 md:block  px-2 py-2 w-[120px] font-semibold  rounded bg-blue-500 hover:bg-indigo-500 text-white"
                      >
                        Buy Now
                      </button>
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
                        alt="Product Image"
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
            width: 50px;
            height: 50px;
            background: black;
            content: "\\2193\\2193";
            position: absolute;
            bottom: 10px;
            right: 0;
            left: 0;
            margin: auto;
            text-align: center;
            line-height: 50px;
            border-radius: 50%;
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
        <div
          onClick={() => setDisOn(!disOn)}
          className={`${disOn ? "h-full" : "h-[350px] overlap"
            } overflow-hidden`}
        >
          <div className="flex items-center border-b pb-3 justify-between w-full">
            <h2 className="">
              <span className="font-medium text-xl text-blue-500">
                Description
              </span>
            </h2>

          </div>
          <div onClick={() => setDisOn(!disOn)}>
            <div
              className="mb-2 text_editor  text-start  "
              dangerouslySetInnerHTML={{
                __html: product.data.shortDescription,
              }}
            />
            <div
              className="mt-4  text_editor"
              dangerouslySetInnerHTML={{
                __html: product?.data?.description,
              }}
            />

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
                          alt="Product Image"
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
            {/* <p className="text-gray-700">
        {metaTitle}
      </p> */}
          </div>
        </div>
        <div className="max-w-7xl mx-auto  my-6">
          <div className="border md:p-6 p-3 rounded">
            <ProductReviews comments={comments} />
          </div>
        </div>
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
