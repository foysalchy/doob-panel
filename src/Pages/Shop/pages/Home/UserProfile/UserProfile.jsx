import React from 'react';

const UserProfile = () => {
    return (
        <div className='px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
            <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-700 shadow-xl overflow-y-scroll">
                <div className="ml-3 h-7 flex justify-end items-center">
                    <button
                        type="button"
                        className="bg-gray-100 dark:bg-gray-700 m-1 p-3 justify-end rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                    >
                        <span className="sr-only">Close panel</span>
                        {/* Heroicon name: outline/x */}
                        <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="bg-green-300 shadow-lg pb-3 rounded-b-3xl">
                    <div className="flex  rounded-b-3xl bg-gray-100 dark:bg-gray-700 space-y-5 flex-col items-center py-7">
                        <img
                            className="h-28 w-28 rounded-full"
                            src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
                            alt="User"
                        />
                        <a href="#">
                            {" "}
                            <span className="text-h1">Regita </span>
                        </a>
                    </div>
                    <div className="grid px-7 py-2  items-center justify-around grid-cols-3 gap-4 divide-x divide-solid ">
                        <div className="col-span-1 flex flex-col items-center ">
                            <span className="text-2xl font-bold dark:text-gray-500">0</span>
                            <span className="text-lg font-medium 0">Order</span>
                        </div>
                        <div className="col-span-1 px-3 flex flex-col items-center ">
                            <span className="text-2xl font-bold dark:text-gray-500">0</span>
                            <span className="text-lg font-medium 0">Favorites</span>
                        </div>
                        <div className="col-span-1 px-3 flex flex-col items-center ">
                            <span className="text-2xl font-bold dark:text-gray-500">0</span>
                            <span className="text-lg font-medium"> Card</span>
                        </div>
                    </div>
                </div>
                <div className="grid rounded-2xl divide-y divide-dashed hover:divide-solid  justify-evenly bg-gray-50 dark:bg-gray-300 m-3 mt-10 grid-cols-3">
                    <div className="col-span-1  p-3">
                        <div className="flex flex-col items-center ">
                            <a href="">
                                {" "}
                                <button className="tr-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-14 w-14 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="text-lg font-medium">My Profile</span>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="col-span-1  p-3">
                        <div className="flex flex-col items-center ">
                            <a href="">
                                {" "}
                                <button className="tr-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-14 w-14 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>
                                    <span className="text-lg font-medium">Order History</span>
                                </button>
                            </a>
                        </div>
                    </div>

                    <div className="col-span-1 bg-red-50 p-3">
                        <div className="flex  flex-col items-center ">
                            <a href="">
                                {" "}
                                <button className="tr-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-14 w-14 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span className="text-lg font-medium">Logout</span>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default UserProfile;