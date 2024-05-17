import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import EditSUbCategoryModal from "./EditSUbCategoryModal";

const SubCategoryManagement = () => {
  const { data: subCategory = [], refetch } = useQuery({
    queryKey: ["subCategory"],
    queryFn: async () => {
      const res = await fetch(
        "https://backend.doob.com.bd/api/v1/admin/category/subcategories"
      );
      const data = await res.json();
      return data.rows;
    },
  });

  // status update
  const statusUpdate = (id, status) => {
    fetch(
      `https://backend.doob.com.bd/api/v1/admin/category/subcategory?id=${id}&status=${status}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "status update");
        Swal.fire(" Status Updated", "", "success");
        refetch();
      });
  };



  const [editOn, setEditOn] = useState(false);

  const uploadImage = async (formData) => {
    const url = `https://backend.doob.com.bd/api/v1/image/upload-image`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const imageData = await response.json();
    return imageData.imageUrl;
  };



  return (
    <div>
      <Link to={"add"}>
        <div className=" gap-2">
          {/* <input
            value={"Upload"}
            type="submit"
            className=" bg-black text-white border-gray-300 w-[100px] mt-6 duration-200 hover:shadow-lg p-2 rounded-lg mb-2"
          /> */}
          <button
            type="submit"
            className="group mt-4 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
          >
            <span className="absolute -start-full transition-all group-hover:start-4">
              <FaLongArrowAltRight />
            </span>
            <span className="text-sm font-medium transition-all group-hover:ms-4">
              Add Sub Category
            </span>
          </button>
        </div>
      </Link>

      <div className="max-w-screen-xl mx-auto ">
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Photo</th>
                <th className="py-3 px-6">Sub Category Name</th>
                <th className="py-3 px-6">Mega Category Id</th>
                <th className="py-3 px-6">Mega Category Name</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {subCategory.map((item, idx) => {
                // const formattedTimeStamp = new Date(item.timeStamp * 1000).toLocaleString();
                return (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={item?.img}
                        alt=""
                        className="ring-1 ring-gray-400 w-[60px] object-cover h-[60px] rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.subCategory}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.megaCategoryId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.megaCategoryName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status == "true" ? (
                        <button
                          onClick={() => statusUpdate(item?._id, false)}
                          className=""
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          onClick={() => statusUpdate(item?._id, true)}
                          className=""
                        >
                          Deactivate
                        </button>
                      )}

                      <button
                        onClick={() => setEditOn(item)}
                        className="text-xl p-1 ml-6"
                      >
                        <BiEdit />
                      </button>
                    </td>
                    {editOn && (
                      <EditSUbCategoryModal
                        editOn={editOn}
                        item={item}
                        setEditOn={setEditOn}
                        refetch={refetch}
                      ></EditSUbCategoryModal>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryManagement;
