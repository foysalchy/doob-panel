import React, { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import SelectInvoiceCard from "./SelectInvoiceCard";
import { AuthContext } from "../../../../AuthProvider/UserProvider";

const SellectedInvoice = ({ invoiceData, setHandle_invoice }) => {

      const { shopInfo } = useContext(AuthContext)

      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      const invoices_data = invoiceData



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
                                          <SelectInvoiceCard shopInfo={shopInfo} id={invoiceData.order_id} invoiceData={invoiceData} />
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default SellectedInvoice;
