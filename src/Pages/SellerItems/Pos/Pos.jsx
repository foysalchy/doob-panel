import React, { useContext, useEffect, useState } from 'react';
import { BiMenu, BiSearch, BiShoppingBag } from 'react-icons/bi';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import PosSidebar from './PosSidebar';
import clickAudio from '../../../../src/assets/sound_beep-29.mp3'
import { Link } from 'react-router-dom';
const Pos = () => {
    const { shopInfo, setCheckUpData } = useContext(AuthContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [close, setClose] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const { data: products = [], reload } = useQuery({
        queryKey: ["pos-product"],
        queryFn: async () => {
            const res = await fetch(`https://doob.dev/api/v1/seller/get-pos-product/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });



    const productList = products.filter((product) => parseInt(product.stock_quantity) > 0);

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

        const findProduct = productList.find((itm) => itm._id.includes(productData._id));
        const existingProductIndex = cartProducts.findIndex(itm => itm.id.includes(productData._id));

        if (findProduct) {
            const productInfo = {
                id: findProduct._id,
                name: findProduct.name,
                price: parseInt(findProduct?.price ? findProduct?.price : findProduct.regular_price),
                quantity: 1,
                sku: findProduct.sku,
                img: findProduct.featuredImage.src ? findProduct.featuredImage.src : findProduct.images[0].src,
            };

            if (existingProductIndex !== -1) {
                // If product is already in cart, update its quantity
                const updatedCartProducts = [...cartProducts];
                updatedCartProducts[existingProductIndex].quantity++;
                setCartProducts(updatedCartProducts);
            } else {
                // If product is not in cart, add it to the cart
                setCartProducts([...cartProducts, productInfo]);
            }

        }

    }

    const filteredData = searchValue == '' ? productList : productList?.filter((itm) => itm.name.toLowerCase().includes(searchValue.toLowerCase()) || itm._id.includes(searchValue));





    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value.trim().toLowerCase(); // Trim and convert to lowercase for case-insensitive search
        console.log(searchValue);

        const findProduct = productList.find((item) => {
            // Check main SKU
            if (item.sku && item.sku.toLowerCase().includes(searchValue)) {
                return true;
            }
            // Check variations' SKU
            if (item.variations) {
                for (const variation of item.variations) {
                    if (variation.SKU && variation.SKU.toLowerCase().includes(searchValue)) {
                        return true;
                    }
                }
            }
            return false;
        });

        const existingProductIndex = cartProducts.findIndex((item) => {
            // Check main SKU
            if (item.sku && item.sku.toLowerCase().includes(searchValue)) {
                return true;
            }
            // Check variations' SKU
            if (item.variations) {
                for (const variation of item.variations) {
                    if (variation.SKU && variation.SKU.toLowerCase().includes(searchValue)) {
                        return true;
                    }
                }
            }
            return false;
        });

        if (findProduct) {
            const productInfo = {
                id: findProduct._id,
                name: findProduct.name,
                price: parseInt(findProduct?.price ? findProduct?.price : findProduct.regular_price),
                quantity: 1,
                sku: findProduct.sku,
                img: findProduct.featuredImage.src ? findProduct.featuredImage.src : findProduct.images[0].src
            };

            if (existingProductIndex !== -1) {
                // If product is already in cart, update its quantity
                const updatedCartProducts = [...cartProducts];
                updatedCartProducts[existingProductIndex].quantity++;
                setCartProducts(updatedCartProducts);
            } else {
                // If product is not in cart, add it to the cart
                setCartProducts([...cartProducts, productInfo]);
            }
            e.target.reset();
        }

    };





    return (
        <div>
            <Link className='text-blue-500 underline flex justify-end px-4' to={'/seller/dashboard'}>Go to dashboard</Link>
            <main className=' md:p-4 mt-3 rounded-md h-screen overflow-y-auto'>
                <div className="grid md:grid-cols-3 gap-2 ">
                    <div className="md:col-span-2">
                        <div className="flex items-center justify-between gap-3">
                            <form
                                onSubmit={handleSearch}
                                className="flex items-center bg-gray-100 ring-1 ring-gray-300 p-2 rounded-md w-full">
                                <BiSearch className='text-gray-600 text-lg' />
                                <input name='search' onChange={(e) => setSearchValue(e.target.value)} type="text" className="outline-none bg-transparent w-full px-2" placeholder='Search...' />
                            </form>
                            <button onClick={() => setClose(!close)} className='md:hidden block text-2xl relative mr-3'>
                                <BiShoppingBag className=' text-[red]' />
                                <small className="text-sm absolute bg-[#ff0059] text-white py-0 px-1 text-[8px] rounded-full right-[-9px] top-[-3px]">{cartProducts?.length}</small>
                            </button>
                        </div>
                        <div className="bg-gray-100 p-4 mt-3  overflow-y-auto grid md:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-3 max:h-[90vh]">
                            {
                                filteredData.length ? filteredData?.map((itm, index) => (
                                    <div key={itm?._id}>
                                        <div onClick={() => addProductToCart(itm)} className="card bg-white p-2 h-[200px] ">
                                            <div style={{ backgroundImage: `url('${itm?.featuredImage?.src ? itm?.featuredImage?.src : itm?.images[0].src}')` }} className="card-body md:h-[130px]  h-[130px] bg-cover object-cover ">

                                            </div>
                                            <div className="card-footer py-2 justify-between px-3">
                                                <h3 className="text-sm h-4 overflow-hidden">{itm?.name}</h3>
                                                <h3 className="text-sm">Price :{itm?.price ? itm?.price : itm.regular_price}</h3>
                                                {/* <div className="flex items-center gap-2">

                                                    
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                )) : ''
                            }
                        </div>
                    </div>
                    <aside className={`${close ? 'md:hidden block' : 'md:block hidden'} bg-gray-100 p-4 md:relative fixed rounded-lg top-0 left-0 bottom-0 md:h-auto h-screen w-full`}>
                        <PosSidebar close={close} setClose={setClose} cartProducts={cartProducts} setCartProducts={setCartProducts} />
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default Pos;