import React, { useState } from 'react';
import Photo1 from './Group 17.png';
import { MdArrowCircleRight } from 'react-icons/md';
import YoutubeModal from '../YoutubeModal';

const HomeAbout = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className=" mx-auto flex flex-wrap">
                        <img
                            srcSet={Photo1}
                            src={Photo1}
                            alt="ecommerce"
                            className="lg:w-[600px] w-full lg:h-[400px] h-auto object-cover object-center rounded"

                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                            <h1 className="text-gray-900 text-4xl title-font font-bold mb-1">
                                About Us
                            </h1>

                            <p className="leading-relaxed mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                            </p>

                            <a
                                href="/"
                                className="inline-flex gap-1 items-center mt-3 justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none"
                            >
                                <MdArrowCircleRight className='text-xl'></MdArrowCircleRight> Learn More
                            </a>
                        </div>
                    </div>
                    <div className=" mx-auto flex flex-wrap mt-20">

                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                            <h1 className="text-gray-900 text-4xl title-font font-bold mb-1">
                                Why Doob
                            </h1>

                            <p className="leading-relaxed mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                            </p>


                        </div>
                        <img
                            onClick={openModal}
                            srcSet={Photo1}
                            src={Photo1}
                            alt="ecommerce"
                            className="lg:w-[600px] lg:pl-10 mt-8 md:mt-0 w-full lg:h-[400px] h-auto object-cover object-center rounded"

                        />
                        <YoutubeModal link={'https://www.youtube.com/embed/rNSIwjmynYQ?si=7YTw727sHfQqEnrC" '} isOpen={isModalOpen} onClose={closeModal} />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomeAbout;