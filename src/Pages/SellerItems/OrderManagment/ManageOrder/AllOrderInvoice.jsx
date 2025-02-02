import React, { useState, useRef, useContext } from "react";
import { useReactToPrint } from 'react-to-print';

import { AuthContext } from "../../../../AuthProvider/UserProvider";
import Barcode from "react-barcode";

// const AllOrderInvoice = ({ data, showPrintModal1, setShowPrintModal1 }) => {
//       const componentRef = useRef();
//       const handlePrint = useReactToPrint({
//             content: () => componentRef.current,
//       });

//       const { shopInfo } = useContext(AuthContext);

//       const [allProductList, setAllProductList] = useState([]);
//       const productsPerPage = 10; // Maximum products per page

//       useEffect(() => {
//             let products = [];
//             data?.forEach((element) => {
//                   element?.productList?.forEach((product) => {
//                         products.push(product);
//                   });
//             });
//             setAllProductList(products);
//       }, [data]);

//       const totalPrice = allProductList?.reduce((total, item) => {
//             return total + item?.price * item?.quantity;
//       }, 0);

//       // Split products into pages
//       const splitProductsIntoPages = () => {
//             const pages = [];
//             for (let i = 0; i < allProductList.length; i += productsPerPage) {
//                   pages.push(allProductList.slice(i, i + productsPerPage));
//             }
//             return pages;
//       };

//       const productPages = splitProductsIntoPages();

//       return (
//             <div>
//                   <div>
//                         <div className="flex fixed top-4 left-4 gap-2">
//                               <button
//                                     onClick={handlePrint}
//                                     className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
//                               >
//                                     Print
//                               </button>

//                               <button
//                                     onClick={() => setShowPrintModal1(false)}
//                                     className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
//                               >
//                                     Cancel
//                               </button>
//                         </div>

//                         <div ref={componentRef}>
//                               {productPages.map((page, pageIndex) => (
//                                     <div
//                                           style={{ width: "210mm", height: "297mm" }}
//                                           className="bg-white mx-auto mb-4 p-12"
//                                           key={pageIndex}
//                                     >
//                                           <header className="flex items-start justify-between">
//                                                 <img src={shopInfo?.logo} alt="logo" className="w-[200px]" />
//                                                 <div className="whitespace-wrap w-[300px]">
//                                                       <p className="text-gray-600 text-end">{shopInfo?.address}</p>
//                                                       <p className="text-gray-600 text-end">{shopInfo?.shopName}</p>
//                                                 </div>
//                                           </header>

//                                           <main>
//                                                 <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
//                                                       SALES INVOICE
//                                                 </div>

//                                                 {/* Address */}
//                                                 <div className="flex items-center justify-between mt-4">
//                                                       <div>
//                                                             <div className="flex items-center gap-2">
//                                                                   <h4 className="font-semibold text-gray-700 text-sm">
//                                                                         Email:
//                                                                   </h4>
//                                                                   <p className="text-gray-600 text-sm">
//                                                                         {shopInfo?.shopEmail}
//                                                                   </p>
//                                                             </div>
//                                                             <div className="flex items-center gap-2">
//                                                                   <h4 className="font-semibold text-gray-700 text-sm">
//                                                                         Phone:
//                                                                   </h4>
//                                                                   <p className="text-gray-600 text-sm">
//                                                                         {shopInfo?.shopNumber}
//                                                                   </p>
//                                                             </div>
//                                                       </div>
//                                                       <div>
//                                                             <li className="flex justify-start items-center gap-2">
//                                                                   <h4 className="font-semibold text-gray-700 text-sm">
//                                                                         Invoice No:
//                                                                   </h4>
//                                                                   <p className="text-gray-600 text-sm">{ }</p>
//                                                             </li>
//                                                             <li className="flex justify-start items-center gap-2">
//                                                                   <h4 className="font-semibold text-gray-700 text-sm">
//                                                                         Invoice Date:
//                                                                   </h4>
//                                                                   <p className="text-gray-600 text-sm">
//                                                                         {new Date().toDateString(page.time_stamp)}
//                                                                   </p>
//                                                             </li>
//                                                       </div>
//                                                 </div>

