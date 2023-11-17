import React from 'react';
import GroupImage from './Group 2.png'

const HomeOmniChannel = () => {
    return (
        <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
            <h2 className="max-w-lg text-center mb-6   text-3xl leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                <span className="relative inline-block font-inner ">

                    <span className="relative font-extrabold italic">  #No.1</span>
                </span>{' '}
                <span className='font-bold font-inner'> OmniChannel</span>
                <br /><span className='font-[10px]'>
                    in Southeast Asia
                </span>
            </h2>

            <img src={GroupImage} alt="" />
        </div>
    );
};

export default HomeOmniChannel;