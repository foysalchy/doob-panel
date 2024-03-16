import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { useEffect } from 'react';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
import { AuthContext } from '../../../../../AuthProvider/UserProvider';
import { FaAngleRight } from 'react-icons/fa6';



const ShopProductHero = () => {

    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;

    console.log('Shop ID:', shopId);
    const { data: categories = [], isLoading, refetch } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/category/get/${shopId}`);
            const data = await res.json();
            return data;
        },
    });

console.log(categories, 'checkkkkkkkkkk')

    const { shop_id } = useContext(ShopAuthProvider)

    const { data: Banar = [] } = useQuery({
        queryKey: ["banar"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/slider/get/${shopId}`);
            const data = await res.json();
            return data;
        },
    });


    const { data: adds } = useQuery({
        queryKey: ["adds"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/popup/get/${shopId}`);
            const data = await res.json();
            return data;
        },
    });

    console.log(adds);

    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const lastModalShownTimestamp = localStorage.getItem('lastModalShownTimestamp');

        // Check if the modal hasn't been shown in the last 24 hours for this device
        if (
            (!lastModalShownTimestamp ||
                Date.now() - parseInt(lastModalShownTimestamp, 10) >= 5 * 60 * 60 * 1000) &&
            window.location.pathname === `/shop/${shopId}`
        ) {
            // Show the modal after 5 seconds
            const timeoutId = setTimeout(() => {
                setShowModal(true);

                // Update the timestamp to the current time
                localStorage.setItem('lastModalShownTimestamp', Date.now().toString());
            }, 5000);

            // Cleanup the timeout to avoid memory leaks
            return () => clearTimeout(timeoutId);
        }
    }, [shopId]);

    // copy
    const [allCategory, setAllCategory] = useState({
        subCategorys: [],
        miniCategorys: [],
        extraCategorys: [],
    });
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [miniCategoryData, setminiCategoryData] = useState([]);
    const [extraCategoryData, setExtraCategoryData] = useState([]);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [active, setActive] = useState(
        {
            step1: null,
            step2: null,
        },

    );
    const { user, shopInfo } = useContext(AuthContext);

    const { data: megaSideCategoryData = [], refetch: refetchMegaCategory } = useQuery({
        queryKey: ['megaSideCategoryDataSaller'],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/category/get/${shopId}`);
            const data = await res.json();
            return data;
        },
    });

    const { data: heroBanner = [] } = useQuery({
        queryKey: 'heroBanner',
        queryFn: async () => {
            const res = await fetch('https://salenow-v2-backend.vercel.app/api/v1/admin/slider');
            const data = await res.json();
            return data?.data;
        },
    });

    const blankImg = 'https://i.ibb.co/7p2CvzT/empty.jpg';
    const bannerFind = heroBanner?.filter((item) => item.status === 'true');
    // https://salenow-v2-backend.vercel.app/api65e8a0a2e04a44a47ce186c3
    useEffect(() => {
        const fetchData = async () => {
            const subCategoryPromises = megaSideCategoryData?.filter(itm => itm?.menu === true).map(async (item) => {
                try {
                    const response = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/category/seller/sub-category-by-id?shopId=${shop_id?.shop_id}&id=${item?._id}`);
                    const data = await response.json();
                    console.log(data, 'data..............**');
                    return data;
                } catch (error) {
                    console.error('Error:', error);
                    return [];
                }
            });

            const subCategories = await Promise.all(subCategoryPromises);
            setAllCategory((prevCategory) => ({ ...prevCategory, subCategorys: subCategories.flat() }));
        };

        if (megaSideCategoryData.length) {
            fetchData();
        }
    }, [megaSideCategoryData]);

    useEffect(() => {
        const fetchData = async () => {
            const miniCategoryPromises = allCategory.subCategorys.map(async (itm) => {
                // console.log(`https://salenow-v2-backend.vercel.app/api/v1/category/seller/mini-category-by-id?shopId=${shop_id?.shop_id}&id=${itm?._id}`, '**********')
                try {
                    const response = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/category/seller/mini-category-by-id?shopId=${shop_id?.shop_id}&id=${itm?._id}`);
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Error:', error);
                    return [];
                }
            });

            const miniCategories = await Promise.all(miniCategoryPromises);
            setAllCategory((prevCategory) => ({ ...prevCategory, miniCategorys: miniCategories.flat() }));
        };

        if (allCategory.subCategorys.length) {
            fetchData();
        }
    }, [allCategory.subCategorys]);

    useEffect(() => {

        const fetchData = async () => {
            const extraCategoryPromises = allCategory.miniCategorys.map(async (itm) => {
                // console.log(`https://salenow-v2-backend.vercel.app/api/v1/category/seller/extra-category-by-id?shopId=${shop_id?.shop_id}&id=${itm?._id}`, '************---->')
                try {
                    const response = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/category/seller/extra-category-by-id?shopId=${shop_id?.shop_id}&id=${itm?._id}`);
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Error:', error);
                    return [];
                }
            });

            const extraCategories = await Promise.all(extraCategoryPromises);
            setAllCategory((prevCategory) => ({ ...prevCategory, extraCategorys: extraCategories.flat() }));
        };

        if (allCategory.miniCategorys.length) {
            fetchData();
        }
    }, [allCategory.miniCategorys]);

    const subCategoryHandler = async (category, index) => {
        const filteredSubCategory = allCategory?.subCategorys.filter(
            (subCategory) => subCategory.megaCategoryId === category?._id
        );

        setSubCategoryData(filteredSubCategory);
        setminiCategoryData([]);
        setExtraCategoryData([]);
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);

    };

    const miniCategoryHandler = async (category, index) => {
        const filteredSubCategory = allCategory?.miniCategorys.filter(
            (miniCategory) => miniCategory.subCategoryId === category?._id
        );

        setminiCategoryData(filteredSubCategory);
        setActive({ ...active, step1: category?._id })

    };

    const extraCategoryHandler = async (category, index) => {
        // console.log(allCategory.extraCategorys[0].miniCategoryId, 'dd');
        const filteredSubCategory = allCategory?.extraCategorys.filter(
            (extraCategory) => extraCategory?.miniCategoryId === category?._id
        );

        setExtraCategoryData(filteredSubCategory);
        setActive({ ...active, step2: category?._id })

        console.log(filteredSubCategory, 'filteredSubCategory');
    };


    console.log(subCategoryData, 'extraCategoryData======');
    //end copy
    return (
        <div>
            <div className='flex gap-4 '>

                <div className='hidden  bg-white w-[20%] h-[350px]   rounded-xl lg:flex flex-col gap-2  text-sm'>
                    {/* {showModal && adds && (
                        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-90 z-50">
                            <div className="relative max-w-screen-lg mx-auto">
                                <div onClick={() => setShowModal(false)} className='cursor-pointer bg-gray-300 rounded-full absolute top-4 right-4  mb-2 p-2 text-2xl hover:bg-gray-400'>
                                    <RxCross2 className='text-xl' />
                                </div>

                                <img
                                    className="max-w-full rounded max-h-full"
                                    srcSet={adds.image}
                                    src={adds.image}
                                    alt="Preview"
                                />
                            </div>
                        </div>
                    )} */}

                    {/* <div>
                        {categories
                            ?.filter((item) => item.status)
                            ?.map((item, index) => (
                                <div className='mt-2' key={index + 1}>
                                    <Link className='flex items-center gap-2' to={`categories/${shop_id.shop_id}/${item?.name}`}>
                                        <img
                                            className="h-4 w-4 rounded text-gray-400 filter grayscale brightness-90 object-cover"
                                            src={item?.img}
                                            srcSet={item?.img}
                                            alt=""
                                        />
                                        <p>{item?.name}</p>
                                    </Link>
                                </div>
                            ))}
                    </div> */}
                    <div className=" w-full relative lg:flex hidden flex-col gap-2 rounded-lg p-4">
                        {!megaSideCategoryData ? <>

                            loading......
                        </> :
                            megaSideCategoryData.filter(itm => itm?.menu === true).map((item, index) => (
                                <div key={index} className="  inline-block">
                                    {/* Dropdown toggle button */}
                                    <div>
                                        {
                                            <button
                                                onClick={() => subCategoryHandler(item, index)}
                                                className={`flex  items-center  w-full justify-between px-2 py-2 text-sm font-normal  hover:bg-black hover:text-white  relative  ${openDropdownIndex === index ? 'bg-gray-100 text-black' : 'text-black'} rounded`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    {/* <img src={item?.image} alt="" className="w-8 h-8 rounded-full ring-1 ring-gray-200" /> */}
                                                    {item?.name}
                                                </span>
                                                <FaAngleRight className="absolute right-2" />
                                            </button>
                                                // :

                                                // <Link to={``}
                                                //     // onClick={() => subCategoryHandler(item, index)}
                                                //     className={`flex  items-center  w-full justify-between px-2 py-2 text-sm font-normal  hover:bg-black hover:text-white  relative  ${openDropdownIndex === index ? 'bg-gray-100 text-black' : 'text-black'} rounded`}
                                                // >
                                                //     <span className="flex items-center gap-2">
                                                //         {/* <img src={item?.image} alt="" className="w-8 h-8 rounded-full ring-1 ring-gray-200" /> */}
                                                //         {item?.name}
                                                //     </span>
                                                //     {/* <FaAngleRight className="absolute right-2" /> */}
                                                // </Link>

                                        }
                                    </div>
                                    {/* Dropdown menu */}
                                    {openDropdownIndex === index || subCategoryData.length > 0 && (
                                        <div
                                            onClick={() => setOpenDropdownIndex(null)}
                                            className="absolute  right-[-196px] top-0 z-20 w-48 h-full py-2 mt-2 px-2 origin-top-right bg-white">
                                            {
                                                subCategoryData.map((subCategory, index) => <div key={index}>
                                                    {
                                                        miniCategoryData?.length > 0 ?
                                                            <div>
                                                                <div
                                                                    onMouseMove={() => miniCategoryHandler(subCategory, index)}
                                                                    className={`flex items-center hover:bg-gray-100 w-full justify-between px-2 py-2 text-sm font-normal cursor-pointer mb-1 rounded relative  ${active?.step1 === subCategory?._id ? 'text-black bg-gray-100' : 'text-black'}`}
                                                                    type="button"
                                                                    id={item?._id}
                                                                    data-te-dropdown-toggle-ref
                                                                    aria-expanded="false"
                                                                    data-te-ripple-init
                                                                    data-te-ripple-color="light">
                                                                        mn
                                                                    <span className="flex items-center gap-2 text-black">
                                                                        <img src={subCategory?.img} alt="" className="w-8 h-8 rounded-full ring-1 ring-gray-200" />

                                                                        {subCategory?.subCategoryName}
                                                                    </span>

                                                                </div>

                                                                {miniCategoryData.length < 1 ? '' : <div className="bg-white    border-gray-400 absolute top-0 h-full right-[-180px] px-2 w-[190px]">
                                                                    {miniCategoryData.map((miniCategory, index) =>
                                                                        <div key={index}>
                                                                            {
                                                                                !megaSideCategoryData.length == 0 ? <Link to={`/products/catagory/${miniCategory?._id}`}>
                                                                                    <div onMouseMove={(() => extraCategoryHandler(miniCategory, index))} className={`flex mt-2 items-center  w-full justify-between px-2 py-2 text-sm font-normal rounded hover:bg-gray-100 hover:text-black  relative  ${active?.step2 === miniCategory?._id ? 'bg-gray-100 text-black' : 'text-black'}`}>
                                                                                        <span className="flex items-center gap-2">
                                                                                            <img src={miniCategory?.img} alt="" className="w-8 h-8 rounded-full ring-1 ring-gray-200" /> {miniCategory?.miniCategoryName}
                                                                                        </span>
                                                                                    </div>
                                                                                </Link> : <div onMouseMove={(() => extraCategoryHandler(miniCategory, index))} className="flex justify-between items-center px-2 py-2 text-sm font-normal hover:text-white  hover:bg-black   ">
                                                                                    {miniCategory?.miniCategoryName}
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    )}
                                                                    {extraCategoryData.length == 0 ? '' : <div
                                                                        style={{
                                                                            marginTop: '-56px',
                                                                            marginLeft: '180px'
                                                                        }}
                                                                        className="  w-[500px] p-2   bg-white right-[-500px] grid grid-cols-5 gap-2   top-0 h-auto">
                                                                        {
                                                                            extraCategoryData?.map((extraCategory, index) => <div key={index}>
                                                                                {
                                                                                    extraCategoryData.length == 0 ? <div>
                                                                                        {extraCategory?.extraCategoryName}

                                                                                    </div> : <Link to={`${extraCategory?._id}/categories/${shopId}/${item?.categoryId}`}>
                                                                                        <div className='py-2 px-2'>
                                                                                            <span className="flex flex-col hover:bg-gray-100 items-center gap-2 w-[90px] p-2 rounded-lg ">
                                                                                                <img src={extraCategory?.img} alt="" className="w-14 h-14 object-cover rounded-full ring-1 ring-gray-200" />
                                                                                                <p className="text-xs font-semibold text-center">
                                                                                                    {extraCategory?.extraCategoryName} ..
                                                                                                </p>
                                                                                            </span>
                                                                                        </div>
                                                                                    </Link>
                                                                                }
                                                                            </div>)
                                                                        }
                                                                    </div>}
                                                                </div>}
                                                            </div>

                                                            :

                                                            <Link to={`${item?._id}/categories/${shopId}/${item?.categoryId}`}>
                                                                <div
                                                                    onMouseMove={() => miniCategoryHandler(subCategory, index)}
                                                                    className={`flex items-center  w-full justify-between hover:bg-gray-100 px-2 py-2 text-sm font-normal  mb-1 rounded relative  ${active?.step2 === subCategory?._id ? 'black-black ' : 'text-black'}`}
                                                                    type="button"
                                                                    id={item?._id}
                                                                    data-te-dropdown-toggle-ref
                                                                    aria-expanded="false"
                                                                    data-te-ripple-init
                                                                    data-te-ripple-color="light"
                                                                >
                                                                    <span className="flex items-center gap-2">
                                                                        <img src={subCategory?.img} alt="" className="w-8 h-8 rounded-full ring-1 ring-gray-200" /> {subCategory?.subCategoryName}
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                    }

                                                </div>)
                                            }
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>


                <div className='lg:w-[80%] w-[100%]'>

                    <Swiper pagination={true} modules={[Pagination]} className="mySwiper rounded-md">
                        {Banar?.filter((item) => item.status).map((i, index) => (
                            <SwiperSlide key={index + 6}>
                                {i.status && (
                                    <Link to={`${i?.link}`}>
                                        <img
                                            className='w-full lg:h-[350px] h-[150px] object-cover object-center rounded'
                                            src={i?.image}
                                            srcSet={i?.image}
                                            alt=""
                                            loading="lazy"

                                        />
                                    </Link>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>
        </div>
    );
};


export default ShopProductHero;