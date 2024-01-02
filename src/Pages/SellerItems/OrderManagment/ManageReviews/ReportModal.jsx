import React from 'react';

const ReportModal = ({ openModal, setOpenModal }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
            {
                openModal && <div className={` bg-[#000000a5] absolute top-0 left-0 h-screen w-screen flex items-center justify-center z-[2000]`}>
                    <form onSubmit={handleSubmit} className='bg-white px-4 py-6'>
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg">Report Reviews</h2>
                            <button className='px-2 py-1 rounded'>x</button>
                        </div>
                        <textarea className='' name="message" cols="30" rows="10" />
                        <div className="flex justify-between items-center">
                            <button className='px-4 py-2 rounded text-white bg-red-600'>Close</button>
                            <button type='submit' className='px-4 py-2 rounded text-white bg-red-600'>Submit</button>
                        </div>
                    </form>
                </div>
            }
        </>
    );
};

export default ReportModal;