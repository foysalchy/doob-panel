import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { RxCross2 } from "react-icons/rx";
import Swal from 'sweetalert2';

const MediaManager = () => {
      const { shopInfo } = useContext(AuthContext);
      const [startDate, setStartDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [selectedImages, setSelectedImages] = useState([]);

      const { data: allImages = [], refetch } = useQuery({
            queryKey: ["seller-images"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/image/get-image-for-seller?shopId=${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data.images; // assuming API returns imageUrl and createdAt
            },
      });

      // Toggle image selection
      const handleSelectImage = (imageUrl) => {
            setSelectedImages((prevSelected) =>
                  prevSelected.includes(imageUrl)
                        ? prevSelected.filter((url) => url !== imageUrl) // Deselect image if already selected
                        : [...prevSelected, imageUrl] // Add image to selected list
            );
      };

      // Delete a single image
      const delete_image = (imgUrl) => {
            const parts = imgUrl.split("/");
            const id = parts[parts.length - 1].split(".")[0];
            fetch(`https://doob.dev/api/v1/image/delete-image?id=${id}`, {
                  method: "DELETE",
            })
                  .then((res) => res.json())
                  .then(() => {
                        refetch();
                  });
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


      // Group images by date
      const imagesByDate = allImages.reduce((acc, image) => {
            const date = new Date(image.createdAt).toLocaleDateString();
            if (!acc[date]) {
                  acc[date] = [];
            }
            acc[date].push(image);
            return acc;
      }, {});

      // Filter images based on selected date range
      const filteredImagesByDate = Object.keys(imagesByDate).reduce((acc, date) => {
            const imageDate = new Date(date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            // If date filtering is applied, only include images within the range
            if (
                  (!start || imageDate >= start) &&
                  (!end || imageDate <= end)
            ) {
                  acc[date] = imagesByDate[date];
            }
            return acc;
      }, {});

      return (
            <div>
                  {/* Date Filter Inputs */}
                  <div className="mb-4">
                        <label>
                              Start Date:
                              <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="ml-2 border border-gray-300 rounded p-1"
                              />
                        </label>
                        <label className="ml-4">
                              End Date:
                              <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="ml-2 border border-gray-300 rounded p-1"
                              />
                        </label>


                        {/* Bulk delete button */}
                        {selectedImages.length > 0 && (
                              <button
                                    className="bg-red-500 ml-2 text-white py-2 px-4 rounded mb-4"
                                    onClick={bulkDelete}
                              >
                                    Delete Selected Images
                              </button>
                        )}
                  </div>
                  {/* Display grouped images */}
                  {Object.keys(filteredImagesByDate).reverse().map((date, index) => (
                        <div key={index}>
                              {/* Display date */}
                              <h2 className="rounded text-lg font-semibold mb-2 px-2 py-2 bg-[#111827] text-white">{date}</h2>
                              <div className="flex flex-wrap">
                                    {/* Display images for the date */}
                                    {filteredImagesByDate[date].map((image, imgIndex) => (
                                          <div
                                                key={imgIndex}
                                                className={`relative group p-2 cursor-pointer ${selectedImages.includes(image.imageUrl)
                                                      ? "border-4 border-blue-500"
                                                      : ""
                                                      }`}
                                                onClick={() => handleSelectImage(image.imageUrl)}
                                          >
                                                <img
                                                      className="md:h-60 md:w-60 w-36 h-36 border-black border ml-2 mb-2"
                                                      src={image.imageUrl}
                                                      alt={`Image ${imgIndex}`}
                                                />
                                                <button
                                                      className="absolute top-2 md:right-4 right-2 flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                      onClick={(e) => {
                                                            e.stopPropagation(); // Prevent the click from selecting the image
                                                            delete_image(image.imageUrl);
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
      );
};

export default MediaManager;
