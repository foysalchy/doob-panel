import React, { useState, useRef, useContext } from "react";
import { useReactToPrint } from 'react-to-print';

import { AuthContext } from "../../../../AuthProvider/UserProvider";
import Barcode from "react-barcode";




const AllOrderInvoice2 = ({ data, showPrintModal2, setShowPrintModal2 }) => {
      const componentRef = useRef();
      const { shopInfo } = useContext(AuthContext);
      // Function to close the modal
      const closeModal = () => setShowPrintModal2(false);

      // Function to handle printing
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      return (
            <div className="invoice-container overflow-y-scroll absolute top-0 left-0 w-[80%] h-[80%]">
                  {/* Print Invoice button */}
                  <button
                        onClick={() => setShowPrintModal2(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                        Print Invoice
                  </button>

                  {/* Modal */}
                  {showPrintModal2 && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 overflow-y-scroll">
                              <div className="bg-white p-8 rounded-lg w-full max-w-4xl my-8">
                                    <div className="flex justify-between items-center mb-4">
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
                                                      {console.log(data[index], '_for_invoice')}
                                                      <div className="border-2-t pt-4 mt-4" />
                                                      <InvoiceHeader shopInfo={shopInfo} invoice_number={data[index].orderNumber} />
                                                      
                                                            <div className="flex justify-end barcode-important2 ">
                              <Barcode
                                    
                                    value={data[index].orderNumber || "N/A"} // Fallback in case orderNumber is undefined
                              />
                        </div>
                                                     <div className="flex">
                                                            <InvoiceAddress invoice_number={data[index].orderNumber} wooSelectItem={data[index].addresses} />
                                                            <InvoiceProducts order={data[index]}  shopInfo={shopInfo} products={data[index].productList} />
                                                     </div>
                                                     <h1 style={{fontWeight:'700'}} className="mt-7 text-center text-4xl">ID:{data[index].orderNumber}</h1>
                                                      
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


export default AllOrderInvoice2;
const isValidJSON = (str) => {
      try {
            JSON.parse(str);
            return true;
      } catch {
            return false;
      }
};
const InvoiceAddress = ({ wooSelectItem,invoice_number }) => {

      const city = isValidJSON(wooSelectItem?.city) ? JSON.parse(wooSelectItem.city) : {};

      console.log(wooSelectItem, 'wooSelectItem');

      return (

            <div className="w-full px-2   border-2-collapse border-2 border-gray-800">
                  <div>
                        <h2 className="text-lg font-bold">Billed To:</h2>
                        <p className="text-2xl">{`${wooSelectItem?.fullName}`}</p>
                        <p className="text-2xl">{wooSelectItem?.address}</p>
                        <p className="text-2xl">{city?.district},{wooSelectItem?.area}, {wooSelectItem?.province} </p>
                        <p className="text-2xl">{wooSelectItem?.email}</p>
                        <p className="text-2xl">{wooSelectItem?.mobileNumber}</p>
                  </div>
                
            </div>
      );
};


const InvoiceHeader = ({ shopInfo, invoice_number }) => (

      <header className="flex items-start justify-between">
            {console.log(shopInfo, 'shopInfo_invoice')}
            <img src={shopInfo?.logo ?? "https://doob.com.bd/assets/Logo-d2ec0d35.png"} alt="Shop Logo" className="w-52" />
            <div className="text-right">
                 
                  <p className="text-2xl font-bold">{shopInfo?.shopName ?? "Doob"}</p>
                  <p className="text-2xl">{shopInfo?.seller ?? "info@doob.com.bd"}</p>
                  <p className="text-2xl">{shopInfo?.shopNumber}</p>
                  <p className="text-2xl">{shopInfo?.address}</p>
            </div>
      </header>
);

// InvoiceProducts Component
const InvoiceProducts = ({ products ,order}) => (
      <table className="">
            <thead>
                  <tr>
                     
                        <th className="border-2 text-2xl border-gray-800 ">Quantity</th> 
                        <th className="border-2 text-2xl border-gray-800 ">COD</th>
                  </tr>
            </thead>
            <tbody>
                  
                         
                        <tr>
                              
                              <td className="text-2xl text-center border-2 border-gray-800 ">{products.reduce((acc, product) => acc + product.quantity, 0)}</td>
                              <td className="text-2xl text-center border-2 border-gray-800 px-4" style={{fontWeight:'900'}}>
                                    <span className="text-2xl kalpurush" style={{fontWeight:'900'}}>৳</span>{order?.promoHistory?.normalPrice}
                              </td>
                        </tr>
                  
            </tbody>
      </table>
);

// InvoiceFooter Component
 
