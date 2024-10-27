import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
const TrackOrder = () => {
      const [steps, setSteps] = useState({
            stepsItems: ["Order", "Processing", "Shipped", "Delivered"],
            // currentStep: 5
      });
      const location = useLocation();
      const [order, setOrder] = useState(false);
      const [loading, setLoading] = useState(false);

      const getQueryParams = () => {
            const queryParams = new URLSearchParams(location.search);
            return queryParams.get('invoice');
      };

      const invoice = getQueryParams();
      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });
      const pathname = window.location.pathname;
      const idMatch = pathname.match(/\/shop\/([^/]+)/);
      const shopId = idMatch ? idMatch[1] : null;

      const {
            data: shop = {},
      } = useQuery({
            queryKey: ["shop"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/${shopId}`
                  );
                  const data = await res.json();
                  return data;
            },
      });
      const shopInfo = shop
      console.log(shopInfo, 'shopInfox')
      const trackOrderSubmit = (e) => {
            e.preventDefault();
            setLoading(true);
            const orderId = e.target.orderId.value;
            fetch(
                  `https://doob.dev/api/v1/shop/order-track?orderId=${orderId}`
            )
                  .then((res) => res.json())
                  .then((data) => {
                        setOrder(data.data);
                        setLoading(false);
                  });
      };
      useEffect(() => {
            if (invoice) {
                  console.log('doobsop092035')
                  const orderId = invoice; // Assuming orderId is a parameter
                  if (orderId) {
                        setLoading(true);
                        fetch(`https://doob.dev/api/v1/shop/order-track?orderId=${orderId}`)
                              .then((res) => res.json())
                              .then((data) => {
                                    setOrder(data.data);
                                    setLoading(false);
                              });
                  }
            }
      }, [invoice]);
      let currentStep;
      if (!order?.status) {
            currentStep = 2;
      } else if (order?.status === "delivered") {
            currentStep = 5;
      } else if (order?.status === "ready_to_ship") {
            currentStep = 3;
      } else if (order?.status === "shipped") {
            currentStep = 4;
      } else if (order?.status === "canceled" || "failed" || "returned") {
            currentStep = 5;
      } else {
            // Default to 1 or any other appropriate value
            currentStep = 1;
      }

      function formatTimestamp(timestamp) {
            const date = new Date(timestamp);
            const options = { year: "numeric", month: "long", day: "numeric" };
            const formattedDate = date.toLocaleDateString("en-US", options);
            return formattedDate;
      }

      const totalPrice = order?.productList?.reduce((total, item) => {
            return total + item?.price * item?.quantity;
      }, 0);

      return (
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                  <div className={!order ? "py-28" : "py-0"}>
                        {invoice ? (
                              <div className="text-center">
                                    <Helmet>
                                          <title>Thank You</title>
                                    </Helmet>
                                    <h1>Thank You</h1>
                                    <h1 className="text-xl text-green-500">Your Order Successfully Placed</h1>
                                    <p>Your Invoice Number: <span className="text-xl  text-green-500">{invoice}</span> </p>
                              </div>
                        ) : (
                              <div>No invoice number found.</div>
                        )}
                        {
                              <form
                                    onSubmit={trackOrderSubmit}
                                    className="max-w-2xl px-4 mx-auto mt-12 flex gap-4 pb-10 justify-center items-center"
                              >
                                    <div className="relative w-full ">
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                />
                                          </svg>
                                          <input
                                                type="text"
                                                placeholder="Search with your order id"
                                                name="orderId"
                                                className="w-full py-3 pl-12 pr-4 text-gray-500 border border-black outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                                          />
                                    </div>
                                    <button type="submit" className="bg-gray-900 py-3 text-white px-7">
                                          {loading ? "Searching" : "Search"}
                                    </button>
                              </form>
                        }
                        {order && (
                              <>
                                    <>
                                          <div ref={componentRef}
                                                className="p-12 mx-8 print-data bg-white  mt-6">

                                                <header className="flex items-start justify-between">
                                                      <img src={shopInfo?.logo} alt="logo" className='w-[200px]' />
                                                      <div className='whitespace-wrap w-[300px]'>
                                                            <p className='text-gray-600 text-end'>{shopInfo?.shopName}</p>
                                                            <p className='text-gray-600 text-end'>{shopInfo?.address}</p>
                                                            <p className='text-gray-600 text-end'>{shopInfo?.shopEmail}</p>
                                                            <p className='text-gray-600 text-end'>{shopInfo?.shopNumber}</p>
                                                      </div>
                                                </header>

                                                <main>
                                                      <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
                                                            SALES INVOICE
                                                      </div>

                                                      {/*.*/}
                                                      {/*.... Address ...*/}
                                                      {/*.*/}
                                                      <div className="flex items-center justify-between mt-4">
                                                            <div>
                                                                  <div className='flex items-center gap-2'>
                                                                        <h4 className='font-semibold text-gray-700 text-sm'>
                                                                              Name :
                                                                        </h4>
                                                                        <p className="text-gray-600 text-sm">{order?.addresses?.fullName}</p>
                                                                  </div>

                                                                  <div className='flex items-center gap-2'>
                                                                        <h4 className='font-semibold text-gray-700 text-sm'>
                                                                              Phone :
                                                                        </h4>
                                                                        <p className="text-gray-600 text-sm">{order?.addresses?.mobileNumber}</p>
                                                                  </div>
                                                                  <div className='flex items-center gap-2'>
                                                                        <h4 className='font-semibold text-gray-700 text-sm'>
                                                                              Address :
                                                                        </h4>
                                                                        <p className="text-gray-600 text-sm">{order?.addresses?.address}</p>
                                                                        <p className="text-gray-600 text-sm">{order?.addresses?.address}</p>
                                                                        <p className="text-gray-600 text-sm">{order?.addresses?.city}</p>
                                                                  </div>
                                                            </div>

                                                            <div>
                                                                  <li className='flex justify-start items-center gap-2'>
                                                                        <h4 className='font-semibold text-gray-700 text-sm'>
                                                                              Invoice No :
                                                                        </h4>
                                                                        <p className="text-gray-600 text-sm">{order?._id}</p>
                                                                  </li>
                                                                  <li className='flex justify-start items-center gap-2'>
                                                                        <h4 className='font-semibold text-gray-700 text-sm'>
                                                                              Invoice Date :
                                                                        </h4>
                                                                        <p className="text-gray-600 text-sm">{
                                                                              new Date().toDateString(new Date())
                                                                        }</p>
                                                                  </li>
                                                                  <br />
                                                                  <li className='flex justify-start items-center gap-2'>
                                                                        <h4 className='font-semibold text-gray-700 text-sm'>
                                                                              Payment Date :
                                                                        </h4>
                                                                        <p className="text-gray-600 text-sm">{
                                                                              new Date().toDateString(shopInfo?.paymentDate)
                                                                        }</p>
                                                                  </li> <li className='flex justify-start items-center gap-2'>
                                                                        <h4 className='font-semibold text-gray-700 text-sm'>
                                                                              Order Date :
                                                                        </h4>
                                                                        <p className="text-gray-600 text-sm">{
                                                                              new Date().toDateString(shopInfo?.date)
                                                                        }</p>
                                                                  </li>

                                                            </div>

                                                      </div>

                                                      {/*.*/}
                                                      {/*.... Product ...*/}
                                                      {/*.*/}

                                                      <section className="container mx-auto mt-8">
                                                            <div className="w-full mb-8 bar overflow-hidden">
                                                                  <div className="w-full bar overflow-x-auto">
                                                                        <table className="w-full">
                                                                              <thead>
                                                                                    <tr className="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-900 uppercase border-b border-gray-900">
                                                                                          <th className="px-4 py-2">Photo</th>
                                                                                          <th className="px-4 py-2">Name</th>
                                                                                          <th className="px-4 py-2 whitespace-nowrap">Stock Quantity</th>
                                                                                          <th className="px-4 py-2">Price</th>
                                                                                    </tr>
                                                                              </thead>
                                                                              <tbody className="bg-white">
                                                                                    {
                                                                                          order?.productList?.map(itm => <tr key={itm?._id} className="text-gray-700">
                                                                                                <td className="px-2 w-[90px] py-2 border border-gray-800">
                                                                                                      <img src={itm?.img ? itm?.img : ''} alt="photo" className="w-12 h-12 border object-cover m-auto rounded bg-indigo-400" />
                                                                                                </td>
                                                                                                <td className="px-2 py-2 w-[500px] text-sm border border-gray-800">
                                                                                                      {itm?.productName}
                                                                                                </td>

                                                                                                <td className="px-2 py-2 text-sm border text-center border-gray-800">
                                                                                                      {itm?.stock_quantity ? itm?.stock_quantity : 0}
                                                                                                </td>
                                                                                                <td className="px-2 py-2 text-sm text-center border border-gray-800">
                                                                                                      {itm?.price ? itm?.price : 0}
                                                                                                </td>


                                                                                          </tr>)
                                                                                    }


                                                                                    {/* <tr>
                                                <td colSpan={2} className='px-1 py-2 text-sm border  border-gray-800'></td>
                                                <td colSpan={1} className='px-1 py-2 text-sm border-b  border-gray-800 text-end'>
                                                    TOTAL:
                                                </td>
                                                <td colSpan={1} className='px-1 py-2 text-sm border  border-gray-800 text-start'>
                                                    $5000
                                                </td>
                                            </tr> */}
                                                                                    {/* Add more rows here */}
                                                                              </tbody>
                                                                        </table>
                                                                        <tfoot className='float-right mt-3  font-semibold'>
                                                                              <tr>
                                                                                    <td colSpan={3} />
                                                                                    <td colSpan={2}>SUBTOTAL</td>
                                                                                    <td>{totalPrice}</td>
                                                                              </tr>
                                                                              <tr>
                                                                                    <td colSpan={3} />
                                                                                    <td colSpan={2}>TAX 25%</td>
                                                                                    <td>300</td>
                                                                              </tr>
                                                                              <tr>
                                                                                    <td colSpan={3} />
                                                                                    <td colSpan={2}>GRAND TOTAL</td>
                                                                                    <td>{totalPrice + 300} </td>
                                                                              </tr>
                                                                        </tfoot>
                                                                  </div>
                                                            </div>
                                                      </section>

                                                      <div className="flex justify-between ">
                                                            <div></div>
                                                            <div className="  gap-12 flex justify-between">
                                                                  <ul className='space-y-2'>
                                                                        {/* <li>Sub Total</li> */}
                                                                        {/* <li className=' font-bold'>Total :</li> */}
                                                                  </ul>

                                                                  <ul className='space-y-2'>

                                                                        <li className='  font-bold'>
                                                                              {/* ৳{totalPrice} */}
                                                                        </li>
                                                                  </ul>
                                                            </div>
                                                      </div>



                                                </main>
                                                <footer>

                                                </footer>
                                          </div>
                                    </>
                                    <div id="thanks">
                                          {order?.status !== "Cancel" &&
                                                order?.status !== "Failed" &&
                                                order?.status !== "Returned" && (
                                                      <div className="mt-4 mx-auto px-4 md:px-0">
                                                            <ul
                                                                  aria-label="Steps"
                                                                  className="items-center text-gray-600 font-medium md:flex"
                                                            >
                                                                  {steps.stepsItems.map((item, idx) => (
                                                                        <li
                                                                              aria-current={
                                                                                    currentStep == idx + 1 ? "step" : false
                                                                              }
                                                                              className="flex-1 last:flex-none flex gap-x-2 md:items-center"
                                                                        >
                                                                              <div className="flex items-center flex-col gap-x-2">
                                                                                    <div
                                                                                          className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${currentStep > idx + 1
                                                                                                ? "bg-indigo-600 border-indigo-600"
                                                                                                : "" || currentStep == idx + 1
                                                                                                      ? "border-indigo-600"
                                                                                                      : ""
                                                                                                }`}
                                                                                    >
                                                                                          <span
                                                                                                className={` ${currentStep > idx + 1
                                                                                                      ? "hidden"
                                                                                                      : "" || currentStep == idx + 1
                                                                                                            ? "text-indigo-600"
                                                                                                            : ""
                                                                                                      }`}
                                                                                          >
                                                                                                {idx + 1}
                                                                                          </span>
                                                                                          {currentStep > idx + 1 ? (
                                                                                                <svg
                                                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                                                      fill="none"
                                                                                                      viewBox="0 0 24 24"
                                                                                                      strokeWidth={1.5}
                                                                                                      stroke="currentColor"
                                                                                                      className="w-5 h-5 text-white"
                                                                                                >
                                                                                                      <path
                                                                                                            strokeLinecap="round"
                                                                                                            strokeLinejoin="round"
                                                                                                            d="M4.5 12.75l6 6 9-13.5"
                                                                                                      />
                                                                                                </svg>
                                                                                          ) : (
                                                                                                ""
                                                                                          )}
                                                                                    </div>
                                                                                    <hr
                                                                                          className={`h-12 border md:hidden  ${idx + 1 == steps.stepsItems.length
                                                                                                ? "hidden"
                                                                                                : "" || currentStep > idx + 1
                                                                                                      ? "border-indigo-600"
                                                                                                      : ""
                                                                                                }`}
                                                                                    />
                                                                              </div>
                                                                              <div className="h-8 flex items-center md:h-auto">
                                                                                    <h3
                                                                                          className={`text-sm ${currentStep === idx + 1
                                                                                                ? "text-indigo-600 track-order"
                                                                                                : ""
                                                                                                }`}
                                                                                    >
                                                                                          {item}
                                                                                    </h3>
                                                                              </div>
                                                                              <hr
                                                                                    className={`hidden mr-2 w-full border md:block ${idx + 1 == steps.stepsItems.length
                                                                                          ? "hidden"
                                                                                          : "" || currentStep > idx + 1
                                                                                                ? "border-indigo-600"
                                                                                                : ""
                                                                                          }`}
                                                                              />
                                                                        </li>
                                                                  ))}
                                                            </ul>

                                                      </div>
                                                )}
                                    </div>
                                    <button onClick={handlePrint} className='block rounded bg-[#3676ff] text-white px-8  font-small py-2 mx-auto'>Print</button>
                              </>
                        )}
                  </div>


            </div>
      );
};

export default TrackOrder;
