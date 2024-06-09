import React from "react";
import { useContext } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBrand = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [loading, setLoading] = useState(false);

  const { shopInfo } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = event.target;
    const name = e.target.name.value;
    const MetaTag = e.target.metaTitle.value;
    const MetaDescription = e.target.metaDescription.value;
    const image = e.target.image.files[0];
    const MetaImage = e.target.metaImage.files[0];
    const shopId = shopInfo._id;

    const imageFormData = new FormData();
    imageFormData.append("image", image);
    const imageUrl = await uploadImage(imageFormData);

    const metaImageFormData = new FormData();
    metaImageFormData.append("image", MetaImage);
    console.log(metaImageFormData, imageFormData);

    const formData = {
      name,
      image: imageUrl,
      MetaTag,
      MetaDescription,
      MetaImage: metaImageFormData,
      shopId,
      status: true,
    };
    postSlider(formData, form);
  };

  async function uploadImage(formData) {
    const url = `https://doob.dev/api/v1/image/upload-image?shopId=${shopInfo._id}`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const imageData = await response.json();
    return imageData.imageUrl;
  }

  const postSlider = (Slider, form) => {
    fetch(`https://doob.dev/api/v1/seller/brand/add`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Slider),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("success", "Your Brand Publish Successfully", "success");
        setLoading(false);
        form.reset();
        handleGoBack();
      });
  };

  return (
    <div className="">
      <button
        onClick={() => handleGoBack()}
        type="button"
        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
      >
        <span className="absolute -start-full transition-all group-hover:start-4">
          <FaLongArrowAltLeft />
        </span>
        <span className="text-sm font-medium transition-all group-hover:ms-4">
          Go Back
        </span>
      </button>

      <h2 className="text-2xl font-semibold text-black mb-6 text-center">
        Upload a brand for your shop
      </h2>

      <div>
        <div className=" border-black p-10 rounded border-dashed border-2  my-4">
          <form onSubmit={handleSubmit} action="">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                required
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring border-black"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-900"
              >
                Image Upload
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring border-black"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="metaTitle"
                className="block text-sm font-medium text-gray-900"
              >
                Meta Title
              </label>
              <input
                required
                type="text"
                id="metaTitle"
                name="metaTitle"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring border-black"
                placeholder="Enter meta title"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="metaImage"
                className="block text-sm font-medium text-gray-900"
              >
                Meta Image
              </label>
              <input
                required
                type="file"
                id="metaImage"
                name="metaImage"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring border-black"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="metaDescription"
                className="block text-sm font-medium text-gray-900"
              >
                Meta Description
              </label>
              <textarea
                required
                id="metaDescription"
                name="metaDescription"
                rows="3"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring border-black"
                placeholder="Enter meta description"
              ></textarea>
            </div>

            <button
              type="submit"
              className="group mt-4 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
            >
              <span className="absolute -start-full transition-all group-hover:start-4">
                <FaLongArrowAltRight />
              </span>
              <span className="text-sm font-medium transition-all group-hover:ms-4">
                {loading ? "Uploading ..." : "Add Your Brand"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
