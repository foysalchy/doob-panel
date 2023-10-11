import JoditEditor from "jodit-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const nonEmptyFiles = files.filter((file) => file.size > 0); // Filter out empty files
    setImages([...images, ...nonEmptyFiles]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const image = images;
    // const videoURL = form.videoURL.value
    const productDescription = form.productDescription.value;
    const categoryName = form.categoryName.value;
    const productPrice = form.productPrice.value;
    const productName = form.productName.value;
    const data = {
      image,
      // videoURL,
      productName,
      productPrice,
      categoryName,
      productDescription,
    };
    console.log(data);
  };

  return (
    <div>
      <nav aria-label="breadcrumb" className="w-full my-20 p-4 mb-4 rounded dark:bg-gray-800 dark:text-gray-100">
        <ol className="flex h-8 space-x-2">
          <li className="flex items-center">
            <Link rel="noopener noreferrer" to={'/admin/dashboard'} title="Back to homepage" className="hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 pr-1 dark:text-gray-400">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor" className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600">
              <path d="M32 30.031h-32l16-28.061z"></path>
            </svg>
            <Link rel="noopener noreferrer" to={'/admin/manageproduct'} className="flex items-center px-1 capitalize hover:underline"> Product Management</Link>
          </li>
          <li className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor" className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600">
              <path d="M32 30.031h-32l16-28.061z"></path>
            </svg>
            <Link rel="noopener noreferrer" to={'/admin/manageproduct/addProduct'} className="flex items-center px-1 capitalize hover:underline"> Add Product</Link>
          </li>


        </ol>
      </nav>

      <div className=" mx-auto overflow-hidden  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <h1 className="text-2xl font-bold mt-5">
          Publish your product image and information
        </h1>
        <div className="p-10 border-2 rounded m-10">
          <form onSubmit={handleSubmit} className="space-y-4  ">
            <div className="border border-collapse p-4">
              <h1 className="mb-4">Product Information</h1>
              <div className="grid lg:grid-cols-8 md:grid-cols-6 grid-cols-2 w-full gap-2">
                <input
                  required
                  className="w-full"
                  type="file"
                  name="coverImage"
                  onChange={handleFileChange}
                />
                <input
                  className="w-full"
                  type="file"
                  name="Image1"
                  onChange={handleFileChange}
                />
                <input
                  className="w-full"
                  type="file"
                  name="Image2"
                  onChange={handleFileChange}
                />
                <input
                  className="w-full"
                  type="file"
                  name="Image3"
                  onChange={handleFileChange}
                />
                <input
                  required
                  className="w-full"
                  type="file"
                  name="coverImage"
                  onChange={handleFileChange}
                />
                <input
                  className="w-full"
                  type="file"
                  name="Image1"
                  onChange={handleFileChange}
                />
                <input
                  className="w-full"
                  type="file"
                  name="Image2"
                  onChange={handleFileChange}
                />
                <input
                  className="w-full"
                  type="file"
                  name="Image3"
                  onChange={handleFileChange}
                />
              </div>
              <div className="mt-4">
                <label className=" text-black text-sm " htmlFor="title">
                  Video URL
                </label>
                <input
                  required
                  className="w-full mt-1 rounded-lg border border-gray-900 px-3 py-2 text-sm"
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ
                  "
                  id="title"
                  name="videoUrl"
                />
              </div>
            </div>
            <div className="border border-collapse p-4">
              <h1>Product Details</h1>
              <div className="mt-4">
                <label className=" text-black text-sm " htmlFor="productName">
                  Product Name
                </label>
                <input
                  required
                  className="w-full mt-1 rounded-lg border border-gray-900 px-3 py-2 text-sm"
                  placeholder="Shirt"
                  type="text"
                  id="productName"
                  name="productName"
                />
              </div>
              <div className="mt-4">
                <label className=" text-black text-sm " htmlFor="productPrice">
                  Product Price
                </label>
                <input
                  required
                  className="w-full mt-1 rounded-lg border border-gray-900 px-3 py-2 text-sm"
                  placeholder="$80"
                  type="number"
                  id="productPrice"
                  name="productPrice"
                />
              </div>
              <div>
                <label className=" text-black text-sm " htmlFor="title">
                  Product Category
                </label>

                <div className="relative mt-1.5">
                  <input
                    type="text"
                    list="productCategoryList"
                    id="productCategory"
                    name="categoryName"
                    className="w-full mt-1 rounded-lg border border-gray-900 px-3 py-2 text-sm [&::-webkit-calendar-picker-indicator]:opacity-0"
                    placeholder="Select a category"
                  />

                  <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </span>
                </div>

                <datalist name="productCategory" id="productCategoryList">
                  <option value="formal">Formal</option>
                  <option value="casual">Casual</option>
                  <option value="t-Shirt">T-Shirt</option>
                  <option value="Electronics">Electronics</option>
                  <option value="AK">Albert King</option>
                  <option value="BG">Buddy Guy</option>
                  <option value="EC">Eric Clapton</option>
                </datalist>
              </div>

              <div className="mt-4">
                <label className=" text-black text-sm mb-1 " htmlFor="title">
                  Product Description
                </label>
                <JoditEditor
                  name="productDescription"
                  id="productDescriptionId"
                ></JoditEditor>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
              >
                {loading ? "Loading.." : "Publish Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
