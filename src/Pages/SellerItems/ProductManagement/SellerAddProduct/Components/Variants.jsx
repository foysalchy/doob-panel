import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { AuthContext } from '../../../../../AuthProvider/UserProvider';
import Swal from 'sweetalert2';
import Stock from './Stock';

const Variants = ({ inputFields, setInputFields, daraz }) => {

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

            name: '', image: null, quantity: "", SKU: "", price: '', offerPrice: '', ability: false, vendor: false
        }]);
    };

    const handleRemoveField = (index) => {
        const newInputFields = [...inputFields];
        newInputFields.splice(index, 1);
        setInputFields(newInputFields);
    };


    return (
        <div className=' border mt-4 border-gray-400 px-10 py-5 pb-16 w-full bg-gray-100 rounded'>
            <div className='flex flex-col mb-4'>
                <span className='font-bold'>Variants, Price, Stock <span className='text-red-500'> *</span></span>
                <small>Having accurate product information raises discoverability.</small>
            </div>
            <div className='flex gap-4 flex-col w-full'>
                {inputFields.map((field, index) => (
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
                                newInputFields[index].name = e.target.value;
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
                                id={`coverPhoto-${index}`}
                                name={`coverPhoto-${index}`}

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
                        <Stock field={field} index={index} inputFields={inputFields} setInputFields={setInputFields} />
                    </div>

                ))}
                <button type="button" className='bg-green-500 py-2' onClick={handleAddField}>
                    Add Field
                </button>
            </div>

        </div>
    );
};

export default Variants;


