import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { IoWarning } from "react-icons/io5";
import { PiNoteLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const NoticeModal = ({ setOpen, open, modalData, index }) => {
      const [currentIndex, setCurrentIndex] = useState(index);
      const mHandleNext = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % modalData.length);
      };

      const mHandlePrev = () => {
            setCurrentIndex(
                  (prevIndex) => (prevIndex - 1 + modalData.length) % modalData.length
            );
      };

      const currentData = modalData[currentIndex];
      const style = {
            overlay:
                  "w-screen h-screen fixed flex items-center justify-center bg-[black] let-0 right-0 top-0 bg-opacity-50 z-[1000]",
            card: "bg-white rounded-lg p-3 w-[800px]  relative",
            title: "text-xl font-semibold pb-3",
            img: "w-full h-[420px] object-contain",
            flexBox: "flex items-center gap-2 justify-between",
            close:
                  "absolute bg-gray-100 w-[40px] h-[40px] flex justify-center items-center text-lg top-2 right-2 rounded-full",
      };
      return (
            <div className={style.overlay}>
                  <div className={style.card}>
                        <div>
                              <h3 className={style.title}>Notice</h3>
                              <button onClick={() => setOpen(false)} className={style.close}>
                                    <RxCross2 />
                              </button>
                        </div>
                        <div className="h-[400px] text_editor bar overflow-y-auto">
                              <h3 className={style.title}>{currentData?.title}</h3>
                              <div dangerouslySetInnerHTML={{ __html: currentData?.message }}></div>

                              <Link to={currentData?.link}>
                                    {" "}
                                    <img className={style.img} src={currentData?.image} alt="" />
                              </Link>
                              <div className="flex items-center gap-2">
                                    <button className={style.nextBtn} onClick={mHandlePrev}>
                                          Prev
                                    </button>
                                    <button className={style.prevBtn} onClick={mHandleNext}>
                                          Next
                                    </button>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

const Carousel = ({ data }) => {
      const [currentIndex, setCurrentIndex] = useState(0);
      const [open, setOpen] = useState(false);
      const handleNext = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      };

      const handlePrev = () => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
      };

      const currentData = data[currentIndex];

      const style = {
            title: "text-xl font-semibold",
            subTitle: "text-red-600 text-lg cursor-pointer",
            message: "text-gray-600 text-sm",
            nextBtn: "text-blue-500 text-sm",
            prevBtn: "text-blue-500 text-sm",
            numbers: "text-gray-400",
            hFlex: "flex flex-col justify-between h-full justify-between",
            flexBox: "flex items-center gap-2 justify-between",
      };
      return (
            <div>
                  <div>
                        {/* <img src={data[currentIndex].image} alt={data[currentIndex].title} /> */}
                        {open._id === currentData?._id && (
                              <NoticeModal
                                    setOpen={setOpen}
                                    open={open}
                                    modalData={data}
                                    index={currentIndex}
                              />
                        )}
                        <div className={style?.flexBox}>
                              <div className="flex gap-2">

                                    <div className="text_editor">
                                          <div className="flex items-center gap-2">
                                                <IoWarning className="text-xl mt-1" />  <h2 className={`${currentData?.title}, text-xl font-semibold`}>
                                                      Notice
                                                </h2>
                                          </div>
                                          <h3
                                                onClick={() => {
                                                      setOpen(currentData);
                                                }}
                                                className={style?.subTitle}
                                          >
                                                {currentData?.title}
                                          </h3>
                                          <p
                                                className={style.message}
                                                dangerouslySetInnerHTML={{ __html: data[currentIndex]?.title }}
                                          />
                                    </div>
                              </div>
                              <div className={style.hFlex}>
                                    <p className={style?.numbers}>
                                          {" "}
                                          {[currentIndex + 1]} / {data.length}
                                    </p>{" "}
                                    <br />
                                    <div className="flex items-center gap-2">
                                          <button className={style.nextBtn} onClick={handlePrev}>
                                                Prev
                                          </button>
                                          <button className={style.prevBtn} onClick={handleNext}>
                                                Next
                                          </button>
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
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/seller-notice`
                  );
                  const data = await res.json();
                  return data?.data;
            },
      });

      return (
            <div>
                  {/* <h2 className="text-xl font-semibold">hello world</h2>
            <p className="text-red-500">hello world.</p> */}

                  {noticeInfo.length ? <Carousel data={noticeInfo} /> : ""}
            </div>
      );
};

export default NoticeContent;
