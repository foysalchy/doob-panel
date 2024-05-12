import React from 'react';
import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import DragImgBox from './DragImgBox';
import { arrayMove } from '@dnd-kit/sortable';

const UploadImage = ({ coverPhoto, setCoverPhoto, youtube, setYoutube }) => {

    // const [photo1, setPhoto1] = useState('');
    // const [photo2, setPhoto2] = useState('');
    // const [photo3, setPhoto3] = useState('');
    // const [photo4, setPhoto4] = useState('');
    // const [photo5, setPhoto5] = useState('');
    // const [photo6, setPhoto6] = useState('');
    // const [photo7, setPhoto7] = useState('');
    const [image, setImage] = useState([]);
    const [deletItem, setDeletItem] = useState('');
    const [youtubeError, setYoutubeError] = useState('')


    const handleCheck = (value) => {
        console.log(value);
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;


        const isYoutube = youtubeRegex.test(value);
        console.log(isYoutube);
        if (isYoutube) {
            setYoutube(value)
            setYoutubeError('')
        }
        else {
            setYoutubeError('Provide Youtube Video URl')
        }
    }

    const [activeId, setActiveId] = useState(null);

    const handleDragStart = (event) => {
        setDeletItem(event.target.id);
        setActiveId(event.target.src)
        event.dataTransfer.setData("index", event.target.id);
    };

    const [test, setTest] = useState([
        'coverPhoto',
        'photo2',
        'photo3',
        'photo4',
        'photo5',
        'photo6',
        'photo7'

    ])

    const [images, setImages] = useState(Array(test.length).fill(null));

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        const newImages = [...images];
        newImages[index] = URL.createObjectURL(file);
        setImages(newImages);
    };



    const [dragIndex, setDragIndex] = useState();
    const [dragOverIndex, setDragOverIndex] = useState();

    const handleDragStart2 = (index) => {
        setDragIndex(index);
    }
    const handleDragOver2 = (e) => {
        e.preventDefault();
    }

    const handleDrop2 = () => {
        const _test = [...test];
        const item = _test.splice(dragIndex, 1);
        _test.splice(dragOverIndex, 0, item);

        setTest(_test);
    }

    const handleDragEnter = (index) => {
        setDragOverIndex(index);
    }

    const handleDragLeave = (event) => {
        setDragIndex(undefined);
    }

    const handleDragEnd = (event) => {
        setDragIndex(undefined);
        setDragOverIndex(undefined);
    }

    return (
        <div>
            {/* start area */}
            <ul className='grid grid-cols-7 gap-3 '>
                {
                    test.map((itm, index) => <li
                        className={
                            dragOverIndex === index ? "bg-red-300 border" : "bg-green-100 border border-green-600"
                        }
                        key={itm}
                        draggable
                        onDragStart={() => handleDragStart2(index)}
                        onDragOver={handleDragOver2}
                        onDrop={() => handleDrop2(index)}
                        onDragEnter={() => handleDragEnter(index)}
                        onDragLeave={handleDragLeave}
                        onDragEnd={handleDragEnd}>
                        <div className="bg-red-100 p-2 rounded">
                            <div className="bg-red-100 p-2 rounded">
                                {itm}
                                <label
                                    htmlFor={`Photo${index + 1}`}
                                    className="bg-gray-300 cursor-pointer md:w-20 h-20 flex justify-center items-center">
                                    {images[index] ? (
                                        <img
                                            src={images[index]}
                                            id={`Photo${index + 1}`}
                                            alt={`Photo ${index + 1} Preview`}
                                            className="w-full h-full object-cover cursor-grab"
                                        />
                                    ) : (
                                        <span className="text-xl">+</span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    id={`Photo${index + 1}`}
                                    name={`photo${index + 1}`}
                                    className='absolute top-0 left-0 bottom-0 right-0 m-auto overflow-hidden w-[20px] opacity-0 cursor-pointer'
                                    accept="image/*"
                                    style={{ display: "block" }}
                                    onChange={(event) => handleImageChange(index, event)}
                                />
                            </div>
                        </div>
                    </li>)
                }
            </ul>

            {/* end area */}




            <div className='border border-gray-400 px-10 py-5 w-full bg-gray-100 rounded'>
                <div className='flex flex-col'>
                    <span className='font-bold'>Product Images & Video</span>
                    <small>Your product images is the first thing your customer sees on the product page.</small>
                </div>
                <div className='flex flex-col mt-3'>
                    <span>Product Images <span className='text-red-500'> *</span></span>
                    <small>Upload between 3 to 8 images</small>
                </div>


                <div className='mt-4'>
                    <label className='text-sm ' htmlFor="Video url "> Video Url</label>
                    <input
                        // defaultValue={}
                        onChange={(e) => handleCheck(e.target.value)}
                        className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                        placeholder="Input YouTube video link here"
                        type="text"
                        name="videoUrl"
                    />
                    {youtubeError && <span className='text-sm text-red-500'>{youtubeError}</span>}
                </div>
            </div>
        </div >
    );

};

export default UploadImage;
