import React from "react";
import { useState } from "react";
import { FaBasketShopping, FaCircle, FaMessage } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";
import TrendingProducts from "./TrendingProducts";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(
    "https://i.ibb.co/tPt2Ntp/image-34.png"
  );

  const imageList = [
    "https://i.ibb.co/tPt2Ntp/image-34.png",
    "https://img.freepik.com/free-psd/mens-tri-blend-crew-tee-mockup_126278-130.jpg?w=740&t=st=1696792919~exp=1696793519~hmac=2120615b267f5ab7879436d3ac193cf6c02d0b0196dbc7329132e70c0061cd9e",
    "https://i.ibb.co/MZdnhbh/image-40.png",
    "https://i.ibb.co/df7rzcZ/image-37.png",
    "https://i.ibb.co/2FjWjgW/image-39.png",
    "https://i.ibb.co/df7rzcZ/image-37.png",
  ];

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
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
                    <img
                      className="w-94 h-full"
                      src={selectedImage}
                      alt="Selected Image"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2 -m-4 text-white">
                  {imageList.map((imageUrl, index) => (
                    <div key={index} className="p-4 w-full md:w-11/12 rounded">
                      <a
                        className="block relative h-16 rounded overflow-hidden border"
                        onClick={() => handleImageClick(imageUrl)}
                      >
                        <img
                          alt={`ecommerce${index + 1}`}
                          className="object-cover block w-full h-full p-2 "
                          src={imageUrl}
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
                Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle
              </h2>
              <div>
                <div className="flex items-center">
                  <div className="flex">
                    <span className="flex items-center">
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 text-[#FF9017]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 text-[#FF9017]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 text-[#FF9017]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 text-[#FF9017]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 text-[#FF9017]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
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
                <div class="my-3">
                  <div class="grid grid-cols-2 md:grid-cols-4 bg-red-100 py-3">
                    <div class="text-center md:border-r-2 border-gray-400">
                      <h6 class="font-bold text-xl text-red-400">$80</h6>
                      <p class="text-sm text-[#606060]">Product Costing</p>
                    </div>
                    <div class="text-center md:border-r-2 border-gray-400">
                      <h6 class="font-bold text-xl">$90</h6>
                      <p class="text-sm text-[#606060]">Selling Price</p>
                    </div>
                    <div class="text-center md:border-r-2 border-gray-400">
                      <h6 class="font-bold text-xl">$18</h6>
                      <p class="text-sm text-[#606060]">Your Profit</p>
                    </div>
                    <div class="text-center">
                      <h6 class="font-bold text-xl">10%</h6>
                      <p class="text-sm text-[#606060]">Your Profit</p>
                    </div>
                  </div>
                </div>
                <div class="my-3">
                  <div class="grid grid-cols-2 md:grid-cols-3 bg-red-100 py-3">
                    <div class="text-center md:border-r-2 border-gray-400">
                      <h6 class="font-bold text-xl text-red-400">$80</h6>
                      <p class="text-sm text-[#606060]">10 Qty</p>
                    </div>
                    <div class="text-center md:border-r-2 border-gray-400">
                      <h6 class="font-bold text-xl">$90</h6>
                      <p class="text-sm text-[#606060]">50 Quantity</p>
                    </div>
                    <div class="text-center">
                      <h6 class="font-bold text-xl">$18</h6>
                      <p class="text-sm text-[#606060]">99 Quantity</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex py-4 space-x-4">
                <div>
                  <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      id="Quantity"
                      defaultValue="1"
                      className="h-10 w-24 rounded border px-4 border-gray-900 [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                    />

                    <button
                      type="button"
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
                  type="button"
                  className="h-10 px-6 py-2 font-semibold rounded bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  By Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">
        <div className="border p-6 rounded">
          <ProductDescription />
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
