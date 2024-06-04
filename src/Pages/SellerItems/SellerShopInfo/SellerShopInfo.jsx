import React from 'react';
import MultiStepForm from './Multistep';
import DemoNav from './DemoNav';

const SellerShopInfo = () => {
    return (
        <div className=' '>

            <div className='flex w-full gap-6  '>
                <div className='sticky w-[320px]   mb-4 top-0 h-full min-h-screen  bg-gray-900 text-white'>
                    <DemoNav />
                </div>
                <div className='w-full mt-4'>
                    <form className=' mx-auto rounded border-2 p-6' action="">
                        <div className='' >

                            <div className='text-center text-xl font-bold border-b pb-2 capitalize'>You must to complete all the fields</div>

                            <div className='lg:p-10'>

                                <MultiStepForm />
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellerShopInfo;