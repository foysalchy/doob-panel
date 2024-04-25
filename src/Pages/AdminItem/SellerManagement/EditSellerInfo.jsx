import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const EditSellerInfo = ({ OpenModal, setOpenModal, SellerInfo, refetch }) => {
  console.log(SellerInfo);

  const handleBlogUpdate = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const userId = e.target.userId.value;
    const email = e.target.email.value;
    const sellerNewInfo = {
      name: name,
      userId: userId,
      email: email,
    };

    try {
      fetch(
        `https://backend.doob.com.bd/api/v1/admin/seller/update-sellerinfo/${SellerInfo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sellerNewInfo),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          Swal.fire("Update Blog Successful", "", "success");
          refetch();
          setOpenModal(false);
        });
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${
        OpenModal ? "block" : "hidden"
      }`}
    >
      <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px]">
        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border-b">
          <div className="pb-2 text-xl font-bold text-dark text-center sm:text-2xl">
            Edit Seller Info
          </div>
          <div
            onClick={() => setOpenModal(!OpenModal)}
            className="cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500"
          >
            <RxCross2 className="text-xl" />
          </div>
        </div>

        <form className=" overflow-y-scroll" onSubmit={handleBlogUpdate}>
          <input
            name="name"
            className="w-full p-2 my-4 border border-black"
            defaultValue={SellerInfo.name}
          />
          <input
            name="email"
            className="w-full p-2 my-4 border border-black"
            defaultValue={SellerInfo.email}
          />
          <input
            name="userId"
            className="w-full p-2 my-4 border border-black"
            defaultValue={SellerInfo.userId}
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
              <span className="text-sm font-medium transition-all group-hover:ms-4">
                Update Seller Info
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSellerInfo;
