import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import JoditEditor from "jodit-react";
import React from "react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import showAlert from "../../../Common/alert";

const AddService = () => {
      const [selectedFile, setSelectedFile] = useState(null);
      const [previewUrl, setPreviewUrl] = useState(null);
      const [fileName, setFileName] = useState("");
      const [loading, setLoading] = useState(false);
      const [purchasedTime, setPurchasedTime] = useState("");
      const [draft, set_draft] = useState(false);

      // console.log("yes");
      const modules = {
            toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
            ],
      };

      const { data: categories = [], refetch } = useQuery({
            queryKey: ["category"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/category");
                  const data = await res.json();
                  return data;
            },
      });

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

      const dataSubmit = async (event) => {
            setLoading(true);
            event.preventDefault();
            const form = event.target;
            const title = form.title.value;

            const price = form.price.value;
            const image = form.photo.files[0];
            const category = form.category.value;
            const subscriptionPeriod = form.subscriptionPeriod.value;
            const MetaImage = form.MetaImage.files[0];
            const MetaTag = form.MetaTag.value;
            const MetaDescription = form.MetaDescription.value;
            const pricingPriceOne =
                  purchasedTime === "Monthly" ? form.pricingPriceOne.value : 0;
            const pricingPriceSix =
                  purchasedTime === "Monthly" ? form.pricingPriceSix.value : 0;

            const pricingPriceTwelve =
                  purchasedTime === "Monthly" ? form.pricingPriceTwelve.value : 0;
            const pricingPriceTwenty =
                  purchasedTime === "Monthly" ? form.pricingPriceTwelve.value : 0;

            const imageFormData = new FormData();
            imageFormData.append("image", image);
            const imageUrl = await uploadImage(imageFormData);

            const metaImageFormData = new FormData();
            metaImageFormData.append("image", MetaImage);
            const message = form.message.value;

            const metaImageUrl = await uploadImage(metaImageFormData);

            const service = {
                  title,
                  draft,
                  trash: 'false',
                  price: price ?? 1,
                  message: message,
                  img: imageUrl,
                  category,
                  subscriptionPeriod,
                  MetaTag,
                  MetaDescription,
                  MetaImage: metaImageUrl,
                  timestamp: new Date().toString(),
                  status: true,
                  pricingPriceOne: `${pricingPriceOne ?? 1},1`,
                  pricingPriceSix: `${pricingPriceSix ?? 1},6`,
                  pricingPriceTwelve: `${pricingPriceTwelve ?? 1},12`,
                  pricingPriceTwenty: `${pricingPriceTwenty ?? 1},24`,
            };

            try {
                  postService(service, form);
            } catch (error) {
                  BrightAlert(`${error.message}`, "", "error");
                  setLoading(false);
            }
      };

      async function uploadImage(formData) {
            const url = "https://doob.dev/api/v1/image/upload-image";
            const response = await fetch(url, {
                  method: "POST",
                  body: formData,
            });
            const imageData = await response.json();
            return imageData.imageUrl;
      }

      const postService = (service, form) => {
            fetch(`https://doob.dev/api/v1/admin/addservice`, {
                  method: "POST",
                  headers: {
                        "content-type": "application/json",
                  },
                  body: JSON.stringify(service),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setLoading(false);
                        showAlert("success", "Your service Publish Successfully", "success");

                        form.reset();
                        setPreviewUrl("");
                        setFileName("");
                  });
      };

      return (
            <div>
                  <div className=" mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                        <h1 className="text-2xl font-bold text-center">
                              Publish a service for you and next
                        </h1>
                        <div className="p-10 border-2 rounded m-10">
                              <form onSubmit={dataSubmit} className="space-y-4 ">
                                    <div>
                                          <label className="sr-only text-black" htmlFor="title">
                                                service Title
                                          </label>
                                          <input
                                                required
                                                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                                                placeholder="Service Name"
                                                type="text"
                                                id="title"
                                                name="title"
                                          />
                                    </div>
                                    <div>
                                          <label className="sr-only text-black" htmlFor="title">
                                                Service Price
                                          </label>
                                          <input
                                                required
                                                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                                                placeholder="Service Price"
                                                type="text"
                                                id="price"
                                                name="price"
                                          />
                                    </div>
                                    <div className="relative mt-1.5">
                                          <select
                                                type="text"
                                                id="Category"
                                                name="category"
                                                className="w-full mt-1 rounded-lg border border-gray-900 px-3 py-2 text-sm"
                                                placeholder="Select a category"
                                          >
                                                <option selected disabled value="Select Service Category">
                                                      Select Service Category
                                                </option>
                                                {categories.length &&
                                                      categories?.map((category, i) => (
                                                            <option value={category?.title} key={category?.title}>
                                                                  {category?.title}
                                                            </option>
                                                      ))}
                                          </select>
                                    </div>

                                    <div className="relative mt-1.5">
                                          <select
                                                type="text"
                                                list="subscriptionPeriod"
                                                id="subscriptionPeriod"
                                                name="subscriptionPeriod"
                                                className="w-full mt-1 rounded-lg border border-gray-900 px-3 py-2 text-sm"
                                                placeholder="Select Subscription Period"
                                                onChange={(e) => setPurchasedTime(e.target.value)}
                                          >
                                                <option disabled selected className="" value="">
                                                      Select Service Parched Time
                                                </option>
                                                <option value="One Time">One Time</option>
                                                <option value="Monthly">Monthly</option>
                                                {/* <option value="Yearly">Yearly</option> */}
                                          </select>
                                    </div>

                                    <div>
                                          <label
                                                htmlFor="dropzone-file"
                                                className="flex flex-col items-center w-full  p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer  rounded-xl"
                                          >
                                                {previewUrl ? (
                                                      <img
                                                            srcSet={previewUrl}
                                                            src={previewUrl}
                                                            alt="File Preview"
                                                            className="mt-2 w-8 h-8"
                                                      />
                                                ) : (
                                                      <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-8 h-8 text-gray-500 "
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                                            />
                                                      </svg>
                                                )}
                                                <h2 className="mt-1 font-medium tracking-wide text-gray-700 ">
                                                      {fileName ? fileName : " Upload Picture"}
                                                </h2>
                                                <p className="mt-2 text-xs tracking-wide text-gray-500 ">
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
                                    </div>

                                    <div>
                                          <div>

                                                <JoditEditor
                                                      config={{
                                                            readonly: false, height: 200, resizable: true,
                                                            askBeforePasteHTML: false,
                                                            uploader: {
                                                                  insertImageAsBase64URI: true,
                                                            },
                                                      }}
                                                      name="message"
                                                      id="message"
                                                />
                                                <br />
                                                {/* <br /> */}
                                          </div>
                                    </div>
                                    {purchasedTime === "Monthly" && (
                                          <div>
                                                <label
                                                      htmlFor="pricingPriceOne"
                                                      className="inline-block mb-1 font-medium"
                                                >
                                                      1st Month Discount
                                                </label>
                                                <input
                                                      placeholder="$50"
                                                      required
                                                      type="number"
                                                      name="pricingPriceOne"
                                                      // value={formData.one}
                                                      // onChange={(e) => handleInputChange("one", e.target.value)}
                                                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                                />
                                                <label
                                                      htmlFor="pricingPriceSix"
                                                      className="inline-block mb-1 font-medium"
                                                >
                                                      Six Month Discount
                                                </label>
                                                <input
                                                      placeholder="$100"
                                                      required
                                                      type="number"
                                                      name="pricingPriceSix"
                                                      // value={formData.six}
                                                      // onChange={(e) => handleInputChange("six", e.target.value)}
                                                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                                />
                                                <label
                                                      htmlFor="pricingPriceTwelve"
                                                      className="inline-block mb-1 font-medium"
                                                >
                                                      One Year Discount
                                                </label>
                                                <input
                                                      placeholder="$500"
                                                      required
                                                      type="number"
                                                      name="pricingPriceTwelve"
                                                      // value={formData.twelve}
                                                      // onChange={(e) => handleInputChange("twelve", e.target.value)}
                                                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                                />
                                                <label
                                                      htmlFor="pricingPriceTwenty"
                                                      className="inline-block mb-1 font-medium"
                                                >
                                                      Two Year Discount
                                                </label>
                                                <input
                                                      placeholder="$150"
                                                      required
                                                      type="number"
                                                      name="pricingPriceTwenty"
                                                      // value={formData.twenty}
                                                      // onChange={(e) => handleInputChange("twenty", e.target.value)}
                                                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                                                />
                                          </div>
                                    )}
                                    <div>
                                          <label className="sr-only text-black" htmlFor="title">
                                                Meta Tag
                                          </label>
                                          <input
                                                required
                                                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                                                placeholder="Meta Tag"
                                                type="text"
                                                id="MetaTag"
                                                name="MetaTag"
                                          />
                                    </div>

                                    <div>
                                          <label className="sr-only text-black" htmlFor="title">
                                                Meta Description
                                          </label>
                                          <textarea
                                                required
                                                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                                                placeholder="Meta Description"
                                                type="text"
                                                id="MetaDescription"
                                                name="MetaDescription"
                                          />
                                    </div>
                                    <div>
                                          <label className="sr-only text-black" htmlFor="title">
                                                Meta Image'
                                          </label>
                                          <input
                                                required
                                                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                                                placeholder="Meta Description"
                                                type="file"
                                                id="MetaImage"
                                                name="MetaImage"
                                          />
                                    </div>

                                    <div className="mt-4">
                                          {loading ? (
                                                <button
                                                      disabled
                                                      className="group relative cursor-not-allowed inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
                                                >
                                                      <span className="text-sm font-medium">Loading...</span>
                                                      <svg
                                                            className="animate-spin h-4 w-4 ml-3 text-white"
                                                            viewBox="0 0 24 24"
                                                      >
                                                            <circle
                                                                  cx="12"
                                                                  cy="12"
                                                                  r="10"
                                                                  stroke="currentColor"
                                                                  strokeWidth="4"
                                                            />
                                                      </svg>
                                                </button>
                                          ) : (
                                                <div className="flex gap-4">
                                                      <button
                                                            type="submit"
                                                            className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
                                                      >
                                                            <span className="absolute -end-full transition-all group-hover:end-4">
                                                                  <BsArrowRight />
                                                            </span>

                                                            <span className="text-sm font-medium transition-all group-hover:me-4">
                                                                  Add Service
                                                            </span>
                                                      </button>
                                                      <button
                                                            onClick={() => set_draft(true)}
                                                            type="submit"
                                                            className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
                                                      >
                                                            <span className="absolute -end-full transition-all group-hover:end-4">
                                                                  <BsArrowRight />
                                                            </span>

                                                            <span className="text-sm font-medium transition-all group-hover:me-4">
                                                                  Draft
                                                            </span>
                                                      </button>
                                                </div>
                                          )}
                                    </div>
                              </form>
                        </div>
                  </div>
            </div>
      );
};

export default AddService;
