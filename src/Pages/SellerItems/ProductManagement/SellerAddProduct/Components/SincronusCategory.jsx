import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../../AuthProvider/UserProvider';
import { useState } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';

const SincronusCategory = ({ daraz, setDaraz, woo, setWoo }) => {

    const { shopInfo } = useContext(AuthContext)

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedMinicategory, setSelectedMinicategory] = useState(null);
    const [selectedExtracategory, setSelectedExtracategory] = useState(null);


    const { data: megaCategories = [], refetch } = useQuery({
        queryKey: ["megaCategory"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/category/seller/mega-category/get/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });

    const option = megaCategories?.filter((megaCategory) => megaCategory.status).map((megaCategory) => ({

        value: megaCategory.name,
        label: megaCategory.name,
    }))



    const { data: subCategories = [], refetch: reload } = useQuery({
        queryKey: ["subCategories"],
        queryFn: async () => {
            if (selectedCategory) {
                const res = await fetch(`http://localhost:5000/api/v1/category/seller/sub-category/get/${shopInfo._id}/${selectedCategory}`);
                const data = await res.json();
                return data;
            }
        },
    });

    let SubOption = selectedCategory && subCategories?.filter((subCategory) => subCategory.status).map((subCategory) => ({

        value: subCategory.subCategoryName,
        label: subCategory.subCategoryName,
    }))

    const { data: miniCategories = [], refetch: reMini } = useQuery({
        queryKey: ["miniCategories"],
        queryFn: async () => {
            if (selectedSubcategory) {
                const res = await fetch(`http://localhost:5000/api/v1/category/seller/mini-category/get/${shopInfo._id}/${selectedSubcategory}`);
                const data = await res.json();
                return data;
            }
        },
    });



    let MiniOption = subCategories && miniCategories?.filter((miniCategory) => miniCategory.status).map((miniCategory) => ({

        value: miniCategory.miniCategoryName,
        label: miniCategory.miniCategoryName,
    }))


    const { data: extraCategories = [], refetch: reExtra } = useQuery({
        queryKey: ["extraCategories"],
        queryFn: async () => {
            if (selectedMinicategory) {
                const res = await fetch(`http://localhost:5000/api/v1/category/seller/extra-category/get/${shopInfo._id}/${selectedMinicategory}`);
                const data = await res.json();
                return data;
            }
        },
    });



    let ExtraOption = extraCategories?.filter((extraCategory) => extraCategory.status).map((extraCategory) => ({

        value: extraCategory.extraCategoryName,
        label: extraCategory.extraCategoryName,
    }))



    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSelectedSubcategory('');
        setSelectedMinicategory('');
        setSelectedExtracategory('');
        reload()
        ExtraOption = ''
        SubOption = ''
        MiniOption = ''
    };

    const handleSubcategoryChange = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setSelectedMinicategory(null);
        setSelectedExtracategory(null);
        reMini()
        reExtra()
        ExtraOption = ''
        MiniOption = ''
    };

    const handleMinicategoryChange = (minicategory) => {
        setSelectedMinicategory(minicategory);
        setSelectedExtracategory(null);
        reExtra()
        ExtraOption = ''
    };

    const handleExtracategoryChange = (extracategory) => {
        setSelectedExtracategory(extracategory);
    };

    useEffect(() => {
        reload();
    }, [selectedCategory]);


    useEffect(() => {
        reMini();
    }, [selectedSubcategory]);


    useEffect(() => {
        reExtra();
    }, [selectedMinicategory]);


    return (
        <div>
            <div className='border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded'>

                <div className='flex justify-start gap-10'>
                    {(shopInfo.darazLogin) && <div className='flex flex-col '>
                        <span className='font-bold'>Are you want Sinuous with Daraz </span>

                        <button type='button' className='flex justify-start mt-2' >
                            <span onClick={() => setDaraz(false)} className={daraz ? "px-4 py-2 bg-gray-600 text-white " : "px-4 py-2 bg-violet-400"}>NO</span>
                            <span onClick={() => setDaraz(true)} className={!daraz ? "px-4 py-2 bg-gray-600 text-white " : "px-4 py-2 bg-violet-400"}>YES</span>
                        </button>

                    </div>}
                    {(shopInfo.wooLogin) && <div className='flex flex-col '>
                        <div className='flex flex-col justify-start'>
                            <span className='font-bold'>Are you want Sinuous with WooCommerce </span>

                            <button type='button' className='flex justify-start mt-2' >
                                <span onClick={() => setWoo(false)} className={woo ? "px-4 py-2 bg-gray-600 text-white " : "px-4 py-2 bg-violet-400"}>NO</span>
                                <span onClick={() => setWoo(true)} className={!woo ? "px-4 py-2 bg-gray-600 text-white " : "px-4 py-2 bg-violet-400"}>YES</span>
                            </button>
                        </div>



                    </div>}

                </div>


                <div className='flex flex-col mt-3'>
                    <span>Category Information <span className='text-red-500'> *</span></span>

                    <div className='grid grid-cols-4 gap-4'>
                        <Select

                            name='megaCategory'
                            onChange={(e) => handleCategoryChange(e.label)}
                            placeholder='Select Category'
                            options={option}
                        />
                        {selectedCategory && <Select
                            name='subCategory'
                            onChange={(e) => handleSubcategoryChange(e.value)}
                            placeholder='Select SubCategory'
                            options={SubOption ? SubOption : 'Please Select'}
                        />}
                        {selectedSubcategory && <Select
                            name='miniCategory'
                            placeholder='Select MiniCategory'
                            onChange={(e) => handleMinicategoryChange(e.value)}
                            options={MiniOption ? MiniOption : 'Please Select'}
                        />}
                        {selectedMinicategory && <Select
                            name='extraCategory'
                            placeholder='Select ExtraCategory'
                            onChange={(e) => handleExtracategoryChange(e.value)}
                            options={ExtraOption ?? 'Please Select'}
                        />}
                    </div>

                    <div className='mt-4'>
                        <strong>Selected Categories:</strong>
                        <span className='ml-4'>  {selectedCategory && selectedCategory}
                            {selectedSubcategory && ` > ${selectedSubcategory}`}
                            {selectedMinicategory && ` > ${selectedMinicategory} `}
                            {selectedExtracategory && ` > ${selectedExtracategory}`}</span>
                    </div>
                </div>

            </div>



        </div>

    );
};

export default SincronusCategory;