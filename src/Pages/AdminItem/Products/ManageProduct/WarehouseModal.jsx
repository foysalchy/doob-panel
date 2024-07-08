import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { AuthContext } from "../../../../AuthProvider/UserProvider";

const WarehouseModal = ({
  modalOpen,
  setModalOpen,
  product,
  doobProduct,
  reload,
}) => {
  console.log(product?.shopId, "doobProduct");
  // const { shopInfo } = useContext(AuthContext);
  const [areas, setAreas] = useState([]);
  const [racks, setRacks] = useState([]);
  const [selfs, setSelfs] = useState([]);
  const [cells, setCells] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedArea, setSelectedArea] = useState(
    product?.warehouse[0]?.name ?? ""
  );
  const [selectedRack, setSelectedRack] = useState(
    product?.warehouse[1]?.name ?? ""
  );
  const [selectedSelf, setSelectedSelf] = useState(
    product?.warehouse[2]?.name ?? ""
  );
  const [selectedCell, setSelectedCell] = useState(
    product?.warehouse[3]?.name ?? ""
  );

  const [selectedPackage, setSelectedPackage] = useState("");

  const handlePackageChange = (e) => {
    console.log(e.target.value);
    setSelectedPackage(e.target.value);
  };

  console.log(product);
  const { data: packageData = [] } = useQuery({
    queryKey: ["package"],
    queryFn: async () => {
      const getPackage = "https://doob.dev/api/v1/admin/package";

      const res = await fetch(getPackage);
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
      const data = await res.json();
      return data;
    },
  });

  //   console.log(packageData);
  console.log(selectedPackage);

  useEffect(() => {
    if (product?.handling) {
      setSelectedPackage(product?.handling);
    }
  }, []);

  const {
    data: warehouses = [],
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["warehouses"],
    queryFn: async () => {
      const getWarehouseApiUrl = "https://doob.dev/api/v1/admin/warehouse";

      const res = await fetch(getWarehouseApiUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
      const data = await res.json();
      return data;
    },
  });

  //   c

  const getSlotByPrice = (pkg, price) => {
    console.log(pkg, price);
    const slots = Object.values(pkg).filter(
      (slot) => typeof slot === "object" && "to" in slot && "price" in slot
    );
    let matchedSlot = slots.find(
      (slot) => parseInt(price) <= parseInt(slot.to)
    );
    if (!matchedSlot) {
      matchedSlot = slots[slots.length - 1];
    }
    return matchedSlot;
  };

  // Sort packageData based on the matching slot's 'to' value
  const sortedPackageData = [...packageData].sort((a, b) => {
    const slotA = getSlotByPrice(a, product?.price);
    const slotB = getSlotByPrice(b, product?.price);
    return parseInt(slotA.to) - parseInt(slotB.to);
  });
  const handleWarehouseChange = async (selectedOption) => {
    const selectedWarehouse = selectedOption.value;
    setSelectedWarehouse(selectedWarehouse);
    setRacks([]);
    setSelfs([]);
    setCells([]);

    const getAreaApiUrl = `https://doob.dev/api/v1/admin/warehouse/area/${selectedWarehouse}`;

    const areaRes = await fetch(getAreaApiUrl);
    const areaData = await areaRes.json();
    setAreas(areaData);
    setSelectedArea("");
    setSelectedRack("");
    setSelectedSelf("");
    setSelectedCell("");
  };

  const handleAreaChange = async (selectedOption) => {
    const selectedArea = selectedOption.value;
    setSelectedArea(selectedArea);
    setSelfs([]);
    setCells([]);

    const getRackApiUrl = `https://doob.dev/api/v1/admin/warehouse/rack/${selectedWarehouse}/${selectedArea}`;

    const rackRes = await fetch(getRackApiUrl);
    const rackData = await rackRes.json();
    setRacks(rackData);
    setSelectedRack("");
    setSelectedSelf("");
    setSelectedCell("");
  };

  const handleReckChange = async (selectedOption) => {
    const selectedRack = selectedOption.value;
    setSelectedRack(selectedRack);
    setCells([]);

    const getSelfApiUrl = `https://doob.dev/api/v1/admin/warehouse/self/${selectedWarehouse}/${selectedArea}/${selectedRack}`;

    const selfRes = await fetch(getSelfApiUrl);
    const selfData = await selfRes.json();

    setSelfs(selfData);
    setSelectedSelf("");
    setSelectedCell("");
  };

  // console.log(product);
  const handleSelfChange = async (selectedOption) => {
    const selectedSelfs = selectedOption.value;
    setSelectedSelf(selectedSelfs);

    const getCellApiUrl = `https://doob.dev/api/v1/admin/warehouse/cell/${selectedWarehouse}/${selectedArea}/${selectedRack}/${selectedSelf}/${product?.shopId}`;

    console.log(getCellApiUrl, "getCellApiUrl");
    const cellsRes = await fetch(getCellApiUrl);
    const cellData = await cellsRes.json();
    console.log(cellData);
    setCells(cellData);
    setSelectedCell("");
  };

  const handleCellChange = (selectedOption) => {
    const cell = selectedOption.value;
    setSelectedCell(cell);
  };

  const updateInfo = (e) => {
    e.preventDefault();
    // const handling = e.target.handling.value;
    const Commission = e.target?.commission?.value ?? 0;
    const Packaging_cost = e.target?.commission?.value ?? 0;

    const adminCategory = [
      { name: selectedWarehouse },
      { name: selectedArea },
      { name: selectedRack },
      { name: selectedSelf },
      { name: selectedCell },
    ];

    // console.log(adminCategory);
    const data = {
      handling: selectedPackage,
      commission: Commission,
      warehouse: adminCategory ? adminCategory : product.warehouse,
      // warehouse: doobProduct ? adminCategory : product.warehouse,
    };
    console.log(data);

    // return;
    fetch(
      `https://doob.dev/api/v1/admin/update-product-info?productId=${product._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((warehouseResult) => {
        console.log(warehouseResult);
        fetch(`https://doob.dev/api/v1/seller/update-product-status`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: product?._id,
            status: true,
          }),
        })
          .then((res) => res.json())
          .then((statusResult) => {
            // BrightAlert({ timeDuration: 3000 });
            // refetch();
            // reload();
            BrightAlert({ timeDuration: 3000 });
            setModalOpen(false);
            reload();
          });
      });
  };

  // console.log(product.warehouse);
  const defaultWarehouse = product?.warehouse[0]?.name || null;
  return (
    <div>
      <div
        className={`fixed left-0 top-0 flex z-50 h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
          modalOpen ? "block" : "hidden"
        }`}
      >
        <form
          onSubmit={updateInfo}
          className="w-full max-w-[1070px] rounded-[20px] bg-white px-8 py-12 text-center black:bg-black-2 md:px-[70px] md:py-[60px]"
        >
          <h3 className="pb-[18px] text-xl font-semibold text-black black:text-white sm:text-2xl">
            Product Approval
          </h3>
          <span
            className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
          ></span>
          <div className="flex flex-col mt-3">
            {product.multiVendor && (
              <div className="flex gap-4 justify-center">
                <div className="mb-4">
                  <h1 className="text-xl font-bold mb-2">Processing Fee</h1>
                  <input
                    type="number"
                    required
                    name="commission"
                    defaultValue={product?.commission}
                    className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                    placeholder="Enter Packaging Cost"
                  />
                </div>
                <div>
                  <label htmlFor="package" className="text-xl font-bold mb-2">
                    Select Packaging fee
                  </label>
                  <select
                    id="package"
                    value={selectedPackage}
                    className="mt-2 border border-gray-300 px-3 py-3 rounded-md w-full focus:outline-none focus:border-blue-500 text-black"
                    onChange={handlePackageChange}
                  >
                    <option value="">Select Package</option>
                    {sortedPackageData.map((pkg) => {
                      const slot = getSlotByPrice(pkg, product?.price);
                      console.log(slot);
                      return (
                        <option key={pkg._id} value={slot?.price}>
                          {pkg.name}
                        </option>
                      );
                    })}
                  </select>
                  {/* 
                  <Select
                    className=""
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
                    onChange={handlePackageChange}
                    name="package"
                    // required
                    options={packageData?.map((pack) => ({
                      value: pack.amount, // Assuming each package object has a 'name' property
                      label: pack.packageName,
                    }))}
                    placeholder="Please select"
                    defaultValue={packageData?.find(
                      (pack) => pack.packageName === product?.handling
                    )}
                  /> */}
                </div>
              </div>
            )}
            {!product.multiVendor && (
              <h2 className="my-3 text-red-500">This is Not multiVendor</h2>
            )}
            {product?.adminWare && (
              <div>
                <div className="grid md:grid-cols-5 mt-3 gap-4">
                  <div className="">
                    <label className="text-sm">Select Warehouse</label>
                    <Select
                      className=""
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
                      // required
                      options={
                        isRefetching
                          ? [{ label: "Loading...", value: null }]
                          : warehouses
                              .filter((warehouse) => warehouse.status) // Filter based on status
                              .map((warehouse) => ({
                                value: warehouse.name,
                                label: warehouse.name,
                              }))
                      }
                      defaultValue={{
                        value: product?.warehouse[0]?.name,
                        label: product?.warehouse[0]?.name,
                      }}
                      placeholder="Please select"
                    />
                  </div>
                  {selectedWarehouse && (
                    <div className="">
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
                        defaultValue={{
                          value: product?.warehouse[1]?.name,
                          label: product?.warehouse[1]?.name,
                        }}
                        onChange={handleAreaChange}
                        name="area"
                        // required
                        options={areas
                          .filter((area) => area.status) // Filter based on status
                          .map((area) => ({
                            value: area.area,
                            label: area.area,
                          }))}
                        placeholder="Please select"
                      />
                    </div>
                  )}

                  {selectedArea && (
                    <div className="">
                      <label className="text-sm">Select Rack</label>
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
                        defaultValue={{
                          value: product?.warehouse[2]?.name,
                          label: product?.warehouse[2]?.name,
                        }}
                        name="rack"
                        // required
                        onChange={handleReckChange}
                        options={racks
                          ?.filter((rack) => rack.status)
                          .map((rack) => ({
                            value: rack.rack,
                            label: rack.rack,
                          }))}
                        placeholder="Please select"
                      />
                    </div>
                  )}

                  {selectedRack && (
                    <div className="">
                      <label className="text-sm">Select Self</label>
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
                        name="self"
                        defaultValue={{
                          value: product?.warehouse[3]?.name,
                          label: product?.warehouse[3]?.name,
                        }}
                        // required
                        onChange={handleSelfChange}
                        options={selfs
                          ?.filter((selfs) => selfs.status)
                          .map((self) => ({
                            value: self.self,
                            label: self.self,
                          }))}
                        placeholder="Please select"
                      />
                    </div>
                  )}

                  {selectedSelf && (
                    <div className="">
                      <label className="text-sm">Select Cell</label>
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
                        defaultValue={{
                          value: product?.warehouse[4]?.name,
                          label: product?.warehouse[4]?.name,
                        }}
                        name="cell"
                        // required
                        onChange={handleCellChange}
                        options={
                          cells.length &&
                          cells
                            ?.filter((cell) => cell.status)
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

                <div className="my-4 mb-10">
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
            )}
            {!product?.adminWare && (
              <h2 className="my-3 text-red-500">
                This is not your warehouse Product
              </h2>
            )}
          </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-1/2 px-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="block w-full rounded-md border border-stroke p-3 text-center text-base font-medium text-black transition hover:border-red-600 hover:bg-red-600 hover:text-white black:text-white"
              >
                Cancel
              </button>
            </div>
            <div className="w-1/2 px-3">
              <button
                type="submit"
                className="block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-blue-black"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WarehouseModal;
