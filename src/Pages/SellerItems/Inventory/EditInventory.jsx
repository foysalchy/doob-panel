import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import Select from "react-select";
import BrightAlert from "bright-alert";

const EditInventory = ({ refetch, open, setOpen, data }) => {
  console.log("data", data);
  const [count, setCount] = useState(0);
  const { shopInfo } = useContext(AuthContext);

  const [selectedValue, setSelectedValue] = useState([]);
  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
  };
  console.log("selectedValue", selectedValue?.value);

  const [selectStatusValue, setSelectStatusValue] = useState([]);

  const [note, setNote] = useState("");

  console.log(shopInfo, ".........>>>");

  const handleIncrease = () => {
    setCount(parseInt(count) + 1);
  };

  const handleDecrease = () => {
    setCount(parseInt(count) - 1);
  };

  const handleSubmit = () => {
    const stock = {
      productId: data._id,
      shopInfo: {
        logo: shopInfo?.logo,
        phone: shopInfo?.shopNumber,
        address: shopInfo?.address,
        shopEmail: shopInfo?.shopEmail,
        shopName: shopInfo?.shopName,
        shopPhone: shopInfo?.shopPhone,
      },
      productInfo: {
        name: data?.name,
        price: data?.price,
        image: data?.featuredImage?.src ?? data?.images[0]?.src,
        quantity: data?.stock_quantity,
        // image:,
      },
      warehouse: data?.warehouse,
      date: new Date().getTime(),
      quantity: count,
      shopId: data.shopId,
      shopName: shopInfo.shopName,
      adminWare: data?.adminWare,
      SKU: selectedValue?.value,
      delivery_status: selectStatusValue?.value,
      note,
    };




    fetch(`https://backend.doob.com.bd/api/v1/admin/stock-request-create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stock),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        setOpen(!open);
        BrightAlert();
      })


  };

  const options = data?.variations?.map((item) => {
    return {
      label: item?.SKU,
      value: item?.SKU,
    };
  });

  const statusOptionsData = ["pending", "purchasing", "shipped", "received"];
  // console.log("options", options);

  const statusOptions = statusOptionsData?.map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  // console.log(note);

  return (
    <div className="fixed bg-[#000000a2] top-0 left-0 flex items-center justify-center w-screen h-screen z-[1000] text-start">
      <div className="p-3 shadow-lg relative bg-white w-[500px] rounded-lg">
        <header>
          <h2 className="text-lg pb-2 border-b font-semibold">Edit Quantity</h2>

          <button
            onClick={() => setOpen(!open)}
            className="bg-gray-200 h-[30px] w-[30px] text-lg font-regular rounded-full flex items-center justify-center absolute right-2 top-2"
          >
            x
          </button>

          <div className="my-3">
            <label className="mb-1 text-lg" htmlFor="user">
              Select Permissions{" "}
            </label>
            <Select
              // lassName="w-full p-2 rounded-md ring-1 mt-2 ring-gray-200" placeholder='input user role'
              options={options}
              // isMulti={true}
              // defaultValue={staffInfo?.permissions}
              // getOptionLabel={(option) => option.name}
              // getOptionValue={(option) => option.route}
              onChange={handleChange}
            />
          </div>

          {<div className="">
            <label className="mb-2 text-lg" htmlFor="note">
              Add Note
            </label>
            <textarea
              onChange={(e) => setNote(e.target.value)}
              name="note"
              type="text"
              className="w-full p-2 rounded-md ring-1 mt-2 ring-gray-200"
              placeholder="Write your Note"
            />
          </div>}

          {<div className="my-3">
            <label className="mb-1 text-lg" htmlFor="status">
              Select Status
            </label>
            <Select
              required
              options={statusOptions}
              onChange={(value) => setSelectStatusValue(value)}
            />
          </div>}
          <div>
            <br />
            <div className="flex items-center ring-1 ring-gray-400 rounded-md">
              <button
                className="cursor-pointer w-full bg-green-500 text-white p-2 rounded m-1 hover:bg-green-600"
                onClick={handleDecrease}
              >
                -
              </button>
              <input
                onChange={(e) => setCount(e.target.value)}
                type="text"
                className="w-[400px] text-center"
                value={count}
              />
              <button
                className="cursor-pointer w-full bg-green-500 text-white p-2 rounded m-1 hover:bg-green-600"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>

            <br />
            {/* Add similar structure for other fields */}
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default EditInventory;
