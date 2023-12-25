import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';

const ForgetPass = ({ open, setOpen }) => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const { ForgetPass } = useContext(ShopAuthProvider)

    const handleUpload = () => {
        setLoading(true)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(email)) {
            ForgetPass(email)
            console.log(email);
            setLoading(true)
        } else {
            console.log('Invalid email');
            setLoading(true)
        }
    }

    return (
        <div className={open ? 'flex' : 'hidden'}>
            <div className="container mx-auto py-20">

                <div
                    className={`fixed  z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${open ? "block" : "hidden"
                        }`}
                >



                    <div

                        className="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px]"
                    >

                        <h3 className="pb-2 text-xl font-bold text-dark sm:text-2xl">
                            Forget Password !
                        </h3>
                        <span
                            className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-yellow-300`}
                        ></span>
                        <div>

                            <input id="name" type='email' value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Provide your email address" />
                        </div>


                        <div className="flex flex-wrap -mx-3">
                            <div className="w-1/2 px-3">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="block w-full rounded-lg border  p-3 text-center text-base border-red-500 font-medium text-black transition hover:border-red-600 hover:bg-red-600 "
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className="w-1/2 px-3">
                                <button
                                    onClick={() => handleUpload()}
                                    disabled={email === ''}
                                    className={`block w-full p-3 text-base font-medium text-center text-white transition border rounded-lg border-primary bg-green-500 disabled:blur-sm hover:bg-opacity-90`}
                                >
                                    {loading ? "Loading..." : "send you a link"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPass;