import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import Select from "react-select";
import AdminCategoryforSeller from './AdminCategoryforSeller';

const SincronusCategory = ({
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


      // Memoized callback for setDarazOption
      const setDarazOptionMemoized = useCallback((darazData) => {
            setDarazOption(darazData);
      }, [setDarazOption]);

      // Load mega categories
      const { data: megaCategories = [], refetch: refetchMegaCategories } =
            useQuery({
                  queryKey: ['megaCategory'],
                  queryFn: async () => {
                        const res = await fetch(
                              `https://doob.dev/api/v1/category/seller/mega-category/get/${shopInfo._id}`
                        );
                        const data = await res.json();
                        if (data?.daraz) {
                              setDarazOptionMemoized(data.daraz);
                        }
                        return data || [];
                  },
            });


      // Load subcategories based on selected mega category
      const { data: subCategories = [], refetch: refetchSubCategories } = useQuery({
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
      const { data: miniCategories = [], refetch: refetchMiniCategories } =
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
      const { data: extraCategories = [], refetch: refetchExtraCategories } =
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

      // Handlers for category changes
      const handleCategoryChange =  (e) => {
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
                  if (megaCategories?.daraz) {
                        setDarazOptionMemoized(megaCategories.daraz);
                  }
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
                  if (subCategories?.daraz) {
                        setDarazOptionMemoized(subCategories.daraz);
                  }

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
                  if (miniCategories?.daraz) {
                        setDarazOptionMemoized(miniCategories.daraz);
                  }
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
                  if (extraCategories?.daraz) {
                        setDarazOptionMemoized(extraCategories.daraz);
                  }
            }
      };


      return (
            <div>
                  <div className="border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded">
                        <div className="flex md:flex-row flex-col justify-start gap-10">
                              {shopInfo.darazLogin && (
                                    <div className="flex flex-col ">
                                          <span className="font-bold">Sync with Daraz </span>
                                          <button type="button" className="flex justify-start mt-2">
                                                <span
                                                      onClick={() => {
                                                            setDaraz(false);
                                                            setInputFields([
                                                                  {
                                                                        name: null,
                                                                        image: null,
                                                                        quantity: "",
                                                                        SKU: "",
                                                                        price: null,
                                                                        offerPrice: null,
                                                                        ability: false,
                                                                        vendor: false,
                                                                  },
                                                            ]);
                                                      }}
                                                      className={
                                                            daraz
                                                                  ? "px-4 py-2 bg-gray-600 text-white "
                                                                  : "px-4 py-2 bg-violet-400"
                                                      }
                                                >
                                                      NO
                                                </span>
                                                <span
                                                      onClick={() => {
                                                            setDaraz(true);
                                                            setInputFields([
                                                                  {
                                                                        name: null,
                                                                        image: null,
                                                                        quantity: "",
                                                                        SKU: "",
                                                                        price: null,
                                                                        offerPrice: null,
                                                                        ability: false,
                                                                        vendor: false,
                                                                  },
                                                            ]);
                                                      }}
                                                      className={
                                                            !daraz
                                                                  ? "px-4 py-2 bg-gray-600 text-white "
                                                                  : "px-4 py-2 bg-violet-400"
                                                      }
                                                >
                                                      YES
                                                </span>
                                          </button>
                                    </div>
                              )}
                              {shopInfo.wooLogin && (
                                    <div className="flex flex-col ">
                                          <div className="flex flex-col justify-start">
                                                <span className="font-bold">
                                                      Sync with WooCommerce{" "}
                                                </span>
                                                <button type="button" className="flex justify-start mt-2">
                                                      <span
                                                            onClick={() => setWoo(false)}
                                                            className={
                                                                  woo
                                                                        ? "px-4 py-2 bg-gray-600 text-white "
                                                                        : "px-4 py-2 bg-violet-400"
                                                            }
                                                      >
                                                            NO
                                                      </span>
                                                      <span
                                                            onClick={() => setWoo(true)}
                                                            className={
                                                                  !woo
                                                                        ? "px-4 py-2 bg-gray-600 text-white "
                                                                        : "px-4 py-2 bg-violet-400"
                                                            }
                                                      >
                                                            YES
                                                      </span>
                                                </button>
                                          </div>
                                    </div>
                              )}
                              <div className="min-w-fit mb-4">
                                    <label className="text-sm " htmlFor="Video url ">
                                          <span className="font-bold"> Sell On Doob     </span>
                                    </label>

                                    <button type="button" className="flex justify-start mt-2">
                                          <span
                                                onClick={() => {
                                                      setMultiVendor(false);

                                                }}
                                                className={
                                                      multiVendor
                                                            ? "px-4 py-2 bg-gray-600 text-white"
                                                            : "px-4 py-2 bg-violet-400"
                                                }
                                          >
                                                NO
                                          </span>
                                          <span
                                                onClick={() => {
                                                      setMultiVendor(true);

                                                }}
                                                className={
                                                      !multiVendor
                                                            ? "px-4 py-2 bg-gray-600 text-white"
                                                            : "px-4 py-2 bg-violet-400"
                                                }
                                          >
                                                YES
                                          </span>
                                    </button>

                              </div>
                        </div>

                        <div className="flex flex-col mt-3">
                              <span>
                                    Category Information <span className="text-red-500"> *</span>
                              </span>
                              <div className="grid md:grid-cols-4 mt-3 items-center gap-4">
                                    <Select
                                          name="megaCategory"
                                          onChange={(e) => handleCategoryChange(e)}
                                          placeholder="Select Category"
                                          options={megaCategories?.map((megaCategory) => {
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
                                    />
                                    {selectedCategory && (
                                          <Select
                                                name="subCategory"
                                                onChange={(e) => handleSubcategoryChange(e)}
                                                placeholder="Select SubCategory"
                                                options={subCategories?.data?.map((subCategory) => {
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
                                    )}
                                    {selectedSubcategory && (
                                          <Select
                                                name="miniCategory"
                                                placeholder="Select MiniCategory"
                                                onChange={(e) => handleMinicategoryChange(e)}
                                              
                                                options={miniCategories?.data?.map((miniCategory) => {
      
                                                      const parsedDarazExtraCategory = miniCategory.darazMiniCategory ? JSON.parse(miniCategory.darazMiniCategory) : {};
                                                      const parsedData = parsedDarazExtraCategory || {}; // Fallback to empty object if undefined
                                                      const isSynced = !!miniCategory.darazMiniCategory;
                                                      const color = isSynced ? !parsedData.leaf ? 'orange' : isSynced ? 'green' : 'red' : 'red';
                                              

                                                      return {
                                                            value: miniCategory.miniCategoryName,
                                                            label: (
                                                                  <div data-daraz={parsedData.name || 'unknown'} >
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

                                          />
                                    )}
                                    {selectedMinicategory && (
                                          <Select
                                                name="extraCategory"
                                                placeholder="Select ExtraCategory"
                                                onChange={(e) => handleExtracategoryChange(e)}
                                                options={extraCategories?.data?.map((extraCategory) => {
                                                      const parsedDarazExtraCategory = extraCategory.darazExtraCategory ? JSON.parse(extraCategory.darazExtraCategory) : {};
                                                      const parsedData = parsedDarazExtraCategory || {}; // Fallback to empty object if undefined
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
                                    )}
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
                              {multiVendor === true && (
                                    <AdminCategoryforSeller />
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default SincronusCategory;
