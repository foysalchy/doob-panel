import React, { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { FaCloudUploadAlt } from "react-icons/fa";
import Lottie from "lottie-react";
import done from "./done1.json";
import { RxCross2 } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";
import { quillModules } from "../../quillModule";
import showAlert from "../../../Common/alert";
const AddSupportTicket = ({ OpenSupport, setOpenSupport, refetch }) => {
      const { user } = useContext(AuthContext);
      const { name, _id, email } = user;

      const [file, setFile] = useState("");
      const [fileName, setFileName] = useState("Provide a Image or PDF");
      const [fileLoad, setFileLoad] = useState(false);
      const [Sccenshort, setSccenshort] = useState(false);
      const [description, setDescription] = useState("");
      const [select, setSelect] = useState(false);

      const apiKey = "2b8c7f515b1f628299764a2ce4c4cb0e";

      const handleInputChange = (event) => {
            setFileLoad(true);
            const formData = new FormData();
            let selected = event.target.files[0];
            formData.append("image", selected);
            const image = uploadImage(formData);
      };

      const uploadImage = async (formData) => {
            const url = `https://doob.dev/api/v1/image/upload-image`;
            const response = await fetch(url, {
                  method: "POST",
                  body: formData,
            });

            const imageData = await response.json();
            setFileName(imageData.imageUrl);
            setFile(imageData.imageUrl);
            return imageData.imageUrl;
      };

      const { data: departments = [] } = useQuery({
            queryKey: ["departments"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/departments");
                  const data = await res.json();
                  return data;
            },
      });

      const handleSubmit = (event) => {
            event.preventDefault();

            const form = event.target;
            const subject = form.elements.subject.value;
            const department = form.elements.department.value;
            const time = new Date();
            const userInfo = {
                  name,
                  _id,
                  email,
            };
            if (department == "") {
                  setSelect(true);
            } else {
                  setSelect(false);
                  const supportInfo = {
                        userInfo,
                        subject,
                        department,
                        time,
                        description,
                        file,
                        comments: [],
                  };
                  fetch(`https://doob.dev/api/v1/support/supportTicketRequest`, {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(supportInfo),
                  })
                        .then((res) => res.json())
                        .finally(() => {
                              Swal.fire({
                                    icon: "success",
                                    title: "Add Successfully!",
                                    showConfirmButton: false,
                                    timer: 1000,
                              });
                              form.reset();
                              setFile();
                              setFileName("Provide a Image or PDF");
                              setDescription("");
                              refetch();
                              setOpenSupport(false);
                        });
            }
      };

      const handleDescriptionChange = (value) => {
            setDescription(value);
      };

      return (
            <div
                  className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${OpenSupport ? "block" : "hidden"
                        }`}
            >
                  <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 text-center ">
                        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] md:px-10 px-3">
                              <div className="pb-2 text-xl font-bold text-white text-center sm:text-2xl">
                                    Request a Support Ticket
                              </div>
                              <div
                                    onClick={() => setOpenSupport(!OpenSupport)}
                                    className="cursor-pointer bg-gray-300 rounded-full  mb-2 p-2 text-2xl hover:bg-gray-400"
                              >
                                    <RxCross2 className="text-xl" />
                              </div>
                        </div>
                        <div className="max-h-[500px] md:px-10 px-3 text-start overflow-y-scroll">
                              <form onSubmit={handleSubmit}>
                                    <div className=" mt-6 w-full">
                                          <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Select Department:
                                          </label>
                                          <select name="department" className="p-2 border rounded w-full">
                                                <option disabled selected value={""}>
                                                      Select a Department
                                                </option>
                                                <option value={"test"}>Test</option>
                                                {departments.map((department) => (
                                                      <option key={department.id} value={department.id}>
                                                            {department.name}
                                                      </option>
                                                ))}
                                          </select>
                                    </div>
                                    {select && (
                                          <small className="text-red-500">Select Department</small>
                                    )}
                                    <div className="my-4">
                                          <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Subject:
                                          </label>
                                          <input
                                                type="text"
                                                name="subject"
                                                className="w-full p-2 border rounded"
                                                required
                                          />
                                    </div>
                                    <div className="mb-4">
                                          <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Describe the issue:
                                          </label>
                                          <ReactQuill
                                                modules={quillModules}
                                                value={description}
                                                onChange={handleDescriptionChange}
                                                className="border rounded "
                                          />
                                    </div>
                                    <div className="">
                                          {!Sccenshort ? (
                                                <button
                                                      type="button"
                                                      className="bg-gray-500 md:w-auto w-full text-white px-4 py-2 rounded hover:bg-gray-700"
                                                      onClick={() => setSccenshort(!Sccenshort)}
                                                >
                                                      Add Screenshot
                                                </button>
                                          ) : (
                                                <button
                                                      type="button"
                                                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                                      onClick={() => {
                                                            setSccenshort(!Sccenshort), setFile("");
                                                      }}
                                                >
                                                      No Screenshot
                                                </button>
                                          )}
                                    </div>
                                    {Sccenshort && (
                                          <label className="flex mb-4 items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer">
                                                {!file ? (
                                                      <FaCloudUploadAlt className="w-6 h-6 text-gray-300 text-gray-500" />
                                                ) : fileLoad ? (
                                                      <Lottie
                                                            className="w-6 h-6"
                                                            animationData={done}
                                                            loop={false}
                                                      />
                                                ) : (
                                                      <Lottie
                                                            className="w-6 h-6"
                                                            animationData={done}
                                                            loop={false}
                                                      />
                                                )}
                                                <h2 className="mx-3 text-gray-400">{fileName}</h2>
                                                <input
                                                      id="dropzone-file"
                                                      onChange={handleInputChange}
                                                      type="file"
                                                      accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                                                      name="photo"
                                                      className="hidden"
                                                />
                                          </label>
                                    )}

                                    <button
                                          type="submit"
                                          className="bg-blue-500 block text-white px-4 mt-4 py-2 md:w-auto w-full rounded hover:bg-blue-700"
                                    >
                                          Submit Request
                                    </button>
                              </form>
                        </div>
                  </div>
            </div>
      );
};

export default AddSupportTicket;
