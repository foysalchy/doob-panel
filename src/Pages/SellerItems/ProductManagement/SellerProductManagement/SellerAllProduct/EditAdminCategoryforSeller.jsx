import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EditAdminCategoryforSeller = ({ product }) => {

      const navigate = useNavigate();
      const handleGoBack = () => {
            navigate(-1); // This will go back to the previous page
      };

      // console.log(miniCategories);

      let megaCategoryUrl = `https://doob.dev/api/v1/admin/category/megacategory`;

      const {
            data: megaCategories = [],
            refetch,
            isLoading: loadingMega,
      } = useQuery({
            queryKey: ["megaCategories"],
            queryFn: async () => {
                  const res = await fetch(megaCategoryUrl);
                  const data = await res.json();
                  return data.rows;

                  return [];
            },
      });
      // console.log(miniCategorys);

      const {
            data: allSubCategories = [],
            // refetch,
            isLoading: loadingAllSub,
      } = useQuery({
            queryKey: ["allSubCategoriesData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/category/subcategories`
                  );
                  const data = await res.json();
                  // console.log(data);
                  return data.rows;

                  return [];
            },
      });

      // console.log(allSubCategories);

      const option =
            megaCategories
                  ?.filter((itm) => itm?.status === "true")
                  .map((itm) => ({
                        value: itm._id,
                        label: itm.name,
                  })) || [];

      const [subCategorys, setSubCategorys] = useState(allSubCategories || []);

      console.log(subCategorys, "subCategorys");
      const handleSelectChange = (selectedOption) => {
            setSubCategorys([]);
            const optionId = selectedOption.value;
            fetch(`https://doob.dev/api/v1/admin/category/subcategory?id=${optionId}`)
                  .then((res) => res.json())
                  .then((data) => {
                        setSubCategorys(data.subCategory);
                        console.log(data, ">>>>>");
                  })
                  .catch((error) => {
                        console.error("Error:", error);
                  });
      };

      // console.log(subCategorys);
      const sortedWarehouses = subCategorys?.filter(
            (warehouse) => warehouse?.status === "true"
      );

      const subcategoryOption = sortedWarehouses?.map((warehouse) => ({
            value: warehouse._id,
            label: warehouse.subCategory,
      }));

      // console.log(subcategoryOption);

      const {
            data: allMiniCategories = [],
            // refetch,
            isLoading: loadingAllMini,
      } = useQuery({
            queryKey: ["allMiniCategoriesData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/category/miniCategories`
                  );
                  const data = await res.json();
                  // console.log(data);
                  return data.rows;

                  return [];
            },
      });

      // console.log(allMiniCategories);

      const [miniCategories, setMiniCategories] = useState(allMiniCategories || []);

      const onHandleMiniCategorys = (selectedOption) => {
            setMiniCategories([]);
            const optionId = selectedOption.value;
            fetch(`https://doob.dev/api/v1/admin/category/miniCategory?id=${optionId}`)
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data, ">>>>>");
                        setMiniCategories(data.row);
                  })
                  .catch((error) => {
                        console.error("Error:", error);
                  });
      };

      // console.log(miniCategories);

      const optionsMiniCategorys = miniCategories
            ?.filter((warehouse) => warehouse?.status === "true")
            .map((itm) => ({
                  value: itm._id,
                  label: itm.miniCategoryName,
            }));

      // extra category

      const {
            data: allExtraCategories = [],
            // refetch,
            isLoading: loadingAllExtra,
      } = useQuery({
            queryKey: ["allExtraCategoriesData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/category/extraCategories`
                  );
                  const data = await res.json();
                  // console.log(data);
                  return data.rows;

                  return [];
            },
      });
      const [extraCategorys, setExtraCategorys] = useState(
            allExtraCategories || []
      );

      const onHandleExtraCategorys = (selectedOption) => {
            setExtraCategorys([]);
            const optionId = selectedOption.value;
            // console.log(`https://doob.dev/api/v1/admin/category/extraCategory?id=${optionId}`);
            fetch(`https://doob.dev/api/v1/admin/category/extraCategory?id=${optionId}`)
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data, ">>>>>");
                        setExtraCategorys(data.rows);
                  })
                  .catch((error) => {
                        console.error("Error:", error);
                  });
      };
      const optionExtraCategorys = extraCategorys
            ?.filter((warehouse) => warehouse?.status === "true")
            .map((itm) => ({
                  value: itm._id,
                  label: itm.extraCategoryName,
            }));


      // Ensure product and product.adminCategory are defined before accessing
      const defaultMegaCategory = option?.find(
            (item) => item.value === (product?.adminCategory?.[0] || null)
      );

      console.log(product?.adminCategory?.[0], defaultMegaCategory, 'defaultMegaCategory');

      const defaultSubCategory =
            product?.adminCategory?.length > 1 &&
            subcategoryOption?.find(
                  (item) => item.value === (product?.adminCategory?.[1] || null)
            );

      const defaultMiniCategory =
            product?.adminCategory?.length > 2 &&
            optionsMiniCategorys?.find(
                  (item) => item.value === (product?.adminCategory?.[2] || null)
            );

      const defaultExtraCategory =
            product?.adminCategory?.length > 3 &&
            optionExtraCategorys?.find(
                  (item) => item.value === (product?.adminCategory?.[3] || null)
            );

      // Use optional chaining and default to handle undefined cases


      return (
            <div className="lg:pr-10 mt-4 w-full mx-auto bar overflow-auto border border-black rounded p-6">
                  <h3 className=""><b>Doob Category</b> </h3>
                  <div className="grid grid-cols-4 items-center gap-2 mt-2">

                        <div className="">
                              <label className="text-sm">Select Mega Category</label>
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
                                    isLoading={loadingMega}
                                    defaultValue={defaultMegaCategory}
                                    name="adminMegaCategory"

                                    onChange={handleSelectChange}
                                    options={option}
                                    placeholder="Select Mega Category"
                              />
                        </div>

                        <div className=" ">
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
                                          // defaultValue={{
                                          //   label: product?.categories[1]?.name,
                                          //   value: product?.categories[1]?.name,
                                          // }}
                                          // value={subCategorys}
                                          name="adminSubCategory"
                                          onChange={onHandleMiniCategorys}

                                          options={subcategoryOption}
                                          placeholder="Select sub Category"
                                          defaultValue={defaultSubCategory}
                                    />
                              </div>
                        </div>

                        <div className=" ">
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
                                          // value={miniCategorys}
                                          // defaultValue={{
                                          //   label: product?.categories[2]?.name,
                                          //   value: product?.categories[2]?.name,
                                          // }}
                                          name="adminMiniCategory"
                                          // required
                                          options={optionsMiniCategorys}
                                          placeholder="Select mini Category"
                                          defaultValue={defaultMiniCategory}
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
                                          // value={extraCategorys}
                                          // defaultValue={{
                                          //   label: product?.categories[3]?.name,
                                          //   value: product?.categories[3]?.name,
                                          // }}
                                          name="adminExtraCategory"
                                          // required
                                          options={optionExtraCategorys}
                                          placeholder="Select mini Category"
                                          defaultValue={defaultExtraCategory}
                                    />
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default EditAdminCategoryforSeller;
