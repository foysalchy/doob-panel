import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { RxCross2 } from "react-icons/rx";

const MediaManager = () => {
  // https://doob.dev/api/v1/image/upload-image?
  const { shopInfo } = useContext(AuthContext);
  const [hoverIndex, setHoverIndex] = useState(null);

  // const handleMouseEnter = (index) => {
  //     setHoverIndex(index);
  // };

  // const handleMouseLeave = () => {
  //     setHoverIndex(null);
  // };
  const { data: allImages = [], refetch } = useQuery({
    queryKey: ["seller-images"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5001/api/v1/image/get-image-for-seller?shopId=${shopInfo._id}`
      );
      const data = await res.json();
      return data.imageUrls;
    },
  });

  const delete_image = (img) => {
    const id = img;
    const parts = id.split("/");
    const i = parts[parts.length - 1].split(".")[0];
    fetch(`https://doob.dev/api/v1/image/delete-image?id=${i}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        refetch();
      });
  };

  return (
    <div className="flex flex-wrap">
      {allImages.map((image, index) => (
        <div key={index} className="relative group">
          <img
            className="md:h-60 md:w-60 w-36 h-36 border-black border ml-2 mb-2"
            src={image}
            alt={`Image ${index}`}
          />
          <button
            className="absolute top-2 md:right-4 right-2 flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => delete_image(image)}
          >
            <RxCross2 />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MediaManager;
