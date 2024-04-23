import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { BiEdit, BiEditAlt } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import EditPrice from "./EditPrice";

const AllPackage = () => {
  const [loading, setLoading] = useState(false);
  const { data: prices = [], refetch } = useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5001/api/v1/admin/package`
        // "https://salenow-v2-backend.vercel.app/api/v1/admin/pricing"
      );
      const data = await res.json();
      return data;
    },
  });

  const publishHandle = (id) => {
    setLoading(true);

    fetch(
      `https://salenow-v2-backend.vercel.app/api/v1/admin/pricing/status/${id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("success", "Your Price Publish Successfully", "success");
        refetch();
      });
  };

  const unpublishHandle = (id) => {
    fetch(
      `https://salenow-v2-backend.vercel.app/api/v1/admin/pricing/unstatus/${id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("success", "Your Price Publish Successfully", "success");
        refetch();
      });
  };
  const DeletePrice = (id) => {
    fetch(
      `https://salenow-v2-backend.vercel.app/api/v1/admin/pricing/delete/${id}`,
      {
        method: "Delete",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("success", "Your Price Delete Successfully", "success");
        refetch();
      });
  };

  const [OpenModal, setOpenModal] = useState(false);

  const handleViewDetails = (ticketId) => {
    setOpenModal(ticketId);
  };

  return (
    <div>
      <>
        <div className="mt-4 lg:pr-10 ">
          <table className="w-full overflow-x-scroll text-left whitespace-no-wrap">
            <thead>
              <tr className="bg-gray-800 rounded-t">
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm  rounded-tl rounded-bl">
                  Package Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                  Package AMount
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                  Status
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {prices.length &&
                prices?.map((price) => (
                  <tr key={price?.name}>
                    <td className="px-4 py-3">{price?.packageName}</td>
                    <td className="px-4 py-3">{price?.amount}</td>
                    <td className="px-4 py-3">
                      {!price?.status ? (
                        <button
                          onClick={() => publishHandle(price?._id)}
                          className="inline-flex items-center justify-center py-1 px-4 bg-red-500 rounded shadow-md hover:bg-red-700 focus:shadow-outline focus:outline-none"
                        >
                          Publish
                        </button>
                      ) : (
                        <button
                          onClick={() => unpublishHandle(price?._id)}
                          className="inline-flex items-center justify-center py-1 px-4 bg-green-500 rounded shadow-md hover:bg-green-700 focus:shadow-outline focus:outline-none"
                        >
                          Un Publish
                        </button>
                      )}{" "}
                    </td>
                    <td className="px-4 py-3 text-xl flex gap-2 items-center text-gray-900">
                      <MdDelete
                        onClick={() => DeletePrice(price?._id)}
                        className="text-red-500 cursor-pointer"
                      />
                      <BiEdit
                        className="text-yellow-500 cursor-pointer"
                        onClick={() => handleViewDetails(price?._id)}
                      />
                    </td>

                    {OpenModal === price?._id && (
                      <div className="h-0 w-0">
                        <EditPrice
                          OpenModal={OpenModal}
                          refetch={refetch}
                          setOpenModal={setOpenModal}
                          FAQInfo={price}
                        />
                      </div>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default AllPackage;
