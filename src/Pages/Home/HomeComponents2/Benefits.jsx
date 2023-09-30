import React from 'react';
import easyToUse from './Benefitsimages/image 2(1).png';
import Customizable from './Benefitsimages/image 2(2).png';
import CleanCode from './Benefitsimages/image 2(3).png';
import BestSupport from './Benefitsimages/image 2(4).png';

const Benefits = () => {
    return (
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20  '>
            <div className='grid grid-cols-2 md:grid-cols-4 '>
                <div className='flex gap-5 justify-center items-center'>
                    <div className='bg-gray-200 p-5 rounded-full'>
                        <img className='w-5' src={easyToUse} alt="" />
                    </div>
                    <h1 className='text-xl font-semibold font-inner'>Easy To Use</h1>
                </div>
                <div className='flex gap-5 items-center'>
                    <div className='bg-gray-200 p-5 rounded-full'>
                        <img className='w-5' src={Customizable} alt="" />
                    </div>
                    <h1 className='text-xl font-semibold font-inner'>Customizable</h1>
                </div>
                <div className='flex gap-5 items-center'>
                    <div className='bg-gray-200 p-5 rounded-full'>
                        <img className='w-5' src={CleanCode} alt="" />
                    </div>
                    <h1 className='text-xl font-semibold font-inner'>Clean Code</h1>
                </div>
                <div className='flex gap-5 items-center'>
                    <div className='bg-gray-200 p-5 rounded-full'>
                        <img className='w-5' src={BestSupport} alt="" />
                    </div>
                    <h1 className='text-xl font-semibold font-inner'>Best support</h1>
                </div>


            </div>
        </div>
    );
};

export default Benefits;