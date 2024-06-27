import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import Swal from "sweetalert2";

const AccessWareShopModal = ({
  isPreviewModal,
  setIsPreviewModal,
  refetchWare,
}) => {
  console.log(isPreviewModal, "warehouse_data");

  const {
    data: adminWareHouse = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["warehouseAdmin"],
    queryFn: async () => {
      const res = await fetch("https://doob.dev/api/v1/admin/warehouse");
      const data = await res.json();
      return data;
    },
  });

  console.log(adminWareHouse.length, adminWareHouse, "warehouse_data");
  // const [selectedWarehouses, setSelectedWarehouses] = useState([]);

  
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);
  console.log(selectedWarehouses);

    useEffect(() => {
      const filteredDefaultData = adminWareHouse
        ?.filter((admin) =>
          admin?.accessShop?.some((shop) => shop.shopId === "doob")
        )
        ?.filter((warehouse) => warehouse.status)
        ?.map((warehouse) => ({
          value: warehouse._id,
          label: warehouse.name,
        }));

      setSelectedWarehouses(filteredDefaultData);
    }, [adminWareHouse]);

  const filteredDefaultData = adminWareHouse
    ?.filter((admin) =>
      admin?.accessShop?.some((shop) => shop.shopId === "doob")
    )
    ?.filter((warehouse) => warehouse.status) // Filter based on status
    ?.map((warehouse) => ({
      value: warehouse._id,
      label: warehouse.name,
    }));

  // console.log(filteredDefaultData?.length, filteredDefaultData);

  const handleSave = () => {
    if (selectedWarehouses.length > 0) {
      const newSelectedWarehouses = selectedWarehouses.map(
        (warehouse) => warehouse.value
      );
      const bodyData = {
        warehouseIds: newSelectedWarehouses,
        shopId: isPreviewModal.shopId,
      };

      // console.log(bodyData, "bodyData");
      // console.log(newSelectedWarehouses, "newSelectedWarehouses");
      try {
        fetch(`http://localhost:5001/api/v1/admin/warehouse/access-warehouse`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("🚀 data:", data);
            if (data?.status) {
              Swal.fire(data?.message ?? "Added", "", "success");
              refetch();
              setIsPreviewModal(false);
              refetchWare();
            }
          });
      } catch (error) {
        console.error("Error add accessShop:", error);
      }
    }
  };

  const handleWarehouseChange = (selectedOptions) => {
    setSelectedWarehouses(selectedOptions);
  };
  const warehouseOptions = adminWareHouse
    ?.filter((warehouse) => warehouse.status) // Filter based on status
    ?.map((warehouse) => ({
      value: warehouse._id,
      label: warehouse.name,
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
            {isPreviewModal.shopId}
          </div>
          <div
            onClick={() => setIsPreviewModal(false)}
            className="cursor-pointer bg-gray-300 rounded-full mb-2 p-2 text-2xl hover:bg-gray-400"
          >
            <RxCross2 className="text-xl" />
          </div>
        </div>

        <div className="max-h-[100vh] px-10 text-start pt-10">
          {isPreviewModal.shopId}

          <div className="">
            <div className="">
              <label className="text-sm">Select Warehoues</label>
              <Select
                options={warehouseOptions}
                isMulti
                onChange={handleWarehouseChange}
                defaultValue={filteredDefaultData}
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
            Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessWareShopModal;
