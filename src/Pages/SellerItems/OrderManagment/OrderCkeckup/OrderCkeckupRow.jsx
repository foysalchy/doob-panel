import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const OrderCkeckupRow = ({ itm, orderId }) => {
  // const [readyToShip, setReadyToShip] = useState(false)

  const statusUpdate = (orderId, productId, status) => {
    console.log(orderId, productId, status);

    fetch(
      `https://doob.dev/api/v1/seller/order-single-product-status-update?orderId=${orderId}&productId=${productId}&status=${status}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.error) {
          alert("Successfully Updated");
          refetch();
        } else {
          alert("Failed to Update");
        }
      });
  };

  const { data: Data = [], refetch } = useQuery({
    queryKey: ["sellerOrder"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/order?shopId=${shopInfo._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  return (
    <tr key={itm?._id} className="border-b">
      <td className="whitespace-nowrap flex items-center justify-center border-r text-2xl p-2">
        <img src={itm?.img} alt="" className="w-16 object-cover h-16 rounded" />
      </td>
      <td className="whitespace-wrap w-[280px] border-r text-md font-[400] text-gray-800 px-4">
        {itm?.productName}
        <p className="text-green-700">sku:  {itm?.variations.SKU}</p>
        <p className="text-green-700">colour:  {itm?.variations.name}</p>
        <p className="text-red-700"> size: {itm?.variations.size}</p>
      </td>
      <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
        {itm?.price}
      </td>
      <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
        {itm?.productId}
      </td>
      <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
        {itm?.quantity}
      </td>
      <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
        {itm?.status ? `${itm?.status}ed` : "Process"}
      </td>
      <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
        {/* {!readyToShip && ( */}
        {!itm?.status && (
          <div className="flex flex-col gap-2">
            <button
              className="text-blue-500"
              onClick={() => statusUpdate(orderId, itm._id, "Ready to ship")}
            >
              Ready to ship
            </button>
            <button
              className="text-blue-500"
              onClick={() => statusUpdate(orderId, itm._id, "Cancel")}
            >
              Cancel
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default OrderCkeckupRow;
