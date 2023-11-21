import React from 'react';
import banar1 from './ezgif-4-cf6b47b9c2 2.png'
import banar2 from './Screenshot ss2020-04-09 at 9 1.png'

const HomeHowWeWork = () => {
    return (
        <div className='bg-[#F2F3F7]'>
            <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
                <h1 className='text-4xl font-extrabold text-center font-inner'>How We Work</h1>
                <div className='flex justify-center mt-10'>
                    <div>
                        <img className='rounded-xl' src={banar1} srcSet={banar1} alt="" />
                        <ol className='mt-6 font-poppins flex flex-col gap-2'>
                            <li>
                                1.  Upload your product details such as photos, description, price etc on to Kumoten
                            </li>
                            <li>
                                2.  Your products once listed on Kumoten will be shown to thousands of Kumoten Dropshipper (sellers)
                            </li>
                            <li>
                                3.  Sellers Select and Sync your products to their shops on Lazada and Shopee.
                            </li>
                            <li>
                                4.  Your products will go live on Lazada and Shopee within few minutes and ready for Shoppers to buy online
                            </li>
                        </ol>
                    </div>
                </div>
                <div className='flex justify-center mt-10'>

                    <img className='rounded-xl' srcSet={banar2} alt="" />
                </div>
            </div>

        </div>
    );
};

export default HomeHowWeWork;