import React, { useContext, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useParams } from 'react-router-dom';
import logo from '../../../../assets/doobBlack.png'
import { AuthContext } from '../../../../AuthProvider/UserProvider';
const PrintList = ({ setOn, products }) => {
      const { id } = useParams();
      const { shopInfo, user } = useContext(AuthContext)

      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });



      // Calculate subtotal
      const subtotal = products?.reduce((acc, itm) => acc + (parseFloat(itm.price) ? parseFloat(itm.price) : 0), 0);
      const totalPrice = subtotal;
      const formattedSubtotal = subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      const formattedTotalPrice = totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });


      console.log(shopInfo, '---->', user);

      const InvoicePage = ({ order }) => {
            return (
                  <>
                        <div
                              ref={componentRef}
                              className="p-12 mx-8 print-data   mt-6">


                              <header className="flex items-start justify-between">
                                    <img src={shopInfo?.logo} alt="logo" className='w-[200px]' />
                                    <div className='whitespace-wrap w-[300px]'>
                                          <p className='text-gray-600 text-end'>{shopInfo?.shopName}</p>
                                          <p className='text-gray-600 text-end'>{user?.shopEmail}</p>
                                    </div>
                              </header>

                              <main>
                                    <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
                                          Products
                                    </div>

                                    {/*.*/}
                                    {/*.... Address ...*/}
                                    {/*.*/}
                                    {
                                          // <div className="flex items-center justify-between mt-4">
                                          //     <div>
                                          //         <div className='flex items-center gap-2'>
                                          //             <h4 className='font-semibold text-gray-700 text-sm'>
                                          //                 Email :
                                          //             </h4>
                                          //             <p className="text-gray-600 text-sm">{shopInfo?.shopEmail}</p>
                                          //         </div>
                                          //         <div className='flex items-center gap-2'>
                                          //             <h4 className='font-semibold text-gray-700 text-sm'>
                                          //                 Phone :
                                          //             </h4>
                                          //             <p className="text-gray-600 text-sm">{shopInfo?.shopNumber}</p>
                                          //         </div>
                                          //     </div>

                                          //     <div>
                                          //         <li className='flex justify-start items-center gap-2'>
                                          //             <h4 className='font-semibold text-gray-700 text-sm'>
                                          //                 Invoice No :
                                          //             </h4>
                                          //             <p className="text-gray-600 text-sm">{shopInfo?._id}</p>
                                          //         </li>
                                          //         <li className='flex justify-start items-center gap-2'>
                                          //             <h4 className='font-semibold text-gray-700 text-sm'>
                                          //                 Invoice Date :
                                          //             </h4>
                                          //             <p className="text-gray-600 text-sm">{
                                          //                 new Date().toDateString(shopInfo?.time_stamp)
                                          //             }</p>
                                          //         </li>
                                          //         <br />
                                          //         <li className='flex justify-start items-center gap-2'>
                                          //             <h4 className='font-semibold text-gray-700 text-sm'>
                                          //                 Payment Date :
                                          //             </h4>
                                          //             <p className="text-gray-600 text-sm">{
                                          //                 new Date().toDateString(shopInfo?.paymentDate)
                                          //             }</p>
                                          //         </li> <li className='flex justify-start items-center gap-2'>
                                          //             <h4 className='font-semibold text-gray-700 text-sm'>
                                          //                 Order Date :
                                          //             </h4>
                                          //             <p className="text-gray-600 text-sm">{
                                          //                 new Date().toDateString(shopInfo?.date)
                                          //             }</p>
                                          //         </li>

                                          //     </div>

                                          // </div>

                                    }

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
                                                                                    <img src={itm?.featuredImage.src ? itm?.featuredImage?.src : itm?.images[0]?.src} alt="photo" className="w-12 h-12 border object-cover m-auto rounded bg-indigo-400" />
                                                                              </td>
                                                                              <td className="px-2 py-2 w-[500px] text-sm border border-gray-800">
                                                                                    {itm?.name}
                                                                              </td>

                                                                              <td className="px-2 py-2 text-sm border border-gray-800">
                                                                                    {itm?.stock_quantity ? itm?.stock_quantity : 0}
                                                                              </td>
                                                                              <td className="px-2 py-2 text-sm border border-gray-800">
                                                                                    {itm?.price ? itm?.price : 0}
                                                                              </td>


                                                                        </tr>)
                                                                  }


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
                                    </section>

                                    <div className="flex justify-between ">
                                          <div></div>
                                          <div className="  gap-12 flex justify-between">
                                                <ul className='space-y-2'>
                                                      <li>Sub Total</li>
                                                      <li className=' font-bold'>Total</li>
                                                </ul>

                                                <ul className='space-y-2'>
                                                      <li className=''>
                                                            {subtotal}
                                                      </li>
                                                      <li className='  font-bold'>
                                                            {formattedTotalPrice}
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
            <div className="bg-gray-100 p-12 fixed h-screen w-full bar overflow-y-auto">
                  <div className="flex items-center gap-2">
                        <button onClick={() => setOn(false)} className='bg-gray-900 px-6 py-2 rounded-2 text-white rounded-md'>Cancel</button>

                        <button onClick={handlePrint} className='bg-blue-500 px-6 py-2 rounded-2 text-white rounded-md'>Print</button></div>

                  <div ref={componentRef} className="w-full h-full p-8 m-auto bg-white" style={{ width: '210mm', height: 'fit-content' }}>
                        <InvoicePage order={products} />
                  </div>
            </div>
      );
};

export default PrintList;
