import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import UploadImage from './Components/UploadImage';
import InputProductName from './Components/InputProductName';




const SellerAddProduct = () => {

    const { shopInfo } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)
    const [daraz, setDaraz] = useState(false)
    const [woo, setWoo] = useState(false)
    const [adminWare, setAdminWare] = useState(false)
    const [coverPhoto, setCoverPhoto] = useState('');




    const imageUpload = (image) => {
        const formData = new FormData();
        formData.append("image", image);

        const url = `https://salenow-v2-backend.vercel.app/api/v1/image/upload-image`;

        return fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imageData) => {
                const imageUrl = imageData.imageUrl;
                return imageUrl;
            });
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData();

        let coverPhoto = form.coverPhoto.files[0];

        const additionalPhotos = [
            form.photo1,
            form.photo2,
            form.photo3,
            form.photo4,
            form.photo5,
            form.photo6,
            form.photo7,
        ];

        if (coverPhoto) {
            formData.append("coverPhoto", coverPhoto);
            coverPhoto = await imageUpload(coverPhoto)

        }

        const uploadedImageUrls = await Promise.all(
            additionalPhotos.map(async (fileInput, index) => {
                const file = fileInput.files[0];
                if (file) {
                    const imageUrl = await imageUpload(file);
                    formData.append(`photo${index + 2}`, imageUrl);
                    return imageUrl;
                }
                return null;
            })
        );
        console.log("Uploaded Image URLs:", coverPhoto, uploadedImageUrls);
    };


    const { data: category = [], refetch } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {

            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/category/seller/${shopInfo._id}`);
            const data = await res.json();
            return data;

        },
    });

    const option = category && category?.filter((warehouse) => warehouse.status).map((warehouse) => ({

        value: JSON.stringify(warehouse),
        label: warehouse.name,
    }))




    return (
        <div>

            <form className='border p-10' onSubmit={formSubmit} action="">

                <UploadImage coverPhoto={coverPhoto} setCoverPhoto={setCoverPhoto} />

                <div className='border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded'>
                    <label className='text-sm ' htmlFor="Video url "> Video Url</label>
                    <input className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Input youtube video link here" type="text" name="" id="" />
                </div>

                <InputProductName />


                <div className='border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded'>

                    <div className='flex justify-start gap-10'>
                        {(shopInfo.darazLogin) && <div className='flex flex-col justify-start'>
                            <span className='font-bold'>Are you want Sinuous with Daraz </span>

                            <button className='flex justify-start mt-2' >
                                <span onClick={() => setDaraz(false)} className={daraz ? "px-4 py-2 bg-gray-600 text-white " : "px-4 py-2 bg-violet-400"}>NO</span>
                                <span onClick={() => setDaraz(true)} className={!daraz ? "px-4 py-2 bg-gray-600 text-white " : "px-4 py-2 bg-violet-400"}>YES</span>
                            </button>

                        </div>}
                        {(shopInfo.wooLogin) && <div className='flex flex-col justify-start'>
                            <span className='font-bold'>Are you want Sinuous with WooCommerce </span>

                            <button className='flex justify-start mt-2' >
                                <span onClick={() => setWoo(false)} className={woo ? "px-4 py-2 bg-gray-600 text-white " : "px-4 py-2 bg-violet-400"}>NO</span>
                                <span onClick={() => setWoo(true)} className={!woo ? "px-4 py-2 bg-gray-600 text-white " : "px-4 py-2 bg-violet-400"}>YES</span>
                            </button>

                        </div>}

                    </div>


                    <div className='flex flex-col mt-3'>
                        <span>Category Information <span className='text-red-500'> *</span></span>

                        <div className='mt-4 w-1/3' >
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
                                // onChange={handleSelectChange}
                                options={option}
                                placeholder="Select Mega Category"
                            />
                        </div>

                        <div className='mt-4 w-1/3' >
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
                                // onChange={handleSelectChange}
                                options={option}
                                placeholder="Select Mega Category"
                            />
                        </div>

                        <div className='mt-4 w-1/3' >
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
                                // onChange={handleSelectChange}
                                options={option}
                                placeholder="Select Mega Category"
                            />
                        </div>

                        <div className='mt-4 w-1/3' >
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
                                // onChange={handleSelectChange}
                                options={option}
                                placeholder="Select Mega Category"
                            />
                        </div>

                    </div>



                </div>


                <div className='border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded'>

                    <div className=' gap-10'>


                        <span className='font-bold'>Are you want Sinuous with WooCommerce </span>

                        <button className='flex justify-start mt-2' >
                            <span onClick={() => setAdminWare(false)} className={adminWare ? "px-4 py-2 bg-gray-600 text-white " : "px-4 py-2 bg-violet-400"}>Salenow</span>
                            <span onClick={() => setAdminWare(true)} className={!adminWare ? "px-4 py-2 bg-gray-600 text-white  " : "px-4 py-2 bg-violet-400"}>{shopInfo.shopName}</span>
                        </button>



                    </div>


                    <div className='flex flex-col mt-3'>
                        <span>Warehouse Information <span className='text-red-500'> *</span></span>

                        <div className='mt-4 w-1/3' >
                            <label className="text-sm">Select Warehouse</label>
                            <Select
                                menuPortalTarget={document.body}
                                // styles={{
                                //     control: (provided) => ({
                                //         ...provided,
                                //         cursor: 'pointer',
                                //     }),
                                //     option: (provided) => ({
                                //         ...provided,
                                //         cursor: 'pointer',
                                //     }),
                                // }}
                                name='megaCategory'
                                required
                                // onChange={handleSelectChange}
                                // options={option}
                                placeholder="Select Warehouse"
                            />
                        </div>



                    </div>



                </div>

                <div className="mt-4">
                    {
                        loading ?
                            <button disabled={loading || coverPhoto} className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4">
                                <span className="text-sm font-medium">
                                    Loading...
                                </span>
                                <svg className="animate-spin h-4 w-4 ml-3 text-white" viewBox="0 0 24 24">

                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                </svg>
                            </button>

                            :
                            <button type='submit'
                                // disabled={loading || coverPhoto}
                                className={(loading || coverPhoto) ? "group relative cursor-pointer inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 " : "group relative inline-flex items-center overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none mt-4 cursor-not-allowed"}

                            >
                                <span className="absolute -end-full transition-all group-hover:end-4">
                                    <BsArrowRight />
                                </span>

                                <span className="text-sm font-medium transition-all group-hover:me-4">
                                    Upload Product
                                </span>
                            </button>
                    }
                </div>
            </form>


        </div>
    );
};

export default SellerAddProduct;