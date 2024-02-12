import React from 'react';
import MultiStepForm from './Multistep';
import DemoNav from './DemoNav';

const SellerShopInfo = () => {
    return (
        <div className=' sm:max-w-xl mx-auto md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
            <div className='flex w-full gap-6 mt-4 '>
                <div className='sticky w-[320px]  rounded mb-4 top-0 h-full min-h-screen  bg-gray-900 text-white'>
                    <DemoNav />
                </div>
                <div className='w-full'>
                    <form className=' mx-auto rounded border-2 p-6' action="">
                        <div className='' >


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