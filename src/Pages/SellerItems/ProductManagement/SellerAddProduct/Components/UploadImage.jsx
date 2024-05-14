import React from 'react';
import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import DragImgBox from './DragImgBox';
import { arrayMove } from '@dnd-kit/sortable';

const UploadImage = ({ allImage, setAllImage, coverPhoto, setCoverPhoto, youtube, setYoutube }) => {

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


    // ============= upload image drag and drop===============//


    const handleDrop = (e) => {
        e.preventDefault();
        const files = [...e.dataTransfer.files];
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setAllImage((prevImages) => [...prevImages, ...newImages]);
    };

    const handleUploadClick = () => {



        console.log('uploaded images ===== ', allImage);
        // Here you can send images to the server or perform any other action with the images
    };


    //============ dragable ===============//
    const [test, setTest] = useState([
        'coverPhoto',
        'photo2',
        'photo3',
        'photo4',
        'photo5',
        'photo6',
        'photo7'

    ])

    const [images, setImages] = useState(Array(allImage.length).fill(null));

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
        const _test = [...allImage];
        const item = _test.splice(dragIndex, 1);
        _test.splice(dragOverIndex, 0, item);

        setAllImage(_test);
    }

    const handleDragEnter = (index) => {
        setDragOverIndex(index);
    }

    const handleDragLeave = () => {
        setDragIndex(undefined);
    }

    // const handleDragEnd = () => {
    //     setDragIndex(undefined);
    //     setDragOverIndex(undefined);
    // }


    const handleDragEnd = () => {
        setDragIndex(undefined);
        setDragOverIndex(undefined);
        setImages(allImage.map((itm, index) => {
            if (index === dragIndex) {
                return allImage[dragOverIndex].preview;
            }
            if (index === dragOverIndex) {
                return allImage[dragIndex].preview;
            }
            return itm.preview;
        }));

        console.log('end image:::', images);
    };


    console.log(allImage, 'is file');

    return (
        <div>
            {/* image drag and drop */}
            <div className="flex flex-col items-center mt-4">
                <div
                    className="border border-gray-400 relative overflow-hidden border-dashed rounded-lg w-64 h-64 flex flex-col items-center justify-center"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <span className="text-gray-400">Drag & Drop Images Here</span>
                </div>

                <div className="mt-4 grid grid-cols-9 gap-4">
                    {allImage.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={image.preview}
                                alt={`Preview ${index}`}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleUploadClick}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Upload Images
                </button>
            </div>

            {/* start area */}
            {/* <ul className='grid grid-cols-7 gap-3 '>
                {
                    allImage.map((itm, index) => <li
                        style={{
                            backgroundImage: `url(${itm.preview})`,
                        }}
                        className={
                            `${dragOverIndex === index ? "bg-red-300 border" : "bg-green-100 border border-green-600"} h-[140px] rounded-md bg-cover object-cover`
                        }
                        key={index}
                        draggable
                        onDragStart={() => handleDragStart2(index)}
                        onDragOver={handleDragOver2}
                        onDrop={() => handleDrop2(index)}
                        onDragEnter={() => handleDragEnter(index)}
                        onDragLeave={handleDragLeave}
                        onDragEnd={handleDragEnd}>
                        {
                            index
                        }
                    </li>)
                }
            </ul> */}
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