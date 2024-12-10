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
            </div>
      );
};

export default WooOrder;
