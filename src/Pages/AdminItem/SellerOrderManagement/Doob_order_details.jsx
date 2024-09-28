import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Clock, Package, Truck, User, DollarSign, ShoppingCart, CreditCard } from 'lucide-react';
import LoaderData from "../../../Common/LoaderData";
import { useEffect } from "react";

const formatDate = (timestamp) => {
      return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
      });
};

const Doob_order_details = () => {
      const [searchParams] = useSearchParams();
      const order_id = searchParams.get('order_id');

      // Fetch order details by order_id
      const {
            data: order_details = {},
            refetch: refetchOrderDetails,
            isLoading: orderLoading,
      } = useQuery({
            queryKey: ['order_details_admin', order_id],
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/admin/get-shop-order-by-id?id=${order_id}`);
                  const data = await res.json();
                  return data.data;
            },
            enabled: !!order_id, // Only run query if order_id exists
      });

      // Fetch customer details based on order_details.customer (if order_details is available)
      const {
            data: seller_details = {},
            isLoading: customerLoading,
      } = useQuery({
            queryKey: ['customer_details_admin', order_details?.customer],
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/admin/seller-info?id=${order_details?.seller}`);
                  const data = await res.json();
                  return data;
            },
            enabled: !!order_details?.seller, // Only run query if customer ID exists
      });

      useEffect(() => {
            if (order_id) {
                  refetchOrderDetails(); // Refetch when order_id changes
            }
      }, [order_id, refetchOrderDetails]);

      if (orderLoading) return <LoaderData />;

      console.log(order_details);

      return (
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto">
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                              {/* Order Header */}
                              <div className="px-4 py-5 bg-gray-50 border-b">
                                    <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
                                    <p className="mt-1 text-sm text-gray-500">Order ID: {order_details._id}</p>
                              </div>

                              {/* Order Content */}
                              <div className="px-4 py-6 space-y-8">
                                    {/* Product Info */}
                                    <div className="flex items-center space-x-4">
                                          <img
                                                src={order_details.product.image || "https://via.placeholder.com/100"}
                                                alt={order_details.product.name}
                                                className="h-20 w-20 object-cover rounded-lg"
                                          />
                                          <div>
                                                <h4 className="font-medium text-gray-900">{order_details.product.name}</h4>
                                                <p className="text-sm text-gray-500">Quantity: {order_details.quantity || 'N/A'}</p>
                                          </div>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="grid grid-cols-3 gap-4">
                                          <div className="flex items-center">
                                                <User className="mr-2 h-5 w-5 text-gray-400" />
                                                <span>Customer</span>
                                          </div>
                                          <div className="col-span-2">
                                                <p className="text-gray-900">{order_details.userInfo?.fullName}</p>
                                                <p className="text-gray-500">{order_details.userInfo?.mobileNumber}</p>
                                                <p className="text-gray-500">{order_details.userInfo?.province},{order_details?.userInfo?.city},{order_details?.userInfo?.area},{order_details?.userInfo?.address}</p>
                                          </div>
                                    </div>

                                    {/* Seller Info */}
                                    <div className="grid grid-cols-3 gap-4">
                                          <div className="flex items-center">
                                                <Truck className="mr-2 h-5 w-5 text-gray-400" />
                                                <span>Seller</span>
                                          </div>
                                          <div className="col-span-2">
                                                <p className="text-gray-900">{seller_details.shopName}</p>
                                                <p className="text-gray-500">{seller_details.shopEmail}</p>
                                                <p className="text-gray-500">{seller_details.address}</p>
                                          </div>
                                    </div>

                                    {/* Price Info */}
                                    <div className="grid grid-cols-3 gap-4">
                                          <div className="flex items-center">
                                                <DollarSign className="mr-2 h-5 w-5 text-gray-400" />
                                                <span>Price Details</span>
                                          </div>
                                          <div className="col-span-2">
                                                <p>
                                                      Price: {order_details.price ? (
                                                            <>
                                                                  <span className="kalpurush">৳</span>
                                                                  {order_details.price.toFixed(2)}
                                                            </>
                                                      ) : 'N/A'}
                                                </p>
                                                <p>Handling: <span className="kalpurush">৳</span>{order_details.handling.toFixed(2)}</p>
                                                <p>Commission: {order_details.commission}%</p>
                                          </div>
                                    </div>

                                    {/* Order Info */}
                                    <div className="grid grid-cols-3 gap-4">
                                          <div className="flex items-center">
                                                <ShoppingCart className="mr-2 h-5 w-5 text-gray-400" />
                                                <span>Order Info</span>
                                          </div>
                                          <div className="col-span-2">
                                                <p>
                                                      Status: <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                                            {order_details.status}
                                                      </span>
                                                </p>
                                                <p>For Product: {order_details?.userInfo?.for_product}</p>
                                                <p>Categories: {order_details?.userInfo?.categories?.filter(Boolean).map(cat => cat?.name).join(', ') || 'N/A'}</p>
                                                <p>Paid Status: {order_details?.paid_status ?? 'N/A'}</p>
                                          </div>
                                    </div>

                                    {/* Date */}
                                    <div className="grid grid-cols-3 gap-4">
                                          <div className="flex items-center">
                                                <Clock className="mr-2 h-5 w-5 text-gray-400" />
                                                <span>Date</span>
                                          </div>
                                          <div className="col-span-2">
                                                <p>{formatDate(order_details.date)}</p>
                                          </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                          <div className="flex items-center">
                                                <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
                                                <span>Getway</span>
                                          </div>
                                          <div className="col-span-2">
                                                {order_details.getway && order_details.getway.Getaway === 'Bank' ? <div className="col-span-2">
                                                      <p>
                                                            Getway: <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                                                  {order_details.getway.Getaway}
                                                            </span>
                                                      </p>
                                                      <p>Bank Name: {order_details.getway.bank_name}</p>
                                                      <p>Account Name: {order_details.getway.account_name}</p>
                                                      <p>Account Number: {order_details.getway.account_number}</p>
                                                      <p>Branch Name: {order_details.getway.brach_name}</p>

                                                </div>
                                                      : 'Cash on Delivery'}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Doob_order_details;
