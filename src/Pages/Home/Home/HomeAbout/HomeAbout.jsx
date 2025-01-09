import React, { useState } from 'react';
import Photo1 from './3.png';
import Photo2 from './slot2.png';
import Photo3 from './omni.jpeg';
import Photo5 from './daraz.jpeg';
import Photo4 from './pos.jpeg';
import courier from './6.png';
import security from './7.png';
import marketing from './8.png';
import { MdArrowCircleRight } from 'react-icons/md';
import YoutubeModal from '../YoutubeModal';
import { Link, NavLink, useLocation } from "react-router-dom";


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
                  <section className="text-gray-600 body-font bar overflow-hidden">
                        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                              <div className=" mx-auto flex items-center flex-wrap">
                                    <div className='md:w-1/2  w-full'>
                                          <img
                                                srcSet={Photo1}
                                                src={Photo1}
                                                alt="ecommerce"
                                                className="rounded-xl md:w-[80%] w-[100%] m-auto  lg:h-[auto] h-auto object-cover object-center rounded"

                                          />
                                    </div>
                                    <div className="md:w-1/2 w-full md:pl-10 lg:py-6 mt-6 lg:mt-0">

                                          <h1 className="text-gray-900 lg:text-4xl  md:text-2xl   theme_colour text-xl title-font font-bold mb-1">
                                                Free Online Store

                                          </h1>

                                          <p className="leading-relaxed text-xl text-2xl text-1xl mt-2">
                                                <b>Launch Your Free Online Store</b> Get started with a fully customizable online store at no cost! Whether you're a beginner or an experienced entrepreneur, our platform is designed to scale with your business needs. Effortlessly manage your store and reach customers all over Bangladesh.

                                          </p>

                                          {/* <NavLink
                                                 to="/sign-up"
                                                className="inline-flex gap-1 items-center mt-3 justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none"

                                          >
                                                 <MdArrowCircleRight className='text-xl'></MdArrowCircleRight> Create Store
                                          </NavLink> */}
                                    </div>
                              </div>
                              <div className=" mx-auto flex items-center flex-wrap mt-20">
                                    <div className='md:w-1/2  w-full block md:hidden lg:hidden'>
                                          <img

                                                srcSet={Photo2}
                                                src={Photo2}
                                                alt="ecommerce"
                                                className="rounded-xl w-[100%] m-auto  lg:h-[auto] h-auto object-cover object-center rounded"
                                          />
                                    </div>
                                    <div className="md:w-1/2 w-full md:pr-10 lg:py-6 mt-6 lg:mt-0">

                                          <h1 className="text-gray-900 lg:text-4xl  md:text-2xl   theme_colour text-xl title-font font-bold mb-1">
                                          PICK, PACK, & SHIP 
                                           

                                          </h1>

                                          <p className="leading-relaxed text-xl text-2xl text-1xl mt-2">
                                                <b>Streamline Your Operations with Efficient Warehouse Management</b> Our advanced warehouse management system ensures that your products are always in stock and ready for quick dispatch. Enjoy real-time inventory tracking, efficient order processing, and hassle-free logistics.

                                          </p>


                                    </div>
                                    <div className='md:w-1/2  w-full hidden md:block lg:block'>
                                          <img

                                                srcSet={Photo2}
                                                src={Photo2}
                                                alt="ecommerce"
                                                className="rounded-xl w-[80%] m-auto  lg:h-[auto] h-auto object-cover object-center rounded"
                                          />
                                    </div>

                              </div>
                              <div className=" mx-auto flex flex-row-reverse items-center flex-wrap mt-20">
                                    <div className='md:w-1/2  w-full md:hidden lg:hidden block'>
                                          <img

                                                srcSet={Photo5}
                                                src={Photo5}
                                                alt="ecommerce"
                                                className="rounded-xl w-[100%] m-auto  lg:h-[auto] h-auto object-cover object-center rounded"
                                          />
                                    </div>
                                    <div className="md:w-1/2 w-full md:pl-10 lg:py-6 mt-6 lg:mt-0">

                                          <h1 className="text-gray-900 lg:text-4xl  md:text-2xl   theme_colour text-xl title-font font-bold mb-1">
                                                Automatic Sync with Daraz, WooCommerce, and Facebook

                                          </h1>

                                          <p className="leading-relaxed text-xl text-2xl text-1xl mt-2">
                                                <b>Stay Connected with Automatic Sync</b> Never miss a sale with our automatic synchronization across Daraz, WooCommerce, and Facebook. Your products, prices, and inventory are always up-to-date, ensuring a seamless shopping experience for your customers across all platforms.

                                          </p>


                                    </div>
                                    <div className='md:w-1/2  w-full md:block lg:block hidden'>
                                          <img

                                                srcSet={Photo5}
                                                src={Photo5}
                                                alt="ecommerce"
                                                className="rounded-xl w-[80%] m-auto  lg:h-[auto] h-auto object-cover object-center rounded"
                                          />
                                    </div>

                              </div>
                              <div className=" mx-auto flex items-center flex-wrap mt-20">
                                    <div className='md:w-1/2  w-full md:hidden lg:hidden block'>
                                          <img

                                                srcSet={Photo4}
                                                src={Photo4}
                                                alt="ecommerce"
                                                className="rounded-xl w-[100%] m-auto  lg:h-[auto] h-auto object-cover object-center rounded"
                                          />
                                    </div>
                                    <div className="md:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                                          <h1 className="text-gray-900 lg:text-4xl  md:text-2xl   theme_colour text-xl title-font font-bold mb-1">
                                                POS (Point of Sale) System


                                          </h1>

                                          <p className="leading-relaxed text-xl text-2xl text-1xl mt-2">
                                                <b>Seamless Integration with POS </b>     Whether you’re selling online or offline, our integrated POS system keeps your sales in sync. Manage your inventory, process transactions, and view sales reports—all in one place.


                                          </p>


                                    </div>
                                    <div className='md:w-1/2  w-full md:block lg:block hidden'>
                                          <img

                                                srcSet={Photo4}
                                                src={Photo4}
                                                alt="ecommerce"
                                                className="rounded-xl w-[80%] m-auto  lg:h-[auto] h-auto object-cover object-center rounded"
                                          />
                                    </div>

                              </div>
                              <div className=" mx-auto flex   items-center flex-wrap mt-20">
                              <div className='md:w-1/2  w-full'>
                                          <img

                                                srcSet={Photo3}
                                                src={Photo3}
                                                alt="ecommerce"
                                                className="rounded-xl md:w-[80%] w-[100%] m-auto  lg:h-[auto] h-auto object-cover object-center rounded"
                                          />
                                    </div>
                                    <div className="md:w-1/2 w-full md:pl-10 lg:py-6 mt-6 lg:mt-0">

                                          <h1 className="text-gray-900 lg:text-4xl  md:text-2xl   theme_colour text-xl title-font font-bold mb-1">
                                                Omni Chat 

                                          </h1>

                                          <p className="leading-relaxed text-xl text-2xl text-1xl mt-2">
                                                <b> Connect with Customers through Omni Chat</b> Engage with your customers wherever they are! Our Omni Chat feature integrates Daraz, Facebook, and WhatsApp, allowing you to manage all your customer communications from one dashboard.

                                          </p>


                                    </div>
                                   

                              </div>
                              <div className=" mx-auto flex items-center flex-wrap mt-20">
                                    <div className='md:w-1/2  w-full block md:hidden lg:hidden'>
                                          <img

                                                srcSet={security}
                                                src={security}
                                                alt="ecommerce"
                                                className="rounded-xl w-[100%] m-auto  lg:h-[auto] h-auto object-cover object-center rounded"
                                          />
                                    </div>
                                    <div className="md:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                                          <h1 className="text-gray-900 lg:text-4xl  md:text-2xl   theme_colour text-xl title-font font-bold mb-1">
                                          Fraud customer checking 


                                          </h1>

                                          <p className="leading-relaxed text-xl text-2xl text-1xl mt-2">
                                          Instant Phone Number Verification: Detect fraudulent customers in real-time to protect your business.


                                          </p>


                                    </div>
                                    <div className='md:w-1/2  w-full hidden md:block lg:block'>
                                          <img

                                                srcSet={security}
                                                src={security}
                                                alt="ecommerce"
                                                className="rounded-xl w-[80%] m-auto  lg:h-[auto] h-auto object-cover object-center rounded"
                                          />
                                    </div>

                              </div>
                              <div className=" mx-auto flex   items-center flex-wrap mt-20">
                              <div className='md:w-1/2  w-full'>
                                          <img

                                                srcSet={marketing}
                                                src={marketing}
                                                alt="ecommerce"
                                                className="rounded-xl md:w-[80%] w-[100%] m-auto  lg:h-[auto] h-auto object-cover object-center rounded"
                                          />
                                    </div>
                                    <div className="md:w-1/2 w-full md:pl-10 lg:py-6 mt-6 lg:mt-0">

                                          <h1 className="text-gray-900 lg:text-4xl  md:text-2xl   theme_colour text-xl title-font font-bold mb-1">
                                          Marketing 


                                          </h1>

                                          <p className="leading-relaxed text-xl text-2xl text-1xl mt-2">
                                          Our comprehensive marketing solution combines the power of Facebook, Google, email, and SMS to help businesses reach their target audience effectively.


                                          </p>


                                    </div>
                                    

                              </div>
                              <div className=" mx-auto flex items-center flex-wrap mt-20">
                              <div className='md:w-1/2  w-full block md:hidden lg:hidden'>
                                          <img

                                                srcSet={courier}
                                                src={courier}
                                                alt="ecommerce"
                                                className="rounded-xl w-[100%] m-auto  lg:h-[auto] h-auto object-cover object-center rounded"
                                          />
                                    </div>

                                    <div className="md:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                                          <h1 className="text-gray-900 lg:text-4xl  md:text-2xl   theme_colour text-xl title-font font-bold mb-1">
                                          Auto courier booking


                                          </h1>

                                          <p className="leading-relaxed text-xl text-2xl text-1xl mt-2">
                                          Auto courier booking streamlines the process of scheduling deliveries by automating booking tasks through an easy-to-use platform.


                                          </p>


                                    </div>
                                    <div className='md:w-1/2  w-full hidden md:block lg:block'>
                                          <img

                                                srcSet={courier}
                                                src={courier}
                                                alt="ecommerce"
                                                className="rounded-xl w-[80%] m-auto  lg:h-[auto] h-auto object-cover object-center rounded"
                                          />
                                    </div>

                              </div>      
                        </div>
                  </section>

            </div>
      );
};

export default HomeAbout;
