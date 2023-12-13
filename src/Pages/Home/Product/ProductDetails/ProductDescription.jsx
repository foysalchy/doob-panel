import React from "react";
import { MdDone } from "react-icons/md";

const ProductDescription = ({ description }) => {
  return (
    <div className="">
      <h2 className="border-b">
        <span className="font-medium text-xl text-blue-500 border-b-2 border-blue-500">
          Description
        </span>
      </h2>
      <div
        className="mt-4  "
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </div>
  );
};

export default ProductDescription;
