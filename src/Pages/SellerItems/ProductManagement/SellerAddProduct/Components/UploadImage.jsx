import React from 'react';
import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import DragImgBox from './DragImgBox';
import { arrayMove } from '@dnd-kit/sortable';

const UploadImage = ({ coverPhoto, setCoverPhoto, youtube, setYoutube }) => {

    const [photo1, setPhoto1] = useState('');
    const [photo2, setPhoto2] = useState('');
    const [photo3, setPhoto3] = useState('');
    const [photo4, setPhoto4] = useState('');
    const [photo5, setPhoto5] = useState('');
    const [photo6, setPhoto6] = useState('');
    const [photo7, setPhoto7] = useState('');
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
    const handleImageChange = (setter, event) => {
        const file = event.target.files[0];
        console.log(file);
        setter(URL.createObjectURL(file));
    };

    const [activeId, setActiveId] = useState(null);

    const handleDragStart = (event) => {
        setDeletItem(event.target.id);
        setActiveId(event.target.src)
        event.dataTransfer.setData("index", event.target.id);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (setter1, setter2, event) => {
        const draggedIndex = event.dataTransfer.getData("index");
        const draggedPhoto = document.getElementById(draggedIndex).src;
        console.log(activeId, draggedPhoto, event);

        if (draggedPhoto) {
            if ('coverPhoto' === deletItem) {
                setCoverPhoto('');
            }
            if ('Photo1' === deletItem) {
                setPhoto1('');
            }
            else if ('Photo2' === deletItem) {
                setPhoto2('');
            }
            else if ('Photo3' === deletItem) {
                setPhoto3('');
            }
            else if ('Photo4' === deletItem) {
                setPhoto4('');
            }
            else if ('Photo5' === deletItem) {
                setPhoto5('');
            }
            else if ('Photo6' === deletItem) {
                setPhoto6('');
            } else if ('Photo7' === deletItem) {
                setPhoto7('');
            }

            setter1(draggedPhoto);
            setter2(null); // Clear the image from the target slot
        }
    };


    return (
        <div>
            <div className='border border-gray-400 px-10 py-5 w-full bg-gray-100 rounded'>
                <div className='flex flex-col'>
                    <span className='font-bold'>Product Images & Video</span>
                    <small>Your product images is the first thing your customer sees on the product page.</small>
                </div>
                <div className='flex flex-col mt-3'>
                    <span>Product Images <span className='text-red-500'> *</span></span>
                    <small>Upload between 3 to 8 images</small>
                </div>

                <div className="grid md:grid-cols-8 gap-2 grid-cols-2 mt-4">

                    <div
                        className="md:w-20  text-center relative flex items-center justify-center flex-col"
                        onDragOver={(event) => handleDragOver(event)}
                        onDrop={(event) => handleDrop(setCoverPhoto, setPhoto1, event)} >
                        <label
                            htmlFor="coverPhoto"
                            className="bg-gray-300  cursor-pointer md:w-20 h-20 flex justify-center items-center"
                            draggable={true}
                            onDragStart={(event) => handleDragStart(event)}

                        >
                            {coverPhoto ? (
                                <div className='relative'>
                                    <img
                                        src={coverPhoto}
                                        id="coverPhoto"
                                        alt="coverPhoto Preview"
                                        className="w-full h-full object-cover cursor-grab"
                                    />

                                </div>

                            ) : (
                                <span className="text-xl">+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="coverPhoto"

                            className='w-[20px] absolute top-0 left-0 bottom-0 right-0 m-auto overflow-hidden opacity-0 cursor-pointer'
                            name="coverPhoto"
                            accept="image/*"
                            style={{ display: "block" }}
                            onChange={(event) => handleImageChange(setCoverPhoto, event)}
                        />

                        <input
                            type="file"
                            id="coverPhoto"
                            className=''
                            name="coverPhoto"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(event) => handleImageChange(setCoverPhoto, event)}
                        />
                        <p className="text-sm">Cover Photo</p>
                    </div>

                    <div
                        className="md:w-20 text-center relative"
                        onDragOver={(event) => handleDragOver(event)}
                        onDrop={(event) => handleDrop(setPhoto1, setPhoto2, event)} // Transfer photo2 to photo1
                    >
                        <label
                            htmlFor="Photo1"
                            className="bg-gray-300 cursor-pointer md:w-20 h-20 flex justify-center items-center"
                            draggable
                            onDragStart={(event) => handleDragStart(event)}
                        >
                            {photo1 ? (
                                <img
                                    src={photo1}
                                    id="Photo1"
                                    alt="Photo 1 Preview"
                                    className="w-full h-full object-cover cursor-grab"
                                />
                            ) : (
                                <span className="text-xl">+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="Photo1"

                            name="photo1"
                            className='absolute top-0 left-0 bottom-0 right-0 m-auto overflow-hidden w-[20px] opacity-0 cursor-pointer'
                            accept="image/*"
                            style={{ display: "block" }}
                            onChange={(event) => handleImageChange(setPhoto1, event)}
                        />
                        <input
                            type="file"
                            id="Photo1"

                            name="photo1"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(event) => handleImageChange(setPhoto1, event)}
                        />
                        <p className="text-sm">Photo 1</p>
                    </div>

                    <div
                        className="md:w-20 text-center relative"
                        onDragOver={(event) => handleDragOver(event)}
                        onDrop={(event) => handleDrop(setPhoto2, setPhoto3, event)} // Transfer photo3 to photo2
                    >
                        <label
                            htmlFor="Photo2"
                            className="bg-gray-300 cursor-pointer md:w-20 h-20 flex justify-center items-center"
                            draggable
                            onDragStart={(event) => handleDragStart(event)}
                        >
                            {photo2 ? (
                                <img
                                    src={photo2}
                                    id="Photo2"
                                    alt="Photo 2 Preview"
                                    className="w-full h-full object-cover cursor-grab"
                                />
                            ) : (
                                <span className="text-xl">+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="Photo2"

                            name="photo2"
                            accept="image/*"
                            className='absolute top-0 left-0 bottom-0 right-0 m-auto overflow-hidden w-[20px] opacity-0 cursor-pointer'
                            style={{ display: "block" }}
                            onChange={(event) => handleImageChange(setPhoto2, event)}
                        />
                        <input
                            type="file"
                            id="Photo2"

                            name="photo2"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(event) => handleImageChange(setPhoto2, event)}
                        />
                        <p className="text-sm">Photo 2</p>
                    </div>

                    <div
                        className="md:w-20 text-center relative"
                        onDragOver={(event) => handleDragOver(event)}
                        onDrop={(event) => handleDrop(setPhoto3, setPhoto4, event)} // Transfer photo4 to photo3
                    >
                        <label
                            htmlFor="Photo3"
                            className="bg-gray-300 cursor-pointer md:w-20 h-20 flex justify-center items-center"
                            draggable
                            onDragStart={(event) => handleDragStart(event)}
                        >
                            {photo3 ? (
                                <img
                                    src={photo3}
                                    id="Photo3"
                                    alt="Photo 3 Preview"
                                    className="w-full h-full object-cover cursor-grab"
                                />
                            ) : (
                                <span className="text-xl">+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="Photo3"

                            name="photo3"
                            className='absolute top-0 left-0 bottom-0 right-0 m-auto overflow-hidden w-[20px] opacity-0 cursor-pointer'
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(event) => handleImageChange(setPhoto3, event)}
                        />
                        <input
                            type="file"
                            id="Photo3"

                            name="photo3"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(event) => handleImageChange(setPhoto3, event)}
                        />
                        <p className="text-sm">Photo 3</p>
                    </div>

                    <div
                        className="md:w-20 text-center relative"
                        onDragOver={(event) => handleDragOver(event)}
                        onDrop={(event) => handleDrop(setPhoto4, () => { }, event)} // No next slot for photo4
                    >
                        <label
                            htmlFor="Photo4"
                            className="bg-gray-300 cursor-pointer md:w-20 h-20 flex justify-center items-center"
                            draggable
                            onDragStart={(event) => handleDragStart(event)}
                        >
                            {photo4 ? (
                                <img
                                    src={photo4}
                                    id="Photo4"
                                    alt="Photo 4 Preview"
                                    className="w-full h-full object-cover cursor-grab"
                                />
                            ) : (
                                <span className="text-xl">+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="Photo4"

                            name="photo4"
                            accept="image/*"
                            className='absolute top-0 left-0 bottom-0 right-0 m-auto overflow-hidden w-[20px] opacity-0 cursor-pointer'
                            style={{ display: "block" }}
                            onChange={(event) => handleImageChange(setPhoto4, event)}
                        /> <input
                            type="file"
                            id="Photo4"

                            name="photo4"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(event) => handleImageChange(setPhoto4, event)}
                        />
                        <p className="text-sm">Photo 4</p>
                    </div>

                    <div
                        className="md:w-20 text-center relative"
                        onDragOver={(event) => handleDragOver(event)}
                        onDrop={(event) => handleDrop(setPhoto5, setPhoto6, event)} // Transfer photo4 to photo3
                    >
                        <label
                            htmlFor="Photo5"
                            className="bg-gray-300 cursor-pointer md:w-20 h-20 flex justify-center items-center"
                            draggable
                            onDragStart={(event) => handleDragStart(event)}
                        >
                            {photo5 ? (
                                <img
                                    src={photo5}
                                    id="Photo5"
                                    alt="Photo 5 Preview"
                                    className="w-full h-full object-cover cursor-grab"
                                />
                            ) : (
                                <span className="text-xl">+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="Photo5"

                            name="photo5"
                            accept="image/*"
                            className='absolute top-0 left-0 bottom-0 right-0 m-auto overflow-hidden w-[20px] opacity-0 cursor-pointer'
                            style={{ display: "block" }}
                            onChange={(event) => handleImageChange(setPhoto5, event)}
                        />
                        <input
                            type="file"
                            id="Photo5"

                            name="photo5"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(event) => handleImageChange(setPhoto5, event)}
                        />
                        <p className="text-sm">Photo 5</p>
                    </div>

                    <div
                        className="md:w-20 text-center relative"
                        onDragOver={(event) => handleDragOver(event)}
                        onDrop={(event) => handleDrop(setPhoto6, setPhoto7, event)} // Transfer photo4 to photo3
                    >
                        <label
                            htmlFor="Photo6"
                            className="bg-gray-300 cursor-pointer md:w-20 h-20 flex justify-center items-center"
                            draggable
                            onDragStart={(event) => handleDragStart(event)}
                        >
                            {photo6 ? (
                                <img
                                    src={photo6}
                                    id="Photo6"
                                    alt="Photo 6 Preview"
                                    className="w-full h-full object-cover cursor-grab"
                                />
                            ) : (
                                <span className="text-xl">+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="Photo5"

                            name="photo6"
                            accept="image/*"
                            className='absolute top-0 left-0 bottom-0 right-0 m-auto overflow-hidden w-[20px] opacity-0 cursor-pointer'
                            style={{ display: "block" }}
                            onChange={(event) => handleImageChange(setPhoto6, event)}
                        /> <input
                            type="file"
                            id="Photo5"

                            name="photo6"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(event) => handleImageChange(setPhoto6, event)}
                        />
                        <p className="text-sm">Photo 6</p>
                    </div>

                    {/* 7 */}
                    <div
                        className="md:w-20 text-center relative"
                        onDragOver={(event) => handleDragOver(event)}
                        onDrop={(event) => handleDrop(setPhoto7, setPhoto1, event)} // Transfer photo4 to photo3
                    >
                        <label
                            htmlFor="Photo7"
                            className="bg-gray-300 cursor-pointer md:w-20 h-20 flex justify-center items-center"
                            draggable
                            onDragStart={(event) => handleDragStart(event)}
                        >
                            {photo7 ? (
                                <img
                                    src={photo7}
                                    id="Photo7"
                                    alt="Photo 7 Preview"
                                    className="w-full h-full object-cover cursor-grab"
                                />
                            ) : (
                                <span className="text-xl">+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="Photo6"

                            name="photo7"
                            accept="image/*"
                            className='absolute top-0 left-0 bottom-0 right-0 m-auto overflow-hidden w-[20px] opacity-0 cursor-pointer'
                            style={{ display: "block" }}
                            onChange={(event) => handleImageChange(setPhoto7, event)}
                        /> <input
                            type="file"
                            id="Photo6"

                            name="photo7"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(event) => handleImageChange(setPhoto7, event)}
                        />
                        <p className="text-sm">Photo 7</p>
                    </div>
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
