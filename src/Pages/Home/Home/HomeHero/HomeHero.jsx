import React, { useEffect, useState } from "react";
import { MdPlayCircleFilled } from "react-icons/md";
import Bg from "./Group 1000005940.png";
import YoutubeModal from "../YoutubeModal";
import BrightAlert from "bright-alert";

const HomeHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hero, setHero] = useState([]);

  useEffect(() => {
    fetch("https://doob.dev/api/v1/admin/get-content?name=hero_section")
      .then((response) => response.json())
      .then((data) => {
        setHero(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(hero, "home control");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className="relative overflow-hidden md:py-32 py-20 px-4 bg-gray-100 md:px-8 ct" >
      <style>
        {`
                .ct {
                   margin-top:-80px
                }
                  .fixed{
                  background: transparent;
border: none;}
.scrolled{
background:white}
                
                `}
      </style>
      <div className="w-full h-full rounded-full bg-gradient-to-r from-[#58AEF1] to-pink-500 absolute -top-1 -right-14 blur-2xl opacity-10"></div>
      <div className="max-w-xl mx-auto text-center relative">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl ">
          <div className="flex flex-col mb-16 sm:text-center py-14">
            <div className="max-w-xl mb-6 md:mx-auto sm:text-center lg:max-w-2xl md:mb-10">
              {/* <div
                className="mb-2  text_editor"
                dangerouslySetInnerHTML={{
                  __html: hero?.data,
                }}
              /> */}
              <h1 className="font-inner md:text-xl text-lg font-semibold">
                Start Business Right Now!!
              </h1>

              <h1 className="text-4xl mt-2 "> 
                <span className="font-bold"> Welcome to Your One-Stop eCommerce Solution</span>
                
              </h1>
              <p className="text-base text-gray-700 md:text-lg mt-4">
              Discover a wide range of products, effortless shopping, and seamless business management. Start your eCommerce journey with us today—no inventory, no hassles!

              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => BrightAlert()}
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none"
              >
                Get started
              </button>
              <button
                onClick={openModal}
                className="inline-flex gap-1 items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none"
              >
                <MdPlayCircleFilled className="text-xl"></MdPlayCircleFilled>{" "}
                Watch Now
              </button>
            </div>
            <YoutubeModal
              link={
                'https://www.youtube.com/embed/dgCM3SlbSkI?si=Ogc3VXxS0EvYE4Yp" '
              }
              isOpen={isModalOpen}
              onClose={closeModal}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;

// <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
//     <div
//         className="mb-2  text_editor"
//         dangerouslySetInnerHTML={{
//             __html: hero?.data,
//         }}
//     />
// </div>
