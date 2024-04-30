import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { CgCheck } from "react-icons/cg";
import PriceModal from "./PriceModal";
import { Link } from "react-router-dom";

const Price = () => {
  const { shopInfo } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { data: prices = [], refetch } = useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const res = await fetch(
        "https://backend.doob.com.bd/api/v1/admin/pricing"
      );
      const data = await res.json();
      return data;
    },
  });

  const { data: permission = [], loader } = useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}&shopId=${shopInfo?._id}`
      );
      const data = await res.json();

      return data?.data?.result;
    },
  });



  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <section className="text-gray-600 body-font overflow-hidden">
        <div>
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Pricing
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical.
            </p>
            {/* <div className="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6">
              <button className="py-1 px-4 bg-indigo-500 text-white focus:outline-none">
                Monthly
              </button>
              <button className="py-1 px-4 focus:outline-none">Annually</button>
            </div> */}
          </div>
          <div className="flex flex-wrap -m-4">
            {prices?.length &&
              prices?.map((price, index) => (
                <>
                  <PriceModal open={open} setOpen={setOpen} />
                  {price?.status && (
                    <>
                      {price?.best == "yes" ? (
                        <div key={index} className="p-4 xl:w-1/4 md:w-1/2 w-full">
                          <div className={`h-full p-6 rounded-lg border-2  flex flex-col  relative overflow-hidden ${ price._id ===shopInfo?.priceId ? 'border-indigo-500' : 'border-gray-300'}  `}>
                            <div className="flex  h-full flex-col justify-between">
                              <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                                POPULAR
                              </span>
                              <div className=" ">
                                <h2 className="text-md text-black font-semibold">
                                  {price.name}
                                </h2>

                                <hr />
                                <h2 className="text-sm tracking-widest title-font mb-1 font-medium"></h2>

                                {price.benefits.map((benefit, index) => (
                                  <p className="flex items-center text-gray-600 mb-2">
                                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                      <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M20 6L9 17l-5-5" />
                                      </svg>
                                    </span>
                                    {benefit}
                                  </p>
                                ))}

                                {permission.find(
                                  (perm) => perm._id === price._id
                                ) && (
                                    <div className="">
                                      <div>
                                        {permission
                                          .find((perm) => perm._id === price._id)
                                          ?.permissions?.map((itm) => (
                                            <p key={itm._id} className="flex items-center text-gray-600 mb-2">
                                              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                                <svg
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2.5"
                                                  className="w-3 h-3"
                                                  viewBox="0 0 24 24"
                                                >
                                                  <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                              </span>
                                              {itm?.name}
                                            </p>
                                          ))}
                                      </div>
                                    </div>
                                  )}
                              </div>
                              <div>
                                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4   border-gray-200">
                                  <span>{price.price}</span>
                                  <span className="text-lg ml-1 font-normal text-gray-500">
                                    /{price.timeDuration}
                                  </span>
                                </h1>
                                <>
                                  {shopInfo ? (
                                    <button
                                      onClick={() => setOpen(price)}
                                      className="flex items-center mt-auto text-white bg-gray-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                                    >
                                      Buy Now
                                      <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 ml-auto"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                      </svg>
                                    </button>
                                  ) : (
                                    <Link
                                      to={"/sign-up"}
                                      className="flex items-center mt-auto text-white bg-gray-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                                    >
                                      Buy Now
                                      <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 ml-auto"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                      </svg>
                                    </Link>
                                  )}
                                </>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 xl:w-1/4 md:w-1/2  w-full">
                          <div className={`h-full p-6 rounded-lg border-2  flex flex-col  relative overflow-hidden ${ price._id ===shopInfo?.priceId ? 'border-500-500 bg-slate-200' : 'border-gray-300'}  `}>
                         { price._id ===shopInfo?.priceId && <div className="font-bold text-green-500 mb-2 text-lg text-center border-b-2 border-green-500 ">
                            Running Package
                         
                          </div>}
                            <div className="flex  h-full  flex-col justify-between">
                              <div className=" ">
                                <h2 className="text-md text-black font-semibold">
                                  {price.name}
                                </h2>

                              
                                <h2 className="text-sm tracking-widest title-font mb-1 font-medium"></h2>

                                {price.benefits.map((benefit, index) => (
                                  <p className="flex items-center text-gray-600 mb-2">
                                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                      <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M20 6L9 17l-5-5" />
                                      </svg>
                                    </span>
                                    {benefit}
                                  </p>
                                ))}

                                {permission.find(
                                  (perm) => perm._id === price._id
                                ) && (
                                    <div className="">
                                      <div>
                                        {permission
                                          .find((perm) => perm._id === price._id)
                                          ?.permissions?.map((itm) => (
                                            <p className="flex items-center text-gray-600 mb-2">
                                              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                                <svg
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2.5"
                                                  className="w-3 h-3"
                                                  viewBox="0 0 24 24"
                                                >
                                                  <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                              </span>
                                              {itm?.name}
                                            </p>
                                          ))}
                                      </div>
                                    </div>
                                  )}
                              </div>
                              <div>
                                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4   border-gray-200">
                                  <span>{price.price}</span>
                                  <span className="text-lg ml-1 font-normal text-gray-500">
                                    /{price.timeDuration}
                                  </span>
                                </h1>
                                <>
                                  {shopInfo ? (
                                    <button
                                      onClick={() => setOpen(price)}
                                      className="flex items-center mt-auto text-white bg-gray-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                                    >
                                      Buy Now
                                      <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 ml-auto"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                      </svg>
                                    </button>
                                  ) : (
                                    <Link
                                      to={"/sign-up"}
                                      className="flex items-center mt-auto text-white bg-gray-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                                    >
                                      Buy Now
                                      <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 ml-auto"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                      </svg>
                                    </Link>
                                  )}
                                </>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              ))}
          </div>

          <Component />
        </div>
      </section>
    </div>
  );
};

export default Price;

const Component = () => {
  return (
    <div className="flex justify-center py-12">
      <div className="mx-4 bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-blue-200 p-2 rounded-full">
            <PersonStandingIcon className="text-blue-800 h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">All-Access</h2>
            <p className="text-gray-600">For your shop</p>
          </div>
        </div>

        <p className="mb-6">
          Allowed to share the access with up to 05 members (five seats) You can
          also add an additional 5 new members to your parent account, allowing
          them to access team account files without any extra cost!
        </p>
        <Link
          to={"/contact"}
          className="bg-blue-600 text-white rounded-md px-4 py-2 w-full transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Get All-Access - For your shop
        </Link>
      </div>
      <div className="mx-4 bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-blue-200 p-2 rounded-full">
            <SearchIcon className="text-blue-800 h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              Get unlimited access for your team
            </h2>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-blue-200 p-2 rounded-full">
            <FolderSyncIcon className="text-blue-800 h-8 w-8" />
          </div>
          <p className="text-xl">
            Lifetime access to all components and templates with free updates
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-blue-200 p-2 rounded-full">
            <MenuIcon className="text-blue-800 h-8 w-8" />
          </div>
          <p className="text-xl">
            Get instant access to all free 13 Bonus Templates (Worth $220)
          </p>
        </div>
      </div>
    </div>
  );
};

function FolderSyncIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1" />
      <path d="M12 10v4h4" />
      <path d="m12 14 1.5-1.5c.9-.9 2.2-1.5 3.5-1.5s2.6.6 3.5 1.5c.4.4.8 1 1 1.5" />
      <path d="M22 22v-4h-4" />
      <path d="m22 18-1.5 1.5c-.9.9-2.1 1.5-3.5 1.5s-2.6-.6-3.5-1.5c-.4-.4-.8-1-1-1.5" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function PersonStandingIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="5" r="1" />
      <path d="m9 20 3-6 3 6" />
      <path d="m6 8 6 2 6-2" />
      <path d="M12 10v4" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
