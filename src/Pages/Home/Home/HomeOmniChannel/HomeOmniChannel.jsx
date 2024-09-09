import React from 'react';
import GroupImage from './Group 2.png'
import daraz from '../clients/Daraz.svg';
import WordPress from '../clients/WordPress.com_.svg';
import woocommarce from '../clients/woocommerce-icon.svg';
import googleLogo from '../clients/google.svg';
import domain from '../clients/domain.png';
import netflixLogo from '../clients/netflix.svg';
import googleCloudLogo from '../clients/google-cloud.svg';

const HomeOmniChannel = () => {
      return (

            <div style={{ background: "#f5f5f5" }}>
                  <div className="px-4 py-5 pt-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
                        <h2 className="text-center mb-6   text-3xl leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto ">
                              <span className="relative inline-block font-inner ">

                                    <span className="relative font-extrabold italic">  #No.1</span>
                              </span>{' '}
                              <span className='font-bold font-inner'> OmniChannel
                                    in Southeast Asia
                              </span>

                        </h2>
                        <h1 className='text-xl font-semibold text-center mb-10'>We are a leading, highest-performing, and flexible eCommerce solution provider</h1>

                        {/* <img src={GroupImage} srcSet={GroupImage} alt="" /> */}
                        <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
                              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                    <img src={daraz} className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
                              </div>
                              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                    <img src={WordPress} className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
                              </div>
                              <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
                                    <img src={woocommarce} className="h-9 w-auto m-auto" loading="lazy" alt="client logo" />
                              </div>

                              <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
                                    <img title='Domain Integration'  src={domain} className="h-8 w-auto m-auto" loading="lazy" alt="client logo" />
                              </div>
                              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                    <img src={googleLogo} className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default HomeOmniChannel;
