import React, { useContext, useRef } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider"; // Assuming AuthContext is used to get shopInfo
import { useReactToPrint } from "react-to-print";

const Woo_Order_stock = ({ woo_select_item, woo_select_item_view, setWoo_select_item_view }) => {
      const { shopInfo } = useContext(AuthContext);

      // Reference for the print content
      const printContentRef = useRef();

      // Function to close the modal
      const closeModal = () => {
            setWoo_select_item_view(false);
      };

      // Print handler using react-to-print
      const handlePrint = useReactToPrint({
            content: () => printContentRef.current,
            documentTitle: "Order Details",
      });

      return (
            <div>
                  {/* Modal */}
                  {woo_select_item_view && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 overflow-y-auto">
                              <div className="bg-white p-8 rounded-lg w-full max-w-4xl my-8 shadow-lg">
                                    <div className="flex justify-between items-center mb-4">
                                          <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                                          <button onClick={closeModal} className="text-gray-600 text-xl font-semibold">
                                                ×
                                          </button>
                                    </div>

                                    {/* Shop Info */}
                                    <div className="mb-6">
                                          <h3 className="font-bold text-xl text-gray-700">Shop Information</h3>
                                          <p className="font-semibold">{shopInfo?.shopName ?? "Doob"}</p>
                                          <p>{shopInfo?.shopEmail ?? "info@doob.com.bd"}</p>
                                          <p>{shopInfo?.shopNumber}</p>
                                          <p>{shopInfo?.address}</p>
                                    </div>

                                    {/* Order Info */}
                                    <div className="mb-6  h-[50vh] overflow-y-scroll">
                                          <h3 className="font-bold text-lg text-gray-700">Order Products</h3>
                                          {woo_select_item.map((order, index) => (
                                                <div key={index} className="border-t pt-4">
                                                      <h4 className="font-semibold text-xl text-gray-800">Order #{order.id}</h4>

                                                      <div className="mb-4">
                                                            <table className="w-full mb-4 border-collapse border border-gray-300">
                                                                  <thead>
                                                                        <tr>
                                                                              <th className="border border-gray-300 px-4 py-2">Image</th>
                                                                              <th className="border border-gray-300 px-4 py-2">Product</th>
                                                                              <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                                                              <th className="border border-gray-300 px-4 py-2">Price</th>
                                                                        </tr>
                                                                  </thead>
                                                                  <tbody>
                                                                        {order.line_items.map((item, idx) => (
                                                                              <tr key={idx}>
                                                                                    <td className="border border-gray-300 px-4 py-2">
                                                                                          <img src={item.image.src} alt={item.name} className="w-12 h-12 object-cover" />
                                                                                    </td>
                                                                                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                                                                    <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                                                                                    <td className="border border-gray-300 px-4 py-2"><span className="kalpurush">৳</span>{parseFloat(item.price).toFixed(2)}</td>
                                                                              </tr>
                                                                        ))}
                                                                  </tbody>
                                                            </table>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>

                                    {/* Print and Close Buttons */}
                                    <div className="mt-4 flex justify-between">
                                          <button
                                                onClick={handlePrint}
                                                className="px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                                          >
                                                Print Order
                                          </button>
                                          <button
                                                onClick={closeModal}
                                                className="px-6 py-3 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700"
                                          >
                                                Close
                                          </button>
                                    </div>
                              </div>
                        </div>
                  )}

                  {/* Content to be printed */}
                  <div style={{ display: "none" }}>
                        <div className="px-4" ref={printContentRef}>
                              {/* Shop Info */}
                              <h3 className="font-bold text-xl text-gray-700">Shop Information</h3>
                              <p className="font-semibold">{shopInfo?.shopName}</p>
                              <p>{shopInfo?.shopEmail}</p>
                              <p>{shopInfo?.shopNumber}</p>
                              <p>{shopInfo?.address}</p>

                              {/* Order Info */}
                              {woo_select_item.map((order, index) => (
                                    <div key={index}>
                                          <h4 className="font-semibold text-xl text-gray-800">Order #{order.id}</h4>
                                          <table className="w-full mb-4 border-collapse border border-gray-300">
                                                <thead>
                                                      <tr>
                                                            <th className="border border-gray-300 px-4 py-2">Image</th>
                                                            <th className="border border-gray-300 px-4 py-2">Product</th>
                                                            <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                                            <th className="border border-gray-300 px-4 py-2">Price</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {order.line_items.map((item, idx) => (
                                                            <tr key={idx}>
                                                                  <td className="border border-gray-300 px-4 py-2">
                                                                        <img src={item.image.src} alt={item.name} className="w-12 h-12 object-cover" />
                                                                  </td>
                                                                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                                                  <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                                                                  <td className="border border-gray-300 px-4 py-2"><span className="kalpurush">৳</span>{parseFloat(item.price).toFixed(2)}</td>
                                                            </tr>
                                                      ))}
                                                </tbody>
                                          </table>
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default Woo_Order_stock;
