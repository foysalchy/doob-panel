import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import Select from "react-select";

const EditPackage = ({ OpenModal, setOpenModal, packageInfo, refetch }) => {
  console.log("packageInfo", packageInfo);

  const [loading, setIsLoading] = useState(false);
  // ! submit form
  const handlePackageUpdate = async (e) => {
    e.preventDefault();
    const packageName = e.target.packageName.value;
    const amount = e.target.amount.value;

    const data = {
      packageName,
      amount,
    };
    console.log(data, "data");
    setIsLoading(true);
    try {
      fetch(
        `https://backend.doob.com.bd/api/v1/admin/package/update-package/${packageInfo._id}`,
        // `https://backend.doob.com.bd/api/v1/admin/package/update-package/${packageInfo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          Swal.fire("Update Package Successful", "", "success");
          setIsLoading(false);
          refetch();
          setOpenModal(false);
        });
    } catch (error) {
      console.error("Error updating FAQ:", error);
    }
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90  px-4 text-start py-5 ${OpenModal ? "block" : "hidden"
        }`}
    >
      <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px] ">
        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border border-black-b">
          <div className="pb-2 text-xl font-bold text-dark text-center sm:text-2xl">
            Update Package
          </div>
          <div
            onClick={() => setOpenModal(!OpenModal)}
            className="cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500"
          >
            <RxCross2 className="text-xl" />
          </div>
        </div>

        <form className="h-[500px] text-start" onSubmit={handlePackageUpdate}>
          <label
            htmlFor="packageName"
            className="inline-block text-start mb-1 font-medium mt-5"
          >
            Package Name
          </label>
          <input
            placeholder="Package Name"
            required
            type="text"
            defaultValue={packageInfo?.packageName}
            name="packageName"
            //   value={formData.name}
            // onChange={(e) => handleInputChange("packageName", e.target.value)}
            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
          />
          <label
            htmlFor="amount"
            className="inline-block text-start mb-1 font-medium mt-5"
          >
            Package Amount
          </label>
          <input
            placeholder="Package Amount"
            type="number"
            name="amount"
            defaultValue={packageInfo?.amount}
            // value={formData.tagname}
            // onChange={(e) => handleInputChange("amount", e.target.value)}
            className="flex-grow w-full h-12 px-4 mb-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
          />

          <div className="flex justify-start">
            <button
              type="submit"
              className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500 mt-4"
            >
              <span className="absolute -start-full transition-all group-hover:start-4">
                <svg
                  className="h-5 w-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <span
                className={`"text-sm ${loading && "animate-pulse"
                  } font-medium transition-all group-hover:ms-4"`}
              >
                Update Package
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPackage;
