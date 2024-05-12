import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { TfiAnnouncement } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";

const AnouncementModal = ({ setOpen, modalData, index }) => {
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
      "w-screen bg-white h-screen fixed flex items-center justify-center bg-[black] let-0 right-0 top-0 bg-opacity-50 z-[1000]",
    card: "bg-white rounded-lg p-3 w-[800px]  relative",
    title: "text-xl font-semibold pb-3",
    img: "w-full h-[420px] object-contain",
    flexBox: "flex items-center gap-2 justify-between",
    close:
      "absolute bg-gray-100 w-[40px] h-[40px] flex justify-center items-center text-lg top-2 right-2 rounded-full",
  };
  console.log(modalData, "++>>>>>");
  return (
    <>
      {currentData &&
        <div className={style.overlay}>
          <div className={style.card}>
            <div className="">
              <h3 className={style.title}>Announcement.........</h3>
              <button onClick={() => setOpen(false)} className={style.close}>
                <RxCross2 />
              </button>
            </div>
            <div className="h-[400px] overflow-y-auto">
              <h3 className={style.title}>{currentData?.title}</h3>
              <div
                className="text_editor"
                dangerouslySetInnerHTML={{ __html: currentData?.message }}
              ></div>

              <img className={style.img} src={currentData?.image} alt="" />
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
        </div>}
    </>
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

  console.log(open, "carosellllllllllll");
  return (
    <div>
      {open._id === currentData?._id && (
        <AnouncementModal
          setOpen={setOpen}
          open={open}
          modalData={data}
          index={currentIndex}
        />
      )}
      <div>
        <div className={style.flexBox}>
          <div className="flex items-start gap-2">
            <TfiAnnouncement className="text-xl mt-1" />
            <div className="text_editor">
              <div className="flex items-center gap-2">
                <h2 className={style.title}>Announcements</h2>
              </div>
              {/* Use optional chaining to handle potential undefined values */}
              <h3
                onClick={() => {
                  setOpen(currentData);
                  console.log(currentData._id);
                }}
                className={style.subTitle}
              >
                {currentData?.title}
              </h3>
              <p
                className={style.message}
                dangerouslySetInnerHTML={{ __html: currentData?.message }}
              />
            </div>
          </div>
          <div className={style.hFlex}>
            <p className={style.numbers}>
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

const AnouncementContent = () => {
  const {
    data: data = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["announcementData"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://backend.doob.com.bd/api/v1/admin/announcement`
        );
        const data = await res.json();
        return data?.data;
      } catch (error) {
        console.error("Error fetching announcement data:", error);
        throw error;
      }
    },
  });

  return (
    <div>
      {/* <h2 className="text-xl font-semibold">hello world</h2>
            <p className="text-red-500">hello world...........</p> */}

      {data ? <Carousel data={data} /> : ""}
    </div>
  );
};

export default AnouncementContent;
