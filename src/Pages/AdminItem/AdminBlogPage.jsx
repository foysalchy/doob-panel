import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MetaHelmet from "../../Helmate/Helmate";
const AdminBlogPage = () => {
      const [blogs, setBlogs] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [selectedCategory, setSelectedCategory] = useState("all");

      useEffect(() => {
            fetch("https://doob.dev/api/v1/admin/all-blogs?type=front")
                  .then((response) => response.json())
                  .then((data) => {
                        setBlogs(data);
                  })
                  .catch((error) => {
                        console.error("Error fetching data:", error);
                  });
      }, []);

      // const filteredBlogs = blogs?.filter((blog) =>
      //   blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      // );

      const {
            data: categories = [],
            isLoading: isCategoriesLoading,
            refetch,
      } = useQuery({
            queryKey: ["categories"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/blog-category"
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const blnkData = [{}, {}, {}];

      const filterServices = (category) => {
            setSelectedCategory(category);
      };

      useEffect(() => {
            // Trigger a refetch of services when categories change
            refetch();
      }, [categories, refetch]);

      const location = useLocation();
      const path = decodeURIComponent(location.hash.replace("#", ""));

      useEffect(() => {

            // Update selected category based on path
            if (path) {
                  console.log(selectedCategory);
                  setSelectedCategory(path);
            }

      }, [path]);

      // Filter blogs based on selected category
      const filteredBlogs = blogs?.filter((blog) => {
            // Check if the blog matches the selected category or if the category is 'all'
            const categoryMatch =
                  selectedCategory === "all" || blog?.category === selectedCategory;
            // Check if the blog title contains the search term
            const titleMatch = blog?.title?.toLowerCase()
                  .includes(searchTerm?.toLowerCase());
            return categoryMatch && titleMatch;
      });


      // faq start
        const [faqs, setFaqs] = useState([]);
            const [searchQuery, setSearchQuery] = useState("");
      
            useEffect(() => {
                  fetch("https://doob.dev/api/v1/admin/faq")
                        .then((response) => response.json())
                        .then((data) => {
                              setFaqs(data);
                        })
                        .catch((error) => {
                              console.error("Error fetching data:", error);
                        });
            }, []);
      
            const handleSearch = (event) => {
                  setSearchQuery(event.target.value);
            };
      
            const filteredFaqs = faqs?.filter((faq) =>
                  faq.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
      
            console.log(filteredFaqs);
      

      return (
            <> 
            <div>
                  <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                        <section className="bg-white ">
                              <div className="container">
                                    <div className="-mx-4 flex flex-wrap">
                                          <div className="w-full px-4">
                                                <div className="mx-auto flex items-center justify-between  text-center lg:mb-6">
                                                      <span className="mb-2 block text-lg font-semibold text-primary">
                                                            Our Blogs
                                                      </span>
                                                      

                                                      <div className="relative border border-gray-500 rounded">
                                                            <label for="Search" className="sr-only">
                                                                  {" "}
                                                                  Search{" "}
                                                            </label>

                                                            <input
                                                                  type="text"
                                                                  id="Search"
                                                                  value={searchTerm}
                                                                  onChange={(e) => setSearchTerm(e.target.value)}
                                                                  placeholder="Search for..."
                                                                  className="w-full rounded-md  py-2.5 px-4 pe-10 shadow-sm sm:text-sm"
                                                            />

                                                            <span className="absolute border-gray-700 inset-y-0 end-0 grid w-10 place-content-center">
                                                                  <button
                                                                        type="button"
                                                                        className="text-gray-600 hover:text-gray-700"
                                                                  >
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

                                          <div className="mb-8 overflow-auto">
                                          <div className="flex items-center  gap-4">
                                                      <a
                                                            href={`#all`}
                                                            className={`px-4 py-2 whitespace-nowrap text-sm font-medium uppercase tracking-wide ${selectedCategory === null
                                                                  ? "bg-black text-white"
                                                                  : "bg-gray-300 text-gray-700"
                                                                  }`}
                                                      >
                                                            All
                                                      </a>
                                                      {!isCategoriesLoading &&
                                                            !categories.length ? '' :
                                                            categories?.map((category) => (
                                                                  <a
                                                                        key={category.id}
                                                                        href={`#${category?.title}`}
                                                                        className={`px-4 py-2 whitespace-nowrap text-sm font-medium uppercase tracking-wide ${selectedCategory === category.title
                                                                              ? "bg-black text-white"
                                                                              : "bg-gray-300 text-gray-700"
                                                                              }`}
                                                                  >
                                                                        {category.title}
                                                                  </a>
                                                            ))}
                                                </div>
                                          </div>

                                          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 gap-2 lg:grid-cols-4">
                                                {filteredBlogs?.map((blog, index) => {
                                                      return (
                                                            <BlogCard
                                                                  date={blog.date}
                                                                  to={`/blogs/${blog._id}`}
                                                                  CardTitle={blog.title}
                                                                  CardDescription={blog.message}
                                                                  image={blog.img}
                                                                  id={blog._id}
                                                            />
                                                      );
                                                })}
                                          </div>
                                    </div>


                              </div> 
                        </section>
                  </div>
            </div>
            <div>
                  <MetaHelmet title="Learn" description="Learn about Doob how can use and more and more topic" />
                  <div className="px-4 pb-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
                  <h3 className="text-center text-2xl font-bold">Question/Answer</h3>

                        <section className="bg-white ">
                              <div className=" ">
                                    <div className="grid grid-cols-12 gap-4">
                                          <div className="md:col-span-3 col-span-12">
                                                <div className="mt-4 space-y-4 lg:mt-8">
                                                      <input
                                                            type="text"
                                                            value={searchQuery}
                                                            onChange={handleSearch}
                                                            placeholder="Search FAQs..."
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                                      />
                                                      <div className="hidden md:block">
                                                     
                                                                  
                                                                                 
                                                    {filteredFaqs
  .sort((a, b) => a.sortIndex - b.sortIndex)
  .map((faq, index) => (
    <div
      key={index}
      className="bar overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm py-2 border-b"
    >
      <div className="">
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            const targetElement = document.getElementById(faq._id);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          aria-label="Category"
          title="Visit the FAQ"
           className="block text-blue-500 text-blue-400 hover:underline"
        >
          {faq.title}
        </Link>
      </div>
    </div>
  ))}
</div>
                                                </div>
                                          </div>
                                          <div className="ml-4 mt-4 md:col-span-9  col-span-12 ">
                                          {filteredFaqs
                                                            .sort((a, b) => a.sortIndex - b.sortIndex)
                                                            .map((faq, index) => (
                                                                  <div
                                                                        key={index}
                                                                        className="bar overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm"
                                                                  >
                                                                        <div className=""  id={`${faq._id}`}>
                                                                              <p className="bg-gray-200 px-2 py-2 text-left border-radius mt-4 border">   {faq.title}</p>
                                                                              <div
                                                                                     
                                                                                          className="mb-2 text_editor"
                                                                                          dangerouslySetInnerHTML={{
                                                                                                __html: faq.description,
                                                                                          }}
                                                                              />
                                                                               
                                                                              
                                                                        </div>
                                                                  </div>
                                                            ))}
                                          </div>
                                    </div>
                              </div>
                        </section>
                  </div>
            </div>
            </>
      );
};

export default AdminBlogPage;

const BlogCard = ({ image, id, date, CardTitle, CardDescription }) => {
      const extractInnerText = (html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            return doc.body.textContent || "";
      };

      return (
            <>
                  <Link to={`/blogs/${id}`} className="flex flex-col bg-gray-50">
                        <a
                              rel="noopener noreferrer"
                              href="#"
                              aria-label="Te nulla oportere reprimique his dolorum"
                        >
                              <img
                                    alt={CardTitle}
                                    className="object-contain w-full h-52 dark:bg-gray-200"
                                    src={image}
                              />
                        </a>
                        <div className="flex flex-col flex-1 p-6">
                              <h3 className="flex-1 py-2 text-mediumm font-semibold leadi">
                                    {" "}
                                    {CardTitle}
                              </h3>
                              <p className="text-gray-500">
                                    {extractInnerText(CardDescription?.slice(0, 100))}
                              </p>
                              <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs ">
                                    <span>{new Date(date).toDateString()}</span>
                              </div>
                        </div>
                  </Link>
            </>
      );
};
