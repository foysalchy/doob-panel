import React from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Description = ({ description, setDescription }) => {


    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    return (
        <div className='py-4'>
            <label htmlFor="">Product Description</label>
            <ReactQuill
                value={description}
                onChange={handleDescriptionChange}
                className="border rounded"
                placeholder="Enter your description here..."
                style={{
                    height: '200px', // Set your desired height
                    // Add any other styles you want to customize
                }}
            />
        </div>
    );
};

export default Description;