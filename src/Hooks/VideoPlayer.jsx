/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";

const VideoPlayer = ({ thum, url }) => {
      const [isPlaying, setIsPlaying] = useState(false);

      const handlePlay = () => {
            setIsPlaying(true);
      };

      useEffect(() => {
            const box = document.getElementById('videoBox');
      }, [])
      return (
            <div

                  id=""
                  className=" h-full bg-[black] player-box rounded-lg bar overflow-hidden video-box w-full"
                  style={{ position: "relative" }}>
                  {!isPlaying && (
                        <div
                              className="absolute top-0 left-0 right-0 bottom-0 w-[100%] flex items-center justify-center object-cover h-[100%] "
                              style={{
                                    backgroundImage: `url(${thum})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    cursor: "pointer",
                              }}
                              onClick={handlePlay}>
                              <span className="flex items-center justify-center ">

                                    <div className="blob flex items-center bg-[#fe6c2e] rounded-full w-[50px] h-[50px] justify-center text-white">
                                          <FaPlay className="ml-" />
                                    </div>

                              </span>
                        </div>
                  )}
                  <ReactPlayer
                        id="videoBox"
                        url={url ? url : "https://youtu.be/YxyDNrTlViw?si=p76jCqDNntBjhZWG"}
                        playing={isPlaying}
                        controls
                        light={!isPlaying}
                        width={`100%`}
                        h={`100%`}
                  />
            </div>
      );
};

export default VideoPlayer;
