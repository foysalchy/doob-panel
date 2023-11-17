import React, { useState } from 'react';
import { MdPlayCircleFilled } from "react-icons/md";
import Bg from './Group 1000005940.png'
import YoutubeModal from '../YoutubeModal';

const HomeHero = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (

        <div className="relative">
            <img
                src={Bg}
                className="absolute inset-0 object-cover w-full h-full"
                alt=""
            />
            <div className="px-4 pt-16 relative mx-auto sm:max-w-xl md:max-w-full  lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="max-w-xl sm:mx-auto lg:max-w-2xl ">
                    <div className="flex flex-col mb-16 sm:text-center sm:mb-0">

                        <div className="max-w-xl mb-6 md:mx-auto sm:text-center lg:max-w-2xl md:mb-10">
                            <h1 className='font-inner text-xl font-semibold'>
                                Start Business Right Now!!
                            </h1>

                            <h1 className='text-4xl mt-2 '>
                                <span className='font-extrabold'>SaleNow -</span> <span className='font-bold'> The Choice of</span>
                                <br />
                                <span className='text-3xl font-semibold '>
                                    580,000+ Southeast Asia Sellers
                                </span>
                            </h1>
                            <p className="text-base text-gray-700 md:text-lg mt-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                            </p>
                        </div>
                        <div className='flex gap-4 md:justify-center'>
                            <a
                                href="/"
                                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none"
                            >
                                Get started
                            </a>
                            <button
                                onClick={openModal}
                                className="inline-flex gap-1 items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none"
                            >
                                <MdPlayCircleFilled className='text-xl'></MdPlayCircleFilled>  Watch Now
                            </button>
                        </div>
                        <YoutubeModal link={'https://www.youtube.com/embed/dgCM3SlbSkI?si=Ogc3VXxS0EvYE4Yp" '} isOpen={isModalOpen} onClose={closeModal} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeHero;