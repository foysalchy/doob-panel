import React, { useContext, useEffect, useState } from 'react';
import banar1 from './Rectangle 40.png'
import banar2 from './wallpaperflare.com_wallpaper(2).jpg'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CategoryList from './CategoryList';
import { Dropdown, Ripple, initTE } from 'tw-elements';
import { FaAngleRight } from 'react-icons/fa6';
import { AuthContext } from '../../../../AuthProvider/UserProvider';


initTE({ Dropdown, Ripple });


const ProductHero = () => {
    const [allCategory, setAllCategory] = useState({
        subCategorys: [],
        miniCategorys: [],
        extraCategorys: [],
    });
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [miniCategoryData, setminiCategoryData] = useState([]);
    const [extraCategoryData, setExtraCategoryData] = useState([]);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const { user, shopInfo } = useContext(AuthContext);

    const { data: megaSideCategoryData = [], refetch: refetchMegaCategory } = useQuery({
        queryKey: ['megaSideCategoryData'],
        queryFn: async () => {
            const res = await fetch('https://backend.doob.com.bd/api/v1/admin/category/megacategory');
            const data = await res.json();
            return data.rows;
        },
    });

    const { data: heroBanner = [] } = useQuery({
        queryKey: 'heroBanner',
        queryFn: async () => {
            const res = await fetch('https://backend.doob.com.bd/api/v1/admin/slider');
            const data = await res.json();
            return data?.data;
        },
    });

    const blankImg = 'https://i.ibb.co/7p2CvzT/empty.jpg';
    const bannerFind = heroBanner?.filter((item) => item.status === 'true');

    useEffect(() => {
        const fetchData = async () => {
            const subCategoryPromises = megaSideCategoryData.map(async (item) => {
                try {
                    const response = await fetch(`https://backend.doob.com.bd/api/v1/admin/category/subcategory?id=${item?._id}`);
                    const data = await response.json();
                    return data.subCategory;
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
                try {
                    const response = await fetch(`https://backend.doob.com.bd/api/v1/admin/category/miniCategory?id=${itm?._id}`);
                    const data = await response.json();
                    return data.row;
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
                try {
                    const response = await fetch(`https://backend.doob.com.bd/api/v1/admin/category/extraCategory?id=${itm?._id}`);
                    const data = await response.json();
                    return data.rows;
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
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    const miniCategoryHandler = async (category, index) => {
        const filteredSubCategory = allCategory?.miniCategorys.filter(
            (miniCategory) => miniCategory.subCategoryId === category?._id
        );

        setminiCategoryData(filteredSubCategory);
    };

    const extraCategoryHandler = async (category, index) => {
        const filteredSubCategory = allCategory?.extraCategorys.filter(
            (extraCategory) => extraCategory.extraCategoryId === category?._id
        );

        setExtraCategoryData(filteredSubCategory);
        console.log(filteredSubCategory, 'extra-->>>>>');
    };


    // console.log(allCategory, 'subCategoryData');
    return (
        <div className='flex gap-4 '>
            <div className="bg-white w-[340px] relative flex flex-col gap-2 rounded-lg p-4">
                {megaSideCategoryData.map((item, index) => (
                    <div key={index} className="  inline-block">
                        {/* Dropdown toggle button */}
                        <button
                            onClick={() => subCategoryHandler(item, index)}
                            className="  flex  items-center  w-full justify-between"
                        >
                            {item?.name}
                            <FaAngleRight className="absolute right-2" />
                        </button>

                        {/* Dropdown menu */}
                        {openDropdownIndex === index && (
                            <div
                                onClick={() => setOpenDropdownIndex(null)}
                                className="absolute right-[-196px] top-0 z-20 w-48 h-full py-2 mt-2 origin-top-right bg-white  "
                            >
                                {
                                    subCategoryData.map((itm, index) => <div
                                        key={index}

                                    >
                                        {
                                            miniCategoryData?.length > 0 ?
                                                <div
                                                // to={`/category-products/${shopInfo?.shopId}/${itm?.megaCategoryId}`}
                                                >
                                                    <div
                                                        onMouseMove={() => miniCategoryHandler(itm, index)}
                                                        className="flex relative duration-150 hover:text-white w-full justify-between items-center px-2 py-2 text-sm font-normal  hover:bg-black   "
                                                        type="button"
                                                        id={item?._id}
                                                        data-te-dropdown-toggle-ref
                                                        aria-expanded="false"
                                                        data-te-ripple-init
                                                        data-te-ripple-color="light"
                                                    >
                                                        {itm?.subCategory}

                                                    </div>
                                                    {miniCategoryData.length == 0 ? '' : <div className="bg-white   border-gray-400 absolute top-0 h-full right-[-160px] w-[160px]">
                                                        {miniCategoryData.map((itm, index) =>

                                                            <div onMouseMove={(() => extraCategoryHandler(itm, index))} key={index} className="flex justify-between items-center px-2 py-2 text-sm font-normal hover:text-white  hover:bg-black   ">
                                                                {itm?.miniCategoryName}
                                                            </div>)}
                                                        <div className="absolute w-[200px] bg-white right-[-200px] top-0 h-full">
                                                            aslks
                                                        </div>
                                                    </div>}
                                                </div>

                                                :

                                                <Link to={`/categories/${shopInfo?.shopId}/${itm?._id}`}>
                                                    <div
                                                        onMouseMove={() => miniCategoryHandler(itm, index)}
                                                        className="flex relative duration-150 hover:text-white w-full justify-between items-center px-2 py-2 text-sm font-normal  hover:bg-black   "
                                                        type="button"
                                                        id={item?._id}
                                                        data-te-dropdown-toggle-ref
                                                        aria-expanded="false"
                                                        data-te-ripple-init
                                                        data-te-ripple-color="light"
                                                    >
                                                        {itm?.subCategory}

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

            <div className='lg:w-[80%] w-[100%]'>
                {bannerFind.length > 0 ? <Swiper className="mySwiper rounded-md">
                    {bannerFind.map((i, index) => (
                        <SwiperSlide key={index}>
                            <img className=' w-full lg:h-[350px] h-[150px] object-cover  object-center rounded' src={i?.image} srcSet={i?.image} alt="" />
                        </SwiperSlide>
                    ))}

                </Swiper> : <img className=' w-full lg:h-[350px] h-[150px] object-cover  object-center rounded' src={blankImg} alt="" />}
            </div>
        </div>
    );
};

export default ProductHero;