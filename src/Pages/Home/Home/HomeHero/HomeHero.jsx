import React, { useState } from 'react';
import { MdPlayCircleFilled } from "react-icons/md";
import Bg from './Group 1000005940.png'
import YoutubeModal from '../YoutubeModal';
import BrightAlert from 'bright-alert';





const HomeHero = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (

        <section className="relative overflow-hidden py-32 px-4 bg-gray-100 md:px-8">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-[#58AEF1] to-pink-500 absolute -top-12 -right-14 blur-2xl opacity-10"></div>
            <div className="max-w-xl mx-auto text-center relative">
                <div className="max-w-xl sm:mx-auto lg:max-w-2xl ">
                    <div className="flex flex-col mb-16 sm:text-center sm:mb-0">

                        <div className="max-w-xl mb-6 md:mx-auto sm:text-center lg:max-w-2xl md:mb-10">
                            <h1 className='font-inner text-xl font-semibold'>
                                Start Business Right Now!!
                            </h1>

                            <h1 className='text-4xl mt-2 '>
                                <span className='font-extrabold'>Doob -</span> <span className='font-bold'> The Choice of</span>
                                <br />
                                <span className='text-3xl font-semibold '>
                                    280,000+ Southeast Asia Sellers
                                </span>
                            </h1>
                            <p className="text-base text-gray-700 md:text-lg mt-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                            </p>
                        </div>
                        <div className='flex gap-4 md:justify-center'>
                            <button
                                onClick={() => BrightAlert()}
                                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none"
                            >
                                Get started
                            </button>
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
        </section>
    );
};

export default HomeHero;