import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import Barcode from 'react-barcode';
import { useReactToPrint } from 'react-to-print';

const SelectOrderProductInvoice = ({ orderInfo, setPrint, selectedItems, print }) => {
      const { shopInfo, user } = useContext(AuthContext);

      // // Calculate subtotal
      // const subtotal = selectedItems?.quantity * selectedItems?.price;

      // // Calculate tax
      // const taxRate = 0.1;
      // const tax = subtotal * taxRate;

      // const total = subtotal + tax;

      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      // const date = new Date(products?.date);
      // const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      // console.log(formattedDate);

      console.log(selectedItems);

      const InvoicePage = ({ order }) => {
            return (
                  <>
                        <div
                              ref={componentRef}
                              className="p-12 mx-8 bg-white print-data   mt-6">

                              <header className="flex items-start justify-between">
                                    <img src={shopInfo?.logo} alt="logo" className='w-[200px]' />
                                    <div className='whitespace-wrap w-[300px]'>
                                          <p className='text-gray-600 text-end'>{shopInfo?.address}</p>
                                          <p className='text-gray-600 text-end'>{shopInfo?.shopName}</p>
                                    </div>
                              </header>

                              <main>
                                    <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
                                          SALES INVOICE
                                    </div>


                                    <div className="flex items-center justify-between mt-4">
                                          <div>
                                                <div className='flex items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Name :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{orderInfo.addresses.fullName}</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Phone :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{orderInfo.addresses.mobileNumber}</p>
                                                </div>

                                          </div>

                                          <div>
                                                <li className='flex justify-start items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Invoice No :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{orderInfo.orderNumber + selectedItems.reduce((total, item) => total + item.index, 0) + 'P'}</p>
                                                </li>
                                                <li className='flex justify-start items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Invoice Date :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{
                                                            new Date().toDateString()
                                                      }</p>
                                                </li>
                                                <br />
                                                <li className='flex justify-start items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Payment Date :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{
                                                            new Date(orderInfo?.timestamp).toDateString()
                                                      }</p>
                                                </li> <li className='flex justify-start items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Order Date :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{
                                                            new Date(orderInfo?.timestamp).toDateString()
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
                                                                        selectedItems.map((item, index) =>
                                                                              <tr className="text-gray-700">
                                                                                    {console.log(item.index, 'item')}
                                                                                    <td className="px-2 w-[90px] py-2 border border-gray-800">
                                                                                          <img src={item.product.img ? item.product.img : ''} alt="photo" className="w-12 h-12 border object-cover m-auto rounded bg-indigo-400" />
                                                                                    </td>
                                                                                    <td className="px-2 py-2 w-[500px] text-sm border border-gray-800">
                                                                                          {item.product?.name ?? ''}
                                                                                    </td>

                                                                                    <td className="px-2 py-2 text-sm border border-gray-800">
                                                                                          {item.product.quantity ? item.product?.quantity : 0}
                                                                                    </td>
                                                                                    <td className="px-2 py-2 text-sm border border-gray-800">
                                                                                          {item.product?.price ? item.product.price : 0}
                                                                                    </td>
                                                                              </tr>
                                                                        )}
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

                                                {/* <ul className='space-y-2'>
                                    <li className=''>
                                        {subtotal}
                                    </li>
                                    <li className='  font-bold'>
                                        {total}
                                    </li>
                                </ul> */}
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
            <div className='relative'>
                  <div className="fixed bar overflow-y-auto top-0 left-0 flex items-center justify-center w-full h-full z-[3000] bg-gray-50 py-5">
                        <button onClick={() => setPrint(false)} className='absolute right-4 text-2xl top-4'>
                              x
                        </button>
                        <button onClick={handlePrint} className='bg-blue-500 px-6 py-2 rounded-2 absolute top-4 left-3 text-white rounded-md'>Print</button>

                        <InvoicePage order={selectedItems} shopInfo={shopInfo} orderInfo={orderInfo} />
                  </div>
            </div>
      );
};

export default SelectOrderProductInvoice;
