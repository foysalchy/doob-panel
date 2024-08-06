import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import Select from "react-select";

const WareHouse = ({ adminWare, setAdminWare, shopInfo }) => {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedRack, setSelectedRack] = useState("");
  const [selectedSelf, setSelectedSelf] = useState("");
  const [selectedCell, setSelectedCell] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    warehouses: [],
    areas: [],
    racks: [],
    selfs: [],
    cells: [],
  });

  useEffect(() => {
    fetchData();
    setOptions((prev) => prev);
  }, [adminWare, selectedWarehouse]);

  console.log(shopInfo, "shopInfo");
  const fetchData = async () => {
    const apiUrl = adminWare
      ? `https://doob.dev/api/v1/admin/warehouse/access-warehouse?shopId=${shopInfo?.shopId}`
      : `https://doob.dev/api/v1/seller/warehouse/get/${shopInfo._id}`;

    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res?.statusText}`);
    }
    const data = await res.json();
    setOptions((prevOptions) => ({
      ...prevOptions,
      warehouses: data,
    }));
  };
  console.log("option", options);

  const handleWarehouseChange = async (selectedOption) => {
    console.log(selectedOption);
    setLoading(true);
    const selectedWarehouse = selectedOption.value;
    setSelectedWarehouse(selectedWarehouse);
    setOptions(options);
    setSelectedArea("");
    setSelectedRack("");
    setSelectedSelf("");
    setSelectedCell("");

    const apiUrl = `https://doob.dev/api/v1/seller/warehouse/area/${selectedWarehouse}/${shopInfo._id}`;
    const res = await fetch(apiUrl);
    const areaData = await res.json();
    setLoading(false);
    console.log("areaData", areaData);
    setOptions((prevOptions) => ({
      ...prevOptions,
      areas: areaData,
      racks: [],
      selfs: [],
      cells: [],
    }));
  };

  const handleAreaChange = async (selectedOption) => {
    const selectedArea = selectedOption.value;
    setSelectedArea(selectedArea);
    setSelectedRack("");
    setSelectedSelf("");
    setSelectedCell("");

    const apiUrl = `https://doob.dev/api/v1/seller/warehouse/rack/${selectedWarehouse}/${selectedArea}/${shopInfo._id}`;
    const res = await fetch(apiUrl);
    const rackData = await res.json();
    setOptions((prevOptions) => ({
      ...prevOptions,
      racks: rackData,
      selfs: [],
      cells: [],
    }));
  };

  const handleRackChange = async (selectedOption) => {
    const selectedRack = selectedOption.value;
    setSelectedRack(selectedRack);
    setSelectedSelf("");
    setSelectedCell("");

    const apiUrl = `https://doob.dev/api/v1/seller/warehouse/self/${selectedWarehouse}/${selectedArea}/${selectedRack}/${shopInfo._id}`;
    const res = await fetch(apiUrl);
    const selfData = await res.json();
    setOptions((prevOptions) => ({
      ...prevOptions,
      selfs: selfData,
      cells: [],
    }));
  };

  const handleSelfChange = async (selectedOption) => {
    const selectedSelf = selectedOption.value;
    setSelectedSelf(selectedSelf);

    const apiUrl = `https://doob.dev/api/v1/seller/warehouse/cell/${selectedWarehouse}/${selectedArea}/${selectedRack}/${selectedSelf}/${shopInfo._id}`;
    const res = await fetch(apiUrl);
    const cellData = await res.json();
    setOptions((prevOptions) => ({
      ...prevOptions,
      cells: cellData,
    }));
  };

  const handleCellChange = (selectedOption) => {
    const selectedCell = selectedOption.value;
    setSelectedCell(selectedCell);
  };

  console.log(
    options.cells,
    `https://doob.dev/api/v1/seller/warehouse/cell/${selectedWarehouse}/${selectedArea}/${selectedRack}/${selectedSelf}/${shopInfo._id}`
  );

  return (
    <div>
      <div className="border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded">
        <div className=" gap-10">
          <span className="font-bold">Select Warehouse</span>
          <button type="button" className="flex justify-start mt-2">
            <span
              onClick={() => {
                setAdminWare(false);
                setSelectedWarehouse("");
                setSelectedArea("");
                setSelectedRack("");
                setSelectedSelf("");
                setSelectedCell("");
              }}
              className={
                adminWare
                  ? "px-4 py-2 bg-gray-600 text-white  "
                  : "px-4 py-2 bg-green-500 text-white shadow-xl shadow-green-500/50"
              }
            >
              {shopInfo.shopName}
            </span>
            <span
              onClick={() => {
                setAdminWare(true);
                setSelectedWarehouse("");
                setSelectedArea("");
                setSelectedRack("");
                setSelectedSelf("");
                setSelectedCell("");
                fetchData();
              }}
              className={
                !adminWare
                  ? "px-4 py-2 bg-gray-600 shadow-3 text-white "
                  : "px-4 py-2 bg-green-500 text-white shadow-xl shadow-green-500/50"
              }
            >
              Doob
            </span>
          </button>
        </div>

        <div className="flex flex-col mt-3">
          {adminWare && !options.warehouses.length ? <span>
            <span className="text-red-500">Your store doesn't have any Doob warehouse. Please contact the admin for Doob warehouse availability.</span>
          </span> : <span>
            Warehouse Information <span className="text-red-500"> *</span>
          </span>}

          {selectedWarehouse ? (
            <div className="grid md:grid-cols-5 mt-3 gap-4">
              <div className="">
                <label className="text-sm">Select Warehouse.</label>
                <Select
                  // required
                  className=""
                  onChange={handleWarehouseChange}
                  value={{
                    label: selectedWarehouse || "Select warehouse", // Set a default label if selectedWarehouse is null
                    value: selectedWarehouse,
                  }}
                  name="warehouse"
                  options={options.warehouses
                    .filter((warehouse) => warehouse?.status) // Filter based on status
                    .map((warehouse) => ({
                      value: warehouse.name,
                      label: warehouse.name,
                    }))}
                  placeholder="Please select"
                />
              </div>
              {selectedWarehouse && !adminWare && (
                <div className="">
                  <label className="text-sm">Select Area</label>
                  <Select
                    // required
                    onChange={handleAreaChange}
                    name="area"
                    options={options.areas
                      .filter((area) => area?.status) // Filter based on status
                      .map((area) => ({
                        value: area.area,
                        label: area.area,
                      }))}
                    placeholder="Please select"
                  />
                </div>
              )}
              {selectedArea && !adminWare && (
                <div className="">
                  <label className="text-sm">Select Rack</label>
                  <Select
                    // required
                    name="rack"
                    onChange={handleRackChange}
                    options={options.racks
                      ?.filter((rack) => rack?.status)
                      .map((rack) => ({
                        value: rack.rack,
                        label: rack.rack,
                      }))}
                    placeholder="Please select...."
                  />
                </div>
              )}
              {selectedRack && !adminWare && (
                <div className="">
                  <label className="text-sm">Select Self</label>
                  <Select
                    // required
                    name="self"
                    onChange={handleSelfChange}
                    options={options.selfs
                      ?.filter((selfs) => selfs?.status)
                      .map((self) => ({
                        value: self.self,
                        label: self.self,
                      }))}
                    placeholder="Please select"
                  />
                </div>
              )}
              {selectedSelf && !adminWare && (
                <div className="">
                  <label className="text-sm">Select Cell</label>
                  <Select
                    // required
                    name="cell"
                    onChange={handleCellChange}
                    options={
                      options.cells.length &&
                      options.cells
                        .filter((cell) => cell?.status)
                        .map((cell) => ({
                          value: cell.cell,
                          label: cell.cell,
                        }))
                    }
                    placeholder="Please select"
                  />
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="grid md:grid-cols-5 mt-3 gap-4">
                <div className="">
                  <label className="text-sm">Select Warehouses</label>
                  <Select
                    // required
                    className=""
                    onChange={handleWarehouseChange}
                    value={{
                      label: selectedWarehouse || "Select warehouse", // Set a default label if selectedWarehouse is null
                      value: selectedWarehouse,
                    }}
                    name="warehouse"
                    options={options.warehouses
                      .filter((warehouse) => warehouse?.status) // Filter based on status
                      .map((warehouse) => ({
                        value: warehouse.name,
                        label: warehouse.name,
                      }))}
                    placeholder="Please select"
                  />
                </div>
                {selectedWarehouse && !adminWare && (
                  <div className="">
                    <label className="text-sm">Select Area</label>
                    <Select
                      // required
                      onChange={handleAreaChange}
                      name="area"
                      options={options.areas
                        .filter((area) => area?.status) // Filter based on status
                        .map((area) => ({
                          value: area.area,
                          label: area.area,
                        }))}
                      placeholder="Please select"
                    />
                  </div>
                )}
                {selectedArea && !adminWare && (
                  <div className="">
                    <label className="text-sm">Select Rack</label>
                    <Select
                      // required
                      name="rack"
                      onChange={handleRackChange}
                      options={options.racks
                        ?.filter((rack) => rack?.status)
                        .map((rack) => ({
                          value: rack.rack,
                          label: rack.rack,
                        }))}
                      placeholder="Please select"
                    />
                  </div>
                )}
                {selectedRack && !adminWare && (
                  <div className="">
                    <label className="text-sm">Select Self</label>
                    <Select
                      // required
                      name="self"
                      onChange={handleSelfChange}
                      options={options.selfs
                        ?.filter((selfs) => selfs?.status)
                        .map((self) => ({
                          value: self.self,
                          label: self.self,
                        }))}
                      placeholder="Please select"
                    />
                  </div>
                )}
                {selectedSelf && !adminWare && (
                  <div className="">
                    <label className="text-sm">Select Cell</label>
                    <Select
                      // required
                      name="cell"
                      onChange={handleCellChange}
                      options={
                        options.cells.length &&
                        options.cells
                          .filter((cell) => cell?.status)
                          .map((cell) => ({
                            value: cell.cell,
                            label: cell.cell,
                          }))
                      }
                      placeholder="Please select"
                    />
                  </div>
                )}
              </div>
              <div className="mt-3 text-red-500">Please select a warehouse</div>
            </div>
          )}

          <div className="mt-4">
            <strong>Selected Warehouses:</strong>
            <span className="ml-4">
              {" "}
              {selectedWarehouse && selectedWarehouse}
              {selectedArea && ` > ${selectedArea}`}
              {selectedRack && ` > ${selectedRack} `}
              {selectedSelf && ` > ${selectedSelf}`}
              {selectedCell && ` > ${selectedCell}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WareHouse;
