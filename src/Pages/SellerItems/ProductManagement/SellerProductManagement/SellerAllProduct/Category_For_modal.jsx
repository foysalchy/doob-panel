import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useContext, useState, useEffect } from "react";
import Select from "react-select";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import LoaderData from "../../../../../Common/LoaderData";

const Category_For_modal = ({
      daraz,
      setDaraz,
      woo,
      setWoo,
      setInputFields,
      setDarazOption,
      setPrimeCat,
      multiVendor,
      setMultiVendor,
      dCat,
      setDCat
}) => {
      const { shopInfo } = useContext(AuthContext);
      const [selectedCategory, setSelectedCategory] = useState(null);
      const [selectedSubcategory, setSelectedSubcategory] = useState(null);
      const [selectedMinicategory, setSelectedMinicategory] = useState(null);
      const [selectedExtracategory, setSelectedExtracategory] = useState(null);
      const [darazCategoryId, setDarazCategoryId] = useState(null);

      // Memoized callback for setDarazOption
      const setDarazOptionMemoized = useCallback((darazData) => {
            setDarazOption(darazData);
      }, [setDarazOption]);

      // Load mega categories
      const { data: megaCategories = [], refetch: refetchMegaCategories, isFetching: megaCategoriesLoading } =
            useQuery({
                  queryKey: ['megaCategory'],
                  queryFn: async () => {
                        const res = await fetch(
                              `https://doob.dev/api/v1/category/seller/mega-category/get/${shopInfo._id}`
                        );
                        const data = await res.json();
                        return data || [];
                  },
            });


      // Load subcategories based on selected mega category
      const { data: subCategories = [], refetch: refetchSubCategories, isFetching: subCategoriesLoading } = useQuery({
            queryKey: ['subCategories', selectedCategory],
            enabled: !!selectedCategory,
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/category/seller/sub-category/get/${shopInfo._id}/${selectedCategory}`
                  );
                  const data = await res.json();
                  return data || [];
            },
      });

      // Load mini categories based on selected subcategory
      const { data: miniCategories = [], refetch: refetchMiniCategories, isFetching: miniCategoriesLoading } =
            useQuery({
                  queryKey: ['miniCategories', selectedSubcategory],
                  enabled: !!selectedSubcategory,
                  queryFn: async () => {
                        const res = await fetch(
                              `https://doob.dev/api/v1/category/seller/mini-category/get/${shopInfo._id}/${selectedSubcategory}`
                        );
                        const data = await res.json();

                        return data || [];
                  },
            });

      // Load extra categories based on selected mini category
      const { data: extraCategories = [], refetch: refetchExtraCategories, isFetching: extraCategoriesLoading } =
            useQuery({
                  queryKey: ['extraCategories', selectedMinicategory],
                  enabled: !!selectedMinicategory,
                  queryFn: async () => {
                        const res = await fetch(
                              `https://doob.dev/api/v1/category/seller/extra-category/get/${shopInfo._id}/${selectedMinicategory}`
                        );
                        const data = await res.json();

                        return data || [];
                  },
            });

      const { data: darazOptionData, refetch: refetchDarazOptions } = useQuery({
            queryKey: [darazCategoryId],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/category/seller/daraz-option/get/${shopInfo._id}/${darazCategoryId}`
                  );
                  const data = await res.json();
                  if (data.daraz) {
                        setDarazOption(data.daraz)
                  }
            },
            enabled: !!darazCategoryId, // Only run if daraz_category_id is set
      });
      //    dlers for category changes
      const handleCategoryChange = (e) => {
            const category = e.value;
            const newDCat = [...dCat];
            newDCat[0] = e.label.props['data-daraz'];
            setDCat(newDCat);
            setSelectedCategory(category);
            const daraz_category_id = megaCategories?.filter(
                  (item) => item.name === category
            )[0].darazCategory_id;

            if (daraz_category_id) {

                  setPrimeCat(daraz_category_id);
                  setDarazCategoryId(daraz_category_id);
                  refetchDarazOptions();
            }

            setSelectedSubcategory(null);
            setSelectedMinicategory(null);
            setSelectedExtracategory(null);

      };

      const handleSubcategoryChange = (e) => {
            const subcategory = e.value;

            const newDCat = [...dCat];
            newDCat[1] = e.label.props['data-daraz'];
            setDCat(newDCat);
            setSelectedSubcategory(subcategory);
            console.log('hit')
            const daraz_category_id = subCategories?.data
                  ?.filter((item) => item.subCategoryName === subcategory)
                  .map((item) => {
                        try {
                              // Parse the JSON string only if it is not empty
                              return item.darazSubCategory ? JSON.parse(item.darazSubCategory) : {};
                        } catch (error) {
                              console.error("Error parsing JSON:", error, "for item:", item);
                              return {}; // Return an empty object if parsing fails
                        }
                  })[0]?.category_id; // Access the category_id safely

            if (daraz_category_id) {
                  setPrimeCat(daraz_category_id);
                  setDarazCategoryId(daraz_category_id);
                  refetchDarazOptions();

            }
            setSelectedMinicategory(null);
            setSelectedExtracategory(null);
      };

      const handleMinicategoryChange = (e) => {
            const minicategory = e.value;
            const newDCat = [...dCat];
            newDCat[2] = e.label.props['data-daraz'];
            setDCat(newDCat);
            setSelectedMinicategory(minicategory);
            const daraz_category_id = miniCategories?.data?.filter(
                  (item) => item.miniCategoryName === minicategory
            )[0].darazCategory_id;
            if (daraz_category_id) {
                  setPrimeCat(daraz_category_id);
                  setDarazCategoryId(daraz_category_id);
                  refetchDarazOptions();
            }
            setSelectedExtracategory(null);
      };
      console.log(miniCategories, 'megaCategoriesx')
      const handleExtracategoryChange = (e) => {
            const extracategory = e.value;
            const newDCat = [...dCat];
            newDCat[3] = e.label.props['data-daraz'];
            setDCat(newDCat);
            setSelectedExtracategory(extracategory);

            const daraz_category_id = extraCategories?.data?.filter(
                  (item) => item.extraCategoryName === extracategory
            )[0].darazCategory_id;
            if (daraz_category_id) {
                  setPrimeCat(daraz_category_id);
                  setDarazCategoryId(daraz_category_id);
                  refetchDarazOptions();
            }
      };


      useEffect(() => {
            if (megaCategoriesLoading) {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  setSelectedMinicategory(null);
                  setSelectedExtracategory(null);
            }
            if (subCategoriesLoading) {
                  setSelectedSubcategory(null);
                  setSelectedMinicategory(null);
                  setSelectedExtracategory(null);
            }
            if (miniCategoriesLoading) {
                  setSelectedMinicategory(null);
                  setSelectedExtracategory(null);
            }
            if (extraCategoriesLoading) {
                  setSelectedExtracategory(null);
            }
      }, [megaCategoriesLoading, subCategoriesLoading, miniCategoriesLoading, extraCategoriesLoading]);

      return (
            <div>
                  <div className="border mt-4 border-gray-400 md:px-10 px-3 py-5 w-full bg-gray-100 rounded">

                        <div className="flex items-start flex-col mt-3">
                              <span>
                                    Category Information <span className="text-red-500"> *</span>
                              </span>
                              <div className="grid md:grid-cols-4 mt-3 items-center gap-4">
                                    {megaCategoriesLoading ? <LoaderData /> : <Select
                                          name="megaCategory"
                                          onChange={(e) => handleCategoryChange(e)}
                                          placeholder="Select Category"
                                          options={megaCategories?.filter((megaCategory) => megaCategory.trash !== true)
                                                .map((megaCategory) => {
                                                      const parsedDarazCategory = megaCategory.darazCategory ? JSON.parse(megaCategory.darazCategory) : {};
                                                      const parsedData = parsedDarazCategory || {}; // Fallback to an empty object if undefined
                                                      const isSynced = !!megaCategory.darazCategory_id;
                                                      const color = isSynced ? !parsedData.leaf ? 'orange' : isSynced ? 'green' : 'red' : 'red';

                                                      return {
                                                            value: megaCategory.name,
                                                            label: (
                                                                  <div data-daraz={parsedData.name || 'unknown'} >
                                                                        {megaCategory.name}
                                                                        <span style={{ color }}>
                                                                              {isSynced
                                                                                    ? `(sync with ${parsedData.name || 'unknown'})` // Fallback to 'unknown' if name is missing
                                                                                    : '(not sync)'}
                                                                        </span>
                                                                  </div>
                                                            ),
                                                      };
                                                })}

                                          className=""
                                    />}
                                    {subCategoriesLoading ? <LoaderData /> : <div>
                                          {subCategories?.data?.filter((subCategory) => subCategory.trash !== true).length ? (
                                                <Select
                                                      name="subCategory"
                                                      onChange={(e) => handleSubcategoryChange(e)}
                                                      placeholder="Select SubCategory"
                                                      options={subCategories?.data?.filter((subCategory) => subCategory.trash !== true)
                                                            .map((subCategory) => {
                                                                  const parsedDarazSubCategory = subCategory.darazSubCategory ? JSON.parse(subCategory.darazSubCategory) : {};
                                                                  const parsedData = parsedDarazSubCategory || {}; // Fallback to empty object if undefined
                                                                  const isSynced = !!subCategory.darazCategory_id;
                                                                  const color = isSynced ? !parsedData.leaf ? 'orange' : isSynced ? 'green' : 'red' : 'red';

                                                                  return {
                                                                        value: subCategory.subCategoryName,
                                                                        label: (
                                                                              <div data-daraz={parsedData.name || 'unknown'} >
                                                                                    {subCategory.subCategoryName}
                                                                                    <span style={{ color }}>
                                                                                          {isSynced
                                                                                                ? `(sync with ${parsedData.name || 'unknown'})`  // Safely access name
                                                                                                : '(not sync)'}
                                                                                    </span>
                                                                              </div>
                                                                        ),
                                                                  };
                                                            })}

                                                />
                                          ) : ''}
                                    </div>}
                                    {miniCategoriesLoading ? <LoaderData /> : <div>
                                          {miniCategories?.data?.filter((miniCategory) => miniCategory.trash !== true).length ? (
                                                <Select
                                                      name="miniCategory"
                                                      placeholder="Select MiniCategory"
                                                      onChange={(e) => handleMinicategoryChange(e)}

                                                      options={miniCategories?.data?.filter((miniCategory) => miniCategory.trash !== true)
                                                            .map((miniCategory) => {

                                                                  const parsedDarazExtraCategory = miniCategory.darazMiniCategory ? JSON.parse(miniCategory.darazMiniCategory) : {};
                                                                  const parsedDatax = parsedDarazExtraCategory.child || {}; // Fallback to empty object if undefined
                                                                  const isSynced = !!miniCategory.darazMiniCategory;
                                                                  const color = isSynced ? !parsedDatax.leaf ? 'orange' : isSynced ? 'green' : 'red' : 'red';


                                                                  return {
                                                                        value: miniCategory.miniCategoryName,
                                                                        label: (
                                                                              <div data-daraz={parsedDatax.name || 'unknown'} >
                                                                                    {miniCategory.miniCategoryName}
                                                                                    <span style={{ color }}>
                                                                                          {isSynced
                                                                                                ? `(sync with ${parsedDatax.name}  ${parsedDatax.category_id})`
                                                                                                : '(not sync)'}
                                                                                    </span>
                                                                              </div>
                                                                        ),
                                                                  };
                                                            })}

                                                />
                                          ) : ''}
                                    </div>}
                                    {extraCategoriesLoading ? <LoaderData /> : <div>
                                          {extraCategories?.data?.filter((extraCategory) => extraCategory.trash !== true).length ? (
                                                <Select
                                                      name="extraCategory"
                                                      placeholder="Select ExtraCategory"
                                                      onChange={(e) => handleExtracategoryChange(e)}
                                                      options={extraCategories?.data?.filter((extraCategory) => extraCategory.trash !== true).map((extraCategory) => {
                                                            const parsedDarazExtraCategory = extraCategory.darazExtraCategory ? JSON.parse(extraCategory.darazExtraCategory) : {};
                                                            const parsedData = parsedDarazExtraCategory.data || {}; // Fallback to empty object if undefined
                                                            const isSynced = !!extraCategory.darazExtraCategory;
                                                            const color = isSynced ? !parsedData.leaf ? 'orange' : isSynced ? 'green' : 'red' : 'red';

                                                            return {
                                                                  value: extraCategory.extraCategoryName,
                                                                  label: (
                                                                        <div data-daraz={parsedData.name || 'unknown'} >
                                                                              {extraCategory.extraCategoryName}
                                                                              <span style={{ color }}>
                                                                                    {isSynced
                                                                                          ? `(sync with ${parsedData.name})`
                                                                                          : '(not sync)'}
                                                                              </span>
                                                                        </div>
                                                                  ),
                                                            };
                                                      })}

                                                />
                                          ) : ''}
                                    </div>}
                              </div>

                              <div className="mt-4">
                                    <strong>Selected Categories:</strong>
                                    <span className="ml-4">
                                          {selectedCategory && selectedCategory}
                                          {selectedSubcategory && ` > ${selectedSubcategory}`}
                                          {selectedMinicategory && ` > ${selectedMinicategory} `}
                                          {selectedExtracategory && ` > ${selectedExtracategory}`}
                                    </span>
                              </div>

                        </div>
                  </div>
            </div>
      );
};

export default Category_For_modal;
