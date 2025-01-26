import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import EditBlog from "./EditBlog";
import { BsEye } from "react-icons/bs";
import { TbRestore } from "react-icons/tb";
import BrightAlert from "bright-alert";
import LoaderData from "../../../Common/LoaderData";
import showAlert from "../../../Common/alert"
import useAddDivToTableCells from "../../../Common/useAddDivToTableCells";

const AdminBlogs = () => {
      const [draft, setDraft] = useState(false);
      const { data: blogs = [], refetch, isLoading } = useQuery({
            queryKey: ["blogs"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/all-blogs");
                  const data = await res.json();
                  return data;
            },
      });

      const DeleteBlog = (id) => {
            fetch(`https://doob.dev/api/v1/admin/blog`, {
                  method: "DELETE",
                  headers: {
                        "content-type": "application/json",
                  },
                  body: JSON.stringify({ id }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert("Blog Deleted Success", "", "sucess");
                        refetch();
                  });
      };

      const [searchQuery, setSearchQuery] = useState("");

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };
      const [StatusType, setStatusType] = useState(true);
      const [blogType, setBlogType] = useState(false);
      const [trashType, setTrashType] = useState(false);
      const [page_status, set_page_status] = useState('active');
      const [sopen, setSOpen] = useState(false);

     const filteredData = blogs?.filter((item) => {
  // Filter by page_status
  if (page_status === 'all') {
    return true; // Include all items
  } else if (page_status === 'active') {
    if (!item.status) return false; // Exclude inactive items
  } else if (page_status === 'inactive') {
    if (item.status) return false; // Exclude active items
  } else if (page_status === 'trash') {
    if (!item.trash) return false; // Exclude non-trash items
  } else if (page_status === 'draft') {
    if (!item.draft_status) return false; // Exclude non-draft items
  } else {
    if (item.draft !== trash_status) return false; // Exclude items that don't match trash_status
  }

  // Filter by searchQuery
  const matchesSearchQuery =
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item._id ? item._id.toString().includes(searchQuery) : false);

  return matchesSearchQuery;
});

          



      const statusUpdate = (id, status) => {
            fetch(`https://doob.dev/api/v1/admin/blog`, {
                  method: "PUT",
                  headers: {
                        "content-type": "application/json",
                  },
                  body: JSON.stringify({ id, status: status }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert("Blog Status Updated", "", "success");
                        refetch();
                  });
      };

      const [OpenModal, setOpenModal] = useState(false);

      const handleViewDetails = (ticketId) => {
            setOpenModal(ticketId);
      };

      const blogStash = (id, status) => {
            console.log(status);
            fetch(
                  `https://doob.dev/api/v1/admin/blog-trash?id=${id}&status=${status}`,
                  {
                        method: "PUT",
                  }
            ).then(() => {
                  showAlert("Blog Trashed", "", "sucess");;
                  refetch();
            });
      };


useAddDivToTableCells()
      return (
            <div className=" w-full h-full px-3">
                   <div className='md:flex items-center justify-between gap-2'>
                        <div className="flex items-center justify-between">
                              <div className="flex items-center gap-x-3">
                                    <h2 className="text-lg font-medium text-gray-800 ">All Blog</h2>
                                    <span className="px-3 py-1 text-xs  bg-blue-100 rounded-full d text-blue-400">
                                          {blogs?.length}
                                    </span>
                              </div>

                        </div>
                        
                 
                        <div className='md:flex flex-row-reverse items-center justify-between gap-1'>
                             
                              <div className="relative md:w-[250px] w-[100%]  my-2 inline-block mr-1">
                                    <input
                                          type="text"
                                          id="Search"
                                          value={searchQuery}
                                          onChange={handleSearch}
                                          placeholder="Search for..."
                                          className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                                    />

                                    <span className="mr-2 absolute inset-y-0 end-0 grid w-10 place-content-center">
                                          <button type="button" className="text-gray-600 hover:text-gray-700">
                                                <span className="sr-only">Search</span>

                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      strokeWidth="1.5"
                                                      stroke="currentColor"
                                                      className="h-4 w-4 text-black"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                      />
                                                </svg>
                                          </button>
                                    </span>
                              </div>   
                               <div className="flex items-center">                        
                              <Link
                                    className="group mr-3 relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-3 md:px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                                    to="/admin/blog/new-blog"
                              >
                                    <span className="absolute -start-full transition-all group-hover:start-4">
                                          <svg
                                                className="h-5 w-5 rtl:rotate-180"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                          </svg>
                                    </span>

                                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                                          Add New
                                    </span>
                              </Link>
                             
                              <div className="relative inline-block text-left">
                                    <button
                                          style={{textTransform: 'capitalize'}}
                                          onClick={() => setSOpen(!sopen)}
                                          className="    group mr-3 relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-3 md:px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                                          id="menu-button"
                                          aria-expanded="true"
                                          aria-haspopup="true"
                                    >
                                          {page_status} Page
                                          
                                    </button>

                                    {sopen ? (
                                          
                                    <div
                                          className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                          role="menu"
                                          aria-orientation="vertical"
                                          aria-labelledby="menu-button"
                                    >
                                    <div className="py-1" role="none">
                                          <button
                                          onClick={() => {
                                                
                                                set_page_status('all');
                                                setSOpen(!sopen);
                                          }}
                                                className={`block w-full px-4 py-2 text-left text-sm ${
                                                page_status=='all' ? "bg-gray-200" : "hover:bg-gray-100"
                                                }`}
                                                role="menuitem"
                                          >
                                                All Page
                                          </button>
                                          <button
                                          onClick={() => {
                                          
                                                set_page_status('active');
                                                setSOpen(!sopen);
                                          }}
                                                className={`block w-full px-4 py-2 text-left text-sm ${
                                                page_status=='active' ? "bg-gray-200" : "hover:bg-gray-100"
                                                }`}
                                                role="menuitem"
                                          >
                                                Active Page
                                          </button>
                                          <button
                                          onClick={() => {
                                          
                                                set_page_status('inactive');
                                                setSOpen(!sopen);
                                          }}
                                                className={`block w-full px-4 py-2 text-left text-sm ${
                                                page_status=='inactive' ? "bg-gray-200" : "hover:bg-gray-100"
                                                }`}
                                                role="menuitem"
                                          >
                                                Inactive Page
                                          </button>
                                          <button
                                          onClick={() => {
                                          
                                                set_page_status('trash');
                                                setSOpen(!sopen);
                                          }}
                                                className={`block w-full px-4 py-2 text-left text-sm ${
                                                page_status=='trash' ? "bg-gray-200" : "hover:bg-gray-100"
                                                }`}
                                                role="menuitem"
                                          >
                                          Trash Page
                                          </button>
                                          <button
                                          onClick={() => {
                                          
                                                set_page_status('draft');
                                                setSOpen(!sopen);
                                          }}
                                                className={`block w-full px-4 py-2 text-left text-sm ${
                                                      page_status=='draft' ? "bg-gray-200" : "hover:bg-gray-100"
                                                }`}
                                                role="menuitem"
                                          >
                                                Draft Page
                                          </button>

                                    </div>
                                    </div>
                                    ):null}
                              </div> </div>  

                              
                        </div>
                   </div>


            

                  <section className="  mx-auto">
                       

                        <div className=" ">
                              <div className="bar overflow-x-auto px-2 lg:-mx-8">
                                    <div className="w-full py-2 ">
                                          <div className="bar overflow-hidden border md:rounded-lg">
                                                <table className=" w-full divide-y bg- divide-gray-700">
                                                      <thead className="bg-gray-50 ">
                                                            <tr>
                                                                  <th
                                                                        scope="col"
                                                                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                                  >
                                                                        <div className="flex items-center gap-x-3">
                                                                              <span>Name</span>
                                                                        </div>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right  text-gray-400"
                                                                  >
                                                                        <button className="flex items-center gap-x-2">
                                                                              <span>Status</span>
                                                                        </button>
                                                                  </th>

                                                                  <th
                                                                        scope="col"
                                                                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                                                                  >
                                                                        <span className="flex items-center gap-x-2">
                                                                              Action
                                                                        </span>
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody className="bg-white divide-y  divide-gray-200 ">
                                                            {isLoading ? (
                                                                  <tr>
                                                                        <td colSpan="6" className="text-center py-8">
                                                                              <LoaderData />
                                                                        </td>
                                                                  </tr>
                                                            )
                                                                  :
                                                                  filteredData
                                                                        ?.map((blog) => (
                                                                              <tr key={blog?._id + 1}>
                                                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                                          <div className="inline-flex items-center gap-x-3">
                                                                                                <div className="flex items-center gap-x-2">
                                                                                                      <img
                                                                                                            className="object-cover w-10 h-10 rounded"
                                                                                                            srcSet={blog?.img}
                                                                                                            src={blog?.img}
                                                                                                            alt=""
                                                                                                      />
                                                                                                      <div>
                                                                                                            <h2 className="font-medium text-gray-800  ">
                                                                                                                  {blog?.title
                                                                                                                        ?.split(" ")
                                                                                                                        ?.slice(0, 5)
                                                                                                                        .join(" ")}{" "}
                                                                                                                  <span className="text-yellow-600">
                                                                                                                        {blog.draft_status && "Draft"}
                                                                                                                  </span>
                                                                                                            </h2>
                                                                                                            <p className="text-sm font-normal text-gray-600">
                                                                                                                  {new DOMParser()
                                                                                                                        ?.parseFromString(
                                                                                                                              blog.message,
                                                                                                                              "text/html"
                                                                                                                        )
                                                                                                                        ?.body.textContent?.split(" ")
                                                                                                                        ?.slice(0, 5)
                                                                                                                        ?.join(" ")}
                                                                                                            </p>
                                                                                                      </div>
                                                                                                </div>
                                                                                          </div>
                                                                                    </td>
                                                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                                          {blog?.status ? (
                                                                                                <button
                                                                                                      onClick={() => statusUpdate(blog._id, false)}
                                                                                                      className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800"
                                                                                                >
                                                                                                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                                                      <h2 className="text-sm font-normal text-emerald-500">
                                                                                                            Active
                                                                                                      </h2>
                                                                                                </button>
                                                                                          ) : (
                                                                                                <button
                                                                                                      onClick={() => statusUpdate(blog._id, true)}
                                                                                                      className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800"
                                                                                                >
                                                                                                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                                                                      <h2 className="text-sm font-normal text-red-500">
                                                                                                            Inactive
                                                                                                      </h2>
                                                                                                </button>
                                                                                          )}
                                                                                    </td>

                                                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                          <div className="flex px-8  items-center gap-2">
                                                                                                {blog.trash === "true" && (
                                                                                                      <button
                                                                                                            onClick={() => DeleteBlog(blog._id)}
                                                                                                            className=" transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none"
                                                                                                      >
                                                                                                            <svg
                                                                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                                                                  fill="none"
                                                                                                                  viewBox="0 0 24 24"
                                                                                                                  strokeWidth="1.5"
                                                                                                                  stroke="currentColor"
                                                                                                                  className="w-5 h-5"
                                                                                                            >
                                                                                                                  <path
                                                                                                                        strokeLinecap="round"
                                                                                                                        strokeLinejoin="round"
                                                                                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                                                                  />
                                                                                                            </svg>
                                                                                                      </button>
                                                                                                )}
                                                                                                {blog.trash === "true" ? (
                                                                                                      <button
                                                                                                            onClick={() => blogStash(blog._id, false)}
                                                                                                            className="inline-flex items-center px-3 py-1 rounded gap-x-2 text-xl text-green-600"
                                                                                                      >
                                                                                                            <h2 className=" ">
                                                                                                                  <TbRestore />
                                                                                                            </h2>
                                                                                                      </button>
                                                                                                ) : (
                                                                                                      <button
                                                                                                            onClick={() => blogStash(blog._id, true)}
                                                                                                            className="inline-flex items-center px-3 py-1 rounded gap-x-2 "
                                                                                                      >
                                                                                                            <h2 className="text-sm font-normal text-red-500">
                                                                                                                  <svg
                                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                                        fill="none"
                                                                                                                        viewBox="0 0 24 24"
                                                                                                                        strokeWidth="1.5"
                                                                                                                        stroke="currentColor"
                                                                                                                        className="w-5 h-5"
                                                                                                                  >
                                                                                                                        <path
                                                                                                                              strokeLinecap="round"
                                                                                                                              strokeLinejoin="round"
                                                                                                                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                                                                        />
                                                                                                                  </svg>
                                                                                                            </h2>
                                                                                                      </button>
                                                                                                )}
                                                                                                <BiEdit
                                                                                                      onClick={() => handleViewDetails(blog._id)}
                                                                                                      className="transition-colors text-xl duration-200 cursor-pointer text-yellow-500 hover:text-yellow-700 focus:outline-none"
                                                                                                />

                                                                                                <Link to={`/blogs/${blog._id}`}>
                                                                                                      <BsEye className="transition-colors text-xl duration-200 cursor-pointer text-green-500 hover:text-green-700 focus:outline-none" />
                                                                                                </Link>
                                                                                          </div>
                                                                                    </td>
                                                                                    {OpenModal === blog._id && (
                                                                                          <div className="h-0 w-0">
                                                                                                <EditBlog
                                                                                                      OpenModal={OpenModal}
                                                                                                      refetch={refetch}
                                                                                                      setOpenModal={setOpenModal}
                                                                                                      BlogInfo={blog}
                                                                                                />
                                                                                          </div>
                                                                                    )}
                                                                              </tr>
                                                                        ))}
                                                      </tbody>
                                                </table>
                                                {filteredData?.length < 1 && (
                                                      <div className="bg-gray-100 text-center py-4 text-gray-500 text-xl">
                                                            Empty
                                                      </div>
                                                )}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>
            </div>
      );
};

export default AdminBlogs;
