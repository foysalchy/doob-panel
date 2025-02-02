import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import showAlert from "../../../../Common/alert";
export default function EditMegaCategoryModal({
      warehouse,
      editOn,
      setEditOn,
      refetch,
}) {
      const [wocomarce, setWocomarce] = useState(false);
      const [loading, setLoading] = useState(false);
      console.log(editOn);

      const { shopInfo } = useContext(AuthContext);
      const [daraz, setDaraz] = useState(editOn?.darazCategory_id ? true : false);

      const uploadImage = async (formData) => {
            console.log('okkkkkkkkkkkkkkkkk')
            const url = `https://doob.dev/api/v1/image/upload-image/?shopId=${shopInfo._id}`;
            const response = await fetch(url, {
                  method: "POST",
                  body: formData,
            });

            const imageData = await response.json();
            return imageData.imageUrl;
      };

      const handleButtonClick = (buttonName) => {
            if (buttonName === "daraz") {
                  setDaraz(!daraz);
            }
            if (buttonName === "wocomarce") {
                  setWocomarce(!wocomarce);
            }
      };
      const { data: darazData = [] } = useQuery({
            queryKey: ["category"],
            queryFn: async () => {
                  if (shopInfo.darazLogin) {
                        const res = await fetch(
                              `https://doob.dev/api/v1/daraz/category/${shopInfo._id}`
                        );
                        const result = await res.json();
                        return result.data || []; // Adjust this based on the actual API response
                  }
                  return [];
            },
      });


      const { data: wooCategory = [] } = useQuery({
            queryKey: ["wooCategoryData"],
            queryFn: async () => {
                  if (shopInfo.wooLogin) {
                        const res = await fetch(
                              `https://doob.dev/api/v1/woo/category?shopId=${shopInfo._id}`
                        );
                        const data = await res.json();
                        return data;
                  }

                  return [];
            },
      });

      // console.log(wooCategory.categories[3].id, "wooCategory");
      const option =
            darazData.length &&
            darazData?.map((warehouse) => ({
                  value: JSON.stringify(warehouse),
                  label: `${warehouse.name} (${warehouse.leaf ? "can upload" : "can't upload"})`,
            }));

      // console.log(darazData[0].category_id);

      // console.log(OpenModal);
      // console.log(daraz);
      // console.log(editOn.darazCategory_id);
      const defaultDarazData =
            editOn?.darazCategory_id &&
            Array.isArray(darazData) &&
            darazData.find((item) => item.category_id === editOn?.darazCategory_id);


      // console.log(editOn?.darazCategory_id);
      const defaultDaraz = {
            value: JSON.stringify(defaultDarazData),
            label: defaultDarazData?.name,
      };

      // console.log(JSON.parse(editOn?.wocomarceCategory)?.id, "defaultDaraz");

      const defaultWooData =
            editOn?.wocomarceCategory &&
            wooCategory?.categories?.find(
                  (item) => item.id === JSON.parse(editOn?.wocomarceCategory)?.id
            );

      const defaultWoo = {
            value: JSON.stringify(defaultWooData),
            label: defaultWooData?.name,
      };

      useEffect(() => {
            if (defaultWooData?.id) {
                  setWocomarce(true);
            }
      });

      // console.log(JSON.parse(editOn?.wocomarceCategory)?.id);

      // console.log(wooCategory?.categories[0]);
      console.log(editOn?.wocomarceCategory);

      const handleEdit = async (e, id) => {
            e.preventDefault();
            setLoading(true);
            const form = e.target;
            const image = form.image;
            const name = form.name.value;

            const darazCategory = daraz
                  ? e.target?.darazCategory?.value
                  : JSON.stringify(editOn?.darazCategory);

            let darazCategory_id = editOn?.darazCategory_id ?? "";
            if (darazCategory) {
                  darazCategory_id = JSON.parse(darazCategory).category_id;
            }

            const wocomarceCategory = wocomarce
                  ? e.target.wocomarceCategory.value
                  : editOn?.wocomarceCategory;

            console.log(image);
            const imageFormData = new FormData();
            imageFormData.append("image", image.files[0]);
            const imageUrl = await uploadImage(imageFormData);

            const data = {
                  img: imageUrl ? imageUrl : editOn?.img,
                  name: name,
                  darazCategory,
                  wocomarceCategory,
                  darazCategory_id,
                  shopId: shopInfo._id,
            };

            console.log(data, id, "update");

            // return;

            fetch(
                  `https://doob.dev/api/v1/category/seller-update-megaCategory?id=${id}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        setLoading(false);
                        showAlert(`Category update `, "", "success");
                        refetch();
                        setEditOn(false);
                        form.reset();
                  });
      };
      return (
            <div
                  className={`fixed z-[100] flex items-center justify-center ${editOn?._id === warehouse?._id
                        ? "opacity-1 visible"
                        : "invisible opacity-0"
                        } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
            >
                  <div
                        className={`absolute md:w-[500px] w-full rounded-sm bg-white p-3 pb-5 text-center drop-shadow-2xl ${editOn?._id === warehouse?._id
                              ? "scale-1 opacity-1 duration-300"
                              : "scale-0 opacity-0 duration-150"
                              } `}
                  >
                        <svg
                              onClick={() => setEditOn(false)}
                              className="mx-auto mr-0 w-8 cursor-pointer"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                        >
                              <g strokeWidth="0"></g>
                              <g strokeLinecap="round" strokeLinejoin="round"></g>
                              <g>
                                    <path
                                          d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                                          fill="#000"
                                    ></path>
                              </g>
                        </svg>
                        {/* //! Edit Mega Category */}
                        <form onSubmit={(e) => handleEdit(e, warehouse?._id)}>
                              <h1 className="text-lg font-semibold text-center mb-4">
                                    Edit Mega Category
                              </h1>
                              <img
                                    src={warehouse?.img}
                                    alt=""
                                    className="w-[100px] h-[100px] rounded"
                              />
                              <div className="flex flex-col items-start gap-1">
                                    <label className="text-start" htmlFor="photo">
                                          Photo
                                    </label>
                                    <input
                                          onChange={() => setNewImage(true)}
                                          type="file"
                                          name="image"
                                          className="border border-gray-500 p-1 rounded mb-3 w-full"
                                    />
                              </div>

                              <div className="flex flex-col items-start gap-1">
                                    <label className="text-start" htmlFor="photo">
                                          Name
                                    </label>
                                    <input
                                          defaultValue={warehouse?.name}
                                          type="text"
                                          name="name"
                                          className="border border-gray-500 p-1 rounded mb-3 w-full"
                                    />
                              </div>
                              {shopInfo.darazLogin && (
                                    <button
                                          type="button"
                                          className={
                                                !shopInfo.darazLogin
                                                      ? "hidden"
                                                      : "bg-gray-500 mt-4 w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                          }
                                          onClick={() => handleButtonClick("daraz")}
                                    >
                                          Synchronize With Daraz
                                    </button>
                              )}
                              {editOn?._id === warehouse?._id &&
                                    (daraz || defaultDarazData) &&
                                    shopInfo.darazLogin && (
                                          <div className="mt-4">
                                                <label className="text-sm">Select Daraz Category</label>
                                                <Select
                                                      // menuPortalTarget={document.body}
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
                                                      defaultValue={defaultDaraz}
                                                      name="darazCategory"
                                                      required
                                                      options={option}
                                                      placeholder="Please select"
                                                />
                                          </div>
                                    )}

                              <br />

                              {shopInfo.wooLogin && (
                                    <button
                                          type="button"
                                          className={
                                                shopInfo.wooLogin &&
                                                "bg-gray-500 w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                                          }
                                          onClick={() => handleButtonClick("wocomarce")}
                                    >
                                          Synchronize With Wocomarce
                                    </button>
                              )}

                              {editOn?._id === warehouse?._id &&
                                    (wocomarce || defaultWooData) &&
                                    shopInfo.wooLogin && (
                                          <div className={!wocomarce && "hidden"}>
                                                <label className="text-sm">Select WooCommerce Category</label>
                                                <Select
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
                                                      name="wocomarceCategory"
                                                      required
                                                      options={
                                                            wooCategory?.categories?.length &&
                                                            wooCategory?.categories?.map((warehouse) => ({
                                                                  value: JSON.stringify(warehouse),
                                                                  label: warehouse.name,
                                                            }))
                                                      }
                                                      placeholder="Please select"
                                                      defaultValue={defaultWoo}
                                                />
                                          </div>
                                    )}
                              <br />
                              <br />
                              <div className="flex justify-start">
                                    <button
                                          type="submit"
                                          className="me-2 rounded bg-green-700 px-6 py-1 text-white"
                                    >
                                          Submit
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
}
