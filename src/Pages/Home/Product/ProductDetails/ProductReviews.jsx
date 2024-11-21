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



 
  const starCounts = {
    5: comments.filter((comment) => comment.star === 5).length,
    4: comments.filter((comment) => comment.star === 4).length,
    3: comments.filter((comment) => comment.star === 3).length,
    2: comments.filter((comment) => comment.star === 2).length,
    1: comments.filter((comment) => comment.star === 1).length,
  };
  
    // Step 2: Calculate the total number of reviews
  const totalRating = comments.length;
  const averageRating = totalRating / comments.length;

  // Step 3: Calculate the percentage of each star rating
  const progressBars = Object.keys(starCounts).map((star) => ({
    star: star,
    percentage: totalRating > 0 ? (starCounts[star] / totalRating) * 100 : 0,
  }));
  const progressBarStyle1 = { width: `${progressBars[4].percentage}%` };

  const progressBarStyle2 =  { width: `${progressBars[3].percentage}%` };
  const progressBarStyle3 =  { width: `${progressBars[2].percentage}%` };
  const progressBarStyle4 =  { width: `${progressBars[1].percentage}%` };
  const progressBarStyle5 =  { width: `${progressBars[0].percentage}%` };
  


  console.log(comments, 'comments review>>>>>>');
  return (
    <div>
      <div className="text-center mb-5 ">
        <h2 className="text-xl font-medium">Ratings & Reviews ({comments.length})</h2>
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

            return (
              <div className="mb-3 p-4 bg-white shadow rounded-lg">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-3">
                    {/* <div className="w-10 h-10 bg-gray-300 rounded-full" /> */}
                    <div>
                      <div className="font-semibold">{comment?.userId?.name}</div>
                      {/* <div className="text-sm text-gray-500">25, Nov 2025</div> */}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="text-sm font-semibold">Rating:</div>
                    <div className="flex">

                      {
                        Array(comment?.star).fill('n').map(itm => <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.396-.802 1.556-.802 1.952 0l1.837 3.729a1.172 1.172 0 00.885.676l4.118.598c.84.122 1.175 1.154.567 1.745l-2.982 2.905a1.172 1.172 0 00-.339 1.04l.703 4.093c.145.842-.738 1.481-1.487 1.083l-3.675-1.933a1.172 1.172 0 00-1.091 0l-3.675 1.933c-.749.398-1.632-.241-1.487-1.083l.703-4.093a1.172 1.172 0 00-.339-1.04l-2.982-2.905c-.608-.591-.273-1.623.567-1.745l4.118-.598a1.172 1.172 0 00.885-.676l1.837-3.729z" />
                        </svg>)
                      }
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="mt-2 text-gray-600">
                    {comment?.review}
                  </p> <br />
                  <div className="flex items-center">
                    {comment.images.map((image) => (
                      <div className="w-20 h-20">
                        <img src={image} alt="" className="w-20 h-20" />
                      </div>
                    ))}


                  </div>
                  <br />
                  {comment?.replies?.map((reply, index) => (
  <div key={index} className="text-sm font-semibold flex items-start gap-4 py-4" style={{borderBottom:'1px solid #dedede'}}>
    {/* User Initial */}
    <div className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center">
      {reply?.user?.slice(0, 1).toUpperCase()}
    </div>
    
    {/* Reply Content */}
    <div>
      <b>{reply?.user}</b>
      {/* Message */}
      {reply?.message && (
        <div className="text-gray-600 text-sm font-normal">
          {reply?.message}
        </div>
      )}
      {/* Image */}
      {reply?.image && (
        <div className="mt-2">
          <img  src={reply.image} alt="Reply attachment" className="max-w-full rounded w-[100px]" />
        </div>
      )}
      {/* Time */}
      
     
    </div>
    <hr className="my-2" />
  </div>
))}
                </div>
              </div>

            )
          })
        }

      </div>
    </div >
  );
};

export default ProductReviews;

