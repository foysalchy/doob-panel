import React, { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import logo from '../../../../assets/doobBlack.png';

const SellectedInvoice = ({ invoiceData, setHandle_invoice }) => {

      const { shopInfo } = useContext(AuthContext)

      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      const invoices_data = invoiceData

      const parseDate = (dateString) => {
            if (!dateString) return new Date(); // Handle cases where dateString might be undefined or null

            // Extract date and time
            const [datePart, timePart, timezone] = dateString.split(' ');
            const [year, month, day] = datePart.split('-');
            const [hour, minute, second] = timePart.split(':');

            // Create a date object with the extracted components
            return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}${timezone}`);
      };


      return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-gray-100 w-full h-full p-12 mx-4 md:mx-auto relative bar overflow-auto">
                        <div className="flex gap-2 items-start">
                              <button
                                    onClick={handlePrint}
                                    className="bg-blue-500 px-6 py-2 rounded-md text-white mb-4"
                              >
                                    Print
                              </button>
                              <button
                                    onClick={() => setHandle_invoice(false)}
                                    className="bg-blue-500 px-6 py-2 rounded-md text-white mb-4"
                              >
                                    Cancel
                              </button>
                        </div>
                        <div
                              ref={componentRef}
                              className="w-full p-8 bg-white mx-auto"
                        // style={{ width: "210mm", height: "297mm" }}
                        >
                              {invoices_data.map((invoiceData, index) => (
                                    <div key={invoiceData.order_id} className="text-2xl mt-4 font-bold mb-4 page-break">
                                          {console.log(invoiceData, 'invoiceData')}
                                          <div>
                                                <div className="max-w-2xl mx-auto p-4 bg-white border border-gray-200">
                                                      {/* Header */}
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
                                                      {/* Title */}
                                                      <h2 className="text-center text-xl bg-gray-300 font-bold mb-6">SALES INVOICE</h2>

                                                      {/* Invoice Info */}
                                                      <div className="flex justify-between mb-4">
                                                            <div>
                                                                  <p className="text-sm font-semibold">Billing Address</p>
                                                                  <p className="text-sm">{invoiceData?.addresses?.fullName}</p>
                                                                  <p className="text-sm"> {invoiceData?.addresses?.mobileNumber} </p>
                                                                  <p className="text-sm">{invoiceData?.addresses?.email}</p>
                                                                  <p className="text-sm">{invoiceData?.addresses?.address}, {invoiceData?.addresses?.city}, {invoiceData?.addresses?.area}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                  <p className="text-sm">Invoice No.: {invoiceData?.orderNumber}</p>
                                                                  <p className="text-sm">Invoice Date: {parseDate().toLocaleString()}</p>
                                                                  <p className="text-sm">Order Number: {invoiceData?.orderNumber}</p>
                                                                  <p className="text-sm">Order Date: {new Date(invoiceData?.timestamp).toLocaleString()}</p>
                                                            </div>
                                                      </div>

                                                      {/* Type of Supply */}
                                                      {invoiceData?.method.Getaway && <div className="mb-4">
                                                            <p className="text-sm font-semibold">Type of Supply: <span className="font-normal">{invoiceData?.method.Getaway}</span></p>
                                                      </div>}

                                                      {/* Table */}
                                                      <table className="w-full border-collapse border border-gray-300 mb-6">
                                                            <thead>
                                                                  <tr className="bg-gray-100">
                                                                        <th className="border border-gray-300 p-2 text-sm">S/N</th>
                                                                        <th className="border border-gray-300 p-2 text-sm">Photo</th>
                                                                        <th className="border border-gray-300 p-2 text-sm">Item Name</th>
                                                                        <th className="border border-gray-300 p-2 text-sm">Qty</th>

                                                                        <th className="border border-gray-300 p-2 text-sm">Total Price</th>
                                                                  </tr>
                                                            </thead>
                                                            {<tbody>
                                                                  {invoiceData?.productList.map((product, idx) => <tr key={idx} >
                                                                        <td className="border border-gray-300 p-2 text-sm">{idx + 1}</td>
                                                                        <td className="border border-gray-300 p-2 text-sm"><img width="100px" src={product.img} alt="" srcset="" /></td>
                                                                        <td className="border border-gray-300 p-2 text-sm">{product.productName}</td>
                                                                        <td className="border border-gray-300 p-2 text-sm">{product?.quantity}</td>
                                                                        <td className="border border-gray-300 p-2 text-sm">{product.price}</td>
                                                                  </tr>)}
                                                            </tbody>}
                                                      </table>

                                                      {/* Total */}
                                                      <div className="text-right mb-4">
                                                            <p className="text-sm">Total Unit Price*: ৳{invoiceData?.productList.reduce((total, product) => total + (product.price * product.quantity), 0)}</p>
                                                            <p className="text-sm">Total Delivery Fee*: ৳ {invoiceData?.productList.reduce((total, product) => total + (product.delivery_charge || 0), 0)}</p>
                                                            <p className="text-sm font-semibold">Total: BDT {invoiceData?.promoHistory?.normalPrice}</p>
                                                      </div>

                                                      {/* Notes */}
                                                      <p className="text-xs text-gray-500 mb-4">
                                                            *Total charges for this shipment include prepaid custom duties and other taxes as applicable for the merchandise to be delivered to the address in the country specified by the customer.
                                                      </p>

                                                      <p className="text-xs text-gray-500 text-center mt-4">** This is a computer generated copy. No signature is required**</p>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default SellectedInvoice;
