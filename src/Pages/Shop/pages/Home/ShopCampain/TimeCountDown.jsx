import React, { useEffect, useState } from "react";

const TimeCountDown = ({ start, end }) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(startTime, endTime));
    const timeCount = endTime > new Date().getTime();

    useEffect(() => {
        const timeInterval = setInterval(() => {
            const remainingTime = getTimeRemaining(startTime, endTime);
            setTimeRemaining(remainingTime);

            if (remainingTime.total <= 0) {
                clearInterval(timeInterval);
            }
        }, 1000);

        return () => clearInterval(timeInterval);
    }, [startTime, endTime]);

    function getTimeRemaining(starttime, endtime) {
        const t = endtime - new Date();
        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const days = Math.floor(t / (1000 * 60 * 60 * 24));

        return {
            total: t,
            days,
            hours: ('0' + hours).slice(-2),
            minutes: ('0' + minutes).slice(-2),
            seconds: ('0' + seconds).slice(-2),
        };
    }

    return (
        <div>
            {timeCount && (
                <div className="overflow-hidden flex justify-center items-center">
                    <div className="flex flex-wrap overflow-hidden font-sans" id="countdown">
                        {/* Days */}
                        <div className="my-1 px-1 w-1/2 overflow-hidden md:w-1/4 flex justify-center transform transition duration-500 hover:scale-110">
                            <div className="bg-gray-700 p-2 text-gray-100 w-24 text-center m-2 rounded-md shadow-md">
                                <p className="days text-xl">{timeRemaining.days}</p>
                                <p className="m-2">Days</p>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="my-1 px-1 w-1/2 overflow-hidden md:w-1/4 flex justify-center transform transition duration-500 hover:scale-110">
                            <div className="bg-gray-700 p-2 text-gray-100 w-24 text-center m-2 rounded-md shadow-md">
                                <p className="hours text-xl">{timeRemaining.hours}</p>
                                <p className="m-2">Hours</p>
                            </div>
                        </div>

                        {/* Minutes */}
                        <div className="my-1 px-1 w-1/2 overflow-hidden md:w-1/4 flex justify-center transform transition duration-500 hover:scale-110">
                            <div className="bg-gray-700 p-2 text-gray-100 w-24 text-center m-2 rounded-md shadow-md">
                                <p className="minutes text-xl">{timeRemaining.minutes}</p>
                                <p className="m-2">Minutes</p>
                            </div>
                        </div>

                        {/* Seconds */}
                        <div className="my-1 px-1 w-1/2 overflow-hidden md:w-1/4 flex justify-center transform transition duration-500 hover:scale-110">
                            <div className="bg-gray-700 p-2 text-gray-100 w-24 text-center m-2 rounded-md shadow-md">
                                <p className="seconds text-xl">{timeRemaining.seconds}</p>
                                <p className="m-2">Seconds</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimeCountDown;
