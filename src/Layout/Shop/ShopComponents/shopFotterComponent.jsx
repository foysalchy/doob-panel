import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopAuthProvider } from "../../../AuthProvider/ShopAuthProvide";
import { FaFacebook, FaFacebookMessenger, FaInstagram, FaLine, FaLinkedin, FaPinterest, FaReddit, FaSkype, FaSnapchat, FaSquareXTwitter, FaTelegram, FaTumblr, FaViber, FaWhatsapp, FaYoutube } from 'react-icons/fa6';

export const Footer = () => {

    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;


    const { data: pages = [], refetch, isLoading } = useQuery({
        queryKey: ["sellerPages"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/pages/${shopId}`);
            const data = await res.json();
            return data;
        },
    });


    const { data: shop = {}, } = useQuery({
        queryKey: ["buyer"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/${shopId}`);
            const data = await res.json();
            return data;
        },
    });
    const { shop_id } = useContext(ShopAuthProvider)
    const { data: contacts = [] } = useQuery({
        queryKey: ["contact"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/contact/${shopId}`);
            const data = await res.json();
            return data;
        },
    });
    console.log(`https://salenow-v2-backend.vercel.app/api/v1/shop/contact/${shopId}`, 'footer');

    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitEmail = (e) => {
        e.preventDefault()
        setLoading(true)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email && email.match(emailRegex)) {
            setError(false)
            fetch('https://salenow-v2-backend.vercel.app/api/v1/seller/subscriber-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, date: new Date(), shopId: shopId })
            })
                .then((res) => res.json())
                .then((data) => {

                    setLoading(false)
                    BrightAlert(`${data.message}`)
                });
        } else {
            setLoading(false)
            setError('Invalid email');
        }
    };

    return (
        <div className="bg-gray-900">
            <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                {/* className="grid row-gap-10 mb-8 lg:grid-cols-6" */}
                <div >
                    <div className=" w-full lg:grid grid-cols-5  gap-4 mb-4">
                        <div className="md:max-w-md lg:col-span-2">
                            <span className="text-base font-medium tracking-wide text-gray-300">
                                Subscribe for updates
                            </span>
                            <p className="mt-4 text-sm text-gray-500">
                                Get 10% off your first order
                            </p>
                            <form onSubmit={submitEmail} className="flex flex-col mt-4 md:flex-row">
                                <input
                                    placeholder="Email"
                                    required
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide border mb-2 text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                >
                                    Subscribe
                                </button>
                            </form>

                        </div>
                        <div>
                            <p className="font-medium tracking-wide text-gray-300">
                                Quick Links
                            </p>
                            <ul className="mt-2 space-y-2">
                                <li>
                                    <Link
                                        to={`/shop/${shopId}/blog`}
                                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                    >
                                        {'Blogs'}
                                    </Link>
                                </li>
                                {pages.length ? pages?.map((page, i) => (
                                    <div key={page._id}>

                                        {page?.status && (
                                            <li>
                                                <Link
                                                    to={`/shop/${shopId}/pages/${page._id}`}
                                                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                >
                                                    {page?.title}
                                                </Link>
                                            </li>
                                        )}

                                    </div>
                                )) : ""}


                            </ul>
                        </div>
                        <div className="mr-2">
                            <p className="font-medium tracking-wide text-gray-300">Support</p>
                            <ul className="mt-2 space-y-2 ">
                                <li>
                                    <a
                                        href="/"
                                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                    >
                                        {shop?.address}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                    >
                                        {shop?.shopEmail}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                    >
                                        {shop?.shopNumber}
                                    </a>
                                </li>

                            </ul>
                        </div>
                        <div>
                            <p className="font-medium tracking-wide text-gray-300">Account</p>
                            <ul className="mt-2 space-y-2">
                                <li>
                                    <a
                                        href="/"
                                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                    >
                                        My Account
                                    </a>
                                </li>
                                <li>
                                    <Link to={`/shop/${shopId}/sign-in`}
                                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                    >
                                        Login / Register
                                    </Link>
                                </li>

                                <li>
                                    <Link to={`/shop/${shopId}/user/cart`}

                                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                    >
                                        Cart
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                    >
                                        Wishlist
                                    </a>
                                </li>

                            </ul>
                        </div>

                    </div>

                </div>
                <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row">
                    <p className="text-sm text-gray-500">
                        © Copyright Shop Now 2024. All right reserved.
                    </p>
                    <div className="flex items-center mt-4 space-x-4 sm:mt-0">
                        {/* <a
                            href="/"
                            className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                                <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                            </svg>
                        </a>
                        <a
                            href="/"
                            className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
                        >
                            <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                                <circle cx="15" cy="15" r="4" />
                                <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                            </svg>
                        </a>
                        <a
                            href="/"
                            className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                            </svg>
                        </a> */}
                        {
                            contacts.length && contacts?.map((cont) => (
                                <div key={cont._id}>

                                    {


                                        (cont.media === 'Facebook' &&
                                            <a href={`https://facebook.com/${cont.URL}`} target="_blank">
                                                <FaFacebook className='cursor-pointer rounded-full text-blue-700 hover:text-blue-900  text-4xl bg-white p-1 ' />
                                            </a>)
                                        ||
                                        (cont.media === 'Messenger' &&
                                            <a href={`https://M.me/${cont.URL}`} target="_blank">
                                                <FaFacebookMessenger className='cursor-pointer rounded-full text-[#663399] hover:text-purple-700  bg-white p-1  text-4xl' />
                                            </a>)
                                        ||
                                        (cont.media === 'Instagram' &&
                                            <a href={`https://instagram.com/${cont.URL}`} target="_blank">
                                                <FaInstagram className='cursor-pointer rounded-full text-red-700 hover:text-red-900  text-4xl bg-white p-1 ' />
                                            </a>)
                                        ||
                                        (cont.media === 'Twitter' &&
                                            <a href={`https://twitter.com/${cont.URL}`} target="_blank">
                                                <FaSquareXTwitter className='cursor-pointer rounded-full text-gray-700 hover:text-gray-900  text-4xl bg-white p-1 ' />
                                            </a>)
                                        ||
                                        (cont.media === 'Whatsapp' &&
                                            <a href={`https://wa.me/${cont.URL}`} target="_blank">
                                                <FaWhatsapp className='cursor-pointer rounded-full text-green-500 hover:text-green-700  text-4xl bg-white p-1 ' />
                                            </a>)
                                        ||
                                        (cont.media === 'Viber' &&
                                            <a href={`viber://add?number=${cont.URL}`} target="_blank">
                                                <FaViber className='cursor-pointer rounded-full text-purple-500 hover:text-purple-700  text-4xl bg-white p-1 ' />
                                            </a>)
                                        ||
                                        (cont.media === 'Telegram' &&
                                            <a href={`https://t.me/${cont.URL}`} target="_blank">
                                                <FaTelegram className='cursor-pointer rounded-full text-blue-500 hover:text-blue-700  text-4xl bg-white p-1 ' />
                                            </a>)
                                        ||
                                        (cont.media === 'Skype' &&
                                            <a href={`skype:${cont.URL}?chat`} target="_blank">
                                                <FaSkype className='cursor-pointer rounded-full text-blue-500 hover:text-blue-700  text-4xl bg-white p-1 ' />
                                            </a>)
                                        ||
                                        (cont.media === 'YouTube' &&
                                            <a href={`https://youtube.com/${cont.URL}`} target="_blank">
                                                <FaYoutube className='cursor-pointer rounded-full text-red-500 hover:text-red-700  text-4xl bg-white p-1 ' />
                                            </a>)
                                        ||
                                        (cont.media === 'LINE' &&
                                            <a href={`https://line.me/${cont.URL}`} target="_blank">
                                                <FaLine className='cursor-pointer rounded-full text-green-500 hover:text-green-700  text-4xl bg-white p-1 ' />
                                            </a>)
                                        ||
                                        (cont.media === 'Reddit' &&
                                            <a href={`https://reddit.com/${cont.URL}`} target="_blank">
                                                <FaReddit className='bg-white p-1  text-red-500 border hover:text-red-700  text-4xl' />
                                            </a>)
                                        ||
                                        (cont.media === 'Snapchat' &&
                                            <a href={`https://snapchat.com/add/${cont.URL}`} target="_blank">
                                                <FaSnapchat className='bg-yellow-500 p-1  text-black border hover:bg-yellow-700  text-4xl' />
                                            </a>)
                                        ||
                                        (cont.media === 'Pinterest' &&
                                            <a href={`https://pinterest.com/${cont.URL}`} target="_blank">
                                                <FaPinterest className='cursor-pointer rounded-full text-red-500 hover:text-red-700  text-4xl bg-white p-1 ' />
                                            </a>)
                                        ||
                                        (cont.media === 'Tumblr' &&
                                            <a href={`https://tumblr.com/${cont.URL}`} target="_blank">
                                                <FaTumblr className='cursor-pointer rounded-full text-violet-500 hover:text-violet-700  text-4xl bg-white p-1 ' />
                                            </a>)
                                        ||
                                        (cont.media === 'Linkedin' &&
                                            <a href={`https://linkedin.com/in/${cont.URL}`} target="_blank">
                                                <FaLinkedin className='cursor-pointer rounded-full text-blue-500 hover:text-blue-700  text-4xl bg-white p-1 ' />
                                            </a>)

                                    }


                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};