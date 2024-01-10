import React, { useEffect, useState } from 'react';
import clickAudio from '../../../../src/assets/sound_beep-29.mp3'

const ProductList = ({ itm, passCount, setPassCount }) => {
    const [count, setCount] = useState(1);

    const [audio] = useState(new Audio(clickAudio));

    useEffect(() => {
        // Cleanup the audio when component unmounts
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [audio]);


    const increaseCount = () => {
        audio.play();
        setCount(count + 1);
        setPassCount(count)
    };

    const decreaseCount = () => {
        audio.play();
        if (count > 0) {
            setCount(count - 1);
            setPassCount(count)
        }
    };
    return (
        <li >
            <div className="flex justify-between items-center my-2 bg-white p-2 rounded-md">
                <div className="flex items-center gap-2">
                    <img src={itm?.MetaImage} alt="" className="w-[60px] h-[60px] ring-1 ring-gray-300 rounded-md object-cover" />
                    <div className="">
                        <h3 className="text-sm">{itm?.name.slice(0, 16)}...</h3>
                        <h3 className="text-lg">{itm?.price}</h3>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex border bg-gray-300 items-center">
                        <button
                            onClick={decreaseCount}
                            className="px-3 py-1   bg-gray-300 text-gray-700 rounded-l"
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={count}
                            readOnly
                            className="w-12 text-center bg-white border border-gray-300 text-sm  px-2 py-1"
                        />
                        <button
                            onClick={increaseCount}
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r"
                        >
                            +
                        </button>
                    </div>

                </div>
            </div>
        </li>
    );
};

export default ProductList;