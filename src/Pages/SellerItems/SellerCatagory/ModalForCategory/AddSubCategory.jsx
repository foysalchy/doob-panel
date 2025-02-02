import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Select from "react-select";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Children } from "react";
import showAlert from "../../../../Common/alert";
const AddSubCategory = () => {
      const { shopInfo } = useContext(AuthContext);

      const navigate = useNavigate();

      const handleGoBack = () => {
            navigate(-1); // This will go back to the previous page
      };

      const { data: darazData = [], refetch } = useQuery({
            queryKey: ["category"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/category/seller/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      console.log(darazData);


      const option = darazData
            ?.filter((warehouse) => warehouse?.status)
            .map((warehouse) => ({
                  value: JSON.stringify(warehouse),
                  label: warehouse.name,
            }));

      const [daraz, setDaraz] = useState(false);
      const [wocomarce, setWocomarce] = useState(false);

      const handleButtonClick = (buttonName) => {
            if (buttonName === "daraz") {
                  setDaraz(!daraz);
            }
            if (buttonName === "wocomarce") {
                  setWocomarce(!wocomarce);
            }
      };

      const uploadImage = async (formData) => {
            const url = `https://doob.dev/api/v1/image/upload-image/?shopId=${shopInfo._id}`;
            const response = await fetch(url, {
                  method: "POST",
                  body: formData,
            });

            const imageData = await response.json();
            return imageData.imageUrl;
      };



      const [upload_on, setUpload_on] = useState(false);


      const UploadArea = async (e) => {
            e.preventDefault();
            setUpload_on(true)
            const image = e.target.image.files[0];
            const megaCategory = e.target.megaCategory.value || "";
            const megaCategoryId = JSON.parse(megaCategory)._id;
            const darazSubCategory = e.target?.darazSubCategory?.value || "";
            const wooSubCategory = e.target.wooSubCategory?.value || "";
            const subCategoryName = e.target.subcategoryName.value;
            let darazCategory_id = "";
            if (darazSubCategory) {
                  darazCategory_id = JSON.parse(darazSubCategory).category_id;
            }

            const imageFormData = new FormData();
            imageFormData.append("image", image);
            const imageUrl = image ? await uploadImage(imageFormData) : '';

            const data = {
                  img: imageUrl,
                  megaCategory,
                  darazSubCategory,
                  wooSubCategory,
                  subCategoryName,
                  shopId: shopInfo._id,
                  darazCategory_id,
                  status: true,
                  megaCategoryId: megaCategoryId,
            };

            // console.log('add data ::', data);

            const url = `https://doob.dev/api/v1/category/seller/sub/add`;

            const response = await fetch(url, {
                  method: "POST",
                  headers: {
                        "content-type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert("Sub Category Upload Successfully", "", "success");
                        refetch();
                        setUpload_on(false)
                        handleGoBack();
                  });
      };

      const postCategory = async (data) => {
            return responseData;
      };

      const [selectedData, setSelectedData] = useState([]);
      const [wooData, setWooData] = useState([]);

      console.log(selectedData);
      const handleSelectChange = (selectedOption) => {
            console.log(selectedOption.label, "selectedOption");
            const darazCategoryString = JSON.parse(selectedOption.value)?.darazCategory;

            if (darazCategoryString) {
                  const darazCategory = JSON.parse(darazCategoryString);

                  setSelectedData(darazCategory.children);

                  console.log("Selected darazCategory:", darazCategory);

                  // Now you can access darazCategory.children.name or any other properties as needed
            } else {
                  setSelectedData([]);
                  // Handle the case where darazCategory is undefined or null
                  console.log("darazCategory is undefined or null");
            }
      };

      const darazOption = selectedData?.map((warehouse) => ({
            value: JSON.stringify(warehouse),
            label: `${warehouse.name} (${warehouse.leaf ? "can upload" : "can't upload"})`,
      }));

      console.log(darazOption);

      const wooOption = wooData?.map((warehouse) => ({
            value: warehouse,
            label: warehouse.name,
      }));

      return (
            <div className="lg:pr-10 w-full mx-auto bar overflow-auto border border-black rounded p-6">
                  <button
                        onClick={() => handleGoBack()}
                        type="button"
                        className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <FaLongArrowAltLeft />
                        </span>
                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                              Back
                        </span>
                  </button>

                  <form onSubmit={UploadArea} action="">
                        <div className="mt-4">
                              <label className="text-sm">Select Mega Category</label>
                              <Select
                                    menuPortalTarget={document.body}
                                    styles={{
                                          control: (provided) => ({
                                                ...provided,
                                                cursor: "pointer",
                                          }),
                                          option: (provided) => ({
                                                ...provided,
                                                cursor: "pointer",
                                          }),
                                    }}
                                    name="megaCategory"
                                    required
                                    onChange={handleSelectChange}
                                    options={option}
                                    placeholder="Select Mega Category"
                              />
                        </div>
                        <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700">
                                    Enter Subcategory Name
                              </label>
                              <input
                                    required
                                    name="subcategoryName"
                                    placeholder="E.g., Trendy Fashion Accessories"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-900 focus:outline-none focus:border-blue-500"
                              />
                        </div>
                        {shopInfo.darazLogin && darazOption?.length > 0 && (
                              <div className=" mt-4">
                                    <div className="mt-4">
                                          <label className="text-sm">Select Daraz Category</label>
                                          <Select
                                                menuPortalTarget={document.body}
                                                styles={{
                                                      control: (provided) => ({
                                                            ...provided,
                                                            cursor: "pointer",
                                                      }),
                                                      option: (provided) => ({
                                                            ...provided,
                                                            cursor: "pointer",
                                                      }),
                                                }}
                                                name="darazSubCategory"
                                                required
                                                options={darazOption}
                                                placeholder="Select Daraz Category"
                                          />
                                    </div>
                              </div>
                        )}

                        {shopInfo.darazLogin && wooOption?.length > 0 && (
                              <div className=" mt-4">
                                    <div className="mt-4">
                                          <label className="text-sm">Select Daraz Category</label>
                                          <Select
                                                menuPortalTarget={document.body}
                                                styles={{
                                                      control: (provided) => ({
                                                            ...provided,
                                                            cursor: "pointer",
                                                      }),
                                                      option: (provided) => ({
                                                            ...provided,
                                                            cursor: "pointer",
                                                      }),
                                                }}
                                                name="wooSubCategory"
                                                required
                                                options={darazOption}
                                                placeholder="Select Daraz Category"
                                          />
                                    </div>
                              </div>
                        )}
                        {/* <div className=" mt-4">
                    <label className="text-sm">Provide name of Sub category</label>
                    <input required name='image' placeholder="Provide name of Sub category" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                </div> */}



                        <div className=" mt-4">
                              <label className="text-sm">Upload Image</label>
                              <input
                                    name="image"
                                    type="file"
                                    placeholder="Upload Image"
                                    className="w-full p-2 border border-black rounded-md  text-gray-900"
                              />
                        </div>

                        {
                              !upload_on ? <button
                                    type="submit"
                                    className="group mt-4 relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                              >
                                    <span className="absolute -start-full transition-all group-hover:start-4">
                                          <FaLongArrowAltRight />
                                    </span>
                                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                                          Add SubCategory
                                    </span>
                              </button>
                                    :
                                    <button
                                          type="button"
                                          className="group mt-4 relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                                    >
                                          <span className="absolute -start-full transition-all group-hover:start-4">
                                                <FaLongArrowAltRight />
                                          </span>
                                          <span className="text-sm font-medium transition-all group-hover:ms-4">
                                                Uploading...
                                          </span>
                                    </button>
                        }
                  </form>
            </div>
      );
};

export default AddSubCategory;
