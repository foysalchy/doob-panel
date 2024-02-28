import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BiSolidTraffic, BiSolidUser } from 'react-icons/bi';
import { FaPersonArrowUpFromLine, FaSalesforce } from 'react-icons/fa6';

const Starts = () => {

    const { data: newUsers = [], refetch } = useQuery({
        queryKey: ["newUser"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/api/v1/admin/previous-week-users");
            const data = await res.json();
            return data;
        },
    });



    return (
        <div>
            <div className="">


                <div className=" pt-6 2xl:container">


                    <div>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                                    <div className="flex-auto p-4">
                                        <div className="flex ">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                    Traffic
                                                </h5>
                                                <span className="font-bold text-xl">350,897</span>
                                            </div>
                                            <div className="relative w-auto pl-4 flex-initial">
                                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                                    <BiSolidTraffic />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-blueGray-500 mt-4">
                                            <span className="text-emerald-500 mr-2">
                                                <i className="fas fa-arrow-up" /> 3.48%
                                            </span>
                                            <span className="whitespace-nowrap">Since last month</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                                    <div className="flex-auto p-4">
                                        <div className="flex ">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                    NEW USERS
                                                </h5>
                                                <span className="font-bold text-xl">{newUsers?.newUsersCount}</span>
                                            </div>
                                            <div className="relative w-auto pl-4 flex-initial">
                                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                                                    <BiSolidUser />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-blueGray-500 mt-4">
                                            <span className={!newUsers?.percentageChange > 0 ? "text-red-500 mr-2" : "text-green-500 mr-2"}>
                                                <i className="fas fa-arrow-down" /> {newUsers?.percentageChange}%
                                            </span>
                                            <span className="whitespace-nowrap">Since last week</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-wrap">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                    SALES
                                                </h5>
                                                <span className="font-bold text-xl">924</span>
                                            </div>
                                            <div className="relative w-auto pl-4 flex-initial">
                                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                                                    <FaSalesforce />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-blueGray-500 mt-4">
                                            <span className="text-orange-500 mr-2">
                                                <i className="fas fa-arrow-down" /> 1.10%
                                            </span>
                                            <span className="whitespace-nowrap">Since yesterday</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                                    <div className="flex-auto p-4">
                                        <div className="flex">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                    PERFORMANCE
                                                </h5>
                                                <span className="font-bold text-xl">49,65%</span>
                                            </div>
                                            <div className="relative w-auto pl-4 flex-initial">
                                                <div className="text-black p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500">
                                                    <FaPersonArrowUpFromLine />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-blueGray-500 mt-4">
                                            <span className="text-emerald-500 mr-2">
                                                <i className="fas fa-arrow-up" /> 12%
                                            </span>
                                            <span className="whitespace-nowrap">Since last month</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Starts;