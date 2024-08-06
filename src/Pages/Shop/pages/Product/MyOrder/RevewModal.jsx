import React, { useContext, useState } from "react";
import useImageUpload from "../../../../../Hooks/UploadImage";
import { ShopAuthProvider } from "../../../../../AuthProvider/ShopAuthProvide";
import BrightAlert from "bright-alert";

const RevewModal = ({
  oreder_review,
  setOrder_review,
  orderId,
  refetchReview,
}) => {
  // console.log(oreder_review, "oreder_review");
  console.log(orderId);
  const { shopUser } = useContext(ShopAuthProvider);
  const [selectedStarIndex, setSelectedStarIndex] = useState(-1);

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);
    const newImages = fileList.map((file) => ({
      file: file,
      url: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleStarClick = (index) => {
    setSelectedStarIndex(index);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const isGold = i <= selectedStarIndex;
      stars.push(
        <button type="button" key={i} onClick={() => handleStarClick(i)}>
          <svg
            className={`h-6 w-6  ${isGold ? "bg-yellow-500" : "bg-gray-500"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      );
    }
    return stars;
  };

  const { uploadImage } = useImageUpload();

  const [loader, setLoader] = useState(false);

  // console.log(oreder_review.productId);
  const upload_my_review = async (e) => {
    setLoader(true);
    e.preventDefault();
    const input = e.target.review.value;
    const star = selectedStarIndex + 1;
    // const imageData = e.target.images.files; // Corrected to access files from the input element
    // console.log(imageData, images);
    try {
      // Upload images and get URLs
      let galleryImageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const imageUrl = await uploadImage(images[i].file);

        galleryImageUrls.push(imageUrl);
      }
      // Create review object with image URLs
      const review = {
        review: input,
        star: star,
        images: galleryImageUrls,
        product_id: oreder_review.productId,
        productImage: oreder_review.img,
        userId: {
          name: shopUser.name,
          email: shopUser.email,
          _id: shopUser._id,
        },
        shopId: oreder_review.shopId,
        timestamp: new Date().toString(),
        orderId: orderId,
      };

      fetch(`https://doob.dev/api/v1/shop/user/add-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoader(false);
          BrightAlert(`${data.message}`, "", `${data?.status}`);
          setOrder_review(false);
          refetchReview();
        })
        .catch((error) => {
          setLoader(false);
          BrightAlert("Something went wrong", "", "error");
          setOrder_review(false);
          refetchReview();
          console.error("Error:", error);
        });

      // Perform further actions with the review object (e.g., send to the server)
      console.log(review);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <form
          onSubmit={upload_my_review}
          className="mx-4 w-full  lg:max-w-md rounded-lg bg-white p-6 shadow-lg "
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Write a Review</h2>
            <div className=" h-[300px] w-full overflow-y-scroll">
              <div className="space-y-2">
                <textarea
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:outline-none"
                  id="review"
                  name="review"
                  placeholder="Share your thoughts..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    name="images"
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:outline-none"
                    id="images"
                    multiple
                    type="file"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {images.map((image, index) => (
                    <div className="relative" key={index}>
                      <img
                        alt={`Image ${index + 1}`}
                        className="h-20 w-full border rounded-md object-cover"
                        src={image.url}
                      />
                      <button
                        className="absolute top-1 right-1 rounded-full bg-gray-800 p-1 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        type="button"
                        onClick={() => handleImageRemove(index)}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            fillRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex mt-2 items-center space-x-2">
                <label className="font-medium" htmlFor="rating">
                  Rating:
                </label>
                <div className="flex items-center space-x-1">
                  {renderStars()}
                </div>
              </div>
            </div>
            <div className="flex justify-end  space-x-2">
              <button
                disabled={loader}
                onClick={() => setOrder_review(false)}
                className="rounded-md  bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                type="button"
              >
                Cancel
              </button>
              <button
                className={`rounded-md bg-primary px-4 py-2 text-sm font-medium text-white ${loader
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-primary-600"
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700`}
                type="submit"
                disabled={loader}
              >
                {loader ? (
                  <svg
                    className="animate-spin h-4 w-4 mr-3 border-t-2 border-b-2 border-white rounded-full"
                    viewBox="0 0 24 24"
                  ></svg>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RevewModal;
