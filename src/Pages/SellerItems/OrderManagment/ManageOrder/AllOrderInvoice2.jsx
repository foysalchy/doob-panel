import React, { useState, useRef, useContext } from "react";
import { useReactToPrint } from 'react-to-print';

import { AuthContext } from "../../../../AuthProvider/UserProvider";
import Barcode from "react-barcode";
import {QRCodeCanvas} from 'qrcode.react';


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
                                    
                                    {data.map((customer, index) => {
  // Construct the full customer information
  const customerInfo = `
    Customer: ${customer.addresses?.fullName || "N/A"}
    Address: ${customer.addresses?.address || "N/A"}${customer.addresses?.district ? `, ${customer.addresses.district}` : ""}${customer.addresses?.area ? `, ${customer.addresses.area}` : ""}${customer.addresses?.province ? `, ${customer.addresses.province}` : ""}
    Mobile: ${customer.addresses?.mobileNumber || "N/A"}
  `.trim();

  return (
                                                <div
                                                      key={index}
                                                      className="invoice-content border border-gray-700 mb-4 p-2 "
                                                      style={{ pageBreakBefore: index > 0 ? "always" : "auto" }}
                                                >
                                                      <div className="grid  grid-cols-2 gap-2">
                                                            <div>
                                                                  <div className="border border-gray-700 rounded p-2 text-center mb-2">
                                                                        <img src={shopInfo?.logo ?? "https://doob.com.bd/assets/Logo-d2ec0d35.png"} alt="Shop Logo" className="w-52 m-auto" />
                                                                  </div>
                                                                  <div className="border border-gray-700 rounded p-2 text-center  barcode-important2 mb-2">
                                                                        <Barcode
                                          
                                                                              value={data[index].orderNumber || "N/A"} // Fallback in case orderNumber is undefined
                                                                        />
                                                                       <span style={{marginTop: '-20px',display: 'block',zIndex: '9999',position: 'relative'}}> Courier ID  :{data[index].orderNumber}</span>
                                                                  </div>
                                                                  <div className="border border-gray-700 rounded p-2 text-center  barcode-important2 mb-2">
                                                                        <Barcode
                                          
                                                                              value={data[index].orderNumber || "N/A"} // Fallback in case orderNumber is undefined
                                                                        />
                                                                       <span style={{marginTop: '-20px',display: 'block',zIndex: '9999',position: 'relative'}}> Order No:{data[index].orderNumber}</span>
                                                                  </div>
                                                                  <div className="border border-gray-700 rounded p-2 text-center  barcode-important2 mb-2">
                                                                 
                                                                       
                                                                       <div className="text-left">
                                                                       
                                                                           
                                                                       <p className="font-bold">{shopInfo?.shopName ?? "Doob"}</p>
                                                                             <p className=" ">{shopInfo?.shopNumber}</p>
                                                                             <p className=" ">{shopInfo?.address}</p>
                                                                             
                                                                       </div>
                                                                  
                                                                  </div>
                                                                 
                                                            </div>
                                                            <div>
                                                                  <table className="w-full">
                                                                        <tr className="border border-gray-700 rounded px-2 text-left">
                                                                              <td className="p-2">   SKU</td>
                                                                              <th className="p-2 break-all">  
        {data[index].productList?.map((itm, index) => (
          <p key={index} className="break-all">
            {itm?.variations?.SKU} -Q: {itm.quantity}
          </p>
        ))}
      </th>
                                                                        </tr>
                                                                        <tr className="border border-gray-700 rounded px-2 text-left">
                                                                        <td className="p-2">  Date</td>
                                                                              <th>    {new Date().toDateString(data[index].time_stamp)}</th>
                                                                        </tr>
                                                                        <tr className="border border-gray-700 rounded px-2 text-left">
                                                                              <td className="p-2 w-[85px]">  Order ID</td>
                                                                              <th>    {data[index]._id}</th>
                                                                        </tr>
                                                                  </table>
                                                                  <div className="border border-gray-700 rounded p-2 text-center  barcode-important2 mt-2">
                                                                        <div className="grid grid-cols-3 gap-2">
                                                                              
                                                                              <div className="col-span-2 qrcode w-[200px]">
                                                                              <QRCodeCanvas value={customerInfo} />
                                                                              </div>
                                                                              <div className="col-span-1">
                                                                              <InvoiceProducts order={data[index]}  shopInfo={shopInfo} products={data[index].productList} />
                                                                  
                                                                              </div>
                                                                        </div>
                                                             
                                                                    <InvoiceAddress invoice_number={data[index].orderNumber} wooSelectItem={data[index].addresses} />
                                                           
                                                                  </div>
                                                                  
                                                            </div>
                                                      </div>
                                                       
                                                </div>
                                           );
                                          })}
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

            <div className="w-full px-2   text-left">
                  <div>
                        <p className="">Customer:{`${wooSelectItem?.fullName}`}</p>
                        <p className="">Addresf:{wooSelectItem?.address}
  {wooSelectItem?.district && `${wooSelectItem.district}, `}
  {wooSelectItem?.area && `${wooSelectItem.area}, `}
  {wooSelectItem?.province && wooSelectItem.province}</p>
                        
                        <p className="">{wooSelectItem?.mobileNumber}</p>
                  </div>
                
            </div>
      );
};


 
// InvoiceProducts Component
const InvoiceProducts = ({ products ,order}) => (
      <table className="">
            <thead>
                  <tr>
                     
                        <th className="border border-gray-700-2  border border-gray-700-gray-800 ">QTY</th> 
                        <th className="border border-gray-700-2  border border-gray-700-gray-800 ">COD</th>
                  </tr>
            </thead>
            <tbody>
                  
                         
                        <tr>
                              
                              <td className=" text-center border border-gray-700-2 border border-gray-700-gray-800 ">{products.reduce((acc, product) => acc + product.quantity, 0)}</td>
                              <td className=" text-center border border-gray-700-2 border border-gray-700-gray-800 px-4" style={{fontWeight:'900'}}>
                                    <span className=" kalpurush" style={{fontWeight:'900'}}>৳</span>{order?.promoHistory?.normalPrice}
                              </td>
                        </tr>
                  
            </tbody>
      </table>
);

// InvoiceFooter Component
 
