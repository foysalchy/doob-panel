import React from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Description = ({ description, setDescription, shortDescription, setShortDescription, categories }) => {




    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const handleShortDescriptionChange = (value) => {
        setShortDescription(value);
    };


    return (
        <div className=' border mt-4 border-gray-400 px-10 py-5 pb-16 w-full bg-gray-100 rounded'>
            <div className='flex flex-col'>
                <span className='font-bold'>Product Description</span>
                <small>Having accurate product information raises discoverability.</small>
            </div>

            <div>
                <div className='flex flex-col mt-3'>
                    <span>Product Short Description <span className='text-red-500'> *</span></span>

                </div>

                <ReactQuill
                    name='shortDescription'
                    className="rounded"
                    value={shortDescription}
                    onChange={handleShortDescriptionChange}
                    placeholder="Enter your description here..."
                    style={{
                        height: '100px', // Set your desired height
                        // Add any other styles you want to customize
                    }}
                />
            </div>
            <div className='mt-16'>
                <div className='flex flex-col mt-3'>
                    <span>Product  Description <span className='text-red-500'> *</span></span>

                </div>
                <ReactQuill
                    onChange={handleDescriptionChange}
                    name='description'
                    value={description}
                    className=" rounded"
                    placeholder="Enter your description here..."
                    style={{
                        height: '150px', // Set your desired height
                        // Add any other styles you want to customize
                    }}
                />
            </div>
        </div>
    );
};

export default Description;