import React, { useEffect, useMemo } from "react";
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


      const {
            data: allSubCategories = [],
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
            },
      });

      console.log(allSubCategories, 'allSubCategories');

      const option =
            megaCategories
                  ?.filter((itm) => itm?.status === "true")
                  .map((itm) => ({
                        value: itm._id,
                        label: itm.name,
                  })) || [];

      const [subCategorys, setSubCategorys] = useState([]);

      useEffect(() => {
            setSubCategorys(allSubCategories);
      }, [allSubCategories]);

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




      const [sortedWarehouses, setSortedWarehouses] = useState([]);
      useEffect(() => {
            setSortedWarehouses(subCategorys)
      }, [subCategorys]);

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
                  return data.rows;
            },
      });


      const [miniCategories, setMiniCategories] = useState([]);

      useEffect(() => {
            setMiniCategories(allMiniCategories || []);

      }, [allMiniCategories]);

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
            },
      });
      const [extraCategorys, setExtraCategorys] = useState(
            []
      );



      useEffect(() => {
            setExtraCategorys(allExtraCategories || []);

      }, [allExtraCategories]);

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
      // const defaultMegaCategory = option?.find(
      //       (item) => item.value === (product?.adminCategory?.[0] || null)
      // );




      // const defaultSubCategory =
      //       product?.adminCategory?.length > 1 &&
      //       subcategoryOption?.find(
      //             (item) => item.value === (product?.adminCategory?.[1] || null)
      //       );
      // const defaultMiniCategory =
      //       product?.adminCategory?.length > 2 &&
      //       optionsMiniCategorys?.find(
      //             (item) => item.value === (product?.adminCategory?.[2] || null)
      //       );

      // const defaultExtraCategory =
      //       product?.adminCategory?.length > 3 &&
      //       optionExtraCategorys?.find(
      //             (item) => item.value === (product?.adminCategory?.[3] || null)
      //       );


      const defaultMegaCategory = useMemo(
            () => option?.find((item) => item.value === product?.adminCategory?.[0]) || null,
            [option, product?.adminCategory]
      );

      const defaultSubCategory = useMemo(
            () =>
                  product?.adminCategory?.length > 1
                        ? subcategoryOption?.find((item) => item.value === product?.adminCategory?.[1])
                        : null,
            [subcategoryOption, product?.adminCategory, subCategorys]
      );

      console.log(defaultSubCategory, 'defaultSubCategory');

      const defaultMiniCategory = useMemo(
            () =>
                  product?.adminCategory?.length > 2
                        ? optionsMiniCategorys?.find((item) => item.value === product?.adminCategory?.[2])
                        : null,
            [optionsMiniCategorys, product?.adminCategory]
      );

      const defaultExtraCategory = useMemo(
            () =>
                  product?.adminCategory?.length > 3
                        ? optionExtraCategorys?.find((item) => item.value === product?.adminCategory?.[3])
                        : null,
            [optionExtraCategorys, product?.adminCategory]
      );

      // Use optional chaining and default to handle undefined cases
      if (loadingAllSub) return <div>Loading...</div>;

      return (
            <div className="lg:pr-10 mt-4 w-full mx-auto bar overflow-auto border border-black rounded p-6">
                  <h3 className=""><b>Doob Category</b> </h3>
                  {console.log(defaultMegaCategory, defaultSubCategory, 'defaultMegaCategory')}
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

                                          name="adminSubCategory"
                                          onChange={onHandleMiniCategorys}

                                          options={subcategoryOption}
                                          placeholder="Select sub Category"
                                          value={defaultSubCategory}
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
                                          value={defaultMiniCategory}
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
                                          value={defaultExtraCategory}
                                    />
                              </div>
                        </div>
                  </div>
                  <input  defaultValue={product.product_note || ''}  type="text" name="product_note"  id="product_note" placeholder="note for product page" className="w-[100%] mt-2 border px-2 py-2 rounded" />
            </div>
      );
};

export default EditAdminCategoryforSeller;
