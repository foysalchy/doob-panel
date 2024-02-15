import { useState } from "react";
import { RxCross2 } from 'react-icons/rx';


const SellerPopUp = ({ onClose, showModal, setShowModal, handleClose, data }) => {
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
                        <div onClick={handleClose} className='cursor-pointer bg-gray-300 rounded-full p-2 text-2xl hover:bg-gray-400'>
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


export default SellerPopUp