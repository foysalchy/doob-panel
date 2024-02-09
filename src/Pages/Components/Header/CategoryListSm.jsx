import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

export default function CategoryListSm({ setOn }) {
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
                    // console.error('Error:', error);
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
                    // console.error('Error:', error);
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
                    // console.error('Error:', error);
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
        setOpenDropdownIndex(prevIndex => prevIndex === index ? null : index);
        const filteredSubCategory = allCategory?.subCategorys.filter(
            (subCategory) => subCategory.megaCategoryId === category?._id
        );

        setSubCategoryData(filteredSubCategory);
        setminiCategoryData([]);
        setExtraCategoryData([]);
        // setOpenDropdownIndex(openDropdownIndex === index ? null : index);

    };

    const miniCategoryHandler = async (category, index) => {
        const filteredSubCategory = allCategory?.miniCategorys.filter(
            (miniCategory) => miniCategory.subCategoryId === category?._id
        );

        setminiCategoryData(filteredSubCategory);
        setActive({ ...active, step1: category?._id })
        // console.log(filteredSubCategory);

    };

    const extraCategoryHandler = async (category, index) => {
        // console.log(allCategory.extraCategorys[0].miniCategoryId, 'dd');
        const filteredSubCategory = allCategory?.extraCategorys.filter(
            (extraCategory) => extraCategory?.miniCategoryId === category?._id
        );

        setExtraCategoryData(filteredSubCategory);
        setActive({ ...active, step2: category?._id })

    };
    console.log(extraCategoryData, 'filteredSubCategory');
    return (
        <div className=' '>
            <div className="grid grid-cols-4 gap-2 pt-2">
                {/* mega category */}
                <div className="">
                    {megaSideCategoryData.map((item, index) => (
                        <div key={index} className="">
                            {!subCategoryData.length === 0 ?
                                <Link
                                    to={`/products/catagory/${item?._id}`}>
                                    <div
                                        onClick={() => subCategoryHandler(item, index)}
                                        className={`flex flex-col gap-2 bg-gray-100 w-full h-auto rounded  items-center justify-center mb-2 px-2 py-2 text-sm font-normal   relative  ${openDropdownIndex === index ? '' : 'text-black'}`}>
                                        <img src={item?.image} alt="" className="w-[70px] rounded-full h-[70px] object-cover ring-1 ring-gray-400" />
                                        <p className="text-sm text-center">{item?.name}</p>

                                    </div>
                                </Link> :
                                <div className="">
                                    <button
                                        onClick={() => subCategoryHandler(item, index)}
                                        className={`${openDropdownIndex === index ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} flex flex-col gap-2 w-full h-auto rounded  items-center justify-center mb-2 px-2 py-2 text-sm font-normal   relative `}
                                    >
                                        <img src={item?.image} alt="" className="w-[70px] rounded-full h-[70px] object-cover ring-1 ring-gray-400" />
                                        <p className="text-sm">{item?.name}</p>
                                    </button>
                                </div>
                            }
                        </div>
                    ))}
                </div>
                {/* Sub category */}
                <div className="">
                    {subCategoryData.map((item, index) => (
                        <div key={index} className="">
                            {miniCategoryData.length < 1 ? (
                                <Link to={`/products/catagory/${item?._id}`}>
                                    <div
                                        onClick={() => miniCategoryHandler(item, index)}
                                        className={`${active.step1 === item?._id ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} flex flex-col gap-2 w-full h-auto rounded  items-center justify-center mb-2 px-2 py-2 text-sm font-normal   relative `}
                                    >
                                        <img src={item?.img} alt="" className="w-[70px] rounded-full h-[70px] object-cover ring-1 ring-gray-400" />
                                        <p className="text-sm text-center">{item?.subCategory}</p>
                                    </div>
                                </Link>
                            ) : (
                                <div className="">
                                    <button
                                        onClick={() => miniCategoryHandler(item, index)}
                                        className={`${active.step1 === item?._id ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} flex flex-col gap-2 w-full h-auto rounded  items-center justify-center mb-2 px-2 py-2 text-sm font-normal   relative `}
                                    >
                                        <img src={item?.img} alt="" className="w-[70px] rounded-full h-[70px] object-cover ring-1 ring-gray-400" />
                                        <p className="text-sm">{item?.subCategory}</p>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>


                {/* Mini category */}
                <div className="">
                    {miniCategoryData.map((item, index) => (
                        <div key={index} className="">
                            {!extraCategoryData.length > 1 ?
                                <Link
                                    to={`/products/catagory/${item?._id}`}>
                                    <div
                                        onClick={() => extraCategoryHandler(item, index)}
                                        className={`${active.step2 === item?._id ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} flex flex-col gap-2 w-full h-auto rounded  items-center justify-center mb-2 px-2 py-2 text-sm font-normal   relative `}>
                                        <img src={item?.img} alt="" className="w-[70px] rounded-full h-[70px] object-cover ring-1 ring-gray-400" />
                                        <p className="text-sm text-center">{item?.miniCategoryName}..</p>

                                    </div>
                                </Link> :
                                <div className="">
                                    <button
                                        onClick={() => extraCategoryHandler(item, index)}
                                        className={`${active.step2 === item?._id ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} flex flex-col gap-2 w-full h-auto rounded  items-center justify-center mb-2 px-2 py-2 text-sm font-normal   relative `}
                                    >
                                        <img src={item?.img} alt="" className="w-[70px] rounded-full h-[70px] object-cover ring-1 ring-gray-400" />
                                        <p className="text-sm">{item?.miniCategoryName}</p>
                                    </button>
                                </div>
                            }
                        </div>
                    ))}
                </div>

                {/* Extra category */}
                <div className="">
                    {extraCategoryData.map((item, index) => (
                        <div key={index} className="">
                            <div className="">
                                <Link
                                    to={`/products/catagory/${item?._id}`}
                                    className={`${active.step1 === item?._id ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} flex flex-col gap-2 w-full h-auto rounded  items-center justify-center mb-2 px-2 py-2 text-sm font-normal   relative `}
                                >
                                    <img src={item?.img} alt="" className="w-[70px] rounded-full h-[70px] object-cover ring-1 ring-gray-400" />
                                    <p className="text-sm">{item?.miniCategoryName}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );

}