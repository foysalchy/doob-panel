import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

export default function CategoryListSm({setOn}) {
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
    // console.log(allCategory, 'filteredSubCategory');
    return (
        <div className='flex gap-4 '>
            <div onClick={()=> setOn(true)} className="bg-white relative lg:hidden block w-full flex-col gap-2 rounded-lg p-4">
                {megaSideCategoryData.map((item, index) => (
                    <div key={index} className="w-full  inline-block">
                        {/* Dropdown toggle button */}
                        <button
                            onClick={() => subCategoryHandler(item, index)}
                            className={`flex  items-center  w-full justify-between px-2 py-2 text-sm font-normal  hover:bg-black hover:text-white  relative  ${openDropdownIndex === index ? 'bg-black text-white' : 'text-black'}`}
                        >
                            {item?.name}
                            <FaAngleRight className="absolute right-2" />
                        </button>
                        {/* Dropdown */}
                        <div
                            className={`${openDropdownIndex === index ? 'block p-1 border' : 'hidden'
                                }  `} >
                            {
                                subCategoryData?.map((itm, index) => <div className="">
                                    {
                                        miniCategoryData.length > 0 ? <div onMouseMove={() => miniCategoryHandler(itm, index)} className={`flex items-center  w-full justify-between px-2 py-2 text-sm font-normal  hover:bg-gray-900 hover:text-white  relative  ${active?.step1 === itm?._id ? 'bg-black text-white' : 'text-black'}`}>
                                            {itm?.subCategory}
                                        </div> :
                                            <Link className="  w-full" to={`/products/catagory/${itm?._id}`} onMouseMove={() => miniCategoryHandler(itm, index)} >
                                                <div className={`flex items-center  w-full justify-between px-2 py-2 text-sm font-normal  hover:bg-gray-900 hover:text-white  relative  ${active?.step2 === itm?._id ? 'bg-black text-white' : 'text-black'}`}>
                                                    {itm?.subCategory}
                                                </div>
                                            </Link>
                                    }

                                    {
                                        miniCategoryData.length > 0 && active.step1 === itm?._id && miniCategoryData?.map((itm, index) => {
                                            // console.log(itm, 'test...');
                                            return (
                                                <div className=" mb-1 w-full border p-1">
                                                    {
                                                        extraCategoryData.length > 0 ? <div onMouseMove={() => extraCategoryHandler(itm, index)} >
                                                            <button className={`flex items-center  w-full justify-between px-2 py-2 text-sm font-normal  hover:bg-gray-900 hover:text-white  relative  ${active?.step2 === itm?._id ? 'bg-black text-white' : 'text-black'}`}>
                                                                {itm?.miniCategoryName} ..
                                                            </button>
                                                            {
                                                                subCategoryData.length > 0 && active.step2 === itm?._id ? <div className="bg-gray-100 text-black">
                                                                    {
                                                                        extraCategoryData?.map((itm, index) => <Link key={itm?._id} className="  w-full" to={`/products/catagory/${itm?._id}`} >
                                                                            <div className="hover:bg-gray-700 hover:text-white px-2 py-2 mb-1 w-full text-sm">
                                                                                {itm?.extraCategoryName}
                                                                            </div>
                                                                        </Link>)
                                                                    }
                                                                </div> : <></>
                                                            }
                                                        </div> : <Link to={`/products/catagory/${itm?._id}`} onMouseMove={() => extraCategoryHandler(itm, index)} >
                                                            <div className={`flex items-center  w-full justify-between px-2 py-2 text-sm font-normal  hover:bg-gray-900 hover:text-white  relative  ${active?.step2 === itm?._id ? 'bg-black text-white' : 'text-black'}`}>

                                                                {itm?.miniCategoryName}
                                                            </div>
                                                        </Link>
                                                    }
                                                </div>
                                            )
                                        })
                                    }


                                </div>)
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}