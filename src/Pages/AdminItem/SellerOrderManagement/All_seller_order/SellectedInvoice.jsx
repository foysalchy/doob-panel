import React, { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import logo from '../../../../assets/doobBlack.png';

const SellectedInvoice = ({ invoiceData, setHandle_invoice }) => {

      console.log(invoiceData,setHandle_invoice, 'invoiceData');

      const { shopInfo } = useContext(AuthContext)

      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
            documentTitle: `Invoice_${invoiceData?.orderNumber}`,
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
                              {invoices_data?.map((invoiceData, index) => (
                                    <div key={invoiceData.order_id} className="text-2xl mt-4 font-bold mb-4 page-break">
                                          {console.log(invoiceData, 'invoiceDatax')}
                                          <div>
                                                <div className="max-w-2xl mx-auto p-4 bg-white border border-gray-200">
                                                      {/* Header */}
                                                      <header className="flex items-start justify-between">
                                                            <img src={logo} alt="logo" className='w-[200px]' />
                                                            <div className='whitespace-wrap w-[300px]'>
                                                                  {/* <p className='text-gray-600 text-end'>{user?._id}</p> */}
                                                                  <p className='text-gray-600 text-lg text-end'>Doob</p>
                                                                  <p className='text-gray-600 text-lg text-end'>info@doob.com.bd</p>
                                                                  <p className='text-gray-600 text-lg text-end'>+880 123 456 789</p>
                                                                  <p className='text-gray-600 text-lg text-end'>Mirpur Dhaka Bangladesh</p>
                                                            </div>
                                                      </header>
                                                      {/* Title */}
                                                      <h2 className="text-center text-xl bg-gray-300 font-bold mb-6">SALES INVOICE</h2>

                                                      {/* Invoice Info */}
                                                      <div className="flex justify-between mb-4">
                                                            <div>
                                                                  <p className="text-sm font-semibold">Billing Address</p>
                                                                  <p className="text-sm">{invoiceData?.addresses?.fullName ?? <>{invoiceData?.address_billing?.first_name} {invoiceData?.address_billing?.last_name}</>}</p>
                                                                  <p className="text-sm"> {invoiceData?.address_billing?.mobileNumber ?? <>{invoiceData?.address_billing?.phone}</>} </p>
                                                                  <p className="text-sm">{invoiceData?.address_billing?.email}</p>
                                                                  <p className="text-sm">{invoiceData?.address_billing?.address ?? invoiceData?.address_billing?.address1}, {invoiceData?.address_billing?.city ?? invoiceData?.address_billing?.address2}, {invoiceData?.address_billing?.area ?? invoiceData?.address_billing?.address3}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                  <p className="text-sm">Invoice No.: {invoiceData?.orderNumber ?? invoiceData?.order_id}</p>
                                                                  <p className="text-sm">Invoice Date: {parseDate().toLocaleString()}</p>
                                                                  <p className="text-sm">Order Number: {invoiceData?.orderNumber ?? invoiceData?.order_id}</p>
                                                                  <p className="text-sm">Order Date: {new Date(invoiceData?.
                                                                        created_at).toLocaleString()}</p>
                                                            </div>
                                                      </div>

                                                      {/* Type of Supply */}
                                                      {<div className="mb-4">
                                                            <span className="text-sm font-semibold">Payment Method: <span className="font-normal">{invoiceData?.method?.Getaway ?? invoiceData?.
                                                                  payment_method ?? 'Cash on Delivery'
                                                            }</span>
                                                            </span>
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
                                                                  {(invoiceData?.productList || invoiceData?.items || []).map((product, idx) => (
    <tr key={idx}>
        <td className="border border-gray-300 p-2 text-sm">{idx + 1}</td>
        <td className="border border-gray-300 p-2 text-sm">
            <img width="100px" src={product?.img || product?.product_main_image || ''} alt="" />
        </td>
        <td className="border border-gray-300 p-2 text-sm">{product?.productName || 'Unknown'}</td>
        <td className="border border-gray-300 p-2 text-sm">{product?.quantity || 1}</td>
        <td className="border border-gray-300 p-2 text-sm">
            <span className="kalpurush">৳</span> {product?.price || product?.paid_price || 0}
        </td>
    </tr>
))}

                                                            </tbody>}
                                                      </table>

                                                      {/* Total */}
                                                      <div className="text-right mb-4">
                                                            <p className="text-sm">Total Unit Price*: <span className="kalpurush">৳</span>{invoiceData?.productList?.reduce((total, product) => total + (product.price * product.quantity), 0) ?? invoiceData?.
                                                                  price
                                                            }</p>
                                                            <p className="text-sm">Total Delivery Fee*: <span className="kalpurush">৳</span> {invoiceData?.productList?.reduce((total, product) => total + (product.delivery_charge || 0), 0) ?? invoiceData?.shipping_fee}</p>
                                                            <p className="text-sm font-semibold">Total: BDT {invoiceData?.promoHistory?.normalPrice ?? (parseInt(invoiceData?.shipping_fee || 0) + parseInt(invoiceData?.price || 0))}</p>
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
