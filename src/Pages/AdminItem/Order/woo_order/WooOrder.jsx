import { useQuery } from "@tanstack/react-query";

const WooOrder = () => {
      const { data: wooOrders = [], isLoading } = useQuery({
            queryKey: ["sellerWooOrder_Admin"],
            queryFn: async () => {
                  const response = await fetch(
                        `http://localhost:5001/api/v1/admin/get-woo-admin-order`
                  );
                  const result = await response.json();
                  return result.data;
            },
      });
      return (
            <div>
                  <h1 className="text-3xl">Woo Order</h1>
                  <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                              <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Order ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Order Date
                                    </th>
                              </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                              {wooOrders.map((order) => (
                                    <tr key={order.id}>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{order.id}</div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{order.date_created}</div>
                                          </td>
                                    </tr>
                              ))}

                        </tbody>
                  </table>
            </div>
      );
};

export default WooOrder;
