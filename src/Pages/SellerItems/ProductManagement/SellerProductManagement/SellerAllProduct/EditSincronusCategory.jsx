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
      dCat,
      setDCat
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
      const [storedId, setStoredId] = useState(null);
      const { data: darazOptionData, refetch: refetchDarazOptions } = useQuery({
            queryKey: [storedId],
            queryFn: async () => {
                const res = await fetch(
                    `http://localhost:5001/api/v1/category/seller/daraz-option/get/${shopInfo._id}/${storedId}`
                );
                const data = await res.json();
                if(data.daraz){
                  setDarazOption(data.daraz)
                }
            },
            enabled: !!storedId, // Only run if daraz_category_id is set
      });
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
                  return data || [];
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
                  return data || [];
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
                  return data || [];
            },
      });

      // Handlers for category changes
      const handleCategoryChange = (e) => {
            const category = e.value;
            const newDCat = [...dCat];  
            newDCat[0] = e.label.props['data-daraz'];  
            setDCat(newDCat);  
           
            setSelectedCategory(category);
            const darazCategoryId = megaCategories?.find(item => item.name === category)?.darazCategory_id;

            if (darazCategoryId) {
                  setPrimeCat(darazCategoryId);
                  setStoredId(darazCategoryId);
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
            const darazCategoryId = subCategories?.data?.find(item => item.subCategoryName === subcategory)?.darazSubCategory?.category_id;

            if (darazCategoryId) {
                  setPrimeCat(darazCategoryId);
                  setStoredId(darazCategoryId);
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
            const darazCategoryId = miniCategories?.data?.find(item => item.miniCategoryName === minicategory)?.darazCategory_id;
             
            if (darazCategoryId) {
                  setPrimeCat(darazCategoryId);
                  setStoredId(darazCategoryId);
                  refetchDarazOptions(); 
            }
            setSelectedExtracategory(null);
      };

      const handleExtracategoryChange = (e) => {
            const extracategory = e.value;
            const newDCat = [...dCat];  
            newDCat[3] = e.label.props['data-daraz'];  
            setDCat(newDCat);  
console.log(dCat,'dCat')
            setSelectedExtracategory(extracategory);
            const darazCategoryId = extraCategories?.data?.find(item => item.extraCategoryName === extracategory)?.darazCategory_id;
            
            if (darazCategoryId) {
                  setPrimeCat(darazCategoryId);
                  setStoredId(darazCategoryId);
                  refetchDarazOptions(); 
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
                              {product?.oldId && product?.dCat && (
                                    <>
                                    Suggest daraz category : {product?.dCat?.join(" => ")}
                                    </>
                              )}
                              <div className="grid md:grid-cols-4 mt-3 items-center gap-4">
                                    <Select
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
                                                    <div  data-daraz={parsedData.name || 'unknown'} >
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
                                          value={selectedCategory ? { label: selectedCategory, value: selectedCategory } : null}
                                    />

                                    <Select
                                          name="subCategory"
                                          onChange={(e) => handleSubcategoryChange(e)}
                                          placeholder="Select Subcategory"
                                          options={subCategories?.data?.filter((subCategory) => subCategory.trash !== true)
                                                .map((subCategory) => {
                                                const parsedDarazSubCategory = subCategory.darazSubCategory ? JSON.parse(subCategory.darazSubCategory) : {};
                                                const parsedData = parsedDarazSubCategory || {}; // Fallback to empty object if undefined
                                                const isSynced = !!subCategory.darazCategory_id;
                                                const color = isSynced ? !parsedData.leaf ? 'orange' : isSynced ? 'green' : 'red' : 'red';
                                              
                                                return {
                                                value: subCategory.subCategoryName,
                                                label: (
                                                      <div data-daraz={parsedData.name || 'unknown'}>
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
                                          value={selectedSubcategory ? { label: selectedSubcategory, value: selectedSubcategory } : null}
                                          isDisabled={!selectedCategory}
                                    />

                                    <Select
                                          name="miniCategory"
                                          onChange={(e) => handleMinicategoryChange(e)}
                                          placeholder="Select Mini Category"
                                          options={miniCategories?.data?.filter((miniCategory) => miniCategory.trash !== true)
                                                .map((miniCategory) => {
      
                                                const parsedDarazExtraCategory = miniCategory.darazMiniCategory ? JSON.parse(miniCategory.darazMiniCategory) : {};
                                                const parsedData = parsedDarazExtraCategory.child || {}; // Fallback to empty object if undefined
                                                const isSynced = !!miniCategory.darazMiniCategory;
                                                const color = isSynced ? !parsedData.leaf ? 'orange' : isSynced ? 'green' : 'red' : 'red';
                                        

                                                return {
                                                      value: miniCategory.miniCategoryName,
                                                      label: (
                                                            <div data-daraz={parsedData.name || 'unknown'}>
                                                            {miniCategory.miniCategoryName}
                                                            <span style={{ color }}>
                                                            {isSynced
                                                                  ? `(sync with ${parsedData.name})`
                                                                  : '(not sync)'}
                                                            </span>
                                                            </div>
                                                      ),
                                                };
                                          })}
                                          value={selectedMinicategory ? { label: selectedMinicategory, value: selectedMinicategory } : null}
                                          isDisabled={!selectedSubcategory}
                                    />

                                    <Select
                                          name="extraCategory"
                                          onChange={(e) => handleExtracategoryChange(e)}
                                          placeholder="Select Extra Category"
                                          options={extraCategories?.data?.filter((extraCategory) => extraCategory.trash !== true).map((extraCategory) => {

                                                const parsedDarazExtraCategory = extraCategory.darazExtraCategory ? JSON.parse(extraCategory.darazExtraCategory) : {};
                                                const parsedData = parsedDarazExtraCategory.data || {}; // Fallback to empty object if undefined
                                                const isSynced = !!extraCategory.darazExtraCategory;
                                                const color = isSynced ? !parsedData.leaf ? 'orange' : isSynced ? 'green' : 'red' : 'red';
                                        
                                                return {
                                                      value: extraCategory.extraCategoryName,
                                                      label: (
                                                            <div data-daraz={parsedData.name || 'unknown'}>
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
                                          value={selectedExtracategory ? { label: selectedExtracategory, value: selectedExtracategory } : null}
                                          isDisabled={!selectedMinicategory}
                                    />
                              </div>
                        </div>

                        {/* Admin Category Section */}
                        {!product?.oldId &&  multiVendor === true  &&  (
                         <EditAdminCategoryforSeller product={product} />
                        )}
                       
                  </div>
            </div>
      );
};

export default EditSincronusCategory;
