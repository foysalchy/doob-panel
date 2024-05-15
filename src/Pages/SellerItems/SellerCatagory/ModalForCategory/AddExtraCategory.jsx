import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Select from "react-select";
import { AuthContext } from "../../../../AuthProvider/UserProvider";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddExtraCategory = () => {
  const { shopInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { data: darazData = [], refetch } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/category/seller/${shopInfo._id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const option = darazData
    ?.filter((warehouse) => warehouse.status)
    .map((warehouse) => ({
      value: JSON.stringify(warehouse),
      label: warehouse.name,
    }));

  console.log(
    darazData,
    "testing....",
    `https://backend.doob.com.bd/api/v1/category/seller/${shopInfo._id}`
  );

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

  const [miniCategoryName, setMiniCategoryName] = useState("");

  const uploadImage = async (formData) => {
    const url = `https://backend.doob.com.bd/api/v1/image/upload-image`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const imageData = await response.json();
    return imageData.imageUrl;
  };

  const UploadArea = async (e) => {
    e.preventDefault();
    const image = e.target.image;
    const megaCategory = e.target.megaCategory.value || "";
    const darazExtraCategory = e.target.darazExtraCategory?.value || "";
    const wooMiniCategory = e.target.wooMiniCategory?.value || "";
    const subCategoryName = e.target.subCategoryName.value || "";
    const extraCategoryName = e.target.extraCategoryName.value;
    let darazCategory_id = "";
    if (darazExtraCategory) {
      darazCategory_id = JSON.parse(darazExtraCategory).data.category_id;
    }

    const imageFormData = new FormData();
    imageFormData.append("image", image.files[0]);
    const imageUrl = await uploadImage(imageFormData);

    const selectedSUbs = subCategorys.find(
      (item) => item?.subCategoryName === subCategoryName
    );
    // console.log(selectedSUbs?._id);

    // return;
    const data = {
      img: imageUrl,
      megaCategory,
      darazExtraCategory,
      wooMiniCategory,
      subCategoryName,
      miniCategoryName: miniCategoryName.split(",")[0],
      miniCategoryId: miniCategoryName.split(",")[1],
      shopId: shopInfo._id,
      extraCategoryName,
      darazCategory_id,
      status: true,
      subCategoryId: selectedSUbs?._id,
      megaCategoryId: JSON.parse(megaCategory)._id,
    };

    console.log(data);
    // return;

    const url = `https://backend.doob.com.bd/api/v1/category/seller/extra/add`;

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Mini Category Upload Successfully", "", "success");
        refetch();
        handleGoBack();
      });
  };

  const [subCategorys, setSubCategorys] = useState([]);

  const [megaCategory, setMegaCategory] = useState("");

  const handleSelectChange = (selectedOption) => {
    const darazCategoryObject = JSON.parse(selectedOption?.value);
    setMegaCategory(selectedOption.value);

    const requestBody = {
      shopId: shopInfo._id,
      megaCategory: selectedOption.value,
    };

    fetch(`https://backend.doob.com.bd/api/v1/category/seller/sub`, {
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
    value: warehouse?.subCategoryName,
    label: warehouse?.subCategoryName,
  }));

  // console.log(subCategorys);
  const [miniCategories, setMiniCategories] = useState([]);

  const handleChangeSub = (value) => {
    // console.log(value);

    const requestBody = {
      shopId: shopInfo._id,
      subCategoryName: value.value,
      megaCategory,
    };
    fetch(`https://backend.doob.com.bd/api/v1/category/seller/mini`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        setMiniCategories(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [darazOption, setDarazOption] = useState(false);

  let darazMiniCategoryName = "";
  let darazSubCategoryName = "";

  const miniCategoriesOption =
    miniCategories &&
    miniCategories.map((warehouse) => {
      try {
        const miniCategory = warehouse;
        const data =
          warehouse.darazMiniCategory &&
          JSON.parse(warehouse?.darazMiniCategory);

        darazSubCategoryName = data.name;

        // delete warehouse.megaCategory;

        const option = {
          value: miniCategory,
          label: miniCategory.miniCategoryName,
        };

        return option;
      } catch (error) {
        console.error("Error parsing JSON data:", error);

        return null; // or handle the error in a way that fits your application
      }
    });

  const darazOptionData =
    darazOption &&
    darazOption?.map((data) => {
      const option = {
        value: JSON.stringify({
          data,
          darazMiniCategoryName: darazMiniCategoryName,
          darazSubCategoryName: darazSubCategoryName,
        }),
        label: data.name,
      };

      return option;
    });

  const darazCategoryHandle = (value) => {
    setMiniCategoryName(
      `${value?.value?.miniCategoryName},${value?.value?._id}`
    );
    if (value?.value?.darazMiniCategory.length) {
      const arryData = JSON.parse(value?.value?.darazMiniCategory)?.child;

      if (arryData.children) {
        setDarazOption(arryData?.children);
      } else {
        setDarazOption(false);
      }
    }
  };

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
              onChange={handleChangeSub}
              options={subcategoryOption}
              placeholder="Select Daraz Category"
            />
          </div>
        </div>
        <div className=" mt-4">
          <div className="mt-4">
            <label className="text-sm">Select Mini Category</label>
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
              name="miniCategoryName"
              required
              onChange={darazCategoryHandle}
              options={miniCategoriesOption}
              placeholder="Select Mini Category"
            />
          </div>
        </div>
        {shopInfo.darazLogin && darazOption && (
          <div className=" mt-4">
            <div className="mt-4">
              <label className="text-sm">Select Your Daraz Category</label>
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
                name="darazExtraCategory"
                required
                options={darazOptionData}
                placeholder="Select Daraz Category"
              />
            </div>
          </div>
        )}
        {/* {shopInfo.wooLogin && darazOption?.length > 0 && <div className=" mt-4">
                    <div className='mt-4' >
                        <label className="text-sm">Select Daraz Category</label>
                        <Select
                            menuPortalTarget={document.body}
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    cursor: 'pointer',
                                }),
                                option: (provided) => ({
                                    ...provided,
                                    cursor: 'pointer',
                                }),
                            }}
                            name='wooMiniCategory'
                            required
                            options={darazOption}
                            placeholder="Select Daraz Category"
                        />
                    </div>
                </div>} */}

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Enter Extra Category Name
          </label>
          <input
            required
            name="extraCategoryName"
            placeholder="E.g., Trendy Fashion Accessories"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-900 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className=" mt-4">
          <label className="text-sm">Upload Image</label>
          <input
            required
            name="image"
            type="file"
            placeholder="Upload Image"
            className="w-full p-2 border border-black rounded-md  text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="group mt-4 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
        >
          <span className="absolute -start-full transition-all group-hover:start-4">
            <FaLongArrowAltRight />
          </span>
          <span className="text-sm font-medium transition-all group-hover:ms-4">
            Add Extra Category
          </span>
        </button>
      </form>
    </div>
  );
};

export default AddExtraCategory;
