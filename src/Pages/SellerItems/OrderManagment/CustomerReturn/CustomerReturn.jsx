import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const CustomerReturn = () => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("hello world");
  const { data: tData = [], refetch } = useQuery({
    queryKey: ["sellerOrder"],
    queryFn: async () => {
      const res = await fetch(
        `https://salenow-v2-backend.vercel.app/api/v1/seller/order?shopId=${shopInfo._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  const TableData = tData.filter((data) => data.status === "Return");

  return (
    <div>
      <div className="mb-4 mt-4 rounded-md flex items-center  border-gray-400 focus:outline-none overflow-hidden  w-full  border">
        <input
          placeholder="Search..."
          className="w-full p-2 focus:outline-none"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <BiSearch className="mr-2 text-xl text-gray-400" />
      </div>
      <div className="overflow-hidden">
        <table className="min-w-full  bg-white border text-center text-sm font-light">
          <thead className="border-b  font-medium  ">
            <tr>
              <th scope="col" className="border-r px-2 py-4 font-[500]"></th>
              <th scope="col" className="border-r px-2 py-4 font-[500]"></th>
              <th scope="col" className="border-r px-2 py-4 font-[500]">
                Document
              </th>
              <th scope="col" className="border-r px-2 py-4 font-[500]">
                Order No.
              </th>
              <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                Order Date
              </th>
              <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                Pending Since
              </th>
              <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                Payment Method
              </th>
              <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                Retail Price
              </th>
              <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                Status
              </th>
              <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {TableData.map((data, i) => (
              <tr className="border-b ">
                <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                  #{i + 1}
                </td>
                <td className="whitespace-nowrap border-r text-2xl">t11111</td>
                <td className="whitespace-nowrap border-r px-6 py-4 ">
                  t22222222
                </td>
                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                  t33333333
                </td>
                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                  t444444
                </td>
                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                  t5555555
                </td>
                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                  t666666
                </td>
                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                  t777777
                </td>
                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
                  t88888888
                </td>
                <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                  <button
                    onClick={() => setOpen(!open)}
                    className="border border-gray-900 px-4 py-1 rounded"
                  >
                    Approve
                  </button>
                  {/* approve modal */}
                  {open && (
                    <div className="fixed top-0 left-0 w-screen h-screen bg-[#000000d9] flex items-center justify-center z-[1000]">
                      <div className="bg-white md:w-[500px] p-4 rounded-md">
                        <button
                          onClick={() => setOpen(!open)}
                          className="float-right p-2 text-lg"
                        >
                          x
                        </button>
                        hello world
                      </div>
                    </div>
                  )}
                  <button className="border border-gray-900 px-4 py-1 rounded">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerReturn;
