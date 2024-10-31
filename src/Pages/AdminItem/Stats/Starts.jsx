import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { BiSolidTraffic, BiSolidUser } from "react-icons/bi";
import { FaPersonArrowUpFromLine, FaSalesforce } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";
import { TbUsers } from "react-icons/tb";
import { ShoppingCart, Wallet, Users, Package, Building2, Wrench, TicketCheck, Archive, TrendingUp, Activity } from "lucide-react"

const Starts = () => {
      const { data: newUsers = [], refetch } = useQuery({
            queryKey: ["newUser"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/previous-week-users"
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const { data: orderData = [], reload } = useQuery({
            queryKey: ["orderData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/get-shop-all-order`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      // seller data
      const [showSeller, setShowSeller] = useState(false);
      const { data: sellerData = [] } = useQuery({
            queryKey: ["sellerData"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/seller");
                  const data = await res.json();
                  return data;
            },
      });

      function sumObjectPrices(objects) {
            let totalPrice = 0;
            for (let i = 0; i < objects.length; i++) {
                  totalPrice += parseInt(objects[i].price ? objects[i].price : 0); // Parsing the price to an integer
            }
            return totalPrice;
      }

      const totalAmount = sumObjectPrices(orderData);

      const { data: products = [] } = useQuery({
            queryKey: ["products"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/products");
                  const data = await res.json();
                  return data;
            },
      });

      const topSel =
            products.length &&
            products?.sort((a, b) => {
                  return (b.total_sales || 0) - (a.total_sales || 0);
            });

            const totalCount = products.length;
            const darazCount = products.filter(item => item.add_daraz === true).length;
            const wooCount = products.filter(item => item.add_woo === true).length;
            const doobCount = products.filter(item => !item.add_daraz && !item.add_woo).length;
            const saleCount = products.filter(item => item.multiVendor === true).length;

            const { data: warehouses = [] } = useQuery({
                  queryKey: ["warehouses"],
                  queryFn: async () => {
                        const res = await fetch("https://doob.dev/api/v1/admin/warehouse");
                        const data = await res.json();
                        return data;
                  },
            });
            const { data: swarehouses = [] } = useQuery({
                  queryKey: ["swarehouses"],
                  queryFn: async () => {
                        const res = await fetch("https://doob.dev/api/v1/admin/warehouse/x");
                        const data = await res.json();
                        return data;
                  },
            });
            const totalwar = warehouses.length;
            const activeWar = warehouses.filter(item => item.status === true).length;
            const totalwarx= swarehouses.length;
            const activeWarx = swarehouses.filter(item => item.status === true).length;

            const { data: serviceOrder = [], isLoading } = useQuery({
                  queryKey: ["serviceOrder"],
                  queryFn: async () => {
                        const res = await fetch(
                              "https://doob.dev/api/v1/admin/get-all-service-order"
                        );
                        const data = await res.json();
                        return data.data;
                  },
            });
            const totalSer = serviceOrder.length;
            const activesCount = serviceOrder.filter(order => order.status === true).length;
            const inactivesCount = serviceOrder.filter(order => order.status === false).length;
            const pendingsCount = serviceOrder.filter(order => order.status == null).length;

            const {
                  data: tickets = [],
                  
                 
            } = useQuery({
                  queryKey: ["supportTicketRequest"],
                  queryFn: async () => {
                        const res = await fetch(
                              `https://doob.dev/api/v1/admin/supportTicketRequest${query}`
                        );
                        const data = await res.json();
                        return data;
                  },
            });

            const noStatusTickets = tickets?.filter((ticket) => !ticket?.status);
            const noStatusLength = noStatusTickets?.length;
            const AllsuportTicket = tickets?.length;
      
            const openTicket = tickets?.filter((ticket) => ticket?.status === "Open");
            const openLength = openTicket?.length;
      
            const closedTicket = tickets?.filter((ticket) => ticket?.status === "Closed");
            const closedLength = closedTicket.length;


            const {
                  data: stockRequest = [],
            } = useQuery({
                  queryKey: ["stockRequest"],
                  queryFn: async () => {
                        const res = await fetch(`https://doob.dev/api/v1/admin/stock-request`);
                        const data = await res.json();
                        
      
                        return data?.data;
                  },
            });
            const canceledCount = stockRequest.filter(itm => itm.status === "cancel").length;
            const rejectedCount = stockRequest.filter(itm => itm.status === "reject").length;
            const pendingCount = stockRequest.filter(itm => itm.status === "pending").length;
            const stockUpdatedCount = stockRequest.filter(itm => itm.status === "Stock Updated").length;
           

      return (
            <div className="">
                 
                 <div className="p-6 space-y-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Primary Stats */}
                        <div className="rounded-[5px] group relative overflow-hidden bg-gradient-to-br from-emerald-500/90 to-emerald-600/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="p-6">
                              <div className="flex justify-between items-center">
                              <div className="space-y-2">
                              <h3 className="text-sm font-medium text-emerald-50/70">Total Orders</h3>
                              <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-bold text-white">{orderData.length}</p>
                                    <span className="text-sm font-medium text-emerald-100">+12.5%</span>
                              </div>
                              </div>
                              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <ShoppingCart className="h-6 w-6 text-white" />
                              </div>
                              </div>
                        </div>
                        </div>

                        <div className="rounded-[5px] group relative overflow-hidden bg-gradient-to-br from-amber-500/90 to-amber-600/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="p-6">
                              <div className="flex justify-between items-center">
                              <div className="space-y-2">
                              <h3 className="text-sm font-medium text-amber-50/70">Total Amount Sold</h3>
                              <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-bold text-white">{totalAmount.toLocaleString()}</p>
                                    <span className="text-sm font-medium text-amber-100">+8.2%</span>
                              </div>
                              </div>
                              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Wallet className="h-6 w-6 text-white" />
                              </div>
                              </div>
                        </div>
                        </div>

                        <div className="rounded-[5px] group relative overflow-hidden bg-gradient-to-br from-violet-500/90 to-violet-600/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="p-6">
                              <div className="space-y-4">
                              <div className="flex justify-between items-center">
                              <h3 className="text-sm font-medium text-violet-50/70">User Statistics</h3>
                              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Users className="h-5 w-5 text-white" />
                              </div>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                              <StatItem label="Total" value={newUsers.totalCount} />
                              <StatItem label="New" value={newUsers.newUsersCount} />
                              <StatItem label="Active" value={newUsers.active} />
                              </div>
                              </div>
                        </div>
                        </div>

                        {/* Product Stats */}
                        <div className="rounded-[5px] group relative overflow-hidden bg-gradient-to-br from-blue-500/90 to-blue-600/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 col-span-full lg:col-span-2">
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="p-6">
                              <div className="space-y-4">
                              <div className="flex justify-between items-center">
                              <h3 className="text-sm font-medium text-blue-50/70">Product Distribution</h3>
                              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Package className="h-5 w-5 text-white" />
                              </div>
                              </div>
                              <div className="grid grid-cols-3 sm:grid-cols-5 gap-6">
                              <StatItem label="Products" value={totalCount} />
                              <StatItem label="Daraz" value={darazCount} />
                              <StatItem label="Woo" value={wooCount} />
                              <StatItem label="Doob" value={doobCount} />
                              <StatItem label="Multi vendor" value={saleCount} />
                              </div>
                              </div>
                        </div>
                        </div>

                        {/* Warehouse Stats */}
                        <div className="rounded-[5px] group relative overflow-hidden bg-gradient-to-br from-cyan-500/90 to-cyan-600/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="p-6">
                              <div className="space-y-4">
                              <div className="flex justify-between items-center">
                              <h3 className="text-sm font-medium text-cyan-50/70">Warehouse Status</h3>
                              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Building2 className="h-5 w-5 text-white" />
                              </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                    <p className="text-xs font-medium text-cyan-50/70">Doob </p>
                                    <div className="flex justify-between items-baseline">
                                          <span className="text-sm text-cyan-50/70">Total: {totalwar}</span>
                                          <span className="text-sm text-cyan-50/70">Active: {activeWar}</span>
                                    </div>
                              </div>
                              <div className="space-y-2">
                                    <p className="text-xs font-medium text-cyan-50/70">Seller </p>
                                    <div className="flex justify-between items-baseline">
                                    <span className="text-sm text-cyan-50/70">Total: {totalwarx}</span>
                                    <span className="text-sm text-cyan-50/70">Active: {activeWarx}</span>
                                    </div>
                              </div>
                              </div>
                              </div>
                        </div>
                        </div>

                        {/* Service Stats */}
                        <div className="rounded-[5px] group relative overflow-hidden bg-gradient-to-br from-pink-500/90 to-pink-600/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="p-6">
                              <div className="space-y-4">
                              <div className="flex justify-between items-center">
                              <h3 className="text-sm font-medium text-pink-50/70">Service Orders</h3>
                              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Wrench className="h-5 w-5 text-white" />
                              </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                              <StatItem label="Total" value={totalSer} />
                              <StatItem label="Active" value={activesCount} />
                              <StatItem label="Inactive" value={inactivesCount} />
                              <StatItem label="Pending" value={pendingsCount} />
                              </div>
                              </div>
                        </div>
                        </div>

                        {/* Support Stats */}
                        <div className="rounded-[5px] group relative overflow-hidden bg-gradient-to-br from-indigo-500/90 to-indigo-600/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="p-6">
                              <div className="space-y-4">
                              <div className="flex justify-between items-center">
                              <h3 className="text-sm font-medium text-indigo-50/70">Support Tickets</h3>
                              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <TicketCheck className="h-5 w-5 text-white" />
                              </div>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                              <StatItem label="Total" value={AllsuportTicket} />
                              <StatItem label="New" value={noStatusLength} />
                              <StatItem label="Open" value={openLength} />
                              <StatItem label="Closed" value={closedLength} />
                              </div>
                              </div>
                        </div>
                        </div>

                        {/* Stock Stats */}
                        <div className="rounded-[5px] group relative overflow-hidden bg-gradient-to-br from-rose-500/90 to-rose-600/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="p-6">
                              <div className="space-y-4">
                              <div className="flex justify-between items-center">
                              <h3 className="text-sm font-medium text-rose-50/70">Stock Requests</h3>
                              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Archive className="h-5 w-5 text-white" />
                              </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                              <StatItem label="Pending" value={pendingCount} />
                              <StatItem label="Cancelled" value={canceledCount} />
                              <StatItem label="Rejected" value={rejectedCount} />
                              <StatItem label="Approved" value={stockUpdatedCount} />
                              </div>
                              </div>
                        </div>
                        </div>
                        </div>
                  </div>
                  {/* dashboard table */}
                  <section className="py-1 bg-blueGray-50 mt-8">
                        <div className=" ">
                              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                                          <div className="flex flex-wrap items-center">
                                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                                      <h3 className="font-bold text-base  text-blueGray-700">
                                                            Top 10 Stork Rank
                                                      </h3>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="block w-full bar overflow-x-auto">
                                          <table className="items-center bg-transparent w-full border-collapse ">
                                                <thead>
                                                      <tr>
                                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                  #
                                                            </th>
                                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                  Name
                                                            </th>
                                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                  Shop Name
                                                            </th>
                                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                  Email
                                                            </th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {!sellerData?.length ? "" :
                                                            sellerData?.slice(0, 10).map((item, index) => (
                                                                  <tr>
                                                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                                              {index + 1}{" "}
                                                                              {/* Assuming there's a name property in your data */}
                                                                        </th>
                                                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                                              {item?.name ? item?.name : "empty"}{" "}
                                                                              {/* Assuming there's a name property in your data */}
                                                                        </th>
                                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                              {item?.shopName ? item?.shopName : "empty"}
                                                                        </td>
                                                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                              {item?.email ? item?.email : "empty"}
                                                                        </td>
                                                                  </tr>
                                                            ))}
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* dashboard top 20 selling items table */}
                  <section className="py-1 bg-blueGray-50 mt-8">
                        <div className=" ">
                              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                                          <div className="flex flex-wrap items-center">
                                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                                      <h3 className="font-bold text-base  text-blueGray-700">
                                                            Top 20 selling products
                                                      </h3>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="block w-full bar overflow-x-auto">
                                          <table className="items-center bg-transparent w-full border-collapse ">
                                                <thead>
                                                      <tr>
                                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                  #
                                                            </th>
                                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                  Image
                                                            </th>
                                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                  Name
                                                            </th>
                                                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                  price
                                                            </th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {sellerData &&
                                                            !products.length ? "" :
                                                            products?.slice(0, 20)?.map((item, index) => (
                                                                  <tr>
                                                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                                              {index + 1}{" "}
                                                                              {/* Assuming there's a name property in your data */}
                                                                        </th>
                                                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                                              <img
                                                                                    src={`${item?.featuredImage?.src
                                                                                          ? item?.featuredImage?.src
                                                                                          : item?.images[0]?.src
                                                                                          }`}
                                                                                    className="w-[60px] h-[60px] rounded-md"
                                                                              />
                                                                        </th>
                                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs text-nowrap whitespace-nowrap p-4">
                                                                              {item?.name
                                                                                    ? item?.name.split(" ").slice(0, 5).join(" ")
                                                                                    : "empty"}
                                                                        </td>
                                                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                              {item?.price ? item?.price : 0}
                                                                        </td>
                                                                  </tr>
                                                            ))}
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>
                  </section>
            </div>
      );
};
function StatItem({ label, value }) {
      return (
        <div className="space-y-1">
          <p className="text-xs font-medium text-white/70">{label}</p>
          <p className="text-xl font-bold text-white tabular-nums">{value}</p>
        </div>
      )
    }
export default Starts;
