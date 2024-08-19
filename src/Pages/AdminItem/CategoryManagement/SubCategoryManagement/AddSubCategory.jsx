import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Swal from "sweetalert2";
import useImageUpload from "../../../../Hooks/UploadImage";

const AddSubCategory = () => {
      const [upload, setUpload] = useState("");
      const [uplodOk, setUploadOk] = useState(false);
      const { uploadImage } = useImageUpload();

      // const imageUploading = (e) => {
      //   e.preventDefault();
      //   const selectedFile = e.target.files[0];
      //   const formData = new FormData();
      //   formData.append("image", selectedFile);
      //   const url = `https://doob.dev/api/v1/image/upload-image`;
      //   fetch(url, {
      //     method: "POST",
      //     body: formData,
      //   })
      //     .then((res) => res.json())
      //     .then((imageData) => {
      //       if (imageData.imageUrl) {
      //         setUpload(imageData.imageUrl);
      //         setUploadOk(true);
      //       } else {
      //         setUpload("");
      //       }
      //     });
      // };

      const { data: subCategory = [], refetch, isLoading } = useQuery({
            queryKey: ["subCategory"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/category/megacategory"
                  );
                  const data = await res.json();
                  return data.rows;
            },
      });
      const [megaCategory, setMegaCategory] = useState({
            id: subCategory[0] && subCategory[0]._id,
            name: subCategory[0] && subCategory[0].name,
      });

      console.log();
      const [loading, setLoading] = useState(false);
      const handleSubmit = async (e) => {
            e.preventDefault();
            const form = e.target;
            const subCategory = form.subCategory.value;
            const file = form.image.files[0];
            setLoading(true);
            const upload = await uploadImage(file);

            const data = {
                  megaCategoryId: megaCategory.id,
                  megaCategoryName: megaCategory.name,
                  subCategory: subCategory,
                  img: upload,
                  status: "true",
                  feature: false,
            };

            fetch("https://doob.dev/api/v1/admin/category/subcategory", {
                  method: "post",
                  headers: {
                        "content-type": "application/json",
                        // "ngrok-skip-browser-warning": "69420",
                  },
                  body: JSON.stringify(data),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        BrightAlert({ timeDuration: 3000 });
                        setLoading(false);
                        form.reset();
                        s;
                  });
      };
      return (
            <div>
                  <form
                        onSubmit={handleSubmit}
                        className=" ring-1 ring-gray-200 rounded-xl w-full md:p-4 p-2"
                  >
                        <h1 className="text-2xl font-semibold mb-8">Add Sub category</h1>
                        <label className="" htmlFor="megaCategory">
                              Select Mega Category
                        </label>
                        <div className="relative border-2 mt-2">
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                              >
                                    <path
                                          fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                    />
                              </svg>
                              <select
                                    required
                                    onChange={(e) =>
                                          setMegaCategory({
                                                id: e.target.value,
                                                name: e.target.options[e.target.selectedIndex].text,
                                          })
                                    }
                                    id="megaCategory"
                                    name="megaCategory"
                                    className="w-full px-3 py-2 text-sm text-gray-600 bg-white rounded-lg shadow-sm outline-none appearance-none"
                              >
                                    <option selected disabled>
                                          {" "}
                                          Select your mega category
                                    </option>
                                    {subCategory?.map((item, idx) => (
                                          <option key={idx} value={item._id}>
                                                {item.name}
                                          </option>
                                    ))}
                              </select>
                        </div>

                        <div className="flex flex-col gap-2 mt-6">
                              <label htmlFor="upload">Enter Sub Category Name</label>
                              <input
                                    required
                                    type="text"
                                    placeholder="enter sub category"
                                    name="subCategory"
                                    id="upload"
                                    className="w-full px-3 py-2 border-2 text-sm text-gray-600 bg-white  shadow-sm outline-none appearance-none  "
                              />
                        </div>
                        {/* <div className="flex flex-col gap-2 mt-6">
                              <label htmlFor="upload">Upload Image</label>
                              <input
                                    // onChange={imageUploading}
                                    required
                                    type="file"
                                    name="image"
                                    placeholder="enter sub category"
                                    id="upload"
                                    className="w-full px-3 py-2 border-2 text-sm text-gray-600 bg-white  shadow-sm outline-none appearance-none  "
                              />
                        </div> */}
                        <div className=" gap-2">
                              <button
                                    type="submit"
                                    className="group mt-4 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                              >
                                    <span className="absolute -start-full transition-all group-hover:start-4">
                                          <FaLongArrowAltRight />
                                    </span>
                                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                                          {loading ? "Uploading" : "Upload Sub Category"}
                                    </span>
                              </button>
                        </div>
                  </form>
            </div>
      );
};

export default AddSubCategory;
