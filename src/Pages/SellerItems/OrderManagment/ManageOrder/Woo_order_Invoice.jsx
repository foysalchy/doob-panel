import React, { useState, useRef, useContext } from "react";
import { useReactToPrint } from 'react-to-print';
import { AuthContext } from "../../../../AuthProvider/UserProvider";

const InvoicePage = ({ wooSelectItem, setView_invoice, view_invoice }) => {
      const componentRef = useRef();
      const { shopInfo } = useContext(AuthContext);
      // Function to close the modal
      const closeModal = () => setView_invoice(false);

      // Function to handle printing
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      return (
            <div className="invoice-container overflow-y-auto absolute top-0 left-0 w-[80%] h-[80%]">
                  {/* Print Invoice button */}
                  <button
                        onClick={() => setView_invoice(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                        Print Invoice
                  </button>

                  {/* Modal */}
                  {view_invoice && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 overflow-y-auto">
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
                                          {wooSelectItem.map((customer, index) => (
                                                <div
                                                      key={index}
                                                      className="invoice-content"
                                                      style={{ pageBreakBefore: index > 0 ? "always" : "auto" }}
                                                >
                                                      <h2 className="text-2xl font-bold text-center my-4">Invoice</h2>
                                                      <div className="border-t pt-4 mt-4" />
                                                      <InvoiceHeader shopInfo={shopInfo} />
                                                      <div className="py-4 text-center font-bold bg-gray-200 text-gray-600">
                                                            SALES INVOICE
                                                      </div>
                                                      <InvoiceAddress wooSelectItem={wooSelectItem[index].billing} />
                                                      <InvoiceProducts products={customer.line_items} />
                                                      <InvoiceFooter products={customer.line_items} />
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

// InvoiceHeader Component
const InvoiceHeader = ({ shopInfo }) => (
      <header className="flex items-start justify-between">
            <img src={shopInfo?.logo ?? "https://doob.com.bd/assets/Logo-d2ec0d35.png"} alt="Shop Logo" className="w-52" />
            <div className="text-right">
                  <p className="font-bold">{shopInfo?.shopName ?? "Doob"}</p>
                  <p>{shopInfo?.shopEmail ?? "info@doob.com.bd"}</p>
                  <p>{shopInfo?.shopNumber}</p>
                  <p>{shopInfo?.address}</p>
            </div>
      </header>
);

// InvoiceAddress Component
const InvoiceAddress = ({ wooSelectItem }) => {
      console.log(wooSelectItem, "customer");

      return (

            <div className="grid grid-cols-2 gap-8 mb-6">
                  <div>
                        <h2 className="text-lg font-bold">Billed To:</h2>
                        <p>{`${wooSelectItem?.first_name} ${wooSelectItem?.last_name || ""}`}</p>
                        <p>{wooSelectItem?.address_1}</p>
                        <p>{wooSelectItem?.city}, {wooSelectItem?.state}, {wooSelectItem?.country}</p>
                        <p>{wooSelectItem?.email}</p>
                        <p>{wooSelectItem?.phone}</p>
                  </div>
            </div>
      );
};

// InvoiceProducts Component
const InvoiceProducts = ({ products }) => (
      <table className="w-full mb-6 border-collapse border border-gray-300">
            <thead>
                  <tr>
                        <th className="border border-gray-300 px-4 py-2">Product</th>
                        <th className="border border-gray-300 px-4 py-2">Quantity</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Total</th>
                  </tr>
            </thead>
            <tbody>
                  {products.map((product, index) => (
                        <tr key={index}>
                              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
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
const InvoiceFooter = ({ products }) => {
      const total = products?.reduce(
            (sum, product) => sum + product.quantity * parseFloat(product.price),
            0
      );

      return (
            <div className="border-t pt-4 mt-4">
                  <h2 className="text-right text-lg font-bold">Total: <span className="kalpurush">৳</span>{total?.toFixed(2)}</h2>
            </div>
      );
};

export default InvoicePage;
