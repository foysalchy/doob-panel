import React from 'react';

const HomeComponents7 = () => {
    return (
        <div>
            <div className=" ">

                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="relative bg-black rounded-2xl lg:px-40 px-10 py-5 lg:py-10 text-center">
                        <p className='text-xl text-white'>Subscribe to</p>
                        <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                            Our Newsletter


                        </h2>

                        <form className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16">
                            <input
                                placeholder="Email"
                                required
                                type="text"
                                className="flex-grow w-full h-12 px-4 mb-3  transition duration-200 border-2 border-transparent rounded appearance-none md:mr-2 md:mb-0 bg-gray-200 text-black font-poppins focus:border-teal-700 focus:outline-none focus:shadow-outline"
                            />
                            <button

                                className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide  transition duration-200 rounded shadow-md md:w-auto text-black bg-white hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                            >
                                Subscribe
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeComponents7;