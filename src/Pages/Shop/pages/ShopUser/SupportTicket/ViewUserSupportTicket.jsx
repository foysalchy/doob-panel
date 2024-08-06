import React, { useContext } from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

import Swal from "sweetalert2";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";

const ViewUserSupportTicket = ({
  viewComment,
  setViewComment,
  ticketDetails,
  refetch,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { shopUser } = useContext(ShopAuthProvider);

  // const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false);

  const uploadImage = async (formData) => {
    const url = `https://doob.dev/api/v1/image/upload-image`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const imageData = await response.json();
    return imageData.imageUrl;
  };

  const commentSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const time = new Date();
    const comment = event.target.comment.value;
    const id = ticketDetails._id;

    const image = event.target.image;

    const imageFormData = new FormData();
    imageFormData.append("image", image.files[0]);
    const imageUrl = await uploadImage(imageFormData);

    let content = {
      comment,
    };

    // imageUrl && content.imageUrl = imageUrl;
    if (imageUrl) {
      content.imageUrl = imageUrl;
    }

    const data = {
      time: `${time}`,
      content: content,
      name: shopUser?.name,
    };
    // / support - ticket /: id
    fetch(
      `https://doob.dev/api/v1/seller/user-support-comment/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .finally(() => {
        event.target.reset();
        setLoading(false);
        Swal.fire("Comment Uploaded", "", "success");
        refetch();
      });
  };

  function formatDateTime(timestamp) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(timestamp).toLocaleDateString(
      "en-US",
      options
    );
    const formattedTime = new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

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
    setIsFullscreen(!isFullscreen);
  };

  console.log(ticketDetails);

  return (
    <div>
      <div className={viewComment ? "flex" : "hidden"}>
        <div className=" mx-auto py-20">
          <div
            className={`fixed  z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5  ${viewComment ? "block" : "hidden"
              }`}
          >
            <div className="w-full max-w-[800px] h-[90%]  rounded-[20px]  bg-white  pb-10 px-8 text-center md:px-[30px] ">
              <div className="flex  justify-between  pt-4 items-start w-full sticky top-0 bg-white border-b">
                <div className="pb-2 text-xl font-bold text-dark text-center sm:text-2xl">
                  {ticketDetails.name}'s Message
                </div>
                <div
                  onClick={() => setViewComment(!setViewComment)}
                  className="cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500"
                >
                  <button>
                    {" "}
                    <RxCross2 className="text-xl" />
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto h-[90%]">
                <h3 className="pb-2 text-xl my-4 font-bold text-dark sm:text-xl text-start">
                  Subject: {ticketDetails.subject}
                </h3>

                {ticketDetails?.image && (
                  <div className="flex gap-4 my-4 items-stretch relative ">
                    <p className=" text-lg text-gray-600  sm">File</p>
                    <div
                      className={` cursor-pointer ${isHovered || isFullscreen ? "hovered" : ""
                        }`}
                      onClick={handleClick}
                      onMouseEnter={handleHover}
                      onMouseLeave={handleHoverLeave}
                    >
                      <img
                        className="w-20 h-auto"
                        src={ticketDetails?.image}
                        srcSet={ticketDetails?.image}
                        alt="Image"
                      />
                      {(isHovered || isFullscreen) && (
                        <div
                          className={`absolute top-40 left-0 h-full bg-black bg-blur-sm w-full flex items-center justify-center ${isFullscreen ? "z-50" : ""
                            }`}
                        >
                          <img
                            className={`w-full h-auto bg-black rounded ${isFullscreen ? "cursor-pointer" : ""
                              }`}
                            src={ticketDetails?.image}
                            srcSet={ticketDetails?.image}
                            alt="Image"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="border text-start bg-gray-200 rounded pt-1 px-4 pb-2 mb-4">
                  <p className="text-lg font-semibold"> Message:</p>
                  <div
                    className=" text_editor"
                    dangerouslySetInnerHTML={{
                      __html: ticketDetails.description,
                    }}
                  />
                </div>

                <div>
                  {ticketDetails.comments.map((comment) => (
                    <div className="grid grid-cols-4 gap-2 border rounded-lg  shadow-lg mb-8 p-4">
                      <div className="text-start col-span-3 grid grid-cols-1 gap-4  ">
                        <div className=" flex gap-4 items-start">
                          {/* <div className='p-2 px-[18px] text-white text-xl font-semibold rounded-full w-fit bg-gray-500'><p>{comment?.user.slice(0, 1)}</p></div> */}
                          <div>
                            <p className="h-10 w-10 rounded-full  bg-gray-500 flex items-center justify-center text-xl text-white">
                              {comment?.user.slice(0, 1)}
                            </p>
                          </div>
                          <div className="flex flex-col w-full">
                            <div className="flex flex-row justify-between">
                              <p className=" text-xl whitespace-nowrap truncate overflow-hidden">
                                {comment?.user}
                              </p>
                            </div>

                            <p className="text-gray-700 text-sm">
                              {formatDateTime(comment?.time)}
                            </p>
                          </div>
                        </div>
                        <p className="-mt-2 ml-14 text-gray-900">
                          {comment?.content?.comment}
                        </p>
                      </div>

                      <div className="">
                        <img
                          onClick={() =>
                            setOpenModal(comment?.content?.imageUrl)
                          }
                          src={comment?.content?.imageUrl}
                          alt=""
                          className=""
                        />

                        <div>
                          <div
                            onClick={() => setOpenModal(false)}
                            className={`fixed z-[100] flex items-center justify-center ${openModal === comment?.content?.imageUrl
                              ? "visible opacity-100"
                              : "invisible opacity-0"
                              } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                          >
                            <div
                              onClick={(e_) => e_.stopPropagation()}
                              className={`text- w-[500px] absolute max-w-md rounded-sm bg-white p-6 drop-shadow-lg dark:bg-black dark:text-white ${openModal === comment?.content?.imageUrl
                                ? "scale-1 opacity-1 duration-300"
                                : "scale-0 opacity-0 duration-150"
                                }`}
                            >
                              <img
                                src={openModal}
                                alt=""
                                className="relative w-full h-full  object-cover"
                              />
                              <div className="flex justify-between">
                                <button
                                  onClick={() => setOpenModal(false)}
                                  className="w-[30px] h-[30px] bg-white absolute top-[-14px] right-[-14px] border-2 border-red-500 text-black rounded-full"
                                >
                                  x
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {ticketDetails.comments.length !== 0 &&
                    ticketDetails?.status == "Open" && (
                      <form onSubmit={commentSubmit} className=" bg-white  ">
                        <div className=" mb-2 mt-2">
                          <textarea
                            name="comment"
                            placeholder="Comment"
                            className="w-full bg-gray-100 rounded border border-gray-400 h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                          ></textarea>
                          <input
                            type="file"
                            name="image"
                            className="w-full mt-2"
                          />
                        </div>
                        <div className="flex justify-end px-4">
                          <input
                            type="submit"
                            disabled={loading}
                            className="px-2.5 py-1.5 rounded-md text-white cursor-pointer text-sm bg-indigo-500"
                            value={loading ? "Uploading.." : "Comment"}
                          />
                        </div>
                      </form>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserSupportTicket;
