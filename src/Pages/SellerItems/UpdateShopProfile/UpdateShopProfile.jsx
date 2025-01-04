import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { BiCopy, BiEdit } from "react-icons/bi";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import ShopInformation from "./ShopInformatin";
import EditShopInfo from "./EditShopInfo";
import { useQuery } from "@tanstack/react-query";
import {
      FaFacebook,
      FaFacebookMessenger,
      FaInstagram,
      FaLine,
      FaLinkedin,
      FaPinterest,
      FaReddit,
      FaSkype,
      FaSnapchat,
      FaSquareXTwitter,
      FaTelegram,
      FaTumblr,
      FaViber,
      FaWhatsapp,
      FaYoutube,
} from "react-icons/fa6";

const UpdateShopProfile = () => {
      const { shopInfo, setShopInfo } = useContext(AuthContext);
      const [openSettings, setOpenSettings] = useState(false);
      const [copy, setCopy] = useState(false);

      const handleCopyLink = (link) => {

            const linkToCopy = shopInfo?.domain
                  ? `https://${shopInfo.domain}`
                  : `https://${shopInfo.subDomain}`
            navigator.clipboard
                  .writeText(linkToCopy)
                  .then(() => {
                        setCopy(true);
                        setTimeout(() => {
                              setCopy(false);
                        }, 1000);
                  })
                  .catch((err) => {
                        console.error("Unable to copy link", err);
                  });
      };

      const [coverLoad, setCoverLoad] = useState(false);




      const CoverPhotoUpload = (e) => {
            e.preventDefault();
            const selectedFile = e.target.files[0];
            const formData = new FormData();
            formData.append("image", selectedFile);
            const url = `https://doob.dev/api/v1/image/upload-image`;
            fetch(url, {
                  method: "POST",
                  body: formData,
            })
                  .then((res) => res.json())
                  .then((imageData) => {
                        if (imageData.imageUrl) {
                              const image = imageData.imageUrl;

                              fetch(
                                    `https://doob.dev/api/v1/shop/update-cover/${shopInfo._id}`,
                                    {
                                          method: "PUt",

                                          headers: {
                                                "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({ image }),
                                    }
                              )
                                    .then((res) => res.json())
                                    .then((data) => {
                                          setShopInfo(data);
                                          const jsonData = JSON.stringify(data);

                                          document.cookie = `SellerShop=${encodeURIComponent(
                                                jsonData
                                          )}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/seller`;
                                    });
                        } else {
                              setCoverLoad(false);
                        }
                  });
      };
      const ProfilePhotoUpload = (e) => {
            e.preventDefault();
            const selectedFile = e.target.files[0];
            const formData = new FormData();
            formData.append("image", selectedFile);
            const url = `https://doob.dev/api/v1/image/upload-image`;
            fetch(url, {
                  method: "POST",
                  body: formData,
            })
                  .then((res) => res.json())
                  .then((imageData) => {
                        if (imageData.imageUrl) {
                              const image = imageData.imageUrl;

                              fetch(
                                    `https://doob.dev/api/v1/shop/update-logo/${shopInfo._id}`,
                                    {
                                          method: "PUt",
                                          headers: {
                                                "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({ image }),
                                    }
                              )
                                    .then((res) => res.json())
                                    .then((data) => {
                                          setShopInfo(data);
                                          const jsonData = JSON.stringify(data);

                                          document.cookie = `SellerShop=${encodeURIComponent(
                                                jsonData
                                          )}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/seller`;
                                    });
                        } else {
                              setCoverLoad(false);
                        }
                  });
      };
      const favIconPhotoUpload = (e) => {
            e.preventDefault();
            const selectedFile = e.target.files[0];
            const formData = new FormData();
            formData.append("image", selectedFile);
            const url = `https://doob.dev/api/v1/image/upload-image`;
            fetch(url, {
                  method: "POST",
                  body: formData,
            })
                  .then((res) => res.json())
                  .then((imageData) => {
                        if (imageData.imageUrl) {
                              const image = imageData.imageUrl;

                              fetch(
                                    `https://doob.dev/api/v1/shop/update-favicon/${shopInfo._id}`,
                                    {
                                          method: "PUt",
                                          headers: {
                                                "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({ image }),
                                    }
                              )
                                    .then((res) => res.json())
                                    .then((data) => {
                                          setShopInfo(data);
                                          const jsonData = JSON.stringify(data);

                                          document.cookie = `SellerShop=${encodeURIComponent(
                                                jsonData
                                          )}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/seller`;
                                    });
                        } else {
                              setCoverLoad(false);
                        }
                  });
      };

      const [Edit, setEdit] = useState(false);
const { data: contacts = [], refetch } = useQuery({
            queryKey: ["contact"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/contact/${shopInfo?.shopId}`
                  );
                  const data = await res.json();
                  return data;
            },
      });
      useEffect(() => {
            // Get the current URL's query parameters
            const params = new URLSearchParams(window.location.search);

            // Check if the 'open' parameter is equal to '1'
            const isOpen = params.get('open') === '1';

            // Set the Edit state based on the query parameter
            setEdit(isOpen);
      }, []); // Ru
      return (
            <div>
                  <div className="  bg-white rounded-lg shadow-xl pb-8 relative bar overflow-hidden">
                        <div className="relative w-full group">
                              <img
                                    srcSet={
                                          shopInfo.cover
                                                ? shopInfo?.cover
                                                : "https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                                    }
                                    src={
                                          shopInfo.cover
                                                ? shopInfo?.cover
                                                : "https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                                    }
                                    className="w-full md:h-[250px] h-[110px] object-cover rounded-tl-lg rounded-tr-lg border group-hover:blur"
                                    alt="Cover Photo"
                              />
                              <label className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 text-white group-hover:opacity-100  bg-black bg-opacity-50">
                                    <input
                                          type="file"
                                          onChange={CoverPhotoUpload}
                                          accept=".jpg, .png"
                                          className="hidden"
                                    />
                                    {/* Add your upload icon/svg here */}
                                    Upload Cover Photo
                              </label>
                        </div>

                        <div className="flex flex-col items-center -mt-20">
                              <div className="relative">
                                    <div className="sticky top-0">
                                          <label className="cursor-pointer text-white">
                                                <input
                                                      type="file"
                                                      accept=".jpg, .png,"
                                                      onChange={ProfilePhotoUpload}
                                                      className="hidden"
                                                />
                                                <img
                                                      srcSet={shopInfo.logo}
                                                      src={shopInfo.logo}
                                                      className="w-40 border-4 bg-white border-black rounded-full"
                                                />
                                          </label>
                                    </div>

                                    {/* Rest of your content */}
                              </div>

                              <div className="flex items-center space-x-2 mt-12">
                              <div className="sticky top-0">
                                          <label className="cursor-pointer text-black">
                                                <input
                                                      type="file"
                                                      accept=".jpg, .png,"
                                                      onChange={favIconPhotoUpload}
                                                      className="hidden"
                                                />
                                                <img
                                                alt="Favicon"
                                                      srcSet={shopInfo.favicon}
                                                      src={shopInfo.favicon}
                                                      className="w-10 h-10 p-1 border-2 bg-white border-black rounded-full"
                                                />
                                          </label>
                                    </div>
                                    <p className="text-2xl">{shopInfo.shopName}</p>
                                    <p>{shopInfo.sellerId}</p>
                                    <span className="bg-blue-500 rounded-full p-1" title="Verified">
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-gray-100 h-2.5 w-2.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={4}
                                                      d="M5 13l4 4L19 7"
                                                />
                                          </svg>
                                    </span>
                                    
                              </div>

                              <p className="text-sm text-gray-500">{shopInfo.address}</p>
                              {/* <li className="flex items-center border-b py-2 space-x-2">
                              {contacts.length &&
                                    contacts?.map((cont) => (
                                          <div key={cont._id}>
                                                {(cont.media === "Facebook" && (
                                                      <a href={`${cont.URL}`} target="_blank">
                                                            <FaFacebook className="cursor-pointer rounded-full text-blue-700 hover:text-blue-900  text-4xl bg-white p-1 " />
                                                      </a>
                                                )) ||
                                                      (cont.media === "Messenger" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaFacebookMessenger className="cursor-pointer rounded-full text-[#663399] hover:text-purple-700  bg-white p-1  text-4xl" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Instagram" && (
                                                            <a
                                                                  href={`${cont.URL}`}
                                                                  target="_blank"
                                                            >
                                                                  <FaInstagram className="cursor-pointer rounded-full text-red-700 hover:text-red-900  text-4xl bg-white p-1 " />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Twitter" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaSquareXTwitter className="cursor-pointer rounded-full text-gray-700 hover:text-gray-900  text-4xl bg-white p-1 " />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Whatsapp" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaWhatsapp className="cursor-pointer rounded-full text-green-500 hover:text-green-700  text-4xl bg-white p-1 " />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Viber" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaViber className="cursor-pointer rounded-full text-purple-500 hover:text-purple-700  text-4xl bg-white p-1 " />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Telegram" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaTelegram className="cursor-pointer rounded-full text-blue-500 hover:text-blue-700  text-4xl bg-white p-1 " />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Skype" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaSkype className="cursor-pointer rounded-full text-blue-500 hover:text-blue-700  text-4xl bg-white p-1 " />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "YouTube" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaYoutube className="cursor-pointer rounded-full text-red-500 hover:text-red-700  text-4xl bg-white p-1 " />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "LINE" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaLine className="cursor-pointer rounded-full text-green-500 hover:text-green-700  text-4xl bg-white p-1 " />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Reddit" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaReddit className="bg-white p-1  text-red-500 border hover:text-red-700  text-4xl" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Snapchat" && (
                                                            <a
                                                                  href={`${cont.URL}`}
                                                                  target="_blank"
                                                            >
                                                                  <FaSnapchat className="bg-yellow-500 p-1  text-black border hover:bg-yellow-700  text-4xl" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Pinterest" && (
                                                            <a
                                                                  href={`${cont.URL}`}
                                                                  target="_blank"
                                                            >
                                                                  <FaPinterest className="cursor-pointer rounded-full text-red-500 hover:text-red-700  text-4xl bg-white p-1 " />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Tumblr" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaTumblr className="cursor-pointer rounded-full text-violet-500 hover:text-violet-700  text-4xl bg-white p-1 " />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Linkedin" && (
                                                            <a
                                                                  href={`${cont.URL}`}
                                                                  target="_blank"
                                                            >
                                                                  <FaLinkedin className="cursor-pointer rounded-full text-blue-500 hover:text-blue-700  text-4xl bg-white p-1 " />
                                                            </a>
                                                      ))}
                                          </div>
                                    ))}
                        </li> */}
                        </div>

                        {/* <div className=" lg:items-end justify-end px-8 mt-2">
                              <div className="flex md:flex-row justify-center flex-col md:gap-0 gap-3 items-center md:space-x-4 mt-2">
                                    <button
                                          className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 md:w-auto w-full px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                                          onClick={() => handleCopyLink(shopInfo.shopId)}
                                    >
                                          <BiCopy />
                                          {copy ? (
                                                <p className="text-green-500 flex items-center">Link copied!</p>
                                          ) : (
                                                <span>Share Your Site</span>
                                          )}
                                    </button>
                                   
                              </div>
                        </div> */}
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                  {/* <div className="col-span-5">
    <ShopInformation />
  </div> */}
  <div className="col-span-12">
    <EditShopInfo Edit={Edit} setEdit={setEdit} shoInfo={shopInfo} />
  </div>
 
</div>

                  
            </div>
      );
};

export default UpdateShopProfile;
