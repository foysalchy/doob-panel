import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Facebook from './facebook-round-color-icon.svg';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
import { useState } from 'react';
import ForgetPass from './ForgetPass';

const ShopSignIn = () => {

    const page = useLoaderData()
    const navigate = useNavigate()

    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;


    const { Google, shopCredential, loginWithEmail, shopUser } = useContext(ShopAuthProvider)

    const userData = (e) => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password, shopId);
        loginWithEmail(email, password)
    }


    const [open, setOpen] = useState(false)
    const [isChecked, setChecked] = useState(false);

    const handleCheckboxToggle = () => {
        setChecked(!isChecked);
    };

    if (shopUser) {
        navigate(`/shop/${shopId}`)
    }

    return (
        <div className='bg-gray-100'>
            <div className='py-8 w-full   sm:max-w-xl md:max-w-full lg:max-w-screen-lg md:px-24 lg:px-8 lg:py-10 mx-auto'>
                <div className="mt-5 flex justify-between items-baseline my-10">
                    <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Welcome to {page.shopName}! Please login.</h3>
                    <h1>
                        New member? <Link to={`/shop/${page.shopId}/sign-up`} className="font-medium text-indigo-600 hover:text-indigo-500">Register</Link> here.
                    </h1>
                </div>
                <div className="bg-white p-8  ">

                    <form
                        onSubmit={userData}
                        className="space-y-5 flex gap-4 items-start"
                    >
                        <div className='w-[60%]'>
                            <div>
                                <label className="font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder='Enter your email address'
                                    required
                                    className="w-full border-gray-500 mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm "
                                />
                            </div>
                            <div className='mt-4'>
                                <label className="font-medium">
                                    Password
                                </label>
                                <input
                                    type={isChecked ? "text" : "password"}
                                    name='password'
                                    placeholder='Enter your account password'
                                    required
                                    className="w-full  border-gray-500 mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm "
                                />
                            </div>
                            <div className="flex items-center mt-4 justify-between text-sm">
                                <div className="flex items-center gap-x-3">
                                    <button type='button' className='text-start flex gap-2 items-center' onClick={handleCheckboxToggle}>
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => { }}
                                        />
                                        Show Password
                                    </button>
                                </div>
                                <button onClick={() => setOpen(true)} className="text-center text-indigo-600 hover:text-indigo-500">Forgot password?</button>
                            </div>
                        </div>

                        <div className='w-[35%] pt-2 flex flex-col gap-4'>
                            <button
                                type='submit'
                                className="w-full px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 duration-150 mt-[3px] py-[9px]"
                            >
                                Sign in
                            </button>
                            {shopCredential?.service?.google && <button type='button' onClick={() => Google()} className=" w-full px-8 text-black font-medium bg-gray-300 hover:bg-gray-400 active:bg-red-600 duration-150 mt-[3px] py-[9px] flex gap-8 items-center">
                                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_17_40)">
                                        <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                        <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                        <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                        <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_17_40">
                                            <rect width="48" height="48" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Continue with Google
                            </button>}
                            {shopCredential?.service?.facebook && <button type='button' className="w-full px-8 text-black font-medium bg-gray-300 hover:bg-gray-400 active:bg-red-600 duration-150 mt-[3px] py-[9px] flex gap-8 items-center">
                                <img className='w-5 h-5' src={Facebook} alt="" />
                                Continue with Facebook
                            </button>}
                        </div>
                    </form>

                    {open && <ForgetPass open={open} setOpen={setOpen} />}
                </div>
            </div>
        </div>
    );
};

export default ShopSignIn;