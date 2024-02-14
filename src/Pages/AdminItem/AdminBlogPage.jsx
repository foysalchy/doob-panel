import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://backend.doob.com.bd/api/v1/admin/all-blogs")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">

        <section className="bg-white ">
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                  <span className="mb-2 block text-lg font-semibold text-primary">
                    Our Blogs
                  </span>
                  <h2 className="mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[40px]">
                    Our Recent Blogs
                  </h2>
                  <p className="text-base text-gray-700 mb-4 ">
                    There are many variations of passages of Lorem Ipsum available
                    but the majority have suffered alteration in some form.
                  </p>


                  <div className="relative border border-gray-500 rounded">
                    <label for="Search" className="sr-only"> Search </label>

                    <input
                      type="text"
                      id="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search for..."
                      className="w-full rounded-md  py-2.5 px-4 pe-10 shadow-sm sm:text-sm"
                    />

                    <span className="absolute border-gray-700 inset-y-0 end-0 grid w-10 place-content-center">
                      <button type="button" className="text-gray-600 hover:text-gray-700">
                        <span className="sr-only">Search</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                          />
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="-mx-4 flex flex-wrap">
              {filteredBlogs.map((blog, index) => {
                console.log(blog)
                return (<BlogCard
                  date={blog.date}
                  to={`/blogs/${blog._id}`}
                  CardTitle={blog.title}
                  CardDescription={blog.message}
                  image={blog.img}
                />)
              }
              )}

            </div>
          </div>
        </section>
      </div>

    </div>
  );
};

export default AdminBlogPage;

const BlogCard = ({ image, to, date, CardTitle, CardDescription }) => {

  const extractInnerText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-10 w-full">
          <div className="mb-8 overflow-hidden rounded">
            <img src={image} alt="" className="w-full" />
          </div>
          <div>
            {date && (
              <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                {new Date(date).toDateString()}
              </span>
            )}
            <h3>
              <Link
                to={to}
                className="mb-4 inline-block text-xl font-semibold text-black hover:text-primary  sm:text-2xl lg:text-xl xl:text-2xl"
              >
                {CardTitle}
              </Link>
            </h3>
            <small>{extractInnerText(CardDescription?.slice(0, 300))}</small>
            {/* <div
              className="text-base text-body-color text-black-6"
              dangerouslySetInnerHTML={{
                __html: CardDescription.slice(0, 150) + "...",
              }}
            /> */}

          </div>
        </div>
      </div>
    </>
  );
};