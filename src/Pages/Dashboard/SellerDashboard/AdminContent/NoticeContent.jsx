import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { PiNoteLight } from "react-icons/pi";

const Carousel = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    const style = {
        title: 'text-xl font-semibold',
        subTitle: 'text-red-600 text-lg',
        message: 'text-gray-600 text-sm',
        nextBtn: 'text-blue-500 text-sm',
        prevBtn: 'text-blue-500 text-sm',
        numbers: 'text-gray-400',
        hFlex: 'flex flex-col justify-between h-full justify-between',
        flexBox: 'flex items-center gap-2 justify-between'
    }
    return (
        <div>
            <div>
                {/* <img src={data[currentIndex].image} alt={data[currentIndex].title} /> */}
                <div className={style.flexBox}>
                    <div className="">
                        <div className="flex items-center gap-2">
                            <PiNoteLight className='text-xl' />
                            <h2 className={style.title}>Notice</h2>
                        </div>
                        <h3 className={style.subTitle}>{data[currentIndex].title}</h3>
                        <p className={style.message} dangerouslySetInnerHTML={{ __html: data[currentIndex].title }} />
                    </div>
                    <div className={style.hFlex}>
                        <p className={style.numbers} >  {[currentIndex + 1]} / {data.length}</p> <br />
                        <div className="flex items-center gap-2">
                            <button className={style.nextBtn} onClick={handlePrev}>Prev</button>
                            <button className={style.prevBtn} onClick={handleNext}>Next</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};


const NoticeContent = () => {

    const { data: noticeInfo = [], refetch } = useQuery({
        queryKey: "noticeInfo",
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/seller-notice`);
            const data = await res.json();
            return data?.data;
        },
    });
    console.log(noticeInfo);

    return (
        <div>
            {/* <h2 className="text-xl font-semibold">hello world</h2>
            <p className="text-red-500">hello world...........</p> */}

            <Carousel data={noticeInfo} />
        </div>
    );
};

export default NoticeContent;
