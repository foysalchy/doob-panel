import React from 'react';
import { RxCross2 } from 'react-icons/rx';

const CancelPopUp = ({ cancelPopUp, setCancelPopUp, orderInfo, reasons }) => {
    const commentSubmit = (e) => {
        e.preventDefault();
        console.log('hit');
    }
    return (
        <div>
            <div >
                <div className={cancelPopUp ? 'flex' : 'hidden'}>
                    <div className=" mx-auto py-20">

                        <div
                            className={`fixed  z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5  ${cancelPopUp ? "block" : "hidden"
                                }`}
                        >


                            <div className="w-full max-w-[800px] h-[90%]  rounded-[20px]  bg-white  pb-10 px-8 text-center md:px-[30px] overflow-scroll">
                                <div className='flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border-b'>
                                    <div className='pb-2 text-xl font-bold text-dark text-center sm:text-2xl'>Order id: {orderInfo._id}</div>
                                    <div onClick={() => setCancelPopUp(false)} className='cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500'>
                                        <button> <RxCross2 className='text-xl' /></button>
                                    </div>
                                </div>



                                <form onSubmit={commentSubmit} className=" bg-white text-start ">


                                    <div className='mt-2'>
                                        <label className=" text-black" htmlFor="title">
                                            Invoice Number
                                        </label>
                                        <input
                                            required
                                            readOnly
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id="title"
                                            name="invoice"
                                        />
                                    </div>


                                    <div className="flex justify-end px-4">
                                        <input type="submit" disabled={loading} className="px-2.5 py-1.5 rounded-md text-white cursor-pointer text-sm bg-indigo-500" value={loading ? "Uploading.." : "Comment"} />
                                    </div>
                                </form>


                            </div>

                        </div>




                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelPopUp;