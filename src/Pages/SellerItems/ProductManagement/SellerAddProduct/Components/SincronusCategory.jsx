import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../../AuthProvider/UserProvider';
import { useState } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';


const SincronusCategory = ({ daraz, setDaraz, woo, setWoo, setInputFields, setDarazOption }) => {

    const { shopInfo } = useContext(AuthContext)

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedMinicategory, setSelectedMinicategory] = useState(null);
    const [selectedExtracategory, setSelectedExtracategory] = useState(null);


    const { data: megaCategories = [], refetch } = useQuery({
        queryKey: ["megaCategory"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/category/seller/mega-category/get/${shopInfo._id}`);
            const data = await res.json();
            if (data) {
                return data;
            } else {
                // If data is undefined or falsy, return an empty array or handle it as per your requirements
                return [];
            }

        },
    });

    const option = megaCategories?.filter((megaCategory) => megaCategory.status).map((megaCategory) => ({

        value: megaCategory.name,
        label: megaCategory.name,
    })) || []



    const { data: subCategories = [], refetch: reload } = useQuery({
        queryKey: ["subCategories"],
        queryFn: async () => {
            if (selectedCategory) {
                const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/category/seller/sub-category/get/${shopInfo._id}/${selectedCategory}`);
                const data = await res.json();
                if (data) {
                    setDarazOption(data.daraz)
                    return data.data;
                } else {
                    // If data is undefined or falsy, return an empty array or handle it as per your requirements
                    return [];
                }

            }
        },
    });

    let SubOption = selectedCategory && subCategories?.filter((subCategory) => subCategory.status).map((subCategory) => ({

        value: subCategory.subCategoryName,
        label: subCategory.subCategoryName,
    })) || []

    const { data: miniCategories = [], refetch: reMini } = useQuery({
        queryKey: ["miniCategories"],
        queryFn: async () => {
            if (selectedSubcategory) {
                const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/category/seller/mini-category/get/${shopInfo._id}/${selectedSubcategory}`);
                const data = await res.json();
                if (data) {
                    setDarazOption(data.daraz)
                    return data.data;
                } else {
                    // If data is undefined or falsy, return an empty array or handle it as per your requirements
                    return [];
                }
            }
        },
    });



    let MiniOption = subCategories && miniCategories?.filter((miniCategory) => miniCategory.status).map((miniCategory) => ({
        value: miniCategory.miniCategoryName,
        label: miniCategory.miniCategoryName,
    })) || []


    const { data: extraCategories = [], refetch: reExtra } = useQuery({
        queryKey: ["extraCategories"],
        queryFn: async () => {
            if (selectedMinicategory) {
                const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/category/seller/extra-category/get/${shopInfo._id}/${selectedMinicategory}`);
                const data = await res.json();
                if (data) {
                    setDarazOption(data.daraz)
                    return data.data;
                    setDarazOption(data || []);
                } else {
                    // If data is undefined or falsy, return an empty array or handle it as per your requirements
                    return [];
                }
            }
        },
    });



    let ExtraOption = extraCategories?.filter((extraCategory) => extraCategory.status).map((extraCategory) => ({
        value: extraCategory.extraCategoryName,
        label: extraCategory.extraCategoryName,
    })) || []



    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSelectedSubcategory(null);
        setSelectedMinicategory(null);
        setSelectedExtracategory(null);
        reload()
        ExtraOption = null
        SubOption = null
        MiniOption = null
    };

    const handleSubcategoryChange = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setSelectedMinicategory(null);
        setSelectedExtracategory(null);
        reMini()
        reExtra()
        ExtraOption = null
        MiniOption = null
    };

    const handleMinicategoryChange = (minicategory) => {
        setSelectedMinicategory(minicategory);
        setSelectedExtracategory(null);
        reExtra()
        ExtraOption = null
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

                <div className='flex md:flex-row flex-col justify-start gap-10'>
                    {(shopInfo.darazLogin) && <div className='flex flex-col '>
                        <span className='font-bold'>Are you want Sinuous with Daraz </span>

                        <button type='button' className='flex justify-start mt-2' >
                            <span onClick={() => {
                                setDaraz(false); setInputFields([
                                    { name: null, image: null, quantity: "", SKU: "", price: null, offerPrice: null, ability: false, vendor: false },
                                ])
                            }}
                                className={daraz ? "px-4 py-2 bg-gray-600 text-white " : "px-4 py-2 bg-violet-400"}>NO</span>
                            <span onClick={() => {
                                setDaraz(true); setInputFields([
                                    { name: null, image: null, quantity: "", SKU: "", price: null, offerPrice: null, ability: false, vendor: false },
                                ])
                            }} className={!daraz ? "px-4 py-2 bg-gray-600 text-white " : "px-4 py-2 bg-violet-400"}>YES</span>
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

                    <div className='grid md:grid-cols-4 gap-4'>
                        {/* <select
                            onChange={(e) => handleCategoryChange(e.label)}
                            name="megaCategory" id="">
                            {option.map((op) => (
                                <option key={op.value} value={op.value}>
                                    {op.label}
                                </option>
                            ))}
                        </select> */}
                        <Select
                            name='megaCategory'
                            onChange={(e) => handleCategoryChange(e.label)}
                            placeholder='Select Category'
                            options={option}
                            className='mt-3'
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