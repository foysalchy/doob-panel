import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const FaqLayout = () => {
  const [faqs, setFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/admin/faq")
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

  const filteredFaqs = faqs.filter((faq) =>
    faq.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="px-4 pb-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <section className="bg-white ">
          <div className=" ">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <div className="mt-4 space-y-4 lg:mt-8">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search FAQs..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  {filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm"
                    >
                      <div className="">
                        <Link
                          to={`/faq/${faq._id}`}
                          aria-label="Category"
                          title="Visit the East"
                          className="block text-blue-500 text-blue-400 hover:underline"
                        >
                          {faq.title}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ml-4 mt-4 col-span-9 flex">
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FaqLayout;
