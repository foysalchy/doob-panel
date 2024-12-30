

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MetaHelmet from "../../../Helmate/Helmate";

const MainService = () => {
      const [search, setSearchTerm] = useState('');
     
      const location = useLocation();
      const slag = decodeURIComponent(location.hash).substr(1) ?? 'all';
      const [selectedCategory, setSelectedCategory] = useState(slag? slag:null);
      console.log(selectedCategory,'selectedCategory')
      const { data: services = [], refetch: refetchServices, isLoading: isServicesLoading } = useQuery({
            queryKey: ["services"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/services");
                  const data = await res.json();
                  return data;
            },
      });

      const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
            queryKey: ["categories"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/category");
                  const data = await res.json();
                  return data;
            },
      });




      return (
            <section>
                  <MetaHelmet title="Service" description=" Here you have get all service in our  store  " />
                  <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                        <header className="text-center">
                              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Our Service</h2>
                              <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border border-gray-600 md:w-[500px] w-full p-2 rounded mt-4"
                                    placeholder="Search..."
                              />
                              <p className="max-w-2xl mx-auto mt-4 text-gray-500">Empower Your Sales with Sale Now: Your Ultimate SAS-Based Web App, Providing Sellers a Robust Platform and Exceptional Services for Unmatched Success!</p>
                        </header>

                        <div className="mt-4  overflow-auto">
                              <div className="flex items-center gap-4">
                                    <a
                                 
                                          href={`#all`}
                                          className={`px-4 py-2 text-sm   whitespace-nowrap font-medium uppercase tracking-wide ${selectedCategory === null ? "bg-black text-white" : "bg-gray-300 text-gray-700"}`}
                                          onClick={() => setSelectedCategory(null)}
                                    >
                                          All
                                    </a>
                                    {!isCategoriesLoading && categories.map((category) => (
                                          <a
                                          
                                                href={`#${category.title}`}
                                                key={category.id}
                                                className={`px-4 py-2 text-sm  whitespace-nowrap font-medium uppercase tracking-wide ${selectedCategory === category.title ? "bg-black text-white" : "bg-gray-300 text-gray-700"}`}
                                                onClick={() => setSelectedCategory(category.title)}
                                          >
                                                {category.title}
                                          </a>
                                    ))}
                              </div>
                        </div>

                        {!isServicesLoading ? (
                              <div>
                                    <ul className="grid grid-cols-2 gap-4 mt-8 lg:grid-cols-4">
                                          {!services.length ? '' : services?.filter((service) => selectedCategory === null || service.category === slag)?.filter((service) =>
                                                service?.title?.toLowerCase()?.includes(search.toLowerCase())
                                          ).map((service) => (
                                                <li key={service._id} className=" border border-black ">
                                                      <Link to={`/service/${service._id}`} className="relative block group">
                                                            <img
                                                                  src={service.img}
                                                                  alt={service.title}
                                                                  className="object-contain rounded-md w-full transition duration-500"
                                                            />
                                                            <div className="px-5 py-2 text-center">
                                                                  <h3 className="mb-0 mt-4   text-l font-semibold text-black">{service.title}</h3>
                                                                  <h3 className="mb-2 mt-0 ptitle text-l font-semibold text-black">BDT.{service.price}TK</h3>
                                                                  <Link to={`/service/${service._id}`} className="mt-1.5 inline-block bg-black px-5 py-3 text-xs rounded font-medium uppercase tracking-wide text-white">Buy Now  </Link>
                                                            </div>

                                                      </Link>
                                                </li>
                                          ))}
                                    </ul>
                              </div>
                        ) : (
                              <div className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
                                    {[...Array(3)].map((_, i) => (
                                          <div key={i} className="flex flex-col rounded shadow-md w-full animate-pulse h-96">
                                                <div className="h-48 rounded-t bg-gray-500"></div>
                                                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-900">
                                                      <div className="w-full h-6 rounded bg-gray-500"></div>
                                                      <div className="w-full h-6 rounded bg-gray-500"></div>
                                                      <div className="w-3/4 h-6 rounded bg-gray-500"></div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        )}
                  </div>
            </section>
      );
};

export default MainService;
