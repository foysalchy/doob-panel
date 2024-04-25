import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import AnouncementContent from './AdminContent/AnouncementContent';
import NoticeContent from './AdminContent/NoticeContent';
import { RxCross2 } from 'react-icons/rx';
import { useQuery } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SellerPopUp from './SellerPopUp';
import { Link } from 'react-router-dom';
import { LuSwitchCamera } from 'react-icons/lu';
import { MdEmail } from 'react-icons/md';
import Swal from 'sweetalert2';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';





const SellerDashboard = () => {

    const { user, shopInfo } = useContext(AuthContext)
    const [greeting, setGreeting] = useState('');
    const currentDate = new Date();
    const [open, setOpen] = useState(false);
    const [openAnouncement, setOpenAnouncement] = useState(false);
    useEffect(() => {
        const currentHour = new Date().getHours();

        const getCurrentTime = () => {
            console.log(currentHour >= 20 || currentHour < 5, currentHour);

            if (currentHour >= 5 && currentHour < 12) {
                setGreeting('Good morning');
            } else if (currentHour >= 12 && currentHour < 15) {
                setGreeting('Good noon');
            } else if (currentHour >= 15 && currentHour < 17) {
                setGreeting('Good afternoon');
            } else if (currentHour >= 17 && currentHour < 20) {
                setGreeting('Good evening');
            } else if (currentHour >= 20 || currentHour < 5) {
                setGreeting('Happy Nightfall');
            } else {
                setGreeting('Good evening');
            }
        };

        getCurrentTime();
    }, []);

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);




    const { data: sellerPopupData = [], refetch, isLoading } = useQuery({
        queryKey: "sellerPopupData",
        queryFn: async () => {
            const res = await fetch(`https://backend.doob.com.bd/api/v1/admin/pop-up`);
            const data = await res.json();
            return data?.data;
        },
    });
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);


    const handleButtonClick = () => {
        setShowDatePicker(!showDatePicker);
    };


    const { data: shopCredential = {}, isLoading: itemLoad } = useQuery({
        queryKey: ["shopCredential"],
        queryFn: async () => {
            try {
                const res = await fetch(`https://backend.doob.com.bd/api/v1/shop/firebase/${shopInfo.shopId}`)
                const data = await res.json();
                return data;
            } catch (error) {
                throw error; // Rethrow the error to mark the query as failed
            }
        },
    });


    const { data: noticeInfo = [], } = useQuery({
        queryKey: "noticeInfo",
        queryFn: async () => {
            const res = await fetch(`https://backend.doob.com.bd/api/v1/admin/seller-notice`);
            const data = await res.json();
            return data?.data;
        },
    });


    const [showModal, setShowModal] = useState(false);

    const [popup, setPopUp] = useState(true);

    useEffect(() => {
        const lastModalShownTimestamp = localStorage.getItem('lastClosedTime');
        if (lastModalShownTimestamp) {
            const lastShownTime = new Date(parseInt(lastModalShownTimestamp));
            const currentTime = new Date();
            const timeDifference = currentTime.getTime() - lastShownTime.getTime();
            const hoursDifference = timeDifference / (1000 * 3600); // Convert milliseconds to hours

            if (hoursDifference >= 5) {
                setPopUp(true); // More than 5 hours, set popup to true
            } else {
                setPopUp(false); // Less than 5 hours, set popup to false
            }
        }
    }, []);


    const onClose = () => {
        setShowModal(false);
        setPopUp(false)
        localStorage.setItem('isModalOpen', false);
        localStorage.setItem('lastClosedTime', Date.now());

        setTimeout(() => {
            setShowModal(true);
            localStorage.setItem('isModalOpen', true);
        }, 4 * 60 * 60 * 1000); // 4 hours in milliseconds
    };



    const { data: orderData = [] } = useQuery({
        queryKey: ["orderData"],
        queryFn: async () => {
            const res = await fetch(`https://backend.doob.com.bd/api/v1/seller/order?shopId=${shopInfo._id}`);
            const data = await res.json();
            refetch();
            return data.data;
        },
    });



    const { data: darazShop = {}, isLoading: check, refetch: check_reload } = useQuery({
        queryKey: ["darazShopBd"],
        queryFn: async () => {
            const res = await fetch(`https://backend.doob.com.bd/api/v1/seller/seller-daraz-accounts?id=${shopInfo._id}`);
            const data = await res.json();
            return data.data[0];
        },
    })

    console.log(darazShop, '.......')

    const { data: priviousAccount = [], isLoading: loading, refetch: reload } = useQuery({
        queryKey: ["priviousAccount"],
        queryFn: async () => {
            const res = await fetch(`https://backend.doob.com.bd/api/v1/daraz/get-privious-account?shopId=${shopInfo._id}`);
            const data = await res.json();
            return data.data;
        },
    });

    const switchAccount = (_id, id) => {
        fetch(`https://backend.doob.com.bd/api/v1/daraz/switching-your-daraz?id=${id}&loginId=${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Log response data
                Swal.fire("Success", "", "success"); // Show success message (assuming you're using SweetAlert)
                refetch(); // Refetch data
                reload(); // Reload data
            })

    };


    return (
        <div className="h-screen mb-10 mt-[-40px]   ">




            {sellerPopupData.length ? popup && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-90 z-50">
                    <SellerPopUp onClose={onClose} showModal={popup} setShowModal={setPopUp} data={sellerPopupData} handleClose={onClose} />
                </div>
            )
                :
                ''
            }
            <div className=" bg-gradient-to-r from-[#1493f4] to-[#835177] absolute -z-10 -top-12 -right-14 blur-2xl opacity-10"></div>
            <h1 className="text-4xl font-semibold text-gray-800 capitalize">
                {greeting}, {user.name}
            </h1>

            <h2 className="text-gray-400 text-md">
                Here&#x27;s what&#x27;s happening with your ambassador account today.
            </h2>
            {!itemLoad && !shopCredential?._id && <div className="">
                <div class="bg-red-100 border border-orange-400 text-orange-700 px-4 py-3 rounded relative" role="alert">
                    <strong class="font-bold">Warning: </strong>
                    <Link to={`/seller/settings/auth-credential`}>
                        <span class="block sm:inline"> You have no auth credential yet now. so your website have no user login please setup your auth credential. </span>
                    </Link>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">

                    </span>
                </div>
            </div>}

            <div className="mt-4">
                <Swiper
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {noticeInfo?.map((item, i) => (
                        <SwiperSlide>
                            <a href={item.link} >
                                <img src={item.image} alt="Description of image 1" className='h-32 object-cover rounded w-full' />
                            </a>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
            <div className="flex flex-col items-start w-full my-6 space-y-4 md:space-x-4 md:space-y-0 md:flex-row">
                <div className="w-full md:w-6/12">
                    <div
                        style={{
                            boxShadow: `0 1px 2px #d0d0d0`
                        }}
                        className="relative ring-1 ring-gray-100 w-full overflow-hidden rounded-lg bg-white  ">
                        <a href="#" className="block w-full h-full">
                            <div className="flex items-center justify-between px-4 py-7 space-x-4">
                                <div className="flex items-center">
                                    <span className="relative p-5 bg-yellow-100 rounded-full">
                                        <svg width="40" fill="currentColor" height="40"
                                            className="absolute h-5 text-yellow-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                            viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z">
                                            </path>
                                        </svg>
                                    </span>
                                    <p
                                        className="ml-2  text-sm font-semibold text-gray-700 border-b border-gray-200 capitalize">
                                        Level 2 <br /> {user.name}
                                    </p>
                                </div>
                                <div className="mt-3 text-xl md:font-bold text-black border-b border-gray-200 md:mt-0 ">
                                    ৳44,453.39
                                    <span className="text-xs text-gray-400">
                                        /৳100K
                                    </span>
                                </div>
                            </div>
                            <div className="mt-3 p-4 text-xl md:font-bold text-black border-b border-gray-200 md:mt-0 ">
                                All Product
                                <span className="ml-4 text-gray-400">
                                    12
                                </span>
                            </div>
                            <div className="w-full hidden h-3 bg-gray-100">
                                <div className="w-2/5 h-full text-xs text-center  bg-green-400">
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <div
                    style={{
                        boxShadow: `0 1px 2px #d0d0d0`
                    }}
                    className="flex flex-col bg-white rounded-lg border px-8  shadow-3 py-4 md:w-[700px] w-full gap-3 mb-8 mt-4">
                    {/* <div className="bg-white  p-3 ring-1 ring-gray-400 rounded-md shadow-xl "> */}
                    {<AnouncementContent setOpen={setOpenAnouncement} />}
                    {/* </div> */}
                    <hr />
                    {/* <div className="bg-white p-3 ring-1 ring-gray-200 rounded-md shadow-xl "> */}
                    {<NoticeContent setOpen={setOpen} />}
                    {/* </div> */}
                </div>
                {/* <div className="flex items-center w-full space-x-4 md:w-1/2">
                    <div className="w-1/2 ">
                        <div className="relative ring-1 ring-gray-100 md:h-[100px] h-[120px] w-full px-4 py-6 bg-white shadow-lg ">
                            <p className="text-2xl font-bold text-black ">
                                12
                            </p>
                            <p className="text-sm text-gray-400">
                                Active Product
                            </p>
                        </div>
                    </div>
                    <div className="w-1/2 ">
                        <div className="relative w-full px-4 md:h-[100px] h-[120px] ring-1 ring-gray-100 py-6 bg-white shadow-lg ">
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-black flex gap-2">
                                    <span className='kalpurush'>৳</span> <p> 93.76</p>
                                </div>

                                <div className="flex md:relative absolute right-2 top-2 items-center justify-center text-lg font-bold text-white w-[30px] h-[30px] bg-purple-500 rounded-full ">
                                    ৳
                                </div>
                            </div>
                            <p className="text-sm text-gray-400">
                               Commission in approval
                            </p>
                        </div>
                    </div>
                </div> */}
            </div>

            <div className="flex items-center space-x-4">
                <div>
                    <div>
                        <div className="relative inline-block">
                            <button
                                style={{
                                    boxShadow: `0 1px 2px #d0d0d0`
                                }}
                                className="flex text-black bg-white items-center px-4 py-2    border border-gray-300 rounded-r-full rounded-tl-sm rounded-bl-full md:text-md w-[203px]"
                                onClick={handleButtonClick}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="mr-2 text-gray-400"
                                    viewBox="0 0 1792 1792"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* SVG path for the first icon (calendar) */}
                                </svg>
                                {selectedDate ? selectedDate.toDateString() : formattedDate}

                            </button>

                            {showDatePicker && (
                                <div className="absolute top-0.5 left-6 border-none focus:none text-black z-10 mt-2">
                                    <DatePicker
                                        wrapperClassName="focus:outline-none text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:text-black"
                                        calendarClassName="border border-gray-300"
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        onClickOutside={() => setShowDatePicker(false)}
                                        // customInput={<CustomInput />}
                                        open={showDatePicker}
                                    />
                                </div>
                            )}
                        </div>
                    </div>


                </div>
                <span
                    className="text-sm bg-white text-gray-800">
                    Compared to {formattedDate}
                </span>
            </div>
            <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="w-full">
                    <div
                        style={{
                            boxShadow: `0 1px 2px #d0d0d0`
                        }}
                        className="relative rounded-lg ring-1 ring-gray-100 w-full px-4 h-[120px] bg-white shadow-lg ">
                        <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max ">
                            Product Referred
                        </p>
                        <div className="flex items-end my-6 space-x-2">
                            <p className="md:text-5xl text-3xl font-bold text-black ">
                                12
                            </p>
                            <span className="flex items-center text-xl font-bold text-green-500">
                                <svg width="20" fill="currentColor" height="20" className="h-3" viewBox="0 0 1792 1792"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                                    </path>
                                </svg>
                                22%
                            </span>
                        </div>

                    </div>
                </div>
                <div className="w-full">
                    <div
                        style={{
                            boxShadow: `0 1px 2px #d0d0d0`
                        }}
                        className="relative rounded-lg w-full ring-1 ring-gray-100 px-4 h-[120px] bg-white shadow-lg ">
                        <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max ">
                            Product Paid
                        </p>

                        <div className="flex items-end my-6 space-x-2">
                            <p className="md:text-5xl text-3xl font-bold text-black ">
                                23
                            </p>
                            <span className="flex items-center text-xl font-bold text-green-500">
                                <svg width="20" fill="currentColor" height="20" className="h-3" viewBox="0 0 1792 1792"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                                    </path>
                                </svg>
                                12%
                            </span>
                        </div>

                    </div>
                </div>
                <div className="w-full">
                    <div
                        style={{
                            boxShadow: `0 1px 2px #d0d0d0`
                        }}
                        className="relative rounded-lg w-full px-4 ring-1 ring-gray-100 h-[120px] bg-white shadow-lg ">
                        <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max ">
                            New features
                        </p>
                        <div className="flex items-end my-6 space-x-2">
                            <p className="md:text-5xl  text-3xl font-bold text-black ">
                                12
                            </p>
                            <span className="flex items-center text-xl font-bold text-red-500">
                                <svg width="20" fill="currentColor" height="20" className="h-3 transform rotate-180"
                                    viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                                    </path>
                                </svg>
                                2%
                            </span>
                        </div>

                    </div>
                </div>
                <div className="w-full">
                    <div
                        style={{
                            boxShadow: `0 1px 2px #d0d0d0`
                        }}
                        className="relative rounded-lg ring-1 ring-gray-100 w-full px-4 h-[120px] bg-white shadow-lg ">
                        <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max ">
                            Users
                        </p>
                        <div className="flex items-end my-6 space-x-2">
                            <p className="md:text-5xl text-3xl font-bold text-black ">
                                {orderData.length}
                            </p>
                            {/* <span className="flex items-center text-xl font-bold text-red-500">
                                <svg width="20" fill="currentColor" height="20" className="h-3 transform rotate-180"
                                    viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                                    </path>
                                </svg>
                                14%
                            </span> */}
                        </div>

                    </div>
                </div>
                <div className="w-full">
                    <div
                        style={{
                            boxShadow: `0 1px 2px #d0d0d0`
                        }}
                        className="relative rounded-lg w-full ring-1 ring-gray-100 px-4 h-[120px] bg-white shadow-lg ">
                        <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max ">
                            Sales
                        </p>
                        <div className="flex items-end my-6 space-x-2">
                            <p className="md:text-5xl text-3xl font-bold text-black ">
                                9
                            </p>
                            <span className="flex items-center text-xl font-bold text-green-500">
                                <svg width="20" fill="currentColor" height="20" className="h-3" viewBox="0 0 1792 1792"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                                    </path>
                                </svg>
                                34%
                            </span>
                        </div>

                    </div>
                </div>
                <div className="w-full">
                    <div
                        style={{
                            boxShadow: `0 1px 2px #d0d0d0`
                        }}
                        className="relative rounded-lg w-full ring-1 ring-gray-100 px-4 h-[120px] bg-white shadow-lg ">
                        <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max ">
                            Maintenance
                        </p>
                        <div className="flex items-end my-6 space-x-2">
                            <p className="md:text-5xl text-3xl font-bold text-black ">
                                15
                            </p>
                            <span className="flex items-center text-xl font-bold text-green-500">
                                <svg width="20" fill="currentColor" height="20" className="h-3" viewBox="0 0 1792 1792"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                                    </path>
                                </svg>
                                34%
                            </span>
                        </div>

                    </div>
                </div>

            </div>
            <div className="grid grid-cols-1 gap-4 my-10 md:grid-cols-2 lg:grid-cols-2">
                <div className='w-full px-4 py-2 bg-gray-50 rounded text-blue-500 flex items-center gap-2'>
                    <MdEmail />
                    {

                        <h1 className="w-full"> {darazShop?.result?.account}</h1>

                    }
                </div>
                <div className="w-full ">
                    <h1>Previous Login</h1>
                    <hr />
                    {
                        priviousAccount.filter(shop => shop.result.account !== darazShop?.result?.account).map(shop =>
                            <div className='  px-4 py-2 border flex items-center justify-between rounded bg-[#d2d2d2] text-sm'>{shop.result.account} <button onClick={() => switchAccount(shop._id, shop.oldId)} className='cursor-pointer bg-blue-500 text-white  px-4 py-1 rounded flex items-center gap-2 '><LuSwitchCamera /> Switch</button></div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;