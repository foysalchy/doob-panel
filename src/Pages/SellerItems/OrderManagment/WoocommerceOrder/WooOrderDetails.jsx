import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Package, Phone, Calendar, CreditCard, MapPin, Printer } from 'lucide-react';

export default function WooOrderDetails() {
      const { id, shop_id } = useParams();
      const componentRef = useRef(null);
      const [orderInfo, setOrderInfo] = useState(null);

      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      const { data: wooOrders = [], isLoading } = useQuery({
            queryKey: ["sellerWooOrder_Invoice", shop_id],
            queryFn: async () => {
                  const response = await fetch(
                        `https://doob.dev/api/v1/seller/woo-commerce-order?shopId=${shop_id}`
                  );
                  const result = await response.json();
                  return result.data;
            },
      });

      console.log(wooOrders);
      useEffect(() => {
            if (wooOrders?.length) {
                  const order = wooOrders.find((order) => parseInt(order.id) === parseInt(id));
                  setOrderInfo(order);
            }
      }, [wooOrders, id]);

      const formattedDate = (date) =>
            new Date(date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
            });

      if (isLoading) {
            return <div className="flex justify-center items-center h-screen">Loading...</div>;
      }

      if (!orderInfo) {
            return <div className="flex justify-center items-center h-screen">Order not found</div>;
      }

      return (
            <div className="bg-gray-100 min-h-screen p-6" ref={componentRef}>
                  <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                              <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
                                    <button
                                          onClick={handlePrint}
                                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                          <Printer className="w-5 h-5 mr-2" />
                                          Print
                                    </button>
                              </div>
                              <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                          <h2 className="text-xl font-semibold text-gray-700">Customer Information</h2>
                                          <div className="space-y-2">
                                                <p className="flex items-center text-gray-600">
                                                      <Package className="w-5 h-5 mr-2 text-blue-600" />
                                                      <span className="font-medium">Name:</span> {orderInfo.billing.first_name} {orderInfo.billing.last_name}
                                                </p>
                                                <p className="flex items-center text-gray-600">
                                                      <Phone className="w-5 h-5 mr-2 text-blue-600" />
                                                      <span className="font-medium">Phone:</span> {orderInfo.billing.phone}
                                                </p>
                                                <p className="flex items-center text-gray-600">
                                                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                                                      <span className="font-medium">Date:</span> {formattedDate(orderInfo.date_paid)}
                                                </p>
                                                <p className="flex items-center text-gray-600">
                                                      <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                                                      <span className="font-medium">Payment Method:</span> {orderInfo.payment_method_title || "N/A"}
                                                </p>
                                                <p className="flex items-center text-gray-600">
                                                      <span className="font-medium">Payment Status:</span>{" "}
                                                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${orderInfo.paid_status === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                            }`}>
                                                            {orderInfo.paid_status ?? "Unpaid"}
                                                      </span>
                                                </p>
                                          </div>
                                    </div>
                                    <div className="space-y-4">
                                          <h2 className="text-xl font-semibold text-gray-700">Billing Address</h2>
                                          <div className="space-y-2">
                                                <p className="flex items-start text-gray-600">
                                                      <MapPin className="w-5 h-5 mr-2 text-blue-600 mt-1" />
                                                      {orderInfo.billing.address_1}
                                                      {orderInfo.billing.address_2 && <>, {orderInfo.billing.address_2}</>}
                                                      <br />
                                                      {orderInfo.billing.city}, {orderInfo.billing.state} {orderInfo.billing.postcode}
                                                      <br />
                                                      {orderInfo.billing.country}
                                                </p>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div className="p-6 bg-gray-50">
                              <h2 className="text-xl font-semibold text-gray-700 mb-4">Products</h2>
                              <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500">
                                          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                                <tr>
                                                      <th scope="col" className="px-6 py-3">Image</th>
                                                      <th scope="col" className="px-6 py-3">Name</th>
                                                      <th scope="col" className="px-6 py-3">Price</th>
                                                      <th scope="col" className="px-6 py-3">Product ID</th>
                                                      <th scope="col" className="px-6 py-3">Quantity</th>
                                                      <th scope="col" className="px-6 py-3">Status</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {orderInfo.line_items.map((item) => (
                                                      <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                                            <td className="px-6 py-4">
                                                                  <img src={item.image?.src || '/placeholder.svg'} alt={item.name} className="w-16 h-16 object-cover" />
                                                            </td>
                                                            <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                                            <td className="px-6 py-4"><span className="kalpurush">৳</span>{item.price.toFixed(2)}</td>
                                                            <td className="px-6 py-4">{item.product_id}</td>
                                                            <td className="px-6 py-4">{item.quantity}</td>
                                                            <td className="px-6 py-4">
                                                                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                        {orderInfo.status || "Processing"}
                                                                  </span>
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                        <div className="p-6 bg-gray-100">
                              <div className="flex justify-end">
                                    <div className="w-full max-w-md">
                                          <h3 className="text-lg font-semibold text-gray-700 mb-2">Order Summary</h3>
                                          <div className="space-y-1 text-sm">
                                                <p className="flex justify-between"><span>Subtotal:</span> <span><span className="kalpurush">৳</span>{orderInfo.total}</span></p>
                                                <p className="flex justify-between"><span>Discount:</span> <span>-<span className="kalpurush">৳</span>{orderInfo.discount_total}</span></p>
                                                <p className="flex justify-between font-semibold text-lg"><span>Total:</span> <span><span className="kalpurush">৳</span>{orderInfo.total}</span></p>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
