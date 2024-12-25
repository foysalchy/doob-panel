import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import MetaHelmet from "../../../Helmate/Helmate";

const FaqLayout = () => {
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
            <div>
                  <MetaHelmet title="Learn" description="Learn about Doob how can use and more and more topic" />
                  <div className="px-4 pb-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
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
      );
};

export default FaqLayout;
