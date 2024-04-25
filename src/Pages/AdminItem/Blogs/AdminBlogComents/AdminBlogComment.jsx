import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminBlogComment = () => {
  const { data: adminBlogsComments = [], refetch } = useQuery({
    queryKey: ["adminblogsComments"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/admin/blog-comments`
      );
      const data = await res.json();
      return data.data;
    },
  });

  // const DeleteBlog = (id) => {
  //     confirm()
  //     fetch(`https://backend.doob.com.bd/api/v1/admin/blog-comments-delete?commentId=${id}`, {
  //         method: "DELETE",
  //         headers: {
  //             "content-type": "application/json",
  //         },
  //     })
  //         .then((res) => res.json())
  //         .then((data) => {

  //             if (data.message) {
  //                 Swal.fire(`${data.message}`, "", "success");

  //             }
  //             else {
  //                 Swal.fire("Your Blog Deleted Successfully", "", "success");
  //             }

  //             refetch()

  //         });
  // };
  const DeleteBlog = (blogId, commentId) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      fetch(
        `https://backend.doob.com.bd/api/v1/admin/blog-comments-delete?commentId=${commentId}&blogId=${blogId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            Swal.fire(`${data.message}`, "", "success");
          } else {
            Swal.fire("Your Blog Deleted Successfully", "", "success");
          }
          refetch();
        });
    }
  };

  const publishBlogComment = (id, timestamp, status) => {
    fetch(
      `https://backend.doob.com.bd/api/v1/admin/blog-comments-update-status?blogId=${id}&commentId=${timestamp}&status=${status}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });
  };

  return (
    <div>
      <table className=" divide-y w-full divide-gray-200 ">
        <thead className="bg-gray-50 ">
          <tr>
            <th
              scope="col"
              className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
            >
              <div className="flex items-center gap-x-3">
                <span>User</span>
              </div>
            </th>

            <th
              scope="col"
              className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
            >
              <button className="flex items-center gap-x-2">
                <span>Status</span>
              </button>
            </th>

            <th
              scope="col"
              className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
            >
              <span className="flex items-center gap-x-2">Action</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y  divide-gray-200 ">
          {adminBlogsComments.map((blog) => (
            <tr>
              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                  <div className="flex items-center gap-x-2">
                    <div className="text-xl p-2 px-4 bg-gray-300 rounded-full">
                      {blog?.user?.name?.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-sm font-normal text-gray-600 text-gray-400">
                        {blog?.text}
                      </p>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                {blog.status ? (
                  <button
                    onClick={() =>
                      publishBlogComment(blog.blogId, blog.timeStamp, false)
                    }
                    className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <h2 className="text-sm font-normal text-emerald-500">
                      Active
                    </h2>
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      publishBlogComment(blog.blogId, blog.timeStamp, true)
                    }
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
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => DeleteBlog(blog.blogId, blog.timeStamp)}
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

                  <Link to={`/blogs/${blog.blogId}`}>
                    <BsEye className="transition-colors text-xl duration-200 cursor-pointer text-green-500 hover:text-green-700 focus:outline-none" />
                  </Link>
                </div>
              </td>
              {/* {OpenModal === blog._id && <div className="h-0 w-0">
                            <EditSellerBlog OpenModal={OpenModal} refetch={refetch} setOpenModal={setOpenModal} BlogInfo={blog} />
                        </div>} */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBlogComment;
