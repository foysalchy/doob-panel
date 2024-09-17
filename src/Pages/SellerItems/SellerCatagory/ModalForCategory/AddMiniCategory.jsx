import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Select from "react-select";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import showAlert from "../../../../Common/alert";
const AddMiniCategory = () => {
  const { shopInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This will go back to the previous page
  };

  console.log(
    `https://doob.dev/api/v1/category/seller/${shopInfo._id}`
  );

  const { data: darazData = [], refetch } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/category/seller/${shopInfo._id}`
      );
      const data = await res.json();
      return data;

      return [];
    },
  });

  const [subCategorysID, setSubCategorysID] = useState('');

  const option = darazData
    ?.filter((warehouse) => warehouse.status)
    .map((warehouse) => ({
      value: JSON.stringify(warehouse),
      label: warehouse.name,
    }));

  const [daraz, setDaraz] = useState(false);
  const [wocomarce, setWocomarce] = useState(false);

  const handleButtonClick = (buttonName) => {
    if (buttonName === "daraz") {
      setDaraz(!daraz);
    }
    if (buttonName === "wocomarce") {
      setWocomarce(!wocomarce);
    }
  };

  const uploadImage = async (formData) => {
    const url =`http://localhost:5001/api/v1/image/upload-image/?shopId=${shopInfo._id}`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const imageData = await response.json();
    return imageData.imageUrl;
  };


  const [upload_on, setUpload_on] = useState(false);
  const UploadArea = async (e) => {
    e.preventDefault();
    setUpload_on(true)
    const image = e.target.image;
    const megaCategory = e.target.megaCategory.value || "";
    const darazMiniCategory = e.target.darazMiniCategory?.value || "";
    const wooMiniCategory = e.target.wooMiniCategory?.value || "";
    const subCategoryName = e.target.subCategoryName.value.split(",")[1];
    const sub_id = subCategorysID;
    const miniCategoryName = e.target.miniCategoryName.value;
    const miniCategoryId = e.target.subCategoryName.value.split(",")[0];

    let darazCategory_id = "";
    if (darazMiniCategory) {
      darazCategory_id = JSON.parse(darazMiniCategory).child.category_id;
    }

    const imageFormData = new FormData();
    imageFormData.append("image", image.files[0]);
    const imageUrl = await uploadImage(imageFormData);
    const data = {
      img: imageUrl,
      megaCategory,
      darazMiniCategory,
      wooMiniCategory,
      subCategoryName,
      miniCategoryName,
      shopId: shopInfo._id,
      darazCategory_id,
      status: true,
      subCategoryId: miniCategoryId,
      megaCategoryId: JSON.parse(megaCategory)._id,
      sub_id
    };

    // console.log(data, "net check.");

    // return;

    const url = `https://doob.dev/api/v1/category/seller/mini/add`;

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        showAlert("Mini Category Upload Successfully", "", "success");
        refetch();
        setUpload_on(false)
        handleGoBack();
      });
  };

  const [subCategorys, setSubCategorys] = useState([]);

  const handleSelectChange = (selectedOption) => {
    setSubCategorys([]);
    const darazCategoryObject = JSON.parse(selectedOption.value);
    const darazCategoryString = darazCategoryObject.name;

    const requestBody = {
      shopId: shopInfo._id,
      megaCategory: selectedOption.value,
      subCategoryName: darazCategoryString,
    };

    fetch(`https://doob.dev/api/v1/category/seller/sub`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        setSubCategorys(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const filteredWarehouses = subCategorys?.filter(
    (warehouse) => warehouse?.status === true
  );
  const sortedWarehouses = filteredWarehouses
    ?.filter((warehouse) => warehouse.status)
    .sort((a, b) => a?.subCategoryName?.localeCompare(b.subCategoryName));

  const subcategoryOption = sortedWarehouses?.map((warehouse) => ({
    value: `${warehouse._id},${warehouse?.subCategoryName}`,
    label: warehouse.subCategoryName,
    sub_id: warehouse.darazCategory_id ?? ''
  }));


  const darazOption = sortedWarehouses
    ?.map((warehouse) => {
      const darazSubCategory = warehouse.darazSubCategory;
      console.log(darazSubCategory);
      const parsedDarazSubCategory = darazSubCategory
        ? JSON.parse(darazSubCategory)
        : null;
      return parsedDarazSubCategory;
    })
    .map(
      (parsedDarazSubCategory) =>
        parsedDarazSubCategory?.children?.map((child) => ({
          value: JSON.stringify({ child, name: parsedDarazSubCategory.name }),
          label: child.name,
        })) || []
    )
    .flat();

  return (
    <div className="lg:pr-10 w-full mx-auto overflow-auto border border-black rounded p-6">
      <button
        onClick={() => handleGoBack()}
        type="button"
        className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
      >
        <span className="absolute -start-full transition-all group-hover:start-4">
          <FaLongArrowAltLeft />
        </span>
        <span className="text-sm font-medium transition-all group-hover:ms-4">
          Back
        </span>
      </button>

      <form onSubmit={UploadArea} action="">
        <div className="mt-4">
          <label className="text-sm">Select Mega Category</label>
          <Select
            menuPortalTarget={document.body}
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
            name="megaCategory"
            required
            onChange={handleSelectChange}
            options={option}
            placeholder="Select Mega Category"
          />
        </div>

        <div className=" mt-4">
          <div className="mt-4">
            <label className="text-sm">Select Sub Category</label>
            <Select

              onChange={(e) => setSubCategorysID(e.sub_id)}
              menuPortalTarget={document.body}
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
              name="subCategoryName"
              required
              options={subcategoryOption}
              placeholder="Select Sub Category"
            />
          </div>
        </div>
        {shopInfo.darazLogin && darazOption?.length > 0 && (
          <div className=" mt-4">
            <div className="mt-4">
              <label className="text-sm">Select Daraz Category</label>
              <Select
                menuPortalTarget={document.body}
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
                name="darazMiniCategory"
                required
                options={darazOption}
                placeholder="Select Daraz Category"
              />
            </div>
          </div>
        )}

        {/* <div className=" mt-4">
                    <label className="text-sm">Provide name of Sub category</label>
                    <input required name='image' placeholder="Provide name of Sub category" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                </div> */}

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Enter Mini Category Name
          </label>
          <input
            required
            name="miniCategoryName"
            placeholder="E.g., Trendy Fashion Accessories"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-900 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className=" mt-4">
          <label className="text-sm">Upload Image</label>
          <input
             
            name="image"
            type="file"
            placeholder="Upload Image"
            className="w-full p-2 border border-black rounded-md  text-gray-900"
          />
        </div>

        {!upload_on ?
          <button
            type="submit"
            className="group mt-4 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
          >
            <span className="absolute -start-full transition-all group-hover:start-4">
              <FaLongArrowAltRight />
            </span>
            <span className="text-sm font-medium transition-all group-hover:ms-4">
              Add Mini Category
            </span>
          </button>
          :
          <button
            type="button"
            className="group mt-4 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
          >
            <span className="absolute -start-full transition-all group-hover:start-4">
              <FaLongArrowAltRight />
            </span>
            <span className="text-sm font-medium transition-all group-hover:ms-4">
              Uploading...
            </span>
          </button>}
      </form>
    </div>
  );
};

export default AddMiniCategory;
