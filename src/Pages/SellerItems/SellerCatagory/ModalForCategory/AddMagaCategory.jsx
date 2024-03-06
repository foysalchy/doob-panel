import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import Select from 'react-select';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddMagaCategory = () => {
    const { shopInfo } = useContext(AuthContext)

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // This will go back to the previous page
    };



    const { data: darazData = [], refetch } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            if (shopInfo.darazLogin) {
                const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/daraz/category/${shopInfo._id}`);
                const data = await res.json();
                return data;
            }

            return [];
        },
    });

    const { data: wooCategory = [] } = useQuery({
        queryKey: ["wooCategory"],
        queryFn: async () => {
            if (shopInfo.wooLogin) {
                const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/woo/category?shopId=${shopInfo._id}`);
                const data = await res.json();
                return data;
            }

            return [];
        },
    });




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

        try {
            const { name, slag, image } = e.target;
            const darazCategory = daraz ? e.target.darazCategory.value : '';


            let darazCategory_id = ''
            if (darazCategory) {
                darazCategory_id = JSON.parse(darazCategory).category_id
            }

            const wocomarceCategory = wocomarce ? e.target.wocomarceCategory.value : '';


            const imageFormData = new FormData();
            imageFormData.append("image", image.files[0]);

            const imageUrl = await uploadImage(imageFormData);

            const categoryData = {
                img: imageUrl,
                name: name.value,
                slag: slag.value,
                darazCategory,
                wocomarceCategory,
                shopName: shopInfo.name,
                shopId: shopInfo._id,
                darazCategory_id,
                status: true
            };

            console.log(categoryData);
            await postCategory(categoryData);

            Swal.fire("Warehouse Upload Successfully", "", "success");
            refetch()
            handleGoBack()
        } catch (error) {
            console.error('Error:', error.message);
            // Handle error display or logging here
        }
    };

    const uploadImage = async (formData) => {
        const url = `https://salenow-v2-backend.vercel.app/api/v1/image/upload-image`;
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const imageData = await response.json();
        return imageData.imageUrl;
    };

    const postCategory = async (data) => {
        const url = `https://salenow-v2-backend.vercel.app/api/v1/category/seller/add`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        return responseData
    };



    const option = darazData.length && darazData?.map((warehouse) => ({

        value: JSON.stringify(warehouse),
        label: warehouse.name,
    }))


    return (
        <div className='lg:pr-10 w-full mx-auto overflow-auto"'>

            <button onClick={() => handleGoBack()} type='button' className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500">
                <span className="absolute -start-full transition-all group-hover:start-4">

                    <FaLongArrowAltLeft />

                </span>
                <span className="text-sm font-medium transition-all group-hover:ms-4">Back</span>
            </button>

            <form onSubmit={UploadArea} action="">

                <div className=" mt-4">
                    <label className="text-sm">Name</label>
                    <input required name='name' type="text" placeholder="Category Name" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                </div>
                <div className=" mt-4">
                    <label className="text-sm">Slag</label>
                    <input required name='slag' type="text" placeholder="stag" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                </div>
                <div className=" mt-4">
                    <label className="text-sm">Upload Image</label>
                    <input required name='image' type="file" placeholder="Upload Image" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                </div>

                {shopInfo.darazLogin && <button type='button' className={!shopInfo.darazLogin ? 'hidden' : 'bg-gray-500 mt-4 w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'} onClick={() => handleButtonClick('daraz')}>Synchronize With Daraz</button>
                }
                {daraz && shopInfo.darazLogin && (
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
                            name='darazCategory'
                            required
                            options={option}
                            placeholder="Please select"
                        />
                    </div>
                )}
                <br />

                {shopInfo.wooLogin && <button type='button' className={shopInfo.wooLogin && 'bg-gray-500 w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4'} onClick={() => handleButtonClick('wocomarce')}>Synchronize With Wocomarce</button>}

                {wocomarce && shopInfo.wooLogin && (
                    <div className={!wocomarce && 'hidden'}>
                        <label className="text-sm">Select Woocommerce Category</label>
                        <Select
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
                            name='wocomarceCategory'
                            required
                            options={wooCategory.categories?.map((warehouse) => ({
                                value: JSON.stringify(warehouse),
                                label: warehouse.name,
                            }))}
                            placeholder="Please select"
                        />
                    </div>
                )}
                <br />


                <button type='submit' className="group mt-4 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500">
                    <span className="absolute -start-full transition-all group-hover:start-4">

                        <FaLongArrowAltRight />

                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">Add Category</span>
                </button>
            </form>
        </div>
    );
};

export default AddMagaCategory;