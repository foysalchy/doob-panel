import JoditEditor from "jodit-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { BsArrowRight } from "react-icons/bs";

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



      fetch(`https://salenow-v2-backend.vercel.app/addproduct`, {
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
                      type="file" accept="application/pdf,image/webp,image/tiff,image/heic,image/gif,image/bmp,image/png,image/jpeg"
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
              {
                loading ?
                  <button disabled className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4">
                    <span className="text-sm font-medium">
                      Loading...
                    </span>
                    <svg className="animate-spin h-4 w-4 ml-3 text-white" viewBox="0 0 24 24">

                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    </svg>
                  </button>

                  :
                  <button type='submit'
                    className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "

                  >
                    <span className="absolute -end-full transition-all group-hover:end-4">
                      <BsArrowRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:me-4">
                      Add Product
                    </span>
                  </button>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
