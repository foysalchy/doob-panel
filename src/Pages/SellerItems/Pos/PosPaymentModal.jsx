import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/UserProvider";

const PosPaymentModal = ({ isPreviewModal, setIsPreviewModal, setGetaway }) => {
  console.log(isPreviewModal, "warehouse_data");
  const { shopInfo } = useContext(AuthContext);
  const {
    data: getwayData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["getwayDataQUeyr"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/pos-payment?shopId=${shopInfo.shopId}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  console.log(getwayData, "warehouse_data");
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);

  console.log(selectedWarehouses);

  const handleSave = () => {
    // if (selectedWarehouses.length > 0) {
    //   const newSelectedWarehouses = selectedWarehouses.map(
    //     (warehouse) => warehouse.value
    //   );
    // const bodyData = {
    //   warehouseIds: newSelectedWarehouses,
    //   shopId: isPreviewModal.shopId,
    // };

    // console.log(newSelectedWarehouses, "newSelectedWarehouses");
    // }

    setGetaway(selectedWarehouses?.value);
    setIsPreviewModal(false);
  };

  const handleWarehouseChange = (selectedOptions) => {
    setSelectedWarehouses(selectedOptions);
  };

  console.log(getwayData);
  // console.log(getwayData[0].accountNumber);
  const warehouseOptions = getwayData?.map((warehouse) => ({
    value: `${warehouse?.mobileType ?? warehouse?.bankName}  ${
      warehouse?.mobileNumber ?? warehouse?.accountNumber
    }`,
    label: `${warehouse?.mobileType ?? warehouse?.bankName}  ${
      warehouse?.mobileNumber ?? warehouse?.accountNumber
    }`,
  }));
  console.log(warehouseOptions, "warehouseOptions");
  return (
    <div
      className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${
        isPreviewModal ? "block" : "hidden"
      }`}
    >
      <div className="w-full max-w-[90%] rounded-[20px] bg-white pb-10 text-center ">
        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] px-10">
          <div className="pb-2 text-xl font-bold text-white text-center sm:text-2xl">
            {isPreviewModal}
          </div>
          <div
            onClick={() => setIsPreviewModal(false)}
            className="cursor-pointer bg-gray-300 rounded-full mb-2 p-2 text-2xl hover:bg-gray-400"
          >
            <RxCross2 className="text-xl" />
          </div>
        </div>

        <div className="max-h-[100vh] px-10 text-start pt-10">
          {isPreviewModal}

          <div className="">
            <div className="">
              <label className="text-sm">Select Warehouse</label>
              <Select
                options={warehouseOptions}
                // isMulti
                onChange={handleWarehouseChange}
                value={selectedWarehouses}
                placeholder="Please select"
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          </div>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-9"
            onClick={handleSave}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PosPaymentModal;
