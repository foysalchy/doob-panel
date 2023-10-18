import JoditEditor from "jodit-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const { data: categories = [], refetch } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/admin/category");
      const data = await res.json();
      return data;
    },
  });

  const [imageSets, setImageSets] = useState([
    { id: "Cover Photo*", images: [] },
    { id: "Image 1*", images: [] },
    { id: "Image 2*", images: [] },
    { id: "Image 3*", images: [] },
    { id: "Image 4", images: [] },
    { id: "Image 5", images: [] },
    { id: "Image 6", images: [] },
    { id: "Image 7", images: [] },
    // Add more sets as needed
  ]);
  let image = [];
  const handleImageChange = (e, setId) => {
    const files = Array.from(e.target.files);
    setImageSets((prevSets) =>
      prevSets.map((set) =>
        set.id === setId ? { ...set, images: files } : set
      )
    );
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    for (const set of imageSets) {
      if (set.images.length > 0) {
        await handleUploadSet(set);
      }
    }

    if (image.length > 2) {
      const form = event.target;
      const productDescription = form.productDescription.value;
      const categoryName = form.categoryName.value;
      const productPrice = form.productPrice.value;
      const productName = form.productName.value;
      const videoUrl = form.videoUrl.value;
      const productInfo = {
        image,
        videoUrl,
        productName,
        productPrice,
        categoryName,
        productDescription,
        author: user.userId,
      };

  

      fetch(`http://localhost:5000/addproduct`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          Swal.fire("success", "Your Category Publish Successfully", "success");
          form.reset();
        });
    } else
      Swal.fire(
        "Minimum Image Field  Is Three",
        "Please Add More Image",
        "info"
      );
  };

  const handleUploadSet = async (set) => {
    const uploadedUrls = await Promise.all(set.images.map(uploadImageToImgBB));

    image.push({ [set.id]: uploadedUrls });

    // Handle the uploaded URLs for the set as needed
  };

  async function uploadImageToImgBB(imageFile) {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=2b8c7f515b1f628299764a2ce4c4cb0e`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.data.url; // Return the URL of the uploaded image
      } else {
        console.error("Image upload failed:", await response.text());
        return null; // Return null to indicate upload failure
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      return null; // Return null to indicate upload failure
    }
  }

  return (
    <div>
      <nav
        aria-label="breadcrumb"
        className="w-full my-20 p-4 mb-4 rounded dark:bg-gray-800 dark:text-gray-100"
      >
        <ol className="flex h-8 space-x-2">
          <li className="flex items-center">
            <Link
              rel="noopener noreferrer"
              to={"/admin/dashboard"}
              title="Back to homepage"
              className="hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 pr-1 dark:text-gray-400"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              fill="currentColor"
              className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600"
            >
              <path d="M32 30.031h-32l16-28.061z"></path>
            </svg>
            <Link
              rel="noopener noreferrer"
              to={"/admin/manageproduct"}
              className="flex items-center px-1 capitalize hover:underline"
            >
              {" "}
              Product Management
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              fill="currentColor"
              className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600"
            >
              <path d="M32 30.031h-32l16-28.061z"></path>
            </svg>
            <Link
              rel="noopener noreferrer"
              to={"/admin/manageproduct/addProduct"}
              className="flex items-center px-1 capitalize hover:underline"
            >
              {" "}
              Add Product
            </Link>
          </li>
        </ol>
      </nav>

      <div className=" mx-auto overflow-hidden  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <h1 className="text-2xl font-bold mt-5">
          Publish your product image and information
        </h1>
        <div className="p-10 border-2 rounded m-10">
          <form onSubmit={handleUpload} className="space-y-4  ">
            <div className="border border-collapse p-4">
              <h1 className="mb-4">Product Information</h1>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full gap-2">
                {imageSets.map((set) => (
                  <div key={set.id}>
                    <label for="image" class="block text-sm text-gray-900 ">
                      {set.id}
                    </label>

                    <input
                      onChange={(e) => handleImageChange(e, set.id)}
                      type="file"
                      class="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className=" text-black text-sm " htmlFor="title">
                  Video URL
                </label>
                <input
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
                  <select
                    type="text"
                    list="productCategoryList"
                    id="productCategory"
                    name="categoryName"
                    className="w-full mt-1 rounded-lg border border-gray-900 px-3 py-2 text-sm"
                    placeholder="Select a category"
                  >
                    {categories?.map((category, i) => (
                      <option value={category?.title}>{category?.title}</option>
                    ))}
                  </select>
                </div>
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
