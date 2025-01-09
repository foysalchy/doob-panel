import React from 'react';
import GroupImage from './Group 2.png'
import daraz from '../clients/daraz.png';
import domain from '../clients/domain.png';
import pathao from '../clients/pathao.svg';
import steadfast from '../clients/steadfast.svg';
import woo from '../clients/woo.png';

const HomeOmniChannel = () => {
      return (

            <div style={{ background: "#f5f5f5" }}>
                  <div className="px-4 py-5 pt-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
                        <h2 className="text-center mb-6 theme_colour  text-3xl leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto ">
                              <span className="relative inline-block font-inner ">

                                    <span className="relative font-extrabold italic">  #No.1</span>
                              </span>{' '}
                              <span className='font-bold font-inner'> OmniChannel
                                    in Bangladesh
                              </span>

                        </h2>
                        <h1 className='text-xl font-semibold text-center mb-10'>We are a leading, highest-performing, and flexible eCommerce & Intergation solution provider</h1>

                        {/* <img src={GroupImage} srcSet={GroupImage} alt="" /> */}
                        <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
                              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                    <img src={daraz} className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
                              </div>
                              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                    <img src={woo} className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
                              </div>
                              
                              <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
                                    <img title='Domain Integration'  src={domain} className="h-8 w-auto m-auto" loading="lazy" alt="client logo" />
                              </div>
                              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                    <img src={steadfast} className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
                              </div>
                              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                    <img src={pathao} className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default HomeOmniChannel;
