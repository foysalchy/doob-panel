import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";

import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

import EditPackage from "./EditPackage";

const AllPackage = () => {
  const [loading, setLoading] = useState(false);
  const { data: packages = [], refetch } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/admin/package`
        // "https://backend.doob.com.bd/api/v1/admin/pricing"
      );
      const data = await res.json();
      return data;
    },
  });

  const publishHandle = (id) => {
    setLoading(true);

    fetch(`https://backend.doob.com.bd/api/v1/admin/pricing/status/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("success", "Your Package Publish Successfully", "success");
        refetch();
      });
  };

  const unpublishHandle = (id) => {
    fetch(`https://backend.doob.com.bd/api/v1/admin/pricing/unstatus/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("success", "Your Package Publish Successfully", "success");
        refetch();
      });
  };
  const DeletePackage = (id) => {
    fetch(`https://backend.doob.com.bd/api/v1/admin/package/delete/${id}`, {
      method: "Delete",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("success", "Your Package Delete Successfully", "success");
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
                  Slot 1
                </th>

                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                  Slot 2
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                  Slot 3
                </th>

                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {packages.length &&
                packages?.map((pack) => (
                  <tr key={pack?._id}>
                    {console.log(pack)}
                    <td className="px-4 py-3">{pack?.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <div> To: {pack?.slotOne.to}</div>
                        <div> Fee:  {pack?.slotOne.price}</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <div>  To:  {pack?.slotTwo.to}</div>
                        <div>  Fee:  {pack?.slotTwo.price}</div>
                      </div>
                    </td>

                    <td>
                      <div className="flex flex-col">
                        <div>To: {pack?.slotThree.to}</div>
                        <div> Fee: {pack?.slotThree.price}</div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-xl flex gap-4 items-center text-gray-900">
                      <MdDelete
                        onClick={() => DeletePackage(pack?._id)}
                        className="text-red-500 cursor-pointer"
                      />
                      <BiEdit
                        className="text-yellow-500 cursor-pointer"
                        onClick={() => handleViewDetails(pack?._id)}
                      />
                    </td>

                    {OpenModal === pack?._id && (
                      <div className="h-0 w-0">
                        <EditPackage
                          OpenModal={OpenModal}
                          refetch={refetch}
                          setOpenModal={setOpenModal}
                          packageInfo={pack}
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
