import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { BiCopy, BiEdit } from "react-icons/bi";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import ShopInformation from "./ShopInformatin";
import EditShopInfo from "./EditShopInfo";

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

      const [Edit, setEdit] = useState(false);

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
                  <div className="bg-white rounded-lg shadow-xl pb-8 relative bar overflow-hidden">
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
                                    <p className="text-2xl">{shopInfo.shopName}</p>
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
                        </div>

                        <div className=" lg:items-end justify-end px-8 mt-2">
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
                                    <button
                                          onClick={() => setEdit(true)}
                                          className="flex items-center bg-blue-600 md:w-auto w-full hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                                    >
                                          <BiEdit />
                                          <span>Edit Profile</span>
                                    </button>
                              </div>
                        </div>
                  </div>
                  <div>
                        <EditShopInfo Edit={Edit} setEdit={setEdit} shoInfo={shopInfo} />
                  </div>
                  <ShopInformation />
            </div>
      );
};

export default UpdateShopProfile;
