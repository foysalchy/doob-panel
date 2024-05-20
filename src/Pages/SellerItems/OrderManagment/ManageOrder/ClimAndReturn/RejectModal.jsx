import React, { useContext, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import useImageUpload from "../../../../../Hooks/UploadImage";
// import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";

export default function RejectModal({ ordersList, setReject, isReject }) {
  // for image

  const { shopInfo } = useContext(AuthContext);

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);
    const newImages = fileList.map((file) => ({
      file: file,
      url: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
  const { uploadImage } = useImageUpload();
  const statusOption = [
    {
      label: "Claim To Daraz",
      value: "claim_to_daraz",
    },
    {
      label: "Return To curiur",
      value: "return_to_curiur",
    },
    {
      label: "Approved",
      value: "approved",
    },
    {
      label: "decline",
      value: "decline",
    },
  ];

  const update_all_status_reject = () => {
    Swal.fire({
      title: "Do you want to reject All Order?",
      showCancelButton: true,
      confirmButtonText: "Reject",
      input: "textarea", // Add a textarea input
      inputPlaceholder: "Enter your rejection reason here", // Placeholder for the textarea
      inputAttributes: {
        // Optional attributes for the textarea
        maxLength: 100, // Set maximum length
      },
    }).then((result) => {
      const rejectNote = result.value; // Get the value entered in the textarea
      // Now you can use the rejection reason as needed
      //   console.log(rejectNote, item?._id);

      ordersList.forEach((order) => {
        console.log(order, "order");

        const rejectData = {
          status: "return",
          orderId: order?._id,
          rejectNote: rejectNote,
        };
        // console.log(rejectData);
        // return;
        fetch(
          `https://backend.doob.com.bd/api/v1/seller/order-quantity-update`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.success) {
              // productStatusUpdate("reject", order._id);
              fetch(
                `https://backend.doob.com.bd/api/v1/seller/order-status-update?orderId=${order?._id}&status=return`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ...rejectData,
                  }),
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  refetch();
                });
              refetch();
            } else {
              alert("Failed to Update");
            }
          });
      });
      // return;
    });
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${
        isReject ? "block" : "hidden"
      }`}
    >
      <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10  text-center ">
        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] px-10">
          <div className="pb-2 text-xl font-bold text-white text-center sm:text-2xl">
            {/* {data} */}
          </div>
          <div
            onClick={() => setReject(!isReject)}
            className="cursor-pointer bg-gray-300 rounded-full  mb-2 p-2 text-2xl hover:bg-gray-400"
          >
            <RxCross2 className="text-xl" />
          </div>
        </div>

        <div className="max-h-[700px] px-10 text-start overflow-y-scroll">
          <form action="">
            <div className="mt-10 text-black">
              <label className="text-sm">Select Status</label>
              <Select
                styles={{
                  control: (provided) => ({
                    ...provided,
                    cursor: "pointer",
                  }),
                  option: (provided) => ({
                    ...provided,
                    cursor: "pointer",
                  }),
                }}
                // className="text-black"
                name="warehouse"
                required
                options={statusOption}
                placeholder="Please select"
              />
            </div>

            <div className=" mt-4">
              <label className="text-sm">Add Node</label>
              <input
                required
                name="area"
                type="text"
                placeholder="Description"
                className="w-full p-2 border border-black rounded-md  text-gray-900"
              />
            </div>

            <div className="flex items-center justify-between mt-10">
              <button
                type="submit"
                className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <FaLongArrowAltRight />
                </span>
                <span className="text-sm font-medium transition-all group-hover:ms-4">
                  Update Reject
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
