import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { BsCalendarDate } from 'react-icons/bs';
import { FaRegCalendarAlt } from 'react-icons/fa';


const ShopSingleBlog = () => {


    const params = useParams();
    const shopId = params.id;

    const [blogList, setBlogList] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/seller/blog/${shopId}`)
            .then((res) => res.json())
            .then((data) => setBlogList(data));
    }, []);

    const blogInfo = useLoaderData();
    console.log(blogInfo, 'blogInfo');


    const extractInnerText = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    const formattedDate = new Date(blogInfo.date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    console.log(blogInfo.img);
    return (
        <div className=" ">

            <div className="relative">
                <img
                    src={blogInfo?.img}
                    className="absolute inset-0 object-cover w-full h-full"
                    alt=""
                />
                <div className="relative bg-gray-900 bg-opacity-90">
                    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                        <div >
                            <h2 className=" mb-6 text-center font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                                {blogInfo?.title}
                            </h2>
                            <div className='text-xl gap-3 text-white flex justify-center items-center'>
                                <FaRegCalendarAlt className='' />Updated On {formattedDate}
                            </div>

                        </div>
                    </div>
                </div>
            </div>



            <div className="px-1 py-10  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-20 lg:px-8  grid md:grid-cols-12 gap-3 ">
                <div className="md:col-span-8 ">
                    <img
                        loading="eager"
                        src={blogInfo?.img}
                        alt=""
                        className="w-full h-auto border-2  bg-gray-500 object-fill"
                    />

                    <h1 className=" mt-4 md:text-4xl text-2xl">{blogInfo?.title}</h1>
                    <div className="mt-5 ">
                        <div
                            className="mb-2  "
                            dangerouslySetInnerHTML={{
                                __html: blogInfo.message,
                            }}
                        />
                    </div>
                </div>
                <div className="border-l px-2 border-[#8080805f] md:col-span-4 ">
                    <h3 className=" pb-2 border-b border-[#000000e7]">Another blogs</h3>
                    {blogList?.map((blg) => (
                        <div className={`${!blg.status && 'hidden'} bg-gray-300`} >

                            <Link
                                to={`/shop/${shopId}/blog/${blg._id}`}
                                key={blg._id}
                                className="flex items-start gap-2 mt-3 duration-200  p-2 "
                            >
                                <img
                                    loading="eager"
                                    src={blg.img}
                                    alt=""
                                    className="md:w-[110px] w-[110px] h-[110px] object-cover"
                                />
                                <div className="">
                                    <h4 className=" text-sm ">{blg.title}</h4>
                                </div>
                            </Link>

                        </div>

                    ))}
                </div>
            </div>
        </div >
    );
};


export default ShopSingleBlog;