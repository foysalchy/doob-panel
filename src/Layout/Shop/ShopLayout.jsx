import React from 'react';
import ShopNav from './ShopComponents/ShopNav';
import { Outlet, useParams } from 'react-router-dom';
import ShopFooter from './ShopComponents/ShopFootter';
import ShopSmallNav from './ShopComponents/ShopSmallNav';
import { useQuery } from '@tanstack/react-query';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Loading.json";


const ShopLayout = () => {
    const params = useParams();
    const shopId = params.id;

    const { data: shop = {}, isLoading, refetch } = useQuery({
        queryKey: ["shop"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/${shopId}`);
            const data = await res.json();
            return data;
        },
    });



    return (
        <div >
            {isLoading ?
                <div className="grid h-screen px-4 bg-black place-content-center">
                    <Lottie animationData={groovyWalkAnimation} loop={true} />
                </div>
                :
                <div>

                    {Object.keys(shop).length !== 0 ?
                        <div >
                            <ShopSmallNav />
                            <ShopNav />
                            <Outlet />
                            <ShopFooter />
                        </div>
                        :
                        <div className="grid h-screen px-4 bg-white place-content-center">
                            <div className="tracking-widest text-xl text-gray-500 uppercase"><span className='text-red-500'>404 </span>| Sorry We can't find this shop</div>
                        </div>


                    }
                </div>
            }
        </div>
    );
};

export default ShopLayout;