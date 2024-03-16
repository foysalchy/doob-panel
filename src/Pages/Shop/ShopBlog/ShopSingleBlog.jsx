import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { BsCalendarDate } from 'react-icons/bs';
import { FaRegCalendarAlt } from 'react-icons/fa';
import MetaHelmet from '../../../Helmate/Helmate';


const ShopSingleBlog = () => {


    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;

    console.log('Shop ID:', shopId);

    const [blogList, setBlogList] = useState([]);
    useEffect(() => {
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/blog/${shopId}`)
            .then((res) => res.json())
            .then((data) => setBlogList(data));
    }, []);

    const blogInfo = useLoaderData();


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


    const [searchQuery, setSearchQuery] = useState('');

    const filteredBlogList = blogList.filter(blg => {
        // Check if the blog's title contains the search query
        return blg.title.toLowerCase().includes(searchQuery.toLowerCase());
    });




    return (
        <div className=" ">

            <div className="relative">
                <img
                    srcSet={blogInfo?.img}
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
                <MetaHelmet title={blogInfo?.MetaTag} description={blogInfo?.MetaDescription} image={blogInfo?.MetaImage} />
                <div className="md:col-span-8 ">
                    <img
                        loading="eager"
                        src={blogInfo?.img}
                        srcSet={blogInfo?.img}
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
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search blogs..."
                        className="w-full mt-3 mb-3 p-2 border border-gray-300 rounded"
                    />
                    <h3 className=" pb-2 border-b border-[#000000e7]">Another blogs</h3>
                    {filteredBlogList.map((blg) => (
                        <div className={`${!blg.status && 'hidden'} bg-gray-300`} key={blg._id}>
                            <Link
                                to={`/shop/${shopId}/blog/${blg._id}`}
                                className="flex items-start gap-2 mt-3 duration-200 p-2"
                            >
                                <img
                                    loading="eager"
                                    src={blg.img}
                                    srcSet={blg.img}
                                    alt=""
                                    className="md:w-[110px] w-[110px] h-[110px] object-cover"
                                />
                                <div>
                                    <h4 className="text-sm">{blg.title}</h4>
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