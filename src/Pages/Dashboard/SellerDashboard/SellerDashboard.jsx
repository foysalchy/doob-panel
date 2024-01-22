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



const SellerPopUp = ({ showModal, setShowModal, data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const mHandleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const mHandlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    const currentData = data[currentIndex];
    const style = {
        overlay: 'w-screen h-screen fixed flex items-center justify-center bg-[black] let-0 right-0 top-0 bg-opacity-50 z-[1000]',
        card: 'bg-white rounded-lg p-3 lg:w-[800px] md:w-full relative',
        title: 'text-xl font-semibold pb-3',
        img: 'w-full h-[420px] object-contain',
        flexBox: 'flex items-center gap-2 justify-between',
        close: 'absolute bg-gray-100 w-[40px] h-[40px] text-lg top-2 right-2 rounded-full'
    }
    return (
        <div>
            <div className="relative lg:max-w-screen-lg mx-auto bg-white">

                <div className={style.card}>
                    <div className="flex  justify-between items-center">
                        <h3 className={style.title}>Pop Up</h3>
                        <div onClick={() => setShowModal(false)} className='cursor-pointer bg-gray-300 rounded-full p-2 text-2xl hover:bg-gray-400'>
                            <RxCross2 className='text-xl' />
                        </div>
                    </div>
                    <a href={currentData.link} >
                        <div className='h-[400px] overflow-y-auto'>
                            <h3 className={style.title}>{currentData?.title}</h3>
                            <div dangerouslySetInnerHTML={{ __html: currentData?.message }}></div>

                            <img className={style.img} src={currentData?.image} alt="" />
                            <div className="flex items-center gap-2">
                                <button className={style.nextBtn} onClick={mHandlePrev}>Prev</button>
                                <button className={style.prevBtn} onClick={mHandleNext}>Next</button>
                            </div>
                        </div>
                    </a>

                </div>

            </div>
        </div>
    )
}



const SellerDashboard = () => {

    const { user, shopInfo } = useContext(AuthContext)
    const [greeting, setGreeting] = useState('');
    const currentDate = new Date();

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


    const [showModal, setShowModal] = useState(true);

    const { data: sellerPopupData = [], refetch, isLoading } = useQuery({
        queryKey: "sellerPopupData",
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/pop-up`);
            const data = await res.json();
            return data?.data;
        },
    });
    return (
        <div className="h-screen  pb-24 overflow-y-auto px-2 ">
            {isLoading || showModal && <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-90 z-50">
                <SellerPopUp showModal={showModal} setShowModal={setShowModal} data={sellerPopupData} />
            </div>}
            <div className=" bg-gradient-to-r from-[#1493f4] to-[#835177] absolute -z-10 -top-12 -right-14 blur-2xl opacity-10"></div>
            <h1 className="text-4xl font-semibold text-gray-800 capitalize">
                {greeting}, {user.name}
            </h1>

            <h2 className="text-gray-400 text-md">
                Here&#x27;s what&#x27;s happening with your ambassador account today.
            </h2>
            <div className="flex flex-col items-center w-full my-6 space-y-4 md:space-x-4 md:space-y-0 md:flex-row">
                <div className="w-full md:w-6/12">
                    <div className="relative ring-1 ring-gray-100 w-full overflow-hidden bg-white shadow-lg  ">
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
                                    $44,453.39
                                    <span className="text-xs text-gray-400">
                                        /$100K
                                    </span>
                                </div>
                            </div>
                            <div className="w-full hidden h-3 bg-gray-100">
                                <div className="w-2/5 h-full text-xs text-center  bg-green-400">
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="flex items-center w-full space-x-4 md:w-1/2">
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
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-8 mt-4">
                <div className="bg-white p-3 ring-1 ring-gray-200 rounded-md shadow-xl ">
                    <AnouncementContent />
                </div>
                <div className="bg-white p-3 ring-1 ring-gray-200 rounded-md shadow-xl ">
                    <NoticeContent />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button
                    className="flex items-center px-4 py-2 text-gray-400 border border-gray-300 rounded-r-full rounded-tl-sm rounded-bl-full md:text-md w-[203px]">
                    <svg width="20" height="20" fill="currentColor" className="mr-2 text-gray-400" viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M192 1664h288v-288h-288v288zm352 0h320v-288h-320v288zm-352-352h288v-320h-288v320zm352 0h320v-320h-320v320zm-352-384h288v-288h-288v288zm736 736h320v-288h-320v288zm-384-736h320v-288h-320v288zm768 736h288v-288h-288v288zm-384-352h320v-320h-320v320zm-352-864v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm736 864h288v-320h-288v320zm-384-384h320v-288h-320v288zm384 0h288v-288h-288v288zm32-480v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm384-64v1280q0 52-38 90t-90 38h-1408q-52 0-90-38t-38-90v-1280q0-52 38-90t90-38h128v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h384v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h128q52 0 90 38t38 90z">
                        </path>
                    </svg>
                    Last month
                    <svg width="20" height="20" className="ml-2 text-gray-400" fill="currentColor" viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z">
                        </path>
                    </svg>
                </button>
                <span className="text-sm text-gray-400">
                    Compared to {formattedDate}
                </span>
            </div>
            <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="w-full">
                    <div className="relative ring-1 ring-gray-100 w-full px-4 h-[120px] bg-white shadow-lg ">
                        <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max ">
                            Product Reffered
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
                    <div className="relative w-full ring-1 ring-gray-100 px-4 h-[120px] bg-white shadow-lg ">
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
                    <div className="relative w-full px-4 ring-1 ring-gray-100 h-[120px] bg-white shadow-lg ">
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
                    <div className="relative ring-1 ring-gray-100 w-full px-4 h-[120px] bg-white shadow-lg ">
                        <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max ">
                            Sign in
                        </p>
                        <div className="flex items-end my-6 space-x-2">
                            <p className="md:text-5xl text-3xl font-bold text-black ">
                                16
                            </p>
                            <span className="flex items-center text-xl font-bold text-red-500">
                                <svg width="20" fill="currentColor" height="20" className="h-3 transform rotate-180"
                                    viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                                    </path>
                                </svg>
                                14%
                            </span>
                        </div>

                    </div>
                </div>
                <div className="w-full">
                    <div className="relative w-full ring-1 ring-gray-100 px-4 h-[120px] bg-white shadow-lg ">
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
                    <div className="relative w-full ring-1 ring-gray-100 px-4 h-[120px] bg-white shadow-lg ">
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

        </div>
    );
};

export default SellerDashboard;