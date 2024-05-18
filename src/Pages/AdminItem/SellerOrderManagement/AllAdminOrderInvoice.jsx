import React, { useRef, useState, useEffect, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import logo from '../../../assets/Logo.png';
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

  //   useEffect(() => {
  //     let products = []; // Temporary array to store all products
  //     data?.forEach((element) => {
  //       element?.productList?.forEach((product) => {
  //         products.push(product); // Add each product to the temporary array
  //       });
  //     });
  //     setAllProductList(products); // Set the state with all products once the loop completes
  //   }, [data]);







  const InvoicePage = ({ order }) => {
    console.log(data, "-----//-***********");

    return (
      <>
        <div
          ref={componentRef}
          className="p-12 mx-8 print-data bg-white  mt-6">
          {
            data?.map(data => {
              const totalPrice = data?.price * data?.quantity;
              return (
                <div className="">
                  <header className="flex items-start justify-between">
                    <img src={logo} alt="logo" className='w-[200px]' />
                    <div className='whitespace-wrap w-[300px]'>
                      <p className='text-gray-600 text-end'>{user?.name}</p>
                      <p className='text-gray-600 text-end'>{user?.email}</p>
                      <p className='text-gray-600 text-end'>{user?.phoneNumber}</p>
                    </div>
                  </header>
                  <main>
                    <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
                      INVOICE
                    </div>

                    {/*................*/}
                    {/*.... Address ...*/}
                    {/*................*/}
                    <div className="flex items-start justify-between mt-4">
                      <div>
                        <div className='flex items-center gap-2'>
                          <h4 className='font-semibold text-gray-700 text-sm'>
                            Name :
                          </h4>
                          <p className="text-gray-600 text-sm">{data?.userInfo?.fullName}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                          <h4 className='font-semibold text-gray-700 text-sm'>
                            Name :
                          </h4>
                          <p className="text-gray-600 text-sm">{data?.userInfo?.address}</p>
                        </div>

                        <div className='flex items-center gap-2'>
                          <h4 className='font-semibold text-gray-700 text-sm'>
                            Phone :
                          </h4>
                          <p className="text-gray-600 text-sm">{data?.userInfo?.mobileNumber}</p>
                        </div>

                      </div>

                      <div>
                        <li className='flex justify-start items-center gap-2'>
                          <h4 className='font-semibold text-gray-700 text-sm'>
                            Invoice No : {data?._id}
                          </h4>
                          {/* <p className="text-gray-600 text-sm">{shopInfo?._id}</p> */}
                        </li>

                      </div>

                    </div>


                    {/*................*/}
                    {/*.... Product ...*/}
                    {/*................*/}


                    <section className="container mx-auto mt-8">
                      <div className="w-full mb-8 overflow-hidden">
                        <div className="w-full overflow-x-auto">
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
                                <tr className="text-gray-700">
                                  <td className="px-2 w-[90px] py-2 border border-gray-800">
                                    <img src={data?.product?.image ? data?.product?.image : data?.image} alt="photo" className="w-12 h-12 border object-cover m-auto rounded bg-indigo-400" />
                                  </td>
                                  <td className="px-2 py-2 w-[500px] text-sm border border-gray-800">
                                    {data?.product?.name}
                                  </td>

                                  <td className="px-2 py-2 text-sm border text-center border-gray-800">
                                    {data?.quantity ? data?.quantity : 0}
                                  </td>
                                  <td className="px-2 py-2 text-sm text-center border border-gray-800">
                                    {data?.price ? data?.price : 0}
                                  </td>
                                </tr>}

                              <tr>
                                <td colSpan={3} className='px-1 py-2 text-sm border border-gray-800 text-right'>
                                  TOTAL:
                                </td>
                                <td colSpan={1} className='px-1 py-2 text-sm border border-gray-800 text-center'>
                                  ${totalPrice}
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
              )
            }
            )
          }
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
