import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const AdminSingleBlog = () => {
    const [blogList, setBlogList] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/admin/blogs')
            .then(res => res.json())
            .then(data => setBlogList(data))
    }, [])
    const blogInfo = useLoaderData()
    console.log(blogInfo);

    const extractInnerText = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }



    return (
        <div className="">
            <div className="px-1 md:py-28 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-20 lg:px-8 md:w-[80%] w-[95%] grid md:grid-cols-3 gap-3 ">
                <div className="md:col-span-2">
                    <img loading="lazy" src={blogInfo?.img} alt="" className="w-full h-[400px] object-contain" />

                    <h1 className=" mt-4 md:text-4xl text-2xl">
                        {blogInfo?.title}
                    </h1>
                    <div className="mt-5 ">
                        <div
                            className="mb-2  "
                            dangerouslySetInnerHTML={{
                                __html: blogInfo.message,
                            }}
                        />

                    </div>
                </div>
                <div classN
                    ame="border-l px-2 border-[#8080805f]">
                    <h3 className=" pb-2 border-b border-[#d8d8d85e]">Another blogs</h3>
                    {
                        blogList?.map(blg =>
                            <Link to={`/admin/blogs/${blg._id}`} key={blg._id} className="flex items-center gap-2 mt-3 duration-200 hover:bg-[#3c3c4681] p-2 ">
                                <img loading="lazy" src={blg.img} alt="" className="md:w-[110px] w-[110px]" />
                                <div className="">
                                    <h4 className=" text-sm font-bold ">{blg.title}</h4>

                                    <small>{extractInnerText(blg.message?.slice(0, 47))}</small>
                                </div>
                            </Link>
                        )
                    }

                </div>
            </div>
        </div>
    )
};

export default AdminSingleBlog;