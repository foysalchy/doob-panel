import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Select from "react-select";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EditAdminCategoryforSeller = ({ product }) => {
  console.log("🚀 ~:", product?.categories);

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // This will go back to the previous page
  };

  const [subCategorys, setSubCategorys] = useState([]);
  const [miniCategorys, setMiniCategorys] = useState([]);
  const [extraCategorys, setExtraCategorys] = useState([]);

  console.log(subCategorys);
  console.log(miniCategorys);

  let megaCategoryUrl = `https://salenow-v2-backend.vercel.app/api/v1/admin/category/megacategory`;

  const { data: megaCategories = [], refetch } = useQuery({
    queryKey: ["megaCategories"],
    queryFn: async () => {
      const res = await fetch(megaCategoryUrl);
      const data = await res.json();
      return data.rows;

      return [];
    },
  });

  console.log(megaCategories);

  const option = megaCategories
    ?.filter((itm) => itm.status === "true")
    .map((itm) => ({
      value: itm._id,
      label: itm.name,
    }));

  const handleSelectChange = (selectedOption) => {
    setSubCategorys([]);
    const optionId = selectedOption.value;
    fetch(
      `https://salenow-v2-backend.vercel.app/api/v1/admin/category/subcategory?id=${optionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSubCategorys(data.subCategory);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const sortedWarehouses = subCategorys?.filter(
    (warehouse) => warehouse.status === "true"
  );

  const subcategoryOption = sortedWarehouses?.map((warehouse) => ({
    value: warehouse._id,
    label: warehouse.subCategory,
  }));

  const onHandleMiniCategorys = (selectedOption) => {
    setMiniCategorys([]);
    const optionId = selectedOption.value;
    fetch(
      `https://salenow-v2-backend.vercel.app/api/v1/admin/category/miniCategory?id=${optionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, ">>>>>");
        setMiniCategorys(data.row);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const sortedMiniCategorys = miniCategorys
    ?.filter((warehouse) => warehouse.status === "true")
    .map((itm) => ({
      value: itm._id,
      label: itm.miniCategoryName,
    }));

  // extra category

  const onHandleExtraCategorys = (selectedOption) => {
    setExtraCategorys([]);
    const optionId = selectedOption.value;
    // console.log(`https://salenow-v2-backend.vercel.app/api/v1/admin/category/extraCategory?id=${optionId}`);
    fetch(
      `https://salenow-v2-backend.vercel.app/api/v1/admin/category/extraCategory?id=${optionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, ">>>>>");
        setExtraCategorys(data.rows);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const sortedExtraCategorys = extraCategorys
    ?.filter((warehouse) => warehouse.status === "true")
    .map((itm) => ({
      value: itm._id,
      label: itm.extraCategoryName,
    }));

  console.log(product?.categories[0]?.name);

  return (
    <div className="lg:pr-10 mt-4 w-full mx-auto overflow-auto border border-black rounded p-6">
      <div className="grid grid-cols-4 items-center gap-2">
        <div className="">
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
            defaultValue={{
              label: product?.categories[0]?.name,
              value: product?.categories[0]?.name,
            }}
            name="adminMegaCategory"
            required
            onChange={handleSelectChange}
            options={option}
            placeholder="Select Mega Category"
          />
        </div>

        <div className=" ">
          <div className="">
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
              defaultValue={{
                label: product?.categories[1]?.name,
                value: product?.categories[1]?.name,
              }}
              name="adminSubCategoryName"
              onChange={onHandleMiniCategorys}
              required
              options={subcategoryOption}
              placeholder="Select sub Category"
            />
          </div>
        </div>

        <div className=" ">
          <div className="">
            <label className="text-sm">Select Mini Category</label>
            <Select
              onChange={onHandleExtraCategorys}
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
              defaultValue={{
                label: product?.categories[2]?.name,
                value: product?.categories[2]?.name,
              }}
              name="adminMiniCategoryName"
              // required
              options={sortedMiniCategorys}
              placeholder="Select mini Category"
            />
          </div>
        </div>

        <div className=" ">
          <div className="">
            <label className="text-sm">Select Extra Category</label>
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
              defaultValue={{
                label: product?.categories[3]?.name,
                value: product?.categories[3]?.name,
              }}
              name="adminExtraCategoryName"
              // required
              options={sortedExtraCategorys}
              placeholder="Select mini Category"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdminCategoryforSeller;
