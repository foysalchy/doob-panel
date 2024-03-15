import React, { useContext, useEffect, useState } from 'react';
import SideNavberSeller from '../Pages/Dashboard/SellerDashboard/SideNavberSeller/SideNavberSeller';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';



const SellerDashLayout = () => {
    const { user, shopInfo, setCookie, setShopInfo } = useContext(AuthContext)

    const [responsive, setResponsive] = useState(false)

    const location = useLocation();
    const paths = location.pathname.split('/').filter((path) => path !== '')


    function convertToTitleCase(str) {
        return str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }



    const [services, setServices] = useState(true)
    const { data: prices = {}, refetch } = useQuery({
        queryKey: ["subscriptionModal"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/subscription-model?priceId=${shopInfo?.priceId}&shopId=${shopInfo?._id}`);
            const data = await res.json();
            return data?.data?.result;
        },
    });

    const originalDate = user?.createdAt;
    const formattedDate = new Date(originalDate);

    // Calculate the time difference in milliseconds
    const timeDifference = new Date() - formattedDate;

    // Convert milliseconds to days
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const time = prices?.timeDuration === 'Monthly' && 30 || prices?.timeDuration === 'Yearly' && 365 || prices?.timeDuration === 'Weekly' && 7 || prices?.timeDuration === 'Daily' && 1 || prices?.timeDuration === 'Lifetime' && 1000000000000000000000000000000;

    // console.log(`${daysPassed} days have passed since the user was created.`);
    localStorage.setItem('checkingPayment', daysPassed);

    useEffect(() => {
        const getTime = localStorage.getItem('checkingPayment');
        console.log(getTime, 'time');

        const checkAndUpdateStatus = () => {
            // Your logic for updating status, setting services, and logging out
            if (daysPassed > time) {
                console.log(daysPassed, time, 'daysPassed');
                // updateStatus(false);
                setServices(false);

            }
        };

        // Check and update status immediately when the component mounts
        checkAndUpdateStatus();

        // Calculate the time until the next day
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const timeUntilNextDay = tomorrow - now;

        // Set up an interval to run the checkAndUpdateStatus function every day
        const intervalId = setInterval(() => {
            checkAndUpdateStatus();
        }, timeUntilNextDay);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run the effect only once when the component mounts


    const updateStatus = (status) => {
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/update-shopInfo-for-status?id=${shopInfo._id}&status=${status}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        }).then((res) => res.json()).then((data) => {
            console.log(data);

            if (data.modifiedCount > 0) {
                setShopInfo(data.data)
                setCookie("SellerShop", JSON.stringify(data.data));
            }
            refetch()
        })
    }

    return (
        <div className='flex  bg-[#f0f2f5]'>

            <div className="sticky z-50 top-0 h-full min-h-screen  text-white">
                <SideNavberSeller responsive={responsive} setResponsive={setResponsive} />
            </div>
            <div className="px-4 py-8 w-full   sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                <div>
                    <nav
                        aria-label="breadcrumb"
                        className="w-full lg:hidden rounded p-4 mb-4 bg-gray-800 text-gray-100"
                    >
                        <ol className="flex h-8 space-x-2">
                            <li className='md:hidden block'>
                                <button onClick={() => setResponsive(!responsive)} className="py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current text-gray-100">
                                        <rect width="352" height="32" x="80" y="96"></rect>
                                        <rect width="352" height="32" x="80" y="240"></rect>
                                        <rect width="352" height="32" x="80" y="384"></rect>
                                    </svg>
                                </button>
                            </li>
                            <li className="flex items-center">
                                <Link
                                    rel="noopener noreferrer"
                                    to="/seller/dashboard"
                                    title="Back to homepage"
                                    className="hover:underline"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5 pr-1 text-gray-400"
                                    >
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                    </svg>
                                </Link>
                            </li>
                            <li className="flex w-full overflow-x-auto  overflow-y-hidden items-center">
                                {paths.slice(1).map((path, index) => (
                                    <div className="md:text-md text-sm flex items-center space-x-2" key={index}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 32 32"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            className="w-2 h-2 mt-1 transform rotate-90 fill-current text-gray-600"
                                        >
                                            <path d="M32 30.031h-32l16-28.061z"></path>
                                        </svg>
                                        <Link
                                            rel="noopener noreferrer"
                                            to={`/${paths.slice(0, index + 2).join('/')}`}
                                            className="flex items-center px-1 capitalize hover:underline"
                                        >
                                            {convertToTitleCase(path)}
                                        </Link>
                                    </div>
                                ))}
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className={`bg-[#f0f2f5] flex-1  p-4 sm:p-0`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SellerDashLayout;