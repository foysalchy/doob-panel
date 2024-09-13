import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
// import { AuthContext } from "../../../AuthProvider/UserProvider";
import showAlert from "../../../../Common/alert";

const ModalAdminStaffAccess = ({
  OpenModal,
  setOpenModal,
  refetch: refetchTicket,
}) => {
  //   console.log(OpenModal, "warehouse_data");
  const { user, shopInfo } = useContext(AuthContext);

  //   console.log(shopInfo);
  const {
    data: staffInfoData = [],
    refetch,
    isLoading: loadingStaff,
  } = useQuery({
    queryKey: ["staffInfoData"],
    queryFn: async () => {
      const res = await fetch(`https://doob.dev/api/v1/admin/staff-role`);
      const data = await res.json();
      localStorage.setItem("price", JSON.stringify(data));
      console.log(data);
      return data.users;
    },
  });

  //   console.log(staffInfoData);

  //   const { data: staffInfo = [] } = useQuery({
  //     queryKey: ["staffInfo"],
  //     queryFn: async () => {
  //       const res = await fetch(
  //         `https://doob.dev/api/v1/seller/all-staff?shopId=${user.shopId}`
  //       );
  //       const data = await res.json();
  //       localStorage.setItem("price", JSON.stringify(data?.data));
  //       return data;
  //     },
  //   });

  //   console.log(staffInfoData.length, staffInfoData, "warehouse_data");
  // const [selectedWarehouses, setSelectedWarehouses] = useState([]);

  const [selectedWarehouses, setSelectedWarehouses] = useState([]);
  //   console.log(selectedWarehouses);

  useEffect(() => {
    if (OpenModal?.staffPermission) {
      const emails = OpenModal?.staffPermission?.map(
        (permission) => permission.email
      );

      // Filter staffInfoData based on emails
      const filteredStaffInfoData = staffInfoData
        ?.filter((staff) => emails?.includes(staff?.email))
        ?.map((item) => ({
          value: item.email,
          label: item.email,
        }));

      setSelectedWarehouses(filteredStaffInfoData);
    }
  }, [staffInfoData]);

  //   const filteredDefaultData = staffInfoData
  //     ?.filter((staff) =>
  //       staff?.accessShop?.some((shop) => shop.shopId === "doob")
  //     )
  //     ?.map((staffM) => ({
  //       value: staffM.email,
  //       label: staffM.email,
  //     }));

  let filteredDefaultData = [];
  if (OpenModal?.staffPermission) {
    const emails = OpenModal?.staffPermission?.map(
      (permission) => permission.email
    );

    // Filter staffInfoData based on emails
    filteredDefaultData = staffInfoData
      ?.filter((staff) => emails.includes(staff.email))
      ?.map((item) => ({
        value: item.email,
        label: item.email,
      }));
  }

  //   console.log(filteredDefaultData?.length, filteredDefaultData);

  //   console.log(selectedWarehouses);
  const handleSave = () => {
    if (selectedWarehouses.length > 0) {
      const newSelectedWarehouses = selectedWarehouses?.map((staff) => {
        return {
          //   shopId: shopInfo?._id,
          email: staff?.value,
        };
      });
      const bodyData = {
        staffPermission: newSelectedWarehouses,
      };

      //   console.log(bodyData);

      //   return;

      // console.log(bodyData, "bodyData");
      // console.log(newSelectedWarehouses, "newSelectedWarehouses");
      try {
        fetch(`https://doob.dev/api/v1/admin/staff-access/${OpenModal?._id}`, {
          method: "PATCH",
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
              setOpenModal(false);
              refetchTicket();
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
  const StaffOptions = staffInfoData?.map((staff) => ({
    value: staff.email,
    label: staff.email,
  }));
  //   console.log(warehouseOptions, "warehouseOptions");
  return (
    <div
      className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${OpenModal ? "block" : "hidden"
        }`}
    >
      <div className="w-full max-w-[90%] rounded-[20px] bg-white pb-10 text-center ">
        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] px-10">
          <div className="pb-2 text-xl font-bold text-white text-center sm:text-2xl">
            {OpenModal.shopId}
          </div>
          <div
            onClick={() => setOpenModal(false)}
            className="cursor-pointer bg-gray-300 rounded-full mb-2 p-2 text-2xl hover:bg-gray-400"
          >
            <RxCross2 className="text-xl" />
          </div>
        </div>

        <div className="max-h-[100vh] px-10 text-start pt-10">
          {OpenModal.shopId}

          <div className="">
            <div className="">
              <label className="text-sm">Select Warehoues</label>
              <Select
                options={StaffOptions}
                isMulti
                onChange={handleWarehouseChange}
                defaultValue={filteredDefaultData}
                value={selectedWarehouses}
                isLoading={loadingStaff}
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

export default ModalAdminStaffAccess;
