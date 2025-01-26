import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import LoaderData from "../../../../Common/LoaderData";
import Swal from 'sweetalert2';

const MediaManageAdmin = () => {
      const [currentPage, setCurrentPage] = useState(1); // Pagination state
      const [startDate, setStartDate] = useState(""); // Start date filter
      const [endDate, setEndDate] = useState(""); // End date filter
      const [selectedImages, setSelectedImages] = useState<string[]>([]);
      const imagesPerPage = 100;

      const { data: allImages = { imageUrls: [], totalImages: 0 }, refetch, isLoading } = useQuery({
            queryKey: ["admin-images", currentPage, startDate, endDate],
            queryFn: async () => {
                  const queryParams = new URLSearchParams({
                        limit: imagesPerPage.toString(),
                        skip: ((currentPage - 1) * imagesPerPage).toString(),
                        startDate, // Date filtering params if needed
                        endDate,
                  });
                  const res = await fetch(
                        `https://doob.dev/api/v1/image/get-image-for-admin?${queryParams}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const handleSelectImage = (imageUrl: string) => {
            setSelectedImages((prev) =>
                  prev.includes(imageUrl)
                        ? prev.filter((url) => url !== imageUrl) // Deselect
                        : [...prev, imageUrl] // Select
            );
      };

      const bulkDelete = async () => {
            const totalImages = selectedImages.length;
            let deletedCount = 0;

            // Show SweetAlert with a progress message (no timer)
            const swalInstance = Swal.fire({
                  title: "Deleting Images...",
                  html: `Deleting <b>0</b> of ${totalImages} images.`,
                  showConfirmButton: false,
                  allowOutsideClick: false, // Prevent closing by clicking outside
                  didOpen: () => {
                        Swal.showLoading();
                  },
            });

            // Loop through selected images and delete them one by one
            for (let i = 0; i < selectedImages.length; i++) {
                  const imgUrl = selectedImages[i];
                  const parts = imgUrl.split("/");
                  const id = parts[parts.length - 1].split(".")[0];

                  try {
                        await fetch(`https://doob.dev/api/v1/image/delete-image?id=${id}`, { method: "DELETE" });
                        deletedCount++;
                        // Update the progress message in the SweetAlert2 popup
                        swalInstance.update({
                              html: `Deleting <b>${deletedCount}</b> of ${totalImages} images.`,
                        });
                  } catch (error) {
                        console.error(`Error deleting image ${id}:`, error);
                        // Optionally, show an error message and continue deleting
                        Swal.fire({
                              title: "Error",
                              text: `Failed to delete some images. Continuing...`,
                              icon: "error",
                              timer: 2000,
                              showConfirmButton: false,
                        });
                  }
            }

            // After all images are deleted, show success message
            Swal.fire({
                  title: "Images Deleted",
                  text: `Successfully deleted ${deletedCount} of ${totalImages} selected images.`,
                  icon: "success",
                  showConfirmButton: true,
            }).then(() => {
                  refetch(); // Refresh the image list after the deletion process
                  setSelectedImages([]); // Clear the selected images
            });
      };

      // Function to group images by their upload date
      const groupImagesByDate = (images) => {
            if (!images || images.length === 0) {
                  return {}; // Return an empty object if no images are available
            }

            return images.reduce((groups, image) => {
                  const date = new Date(image.createdAt).toLocaleDateString(); // Format date
                  if (!groups[date]) {
                        groups[date] = [];
                  }
                  groups[date].push(image);
                  return groups;
            }, {});
      };

      const groupedImages = groupImagesByDate(allImages.imageUrls);

      const totalPages = Math.ceil(allImages.totalImages / imagesPerPage);

      return (
            <div>
                  <div className="md:flex items-center justify-between gap-2">
                  <h1 className="text-2xl font-semibold"> Media</h1>

                  <div className="mb-4  items-center gap-1 flex">
                 
                        <label>
                        Start:
                              <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="ml-0 border border-gray-300 rounded p-1"
                              />
                        </label>
                       
                        <label className=" ">
                        End :
                              <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="ml-0 border border-gray-300 rounded p-1"
                              />
                        </label>


                        {selectedImages.length > 0 && (
                              <button
                                    className="bg-red-500 ml-2 text-white py-2 px-4 rounded mb-4"
                                    onClick={bulkDelete}
                              >
                                    Delete Selected Images
                              </button>
                        )}
                  </div>
                  </div>

                  {isLoading && <LoaderData />}

                  {/* Render grouped images by date */}
                  <div className="flex flex-wrap mt-2">
                        {Object.entries(groupedImages).map(([date, images]) => (
                              <div key={date} className="mb-8 w-full">
                                    <h2 className="rounded text-lg font-semibold mb-2 px-2 py-2 bg-[#111827] text-white">{date}</h2>
                                    <div className="grid lg:grid-cols-6 md:grid-cols-4  grid-cols-2 ">
                                          {images.map((image, index) => (
                                                <div key={index} className="relative group">
                                                      <input
                                                            type="checkbox"
                                                            checked={selectedImages.includes(image.imageUrl)}
                                                            onChange={() => handleSelectImage(image.imageUrl)}
                                                            className="absolute top-2 left-2 z-10"
                                                      />
                                                      <img
                                                            className="md:h-60 md:w-60 w-36 h-36 border-black border ml-2 mb-2 cursor-pointer"
                                                            src={image.imageUrl}
                                                            alt={`Image ${index}`}
                                                            onClick={() => handleSelectImage(image.imageUrl)}
                                                      />
                                                      <button
                                                            className="absolute top-2 md:right-4 right-2 flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                            onClick={() => {
                                                                  const parts = image.imageUrl.split("/");
                                                                  const id = parts[parts.length - 1].split(".")[0];
                                                                  fetch(`https://doob.dev/api/v1/image/delete-image?id=${id}`, { method: "DELETE" })
                                                                        .then((res) => res.json())
                                                                        .then(() => {
                                                                              refetch();
                                                                              setSelectedImages((prev) => prev.filter((url) => url !== image.imageUrl));
                                                                        });
                                                            }}
                                                      >
                                                            <RxCross2 />
                                                      </button>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center my-4">
                        {Array.from({ length: totalPages }, (_, i) => (
                              <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-2 mx-1 ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                              >
                                    {i + 1}
                              </button>
                        ))}
                  </div>
            </div>
      );
};

export default MediaManageAdmin;
