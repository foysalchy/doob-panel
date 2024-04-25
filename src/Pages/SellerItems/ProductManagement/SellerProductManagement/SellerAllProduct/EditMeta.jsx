import React from "react";

// const MetaTag = form?.MetaTag?.value;
// const MetaTagMetaDescription = form?.MetaDescription?.value;
// const MetaImageFile = form?.MetaImage?.files[0];
const EditMeta = ({ product }) => {
  console.log(product?.MetaImage);
  return (
    <div className="border mt-4 border-gray-400 md:px-10 px-3 py-5 w-full bg-gray-100 rounded">
      <div className="flex flex-col mb-4">
        <span className="font-bold">Meta For your Product</span>
        <small>Sellers can provide meta for your product</small>
      </div>
      <div>
        <label className=" text-black" htmlFor="title">
          Meta Tag
        </label>
        <input
          required
          defaultValue={product?.metaTitle}
          className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
          placeholder="Meta Tag"
          type="text"
          id="MetaTag"
          name="MetaTag"
        />
      </div>

      <div className="mt-2">
        <label className=" text-black" htmlFor="title">
          Meta Description
        </label>
        <textarea
          required
          defaultValue={product?.metaDescription}
          className="flex-grow w-full h-28 py-2 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
          type="text"
          id="MetaDescription"
          name="MetaDescription"
        />
      </div>
      <div className=" mt-2">
        <label className="text-sm">Upload Image</label>
        {product?.MetaImage?.src && (
          <div>
            <img
              className="h-20 w-20"
              src={product?.MetaImage?.src}
              alt="metaImage"
            />
          </div>
        )}
        <input
          name="MetaImage"
          type="file"
          placeholder="Upload Image"
          className="flex-grow w-full py-4 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};

export default EditMeta;
