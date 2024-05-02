import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import StockEdit from "./StockEdit";
import BrightAlert from "bright-alert";
import StockInvoiceAdmin from "./StockInvoiceAdmin";

const StockManagement = () => {
  const [on, setOn] = useState(false);
  const [invoiceOn, setInvoiceOn] = useState(false);
  const { data: stockRequest = [], refetch } = useQuery({
    queryKey: ["stockRequest"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/admin/stock-request`
      );
      const data = await res.json();
      console.log(data, "data");
      return data?.data;
    },
  });

  console.log(stockRequest, "stockRequest");
  const handleUpdate = (data) => {
    console.log(data);

    // return;
    fetch(
      `https://backend.doob.com.bd/api/v1/admin/stock-request-update?productId=${data?.productId}&orderId=${data?._id}&quantity=${data?.quantity}&SKU=${data?.SKU}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "active" }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        BrightAlert("Update Quantity", "", "success");
        refetch();
      });
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredStockRequestData = searchQuery
    ? stockRequest.filter((item) =>
        item._id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : stockRequest;

  console.log(filteredStockRequestData, "filteredStockRequestData");

  return (
    <div>
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="relative my-4">
          <label htmlFor="Search" className="sr-only">
            {" "}
            Search{" "}
          </label>

          <input
            type="text"
            id="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for..."
            className="w-full rounded-md border px-4 border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
        <div className="overflow-hidden border border-gray-200 border-gray-700 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 divide-gray-700">
            <thead className="bg-gray-50 ">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  <div className="flex items-center gap-x-3">
                    <span>Ordered Id</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  <button className="flex items-center gap-x-2">
                    <span>Name</span>
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  <button className="flex items-center gap-x-2">
                    <span>Status</span>
                  </button>
                </th>

                <th
                  scope="col"
                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  Quantity
                </th>

                <th
                  scope="col"
                  className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  <button className="flex items-center gap-x-2">
                    <span>SKU</span>
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  <button className="flex items-center gap-x-2">
                    <span>Seller</span>
                  </button>
                </th>

                <th
                  scope="col"
                  className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  <button className="flex items-center gap-x-2">
                    <span>Warehouse</span>
                  </button>
                </th>

                {/* <th
                  scope="col"
                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {filteredStockRequestData?.map((itm, index) => (
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center gap-x-3">
                      <div className="w-5/12">
                        <h2
                          onClick={() => setInvoiceOn(itm)}
                          className="font-medium text-blue-500  "
                        >
                          {itm?._id}
                        </h2>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-wrap text-sm text-start w-[300px] border-r px-6 py-4 font-medium ">
                    {itm?.productInfo?.name}
                    <br />
                    <span className="text-xs text-gray-500"> {itm?.SKU}</span>
                  </td>
                  <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <button
                      disabled={itm.status == "active"}
                      // onClick={() => DeactiveHandle(faq?._id)}
                      onClick={() => handleUpdate(itm)}
                      className="inline-flex items-center px-3 py-1 rounded-full gap-x-2   text-green-500 text-sm flex items-center gap-2 bg-[#23b123ea] px-2 py-1 rounded text-white "
                    >
                      {itm?.status}
                    </button>
                  </td>

                  <td className="px-4 py-4 text-lg text-green-500 whitespace-nowrap">
                    <button className="text-sm flex items-center gap-2 bg-[#23b123ea] px-2 py-1 rounded text-white">
                      {itm?.quantity}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-lg text-green-500 whitespace-nowrap">
                    <button className="text-sm flex items-center gap-2 bg-[#23b123ea] px-2 py-1 rounded text-white">
                      {itm?.SKU}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-lg text-green-500 whitespace-nowrap">
                    <button className="text-sm flex items-center gap-2 bg-[#23b123ea] px-2 py-1 rounded text-white">
                      {itm?.shopName}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-lg text-green-500 whitespace-nowrap">
                    <button className="text-sm flex items-center gap-2 bg-[#23b123ea] px-2 py-1 rounded text-white">
                      {itm?.warehouse?.map((war) => {
                        if (war?.name) {
                          return <span>{war?.name}</span>;
                        }
                      })}
                    </button>
                  </td>
                  {/* {on._id=== itm?._id && <StockEdit setOn={setOn} itm={itm} />} */}

                  <td>
                    {invoiceOn?._id === itm?._id && (
                      <StockInvoiceAdmin setOn={setInvoiceOn} products={itm} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockManagement;
