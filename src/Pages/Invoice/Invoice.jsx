import React, { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../AuthProvider/UserProvider";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Barcode from "react-barcode";

const Invoice = () => {
      const { id } = useParams();
      const location = useLocation();
      const queryParams = new URLSearchParams(location.search);
      const shop_id = queryParams.get('shop_id');
      const { invoiceData, user, shopInfo, shopId } = useContext(AuthContext);

      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      const { data: iData = [], refetch } = useQuery({
            queryKey: ["sellerOrder"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/order?shopId=${shopInfo._id ?? shop_id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });
      const info = iData.find((itm) => itm?._id === id);
      const totalPrice = info?.productList?.reduce((total, item) => {
            return total + item?.price * item?.quantity;
      }, 0);

      const {
            data: shop = {},
            isLoading,
            reload,
      } = useQuery({
            queryKey: ["shop"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/${shopInfo?.shopId}`
                  );
                  const data = await res.json();
                  return data;
            },
      });


      const formattedDate = (time) => {
            const date = new Date(time);

            // Extract individual components (year, month, day, etc.)
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Months are zero-based
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            // Format the components as needed
            const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
                  .toString()
                  .padStart(2, "0")}`;
            const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
                  .toString()
                  .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            const finalDate = formattedDate;
            return finalDate;
      };



      const InvoicePage = ({ order }) => {
            console.log(info);
            return (
                  <>
                        <div
                              ref={componentRef}
                              className="p-0 mx-8 print-data   mt-6">

                              <header className="flex items-start justify-between">
                                    <img src={shop?.logo} alt="logo" className='w-[200px]' />
                                    <div className='whitespace-wrap w-[300px]'>
                                          <p className='text-gray-600 text-end'><b>{shopInfo?.shopName}</b> </p>
                                          <p className="text-gray-600 text-end">{shopInfo?.shopEmail}</p>
                                          <p className="text-gray-600 text-end">{shopInfo?.shopNumber}</p>
                                          <p className='text-gray-600 text-end'>{shopInfo?.address}</p>


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
                                                      <h4 className='font-semibold text-gray-700 capitalize text-sm'>
                                                            Name : {info?.addresses?.fullName}
                                                      </h4>
                                                </div>

                                                <div className='flex items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Phone : {info?.addresses?.mobileNumber}
                                                      </h4>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Order No : {info?.orderNumber}
                                                      </h4>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Address : {info?.addresses?.city}, {info?.addresses?.area}, {info?.addresses?.address}
                                                      </h4>
                                                </div>

                                          </div>

                                          <div>
                                                <li className='flex justify-start items-start gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Invoice No :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm"> {info?.orderNumber}</p>
                                                </li>
                                                <li className='flex justify-start items-start gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Invoice Date :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{
                                                            new Date().toDateString(shopInfo?.time_stamp)
                                                      }</p>
                                                </li>
                                                <li className='flex justify-start items-start gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm whitespace-nowrap'>
                                                            Payment Date :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{
                                                            new Date().toDateString(shopInfo?.paymentDate)
                                                      }</p>
                                                </li> <li className='flex justify-start items-start gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Order Date :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{
                                                            new Date().toDateString(shopInfo?.date)
                                                      }</p>

                                                </li>
                                                {/* <li>
                                                      <div className='flex items-center gap-2'>
                                                            <h4 className='font-semibold text-gray-700 text-sm'>
                                                                  Payment Method : {info?.method?.Getaway}
                                                            </h4>
                                                      </div>
                                                </li> */}
                                                <li className='flex justify-start items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Payment Method :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{
                                                            info?.method?.Getaway
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
                                                                        order?.map(itm => <tr key={itm?._id} className="text-gray-700">
                                                                              <td className="px-2 w-[90px] py-2 border border-gray-800">
                                                                                    <img src={itm?.img ? itm?.img : ''} alt="photo" className="w-12 h-12 border object-cover m-auto rounded bg-indigo-400" />
                                                                              </td>
                                                                              <td className="px-2 py-2 w-[500px] text-sm border border-gray-800">
                                                                                    {itm?.productName}
                                                                                    <p className="text-green-700">colour:  {itm?.variations.name}</p>
                                                                                    <p className="text-red-700"> size: {itm?.variations.size}</p>
                                                                              </td>

                                                                              <td className="px-2 py-2 text-sm border text-center border-gray-800">
                                                                                    {itm?.quantity ? itm?.quantity : 0}
                                                                              </td>
                                                                              <td className="px-2 py-2 text-sm text-center border border-gray-800">
                                                                                    {itm?.price ? itm?.price : 0}
                                                                              </td>


                                                                        </tr>)
                                                                  }



                                                            </tbody>
                                                      </table>
                                                </div>
                                          </div>
                                    </section>
                                    {console.log(info,'info.promoHistory')}
                                    <div className="flex justify-end mb-8">
                                                      <div className="w-1/2">
                                                            <div className="flex justify-between py-2 text-gray-600">
                                                                  <span>Subtotal</span>
                                                                  <span>TK.{totalPrice}</span>
                                                            </div>
                                                            <div className="flex justify-between py-2 text-gray-600">
                                                                  <span>Shipping</span>
                                                                  <span>TK.{info.shipping_charge || info.promoHistory.normalPrice - totalPrice}</span>
                                                            </div>
                                                            <div className="flex justify-between py-2 text-gray-800 font-bold">
                                                                  <span>GRAND TOTAL</span>
                                                                  <span>TK.{info.shipping_charge ? totalPrice+info.shipping_charge:info.promoHistory.normalPrice}</span>
                                                            </div>
                                                      </div>
                                                </div>
                                     



                              </main>
                              <footer>

                              </footer>
                        </div>
                  </>
            )
      }

      // create a go back function
      const go_back = () => {
            window.history.back();
      }


      return (
            <div className="bg-gray-100 p-12 ">
                  <div className="flex gap-2">
                        <button
                              onClick={handlePrint}
                              className="bg-blue-500 px-6 py-2 rounded-2 text-white rounded-md"
                        >
                              Print
                        </button>
                        <button onClick={go_back} className="bg-red-500 px-6 py-2 rounded-2 text-white rounded-md">
                              Go Back
                        </button>
                  </div>

                  <div
                        ref={componentRef}
                        className="w-full h-full p-8 m-auto bg-white"
                        style={{ width: "210mm", height: "297mm" }}
                  >
                        <InvoicePage order={info?.productList} />
                  </div>
            </div>
      );
};

export default Invoice;
