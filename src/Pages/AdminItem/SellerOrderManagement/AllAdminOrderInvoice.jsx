import React, { useRef, useState, useEffect, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import logo from '../../../assets/doobBlack.png';
const AllAdminOrderInvoice = ({
      data,
      showPrintModal1,
      setShowPrintModal1,
}) => {
      console.log(data);
      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });
      const { user } = useContext(AuthContext)
      const [allProductList, setAllProductList] = useState([]);


      const all_item = data?.map(item => item.items)
      const allItemsFlattened = all_item.flat();
      console.log(allItemsFlattened);

      const totalPaidPrice = allItemsFlattened.reduce((total, item) => total + item.paid_price, 0);











      const InvoicePage = ({ order }) => {


            return (
                  <>
                        <div
                              ref={componentRef}
                              className="">

                              <div className="p-12 mx-8 print-data bg-white  mt-6">

                                    <header className="flex items-start justify-between">
                                          <img src={logo} alt="logo" className='w-[200px]' />
                                          <div className='whitespace-wrap w-[300px]'>
                                                {/* <p className='text-gray-600 text-end'>{user?._id}</p> */}
                                                <p className='text-gray-600 text-end'>Doob</p>
                                                <p className='text-gray-600 text-end'>info@doob.com.bd</p>
                                                <p className='text-gray-600 text-end'>+880 123 456 789</p>
                                                <p className='text-gray-600 text-end'>Mirpur Dhaka Bangladesh</p>
                                          </div>
                                    </header>

                                    <main>
                                          <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 text-center ">
                                                All Item
                                          </div>




                                          <section className="container mx-auto mt-8">
                                                <div className="w-full mb-8 overflow-hidden">
                                                      <div className="w-full overflow-x-auto">
                                                            <table className="w-full">
                                                                  <thead>
                                                                        <tr className="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-900 uppercase border-b border-gray-900">
                                                                              <th className="px-4 py-2">Photo</th>
                                                                              <th className="px-4 py-2">Name</th>
                                                                              <th className="px-4 py-2 whitespace-nowrap">Order Quantity</th>
                                                                              <th className="px-4 py-2 whitespace-nowrap">Paid Price</th>
                                                                        </tr>
                                                                  </thead>
                                                                  <tbody className="bg-white">
                                                                        {
                                                                              allItemsFlattened.map((data) =>
                                                                                    <tr className="text-gray-700">
                                                                                          <td className="px-2 w-[90px] py-2 border border-gray-800">
                                                                                                <img src={data?.product_main_image ?? data.product_detail_url} alt="photo" className="w-12 h-12 border object-cover m-auto rounded bg-indigo-400" />
                                                                                          </td>
                                                                                          <td className="px-2 py-2 w-[500px] text-sm border border-gray-800">
                                                                                                {data?.name}
                                                                                          </td>

                                                                                          <td className="px-2 py-2 text-sm border text-center border-gray-800">
                                                                                                {data?.quantity ?? 1}
                                                                                          </td>
                                                                                          <td className="px-2 py-2 text-sm text-center border border-gray-800">
                                                                                                {data?.paid_price ?? 0}
                                                                                          </td>
                                                                                    </tr>)
                                                                        }

                                                                        <tr>
                                                                              <td colSpan={3} className='px-1 py-2 text-sm border border-gray-800 text-right'>
                                                                                    TOTAL:
                                                                              </td>
                                                                              <td colSpan={1} className='px-1 py-2 text-sm border border-gray-800 text-center'>
                                                                                    {totalPaidPrice}
                                                                              </td>
                                                                        </tr>
                                                                        {/* Add more rows here */}
                                                                  </tbody>
                                                            </table>
                                                      </div>
                                                </div>
                                          </section>



                                    </main>
                              </div>

                        </div>
                  </>
            )
      }






      return (
            <div>
                  <div className="flex gap-2">
                        <button
                              onClick={handlePrint}
                              className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                        >
                              print
                        </button>

                        <button
                              onClick={() => setShowPrintModal1(false)}
                              className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                        >
                              Cancel
                        </button>
                  </div>
                  <div>
                        <div
                              className="m-auto "
                              style={{ width: "210mm", height: "297mm" }}
                        >
                              <InvoicePage order={data} />


                        </div>


                  </div>
            </div>
      );
};

export default AllAdminOrderInvoice;
