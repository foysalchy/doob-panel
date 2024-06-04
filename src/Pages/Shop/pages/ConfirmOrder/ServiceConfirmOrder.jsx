import React, { useRef, useEffect, useState, useContext } from "react";
import vct from "../../../../assets/vct.png";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import logo from "../../../../assets/Logo.png";
import { useQuery } from "@tanstack/react-query";
const ServiceConfirmOrder = () => {
  const componentRef = useRef();
  const { shopInfo, user } = useContext(AuthContext);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  console.log(shopInfo, "shopInfo");
  const pathname = window.location.pathname;
  const idMatch = pathname.match(/\/shop\/([^/]+)/);
  const shopId = idMatch ? idMatch[1] : null;

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const {
    data: shop = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["shop"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/shop/${shopInfo?.shopId}`
      );
      const data = await res.json();
      return data;
    },
  });

  useEffect(() => {
    const data = localStorage.getItem("orderServiceData");
    const order = JSON.parse(data);

    console.log(order);
    // Calculate subtotal
    const subTotal = order.reduce(
      (acc, itm) => acc + parseInt(itm.buyingPrice) * 1,
      0
    );
    setSubtotal(subTotal);

    // Total is the same as subtotal for now, you can add additional charges or discounts here
    setTotal(subTotal);
  }, []);

  const data = localStorage.getItem("orderServiceData");
  const order = JSON.parse(data);
  console.log("order", order);
  const InvoicePage = ({ itm }) => {
    console.log(itm);
    return (
      <>
        <div
          ref={componentRef}
          className="lg:px-12 bg-white print-container  pb-12 pt-16 mx-8 print-data"
        >
          <header className="flex items-start justify-between">
            <img src={shop?.logo ?? logo} alt="logo" className="w-[200px]" />
            <div className="whitespace-wrap w-[300px]">
              <p className="text-gray-600 text-end">{user?.shopName}</p>
              <p className="text-gray-600 text-end">{user?.shopEmail}</p>
            </div>
          </header>

          <main>
            <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
              INVOICE
            </div>

            {/*.*/}
            {/*.... Address ...*/}
            {/*.*/}
            <div className=" items-start justify-between mt-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-700 text-sm">
                    Email :
                  </h4>
                  <p className="text-gray-600 text-sm">{user?.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-700 text-sm">
                    Phone :
                  </h4>
                  <p className="text-gray-600 text-sm">{user?.phoneNumber}</p>
                </div>
              </div>

              <div>
                <li className="flex justify-start items-center gap-2">
                  <h4 className="font-semibold text-gray-700 text-sm">
                    Invoice No : {user?._id}
                  </h4>
                  {/* <p className="text-gray-600 text-sm">{shopInfo?._id}</p> */}
                </li>
              </div>
            </div>

            {/*.*/}
            {/*.... Product ...*/}
            {/*.*/}

            <section className="container mx-auto mt-8">
              <div className="w-full mb-8 overflow-hidden">
                <div className="w-full overflow-x-auto border">
                  <table className="w-full">
                    <thead>
                      <tr className="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-900 uppercase border-b border-gray-900">
                        <th className="px-4 py-2">Photo</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2 whitespace-nowrap">
                          Stock Quantity
                        </th>
                        <th className="px-4 py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {itm?.map((itm) => (
                        <tr className="border-t" key={itm?._id}>
                          <td className="p-4 w-[110px] border-b border-blue-gray-50">
                            <img
                              src={itm?.img}
                              alt=""
                              className="w-[100px] object-cover h-[80px] rounded border"
                            />
                          </td>
                          <td className="p-4 border-b w-[300px] border-blue-gray-50">
                            {itm?.title}
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            {itm?.price}
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            1 {/* {itm?.quantity} */}
                          </td>
                        </tr>
                      ))}

                      {/* <tr>
                                                <td colSpan={6} className='px-1 py-2 text-sm border  border-gray-800'></td>
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
                </div>
              </div>
              <h1 className="text-end text-xl ">Total : {total}</h1>
            </section>
          </main>
          <footer></footer>
        </div>
      </>
    );
  };

  return (
    <div className="bg-gray-50">
      <div
        ref={componentRef}
        className="px-1 py-5 mx-auto bg-gray-50 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-4 lg:px-8"
      >
        <h1 className="text-center text-3xl mt-12 font-bold">
          Your order is confirmed
        </h1>
        <p className="text-center text-gray-500">Thank you for shopping</p>

        <button
          onClick={handlePrint}
          className="bg-blue-500 mb-3 ml-8 text-white px-6 py-2 rounded-md mt-2"
        >
          Print
        </button>
        <InvoicePage itm={order} />

        <div className="hidden grid-cols-3 gap-3">
          <div ref={componentRef} className="col-span-2">
            <>
              <div className="p-6 overflow-x-auto px-0">
                <table className="mt-4 w-full border-l border-r border-gray-400 table-auto text-left">
                  <thead>
                    <tr>
                      <th className="cursor-pointer border-y border-blue-gray-400 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                        <p className="antialiased font-sans text-sm text-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                          Photo
                        </p>
                      </th>
                      <th className="cursor-pointer border-y border-blue-gray-400 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                        <p className="antialiased  font-sans text-sm text-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                          Name
                        </p>
                      </th>
                      <th className="cursor-pointer border-y border-blue-gray-400 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                        <p className="antialiased font-sans text-sm text-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                          Price
                        </p>
                      </th>
                      <th className="cursor-pointer border-y border-blue-gray-400 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                        <p className="antialiased font-sans text-sm text-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                          Quantity
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.map((itm) => (
                      <tr key={itm?._id}>
                        <td className="p-4 w-[110px] border-b border-blue-gray-50">
                          <img
                            src={itm?.img}
                            alt=""
                            className="w-[100px] object-cover h-[80px] rounded border"
                          />
                        </td>
                        <td className="p-4 border-b w-[300px] border-blue-gray-50">
                          {itm?.title}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          {itm?.price}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          1 {/* {itm?.quantity} */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="border w-[300px] p-3 ml-auto border-gray-400 space-y-1">
                <li className="flex items-center justify-between">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </li>
                <br />
                <li className="flex font-semibold text-gray-700 items-center justify-between">
                  <p>Total :</p>
                  <p>${total.toFixed(2)}</p>
                </li>
                <li>
                  <button
                    onClick={handlePrint}
                    className="bg-blue-500 text-white px-3 py-2 rounded-md w-full mt-2"
                  >
                    Download Full Invoice
                  </button>
                </li>
              </ul>
            </>
          </div>
          <div className="">
            <img
              src={vct}
              alt="vector"
              className="w-full h-full object-cover"
            />
            <button className="bg-gray-900 text-white px-3 py-2 rounded-md w-full mt-2">
              Track Your Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceConfirmOrder;
