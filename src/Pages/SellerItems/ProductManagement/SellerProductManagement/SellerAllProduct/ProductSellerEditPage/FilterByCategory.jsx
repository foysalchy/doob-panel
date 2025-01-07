import React, { useContext, useState, useEffect } from 'react';
import { Cascader } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../../../../AuthProvider/UserProvider';

const FilterByCategory = ({ set_selected_category, selected_category }) => {
      const { shopInfo } = useContext(AuthContext);
      const [options, setOptions] = useState([]);

      // Load mega categories
      const { data: megaCategories = [] } = useQuery({
            queryKey: ['megaCategory'],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/category/seller/mega-category/get/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data || [];
            },
      });

      // Fetch subcategories dynamically when a mega category is expanded
      const loadSubcategories = async (selectedCategory) => {
            const res = await fetch(
                  `https://doob.dev/api/v1/category/seller/sub-category/get/${shopInfo._id}/${selectedCategory}`
            );
            const data = await res.json();
            return data?.data || [];
      };

      // Fetch mini categories dynamically when a subcategory is expanded
      const loadMiniCategories = async (selectedSubcategory) => {
            const res = await fetch(
                  `https://doob.dev/api/v1/category/seller/mini-category/get/${shopInfo._id}/${selectedSubcategory}`
            );
            const data = await res.json();
            return data?.data || [];
      };

      // Handle Cascader options load
      const handleLoadData = async (selectedOptions) => {
            const targetOption = selectedOptions[selectedOptions.length - 1];
            targetOption.loading = true;

            if (selectedOptions.length === 1) {
                  // Load subcategories
                  const subcategories = await loadSubcategories(targetOption.value);
                  targetOption.children = subcategories.map((subcategory) => ({
                        value: subcategory.subCategoryName,
                        label: subcategory.subCategoryName,
                        isLeaf: false,
                  }));
            } else if (selectedOptions.length === 2) {
                  // Load mini categories
                  const miniCategories = await loadMiniCategories(targetOption.value);
                  targetOption.children = miniCategories.map((miniCategory) => ({
                        value: miniCategory.miniCategoryName,
                        label: miniCategory.miniCategoryName,
                        isLeaf: true, // Set to true if this is the last level
                  }));
            }

            targetOption.loading = false;
            setOptions([...options]);
      };

      useEffect(() => {
            // Transform mega categories into initial options
            const formattedOptions = megaCategories.map((megaCategory) => ({
                  value: megaCategory.name,
                  label: megaCategory.name,
                  isLeaf: false, // Indicating that this category has children
            }));
            setOptions(formattedOptions);
      }, [megaCategories]);

      const onChange = (value) => {
            set_selected_category(value);
      };

      return (
            <div>
                  <Cascader
                        className="w-full"
                        options={options}
                        loadData={handleLoadData}
                        onChange={onChange}
                        placeholder="Please select"
                        changeOnSelect
                  />
            </div>
      );
};

export default FilterByCategory;
