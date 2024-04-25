import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import DarazOrderCkeckupRow from "./DarazOrderCkeckupRow";

const DarazOrderCheckup = () => {
  const { id } = useParams();
  const { shopInfo } = useContext(AuthContext);
  // const [darazData, setDarazData] = useState([])
  const [darazProduct, setDarazProduct] = useState([]);

  const { data: darazData = [], refetch: reload } = useQuery({
    queryKey: ["darazData"],
    queryFn: async () => {
      const res = await fetch(
        `https://salenow-v2-backend.vercel.app/api/v1/seller/daraz-order?id=${shopInfo._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  const findData = darazData?.orders?.find((itm) => itm?.order_number == id);
  const billingAddress = findData?.address_billing;
  const shippingAddress = findData?.address_shipping;

  // useEffect(() => {
  //     fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/daraz-single-order?id=${shopInfo._id}&orderId=${findData?.order_number}`)
  //         .then(res => res.json())
  //         .then(data => console.log(data, 'productssssssssssssssssss'))
  // }, []);

  const { data: darazSingleOrderProduct = [], refetch } = useQuery({
    queryKey: ["darazSingleOrderProduct"],
    queryFn: async () => {
      const res = await fetch(
        `https://salenow-v2-backend.vercel.app/api/v1/seller/daraz-single-order?id=${shopInfo._id}&orderId=${findData?.order_number}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  return (
    <div className="bg-gray-50">
      <div className=" p-2 grid grid-cols-3">
        <div className="">
          <div className=" p-3 rounded-lg">
            <h3 className="font-bold text-black pb-2">Customer Information</h3>{" "}
            <hr />
            <ul className="text-gray-600 mt-3">
              <li>
                <span className="font-semibold flex items-center gap-2">
                  Name :{" "}
                  <div className="font-[400]">
                    {findData?.customer_first_name}{" "}
                    {findData?.customer_last_name}
                  </div>
                </span>
              </li>
              {/* <li>
                                <span className="font-semibold flex items-center gap-2">Phone : </span>
                            </li> */}
              <li>
                <span className="font-semibold flex items-center gap-2">
                  Date :<div className="font-[400]">{findData?.created_at}</div>
                </span>
              </li>
              <li>
                <span className="font-semibold flex items-center gap-2">
                  Payment Method :
                  <div className="font-[400]">{findData?.payment_method}</div>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="">
          <div className=" p-3 rounded-lg">
            <h3 className="font-semibold text-black pb-2">Billing Address</h3>{" "}
            <hr />
            <ul className="text-gray-600 mt-3">
              <li>
                <div className="font-[400]">
                  {billingAddress?.first_name} {billingAddress?.last_name}
                </div>
              </li>
              <li>
                <div className="font-[400]">{billingAddress?.phone}</div>
              </li>
              <li>
                <div className="font-[500] text-black mt-2 border-b pb-3">
                  Address
                </div>
              </li>
              <li>
                <div className="font-[400]">{billingAddress?.address1}</div>
              </li>
              <li>
                <div className="font-[400]">{billingAddress?.address2}</div>
              </li>
              <li>
                <div className="font-[400]">{billingAddress?.address3}</div>
              </li>
              <li>
                <div className="font-[400]">
                  {billingAddress?.address4address4}
                </div>
              </li>
              <li>
                <div className="font-[400]">{billingAddress?.address5}</div>
              </li>{" "}
              <li>
                <div className="font-[400]">{billingAddress?.country}</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="">
          <div className=" p-3 rounded-lg">
            <h3 className="font-semibold text-black pb-2">Shipping Address</h3>{" "}
            <hr />
            <ul className="text-gray-600 mt-3">
              <li>
                <div className="font-[400]">
                  {shippingAddress?.first_name} {shippingAddress?.last_name}
                </div>
              </li>
              <li>
                <div className="font-[400]">{shippingAddress?.phone}</div>
              </li>
              <li>
                <div className="font-[500] text-black mt-2 border-b pb-3">
                  Address
                </div>
              </li>
              <li>
                <div className="font-[400]">{shippingAddress?.address1}</div>
              </li>
              <li>
                <div className="font-[400]">{shippingAddress?.address2}</div>
              </li>
              <li>
                <div className="font-[400]">{shippingAddress?.address3}</div>
              </li>
              <li>
                <div className="font-[400]">
                  {shippingAddress?.address4address4}
                </div>
              </li>
              <li>
                <div className="font-[400]">{shippingAddress?.address5}</div>
              </li>{" "}
              <li>
                <div className="font-[400]">{shippingAddress?.country}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ? products */}
      <div className="p-2 mt-8">
        <h2 className="text-lg pb-2">Products</h2>
        <table className="w-full  bg-white border text-center text-sm font-light ">
          <thead className="border-b  font-medium  overflow-y-scroll">
            <tr className="font-bold">
              <th scope="col" className="border-r px-2 py-4 font-[500]">
                Image
              </th>
              <th scope="col" className="border-r px-2 py-4 font-[500]">
                Name
              </th>
              <th scope="col" className="border-r px-2 py-4 font-[500]">
                Price
              </th>
              <th scope="col" className="border-r px-2 py-4 font-[500]">
                SKU
              </th>
              <th scope="col" className="border-r px-2 py-4 font-[500]">
                quantity
              </th>
              <th scope="col" className="border-r px-2 py-4 font-[500]">
                Status
              </th>
              <th scope="col" className="border-r px-2 py-4 font-[500]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {darazSingleOrderProduct?.map((itm) => (
              <DarazOrderCkeckupRow key={itm?._id} itm={itm} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DarazOrderCheckup;
