import { useQuery } from "@tanstack/react-query";
import React from "react";

const ProductGallery = () => {

  const { data: featureImageData = [], refetch: isLoading } = useQuery({
    queryKey: ["featureImageData"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/admin/feature-images`);
      const data = await res.json();
      return data?.data ? data?.data : [];
    },
  });

  const blankImg = 'https://i.ibb.co/7p2CvzT/empty.jpg';
  return (
    <section className="text-gray-600 body-font">
      <div className="container mt-6 py-4 mx-auto flex flex-wrap">

        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-full lg:w-1/2">
            <div className="md:p-2 p-1 w-full">
              {/* <img
                alt="gallery"
                className="w-full h-full object-cover object-center block bg-black"
                src={featureImageData[0]?.status == 'false' ? featureImageData[0]?.image : blankImg}
                srcSet={featureImageData[0]?.status == 'false' ? featureImageData[0]?.image : blankImg}
              /> */}

              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block bg-black"
                src={featureImageData[0]?.image}
              // srcSet={featureImageData[0]?.status == 'false' ? featureImageData[0]?.image : blankImg}
              />
            </div>
          </div>
          <div className="flex flex-wrap w-full lg:w-1/2">
            <div className="md:p-2 p-1 w-full">
              <img
                alt="gallery"
                className="w-full h-80 object-cover object-center block bg-black"
                src={featureImageData[1]?.status == 'true' ? featureImageData[1].image : blankImg}
                srcSet={featureImageData[1]?.status == 'true' ? featureImageData[1].image : blankImg}
              />
            </div>
            <div className="md:p-2 p-1 w-1/2 ">
              <img
                alt="gallery"
                className="w-full h-80 object-cover object-center block bg-black"
                src={featureImageData[2]?.status == "true" ? featureImageData[2].image : blankImg}
                srcSet={featureImageData[2]?.status == "true" ? featureImageData[2].image : blankImg}
              />
            </div>
            <div className="md:p-2 p-1 w-1/2 ">
              <img
                alt="gallery"
                className="w-full h-80 object-cover object-center block bg-black"
                src={featureImageData[3]?.status == "true" ? featureImageData[3].image : blankImg}
                srcSet={featureImageData[3]?.status == "true" ? featureImageData[3].image : blankImg}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
