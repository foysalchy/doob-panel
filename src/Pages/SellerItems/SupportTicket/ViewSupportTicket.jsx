import React, { useContext } from 'react';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import Swal from 'sweetalert2';

const ViewSupportTicket = ({ viewComment, setViewComment, ticketDetails, refetch }) => {



    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const commentSubmit = (event) => {
        setLoading(true)
        event.preventDefault();
        const time = new Date()
        const comment = event.target.comment.value
        const id = ticketDetails.ticketId
        const data = {
            "id": id,
            "time": `${time}`,
            "content": comment,
            'user': user?.name
        }
        // / support - ticket /: id
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/support/seller-comment/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then((res) => res.json())
            .finally(() => {
                event.target.reset()
                setLoading(false)
                Swal.fire("Comment Uploaded", "", "success");
                refetch()
            }
            );



    }

    function formatDateTime(timestamp) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = new Date(timestamp).toLocaleDateString('en-US', options);
        const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        return `${formattedDate}, at - ${formattedTime}`;
    }

    const [isHovered, setIsHovered] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleHoverLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        setIsFullscreen(!isFullscreen)
    }



    return (
        <div >
            <div className={viewComment ? 'flex' : 'hidden'}>
                <div className=" mx-auto py-20">

                    <div
                        className={`fixed  z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5  ${viewComment ? "block" : "hidden"
                            }`}
                    >


                        <div className="w-full max-w-[800px] h-[90%]  rounded-[20px]  bg-white  pb-10 px-8 text-center md:px-[30px] overflow-scroll">
                            <div className='flex justify-between  pt-4 items-start w-full sticky top-0 bg-white border-b'>
                                <div className='pb-2 text-xl font-bold text-dark text-center sm:text-2xl'>{ticketDetails.userInfo.name}'s Message</div>
                                <div onClick={() => setViewComment(!setViewComment)} className='cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500'>
                                    <button> <RxCross2 className='text-xl' /></button>
                                </div>
                            </div>
                            <div>
                                <h3 className="pb-2 text-xl my-4 font-bold text-dark sm:text-xl text-start">
                                    Subject:   {ticketDetails.subject}
                                </h3>


                                {ticketDetails?.file &&
                                    <div className='flex gap-4 my-4 items-stretch relative '>
                                        <p className=" text-lg text-gray-600  sm">
                                            File
                                        </p>
                                        <div className={` cursor-pointer ${isHovered || isFullscreen ? 'hovered' : ''}`}
                                            onClick={handleClick}
                                            onMouseEnter={handleHover}
                                            onMouseLeave={handleHoverLeave}>

                                            <img className="w-20 h-auto" src={ticketDetails?.file} srcSet={ticketDetails?.file} alt="Image" />
                                            {(isHovered || isFullscreen) && (
                                                <div className={`absolute top-40 left-0 h-full bg-black bg-blur-sm w-full flex items-center justify-center ${isFullscreen ? 'z-50' : ''}`}>
                                                    <img className={`w-full h-auto bg-black rounded ${isFullscreen ? 'cursor-pointer' : ''}`} src={ticketDetails?.file} srcSet={ticketDetails?.file} alt="Image" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                }

                                <div className='border text-start bg-gray-200 rounded pt-1 px-4 pb-2 mb-4'>
                                    <p className='text-lg font-semibold'>  Message:</p>
                                    <div
                                        className=" "
                                        dangerouslySetInnerHTML={{
                                            __html: ticketDetails.description,
                                        }}
                                    />
                                </div>

                                <div  >

                                    {ticketDetails.comments.map((comment) => (
                                        <div className="text-start grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg  shadow-lg">
                                            <div className=" flex gap-4">
                                                <div className='p-2 px-[18px] text-white text-xl font-semibold rounded-full w-fit bg-gray-500'><p>{comment?.user.slice(0, 1)}</p></div>
                                                <div className="flex flex-col w-full">
                                                    <div className="flex flex-row justify-between">
                                                        <p className=" text-xl whitespace-nowrap truncate overflow-hidden">
                                                            {comment?.user}
                                                        </p>
                                                        <a className="text-gray-500 text-xl" href="#">
                                                            <i className="fa-solid fa-trash" />
                                                        </a>
                                                    </div>
                                                    <p className="text-gray-700 text-sm">{formatDateTime(comment?.time)}</p>
                                                </div>
                                            </div>
                                            <p className="-mt-2 ml-14 text-gray-900">
                                                {comment?.content}
                                            </p>
                                        </div>

                                    ))}
                                    {(ticketDetails.comments.length !== 0 && ticketDetails.status == "Open") &&
                                        <form onSubmit={commentSubmit} className=" bg-white  ">
                                            <div className=" mb-2 mt-2">
                                                <textarea

                                                    name='comment'
                                                    placeholder="Comment"
                                                    className="w-full bg-gray-100 rounded border border-gray-400 h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                                ></textarea>
                                            </div>
                                            <div className="flex justify-end px-4">
                                                <input type="submit" disabled={loading} className="px-2.5 py-1.5 rounded-md text-white cursor-pointer text-sm bg-indigo-500" value={loading ? "Uploading.." : "Comment"} />
                                            </div>
                                        </form>}
                                </div>
                            </div>

                        </div>

                    </div>




                </div>
            </div>
        </div>


    );
};

export default ViewSupportTicket;