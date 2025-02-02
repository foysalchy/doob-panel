import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Select from "react-select";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import showAlert from "../../../../../Common/alert";

const AdminCategoryforSeller = ( ) => {
      const navigate = useNavigate();
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
      };
      const sortedWarehouses = subCategorys?.filter(
            (warehouse) => warehouse?.status === "true"
      );

      const subcategoryOption = sortedWarehouses?.map((warehouse) => ({
            value: warehouse._id,
            label: warehouse.subCategory,
      }));

      const [miniCategorys, setMiniCategorys] = useState([]);
      const onHandleMiniCategorys = (selectedOption) => {
            setMiniCategorys([]);
            const optionId = selectedOption.value;
            fetch(
                  `https://doob.dev/api/v1/admin/category/miniCategory?id=${optionId}`
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
            ?.filter((warehouse) => warehouse?.status === "true")
            .map((itm) => ({
                  value: itm._id,
                  label: itm.miniCategoryName,
            }));

      // extra category
      const [extraCategorys, setExtraCategorys] = useState([]);
      const onHandleExtraCategorys = (selectedOption) => {
            setExtraCategorys([]);
            const optionId = selectedOption.value;
            // console.log(`https://doob.dev/api/v1/admin/category/extraCategory?id=${optionId}`);
            fetch(
                  `https://doob.dev/api/v1/admin/category/extraCategory?id=${optionId}`
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
            ?.filter((warehouse) => warehouse?.status === "true")
            .map((itm) => ({
                  value: itm._id,
                  label: itm.extraCategoryName,
            }));

      return (
            <div className="lg:pr-10 mt-4 w-full mx-auto bar overflow-auto border border-black rounded p-6">
                  <h3 className=""><b>Doob Category</b> </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-4 items-center gap-2 mt-2">

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
                                    name="adminMegaCategory"
                                    required
                                    onChange={handleSelectChange}
                                    options={option}
                                    placeholder="Select Mega Category"
                              />
                        </div>

                        {subcategoryOption.length ? <div className=" ">
                              <div className="">
                                    <label className="text-sm">Select Sub Category</label>
                                    <Select
                                          required
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
                                          name="adminSubCategory"
                                          onChange={onHandleMiniCategorys}
                                          // required
                                          options={subcategoryOption}
                                          placeholder="Select sub Category"
                                    />
                              </div>
                        </div> : ''}

                        {sortedMiniCategorys.length ? <div className=" ">
                              <div className="">
                                    <label className="text-sm">Select Mini Category</label>
                                    <Select
                                          required
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
                                          name="adminMiniCategory"
                                          // required
                                          options={sortedMiniCategorys}
                                          placeholder="Select mini Category"
                                    />
                              </div>
                        </div> : ''
                        }
                        {sortedExtraCategorys.length ? <div className=" ">
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
                                          name="adminExtraCategory"
                                          // required
                                          options={sortedExtraCategorys}
                                          placeholder="Select mini Category"
                                    />
                              </div>
                        </div> : ''}
                  </div>
                  
                  <input    type="text" name="product_note"  id="product_note" placeholder="note for product page" className="w-[100%] mt-2 border px-2 py-2 rounded" />
            </div>
      );
};

export default AdminCategoryforSeller;
