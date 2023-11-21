import React from 'react';

const YoutubeModal = ({ isOpen, onClose, link }) => {
    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>

            <div className="relative md:w-[800px] flex justify-center items-center w-[400px]  md:h-[400px] bg-gray-900 p-5">


                <div >
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div className="aspect-w-16 aspect-h-9">
                        {/* Replace 'VIDEO_ID' with the actual YouTube video ID */}
                        <iframe
                            className="md:w-[700px] w-[300px]  md:h-[350px]"
                            src={link}
                            srcSet={link}
                            title="YouTube Video"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default YoutubeModal;