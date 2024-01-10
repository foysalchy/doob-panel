import React, { useContext, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import PosSidebar from './PosSidebar';
import clickAudio from '../../../../src/assets/sound_beep-29.mp3'
const Pos = () => {
    const { shopInfo, setCheckUpData } = useContext(AuthContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const { data: products = [], reload } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/all-products/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });

    const productList = products;

    const [audio] = useState(new Audio(clickAudio));

    useEffect(() => {
        // Cleanup the audio when component unmounts
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [audio]);
    const addProductToCart = (productData) => {
        audio.play();
        setCartProducts([...cartProducts, productData]);
    }

    const filteredData = searchValue == '' ? productList : productList.filter((itm) => itm.name.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <div>
            <main className=' p-4 mt-3 rounded-md h-[82vh]'>
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                        <div className="flex items-center bg-gray-100 ring-1 ring-gray-300 p-2 rounded-md">
                            <BiSearch className='text-gray-600 text-lg' /> <input onChange={(e) => setSearchValue(e.target.value)} type="text" className="outline-none bg-transparent w-full px-2" placeholder='Search...' />
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg mt-3 h-[76vh] overflow-y-auto grid grid-cols-3 gap-3">
                            {
                                filteredData?.map((itm, index) => (
                                    <div key={index}>
                                        <div onClick={() => addProductToCart(itm)} className="card bg-white rounded-xl p-2">
                                            <div style={{ backgroundImage: `url('${itm?.featuredImage?.src}')` }} className="card-body h-[200px] bg-cover object-cover rounded-xl">

                                            </div>
                                            <div className="card-footer py-2 flex justify-between px-3">
                                                <h3 className="font-semibold">{itm?.name.slice(0, 18)}...</h3>
                                                <div className="flex items-center gap-2">

                                                    <h3 className="font-semibold">{itm?.price}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <aside className='bg-gray-100 p-4 rounded-lg'>
                        <PosSidebar cartProducts={cartProducts} setCartProducts={setCartProducts} />
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default Pos;