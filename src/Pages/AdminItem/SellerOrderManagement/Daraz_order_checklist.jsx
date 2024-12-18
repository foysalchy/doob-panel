import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Daraz_order_checklist = ({ orders, set_modal }) => {
      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      const groupItemsBySKU = (orders) => {
            const groupedItems = {};
            orders.forEach((order) => {
                  order.items.forEach((item) => {
                        const productKey = item.product_id?.toString().trim() || item.sku?.trim() || item.name?.trim();
                        if (!groupedItems[productKey]) {
                              groupedItems[productKey] = { ...item, quantity: 0 };
                        }
                        groupedItems[productKey].quantity += item.quantity || 1; // Aggregate quantity
                  });
            });

            return Object.values(groupedItems);
      };
      const groupedItems = groupItemsBySKU(orders);

      return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-50">
                  <div className="bg-white w-full max-w-4xl h-full max-h-[90vh] p-6 rounded-lg shadow-xl overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                              <h1 className="text-3xl font-bold text-gray-800">Order Checklist</h1>
                              <div className="flex gap-4">
                                    <button
                                          onClick={handlePrint}
                                          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out"
                                    >
                                          Print
                                    </button>
                                    <button
                                          onClick={() => set_modal(false)}
                                          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out"
                                    >
                                          Close
                                    </button>
                              </div>
                        </div>
                        <div ref={componentRef} className="bg-white p-6 rounded-lg shadow-md">
                              <header className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                                    <h2 className="text-4xl font-bold text-blue-600">Doob</h2>
                                    <p className="text-xl font-semibold text-gray-600">INVOICE</p>
                              </header>
                              <main>
                                    <div className="overflow-x-auto">
                                          <table className="w-full border-collapse">
                                                <thead>
                                                      <tr className="bg-gray-100">
                                                            <th className="px-4 py-2 text-left text-gray-600">Photo</th>
                                                            <th className="px-4 py-2 text-left text-gray-600">Name</th>
                                                            <th className="px-4 py-2 text-left text-gray-600">Price</th>
                                                            <th className="px-4 py-2 text-left text-gray-600">Quantity</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {groupedItems?.map((item) => (
                                                            <tr key={item.product_id || item.sku || item.name} className="border-b border-gray-200 hover:bg-gray-50">
                                                                  <td className="px-4 py-2">
                                                                        <img
                                                                              src={item.product_main_image || "https://via.placeholder.com/50"}
                                                                              alt={item.name || "Product Image"}
                                                                              className="w-16 h-16 object-cover rounded-md"
                                                                        />
                                                                  </td>
                                                                  <td className="px-4 py-2 font-medium text-gray-800">
                                                                        {item.name || "N/A"}
                                                                        <br />
                                                                        {item.sku && <span className="text-sm text-gray-500">SKU: {item.sku}</span>}
                                                                  </td>
                                                                  <td className="px-4 py-2 text-gray-600">{item.paid_price || "N/A"}</td>
                                                                  <td className="px-4 py-2 text-gray-600">{item.quantity}</td>
                                                            </tr>
                                                      ))}
                                                </tbody>
                                          </table>
                                    </div>
                              </main>
                        </div>
                  </div>
            </div>
      );
};

export default Daraz_order_checklist;
