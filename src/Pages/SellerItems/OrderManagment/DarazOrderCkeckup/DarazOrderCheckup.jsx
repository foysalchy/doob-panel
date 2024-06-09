import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";


const DarazOrderCheckup = () => {
  const { id } = useParams();
  const { shopInfo } = useContext(AuthContext);



  const { data: darazData = [], refetch: reload } = useQuery({
    queryKey: ["darazData"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/daraz-order?id=${shopInfo._id}&status=All`
      );
      const data = await res.json();
      return data.data;
    },
  });




  const findData = darazData?.orders?.find((itm) => itm?.order_number == id);
  const billingAddress = findData?.address_billing;
  const shippingAddress = findData?.address_shipping;



  const { data: darazSingleOrderProduct = [], refetch, isLoading } = useQuery({
    queryKey: ["darazSingleOrderProduct"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/daraz-single-order?id=${shopInfo._id}&orderId=${findData?.order_number}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  useEffect(() => {
    refetch();
    reload()
  }, [id, findData]);

  return (
    <div>
      {!isLoading ? <div className="bg-gray-50">
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

              </tr>
            </thead>
            <tbody>
              {!isLoading ? darazSingleOrderProduct?.map((itm) => (
                <tr key={itm?._id} className="border-b">
                  <td className="whitespace-nowrap flex items-center justify-center border-r text-2xl p-2">
                    <img src={itm?.product_main_image} alt="" className="w-16 object-cover h-16 rounded" />
                  </td>
                  <td className="whitespace-wrap w-[280px] border-r text-md font-[400] text-gray-800 px-4">
                    {itm?.name}
                  </td>
                  <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                    {itm?.paid_price}
                  </td>
                  <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                    {itm?.sku}
                  </td>
                  <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                    {itm?.quantity ? itm?.quantity : 1}
                  </td>
                  <td className="whitespace-nowrap border-r text-md font-[400] text-gray-800 px-4">
                    {itm?.status}
                  </td>

                </tr>
              )) : <div>
                <h1>Data loading  Please wait</h1>
              </div>}
            </tbody>
          </table>
        </div>
      </div> : <div className="text-center text-3xl">Data loading  Please wait</div>}
    </div>
  );
};

export default DarazOrderCheckup;
