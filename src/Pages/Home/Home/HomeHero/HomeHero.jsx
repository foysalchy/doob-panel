import React, { useEffect, useState } from "react";
import { MdPlayCircleFilled } from "react-icons/md";
import Bg from "./Group 1000005940.png";
import YoutubeModal from "../YoutubeModal";
import BrightAlert from "bright-alert";
import { Link, NavLink, useLocation } from "react-router-dom";
import Photo3 from './banner.png';

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
            <section style={{height:'100vh'}} className="background relative bar overflow-hidden py-20 md:py-40  px-4 md:px-8 bg-gray-100 ct">

                  <div className="cube"></div>
                  <div className="cube"></div>
                  <div className="cube"></div>
                  <div className="cube"></div>
                  <div className="cube"></div>
                  <div className="cube"></div>
                  <div className="cube"></div>
                  <div className="cube"></div>
                  <div className="cube"></div>

                  <style>
                        {`

 
.video-play-button {
  position: absolute;
  z-index: 10;
  top: 25%;
  left: 40%;
  transform: translateX(-50%) translateY(-50%);
  box-sizing: content-box;
  display: block;
  width: 32px;
  height: 44px;
  /* background: black; */
  border-radius: 50%;
  padding: 18px 20px 18px 28px;
}

.video-play-button:before {
  content: "";
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: block;
  width: 60px;
  height: 60px;
  background: black;
  border-radius: 50%;
  animation: pulse-border 1500ms ease-out infinite;
}

.video-play-button:after {
  content: "";
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: block;
  width: 60px;
  height: 60px;
  background: black;
  border-radius: 50%;
  transition: all 200ms;
}
  .video-play-button:before {
  content: "";
  color: red;
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: block;
  width: 60px;
  height: 60px;
  background: black;
  border-radius: 50%;
  animation: pulse-border 1500ms ease-out infinite;
}
.video-play-button span {
  display: block;
  position: relative;
  z-index: 3;
  width: 0;
  height: 0;
  border-left: 15px solid #fff;
	border-top: 12px solid transparent;
	border-bottom: 12px solid transparent;
  margin-left:5px
}
  @media(max-width:576px){
  .video-play-button:after {
      width: 40px;
      height: 40px;
        transform: translateX(-40%) translateY(-40%);
        left: 30%;
      top: 27%;
    }
      .video-play-button::before{
       width: 40px;
      height: 40px;
       left: 35%;
    top: 32%;
      }
    .video-play-button{
    }
    .video-play-button span{
    margin-left: -5px;
  top: -13px;
    }
  }

.video-play-button:hover:after {
  background-color: #f1ad34;
}

.video-play-button img {
  position: relative;
  z-index: 3;
  max-width: 100%;
  width: auto;
  height: auto;
}



@keyframes pulse-border {
  0% {
    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);
    opacity: 0;
  }
}



/* ENTRANCE ANIMATION OF THE PLAY BUTTON */

.video-play-button {
	-webkit-animation: scale-up-center 1s cubic-bezier(0.680, -0.550, 0.265, 1.550) both;
	        animation: scale-up-center 1s cubic-bezier(0.680, -0.550, 0.265, 1.550) both;
}

.video-play-button {
  0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}

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
	background-image:linear-gradient(-225deg,rgba(95, 159, 255, 0.37) 0%, #320694 29%, #4f78e3 67%, #595092 100%);
	background-size: auto auto;
	background-clip: border-box;
	background-size: 200% auto;
	color: #fff;
	text-fill-color: transparent;
	animation: textanim 5s linear infinite;
}

@keyframes textanim {
	0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 50% 100%;
  }
     75% {
    background-position: 100% 70%;
  }
  100% {
    background-position: 70% 0%;
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
  .herotitle{
  background:-webkit-linear-gradient(#0866ff, #103c85);
    background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  }
                `}
                  </style>
                  <div className=" w-full h-full rounded-full bg-gradient-to-r from-[#58AEF1] to-pink-500 absolute -top-1 -right-14 blur-2xl opacity-10"></div>
                  <div className="px-4 md:pt-[10vh] pt-[70px]  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
                        <div className="flex flex-col md:flex-row items-center justify-between">

                              <div className="text-center md:text-left lg:text-left w-full md:w-1/2 md:pl-8">

                                    <h1 className="text-3xl md:text-5xl mt-2 font-bold herotitle">
                                          Start Your eCommerce Journey Now!
                                    </h1>
                                    <p className="text-base text-gray-700 md:text-xl mt-6">
                                          Explore a wide range of products with effortless shopping and business management—no inventory, no hassles!"

                                    </p>
                                     <div className="md:w-[70%] w-[100%] block md:w-1/2 md:hidden lg:hidden mb-8 md:mb-0 relative">
                                          <img
                                                srcSet={Photo3}
                                                src={Photo3}
                                                alt="Video thumbnail"
                                                className="w-[full] m-auto rounded-lg "
                                          />
                                          <button
                                                  onClick={openModal}
                                                  id="play-video"
                                                  className="video-play-button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black-900 text-6xl "
                                                  aria-label="Play video"
                                            >
                                                  <span></span>
                                            </button>
                                    </div>
                                    <div className="md:mt-6 mt-0 flex md:gap-4 gap-2">
                                          
                                          <NavLink
                                                  to="/sign-up"
                                                className="text-sm md:text-lg animate-text md:mx-auto w-[100%] md:w-[90%]  md:my-10 my-2 md:mx-0  sign-up lg:mx-0  inline-flex items-center justify-center h-12 md:px-6 px-1 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none"
                                          >
                                               Create Store
                                          </NavLink>
                                          <NavLink
                                                to="/products"
                                                className="text-sm md:text-lg w-[100%]  md:w-[90%] md:mr-20 md:mx-auto  md:my-10 my-2 md:mx-0  sign-up lg:mx-0  inline-flex items-center justify-center h-12 md:px-6 px-1 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-black focus:shadow-outline focus:outline-none"
                                          >
                                                Product Browsing
                                          </NavLink>

                                    </div>
                              </div>
                              <div className="md:w-[50%] w-[100%] md:ml-10 md:w-1/2 md:block hidden lg:block mb-8 md:mb-0 relative">
                                    <img
                                          srcSet={Photo3}
                                          src={Photo3}
                                          alt="Video thumbnail"
                                          className="w-[full] m-auto rounded-lg  "
                                    />
                                    <button
                                          onClick={openModal}
                                          id="play-video"
                                          className="video-play-button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black-900 text-6xl "
                                          aria-label="Play video"
                                    >
                                          <span></span>
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
