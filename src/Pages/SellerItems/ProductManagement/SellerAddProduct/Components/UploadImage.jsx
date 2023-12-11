import React from 'react';
import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



const UploadImage = ({ coverPhoto, setCoverPhoto, youtube, setYoutube }) => {

    const [photo1, setPhoto1] = useState('');
    const [photo2, setPhoto2] = useState('');
    const [photo3, setPhoto3] = useState('');
    const [photo4, setPhoto4] = useState('');
    const [photo5, setPhoto5] = useState('');
    const [photo6, setPhoto6] = useState('');
    const [photo7, setPhoto7] = useState('');

    const [youtubeError, setYoutubeError] = useState(false)


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
        const reader = new FileReader();

        reader.onloadend = () => {
            setter(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
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
                <div className="grid grid-cols-8  mt-4">

                    <div className='w-24'>
                        <label htmlFor="coverPhoto" className='bg-gray-300 w-20 h-20 flex justify-center items-center'>
                            {coverPhoto ? (
                                <img src={coverPhoto} alt="Cover Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className='text-xl'>+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="coverPhoto"
                            name='coverPhoto'
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(event) => handleImageChange(setCoverPhoto, event)}
                        />
                        <p className='text-sm'>Cover Photo <span className='text-red-500'> *</span></p>
                    </div>
                    <div className='w-20 text-center'>
                        <label htmlFor="Photo1" className='bg-gray-300 cursor-pointer w-20 h-20 flex justify-center items-center'>
                            {photo1 ? (
                                <img src={photo1} alt="Cover Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className='text-xl'>+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="Photo1"
                            required
                            name='photo1'
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(event) => handleImageChange(setPhoto1, event)}
                        />
                        <p className='text-sm'>Photo 1</p>
                    </div>
                    <div className='w-20 text-center'>
                        <label htmlFor="Photo2" className='bg-gray-300 cursor-pointer w-20 h-20 flex justify-center items-center'>
                            {photo2 ? (
                                <img src={photo2} alt="Cover Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className='text-xl'>+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="Photo2"
                            name='photo2'
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(event) => handleImageChange(setPhoto2, event)}
                        />
                        <p className='text-sm'>Photo 2</p>
                    </div>
                    <div className='w-20 text-center'>
                        <label htmlFor="Photo3" className='bg-gray-300 cursor-pointer w-20 h-20 flex justify-center items-center'>
                            {photo3 ? (
                                <img src={photo3} alt="Cover Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className='text-xl'>+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="Photo3"
                            name='photo3'
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(event) => handleImageChange(setPhoto3, event)}
                        />
                        <p className='text-sm'>Photo 3</p>
                    </div>
                    <div className='w-20 text-center'>
                        <label htmlFor="Photo4" className='bg-gray-300 cursor-pointer w-20 h-20 flex justify-center items-center'>
                            {photo4 ? (
                                <img src={photo4} alt="Cover Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className='text-xl'>+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="Photo4"
                            name='photo4'
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(event) => handleImageChange(setPhoto4, event)}
                        />
                        <p className='text-sm'>Photo 4</p>
                    </div>
                    <div className='w-20 text-center'>
                        <label htmlFor="Photo5" className='bg-gray-300 cursor-pointer w-20 h-20 flex justify-center items-center'>
                            {photo5 ? (
                                <img src={photo5} alt="Cover Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className='text-xl'>+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="Photo5"
                            name='photo5'
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(event) => handleImageChange(setPhoto5, event)}
                        />
                        <p className='text-sm'>Photo 5</p>
                    </div>
                    <div className='w-20 text-center'>
                        <label htmlFor="Photo6" className='bg-gray-300 cursor-pointer w-20 h-20 flex justify-center items-center'>
                            {photo6 ? (
                                <img src={photo6} alt="Cover Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className='text-xl'>+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="Photo6"
                            name='photo6'
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(event) => handleImageChange(setPhoto6, event)}
                        />
                        <p className='text-sm'>Photo 6</p>
                    </div>
                    <div className='w-20 text-center'>
                        <label htmlFor="Photo7" className='bg-gray-300 cursor-pointer w-20 h-20 flex justify-center items-center'>
                            {photo7 ? (
                                <img src={photo7} alt="Cover Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className='text-xl'>+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="Photo7"
                            name='photo7'
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(event) => handleImageChange(setPhoto7, event)}
                        />
                        <p className='text-sm'>Photo 7</p>
                    </div>

                </div>
                <div className='mt-4'>
                    <label className='text-sm ' htmlFor="Video url "> Video Url</label>
                    <input
                        onChange={(e) => handleCheck(e.target.value)}
                        className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline" placeholder="Input youtube video link here" type="text" name="videoUrl" id="" />
                    {youtubeError && <span className='text-sm text-red-500'>{youtubeError}</span>}
                </div>
            </div>
        </div>
    );

};

export default UploadImage;


