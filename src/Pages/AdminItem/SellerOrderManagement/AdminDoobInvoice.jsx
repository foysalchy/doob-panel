import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from '../../../assets/doobBlack.png';

const AdminDoobInvoice = (props) => {
      const { data, showPrintModal1, setShowPrintModal1 } = props;
      const componentRef = useRef();

      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      const InvoicePage = ({ order }) => {
            const total = order.price * (order.quantity ?? 1);

            return (
                  <div
                        className="invoice-page"
                        style={{ pageBreakAfter: 'always' }} // Ensure each invoice has a page break
                  >
                        <div className="max-w-4xl mx-auto my-8 bg-white shadow-lg rounded-lg bar overflow-hidden">
                              <div className="p-8">
                                    <div className="flex justify-between items-start mb-8">
                                          <div>
                                                <img src={logo} alt="Doob Logo" className="w-40 mb-4" />
                                                <h2 className="text-2xl font-bold text-gray-800">Invoice</h2>
                                                <p className="text-gray-600">Order #{order._id}</p>
                                                <p className="text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
                                          </div>
                                          <div className="text-right">
                                                <h3 className="font-semibold text-gray-800">Doob</h3>
                                                <p className="text-gray-600">info@doob.com.bd</p>
                                                <p className="text-gray-600">+880 123 456 789</p>
                                                <p className="text-gray-600">Mirpur Dhaka Bangladesh</p>
                                          </div>
                                    </div>

                                    <div className="mb-8">
                                          <div className="bg-gray-100 rounded-t-lg p-4 font-semibold text-gray-700">
                                                Order Details
                                          </div>
                                          <table className="w-full">
                                                <thead>
                                                      <tr className="bg-gray-200 text-gray-700">
                                                            <th className="p-4 text-left">Image</th>
                                                            <th className="p-4 text-left">Product</th>
                                                            <th className="p-4 text-left">Quantity</th>
                                                            <th className="p-4 text-left">Price</th>
                                                            <th className="p-4 text-right">Total</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      <tr className="border-b">
                                                            <td className="p-4">
                                                                  <img src={order.product.image} alt={order.product.name} className="w-20 h-20 object-cover rounded" />
                                                            </td>
                                                            <td className="p-4 font-medium text-gray-800">{order.product.name}</td>
                                                            <td className="p-4 text-gray-700">{order.quantity ?? 1}</td>
                                                            <td className="p-4 text-gray-700 "><span className="kalpurush">৳</span>{order.price ?? 0}</td>
                                                            <td className="p-4 text-right text-gray-700"><span className="kalpurush">৳</span>{(order.price * (order.quantity ?? 1))}</td>
                                                      </tr>
                                                </tbody>
                                          </table>
                                    </div>

                                    <div className="flex justify-end">
                                          <div className="w-64">
                                                <div className="flex justify-between mb-2">
                                                      <span className="font-medium text-gray-700">Subtotal:</span>
                                                      <span className="text-gray-700"><span className="kalpurush">৳</span> {(order.price * order.quantity)}</span>
                                                </div>
                                                <div className="flex justify-between border-t pt-2">
                                                      <span className="font-bold text-gray-800">Total:</span>
                                                      <span className="font-bold text-gray-800"><span className="kalpurush">৳</span> {total}</span>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            );
      };

      return (
            <div>
                  <div className="flex gap-2">
                        <button
                              onClick={handlePrint}
                              className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                        >
                              Print
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
                              ref={componentRef}
                              className="m-auto"
                              style={{ width: "210mm", height: "297mm" }}
                        >
                              {data.map((order, i) => (
                                    <InvoicePage key={i} order={order} />
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default AdminDoobInvoice;
