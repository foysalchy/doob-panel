import React from 'react';
import easyToUse from './Benefitsimages/image 2(1).png';
import Customizable from './Benefitsimages/image 2(2).png';
import CleanCode from './Benefitsimages/image 2(3).png';
import BestSupport from './Benefitsimages/image 2(4).png';
import { MdEnhancedEncryption, MdSupportAgent } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import { HiComputerDesktop } from 'react-icons/hi2';
import { AiFillCloud } from 'react-icons/ai';

const Benefits = () => {
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 gap-3 mx-auto mb-3 rounded-xl bg-gray-100 ">
                        <MdSupportAgent className='text-5xl text-black' />
                    </div>

                    <p className="mb-2 font-bold text-md">Customer Support</p>
                    <p className="text-gray-700 text-sm">
                        6 (days) x 12 (hours) prompt, personalized, and professional Customer Service to ensure your success and business productivity
                    </p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 gap-3 mx-auto mb-3 rounded-xl bg-gray-100 ">
                        <FaPeopleGroup className='text-5xl text-black' />
                    </div>

                    <p className="mb-2 font-bold text-md">Rich Experience</p>
                    <p className="text-gray-700 text-sm">
                        We are an eCommerce solution provider with 8 more years of experience
                    </p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 gap-3 mx-auto mb-3 rounded-xl bg-gray-100 ">
                        <HiComputerDesktop className='text-5xl text-black' />
                    </div>

                    <p className="mb-2 font-bold text-md">Marketplace Integration</p>
                    <p className="text-gray-700 text-sm">
                        SeleNow is the third-party e-commerce ERP certified by mainstream marketplaces in Southeast Asia.
                    </p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 gap-3 mx-auto mb-3 rounded-xl bg-gray-100 ">
                        <MdEnhancedEncryption className='text-5xl text-black' />
                    </div>

                    <p className="mb-2 font-bold text-md">Encryption Technology</p>
                    <p className="text-gray-700 text-sm">
                        Secure Sockets Layer (SSL) has been used to ensure that your connection with BigSeller is secure
                    </p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 gap-3 mx-auto mb-3 rounded-xl bg-gray-100 ">
                        <AiFillCloud className='text-5xl text-black' />
                    </div>

                    <p className="mb-2 font-bold text-md">Secure Cloud Service</p>
                    <p className="text-gray-700 text-sm">
                        We are using the most secure cloud storage service
                    </p>
                </div>

            </div>
        </div>

    );
};

export default Benefits;