import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const AddDepartment = ({ ModalOpen, setModalOpen }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    setLoading(true);

    fetch("https://salenow-v2-backend.vercel.app/api/v1/admin/department", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: departmentName }),
    })
      .then((res) => res.json())
      // do not need catch
      .then((data) => {
        if (data === true) {
          setDepartmentName("");
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Add Successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
          setModalOpen(!ModalOpen);
          // setModalOpen(!ModalOpen)
        } else {
          Swal.fire("This DepartmentName already used", "", "info");
        }
      });
  };

  return (
    <div className={ModalOpen ? "flex" : "hidden"}>
      <div className="container mx-auto py-20">
        <div
          className={`fixed  z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${
            ModalOpen ? "block" : "hidden"
          }`}
        >
          <div className="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px]">
            <h3 className="pb-2 text-xl font-bold text-dark sm:text-2xl">
              Add Department Name
            </h3>
            <span
              className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-yellow-300`}
            ></span>
            <div>
              <input
                id="name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Provide a departmentName name"
              />
            </div>

            <div className="flex flex-wrap -mx-3">
              <div className="w-1/2 px-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="block w-full rounded-lg border  p-3 text-center text-base border-red-500 font-medium text-black transition hover:border-red-600 hover:bg-red-600 "
                >
                  Cancel
                </button>
              </div>
              <div className="w-1/2 px-3">
                <button
                  onClick={() => handleUpload()}
                  disabled={departmentName === ""}
                  className={`block w-full p-3 text-base font-medium text-center text-white transition border rounded-lg border-primary bg-green-500 disabled:blur-sm hover:bg-opacity-90`}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;
