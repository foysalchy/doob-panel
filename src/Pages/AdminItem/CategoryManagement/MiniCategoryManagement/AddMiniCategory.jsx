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
import useImageUpload from "../../../../Hooks/UploadImage";
import showAlert from "../../../../Common/alert"

const AddMiniCategory = () => {
  const navigate = useNavigate();
  const [upload, setUpload] = useState("");
  const [uplodOk, setUploadOk] = useState(false);
  const { uploadImage } = useImageUpload();


  const handleGoBack = () => {
    navigate(-1); // This will go back to the previous page
  };

  let megaCategoryUrl = `https://doob.dev/api/v1/admin/category/megacategory`;

  const { data: megaCategories = [], refetch } = useQuery({
    queryKey: ["megaCategories"],
    queryFn: async () => {
      const res = await fetch(megaCategoryUrl);
      const data = await res.json();
      return data.rows;

      return [];
    },
  });

  const option = megaCategories
    ?.filter((itm) => itm?.status === "true")
    .map((itm) => ({
      value: itm._id,
      label: itm.name,
    }));

  const [subCategorys, setSubCategorys] = useState([]);

  const handleSelectChange = (selectedOption) => {
    setSubCategorys([]);
    const optionId = selectedOption.value;
    fetch(
      `https://doob.dev/api/v1/admin/category/subcategory?id=${optionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSubCategorys(data.subCategory);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(optionId, "id");
  };
  const sortedWarehouses = subCategorys?.filter(
    (warehouse) => warehouse?.status === "true"
  );

  const subcategoryOption = sortedWarehouses?.map((warehouse) => ({
    value: warehouse._id,
    label: warehouse.subCategory,
  }));

  const UploadArea = async (e) => {
    e.preventDefault();

    const megaCategory = e.target.megaCategory.value || "";
    const subCategoryId = e.target.subCategoryName.value;
    const miniCategoryName = e.target.miniCategoryName.value;
    const megaCategoryName =
      megaCategories.find((item) => item._id === megaCategory)?.name || "";
    const megaCategoryId =
      megaCategories.find((item) => item._id === megaCategory)?._id || "";
    const subCategoryName =
      subCategorys.find((item) => item._id === subCategoryId)?.subCategory ||
      "";
    // const file = e.target.image.files[0];

    // const upload = await uploadImage(file);
    const data = {
      megaCategoryName,
      megaCategory,
      subCategoryName,
      megaCategoryId,
      subCategoryId,
      miniCategoryName,
      img: '0',
      status: "true",

      timeStamp: new Date().getTime(),
    };

    const url = `https://doob.dev/api/v1/admin/category/miniCategory`;
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
        handleGoBack();
      });
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
              options={subcategoryOption}
              placeholder="Select Sub Category"
            />
          </div>
        </div>
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
       

        <button
          type="submit"
          className="group mt-4 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
        >
          <span className="absolute -start-full transition-all group-hover:start-4">
            <FaLongArrowAltRight />
          </span>
          <span className="text-sm font-medium transition-all group-hover:ms-4">
            Add MiniCategory
          </span>
        </button>
      </form>
    </div>
  );
};

export default AddMiniCategory;
