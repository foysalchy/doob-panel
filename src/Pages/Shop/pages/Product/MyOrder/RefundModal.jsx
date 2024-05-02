import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { CgClose } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import { useEffect } from "react";

const RefundModal = ({ refundOpen, setRefundOpen, details }) => {
  const handleDownload = (url, fileName) => {
    console.log(url);
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create an anchor element
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;

        // Programmatically click the anchor element to trigger the download
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => console.error("Error downloading file:", error));
  };

  return (
    <div
      onClick={() => setRefundOpen(false)}
      className={`fixed z-[100] flex items-center justify-center ${
        refundOpen ? "visible opacity-100" : "invisible opacity-0"
      } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
    >
      <div
        onClick={(e_) => e_.stopPropagation()}
        className={`text- absolute max-w-lg min-w-[28rem] rounded-lg bg-white p-6 drop-shadow-lg dark:bg-gray-800 dark:text-white ${
          refundOpen
            ? "scale-1 opacity-1 duration-300"
            : "scale-0 opacity-0 duration-150"
        }`}
      >
        <h1 className="mb-2 text-2xl font-semibold">Refund History</h1>
        <p className="mb-5 text-sm opacity-80 capitalize">
          {details?.note ?? ""}
        </p>

        <div className="my-3">
          {details?.file ? (
            <button
              onClick={() => handleDownload(details?.file, "refund-order")}
            >
              <img src={details?.file} className="" alt="file" />
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => setRefundOpen(false)}
            className="me-2 rounded-md bg-indigo-600 hover:bg-indigo-700 px-6 py-[6px] text-white"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundModal;
