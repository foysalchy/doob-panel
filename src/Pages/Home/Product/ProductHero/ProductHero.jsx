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
        extraCategorys: []
    });
    const [subCategoryData, setSubCategoryData] = useState([])
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const { user, shopInfo } = useContext(AuthContext);

    const { data: megaSideCategoryData = [], refetch } = useQuery({
        queryKey: ["megaSideCategoryData"],
        queryFn: async () => {
            const res = await fetch("https://backend.doob.com.bd/api/v1/admin/category/megacategory");
            const data = await res.json();
            return data.rows;
        },
    });

    const { data: heroBanner = [], reload } = useQuery({
        queryKey: "heroBanner",
        queryFn: async () => {
            const res = await fetch(`https://backend.doob.com.bd/api/v1/admin/slider`);
            const data = await res.json();
            return data?.data;
        },
    });

    const blankImg = 'https://i.ibb.co/7p2CvzT/empty.jpg';
    const bannerFind = heroBanner?.filter((item) => item.status === 'true');

    useEffect(() => {
        if (megaSideCategoryData.length) {
            const fetchData = async () => {
                const setData = [];

                for (const itm of megaSideCategoryData) {
                    try {
                        const response = await fetch(`https://backend.doob.com.bd/api/v1/admin/category/subcategory?id=${itm?._id}`);
                        const data = await response.json();
                        setData.push(data.subCategory);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }

                setAllCategory((prevCategory) => ({
                    ...prevCategory,
                    subCategorys: setData.flat(), // Use flat() to flatten the array of arrays
                }));
            };

            fetchData();
        }
    }, [megaSideCategoryData]);

    useEffect(() => {
        if (allCategory?.subCategorys.length) {
            const fetchData = async () => {
                const setData = [];
                const subCategorys = allCategory.subCategorys;
                for (const itm of subCategorys) {
                    try {
                        const response = await fetch(`https://backend.doob.com.bd/api/v1/admin/category/miniCategory?id=${itm?._id}`);
                        const data = await response.json();
                        setData.push(data.row);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }

                setAllCategory((prevCategory) => ({
                    ...prevCategory,
                    miniCategorys: setData.flat(),
                }));
            };


            fetchData();
        }
    }, [allCategory.subCategorys]);


    useEffect(() => {
        if (allCategory.miniCategorys.length) {
            const fetchData = async () => {
                const setData = [];
                const miniCategorys = allCategory.miniCategorys;
                for (const itm of miniCategorys) {
                    // console.log(`https://backend.doob.com.bd/api/v1/admin/category/extraCategory?id=${itm?._id}`, 'extra>>>>>>.');
                    try {
                        const response = await fetch(`https://backend.doob.com.bd/api/v1/admin/category/extraCategory?id=${itm?._id}`);
                        const data = await response.json();
                        setData.push(data.rows);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }

                setAllCategory((prevCategory) => ({
                    ...prevCategory,
                    extraCategorys: setData.flat(),
                }));
            };


            fetchData();
        }
    }, [allCategory.miniCategorys]);

    // console.log(allCategory, '>>>>');
    const subCategoryHandler = (category, index) => {
        const filteredSubCategory = allCategory?.subCategorys.filter(
            (subCategory) => subCategory.megaCategoryId === category?._id
        );
        setSubCategoryData(filteredSubCategory);
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };



    console.log(megaSideCategoryData, 'subCategoryData');
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
                                className="absolute right-[-196px] ring-1 ring-gray-400 top-0 z-20 w-48 h-full py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl  "
                            >
                                {
                                    subCategoryData.map((itm, index) => <div>
                                        <Link to={`/category-products/${shopInfo?.shopId}/${itm?.megaCategoryId}`}>
                                            <button
                                                className="flex duration-150 hover:text-white w-full justify-between items-center px-2 py-2 text-sm font-normal  hover:bg-black   "
                                                type="button"
                                                id={item?._id}
                                                data-te-dropdown-toggle-ref
                                                aria-expanded="false"
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                            >
                                                {itm?.subCategory}
                                            </button>
                                        </Link>
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