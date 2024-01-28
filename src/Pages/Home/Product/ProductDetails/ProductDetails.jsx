import React, { useEffect } from "react";
import { useState } from "react";
import { FaBasketShopping, FaCircle, FaMessage } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";
import TrendingProducts from "./TrendingProducts";

import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { user } = useContext(AuthContext)
  const location = useParams();
  const [loader, setLoader] = useState(false);

  const myData = useLoaderData();
  const { data: productInfo = [], refetch } = useQuery({
    queryKey: ["productInfo"],
    queryFn: async () => {
      const res = await fetch("https://salenow-v2-backend.vercel.app/api/v1/admin/products");
      const data = await res.json();
      return data;
    },
  });

  // const { data: productFind = [], refetch } = useQuery({
  //   queryKey: ["productFind"],
  //   queryFn: async () => {
  //     const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/single-product?id=${location.id}`);
  //     const data = await res.json();
  //     return data;
  //   },
  // });


  // console.log(productFind, '>>>');
  const productFind = myData?.data;


  const [quantity, setQuantity] = useState(1);
  const [banifit, setBanifit] = useState({
    productCost: parseInt(productFind?.variantData?.sellingPrice),
    sellingPrice: parseInt(productFind?.variantData?.sellingPrice),
    profit: 0,
    profitPercent: 0,
  });

  const allUpdateInfo = () => {
    const price = parseInt(productFind?.variantData?.sellingPrice);
    const quantityPars = parseInt(quantity);
    const productCost = quantityPars * price;

    // Compare your quantity   nahid, mahadi, and murshed
    const product1Quantity = productFind?.variantData.product1.quantity;
    const product2Quantity = productFind?.variantData.product2.quantity;
    const product3Quantity = productFind?.variantData.product3.quantity;

    const product1QuantityPrice = productFind?.variantData?.product1?.quantityPrice;
    const product2QuantityPrice = productFind?.variantData?.product2?.quantityPrice;
    const product3QuantityPrice = productFind?.variantData?.product3?.quantityPrice;

    let profit = 0;
    let profitPercent = 0;
    let total = productCost;
    // ...

    if (quantity >= product1Quantity && quantity < product2Quantity) {
      const productQuantityPrice = (total / quantity) * quantity;
      const countProfit = (product1QuantityPrice / product1Quantity) * quantity;
      profit = productQuantityPrice - countProfit;
      profitPercent = (productQuantityPrice - countProfit) / 100;
      console.log('profit 1 : ', profit);
    }

    else if (quantity >= product2Quantity && quantity < product3Quantity) {
      const productQuantityPrice = (total / quantity) * quantity;
      const countProfit = (product2QuantityPrice / product2Quantity) * quantity;

      profit = productQuantityPrice - countProfit;
      profitPercent = (productQuantityPrice - countProfit) / 100;
      console.log('profit 2 : ', profit);
    }

    else if (quantity >= product3Quantity) {
      const productQuantityPrice = (total / quantity) * quantity;
      const countProfit = (product3QuantityPrice / product3Quantity) * quantity;

      profit = productQuantityPrice - countProfit;
      profitPercent = (productQuantityPrice - countProfit) / 100;
      console.log('profit 3 : ', profit);
    }

    // ...


    setBanifit({
      ...banifit,
      sellingPrice: price,
      profit: profit,
      profitPercent: parseFloat(profitPercent).toFixed(2),
    });
  };

  useEffect(() => {
    allUpdateInfo();
  }, [quantity]);



  const imageList = productFind ? productFind.images : [];
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const blankImg = 'https://i.ibb.co/7p2CvzT/empty.jpg';
  const [selectedImage, setSelectedImage] = useState(
    productFind?.images[0]?.src ? productFind?.images[0]?.src : blankImg
  );


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
  }, [quantity])

  const convertedRating = (2 / 10) * 5;




  return (
    <section>
      <div className="py-4">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-12 ">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <a href="#" className="hover:underline hover:text-gray-600">
              Home
            </a>
            <span>
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
            </span>
            <a href="#" className="hover:underline hover:text-gray-600">
              Clothing
            </a>
            <span>
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
            </span>
            <a href="#" className="hover:underline hover:text-gray-600">
              Men's Wear
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-12 mt-6 ">
          <div className="flex flex-col md:flex-row -mx-4 border rounded border-gray-300 py-4">
            <div className="md:flex-1 px-4">
              <div>
                <div className="h-64  md:h-[22rem] rounded-lg bg-gray-100 mb-4">
                  <div className="h-64 md:h-full rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                    {
                      selectedImage ? <img
                        className="w-94 h-full"
                        src={selectedImage ? selectedImage : blankImg}
                        srcSet={selectedImage ? selectedImage : blankImg}
                        alt="product image"
                      /> : <h2>Loading...</h2>
                    }

                  </div>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2 -m-4 text-white">
                  {imageList.map((imageUrl, index) => (
                    <div key={index} className="p-4 w-full md:w-11/12 rounded">
                      <a
                        className="block relative h-16 rounded overflow-hidden border"
                        onClick={() => handleImageClick(imageUrl?.src)}
                      >
                        <img
                          alt={`ecommerce${index + 1}`}
                          className="object-cover cursor-pointer block w-full h-full p-2 "
                          src={imageUrl?.src}
                          srcSet={imageUrl?.src}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4 ">
              <div className="flex items-center">
                <MdDone className="text-green-400" />
                <p className="text-sm font-medium text-green-400 ml-1">
                  In Stock
                </p>
              </div>
              <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                {productFind?.name}
              </h2>
              <div>
                <div className=" hidden items-center">
                  <div className="flex">

                    <span className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          className="w-4 h-4"
                          key={star}
                          style={{
                            color: star <= convertedRating ? 'gold' : 'gray',
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
                      <span className="text-gray-600 ml-2">9.3</span>

                    </span>

                  </div>
                  <div>
                    <FaCircle className="text-[#DBDBDB] text-[8px] mx-2 md:mx-4" />
                  </div>
                  <div className="flex items-center">
                    <FaMessage className="text-[#DBDBDB] mr-2 text-[15px]" />
                    <p>32 Message</p>
                  </div>
                  <div>
                    <FaCircle className="text-[#DBDBDB] text-[8px] mx-2 md:mx-4" />
                  </div>
                  <div className="flex items-center">
                    <FaBasketShopping className="text-[#DBDBDB] mr-2 text-[16px]" />
                    <p>154 Sold</p>
                  </div>
                </div>

                <div className="my-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 bg-red-100 py-3">
                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl text-red-400">${parseInt(banifit.productCost)}</h6>
                      <p className="text-sm text-[#606060]">Product Costing</p>
                    </div>
                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl">${parseInt(banifit.sellingPrice)}</h6>
                      <p className="text-sm text-[#606060]">Selling Price</p>
                    </div>
                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl">${parseInt(banifit.profit)}</h6>
                      <p className="text-sm text-[#606060]">Your Profit</p>
                    </div>
                    <div className="text-center">
                      <h6 className="font-bold text-xl">{banifit.profitPercent}%</h6>
                      <p className="text-sm text-[#606060]">Your Profit</p>
                    </div>
                  </div>
                </div>
                <div className="my-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 bg-red-100 py-3">

                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl text-red-400">{productFind?.variantData?.product1?.quantityPrice}</h6>
                      <p className="text-sm text-[#606060]">{productFind?.variantData?.product1?.quantity}  Qty</p>
                    </div>
                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl text-red-400">{productFind?.variantData?.product2?.quantityPrice}</h6>
                      <p className="text-sm text-[#606060]">{productFind?.variantData?.product2?.quantity}  Qty</p>
                    </div>
                    <div className="text-center">
                      <h6 className="font-bold text-xl text-red-400">{productFind?.variantData?.product3?.quantityPrice}</h6>
                      <p className="text-sm text-[#606060]">{productFind?.variantData?.product3?.quantity}  Qty</p>
                    </div>
                  </div>
                </div>
              </div>

              {user?.role === 'seller' && <div className="flex py-4 space-x-4">
                <div>
                  <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={
                        handleDecrease
                      }
                      className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      id="Quantity"
                      value={quantity}
                      onChange={handleManualInput}
                      className="h-10 w-24 rounded border px-4 border-gray-900 [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                    />

                    <button
                      type="button"
                      onClick={
                        handleIncrease}
                      className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75 "
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="h-10 px-6 py-2 font-semibold rounded bg-gray-950 hover:bg-gray-800 text-white"
                >
                  Add My Store
                </button>
                <button
                  onClick={() => { }}
                  type="button"
                  className="h-10 px-6 py-2 font-semibold rounded bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  By Now
                </button>
              </div>}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">
        <div className="border p-6 rounded">
          <ProductDescription metaTitle={productFind?.metaTitle} description={productFind?.description} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">
        <div className="border p-6 rounded">
          <ProductReviews />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">
        <div className="border p-6 rounded">
          <TrendingProducts />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
