import React from "react";

const ProductGallery = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mt-6 py-4 mx-auto flex flex-wrap">
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-full lg:w-1/2">
            <div className="md:p-2 p-1 w-full">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block bg-black"
                src="https://i.ibb.co/cYYfYTh/Frame-706.png"
              />
            </div>
          </div>
          <div className="flex flex-wrap w-full lg:w-1/2">
            <div className="md:p-2 p-1 w-full">
              <img
                alt="gallery"
                className="w-full h-80 object-cover object-center block bg-black"
                src="https://i.ibb.co/mzCpLH6/attractive-woman-wearing-hat-posing-black-background-1.png"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2 ">
              <img
                alt="gallery"
                className="w-full h-80 object-cover object-center block bg-black"
                src="https://i.ibb.co/nnQd6zJ/Frame-707.png"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2 ">
              <img
                alt="gallery"
                className="w-full h-80 object-cover object-center block bg-black"
                src="https://i.ibb.co/rZMTqhX/ps5-slim-goedkope-playstation-large-1.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
