import React, { useState } from "react";
import { MdDone } from "react-icons/md";

const ProductDescription = ({ metaTitle, description }) => {
  const [disOn, setDisOn] = useState(false)
  return (
    <div onClick={() => setDisOn(!disOn)} className={`${disOn ? 'h-full' : 'h-[600px]'} overflow-hidden`}>
      <h2 className="border-b">
        <span className="font-medium text-xl text-blue-500 border-b-2 border-blue-500">
          Description...
        </span>
      </h2>
      <div
        className="mt-4  text_editor"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
      {/* <p className="text-gray-500">
        {metaTitle}
      </p> */}
    </div>
  );
};

export default ProductDescription;
