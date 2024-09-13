import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Select from "react-select";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useContext } from "react";
import showAlert from "../../../../Common/alert";

const AddRackModal = ({
      setNewData,
      recall,
      setOpenModal,
      preSelectWarehouse,
      setWareHouses,
      next,
      setNext,
}) => {
      const [nextStae, setNextState] = useState(false);
      const { shopInfo } = useContext(AuthContext);
      const { data: warehouses = [], refetch } = useQuery({
            queryKey: ["salerWarehouse"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/warehouse"
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const filteredWarehouses =
            warehouses.length &&
            warehouses?.filter((warehouse) => warehouse?.status === true);
      const sortedWarehouses =
            filteredWarehouses &&
            filteredWarehouses.sort((a, b) => a?.name?.localeCompare(b.name));
      console.log(sortedWarehouses, "riks");
      const warehouseOptions =
            sortedWarehouses &&
            sortedWarehouses
                  .filter((rack) => rack?.status)
                  .map((warehouse) => ({
                        value: warehouse.name,
                        label: warehouse.name,
                  }));

      const [areas, setAreas] = useState([]);
      console.log(next, "next");

      const handleWarehouseChange = async (selectedOption) => {
            const selectedWarehouse = selectedOption.value;
            console.log(`https://doob.dev/api/v1/admin/warehouse/area/${selectedWarehouse}`, selectedWarehouse, '***');

            const res = await fetch(
                  `https://doob.dev/api/v1/admin/warehouse/area/${selectedWarehouse}`
            );
            const data = await res.json();
            setAreas(data);
      };

      const UploadArea = (e) => {
            e.preventDefault();
            const warehouse = next
                  ? preSelectWarehouse.warehouse
                  : e.target?.warehouse?.value;
            const area = next ? preSelectWarehouse.area : e?.target?.area?.value;
            const rack = e.target.rack.value;
            setWareHouses((prevState) => ({
                  ...prevState,
                  rack: rack,
                  area: area,
                  warehouse: warehouse,
            }));

            const data = {
                  warehouse,
                  area,
                  rack,
                  shopId: shopInfo._id,
                  status: true,
            };
            console.log(data);
            fetch("https://doob.dev/api/v1/admin/warehouse/rack", {
                  method: "post",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert("Upload Successful", "", "success");
                        recall();
                        refetch();
                        if (nextStae) {
                              setNext(true);
                              setNewData("Add Shelf");
                        } else {
                              setOpenModal(false);
                        }
                  });
      };

      return (
            <div>
                  <form onSubmit={UploadArea} action="">
                        {!next && (
                              <div>
                                    <div className="mt-10">
                                          <label className="text-sm">Select WareHouse</label>
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
                                                onChange={handleWarehouseChange}
                                                name="warehouse"
                                                required
                                                options={warehouseOptions}
                                                placeholder="Please select"
                                          />
                                    </div>
                                    <div className="mt-4">
                                          <label className="text-sm">Select Area</label>
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
                                                name="area"
                                                required
                                                options={areas
                                                      .filter((rack) => rack?.status)
                                                      .map((area) => ({
                                                            value: area.area,
                                                            label: area.area,
                                                      }))}
                                                placeholder="Please select"
                                          />
                                    </div>
                              </div>
                        )}

                        <div className=" mt-4">
                              <label className="text-sm">Add Rack</label>
                              <input
                                    required
                                    name="rack"
                                    type="text"
                                    placeholder="Description"
                                    className="w-full p-2 border border-black rounded-md  text-gray-900"
                              />
                        </div>

                        <div className="flex items-center w-full justify-between mt-10">
                              <button
                                    type="submit"
                                    className="group   relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                              >
                                    <span className="absolute -start-full transition-all group-hover:start-4">
                                          <FaLongArrowAltRight />
                                    </span>
                                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                                          Upload Warehouse
                                    </span>
                              </button>
                              <button
                                    type="submit"
                                    onClick={() => setNextState(true)}
                                    className="group text-sm relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                              >
                                    Next
                              </button>
                        </div>
                  </form>
            </div>
      );
};

export default AddRackModal;
