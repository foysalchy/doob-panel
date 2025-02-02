import React, { useContext, useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import BrightAlert from "bright-alert";
import showAlert from "../../../../Common/alert";
import { useQuery } from "@tanstack/react-query";

const Frame = () => {
      const [selectedFile, setSelectedFile] = useState(null);
      const [previewUrl, setPreviewUrl] = useState(null);
      const [fileName, setFileName] = useState("");
      const { shopInfo } = useContext(AuthContext);

      const { data: frameimg = {}, refetch } = useQuery({
            queryKey: ["seller_frame"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/watermark/${shopInfo._id}`
                  );
                  const data = await res.json();


                  return data;
            },
      });


      useEffect(() => {

            setPreviewUrl(frameimg?.id);
      }, [frameimg]);

      const handleFileChange = (event) => {
            const file = event.target.files[0];
            setSelectedFile(file);

            if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                        setPreviewUrl(reader.result);
                  };
                  reader.readAsDataURL(file);
                  setFileName(file.name);
            }
      };

      const [loading, setLoading] = useState(false);
      const UploadFrame = async (e) => {
            e.preventDefault();
            setLoading(true);

            const shop = shopInfo._id;
            const imageFormData = new FormData();
            imageFormData.append("image", selectedFile);
            const imageUrl = await uploadImage(imageFormData);
            const data = {
                  image: imageUrl,
                  shopId: shop,
                  time: new Date(),
            };

            console.log(data);
            postSlider(data);
      };

      async function uploadImage(formData) {
            const url = `https://doob.dev/api/v1/image/upload-image?shopId=${shopInfo._id}`;
            const response = await fetch(url, {
                  method: "POST",
                  body: formData,
            });
            const imageData = await response.json();
            return imageData.imageUrl;
      }

      const postSlider = (Slider) => {
            fetch(`https://doob.dev/api/v1/seller/watermark`, {
                  method: "PATCH",
                  headers: {
                        "content-type": "application/json",
                  },
                  body: JSON.stringify(Slider),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        BrightAlert(data.message, "", data?.status);
                        setLoading(false);
                        setPreviewUrl("");
                        setFileName("");
                        refetch()
                        handleGoBack();
                  });
      };


      const delete_frame_img = () => {
            fetch(`https://doob.dev/api/v1/seller/watermark?id=${frameimg._id}`, {
                  method: "DELETE",
            })
                  .then((res) => res.json())
                  .then((data) => {
                        BrightAlert(data.message, "", data?.status);
                        setPreviewUrl("");
                  });
      }

      return (
            <div>
                  <div>
                        <div className=" border-black p-10 rounded border-dashed border-2  my-4">
                              <form onSubmit={UploadFrame} action="">
                                    <label
                                          htmlFor="dropzone-file"
                                          className="flex flex-col items-center w-full p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl"
                                    >
                                          {previewUrl ? (
                                                <div className="relative group">
                                                      {/* Image Preview */}
                                                      <img
                                                            src={previewUrl}
                                                            alt="File Preview"
                                                            className="mt-2 w-[130px] h-100 group-hover:blur-sm"
                                                      />
                                                      {/* Delete Button (hidden by default, shown on hover) */}
                                                      <button
                                                            type="button"
                                                            onClick={delete_frame_img}
                                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                      >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                                      </button>
                                                </div>
                                          ) : (
                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      strokeWidth="1.5"
                                                      stroke="currentColor"
                                                      className="w-8 h-8 text-gray-500"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                                      />
                                                </svg>
                                          )}

                                          <h2 className="mt-1 font-medium tracking-wide text-gray-700 ">
                                                {fileName ? fileName : "Upload Picture"}
                                          </h2>
                                          <p className="mt-2 text-xs tracking-wide text-gray-500">
                                                Upload Your Photo Only.
                                          </p>
                                          <input
                                                required
                                                id="dropzone-file"
                                                type="file"
                                                accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                                                name="photo"
                                                className="hidden"
                                                onChange={handleFileChange}
                                          />
                                    </label>

                                    <button
                                          type="submit"
                                          className="group mt-4 relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                                    >
                                          <span className="absolute -start-full transition-all group-hover:start-4">
                                                <FaLongArrowAltRight />
                                          </span>
                                          <span className="text-sm font-medium transition-all group-hover:ms-4">
                                                {loading ? "Uploading ..." : "Update"}
                                          </span>
                                    </button>
                              </form>

                        </div>
                  </div>
            </div>
      );
};
export default Frame;
