import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import Swal from 'sweetalert2';

const SellerAddContactPage = () => {
    const [loading, setLoading] = useState(false);


    const { shopInfo } = useContext(AuthContext)

    const dataSubmit = (event) => {
        setLoading(true)
        event.preventDefault();
        const media = selectedMedia
        const URL = event.target.url.value
        const password = event.target?.password?.value
        let formData = {}
        if (password) {
            formData = {
                media,
                URL,
                password,
                shop: shopInfo.shopId
            }
        }
        else {
            formData = {
                media,
                URL,
                shop: shopInfo.shopId
            }
        }

        fetch(`http://localhost:5000/shop/contactInfo`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                Swal.fire("success", "Your Category Publish Successfully", "success");

                form.reset();
                setPreDeleteUrl("");
                setFileName("");
                refetch();
            });

        event.target.reset();
    }

    const [selectedMedia, setSelectedMedia] = useState('Choose a Social Media');

    const isEmailCheck = (event) => {
        const selectedValue = event.target.value;
        setSelectedMedia(selectedValue);
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="px-4 py-8 w-full  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
            <div>
                <nav
                    aria-label="breadcrumb"
                    className="w-full rounded p-4 mb-4 dark:bg-gray-800 dark:text-gray-100"
                >
                    <ol className="flex h-8 space-x-2">
                        <li className="flex items-center">
                            <Link
                                rel="noopener noreferrer"
                                to="/admin/dashboard"
                                title="Back to homepage"
                                className="hover:underline"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5 pr-1 dark:text-gray-400"
                                >
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                </svg>
                            </Link>
                        </li>
                        <li className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                fill="currentColor"
                                className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600"
                            >
                                <path d="M32 30.031h-32l16-28.061z"></path>
                            </svg>
                            <Link
                                rel="noopener noreferrer"
                                to="/seller/manage-blogs"
                                className="flex items-center px-1 capitalize hover:underline"
                            >
                                Blog
                            </Link>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="my-10">
                <h1 className="text-2xl font-bold text-center">
                    Publish a Category for you and next
                </h1>
                <div className="p-10 border-2  rounded m-10">
                    <form onSubmit={dataSubmit} className="w-full ">

                        <div className='my-4'>
                            <label className="sr-only text-black" htmlFor="title">Select an option</label>
                            <select name='Media' onChange={isEmailCheck}
                                value={selectedMedia} id="countries" className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline">
                                <option disabled>Choose a Social Media</option>
                                <option value="Phone Number">Phone Number</option>
                                <option value="Email">Email</option>
                                <option value="Facebook">Facebook </option>
                                <option value="Messenger">Messenger</option>
                                <option value="Instagram">Instagram </option>
                                <option value="Whatsapp">Whatsapp </option>
                                <option value="Linkedin">Linkedin </option>
                                <option value="Telegram">Telegram </option>
                                <option value="Viber">Viber </option>
                                <option value="Tumblr">Tumblr </option>
                                <option value="Pinterest">Pinterest </option>
                                <option value="Snapchat">Snapchat </option>
                                <option value="Reddit">Reddit </option>
                                <option value="LINE">LINE </option>
                                <option value="YouTube">YouTube </option>
                                <option value="Twitter">Twitter </option>
                                <option value="Skype">Skype </option>
                            </select>
                        </div>
                        <div>
                            <label className="sr-only text-black" htmlFor="title">
                                Provide URL
                            </label>
                            <input
                                required
                                className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                placeholder={'Provide Your ' + selectedMedia + ' user name only'}
                                type="text"
                                id="title"
                                name="url"
                            />
                        </div>
                        {selectedMedia === 'Email' && <div className="mb-1 sm:mb-2">
                            <small className='text-orange-500'>provide a valid email and valid password. because its use for come to user message</small>
                            <label className="sr-only text-black" htmlFor="title">
                                Provide Email Password
                            </label>
                            <div className="relative my-4">
                                <input
                                    placeholder="Provide Your Email Password"
                                    required

                                    type={showPassword ? "text" : "password"}
                                    className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                    id="password"
                                    name="password"
                                />
                                {showPassword ? (
                                    <span
                                        className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <AiFillEyeInvisible />
                                    </span>
                                ) : (
                                    <span
                                        className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <AiFillEye />
                                    </span>
                                )}
                            </div>
                        </div>}

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
                                            Add Contact
                                        </span>
                                    </button>
                            }

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellerAddContactPage;