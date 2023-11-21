import React from "react";
import { FaStar } from "react-icons/fa6";

const ProductReviews = () => {
  const progressBarStyle = {
    width: "100%",
  };
  const progressBarStyle2 = {
    width: "80%",
  };
  const progressBarStyle3 = {
    width: "60",
  };
  const progressBarStyle4 = {
    width: "40%",
  };
  const progressBarStyle5 = {
    width: "20%",
  };

  return (
    <div>
      <div className="text-center mb-5 ">
        <h2 className="text-xl font-medium">Ratings & Reviews (273)</h2>
        <p>Summary</p>
      </div>
      <div className="border-b">
        <ol>
          <li className="px-6 md:px-8 lg:px-12 mb-4">
            <p className="flex items-center">
              5 <FaStar className="text-yellow-500 mx-1" /> reviews{" "}
            </p>
            <span id="ProgressLabel1" className="sr-only">
              Loading
            </span>
            <span
              role="progressbar"
              aria-labelledby="ProgressLabel1"
              aria-valuenow="40"
              className="block rounded-full bg-gray-200"
            >
              <span
                className="block h-2 bg-[#FFB400]"
                style={progressBarStyle} // Assign the style object here
              ></span>
            </span>
          </li>
          <li className="px-6 md:px-8 lg:px-12 mb-2">
            <p className="flex items-center">
              4 <FaStar className="text-yellow-500 mx-1" /> reviews{" "}
            </p>
            <span id="ProgressLabel2" className="sr-only">
              Loading
            </span>
            <span
              role="progressbar"
              aria-labelledby="ProgressLabel2"
              aria-valuenow="40"
              className="block rounded-full bg-gray-200"
            >
              <span
                className="block h-2 bg-[#FFB400]"
                style={progressBarStyle2} // Assign the style object here
              ></span>
            </span>
          </li>
          <li className="px-6 md:px-8 lg:px-12 mb-2">
            <p className="flex items-center">
              3 <FaStar className="text-yellow-500 mx-1" /> reviews{" "}
            </p>
            <span id="ProgressLabel3" className="sr-only">
              Loading
            </span>
            <span
              role="progressbar"
              aria-labelledby="ProgressLabel3"
              aria-valuenow="40"
              className="block rounded-full bg-gray-200"
            >
              <span
                className="block h-2 bg-[#FFB400]"
                style={progressBarStyle3} // Assign the style object here
              ></span>
            </span>
          </li>
          <li className="px-6 md:px-8 lg:px-12 mb-2">
            <p className="flex items-center">
              2 <FaStar className="text-yellow-500 mx-1" /> reviews{" "}
            </p>
            <span id="ProgressLabel4" className="sr-only">
              Loading
            </span>
            <span
              role="progressbar"
              aria-labelledby="ProgressLabel4"
              aria-valuenow="40"
              className="block rounded-full bg-gray-200"
            >
              <span
                className="block h-2 bg-[#FFB400]"
                style={progressBarStyle4} // Assign the style object here
              ></span>
            </span>
          </li>
          <li className="px-6 md:px-8 lg:px-12 mb-5">
            <p className="flex items-center">
              1 <FaStar className="text-yellow-500 mx-1" /> reviews{" "}
            </p>
            <span id="ProgressLabel5" className="sr-only">
              Loading
            </span>
            <span
              role="progressbar"
              aria-labelledby="ProgressLabel5"
              aria-valuenow="40"
              className="block rounded-full bg-gray-200"
            >
              <span
                className="block h-2 bg-[#FFB400]"
                style={progressBarStyle5} // Assign the style object here
              ></span>
            </span>
          </li>
        </ol>
      </div>
      <div>
        <h4 className="text-xl text-center my-5">Review this product</h4>
        <section className="">
          <div className="container px-5 mx-auto">
            <div className="lg:w-11/12 flex flex-col sm:flex-row sm:items-center md:items-start mx-auto">
              <div>
                <h1 className="flex-grow sm:pr-16 text-xl font-medium title-font text-gray-900">
                  Kristin Watson
                </h1>
                <p>
                  This is 💯 one hundred percent the best lip mask duo ever !!!
                  The scent is delicious and it’s so smooth from the scrub &
                  mask ~ This is perfection~ Smells just like honey 🍯 & the
                  packaging is so adorable ~ I’m so very happy with this product
                  🐻 🍯 ~
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2 items-center my-5">
                  <img
                    className="w-[100px] h-[100px]"
                    src="https://img.freepik.com/free-psd/mens-tri-blend-crew-tee-mockup_126278-130.jpg?w=740&t=st=1696792919~exp=1696793519~hmac=2120615b267f5ab7879436d3ac193cf6c02d0b0196dbc7329132e70c0061cd9eg"
                    srcSet="https://img.freepik.com/free-psd/mens-tri-blend-crew-tee-mockup_126278-130.jpg?w=740&t=st=1696792919~exp=1696793519~hmac=2120615b267f5ab7879436d3ac193cf6c02d0b0196dbc7329132e70c0061cd9eg"
                    alt="product"
                  />
                  <img
                    className="w-[100px] h-[100px]"
                    src="https://img.freepik.com/free-psd/mens-tri-blend-crew-tee-mockup_126278-130.jpg?w=740&t=st=1696792919~exp=1696793519~hmac=2120615b267f5ab7879436d3ac193cf6c02d0b0196dbc7329132e70c0061cd9e"
                    srcSet="https://img.freepik.com/free-psd/mens-tri-blend-crew-tee-mockup_126278-130.jpg?w=740&t=st=1696792919~exp=1696793519~hmac=2120615b267f5ab7879436d3ac193cf6c02d0b0196dbc7329132e70c0061cd9e"
                    alt="product"
                  />
                  <img
                    className="w-[100px] h-[100px]"
                    src="https://i.ibb.co/mzCpLH6/attractive-woman-wearing-hat-posing-black-background-1.png"
                    srcSet="https://i.ibb.co/mzCpLH6/attractive-woman-wearing-hat-posing-black-background-1.png"
                    alt="product"
                  />
                  <img
                    className="w-[100px] h-[100px]"
                    src="https://img.freepik.com/free-psd/mens-tri-blend-crew-tee-mockup_126278-130.jpg?w=740&t=st=1696792919~exp=1696793519~hmac=2120615b267f5ab7879436d3ac193cf6c02d0b0196dbc7329132e70c0061cd9e"
                    srcSet="https://img.freepik.com/free-psd/mens-tri-blend-crew-tee-mockup_126278-130.jpg?w=740&t=st=1696792919~exp=1696793519~hmac=2120615b267f5ab7879436d3ac193cf6c02d0b0196dbc7329132e70c0061cd9e"
                    alt="product"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center lg:ml-5 mt-2 md:mt-0">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductReviews;