//                                                 {/* Product Table */}
//                                                 <section className="container mx-auto mt-8">
//                                                       <table className="w-full">
//                                                             <thead>
//                                                                   <tr className="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-900 uppercase border-b border-gray-900">
//                                                                         <th className="px-4 py-2">Photo</th>
//                                                                         <th className="px-4 py-2">Name</th>
//                                                                         <th className="px-4 py-2 whitespace-nowrap">
//                                                                               Stock Quantity
//                                                                         </th>
//                                                                         <th className="px-4 py-2">Price</th>
//                                                                   </tr>
//                                                             </thead>
//                                                             <tbody className="bg-white">
//                                                                   {page.map((itm) => (
//                                                                         <tr key={itm?._id} className="text-gray-700">
//                                                                               <td className="px-2 w-[90px] py-2 border border-gray-800">
//                                                                                     {console.log(itm, 'itm')}
//                                                                                     <img
//                                                                                           src={itm?.img || ""}
//                                                                                           alt="photo"
//                                                                                           className="w-12 h-12 border object-cover m-auto rounded bg-indigo-400"
//                                                                                     />
//                                                                               </td>
//                                                                               <td className="px-2 py-2 w-[500px] text-sm border border-gray-800">
//                                                                                     {itm?.productName}
//                                                                               </td>
//                                                                               <td className="px-2 py-2 text-sm border text-center border-gray-800">
//                                                                                     {itm?.quantity || 0}
//                                                                               </td>
//                                                                               <td className="px-2 py-2 text-sm text-center border border-gray-800">
//                                                                                     {itm?.price || 0}
//                                                                               </td>
//                                                                         </tr>
//                                                                   ))}
//                                                             </tbody>
//                                                       </table>
//                                                 </section>

//                                                 <div className="flex justify-between mt-4">
//                                                       <div></div>
//                                                       <div className="gap-12 flex justify-between">
//                                                             <ul className="space-y-2">
//                                                                   <li className="font-bold">Total:</li>
//                                                             </ul>
//                                                             <ul className="space-y-2">
//                                                                   <li className="font-bold">৳{totalPrice}</li>
//                                                             </ul>
//                                                       </div>
//                                                 </div>
//                                           </main>

//                                     </div>
//                               ))}
//                         </div>
//                   </div>
//             </div>
//       );
// };




