import React from "react";
import { FaStar } from "react-icons/fa6";

const ProductReviews = ({ comments }) => {



  if (!Array.isArray(comments) || comments.length === 0) {
    return (
      <div>
        <p>No reviews available.</p>
      </div>
    );
  }


  const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0);
  const averageRating = totalRating / comments.length;

  // Calculate progress bar widths based on average rating
  const progressBarStyle1 = { width: `${(averageRating / 5) * 100}%` };
  const progressBarStyle2 = { width: `${((averageRating - 1) / 5) * 100}%` };
  const progressBarStyle3 = { width: `${((averageRating - 2) / 5) * 100}%` };
  const progressBarStyle4 = { width: `${((averageRating - 3) / 5) * 100}%` };
  const progressBarStyle5 = { width: `${((averageRating - 4) / 5) * 100}%` };


  console.log(totalRating, 'comments review>>>>>>');
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
              aria-valuenow={averageRating}
              className="block rounded-full bg-gray-200"
            >
              <span
                className="block h-2 bg-[#FFB400]"
                style={progressBarStyle1}
              ></span>
            </span>
          </li>
          <li className="px-6 md:px-8 lg:px-12 mb-4">
            <p className="flex items-center">
              4 <FaStar className="text-yellow-500 mx-1" /> reviews{" "}
            </p>
            <span id="ProgressLabel1" className="sr-only">
              Loading
            </span>
            <span
              role="progressbar"
              aria-labelledby="ProgressLabel1"
              aria-valuenow={averageRating}
              className="block rounded-full bg-gray-200"
            >
              <span
                className="block h-2 bg-[#FFB400]"
                style={progressBarStyle2}
              ></span>
            </span>
          </li>
          <li className="px-6 md:px-8 lg:px-12 mb-4">
            <p className="flex items-center">
              3 <FaStar className="text-yellow-500 mx-1" /> reviews{" "}
            </p>
            <span id="ProgressLabel1" className="sr-only">
              Loading
            </span>
            <span
              role="progressbar"
              aria-labelledby="ProgressLabel1"
              aria-valuenow={averageRating}
              className="block rounded-full bg-gray-200"
            >
              <span
                className="block h-2 bg-[#FFB400]"
                style={progressBarStyle3}
              ></span>
            </span>
          </li>
          <li className="px-6 md:px-8 lg:px-12 mb-4">
            <p className="flex items-center">
              2 <FaStar className="text-yellow-500 mx-1" /> reviews{" "}
            </p>
            <span id="ProgressLabel1" className="sr-only">
              Loading
            </span>
            <span
              role="progressbar"
              aria-labelledby="ProgressLabel1"
              aria-valuenow={averageRating}
              className="block rounded-full bg-gray-200"
            >
              <span
                className="block h-2 bg-[#FFB400]"
                style={progressBarStyle4}
              ></span>
            </span>
          </li>
          <li className="px-6 md:px-8 lg:px-12 mb-4">
            <p className="flex items-center">
              1 <FaStar className="text-yellow-500 mx-1" /> reviews{" "}
            </p>
            <span id="ProgressLabel1" className="sr-only">
              Loading
            </span>
            <span
              role="progressbar"
              aria-labelledby="ProgressLabel1"
              aria-valuenow={averageRating}
              className="block rounded-full bg-gray-200"
            >
              <span
                className="block h-2 bg-[#FFB400]"
                style={progressBarStyle5}
              ></span>
            </span>
          </li>
        </ol>
      </div>
      <div className="">
        <h4 className="text-xl text-center my-5">Review this product</h4>
        {
          comments &&
          comments.map((comment) => {
            console.log(comment?.name && comment?.name, 'name');
            return (
              <section className="" key={comment.id}>
                <div className="container  mx-auto mb-2  ">
                  <div className="border-b pt-2 mt-2 px-2 flex flex-col  sm:flex-row sm:items-center md:items-start mx-auto">
                    <div>
                      <div className="flex-grow flex gap-2 items-center  sm:pr-16 text-xl font-medium title-font text-gray-900">
                        <div className="bg-gray-100 w-[40px] rounded-full flex items-center justify-center h-[40px]">
                          {comment?.name ? comment.name.charAt(0) : '🙍‍♂️'}
                        </div>
                        <span className="">{comment?.name}</span>
                      </div>
                      <p className="text-gray-500">{comment?.comment}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2 items-center my-5">
                        <img
                          className="w-[100px] h-[100px]"
                          src={comment?.photo?.image}
                          alt="product"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center lg:ml-5 mt-2 md:mt-0">
                      {
                        Array(comment?.rating).fill('n').map(itm => <FaStar key={itm} className="text-yellow-400" />)
                      }

                    </div>
                  </div>
                </div>
              </section>
            )
          })
        }

      </div>
    </div>
  );
};

export default ProductReviews;
