import React, { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../AuthProvider/UserProvider";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const WooInvoice = () => {
      const { id, shop_id } = useParams();


      const { data: shopInfo = {} } = useQuery({
            queryKey: ["shopInfo"],
            queryFn: async () => {
                  const response = await fetch(
                        `https://doob.dev/api/v1/admin/seller-info?id=${shop_id}`
                  );
                  const result = await response.json();
                  return result
            },
      });





      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });


      const { data: orderInfo = {}, isFetching, isError, error, refetch, isLoading } = useQuery({
            queryKey: ["sellerWooOrderAll", { shop_id, id }],
            queryFn: async () => {

                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/woo-commerce-order-item?shopId=${shop_id}&orderId=${id}`
                  );
                  const data = await res.json();
                  return data;

            },
      });







      const totalPrice = orderInfo?.productList?.reduce(
            (total, item) => total + item?.price * item?.quantity,
            0
      );

      const formattedDate = (date) =>
            new Date(date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
            });


      const InvoiceHeader = () => (
            <header className="flex items-start justify-between">
                  <img src={shopInfo?.logo} alt="Shop Logo" className="w-52" />
                  <div className="text-right">
                        <p className="font-bold">{shopInfo?.shopName}</p>
                        <p>{shopInfo?.shopEmail}</p>
                        <p>{shopInfo?.shopNumber}</p>
                        <p>{shopInfo?.address}</p>
                  </div>
            </header>
      );

      const InvoiceAddress = () => (
            <div className="flex justify-between mt-6">
                  <div>
                        <p>
                              <strong>Name:</strong> {orderInfo?.billing?.first_name} {orderInfo?.billing?.last_name}
                        </p>
                        <p>
                              <strong>Phone:</strong> {orderInfo?.billing?.phone}
                        </p>
                        <p>
                              <strong>Order No:</strong> {orderInfo?.
                                    number}
                        </p>
                        <p className="w-80">
                              <strong>Address:</strong>{" "}
                              {`${orderInfo?.billing?.address_1},`}
                        </p>
                  </div>
                  <div>
                        <p>
                              <strong>Invoice No:</strong> {orderInfo?.id}
                        </p>
                        <p>
                              <strong>Invoice Date:</strong> {formattedDate(new Date())}
                        </p>
                        <p>
                              <strong>Payment Date:</strong> {formattedDate(orderInfo?.date_paid)}
                        </p>
                        <p>
                              <strong>Order Date:</strong> {formattedDate(orderInfo?.date_completed)}
                        </p>
                        <p>
                              <strong>Payment Method:</strong> {orderInfo?.payment_method_title || "N/A"}
                        </p>
                  </div>
            </div>
      );

      const InvoiceProducts = () => (
            <table className="w-full mt-8 border-collapse border border-gray-800">
                  <thead>
                        <tr className="bg-gray-900 text-white">
                              <th className="border border-gray-800 px-4 py-2">Photo</th>
                              <th className="border border-gray-800 px-4 py-2">Name</th>
                              <th className="border border-gray-800 px-4 py-2">Quantity</th>
                              <th className="border border-gray-800 px-4 py-2">Price</th>
                        </tr>
                  </thead>
                  <tbody>
                        {orderInfo?.line_items?.map((item) => (
                              <tr key={item._id} className="text-gray-700">
                                    <td className="border border-gray-800 px-4 py-2">
                                          <img
                                                src={item?.image?.src || ""}
                                                alt={item?.name}
                                                className="w-12 h-12 object-cover rounded bg-gray-200"
                                          />
                                    </td>
                                    <td className="border border-gray-800 px-4 py-2">
                                          {item?.productName}
                                          <p className="text-green-700">Color: {item?.name}</p>
                                          {item?.size && <p className="text-red-700">Size: {item?.size}</p>}
                                    </td>
                                    <td className="border border-gray-800 px-4 py-2 text-center">
                                          {item?.quantity || 0}
                                    </td>
                                    <td className="border border-gray-800 px-4 py-2 text-center">
                                          {item?.price || 0}
                                    </td>
                              </tr>
                        ))}
                  </tbody>
            </table>
      );

      const InvoiceFooter = () => (
            <div className="mt-8 flex justify-end">
                  <div>
                        <p className="text-right font-bold">
                              Shipping Charge: <span className="kalpurush">৳</span> {orderInfo?.shipping_total}
                        </p>
                        <p className="text-right font-bold">
                              Total: <span className="kalpurush">৳</span> {orderInfo?.total
                              }
                        </p>
                  </div>
            </div>
      );

      const InvoicePage = () => (
            <div ref={componentRef} className="p-8 bg-white">
                  <InvoiceHeader />
                  <div className="py-4 text-center font-bold bg-gray-200 text-gray-600">
                        SALES INVOICE
                  </div>
                  <InvoiceAddress />
                  <InvoiceProducts />
                  <InvoiceFooter />
            </div>
      );

      return (
            <div className="p-12 bg-gray-100">
                  {isLoading ? (
                        <h1>Loading...</h1>
                  ) : (
                        <>
                              <div className="flex gap-4">
                                    <button
                                          onClick={handlePrint}
                                          className="px-6 py-2 bg-blue-500 text-white rounded-md"
                                    >
                                          Print
                                    </button>
                                    <button
                                          onClick={() => window.history.back()}
                                          className="px-6 py-2 bg-red-500 text-white rounded-md"
                                    >
                                          Go Back
                                    </button>
                              </div>
                              <div className="flex justify-center mx-auto " style={{ width: "210mm", height: "297mm" }}>
                                    <InvoicePage />
                              </div>
                        </>
                  )}
            </div>
      );
};

export default WooInvoice;
