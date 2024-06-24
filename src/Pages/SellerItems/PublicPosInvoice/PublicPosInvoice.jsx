import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import LoaderData from "../../../Common/LoaderData";

export default function PublicPosInvoice() {
  const { id } = useParams();
  console.log("🚀 ~ file: PublicPosInvoice ~ id:", id);

  const { data: invoiceItemData = {}, isLoading: loadingInvoice } = useQuery({
    queryKey: ["invoiceItemData"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/pos-report/${id}`
      );
      const data = await res.json();
      return data?.data;
    },
  });

  console.log(invoiceItemData);
  if (loadingInvoice) {
    return (
      <div>
        <LoaderData />
        <h1 className="text-3xl min-h-[40vh]  text-center mt-9 ">
          Loading Invoice Data ...
        </h1>
      </div>
    );
  }
  return (
    <div className="min-h-[70vh] text-center max-w-[60%] mx-auto my-auto pt-5 lg:pt-9">
      {" "}
      <ul className="">
        <li className="py-2 border-b border-gray-700">
          <div className="flex justify-between">
            <h2 className="text-sm font-semibold">Product Name</h2>
            <h2 className="text-sm font-semibold">Price</h2>
          </div>
        </li>
        {invoiceItemData?.invoice?.items?.map((itm, index) => (
          <li key={index} className="py-2 border-b border-gray-700">
            <div className="flex justify-between items-start">
              <div className="flex gap-2 ">
                {" "}
                <span>{`(${index + 1})`}</span>
                <h2 className="w-[150px] text-sm">{itm?.name?.slice(0, 64)}</h2>
                <img
                  src={itm?.img}
                  className="h-[64px] w-[70px] rounded"
                  alt=""
                />
              </div>
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
            <h2 className="text-sm font-semibold">Discount:</h2>
            <h2 className="text-sm">৳ {invoiceItemData?.invoice?.discount}</h2>
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
