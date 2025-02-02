import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import useImageUpload from "../../../../../Hooks/UploadImage";



const SortableItem = SortableElement(({ value, onRemove }) => {
      return (
            <div className="relative h-[100px] rounded object-cover" style={{ margin: '5px', border: '1px solid #ccc', padding: '2px' }}>
                  <button
                        type="button"
                        className='bg-red-500 text-white w-[20px] h-[20px] flex items-center justify-center absolute rounded-full'
                        onClick={onRemove}
                        style={{ top: '5px', right: '5px' }}
                  >
                        x
                  </button>
                  <img src={value?.src ?? value?.url} alt="Uploaded" className="max-w-full object-cover w-full h-full max-h-full" />
            </div>
      );
});

const SortableList = SortableContainer(({ items, onRemove }) => {
      return (
            <div className="w-full grid md:grid-cols-8 grid-cols-4 mt-6">
                  {items.map((value, index) => (
                        <SortableItem key={`item-${index}`} index={index} value={value} onRemove={() => onRemove(index)} />
                  ))}
            </div>
      );
});





const ImageUploadSeller = ({
      allImage,
      setAllImage,
      product,
      coverPhoto,
      setCoverPhoto,
      youtube,
      setYoutube,
      set_daraz_feature_photo,
      daraz_feature_photo
}) => {
      //   console.log(product);

      //   console.log(product?.images?.[0]?.src);
      const { uploadImage } = useImageUpload();

      const [photo1, setPhoto1] = useState(product?.images?.[0]?.src ?? "");
      const [photo2, setPhoto2] = useState(product?.images?.[1]?.src ?? "");
      const [photo3, setPhoto3] = useState(product?.images?.[2]?.src ?? "");
      const [photo4, setPhoto4] = useState(product?.images?.[3]?.src ?? "");
      const [photo5, setPhoto5] = useState(product?.images?.[4]?.src ?? "");
      const [photo6, setPhoto6] = useState(product?.images?.[5]?.src ?? "");
      const [photo7, setPhoto7] = useState(product?.images?.[6]?.src ?? "");
      const [deletItem, setDeletItem] = useState("");

      // console.log(photo1);
      //   console.log(youtube);
      const [youtubeError, setYoutubeError] = useState("");

      useEffect(() => {
            if (product?.images) {
                  setPhoto1(product?.images?.[0]?.src ?? "");
                  setPhoto2(product?.images?.[1]?.src ?? "");
                  setPhoto3(product?.images?.[2]?.src ?? "");
                  setPhoto4(product?.images?.[3]?.src ?? "");
                  setPhoto5(product?.images?.[4]?.src ?? "");
                  setPhoto6(product?.images?.[5]?.src ?? "");
                  setPhoto7(product?.images?.[6]?.src ?? "");
            }

            if (product?.videoUrl) {
                  setYoutube(product?.videoUrl);
            }
      }, [product]);

      // console.log(p1, 'p11111111111');

      const handleCheck = (value) => {
            console.log(value);
            const youtubeRegex =
                  /^(https?:\/\/)?(www\.)?(youtube\.com\/(v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

            const isYoutube = youtubeRegex.test(value);
            console.log(isYoutube);
            if (isYoutube) {
                  setYoutube(value);
                  setYoutubeError("");
            } else {
                  setYoutubeError("Provide Youtube Video URl");
            }
      };
      const handleImageChange = (setter, event) => {
            const file = event.target.files[0];
            setter(URL.createObjectURL(file));
      };



      const [isDraggingOver, setIsDraggingOver] = useState(false);


      const handleDrop = (e) => {
            e.preventDefault();
            setIsDraggingOver(false);
            const filesList = Array.from(e.dataTransfer.files);
            // const urls = files.map(file => { url: URL.createObjectURL(file), file });

            const newImages = filesList.map((file) => ({
                  file: file,
                  url: URL.createObjectURL(file),
            }));
            // setImages([...images, ...newImages]);

            console.log('url', newImages);
            setAllImage([...allImage, ...newImages]);
      };

      const handleDragOver = (e) => {
            e.preventDefault();
            setIsDraggingOver(true);
      };

      const handleDragLeave = (e) => {
            e.preventDefault();
            setIsDraggingOver(false);
      };




      const handleFileUpload = (e) => {
            const filesList = Array.from(e.target.files);
            const newImages = filesList.map((file) => ({
                  file: file,
                  url: URL.createObjectURL(file),
            }));
            // Check if the src of the new image already exists in allImage
            const filteredNewImages = newImages?.filter((newImage) =>
                  allImage.every((existingImage) => existingImage.src !== newImage.url)
            );

            setAllImage([...allImage, ...filteredNewImages]);
      };

      const handleRemoveImage = (index) => {
            const updatedImages = allImage.filter((_, idx) => idx !== index);
            setAllImage(updatedImages);
      };

      const onSortEnd = ({ oldIndex, newIndex }) => {
            const newData = arrayMoveImmutable(allImage, oldIndex, newIndex);
            setAllImage(newData);
      };


      const feature_image = async (e) => {
            const file_data = e.target.files[0];
            const image = await uploadImage(file_data);
            set_daraz_feature_photo(image);
            console.log(image, 'image');
      }



      //    <div >
      return (
            <div>
                  <button
                        onClick={() => setOpenModal(!OpenModal)}
                        className="absolute text-3xl right-6 top-4 text-white "
                  >
                        x
                  </button>
                  <div className="border  w-full border-gray-400 md:px-10 px-3 py-5  bg-gray-100 rounded">


                        <div
                              className={`border-2 border-dashed px-3 bar overflow-hidden relative py-6 ${isDraggingOver ? 'border-red-500 bg-[#ff007717]' : 'border-gray-400 bg-[#ffffff]'} mb-4 min:h-[220px] flex flex-col items-center justify-center w-full mx-auto rounded-xl`}
                              onDrop={handleDrop}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                        >
                              <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileUpload}
                                    id="fileInput"
                              />
                              <label
                                    htmlFor="fileInput"
                                    className="text-center  top-0 left-0 right-0 bottom-0   w-full h-full cursor-pointer flex flex-col justify-center hover:bg-none items-center"
                              >
                                    <AiOutlineCloudUpload className='text-5xl text-center' />
                                    Drop files here or click to upload
                                    {allImage.length < 3 && <small className={`flex items-center gap-2 mt-3  ${allImage.length < 3 ? 'text-red-500 font-semibold text-md' : 'text-gray-500'}`}> {allImage.length < 3 &&
                                          <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                          >
                                                <path
                                                      d="M17.0156 11.6156L10.9969 1.93125C10.5188 1.28437 9.78752 0.91875 9.00002 0.91875C8.18439 0.91875 7.45314 1.28437 7.00314 1.93125L0.984395 11.6156C0.421895 12.375 0.33752 13.3594 0.759395 14.2031C1.18127 15.0469 2.02502 15.5813 2.98127 15.5813H15.0188C15.975 15.5813 16.8188 15.0469 17.2406 14.2031C17.6625 13.3875 17.5781 12.375 17.0156 11.6156ZM16.1156 13.6406C15.8906 14.0625 15.4969 14.3156 15.0188 14.3156H2.98127C2.50315 14.3156 2.10939 14.0625 1.88439 13.6406C1.68752 13.2188 1.71564 12.7406 1.99689 12.375L8.01564 2.69062C8.24064 2.38125 8.60627 2.18437 9.00002 2.18437C9.39377 2.18437 9.75939 2.35312 9.9844 2.69062L16.0031 12.375C16.2844 12.7406 16.3125 13.2188 16.1156 13.6406Z"
                                                      fill="currentColor"
                                                />
                                                <path
                                                      d="M8.9999 6.15002C8.6624 6.15002 8.35303 6.43127 8.35303 6.79689V9.86252C8.35303 10.2 8.63428 10.5094 8.9999 10.5094C9.36553 10.5094 9.64678 10.2281 9.64678 9.86252V6.76877C9.64678 6.43127 9.3374 6.15002 8.9999 6.15002Z"
                                                      fill="currentColor"
                                                />
                                                <path
                                                      d="M8.9999 11.25C8.6624 11.25 8.35303 11.5313 8.35303 11.8969V12.0375C8.35303 12.375 8.63428 12.6844 8.9999 12.6844C9.36553 12.6844 9.64678 12.4031 9.64678 12.0375V11.8688C9.64678 11.5313 9.3374 11.25 8.9999 11.25Z"
                                                      fill="currentColor"
                                                />
                                          </svg>} Please upload at least 3 images</small>}
                              </label>


                              <SortableList
                                    items={allImage}
                                    onSortEnd={onSortEnd}
                                    onRemove={handleRemoveImage}
                                    axis="x"
                                    lockAxis="x"
                              />
                        </div>
                        {(product.webStore && !product?.daraz) &&
                              <>
                                    <div className="border  w-full border-gray-400 px-10 py-5  bg-gray-100 rounded">
                                          <label htmlFor=""><b>For Daraz Cover With Frame</b></label>
                                          <div className="mt-4">
                                                <input onChange={feature_image} type="file" />
                                          </div>
                                    </div>

                              </>
                        }

                        <div className="mt-4 flex flex-col gap-2">
                              <label className="text-sm " htmlFor="Video url ">
                                    {" "}
                                    Video Url
                              </label>
                              <input
                                    onChange={(e) => handleCheck(e.target.value)}
                                    defaultValue={product?.videoUrl ? product?.videoUrl : ""}
                                    className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                    placeholder="Input YouTube video link here"
                                    type="text"
                                    name="videoUrl"
                              />
                              {youtubeError && (
                                    <span className="text-sm text-red-500">{youtubeError}</span>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default ImageUploadSeller;
