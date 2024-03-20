import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { AuthContext } from '../../../../../AuthProvider/UserProvider';
import Swal from 'sweetalert2';
import Stock from './Stock';
import VariantData from './VariantData';

const Variants = ({ adminWare, multiVendor, setMultiVendor, inputFields, setInputFields, daraz, variantInput, setVariantInput }) => {

    const { shopInfo } = useContext(AuthContext)

    const handleImageChange = async (index, event) => {
        const file = event.target.files[0];

        if (file) {
            // need loading
            const newInputFields = [...inputFields];


            try {
                if (daraz) {
                    const url = await ImageUpload(file);
                    newInputFields[index].image = url;
                    setInputFields(newInputFields);
                }
                else {
                    const url = await Upload(file);
                    newInputFields[index].image = url;
                    setInputFields(newInputFields);
                }

            } catch (error) {

                console.log(error);
            }
        }
    };

    const [multipleImg, setMultipleImg] = useState([]);

    const ImageUpload = async (image) => {
        const imageBlob = new Blob([image], { type: 'image/jpeg' });

        const formData = new FormData();
        formData.append('image', imageBlob);

        const url = `https://salenow-v2-backend.vercel.app/api/v1/daraz/daraz-image/${shopInfo._id}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const imageData = await response.json();
            const imageUrl = imageData.url;
            if (!imageUrl) {
                Swal.fire(`${imageData.message}`, '', 'warning')
            }
            return imageUrl;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    };


    const Upload = (image) => {
        const formData = new FormData();
        formData.append("image", image);

        const url = `https://salenow-v2-backend.vercel.app/api/v1/image/upload-image`;

        return fetch(url, {
            method: "POST",
            headers: {
                "Origin": "https://salenow-v2-backend.vercel.app/api/v1/image/upload-image"
            },
            body: formData,

        })
            .then((res) => res.json())
            .then((imageData) => {
                const imageUrl = imageData.imageUrl;
                return imageUrl;
            });
    };

    const handleAddField = () => {
        setInputFields([...inputFields, {

            name: '', image: null, quantity: "", SKU: "hello js", price: '', offerPrice: '', ability: false, vendor: false, variantImag: null
        }]);
    };


    const handleRemoveField = (index) => {
        const newInputFields = [...inputFields];
        newInputFields.splice(index, 1);
        setInputFields(newInputFields);
    };

    const handleMultipleImg = async (e, index) => {
        const imgs = e.target.files;
        let imgUrls = [];
        for (let i = 0; i < imgs.length; i++) {
            const img = imgs[i];
            const url = await Upload(img);
            imgUrls.push({ src: url });
        }

        const newInputFields = [...inputFields];
        newInputFields[index].variantImag = imgUrls;
        setInputFields(newInputFields);
    }

    return (
        <div className=' border mt-4 border-gray-400 md:px-10 px-3 py-5 pb-16 w-full bg-gray-100 rounded'>
            <div className='flex flex-col mb-4'>
                <span className='font-bold'>Variants, Price, Stock <span className='text-red-500'> *</span></span>
                <small>Having accurate product information raises discoverability.</small>
            </div>
            <div className='min-w-fit mb-4'>

                <label className='text-sm ' htmlFor="Video url ">Sale Multi Vendor</label>
                <select
                    onChange={(e) => {
                        setMultiVendor(e.target.value === 'true' && true || e.target.value === 'false' && false);
                    }}
                    className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" name="ability" id="">
                    <option value={true}>Yes</option>
                    <option value={false} >No</option>
                </select>

            </div>
            <div className='flex gap-4 flex-col w-full'>
                {inputFields && inputFields.map((field, index) => (
                    <div key={index} className=' border border-green-300 rounded px-4 py-2  w-full'>   <div className='flex gap-10 justify-between items-center'  >
                        <input
                            type="text"
                            name={`name-${index}`}
                            required
                            id={`name-${index}`}
                            className="flex-grow w-1/3 h-10 px-4 mb-3 transition duration-200 bg-white border rounded shadow-sm appearance-none md:mr-2 md:mb-0 border-purple-400 focus:outline-none focus:shadow-outline"
                            value={field.name}
                            onChange={(e) => {
                                const newInputFields = [...inputFields];
                                const newName = e.target.value;
                                const newSKU = `${shopInfo.shopId}_${newName}_${Math.floor(Math.random() * 100000000)}`;

                                newInputFields[index].name = newName;
                                newInputFields[index].SKU = newSKU;

                                setInputFields(newInputFields);
                            }}
                        />

                        <div>
                            <label htmlFor={`coverPhoto-${index}`} className='bg-gray-300 w-20 h-20 flex justify-center items-center border border-black'>
                                {field.image ? (
                                    <img src={field.image} alt="Cover Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className='text-xl'>+</span>
                                )}


                            </label>
                            <input
                                type="file"
                                required
                                id={`coverPhoto-${index}`}
                                name={`coverPhoto-${index}`}
                                multiple
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(event) => handleImageChange(index, event)}
                            />
                        </div>


                        {
                            (inputFields.length > 1) && (
                                <button
                                    type="button"
                                    className='text-2xl text-red-500'
                                    onClick={() => handleRemoveField(index)}
                                >
                                    <MdDelete />
                                </button>
                            )
                        }

                    </div>
                        <div>
                            <input ccept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                                onChange={(e) => handleMultipleImg(e, index)} type="file" multiple />
                        </div>


                        <Stock field={field} index={index} inputFields={inputFields} setInputFields={setInputFields} />
                    </div>

                ))}
                {inputFields && <button type="button" className='bg-green-500 py-2' onClick={handleAddField}>
                    Add Field
                </button>}
                {multiVendor === true && <VariantData variantInput={variantInput} setVariantInput={setVariantInput} />}
            </div>

        </div>
    );
};

export default Variants;


