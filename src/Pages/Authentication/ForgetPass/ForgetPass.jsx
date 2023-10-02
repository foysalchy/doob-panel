import React from 'react';
import { Link } from 'react-router-dom';

const ForgetPass = () => {
    return (
        <div>
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12 py-10 mx-auto">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                    <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                        Password Reset
                    </h3>
                    <form>

                        <div className="mb-1 sm:mb-2">
                            <label
                                htmlFor="lastName"
                                className="inline-block mb-1 font-medium"
                            >
                                Email
                            </label>
                            <input
                                placeholder="xyz@email.com"
                                required
                                type="email"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                id="lastName"
                                name="lastName"
                            />
                        </div>


                        <div className="mt-4 mb-2 sm:mb-4">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md hover:bg-black bg-gray-800 focus:shadow-outline focus:outline-none"
                            >
                                Get Password Change Email
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPass;