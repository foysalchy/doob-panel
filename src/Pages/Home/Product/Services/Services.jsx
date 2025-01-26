import React from "react";

const Services = () => {
  return (
    <section className="body-font ">
      <div className="px-4 md:px-5 pt-10 pb-8 mx-auto">
        <div className="flex rounded flex-wrap justify-center sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 bg-white py-4">
          <div className="p-4 md:w-1/3 flex flex-col justify-center text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
              <img src="https://i.ibb.co/KwnHzQp/Services.png" srcSet="https://i.ibb.co/KwnHzQp/Services.png" alt="" />
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium">
                FREE AND FAST DELIVERY
              </h2>
              <p className="leading-relaxed text-xs">
                Free delivery for all orders 
              </p>
            </div>
          </div>

          <div className="md:p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
              <img src="https://i.ibb.co/HpsDTmS/Services.png" srcSet="https://i.ibb.co/HpsDTmS/Services.png" alt="" />
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium">
                24/7 CUSTOMER SERVICE
              </h2>
              <p className="leading-relaxed text-xs">
                Friendly 24/7 customer support
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
              <img src="https://i.ibb.co/wMBpHnN/Services-1.png" srcSet="https://i.ibb.co/wMBpHnN/Services-1.png" alt="" />
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium">
                MONEY BACK GUARANTEE
              </h2>
              <p className="leading-relaxed text-xs">
                We return money within 30 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
