import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { quillModules } from "../../../../quillModule";

const SellerEditBanglaDescription = ({
  product,
  description,
  setDescription,
  shortDescription,
  setShortDescription,
  categories,
}) => {
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleShortDescriptionChange = (value) => {
    setShortDescription(value);
  };

  return (
    <div className=" border mt-4 border-gray-400 md:px-10 px-3 py-5 md:pb-16 pb-20 w-full bg-gray-100 rounded">
      <div className="flex flex-col">
        <span className="font-bold">Product Description</span>
        <small>
          Having accurate product information raises discoverability.
        </small>
      </div>

      <div>
        <div className="flex flex-col mt-3">
          <span>
            Product Highlight <span className="text-red-500"> *</span>
          </span>
        </div>

        <ReactQuill
          modules={quillModules}
          name="shortDescription"
          className="rounded"
          value={product.description}
          onChange={handleShortDescriptionChange}
          placeholder="Enter your description here..."
          style={{
            height: "100px", // Set your desired height
            // Add any other styles you want to customize
          }}
        />
      </div>
      <div className="mt-16 py-2">
        <div className="flex flex-col mt-3">
          <span>
            Product Description <span className="text-red-500"> *</span>
          </span>
        </div>
        <ReactQuill
          modules={quillModules}
          onChange={handleDescriptionChange}
          name="description"
          value={product?.shortDescription}
          className=" rounded h-[150px]"
          placeholder="Enter your description here..."
        />
      </div>
    </div>
  );
};

export default SellerEditBanglaDescription;
