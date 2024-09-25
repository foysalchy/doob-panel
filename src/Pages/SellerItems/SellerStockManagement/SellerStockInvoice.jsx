import React, { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import Barcode from "react-barcode";

const SellerStockInvoice = ({ setOn, products }) => {
      const { user, shopInfo } = useContext(AuthContext);

      const subtotal = products?.productInfo?.quantity * products?.productInfo?.price;
      // Calculate tax
      const taxRate = 0.1;
      const tax = subtotal;
      const total = subtotal;


      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      const date = new Date(products?.date);
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;





      const InvoicePage = ({ order }) => {

            return (
                  <>
                        <div
                              ref={componentRef}
                              className="p-12 mx-8 print-data   mt-6">

                              <header className="flex items-start justify-between">
                                    <img src={shopInfo?.logo} alt="logo" className='w-[200px]' />
                                    <div className='whitespace-wrap w-[300px]'>
                                          <p className='text-gray-600 text-end'>{shopInfo?.seller}</p>
                                          <p className='text-gray-600 text-end'>{shopInfo?.shopEmail}</p>
                                          <p className='text-gray-600 text-end'>{shopInfo?.shopNumber}</p>
                                    </div>
                              </header>

                              <main>
                                    <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
                                          INVOICE
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
                                                      <p className="text-gray-600 text-sm">Doob</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Email :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">nahid@example.com</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Phone :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">+8801712345678ss</p>
                                                </div>

                                          </div>

                                          <div>
                                                <li className='flex justify-start items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Invoice No :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{products?._id}</p>
                                                </li>
                                                <li className='flex justify-start items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Invoice Date :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{
                                                            new Date().toDateString(products?.date)
                                                      }</p>
                                                </li>
                                          </div>

                                    </div>

                                    {/*.*/}
                                    {/*.... Product ...*/}
                                    {/*.*/}

                                    <section className="container mx-auto mt-8">
                                          <div className="w-full mb-8 overflow-hidden">
                                                <div className="w-full overflow-x-auto">
                                                      <table className="w-full">
                                                            <thead>
                                                                  <tr className="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-900 uppercase border-b border-gray-900">
                                                                        <th className="px-4 py-2">Photo</th>
                                                                        <th className="px-4 py-2">Name</th>
                                                                        <th className="px-4 py-2 whitespace-nowrap">Stock Quantity</th>
                                                                        <th className="px-4 py-2">Request</th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody className="bg-white">
                                                                  <tr className="text-gray-700">
                                                                        <td className="px-2 w-[90px] py-2 border border-gray-800">
                                                                              <img src={products?.productInfo?.image ? products?.productInfo?.image : ''} alt="photo" className="w-12 h-12 border object-cover m-auto rounded bg-indigo-400" />
                                                                        </td>
                                                                        <td className="px-2 py-2 w-[500px] text-sm border border-gray-800">
                                                                              {products?.productInfo?.name ? products?.productInfo?.name : ''}
                                                                        </td>

                                                                        <td className="px-2 py-2 text-sm border text-center border-gray-800">
                                                                              {products?.productInfo?.quantity ? products?.productInfo?.quantity : 0}
                                                                        </td>
                                                                        <td className="px-2 py-2 text-sm text-center border border-gray-800">
                                                                              {products?.quantity}
                                                                        </td>
                                                                  </tr>
                                                                  {/* Add more rows here */}
                                                            </tbody>
                                                      </table>

                                                </div>
                                          </div>
                                    </section>

                                    <div className="flex justify-between ">
                                          <div></div>
                                          <div className="  gap-12 flex justify-between">
                                                <ul className='space-y-2'>
                                                      <li>Sub Total :</li>
                                                      <li className=' font-bold'>Total :</li>
                                                </ul>

                                                <ul className='space-y-2'>

                                                      <li className='  font-bold'>
                                                            ৳{subtotal}
                                                      </li>
                                                      <li className='  font-bold'>
                                                            ৳{total}
                                                      </li>
                                                </ul>
                                          </div>
                                    </div>



                              </main>
                              <footer>

                              </footer>
                        </div>
                  </>
            )
      }


      return (


            <div className="bg-gray-100 p-12 fixed h-screen overflow-y-auto top-0 left-0 right-0 z-[3000]">
                  <button onClick={handlePrint} className='bg-blue-500 px-6 py-2 rounded-2 text-white rounded-md'>Print</button>
                  <button onClick={() => setOn(false)} className='bg-red-500 ml-2 px-6 py-2 rounded-2 text-white rounded-md'>Close</button>
                  <div ref={componentRef} className="w-full h-full p-8 m-auto bg-white" style={{ width: '235mm', height: '297mm' }}>

                        <InvoicePage order={products} />

                  </div>
            </div>
      );
};

export default SellerStockInvoice;
