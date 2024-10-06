import React, { useEffect, useState } from "react";
import { MdPlayCircleFilled } from "react-icons/md";
import Bg from "./Group 1000005940.png";
import YoutubeModal from "../YoutubeModal";
import BrightAlert from "bright-alert";
import { Link, NavLink,useLocation } from "react-router-dom";
import Photo3 from './slot3.png';

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
    <section className="background relative overflow-hidden py-40 px-4 md:px-8 bg-gray-100 ct">
      
       <div class="cube"></div>
       <div class="cube"></div>
       <div class="cube"></div>
       <div class="cube"></div>
       <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
    
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
                .ymodel{
                background:#000000a6
                }
                
.background {
  background-size: 400% 400%;
  animation: Gradient 5s ease infinite;
  position: relative;
  
}
  .animate-text {
	background-image:linear-gradient(-225deg, #000 0%, #320694 29%, #4f78e3 67%, #595092 100%);
	background-size: auto auto;
	background-clip: border-box;
	background-size: 200% auto;
	color: #fff; 
	text-fill-color: transparent;
	padding-top: 11px; 
	animation: textanim 5s linear infinite;
	display: inline-block;
}

@keyframes textanim {
	to {
		background-position: 200% center;
	}
}

.cube {
  position: absolute;
  top: 80vh;
  left: 45vw;
  width: 6px;
  height: 6px;
  border-radius:30%;
  border: 1px solid #8000ff30;
  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  animation: cube 12s ease-in forwards infinite;
  opacity:0.1
}
.cube:nth-child(2n) {
  border-color: #8DB5D1C7 ;
}
.cube:nth-child(2) {
  animation-delay: 2s;
  left: 25vw;
  top: 40vh;
}
  .cube:nth-child(7) {
  animation-delay: 3s;
  left: 25vw;
  top: 10vh;
}
    .cube:nth-child(7) {
  animation-delay: 3s;
  left: 40vw;
  top: 70vh;
}
.cube:nth-child(3) {
  animation-delay: 4s;
  left: 75vw;
  top: 50vh;
}
.cube:nth-child(4) {
  animation-delay: 5s;
  left: 90vw;
  top: 10vh;
}
.cube:nth-child(5) {
  animation-delay: 8s;
  left: 10vw;
  top: 85vh;
}
  .cube:nth-child(9) {
  animation-delay: 8s;
  left: 70vw;
  top: 55vh;
}
.cube:nth-child(6) {
  animation-delay: 10s;
  left: 50vw;
  top: 10vh;
}
/* Animate Background*/
@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
  .sign-up{
          z-index:1
  }
@keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
}
                `}
      </style>
      <div className="w-full h-full rounded-full bg-gradient-to-r from-[#58AEF1] to-pink-500 absolute -top-1 -right-14 blur-2xl opacity-10"></div>
     <div className="px-4   mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
      <div className="flex flex-col md:flex-row items-center justify-between">
       
            <div className="text-center md:text-left lg:text-left w-full md:w-1/2 md:pl-8">
           
          <h1 className="text-3xl md:text-5xl mt-2 font-bold">
          Start Your eCommerce Journey Now!
          </h1>
          <p className="text-base text-gray-700 md:text-xl mt-6">
          Explore a wide range of products with effortless shopping and business management—no inventory, no hassles!"
     
          </p>
          <div className="mt-6 flex gap-4">
            <NavLink
              to="/sign-up"
              className="animate-text mx-auto my-10 md:mx-0  sign-up lg:mx-0  inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none"
            >
              Create Your Store
            </NavLink>
            <NavLink
              to="/products"
              className=" mx-auto my-10 md:mx-0  sign-up lg:mx-0  inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none"
            >
              Product Browsing
            </NavLink>
             
          </div>
        </div>
        <div className="w-[70%] md:w-1/2 md:block lg:block hidden mb-8 md:mb-0 relative">
          <img
             srcSet={Photo3}
             src={Photo3}
            alt="Video thumbnail"
            className="w-[full] m-auto rounded-lg shadow-lg"
          />
          <button
            onClick={openModal}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl hover:text-gray-200 transition-colors duration-300"
            aria-label="Play video"
          >
            <MdPlayCircleFilled />
          </button>
        </div>
      </div>
    </div>
    <YoutubeModal
      link="https://www.youtube.com/embed/dgCM3SlbSkI?si="
      isOpen={isModalOpen}
      onClose={closeModal}
    />
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
