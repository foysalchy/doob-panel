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
                                                Doob is a multivendor eCommerce website designed to allow multiple sellers to showcase and sell their products on a single platform. By enabling vendors to list and manage their own products, Doob provides a diverse shopping experience for users, offering a wide range of items across various categories.

                                                As a multivendor marketplace, Doob ensures that vendors can manage their store independently, handle orders, manage inventory, and set product prices. Customers, in turn, benefit from the variety and competitive pricing that comes from multiple sellers operating in one place.
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
                                                Doob is a multivendor eCommerce platform that offers a wide range of products from various sellers, providing customers with diverse options in one place. It supports business growth for vendors with a ready-made marketplace, saving time and costs. The platform ensures secure transactions, competitive pricing due to seller competition, and a seamless shopping experience for buyers. With features like user reviews and easy scalability, Doob is an ideal choice for both customers and businesses looking for convenience and growth.
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
                              <div className=" mx-auto flex flex-row-reverse flex-wrap mt-20">

                                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                                          <h1 className="text-gray-900 text-4xl title-font font-bold mb-1">
                                                Doob Wholsale
                                          </h1>

                                          <p className="leading-relaxed mt-2">
                                                Doob Wholesale is a specialized section of the Doob eCommerce platform designed for bulk purchasing. It caters to businesses or individuals seeking wholesale products at competitive rates, allowing them to buy in large quantities directly from multiple vendors. This feature benefits both buyers and sellers by streamlining bulk transactions, offering better pricing, and simplifying inventory management.

                                                For wholesalers, Doob provides a centralized platform to reach more customers and expand their distribution network. Buyers enjoy access to a wide range of wholesale products, making Doob Wholesale an efficient solution for bulk purchasing needs.
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
