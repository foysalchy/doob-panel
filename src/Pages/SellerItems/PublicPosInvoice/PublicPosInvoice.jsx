import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

export default function PublicPosInvoice() {
  const { id } = useParams();
  console.log("🚀 ~ file: PublicPosInvoice ~ id:", id);

  const { data: invoiceItemData = {} } = useQuery({
    queryKey: ["invoiceItemData"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/pos-report/${id}`
      );
      const data = await res.json();
      return data?.data;
    },
  });

  //   console.log(invoiceItemData);
  return (
    <div className="min-h-[70vh] text-center max-w-[60%] mx-auto my-auto">
      {" "}
      <ul className="">
        <li className="py-2 border-b border-gray-700">
          <div className="flex justify-between">
            <h2 className="text-sm font-semibold">Product Name</h2>
            <h2 className="text-sm font-semibold">Price</h2>
          </div>
        </li>
        {invoiceItemData?.items?.map((itm, index) => (
          <li key={index} className="py-2 border-b border-gray-700">
            <div className="flex justify-between items-start">
              <span>{`(${index + 1})`}</span>
              <h2 className="w-[150px] text-sm">{itm?.name}</h2>
              <div className="">
                <h2 className="text-sm">৳ {itm?.price}</h2>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ul className="mt-4">
        <li className="py-2 border-b border-gray-700">
          <div className="flex justify-between">
            <h2 className="text-sm font-semibold">Total:</h2>
            <h2 className="text-sm">৳ {invoiceItemData?.invoice?.total}</h2>
          </div>
        </li>
        <li className="py-2 border-b border-gray-700">
          <div className="flex justify-between">
            <h2 className="text-sm font-semibold">Pay Amount:</h2>
            <h2 className="text-sm">৳ {invoiceItemData?.invoice?.cash}</h2>
          </div>
        </li>
        <li className="py-2 border-b border-gray-700">
          <div className="flex justify-between">
            <h2 className="text-sm font-semibold">Payment Getaway:</h2>
            <h2 className="text-sm">{invoiceItemData?.invoice?.getaway}</h2>
          </div>
        </li>
      </ul>
      <div className="flex justify-between mt-4">
        <h2 className="text-sm font-semibold">Change:</h2>
        <h2 className="text-sm">৳ {invoiceItemData?.invoice?.change}</h2>
      </div>
    </div>
  );
}
