import React from 'react';
import ShopNav from './ShopComponents/ShopNav';
import { Outlet, useParams } from 'react-router-dom';
import ShopFooter from './ShopComponents/ShopFootter';
import ShopSmallNav from './ShopComponents/ShopSmallNav';
import { useQuery } from '@tanstack/react-query';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json";
import { useState } from 'react';
import { useEffect } from 'react';
import ShopAuth from '../../AuthProvider/ShopAuthProvide';
import { Footer } from './ShopComponents/shopFotterComponent';

import { BiSupport } from 'react-icons/bi'
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { BsMessenger } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

const ShopLayout = () => {
    const [modalShop, setModalShop] = useState(false)
    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;


    const { data: shop = {}, isLoading, refetch } = useQuery({
        queryKey: ["shop"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/${shopId}`);
            const data = await res.json();
            return data;
        },
    });

    useEffect(() => {
        document.getElementsByTagName('head').remove
    })
    const { data: contacts = [] } = useQuery({
        queryKey: ["contact"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/contact/${shopId}`);
            const data = await res.json();
            return data;
        },
    });

    const modalToggol = () => {
        setModalShop(!modalShop);
    };

    return (
        <div >

            {isLoading ?
                <div className="grid h-screen px-4 bg-black place-content-center">
                    <Lottie animationData={groovyWalkAnimation} loop={true} />
                </div>
                :
                <div>

                    {Object.keys(shop).length !== 0 ?
                        <ShopAuth>
                            <div >
                                <ShopSmallNav />
                                <ShopNav />
                                <div className='relative w-[100%] overflow-hidden'>
                                    {<Outlet ></Outlet>}



                                    <button className='fixed bottom-11 right-3'>
                                        <BiSupport onClick={modalToggol} className='text-5xl bg-gray-100 shadow shadow-slate-500 p-2 text-blue-500 rounded-full'></BiSupport>
                                    </button>
                                    {modalShop &&
                                        <div className='fixed bottom-48 right-20 z-50'>
                                            <div
                                                className="absolute end-0 z-10 mt-2 w-44 rounded-md border border-gray-100 bg-white shadow-lg"
                                                role="menu"
                                            >
                                                <div className="p-2">
                                                    {
                                                        contacts.length && contacts?.map((con) => (
                                                            <>
                                                                {con.media === 'Whatsapp' && (
                                                                    <a
                                                                        href={`https://wa.me/${con.URL}`}
                                                                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-teal-700 hover:bg-teal-50"
                                                                        role="menuitem"
                                                                        target="_blank"
                                                                    >
                                                                        <AiOutlineWhatsApp /> Whatsapp
                                                                    </a>
                                                                )}

                                                                {con.media === 'Messenger' && (
                                                                    <a
                                                                        href="https://www.facebook.com/brightfuturesoft"
                                                                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
                                                                        role="menuitem"
                                                                        target="_blank"
                                                                    >
                                                                        <BsMessenger /> Messenger
                                                                    </a>
                                                                )}


                                                            </>
                                                        ))

                                                    }
                                                    <a
                                                        href={`mailto:${shop?.shopEmail}`}
                                                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                        role="menuitem"
                                                        target="_blank"
                                                    >
                                                        <MdEmail /> Email
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <Footer />
                            </div>
                        </ShopAuth>
                        :
                        <div className="grid h-screen px-4 bg-white place-content-center">
                            <div className="tracking-widest text-xl text-gray-500 uppercase"><span className='text-red-500'>404 </span>| Sorry We can't find this shop</div>
                        </div>


                    }
                </div>
            }
        </div >
    );
};

export default ShopLayout;