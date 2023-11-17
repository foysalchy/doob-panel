import React from 'react';

const DeleteModal = ({ OpenModal, setOpenModal, setIsDelete }) => {

    const SubmitData = (value) => {
        setOpenModal(!OpenModal)
        return setIsDelete(value)

    }


    return (
        <>
            <div className="container mx-auto py-20">

                <div
                    className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90  px-4 py-5 ${OpenModal ? "block" : "hidden"
                        }`}
                >
                    <div

                        className="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px]"
                    >
                        <h3 className="pb-2 text-xl font-bold text-dark sm:text-2xl">
                            Are You Sure for delete
                        </h3>

                        <span
                            className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
                        ></span>
                        <p className="mb-10 text-base leading-relaxed text-body-color">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since
                        </p>
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-1/2 px-3">
                                <button
                                    onClick={() => SubmitData(false)}
                                    className="block w-full rounded-lg border border-[#E9EDF9] p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className="w-1/2 px-3">
                                <button
                                    onClick={() => SubmitData(true)}
                                    className={`block w-full p-3 text-base font-medium text-center text-white transition border rounded-lg border-primary bg-red-900 hover:bg-red-900`}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default DeleteModal;