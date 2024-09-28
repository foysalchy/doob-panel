import { useQuery } from "@tanstack/react-query";
import React, { useContext, useCallback, useState, useEffect } from "react";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import Select from "react-select";
import EditAdminCategoryforSeller from "./EditAdminCategoryforSeller";

const EditSincronusCategory = ({
      product,
      daraz,
      setDaraz,
      woo,
      setWoo,
      setPrimeCat,
      setDarazOption,
      multiVendor,
      setMultiVendor,
}) => {
      const { shopInfo } = useContext(AuthContext);

      // Category states
      const [selectedCategory, setSelectedCategory] = useState(
            product?.categories?.[0]?.name ?? null
      );
      const [selectedSubcategory, setSelectedSubcategory] = useState(
            product?.categories?.[1]?.name ?? null
      );
      const [selectedMinicategory, setSelectedMinicategory] = useState(
            product?.categories?.[2]?.name ?? null
      );
      const [selectedExtracategory, setSelectedExtracategory] = useState(
            product?.categories?.[3]?.name ?? null
      );

      // Memoized function to set Daraz options
      const setDarazOptionMemoized = useCallback((darazData) => {
            setDarazOption(darazData);
      }, [setDarazOption]);

      // Fetch mega categories
      const { data: megaCategories = [], refetch: refetchMegaCategories } = useQuery({
            queryKey: ["megaCategory_edit"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/category/seller/mega-category/get/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data || [];
            },
      });



      // Fetch subcategories based on selected mega category
      const { data: subCategories = [], refetch: refetchSubCategories } = useQuery({
            queryKey: ["subCategories", selectedCategory],
            enabled: !!selectedCategory,
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/category/seller/sub-category/get/${shopInfo._id}/${selectedCategory}`
                  );
                  const data = await res.json();
                  setDarazOptionMemoized(data?.daraz);
                  return data?.data || [];
            },
      });

      // Fetch mini categories based on selected subcategory
      const { data: miniCategories = [], refetch: refetchMiniCategories } = useQuery({
            queryKey: ["miniCategories", selectedSubcategory],
            enabled: !!selectedSubcategory,
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/category/seller/mini-category/get/${shopInfo._id}/${selectedSubcategory}`
                  );
                  const data = await res.json();
                  return data?.data || [];
            },
      });

      // Fetch extra categories based on selected mini category
      const { data: extraCategories = [], refetch: refetchExtraCategories } = useQuery({
            queryKey: ["extraCategories", selectedMinicategory],
            enabled: !!selectedMinicategory,
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/category/seller/extra-category/get/${shopInfo._id}/${selectedMinicategory}`
                  );
                  const data = await res.json();
                  return data?.data || [];
            },
      });

      // Handlers for category changes
      const handleCategoryChange = (category) => {
            setSelectedCategory(category);
            const darazCategoryId = megaCategories?.find(item => item.name === category)?.darazCategory_id;

            if (darazCategoryId) {
                  setPrimeCat(darazCategoryId);
            }
            setSelectedSubcategory(null);
            setSelectedMinicategory(null);
            setSelectedExtracategory(null);
      };

      const handleSubcategoryChange = (subcategory) => {
            setSelectedSubcategory(subcategory);
            const darazCategoryId = subCategories
                  ?.find(item => item.subCategoryName === subcategory)?.darazSubCategory?.category_id;

            if (darazCategoryId) {
                  setPrimeCat(darazCategoryId);
            }
            setSelectedMinicategory(null);
            setSelectedExtracategory(null);
      };

      const handleMinicategoryChange = (minicategory) => {
            setSelectedMinicategory(minicategory);
            const darazCategoryId = miniCategories?.find(item => item.miniCategoryName === minicategory)?.darazCategory_id;

            if (darazCategoryId) {
                  setPrimeCat(darazCategoryId);
            }
            setSelectedExtracategory(null);
      };

      const handleExtracategoryChange = (extracategory) => {
            setSelectedExtracategory(extracategory);
            const darazCategoryId = extraCategories?.find(item => item.extraCategoryName === extracategory)?.darazCategory_id;

            if (darazCategoryId) {
                  setPrimeCat(darazCategoryId);
            }
      };

      return (
            <div>
                  <div className="border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded">
                        <div className="flex md:flex-row flex-col justify-start gap-10">
                              {/* Daraz Sync */}
                              {shopInfo.darazLogin && (
                                    <div className="flex flex-col">
                                          <span className="font-bold">Sync with Daraz</span>
                                          <button type="button" className="flex justify-start mt-2">
                                                <span
                                                      onClick={() => setDaraz(false)}
                                                      className={daraz ? "px-4 py-2 bg-gray-600 text-white" : "px-4 py-2 bg-violet-400"}
                                                >
                                                      NO
                                                </span>
                                                <span
                                                      onClick={() => setDaraz(true)}
                                                      className={!daraz ? "px-4 py-2 bg-gray-600 text-white" : "px-4 py-2 bg-violet-400"}
                                                >
                                                      YES
                                                </span>
                                          </button>
                                    </div>
                              )}

                              {/* WooCommerce Sync */}
                              {shopInfo.wooLogin && (
                                    <div className="flex flex-col">
                                          <div className="flex flex-col justify-start">
                                                <span className="font-bold">Sync with WooCommerce</span>
                                                <button type="button" className="flex justify-start mt-2">
                                                      <span
                                                            onClick={() => setWoo(false)}
                                                            className={woo ? "px-4 py-2 bg-gray-600 text-white" : "px-4 py-2 bg-violet-400"}
                                                      >
                                                            NO
                                                      </span>
                                                      <span
                                                            onClick={() => setWoo(true)}
                                                            className={!woo ? "px-4 py-2 bg-gray-600 text-white" : "px-4 py-2 bg-violet-400"}
                                                      >
                                                            YES
                                                      </span>
                                                </button>
                                          </div>
                                    </div>
                              )}

                              {/* Multi Vendor Option */}
                              {!product?.oldId && (
                                    <div className="min-w-fit mb-4">
                                          <label className="text-sm" htmlFor="multiVendor">Sale Multi Vendor</label>
                                          <select
                                                defaultValue={product?.multiVendor === "true" || product?.multiVendor === true ? "true" : "false"}
                                                onChange={(e) => setMultiVendor(e.target.value === "true")}
                                                className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none"
                                                name="multiVendor"
                                                id="multiVendor"
                                          >
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                          </select>
                                    </div>
                              )}
                        </div>

                        {/* Category Selection */}
                        <div className="flex flex-col mt-3">
                              <span>Category Information <span className="text-red-500">*</span></span>
                              <div className="grid md:grid-cols-4 mt-3 items-center gap-4">
                                    <Select
                                          name="megaCategory"
                                          onChange={(e) => handleCategoryChange(e.value)}
                                          placeholder="Select Category"
                                          options={megaCategories?.map((megaCategory) => ({
                                                value: megaCategory.name,
                                                label: (
                                                      <div>
                                                            {megaCategory.name}
                                                            <span style={{ color: megaCategory.darazCategory ? 'green' : 'red' }}>
                                                                  {megaCategory.darazCategory ? '(sync)' : '(not sync)'}
                                                            </span>
                                                      </div>
                                                ),
                                          }))}
                                          value={selectedCategory ? { label: selectedCategory, value: selectedCategory } : null}
                                    />

                                    <Select
                                          name="subCategory"
                                          onChange={(e) => handleSubcategoryChange(e.value)}
                                          placeholder="Select Subcategory"
                                          options={subCategories?.map((subCategory) => ({
                                                value: subCategory.subCategoryName,
                                                label: subCategory.subCategoryName,
                                          }))}
                                          value={selectedSubcategory ? { label: selectedSubcategory, value: selectedSubcategory } : null}
                                          isDisabled={!selectedCategory}
                                    />

                                    <Select
                                          name="miniCategory"
                                          onChange={(e) => handleMinicategoryChange(e.value)}
                                          placeholder="Select Mini Category"
                                          options={miniCategories?.map((miniCategory) => ({
                                                value: miniCategory.miniCategoryName,
                                                label: miniCategory.miniCategoryName,
                                          }))}
                                          value={selectedMinicategory ? { label: selectedMinicategory, value: selectedMinicategory } : null}
                                          isDisabled={!selectedSubcategory}
                                    />

                                    <Select
                                          name="extraCategory"
                                          onChange={(e) => handleExtracategoryChange(e.value)}
                                          placeholder="Select Extra Category"
                                          options={extraCategories?.map((extraCategory) => ({
                                                value: extraCategory.extraCategoryName,
                                                label: extraCategory.extraCategoryName,
                                          }))}
                                          value={selectedExtracategory ? { label: selectedExtracategory, value: selectedExtracategory } : null}
                                          isDisabled={!selectedMinicategory}
                                    />
                              </div>
                        </div>

                        {/* Admin Category Section */}
                        <EditAdminCategoryforSeller product={product} />
                  </div>
            </div>
      );
};

export default EditSincronusCategory;
