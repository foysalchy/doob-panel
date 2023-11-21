import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import Select from 'react-select';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddExtraCategory = () => {
    const { shopInfo } = useContext(AuthContext)

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };



    const { data: darazData = [], refetch } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            if (shopInfo.darazLogin) {
                const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/category/seller/${shopInfo._id}`);
                const data = await res.json();
                return data;
            }

            return [];
        },
    });

    const option = darazData?.filter((warehouse) => warehouse.status).map((warehouse) => ({

        value: JSON.stringify(warehouse),
        label: warehouse.name,
    }))




    const [daraz, setDaraz] = useState(false);
    const [wocomarce, setWocomarce] = useState(false);

    const handleButtonClick = (buttonName) => {
        if (buttonName === 'daraz') {
            setDaraz(!daraz)
        }
        if (buttonName === 'wocomarce') {
            setWocomarce(!wocomarce)
        }

    };





    const UploadArea = async (e) => {
        e.preventDefault();

        const megaCategory = e.target.megaCategory.value || '';
        const darazExtraCategory = e.target.darazExtraCategory?.value || '';
        const wooMiniCategory = e.target.wooMiniCategory?.value || '';
        const subCategoryName = e.target.subCategoryName.value || ''
        const miniCategoryName = e.target.miniCategoryName.value || ''
        const extraCategoryName = e.target.extraCategoryName.value
        const data = {
            megaCategory,
            darazExtraCategory,
            wooMiniCategory,
            subCategoryName,
            miniCategoryName,
            shopId: shopInfo._id,
            extraCategoryName
        }
        console.log(data);

        const url = `https://salenow-v2-backend.vercel.app/api/v1/category/seller/extra/add`;

        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then((data) => {
            Swal.fire("Mini Category Upload Successfully", "", "success");
            refetch()
            handleGoBack()
        })




    };


    const [subCategorys, setSubCategorys] = useState([])

    const [megaCategory, setMegaCategory] = useState('')



    const handleSelectChange = (selectedOption) => {

        const darazCategoryObject = JSON.parse(selectedOption?.value);
        setMegaCategory(selectedOption.value)


        const requestBody = {
            shopId: shopInfo._id,
            megaCategory: selectedOption.value,
        };

        fetch(`https://salenow-v2-backend.vercel.app/api/v1/category/seller/sub`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((res) => res.json())
            .then((data) => {

                setSubCategorys(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    const filteredWarehouses = subCategorys?.filter(warehouse => warehouse?.status === true);
    const sortedWarehouses = filteredWarehouses?.filter(warehouse => warehouse.status).sort((a, b) => a?.subCategoryName?.localeCompare(b.subCategoryName));

    const subcategoryOption = sortedWarehouses?.map((warehouse) => ({
        value: warehouse?.subCategoryName,
        label: warehouse?.subCategoryName,
    }));

    const [miniCategories, setMiniCategories] = useState([])


    const handleChangeSub = (value) => {

        const requestBody = {
            shopId: shopInfo._id,
            subCategoryName: value.value,
            megaCategory,
        }
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/category/seller/mini`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((res) => res.json())
            .then((data) => {
                setMiniCategories(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }



    const [darazOption, setDarazOption] = useState(false)





    let darazMiniCategoryName = ''
    let darazSubCategoryName = ''

    const miniCategoriesOption = miniCategories && miniCategories.map((warehouse) => {
        try {
            // const data = JSON.parse(warehouse?.darazMiniCategory);
            const miniCategory = warehouse.miniCategoryName;
            console.log(miniCategory);
            // darazSubCategoryName = data.name;

            // delete warehouse.megaCategory;

            const option = {
                value: miniCategory,
                label: miniCategory,
            };

            return option;
        } catch (error) {
            console.error('Error parsing JSON data:', error);

            return null; // or handle the error in a way that fits your application
        }
    })




    const darazOptionData = darazOption && darazOption?.map((data) => {

        const option = {
            value: JSON.stringify({ data, darazMiniCategoryName: darazMiniCategoryName, darazSubCategoryName: darazSubCategoryName }),
            label: data.name,
        };

        return option;
    });


    const darazCategoryHandle = (value) => {


        try {

            console.log(value);
            console.log();
            const arryData = JSON.parse(JSON.parse(value?.value)?.darazMiniCategory)

            if (arryData.children) {
                setDarazOption(arryData.children);
            } else {
                setDarazOption(false);
            }


        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };




    return (
        <div className='lg:pr-10 w-full mx-auto overflow-auto border border-black rounded p-6'>

            <button onClick={() => handleGoBack()} type='button' className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500">
                <span className="absolute -start-full transition-all group-hover:start-4">

                    <FaLongArrowAltLeft />

                </span>
                <span className="text-sm font-medium transition-all group-hover:ms-4">Back</span>
            </button>

            <form onSubmit={UploadArea} action="">

                <div className='mt-4' >
                    <label className="text-sm">Select Mega Category</label>
                    <Select
                        menuPortalTarget={document.body}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                cursor: 'pointer',
                            }),
                            option: (provided) => ({
                                ...provided,
                                cursor: 'pointer',
                            }),
                        }}
                        name='megaCategory'
                        required
                        onChange={handleSelectChange}
                        options={option}
                        placeholder="Select Mega Category"
                    />
                </div>

                <div className=" mt-4">
                    <div className='mt-4' >
                        <label className="text-sm">Select Sub Category</label>
                        <Select
                            menuPortalTarget={document.body}
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    cursor: 'pointer',
                                }),
                                option: (provided) => ({
                                    ...provided,
                                    cursor: 'pointer',
                                }),
                            }}
                            name='subCategoryName'
                            required
                            onChange={handleChangeSub}
                            options={subcategoryOption}
                            placeholder="Select Daraz Category"
                        />
                    </div>
                </div>
                <div className=" mt-4">
                    <div className='mt-4' >
                        <label className="text-sm">Select Mini Category</label>
                        <Select
                            menuPortalTarget={document.body}
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    cursor: 'pointer',
                                }),
                                option: (provided) => ({
                                    ...provided,
                                    cursor: 'pointer',
                                }),
                            }}
                            name='miniCategoryName'
                            required
                            onChange={darazCategoryHandle}
                            options={miniCategoriesOption}
                            placeholder="Select Mini Category"
                        />
                    </div>
                </div>
                {shopInfo.darazLogin && darazOption && <div className=" mt-4">
                    <div className='mt-4' >
                        <label className="text-sm">Select Your Daraz Category</label>
                        <Select
                            menuPortalTarget={document.body}
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    cursor: 'pointer',
                                }),
                                option: (provided) => ({
                                    ...provided,
                                    cursor: 'pointer',
                                }),
                            }}
                            name='darazExtraCategory'

                            required
                            options={darazOptionData}
                            placeholder="Select Daraz Category"
                        />
                    </div>
                </div>}
                {shopInfo.wooLogin && darazOption?.length > 0 && <div className=" mt-4">
                    <div className='mt-4' >
                        <label className="text-sm">Select Daraz Category</label>
                        <Select
                            menuPortalTarget={document.body}
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    cursor: 'pointer',
                                }),
                                option: (provided) => ({
                                    ...provided,
                                    cursor: 'pointer',
                                }),
                            }}
                            name='wooMiniCategory'
                            required
                            options={darazOption}
                            placeholder="Select Daraz Category"
                        />
                    </div>
                </div>}


                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Enter Extra Category Name</label>
                    <input
                        required
                        name='extraCategoryName'
                        placeholder="E.g., Trendy Fashion Accessories"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-900 focus:outline-none focus:border-blue-500"
                    />
                </div>



                <button type='submit' className="group mt-4 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500">
                    <span className="absolute -start-full transition-all group-hover:start-4">

                        <FaLongArrowAltRight />

                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">Add SubCategory</span>
                </button>
            </form>
        </div>
    );
};

export default AddExtraCategory;