const AllOrderInvoice = ({ data, showPrintModal1, setShowPrintModal1 }) => {
      const componentRef = useRef();
      const { shopInfo } = useContext(AuthContext);
      // Function to close the modal
      const closeModal = () => setShowPrintModal1(false);

      // Function to handle printing
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      return (
            <div className="invoice-container overflow-y-scroll absolute top-0 left-0 w-[80%] h-[80%]">
                  {/* Print Invoice button */}
                  <button
                        onClick={() => setShowPrintModal1(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                        Print Invoice
                  </button>

                  {/* Modal */}
                  {showPrintModal1 && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 overflow-y-scroll">
                              <div className="bg-white p-8 rounded-lg w-full max-w-4xl my-8">
                                    <div className="flex justify-between items-center mb-4">
                                          <h2 className="text-2xl font-bold">Invoice</h2>
                                          <button
                                                onClick={closeModal}
                                                className="text-gray-600 text-xl font-semibold"
                                          >
                                                ×
                                          </button>
                                    </div>

                                    <div ref={componentRef} className="p-8 bg-white max-h-[60vh] overflow-y-scroll print:max-h-none print:overflow-visible">
                                          {data.map((customer, index) => (
                                                <div
                                                      key={index}
                                                      className="invoice-content"
                                                      style={{ pageBreakBefore: index > 0 ? "always" : "auto" }}
                                                >
                                                      <h2 className="text-2xl font-bold text-center my-4">Invoice</h2>
                                                      {console.log(data[index], '_for_invoice')}
                                                      <div className="border-t pt-4 mt-4" />
                                                      <InvoiceHeader shopInfo={shopInfo} invoice_number={data[index].orderNumber} />
                                                      <div className="py-4 text-center font-bold bg-gray-200 text-gray-600">
                                                            SALES INVOICE
                                                      </div>
                                                      <InvoiceAddress wooSelectItem={data[index].addresses} />
                                                      <InvoiceProducts products={data[index].productList} />
                                                      <InvoiceFooter order={data[index]} />
                                                </div>
                                          ))}
                                    </div>

                                    {/* Print Button in the Modal */}
                                    <div className="mt-4 flex justify-end sticky bottom-0 bg-white py-4">
                                          <button
                                                onClick={handlePrint}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                          >
                                                Print Invoice
                                          </button>
                                    </div>
                              </div>
                        </div>
                  )}
            </div>
      );
};


export default AllOrderInvoice;
const isValidJSON = (str) => {
      try {
            JSON.parse(str);
            return true;
      } catch {
            return false;
      }
};
const InvoiceAddress = ({ wooSelectItem }) => {

      const city = isValidJSON(wooSelectItem?.city) ? JSON.parse(wooSelectItem.city) : {};

      console.log(wooSelectItem, 'wooSelectItem');

      return (

            <div className="grid grid-cols-2 gap-8 mb-6">
                  <div>
                        <h2 className="text-lg font-bold">Billed To:</h2>
                        <p>{`${wooSelectItem?.fullName}`}</p>
                        <p>{wooSelectItem?.address}</p>
                        <p>{city?.district},{wooSelectItem?.area}, {wooSelectItem?.province} </p>
                        <p>{wooSelectItem?.email}</p>
                        <p>{wooSelectItem?.mobileNumber}</p>
                  </div>
            </div>
      );
};


const InvoiceHeader = ({ shopInfo, invoice_number }) => (

      <header className="flex items-start justify-between">
            {console.log(shopInfo, 'shopInfo_invoice')}
            <img src={shopInfo?.logo ?? "https://doob.com.bd/assets/Logo-d2ec0d35.png"} alt="Shop Logo" className="w-52" />
            <div className="text-right">
                  <div className="flex justify-end barcode-important ">
                        <Barcode
                              className=""
                              value={invoice_number || "N/A"} // Fallback in case orderNumber is undefined
                        />
                  </div>
                  <p className="font-bold">{shopInfo?.shopName ?? "Doob"}</p>
                  <p>{shopInfo?.seller ?? "info@doob.com.bd"}</p>
                  <p>{shopInfo?.shopNumber}</p>
                  <p>{shopInfo?.address}</p>
            </div>
      </header>
);

// InvoiceProducts Component
const InvoiceProducts = ({ products }) => (
      <table className="w-full mb-6 border-collapse border border-gray-300">
            <thead>
                  <tr>
                        <th className="border border-gray-300 px-4 py-2">Photo</th>
                        <th className="border border-gray-300 px-4 py-2">Product</th>
                        <th className="border border-gray-300 px-4 py-2">Quantity</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Total</th>
                  </tr>
            </thead>
            <tbody>
                  {products?.map((product, index) => (
                        <tr key={index}>
                              <td className="border border-gray-300 px-4 py-2">
                                    <img src={product?.img} alt={product.name} className="w-16 h-16 object-cover" />
                              </td>
                              <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
                              <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                              <td className="border border-gray-300 px-4 py-2 text-nowrap"> <span className="kalpurush">৳</span>{parseFloat(product.price).toFixed(2)}</td>
                              <td className="border border-gray-300 px-4 py-2">
                                    <span className="kalpurush">৳</span>{(product.quantity * parseFloat(product.price)).toFixed(2)}
                              </td>
                        </tr>
                  ))}
            </tbody>
      </table>
);

// InvoiceFooter Component
const InvoiceFooter = ({ order }) => {
      console.log(order, 'order_invoice');
      const totalPrice = order?.productList?.reduce((total, item) => {
            return total + item?.price * item?.quantity;
      }, 0);
      return (
            <div className="border-t pt-4 mt-4">
                  <h2 className="text-right text-lg font-bold">Total: <span className="kalpurush">৳</span> {order.shipping_charge ? parseInt(totalPrice) + parseInt(order.shipping_charge) : order.promoHistory.normalPrice}</h2>
            </div>
      );
};
