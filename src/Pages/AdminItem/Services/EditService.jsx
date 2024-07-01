import { useQuery } from "@tanstack/react-query";
import JoditEditor from "jodit-react";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import UploadImage from "../../SellerItems/ProductManagement/SellerAddProduct/Components/UploadImage";

const EditService = ({ OpenModal, setOpenModal, BlogInfo, refetch }) => {
  const [previewUrl, setPreviewUrl] = useState(BlogInfo.img);

  // console.log(BlogInfo);
  const { data: categories = [] } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch("https://doob.dev/api/v1/admin/category");
      const data = await res.json();
      return data;
    },
  });
  const handleFileChange = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        "https://doob.dev/api/v1/image/upload-image",
        {
          method: "POST",
          body: formData,
        }
      );

      const imageData = await response.json();
      setPreviewUrl(imageData.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
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

  const handleBlogUpdate = async (e) => {
    e.preventDefault();

    const img = previewUrl;
    const form = e.target;
    const title = e.target.title.value;
    const message = e.target.message.value;
    const price = e.target.price.value;
    const MetaTag = e.target.MetaTag.value;
    const MetaDescription = e.target.MetaDescription.value;
    const category = e.target.category.value;
    const subscriptionPeriod = e.target.subscriptionPeriod.value;
    const MetaImage = e.target.MetaImage.files[0];
    const pricingPriceOne = form.pricingPriceOne.value;
    const pricingPriceSix = form.pricingPriceSix.value;

    const pricingPriceTwelve = form.pricingPriceTwelve.value;
    const pricingPriceTwenty = form.pricingPriceTwelve.value;

    const metaImageFormData = new FormData();
    metaImageFormData.append("image", MetaImage);

    const metaImageUrl = await uploadImage(metaImageFormData);

    const data = {
      img,
      title,
      price,
      message,
      MetaTag,
      MetaDescription,
      category,
      subscriptionPeriod,
      MetaImage: metaImageUrl ?? BlogInfo?.MetaImage,
      pricingPriceOne: `${pricingPriceOne},1`,
      pricingPriceSix: `${pricingPriceSix},6`,
      pricingPriceTwelve: `${pricingPriceTwelve},12`,
      pricingPriceTwenty: `${pricingPriceTwenty},24`,
    };

    console.log(data);
    // return;

    try {
      const response = await fetch(
        `https://doob.dev/api/v1/admin/service/update-service/${BlogInfo._id}`,
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
          Swal.fire("Update Service Successful", "", "success");
          refetch();
          setOpenModal(false);
        });
    } catch (error) {
      console.error("Error updating Service:", error);
    }
  };

  console.log("BlogInfo?.category", BlogInfo?.category);

  return (
    <div
      className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${
        OpenModal ? "block" : "hidden"
      }`}
    >
      <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px] ">
        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border-b">
          <div className="pb-2 text-xl font-bold text-dark text-center sm:text-2xl">
            Edit Service
          </div>
          <div
            onClick={() => setOpenModal(!OpenModal)}
            className="cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500"
          >
            <RxCross2 className="text-xl" />
          </div>
        </div>

        <form
          className="h-[500px] overflow-y-scroll"
          onSubmit={handleBlogUpdate}
        >
          <input
            name="title"
            className="w-full p-2 my-4 border"
            defaultValue={BlogInfo.title}
          />

          <div>
            <label className="sr-only text-black" htmlFor="title">
              Service Price
            </label>
            <input
              required
              className="w-full rounded-lg border border-gray-900 p-3 text-sm"
              placeholder="Service Price"
              type="text"
              id="price"
              defaultValue={BlogInfo?.price}
              name="price"
            />
          </div>
          <div className="relative mt-1.5">
            <select
              type="text"
              id="Category"
              defaultValue={{
                label: BlogInfo?.category,
                value: BlogInfo?.category,
              }}
              name="category"
              className="w-full mt-1 rounded-lg border border-gray-900 px-3 py-2 text-sm"
              placeholder="Select a category"
            >
              <option selected disabled value="Select Service Category">
                Select Service Category
              </option>
              {categories.length &&
                categories?.map((category, i) => (
                  <option key={category?.title} value={category?.title}>
                    {category?.title}
                  </option>
                ))}
            </select>
          </div>

          <div className="relative mt-1.5">
            <select
              type="text"
              list="subscriptionPeriod"
              id="subscriptionPeriod"
              name="subscriptionPeriod"
              className="w-full mt-1 rounded-lg border border-gray-900 px-3 py-2 text-sm"
              placeholder="Select Subscription Period"
              defaultValue={{
                label: BlogInfo?.subscriptionPeriod,
                value: BlogInfo?.subscriptionPeriod,
              }}
            >
              <option disabled selected className="" value="">
                Select Service Parched Time
              </option>
              <option value="One Time">One Time</option>
              <option value="Monthly">Monthly</option>
              {/* <option value="Yearly">Yearly</option> */}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center w-full p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl"
            >
              <img
                src={previewUrl || BlogInfo.img}
                alt="File Preview"
                className="mt-2 w-8 h-8"
              />
              <h2 className="mt-1 font-medium tracking-wide text-gray-700 ">
                {previewUrl.slice(25)}
              </h2>
              <input
                id="dropzone-file"
                type="file"
                accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                name="photo"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div>
            <div>
              <JoditEditor
                value={BlogInfo.message}
                name="message"
                id="message"
              />
            </div>
          </div>

          <div>
            <label className="sr-only text-black" htmlFor="title">
              Meta Image'
            </label>
            <input
              // required
              className="w-full rounded-lg border border-gray-900 p-3 text-sm"
              placeholder="Meta Description"
              type="file"
              id="MetaImage"
              name="MetaImage"
            />
          </div>
          <label
            htmlFor="pricingPriceOne"
            className="inline-block mb-1 font-medium"
          >
            1st Month Discount
          </label>
          <input
            placeholder="$50"
            // required
            type="number"
            name="pricingPriceOne"
            defaultValue={BlogInfo?.pricingPriceOne?.split(",")[0]}
            // value={formData.one}
            // onChange={(e) => handleInputChange("one", e.target.value)}
            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
          />
          <label
            htmlFor="pricingPriceSix"
            className="inline-block mb-1 font-medium"
          >
            Six Month Discount
          </label>
          <input
            placeholder="$100"
            required
            type="number"
            name="pricingPriceSix"
            defaultValue={BlogInfo?.pricingPriceSix?.split(",")[0]}
            // value={formData.six}
            // onChange={(e) => handleInputChange("six", e.target.value)}
            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
          />
          <label
            htmlFor="pricingPriceTwelve"
            className="inline-block mb-1 font-medium"
          >
            One Year Discount
          </label>
          <input
            placeholder="$500"
            required
            type="number"
            name="pricingPriceTwelve"
            defaultValue={BlogInfo?.pricingPriceTwelve?.split(",")[0]}
            // value={formData.twelve}
            // onChange={(e) => handleInputChange("twelve", e.target.value)}
            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
          />
          <label
            htmlFor="pricingPriceTwenty"
            className="inline-block mb-1 font-medium"
          >
            Two Year Discount
          </label>
          <input
            placeholder="$150"
            required
            type="number"
            name="pricingPriceTwenty"
            defaultValue={BlogInfo?.pricingPriceTwenty?.split(",")[0]}
            // value={formData.twenty}
            // onChange={(e) => handleInputChange("twenty", e.target.value)}
            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
          />

          <input
            name="MetaTag"
            className="w-full p-2 my-4 border"
            defaultValue={BlogInfo.MetaTag}
          />
          <textarea
            className="w-full border p-2"
            defaultValue={BlogInfo.MetaDescription}
            name="MetaDescription"
            id=""
            cols="20"
            rows="2"
          ></textarea>

          <div className="flex justify-start">
            <button
              type="submit"
              className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500 mt-4"
            >
              <span className="absolute -start-full transition-all group-hover:start-4">
                <svg
                  className="h-5 w-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <span className="text-sm font-medium transition-all group-hover:ms-4">
                Update Service
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditService;
