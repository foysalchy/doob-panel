import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BiEdit } from "react-icons/bi";
import { FaChevronDown, FaChevronUp, FaLongArrowAltRight } from "react-icons/fa";
import { MdDelete, MdOutlineReplay } from "react-icons/md";
import useImageUpload from "../../../../Hooks/UploadImage";
import LoaderData from "../../../../Common/LoaderData";
import BrightAlert from "bright-alert";

const MegaCategoryManagement = () => {
      const { uploadImage } = useImageUpload();
      const { data: megaCategory = [], refetch, isLoading } = useQuery({
            queryKey: ["megaCategory"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/category/megacategory"
                  );
                  const data = await res.json();
                  return data.rows;
            },
      });

      console.log(megaCategory);

      const [itemsPerPage, setItemsPerPage] = useState(parseInt(15));


      const [currentPage, setCurrentPage] = useState(1);

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems =
            (megaCategory?.length && megaCategory?.slice(startIndex, endIndex)) || [];

      // status update
      const statusUpdate = (id, status) => {
            fetch(
                  `https://doob.dev/api/v1/admin/category/megacategory?id=${id}&status=${status}`,
                  {
                        method: "PUT",
                        headers: {
                              "content-type": "application/json",
                        },
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data, "status update");
                        Swal.fire(" Status Updated", "", "success");
                        refetch();
                  });
      };

      const featureStatus = (id, status) => {
            console.log(status);
            fetch(
                  `https://doob.dev/api/v1/admin/category/feature?id=${id}&feature=${status}`,
                  {
                        method: "PUT",
                        headers: {
                              "content-type": "application/json",
                        },
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data, "status update");
                        Swal.fire(" Status Updated", "", "success");
                        refetch();
                  });
      };

      const menuStatus = (id, status) => {
            console.log(status);
            fetch(
                  `https://doob.dev/api/v1/admin/category/menu?id=${id}&menu=${status}`,
                  {
                        method: "PUT",
                        headers: {
                              "content-type": "application/json",
                        },
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data, "status update");
                        Swal.fire(" Status Updated", "", "success");
                        refetch();
                  });
      };

      const style = {
            addBtn: "bg-black text-white px-4 py-2 flex items-center rounded-lg",
      };

      const [editOn, setEditOn] = useState(false);

      const handleEdit = async (e, id) => {
            e.preventDefault();
            const form = e.target;
            const image = form.image;
            const name = form.name.value;
            const slag = form.slag.value;
            const imageFormData = image.files[0];

            const data = {
                  image: imageFormData ? await uploadImage(imageFormData) : editOn?.image,
                  name: name,
                  slag: slag,
            };

            console.log(data, id);

            fetch(
                  `https://doob.dev/api/v1/admin/edit-category/mega_category?id=${id}`,
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
                        Swal.fire(`Category update `, "", "success");
                        refetch();
                  });

            setEditOn(false);
      };

      const DeleteMegaCateGories = (id) => {
            let timerInterval;

            Swal.fire({
                  title: "Deleting...",
                  html: "Please wait <br> <b></b> milliseconds remaining.",
                  timer: 500,
                  timerProgressBar: true,
                  showConfirmButton: false,
                  didOpen: () => {
                        Swal.showLoading();
                        const b = Swal.getHtmlContainer().querySelector("b");
                        timerInterval = setInterval(() => {
                              b.textContent = Swal.getTimerLeft();
                        }, 100);
                  },
                  willClose: () => {
                        clearInterval(timerInterval);
                  },
            }).then((result) => {
                  if (result.dismiss === Swal.DismissReason.timer) {
                        // Timer completed, initiate the fetch for deletion
                        fetch(`https://doob.dev/api/v1/admin/category/mega_category/${id}`, {
                              method: "DELETE",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                        })
                              .then((res) => res.json())
                              .then((data) => {
                                    // Show success message upon successful deletion
                                    Swal.fire({
                                          title: "Category Deleted",
                                          icon: "success",
                                          showConfirmButton: false,
                                          timer: 1500,
                                    });
                                    refetch();
                              })
                              .catch((error) => {
                                    Swal.fire("Error Deleting Seller", "An error occurred", "error");
                              });
                  }
            });
      };



      const category_trash = (id, status) => {


            fetch(`http://localhost:5001/api/v1/admin/category/mega_category_trash?id=${id}`, {
                  method: "PUT",
                  headers: {
                        "content-type": "application/json",
                  },
                  body: JSON.stringify({ status: status }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        if (status) {
                              BrightAlert("This Category on now in Trash");
                        }
                        else {
                              BrightAlert("This Category on now in Active");
                        }

                        refetch();
                  });


      }

      const dropdownRef = useRef(null);
      const [menuOn, setmenuOn] = useState();
      const [trash, settrash] = useState();
      const [selectedOption, setSelectedOption] = useState('All');

      const toggleDropdown = () => setmenuOn(!menuOn);

      const handleOptionClick = (option) => {
            switch (option) {
                  case 'Trash':
                        setSelectedOption(true);
                        break;
                  case 'Without Trash':
                        setSelectedOption(false);
                        break;
                  case 'All':
                        setSelectedOption(null);
                        break;
                  default:
                        setSelectedOption(null);
            }
            setmenuOn(false);
      };

      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setmenuOn(false);
                  }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                  document.removeEventListener('mousedown', handleClickOutside);
            };
      }, []);




      return (
            <div>
                  <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                              <Link to={"add"}>
                                    <button className="group mt-4 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500">
                                          <span className="absolute -start-full transition-all group-hover:start-4">
                                                <FaLongArrowAltRight />
                                          </span>
                                          <span className="text-sm font-medium transition-all group-hover:ms-4">
                                                Add Mega Category
                                          </span>
                                    </button>
                              </Link>

                              <div className="relative inline-flex items-center" ref={dropdownRef}>
                                    <button
                                          onClick={toggleDropdown}
                                          className="group mt-4 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                                    >
                                          <span className="absolute -start-full transition-all group-hover:start-4">
                                                <FaLongArrowAltRight />
                                          </span>
                                          <span className="text-sm font-medium transition-all group-hover:ms-4">
                                                {selectedOption === null ? 'Select Option' : selectedOption === true ? 'Trash' : selectedOption === false ? 'Without Trash' : 'All'}
                                          </span>
                                          <span className="ml-2">
                                                {menuOn ? <FaChevronUp /> : <FaChevronDown />}
                                          </span>
                                    </button>
                                    {menuOn && (
                                          <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                                                <ul className="py-1">
                                                      {['Trash', 'Without Trash', 'All'].map(option => (
                                                            <li
                                                                  key={option}
                                                                  onClick={() => handleOptionClick(option)}
                                                                  className={`cursor-pointer px-4 py-2 text-gray-900 ${selectedOption === (option === 'Trash' ? true : option === 'Without Trash' ? false : null) ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                                                            >
                                                                  {option}
                                                            </li>
                                                      ))}
                                                </ul>
                                          </div>
                                    )}
                              </div>
                        </div>
                        <div className="flex items-center gap-2">
                              <span className="text-sm">Entire per page</span>
                              <select
                                    className="border w-[50px] px-1 py-2 text-sm rounded"
                                    onChange={(e) => setItemsPerPage(e.target.value)}
                              >
                                    <option value={15}>15</option>
                                    <option value={30}>30</option>
                                    <option value={70}>70</option>
                                    <option value={100}>100</option>
                              </select>
                        </div>
                  </div>

                  <div className=" ">
                        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                              <table className="w-full table-auto text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                                          <tr>
                                                <th className="py-3 px-6">Photo</th>
                                                <th className="py-3 px-6">Name</th>
                                                <th className="py-3 px-6">Slag</th>
                                                <th className="py-3 px-6">Date</th>
                                                <th className="py-3 px-6">Status</th>
                                                <th className="py-3 px-6">Action</th>
                                          </tr>
                                    </thead>
                                    <tbody className="text-gray-600 divide-y">
                                          {
                                                isLoading ? (
                                                      <tr>
                                                            <td colSpan="6" className="text-center py-8">
                                                                  <LoaderData />
                                                            </td>
                                                      </tr>
                                                )
                                                      :
                                                      currentItems?.filter(item => {
                                                            if (selectedOption === null) {
                                                                  // Show all items if selectedOption is null
                                                                  return true;
                                                            }
                                                            if (selectedOption === true) {
                                                                  // Show items where item.trash is true
                                                                  return item?.trash === true;
                                                            }
                                                            if (selectedOption === false) {
                                                                  // Show items where item.trash is false or undefined
                                                                  return item?.trash === false || item?.trash === undefined;
                                                            }
                                                            // Default case: show no items
                                                            return false;
                                                      }).map((item, idx) => {
                                                            const formattedTimeStamp = new Date(
                                                                  item.timeStamp
                                                            ).toLocaleString();
                                                            return (
                                                                  <tr key={idx}>
                                                                        <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                                                              <img
                                                                                    src={item.image}
                                                                                    className="w-10 h-10 rounded-full"
                                                                              />
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">{item.slag}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              {formattedTimeStamp}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              {item?.status == "true" ? (
                                                                                    <button
                                                                                          onClick={() => statusUpdate(item?._id, false)}
                                                                                          className="border px-2 py-1 bg-gray-400"
                                                                                    >
                                                                                          Active
                                                                                    </button>
                                                                              ) : (
                                                                                    <button
                                                                                          onClick={() => statusUpdate(item?._id, true)}
                                                                                          className="border px-2 py-1 bg-gray-400"
                                                                                    >
                                                                                          Deactivate
                                                                                    </button>
                                                                              )}
                                                                              <button
                                                                                    onClick={() =>
                                                                                          featureStatus(item?._id, item?.feature ? false : true)
                                                                                    }
                                                                                    className={`${item?.feature ? "bg-green-500" : "bg-red-500"
                                                                                          } text-white ml-2 rounded capitalize px-3 py-1`}
                                                                              >
                                                                                    futures
                                                                              </button>
                                                                              <button
                                                                                    onClick={() =>
                                                                                          menuStatus(item?._id, item?.menu ? false : true)
                                                                                    }
                                                                                    className={`${item?.menu ? "bg-green-500" : "bg-red-500"
                                                                                          } text-white ml-2 rounded capitalize px-3 py-1`}
                                                                              >
                                                                                    menu
                                                                              </button>
                                                                        </td>
                                                                        <td className="px- py-4 items-center whitespace-nowrap">

                                                                              <div className="flex gap-2 items-center">
                                                                                    {!item?.trash && <MdDelete
                                                                                          className="text-red-500 text-xl cursor-pointer"
                                                                                          onClick={() => category_trash(item?._id, true)}
                                                                                    />}
                                                                                    {
                                                                                          item?.trash && <div className="flex gap-2 items-center">
                                                                                                <MdDelete
                                                                                                      className="text-red-500 text-xl cursor-pointer"
                                                                                                      onClick={() => DeleteMegaCateGories(item?._id)}
                                                                                                />
                                                                                                <MdOutlineReplay
                                                                                                      className="text-green-500 text-xl cursor-pointer"
                                                                                                      onClick={() => category_trash(item?._id, false)}
                                                                                                />
                                                                                          </div>
                                                                                    }
                                                                                    <button
                                                                                          onClick={() => setEditOn(item)}
                                                                                          className="text-xl p-1 ml-6"
                                                                                    >
                                                                                          <BiEdit />
                                                                                    </button>
                                                                              </div>
                                                                              <div className="absolute w-full top-0 left-0">
                                                                                    <div
                                                                                          className={`fixed z-[100] flex items-center justify-center ${editOn?._id === item?._id
                                                                                                ? "opacity-1 visible"
                                                                                                : "invisible opacity-0"
                                                                                                } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
                                                                                    >
                                                                                          <div
                                                                                                className={`absolute md:w-[500px] w-full rounded-sm bg-white p-3 pb-5 text-center drop-shadow-2xl ${editOn?._id === item?._id
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
                                                                                                      <g
                                                                                                            strokeLinecap="round"
                                                                                                            strokeLinejoin="round"
                                                                                                      ></g>
                                                                                                      <g>
                                                                                                            <path
                                                                                                                  d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                                                                                                                  fill="#000"
                                                                                                            ></path>
                                                                                                      </g>
                                                                                                </svg>

                                                                                                <form onSubmit={(e) => handleEdit(e, item?._id)}>
                                                                                                      <h1 className="text-lg font-semibold text-center mb-4">
                                                                                                            Edit Mega Category
                                                                                                      </h1>
                                                                                                      <img
                                                                                                            src={item?.image}
                                                                                                            alt=""
                                                                                                            className="w-[100px] h-[100px] rounded"
                                                                                                      />
                                                                                                      <div className="flex flex-col items-start gap-1">
                                                                                                            <label className="text-start" htmlFor="photo">
                                                                                                                  Photo
                                                                                                            </label>
                                                                                                            <input
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
                                                                                                                  defaultValue={item.name}
                                                                                                                  type="text"
                                                                                                                  name="name"
                                                                                                                  className="border border-gray-500 p-1 rounded mb-3 w-full"
                                                                                                            />
                                                                                                      </div>
                                                                                                      <div className="flex flex-col items-start gap-1">
                                                                                                            <label className="text-start" htmlFor="photo">
                                                                                                                  Slag
                                                                                                            </label>
                                                                                                            <input
                                                                                                                  defaultValue={item.slag}
                                                                                                                  type="text"
                                                                                                                  name="slag"
                                                                                                                  className="border border-gray-500 p-1 rounded mb-3 w-full"
                                                                                                            />
                                                                                                      </div>

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
                                                                              </div>
                                                                        </td>
                                                                  </tr>
                                                            );
                                                      })}
                                    </tbody>
                              </table>
                        </div>
                        <br />
                        <div className="mx-auto flex justify-center">
                              <nav aria-label="Page navigation example">
                                    <ul className="inline-flex -space-x-px">
                                          <li>
                                                <button
                                                      onClick={() => setCurrentPage(currentPage - 1)}
                                                      disabled={currentPage === 1}
                                                      className="bg-white border text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-gray-300 leading-tight py-2 px-3 rounded-l-lg"
                                                >
                                                      Prev
                                                </button>
                                          </li>
                                          {Array.from(
                                                { length: Math.ceil(megaCategory?.length / itemsPerPage) },
                                                (_, i) => (
                                                      <li key={i}>
                                                            <button
                                                                  onClick={() => setCurrentPage(i + 1)}
                                                                  className={`bg-white border ${currentPage === i + 1
                                                                        ? "text-blue-600"
                                                                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                                        } border-gray-300 leading-tight py-2 px-3 rounded`}
                                                            >
                                                                  {i + 1}
                                                            </button>
                                                      </li>
                                                )
                                          )}
                                          <li>
                                                <button
                                                      onClick={() => setCurrentPage(currentPage + 1)}
                                                      disabled={
                                                            currentPage ===
                                                            Math.ceil(
                                                                  megaCategory?.length &&
                                                                  megaCategory?.length / itemsPerPage
                                                            )
                                                      }
                                                      className="bg-white border text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-gray-300 leading-tight py-2 px-3 rounded-r-lg"
                                                >
                                                      Next
                                                </button>
                                          </li>
                                    </ul>
                              </nav>
                        </div>
                  </div>
            </div>
      );
};

export default MegaCategoryManagement;
