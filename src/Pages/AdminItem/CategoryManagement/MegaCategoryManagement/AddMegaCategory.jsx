import BrightAlert from "bright-alert";
import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Swal from "sweetalert2";

const AddMegaCategory = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const slag = form.slag.value;
    const image = form.img.files[0];
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    const url = `https://doob.dev/api/v1/image/upload-image`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const image = imageData.imageUrl;
        const categoryData = {
          name,
          slag,
          image,
          timeStamp: new Date().getTime(),
          status: "true",
          feature: false,
          menu: false,
        };
        postCategory(categoryData, form);
      });
  };

  const postCategory = (categoryData, form) => {
    console.log(
      "🚀 ~ file: AddMegaCategory.jsx:39 ~ postCategory ~ categoryData:",
      categoryData
    );

    fetch("https://doob.dev/api/v1/admin/category/megacategory", {
      method: "post",
      headers: {
        "content-type": "application/json",
        // "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(categoryData),
    })
      .then((res) => res.json())
      .then((data) => {
        BrightAlert({ timeDuration: 1000 });
        setLoading(false);
        form.reset();
      });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="lg:max-w-3xl ring-1 ring-gray-200 rounded-xl m-auto w-full md:p-4 p-2"
      >
        <h1 className="text-2xl font-semibold mb-8">Add mega category</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            name="name"
            id="name"
            className="w-full border-2 border-gray-300 p-2 rounded-lg mb-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="slag">Slag</label>
          <input
            required
            type="text"
            name="slag"
            id="slag"
            className="w-full border-2 border-gray-300 p-2 rounded-lg mb-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="upload">Upload Image</label>
          <input
            required
            type="file"
            name="img"
            id="upload"
            className="w-full border-2 border-gray-300 p-2 rounded-lg mb-2"
          />
        </div>
        <div className=" gap-2">
          {/* <input
            value={"Upload"}
            type="submit"
            className=" bg-black text-white border-gray-300 w-[100px] mt-6 duration-200 hover:shadow-lg p-2 rounded-lg mb-2"
          /> */}
          <button
            type="submit"
            className="group mt-4 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
          >
            <span className="absolute -start-full transition-all group-hover:start-4">
              <FaLongArrowAltRight />
            </span>
            <span className="text-sm font-medium transition-all group-hover:ms-4">
              {loading ? "Uploading" : "Upload Mega Category"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMegaCategory;
