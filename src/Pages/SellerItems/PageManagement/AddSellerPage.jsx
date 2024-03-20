import JoditEditor from 'jodit-react';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../AuthProvider/UserProvider';

const AddSellerPage = () => {
    const [loading, setLoading] = useState(false);
    const { shopInfo } = useContext(AuthContext)

    const dataSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const metaTag = form.metaTag.value;
        const metaDescription = form.metaDescription.value;
        const page = form.page.value;
        const description = form.description.value;
        const faq = {
            title,
            description,
            shop: shopInfo.shopId,
            page,
            metaTag,
            metaDescription


        };

        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/page`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(faq),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                Swal.fire("success", "Your page Publish Successfully", "success");

                form.reset();
            });
    };


    return (

        <div className=" mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <h1 className="text-2xl font-bold text-center">
                Publish a Page for you
            </h1>
            <div className="md:p-10 p-2 border-2 rounded md:m-10 mt-3">
                <form onSubmit={dataSubmit} className="space-y-4 ">
                    <div>
                        <label className="sr-only text-black" htmlFor="title">
                            Page Title
                        </label>
                        <input
                            required
                            className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                            placeholder="Title"
                            type="text"
                            id="title"
                            name="title"
                        />
                    </div>
                    <div>
                        <label className="sr-only text-black" htmlFor="title">
                            Select Page
                        </label>
                        <select
                            name='page'
                            className="w-full rounded-lg border bg-white border-gray-900 p-3 text-sm">
                            <option value="footer1">Footer 1</option>
                            <option value="footer2">Footer 2</option>
                            <option value="solution">Solution</option>
                            <option value="marketing">Marketing</option>
                        </select>
                    </div>

                    <div>
                        <div>
                            <JoditEditor name="description" id="message"></JoditEditor>
                        </div>
                    </div>
                    <div>
                        <label className="sr-only text-black" htmlFor="metaTag">
                            Meta Tag
                        </label>
                        <input
                            required
                            className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                            placeholder="Meta Tag"
                            type="text"
                            id="metaTag"
                            name="metaTag"
                        />
                    </div>
                    <div>
                        <label className="sr-only text-black" htmlFor="metaTag">
                            Meta Description
                        </label>
                        <input
                            required
                            className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                            placeholder="Meta Description"
                            type="text"
                            id="metaDescription"
                            name="metaDescription"
                        />
                    </div>

                    <div className="mt-4">
                        {
                            loading ?
                                <button disabled className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4">
                                    <span className="text-sm font-medium">
                                        Loading...
                                    </span>
                                    <svg className="animate-spin h-4 w-4 ml-3 text-white" viewBox="0 0 24 24">

                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    </svg>
                                </button>

                                :
                                <button type='submit'
                                    className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "

                                >
                                    <span className="absolute -end-full transition-all group-hover:end-4">
                                        <BsArrowRight />
                                    </span>

                                    <span className="text-sm font-medium transition-all group-hover:me-4">
                                        Upload Page
                                    </span>
                                </button>
                        }
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddSellerPage;