import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import Select from "react-select";

const OnlySyncCategory = ({  dCat,
      setDCat }) => {
      const { shopInfo } = useContext(AuthContext);
      const [selectedCategory, setSelectedCategory] = useState(null);
      const [selectedSubcategory, setSelectedSubcategory] = useState(null);
      const [selectedMinicategory, setSelectedMinicategory] = useState(null);
      const [selectedExtracategory, setSelectedExtracategory] = useState(null);

      // Load mega categories
      const { data: megaCategories = [], refetch: refetchMegaCategories } =
            useQuery({
                  queryKey: ["megaCategory"],
                  queryFn: async () => {
                        const res = await fetch(
                              `https://doob.dev/api/v1/category/seller/mega-category/get/${shopInfo._id}`
                        );
                        const data = await res.json();
                        // setDarazOption(data?.daraz);
                        return data || [];
                  },
            });

      // Load subcategories based on selected mega category
      const { data: subCategories = [], refetch: refetchSubCategories } = useQuery({
            queryKey: ["subCategories", selectedCategory],
            enabled: !!selectedCategory,
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/category/seller/sub-category/get/${shopInfo._id}/${selectedCategory}`
                  );
                  const data = await res.json();
                  //   setDarazOption(data?.daraz);
                  return data?.data || [];
            },
      });
      console.log(subCategories)

      // Load mini categories based on selected subcategory
      const { data: miniCategories = [], refetch: refetchMiniCategories } =
            useQuery({
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

      // Load extra categories based on selected mini category
      const { data: extraCategories = [], refetch: refetchExtraCategories } =
            useQuery({
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
      const handleCategoryChange =  (e) => {
            const category = e.value;
            const newDCat = [...dCat];  
            newDCat[0] = e.label.props['data-daraz'];  
            setDCat(newDCat);  
            setSelectedCategory(category);
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
            setSelectedMinicategory(null);
            setSelectedExtracategory(null);
      };

      const handleMinicategoryChange = (e) => {
            const minicategory = e.value;
            const newDCat = [...dCat];  
            newDCat[2] = e.label.props['data-daraz'];  
            setDCat(newDCat);  
            setSelectedMinicategory(minicategory);
            setSelectedExtracategory(null);
      };

      const handleExtracategoryChange = (e) => {
            const extracategory = e.value;
            const newDCat = [...dCat];  
            newDCat[3] = e.label.props['data-daraz'];  
            setDCat(newDCat); 
            setSelectedExtracategory(extracategory);
      };

      return (
            <div>
                  <div className="border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded">
                        <div className="flex flex-col mt-3">
                              <span>
                                    Category Information <span className="text-red-500"> *</span>
                              </span>
                              <div className="grid md:grid-cols-4 mt-3 items-center gap-4">
                              <Select
                              required
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
                                    />
                                  
                                    {selectedCategory && (
                                           <Select
                                           required
                                           name="subCategory"
                                           onChange={(e) => handleSubcategoryChange(e)}
                                           placeholder="Select SubCategory"
                                           options={Array.isArray(subCategories) ? subCategories?.filter((subCategory) => subCategory.trash !== true).map((subCategory)=> {
                                                
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
                                          }) : []}  

                                     />
                                    )}
                                    {selectedSubcategory && (
                                          <Select
                                           
                                          name="miniCategory"
                                          placeholder="Select MiniCategory"
                                          onChange={(e) => handleMinicategoryChange(e)}
                                        
                                          options={Array.isArray(miniCategories) ?  miniCategories?.filter((miniCategory) => miniCategory.trash !== true).map((miniCategory) => {

                                                const parsedDarazExtraCategory = miniCategory.darazMiniCategory ? JSON.parse(miniCategory.darazMiniCategory) : {};
                                                const parsedData = parsedDarazExtraCategory.child || {}; // Fallback to empty object if undefined
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
                                           }) : []}  

                                    />
                                    )}
                                    {selectedMinicategory && (
                                          <Select
                                          name="extraCategory"
                                          placeholder="Select ExtraCategory"
                                          onChange={(e) => handleExtracategoryChange(e)}
                                          options={Array.isArray(extraCategories) ? extraCategories?.filter((extraCategory) => extraCategory.trash !== true).map((extraCategory) => {
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
                                          }) : []}  

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
                        </div>
                  </div>
            </div>
      );
};

export default OnlySyncCategory;
