import React, { useContext, useEffect, useState } from "react";
import {
  FaBasketShopping,
  FaCircle,
  FaFacebook,
  FaInstagram,
  FaMessage,
  FaXTwitter,
} from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import ProductDescription from "../../../../Home/Product/ProductDetails/ProductDescription";
import ProductReviews from "../../../../Home/Product/ProductDetails/ProductReviews";
import TrendingProducts from "../../../../Home/Product/ProductDetails/TrendingProducts";
import { BsCart2 } from "react-icons/bs";

import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import MetaHelmet from "../../../../../Helmate/Helmate";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import TrandingProductShop from "../TrandingProductShop/TrandingProductShop";

const ProductInformation = () => {
  const product = useLoaderData();
  // const [selectedImage, setSelectedImage] = useState(product.data.featuredImage.src);
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const { shop_id, shopUser, setSelectProductData } =
    useContext(ShopAuthProvider);
  const [variations, setVariations] = useState(null);
  const [showVariant, setShowVariant] = useState(product.data.images);
  console.log(variations, "variations");
  const blankImg =
    "https://backend.doob.com.bd/api/v1/image/66036ed3df13bd9930ac229c.jpg";

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  let imageList = product?.data ? product?.data?.images : [];
  const [selectedImage, setSelectedImage] = useState(
    imageList.length > 0 ? imageList[0]?.src : blankImg
  );

  const [clickImage, setClickImage] = useState(
    imageList.length > 0 ? imageList[0].src : ""
  );

  const path = useLocation();

  console.log(variations, "location........");

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

  const pathname = window.location.pathname;

  const idMatch = pathname.match(/\/shop\/([^/]+)/);

  const shopId = idMatch ? idMatch[1] : null;

  const addToCart = (data) => {


    setLoader(true);
    const product = data.data;
    const addToCard = {
      userId: shopUser?._id,
      quantity: quantity,
      img: product?.daraz ? variations?.image[0] : selectedImage,
      productName: variations?.name
        ? `${product.name} - ${variations?.name}`
        : product.name,
      price: variations?.price ? variations?.price : product.price,
      regular_price: product.regular_price,
      productId: product._id,
      shopId: shop_id.shop_id,
      variations,
      delivery_charge: parseInt(product?.DeliveryCharge) ?? 40
    };

    if (!shopUser) {
      const getData = localStorage.getItem("addToCart");
      const cartProduct = JSON.parse(getData);
      if (cartProduct) {
        const existingProductIndex = cartProduct.findIndex(
          (item) => item.productId === addToCard.productId
        );
        if (existingProductIndex !== -1) {
          // Update the quantity of the existing product
          cartProduct[existingProductIndex].quantity += quantity;
          localStorage.setItem("addToCart", JSON.stringify(cartProduct));
          BrightAlert("Product quantity updated in cart");
        } else {
          // Add the product to the cart
          const updatedCart = [...cartProduct, addToCard];
          localStorage.setItem("addToCart", JSON.stringify(updatedCart));
          BrightAlert("Product added to cart");
        }
      } else {
        localStorage.setItem("addToCart", JSON.stringify([addToCard]));
        BrightAlert("Product added to cart");
      }
      setLoader(false);
    } else {
      fetch(
        `https://backend.doob.com.bd/api/v1/shop/user/add-to-cart?token=${shopUser._id}`,
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
          setLoader(false);
          BrightAlert(data.message);
          console.log(data);
        });
    }
  };

  const navigate = useNavigate();
  const buyNowHandler = (data) => {
    const product = data.data;
    if (!shopUser) {
      console.log(location?.pathname, "shop");
      addToCart(data);
      navigate(`/shop/${shopId}/sign-in`, {
        replace: true,
        state: { from: location?.pathname },
      });
    } else {
      const buyNowInfo = [
        {
          userId: shopUser?._id,
          quantity: quantity,
          img: product?.daraz ? variations?.image[0] : selectedImage,
          productName: variations?.name
            ? `${product.name} - ${variations?.name}`
            : product.name,
          price: variations?.price ? variations?.price : product.price,
          regular_price: product.regular_price,
          productId: product._id,
          shopId: shop_id.shop_id,
          variations,
        },
      ];
      setSelectProductData(buyNowInfo);
      navigate(
        `/shop/${shopId}/user/order?shop_id=${shop_id.shop_id}&userId=${shopUser._id}`
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
        `https://backend.doob.com.bd/api/v1/seller/product-comment?id=${product?.data?._id}`
      );
      const data = await res.json();
      return data?.comments;
    },
  });

  console.log(comments);

  const totalStars =
    comments?.length &&
    comments?.reduce((total, comment) => total + comment.star, 0) /
    comments?.length;

  console.log("Total stars:", totalStars);

  const convertedRating = (` ${totalStars}` / 10) * 5 || 0;

  // console.log(
  //   "convertedRating",
  //   convertedRating,
  //   "and ",
  //   product?.data?.rating_count
  // );

  const { data: releventProduct = [], reload } = useQuery({
    queryKey: ["releventProduct"],
    queryFn: async () => {
      const res = await fetch(
        "https://backend.doob.com.bd/api/v1/admin/products"
      );
      const data = await res.json();
      return data;
    },
  });
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
                      <img
                        className="md:w-94 w-full object-cover border rounded h-full"
                        src={
                          product?.data?.daraz
                            ? variations?.image[0]
                            : selectedImage
                        }
                        srcSet={
                          product?.data?.daraz
                            ? variations?.image[0]
                            : selectedImage
                        }
                        alt="Selected Image"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-2 -m-4 text-white">
                    {showVariant?.map((imageUrl, index) => (
                      <div
                        onClick={() => setVariations(null)}
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

              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 px-4">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {product.data.brandName}
                </h2>
                <h1 className="text-gray-900 md:text-3xl title-font font-medium mb-1">
                  {variations?.name
                    ? `${product?.data?.name?.slice(0, 50)}`
                    : product?.data.name?.slice(0, 50)}
                </h1>
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
                  <div className="title-font font-medium md:text-2xl text-lg text-gray-900 flex items-start">
                    <span>Price :</span>{" "}
                    <div className="flex items-center">
                      <span className="kalpurush">৳</span>
                      {variations?.price ? (
                        variations?.offerPrice ? (
                          <div className="flex gap-3">
                            <del>{variations?.price}</del>
                            <div className="flex gap-">
                              <span className="kalpurush">৳</span>
                              <span>{variations?.offerPrice}</span>
                            </div>
                          </div>
                        ) : (
                          variations?.price
                        )
                      ) : (
                        <>
                          <span className="kalpurush">৳</span>
                          {product.data.price}
                        </>
                      )}
                      <br />
                      {!variations && (
                        <div className="line-through text-lg text-gray-500">
                          <span className="kalpurush">৳</span>
                          {product.data.regular_price}
                        </div>
                      )}
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

                <hr />
                <div className=" h-[120px] overflow-y-hidden flex items-center ">
                  <div
                    className="mb-2 text_editor  text-start  "
                    dangerouslySetInnerHTML={{
                      __html: product.data.shortDescription,
                    }}
                  />
                </div>
                <br />

                <br />
                <p>Variations: {variations?.name}</p>
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
                <div>
                  <div className="flex  gap-3 py-4 space-x-4 justify-between">
                    <div>
                      <label htmlFor="Quantity" className="sr-only">
                        {" "}
                        Quantity{" "}
                      </label>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={handleDecrease}
                          className="w-6 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                        >
                          -
                        </button>

                        <input
                          type="number"
                          id="Quantity"
                          value={quantity}
                          onChange={handleManualInput}
                          className="h-10 md:w-12 text-center w-12 text-sm rounded border px-1 border-gray-900 [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
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
                        className="h-10 md:block hidden px-2 py-2 w-[120px] font-semibold  rounded bg-indigo-600 hover:bg-indigo-500 text-white"
                      >
                        Buy Now
                      </button>

                      <button
                        onClick={() => buyNowHandler(product)}
                        type="button"
                        className="h-10 md:hidden block px-2 py-2 w-[60px] font-semibold  rounded bg-indigo-600 hover:bg-indigo-500 text-white"
                      >
                        <BsCart2 className="text-2xl m-auto" />
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
                {
                  releventProduct?.slice(0, 3)?.map((product, index) =>
                    <Link to={`/products/${product?._id}`} key={product?._id} className="border w-full duration-150 group hover:shadow-lg flex items-start gap-2 p-3 rounded">
                      <img
                        alt="Product Image"
                        className="w-20 h-20 bg-gray-200 rounded mb-2"
                        height="80"
                        src={product?.featuredImage?.src ? product?.featuredImage?.src : product?.images[0]?.src}
                        style={{
                          aspectRatio: "80/80",
                          objectFit: "cover",
                        }}
                        width="80"
                      />
                      <div className="">
                        <p className="font-medium group-hover:text-blue-500 duration">{product?.name?.slice(0, 40)}</p>
                        <p className="text-red-500">৳{product?.price}</p>
                      </div>
                    </Link>
                  )
                }
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">
        <div className="border p-6 rounded">
          <ProductDescription description={product.data.description} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">
        <div className="border p-6 rounded">
          <ProductReviews comments={comments} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">

        <div className="border md:hidden block mb-6 mt-6 w-full">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Relevent Products</h2>
            <div className="space-y-4">
              {
                releventProduct?.slice(0, 3)?.map((product, index) =>
                  <Link to={`/products/${product?._id}`} key={product?._id} className="border w-full duration-150 group hover:shadow-lg flex items-start gap-2 p-3 rounded">
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
                      <p className="text-red-500">৳{product?.price}</p>
                    </div>
                  </Link>
                )
              }
            </div>
          </div>
        </div>


        <div className="border md:p-6 rounded">
          <TrandingProductShop />
        </div>
      </div>
    </section>
  );
};

export default ProductInformation;
