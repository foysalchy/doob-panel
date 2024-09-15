import React from 'react';
import banar1 from './process.png'
import banar2 from './Screenshot ss2020-04-09 at 9 1.png'

const HomeHowWeWork = () => {
    return (
        <div className='bg-[#F2F3F7]'>
            <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
                <h1 className='text-4xl font-extrabold text-center font-inner'>Dropshipping Working Process
                </h1>
                <div className='flex justify-center mt-10'>
                    <div>
                        <img className='rounded-xl' src={banar1} srcSet={banar1} alt="" />
                        <ol className='mt-6 font-poppins flex flex-col gap-2'>
                            <li><p className='font-semibold'><b>Simplified Dropshipping Process</b></p></li>
                            <li>
                                1.<b>  Browse & Select Products</b> – Choose from a vast catalog of products.

                            </li>
                            <li>
                                2.   <b>Add to Your Store </b>– Easily add products to your online store.

                            </li>
                            <li>
                                3. <b> Customer Orders</b> – Customers place orders in your store.

                            </li>
                            <li>
                                4. <b> We Handle the Rest</b> – We handle the packaging and shipping directly to your customers..

                            </li>
                        </ol>
                    </div>
                </div>
                
            </div>

        </div>
    );
};

export default HomeHowWeWork;