import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import AddMagaCategory from "./AddMagaCategory";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";

const ModalForCategory = ({ setOpenModal, OpenModal, data, refetch }) => {
  const { shopInfo } = useContext(AuthContext);

  const [darazCategory, setDarazCateory] = useState([]);
  console.log(darazCategory[0]);

  useEffect(() => {
    if (data === "Add Mega Category") {
      const fetchData = async () => {
        const res = await fetch(
          `https://backend.doob.com.bd/api/v1/daraz/category/${shopInfo._id}`
        );
        const data = await res.json();
        setDarazCateory(data);
      };

      fetchData();
    }
  }, [data, shopInfo._id]);

  return (
    <div
      className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${
        OpenModal ? "block" : "hidden"
      }`}
    >
      <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10  text-center ">
        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] px-10">
          <div className="pb-2 text-xl font-bold text-white text-center sm:text-2xl">
            {data}
          </div>
          <div
            onClick={() => setOpenModal(!OpenModal)}
            className="cursor-pointer bg-gray-300 rounded-full  mb-2 p-2 text-2xl hover:bg-gray-400"
          >
            <RxCross2 className="text-xl" />
          </div>
        </div>

        <div className="max-h-[700px] px-10 text-start overflow-y-scroll">
          {data == "Add Mega Category" && (
            <AddMagaCategory
              setOpenModal={setOpenModal}
              recall={refetch}
              OpenModal={OpenModal}
              darazData={darazCategory}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalForCategory;
