import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";

import { RxCross2 } from "react-icons/rx";
import LoaderData from "../../../../Common/LoaderData";

const MediaManageAdmin = () => {
    // https://doob.dev/api/v1/image/upload-image?

    const [hoverIndex, setHoverIndex] = useState(null);

    // const handleMouseEnter = (index) => {
    //     setHoverIndex(index);
    // };

    // const handleMouseLeave = () => {
    //     setHoverIndex(null);
    // };
    const { data: allImages = [], refetch, isLoading } = useQuery({
        queryKey: ["admin-images"],
        queryFn: async () => {
            const res = await fetch(
                `https://doob.dev/api/v1/image/get-image-for-admin`
            );
            const data = await res.json();
            return data.imageUrls;
        },
    });


    // console.log(allImages)

    const [deleteLoading, setDeleteLoading] = useState(false)
    const delete_image = async (img) => {
        setDeleteLoading(img)
        const id = img;
        const parts = id.split("/");
        const i = parts[parts.length - 1].split(".")[0];
        fetch(`https://doob.dev/api/v1/image/delete-image?id=${i}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                refetch();
                setDeleteLoading(false)
            });
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold my-5 ">Manage Your Media</h1>

            {
                isLoading && <LoaderData />
            }
            <div className="flex flex-wrap mt-2">
                {allImages.map((image, index) => (
                    <div key={index} className="relative group">
                        <img
                            className="md:h-60 md:w-60 w-36 h-36 border-black border ml-2 mb-2"
                            src={image}
                            alt={`Image ${index}`}
                        />
                        {

                            deleteLoading === image && <div className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-40">deleting..</div>

                        }
                        <button
                            className="absolute top-2 md:right-4 right-2 flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            onClick={() => delete_image(image)}
                        >
                            <RxCross2 />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaManageAdmin;
