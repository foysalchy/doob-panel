import JoditEditor from "jodit-react";
import React, { useState } from "react";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(Array(8).fill(null));
  console.log(images);

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const name = form.productName.value;
    const videoUrl = form.videoUrl.value;
    const categoryName = form.categoryName.value;
    const description = form.productDescription.value;

    const formData = new FormData();
    console.log(formData);
    images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image);
      }
    });

    const url = `https://api.imgbb.com/1/upload?key=2b8c7f515b1f628299764a2ce4c4cb0e`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <div className=" mx-auto overflow-hidden  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <h1 className="text-2xl font-bold mt-5">
          Publish your product image and information
        </h1>
        <div className="p-10 border-2 rounded m-10">
          <form onSubmit={handleSubmit} className="space-y-4  ">
            <div className="border border-collapse p-4">
              <h1 className="mb-4">Product Information</h1>
              <div className="grid lg:grid-cols-8 md:grid-cols-6 grid-cols-2 w-full gap-2">
                {images.map((image, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <label
                      htmlFor={`image-input-${index}`}
                      className="flex flex-col items-center w-full p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl"
                    >
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index + 1}`}
                          className="mt-2 w-8 h-8"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 h-8 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                          />
                        </svg>
                      )}

                      <input
                        id={`image-input-${index}`}
                        type="file"
                        name={`image-${index}`}
                        className="hidden"
                        onChange={(event) => handleImageChange(index, event)}
                      />
                    </label>
                    <h1 className="text-sm">{`${
                      index === 0 ? "Cover Image" : "Image " + (index + 1)
                    }`}</h1>
                  </div>
                ))}
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
                  type="url"
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
