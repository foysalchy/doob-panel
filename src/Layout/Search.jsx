import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/UserProvider";
import { Link } from "react-router-dom";

const Search = () => {
  const { search, setSearch } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const searchData = async () => {
    const term = searchTerm;
    console.log(
      `https://salenow-v2-backend.vercel.app/api/v1/admin/search?term=${encodeURIComponent(
        term
      )}`
    );
    try {
      const response = await fetch(
        `https://salenow-v2-backend.vercel.app/api/v1/admin/search?term=${encodeURIComponent(
          term
        )}`
      );
      const data = await response.json();
      console.log(data);
      setSearchResults(data);

      // Update the context with the current search term
      setSearch(term);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };
  const handleInputChange = (e) => {
    const input = e.target.value;
    console.log(input);
    setSearchTerm(input);
    setSearchResults();

    fetch(
      `https://salenow-v2-backend.vercel.app/api/v1/admin/search-history?term=${encodeURIComponent(
        input
      )}`
    )
      .then((response) => response.json())
      .then((data) => setSearchHistory(data));
  };

  return (
    <div>
      <div>
        <div
          className={`fixed z-50 left-0 bg-opacity-70 bg-gray-500 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 px-4 py-5 ${
            search ? "block" : "hidden"
          }`}
        >
          <div>
            <div className="flex gap-2 justify-center">
              <div className="w-96 ">
                <div className="relative ">
                  <label htmlFor="Search" className="sr-only">
                    {" "}
                    Search{" "}
                  </label>

                  <input
                    value={searchTerm}
                    onChange={handleInputChange}
                    type="text"
                    id="Search"
                    placeholder="Search for..."
                    className="w-full p-2 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                  />

                  <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-700"
                      onClick={searchData}
                    >
                      <span className="sr-only">Search</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
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
              </div>
              <button onClick={() => setSearch(false)}>X</button>
            </div>
            {/* Display search history suggestions */}
            <div className="mt-4 w-[800px]">
              <div className="flex flex-wrap justify-center gap-2">
                {searchHistory.slice(0, 10).map((item, index) => (
                  <button
                    className="border-2 text-sm px-2 rounded-2xl "
                    onClick={() => setSearchTerm(item.term)}
                    key={index}
                  >
                    {item.term}
                  </button>
                ))}
              </div>
            </div>
            {/* Display search results */}
            <div className="mt-4 ">
              <ul>
                {searchResults?.data?.productCollections
                  ?.filter((p) => p.adminWare)
                  .map((product, index) => (
                    <li>
                      <Link
                        onClick={() => {
                          setSearch(false), setSearchHistory();
                        }}
                        to={`/products/${product._id}`}
                        className="text-white"
                        key={index}
                      >
                        {product?.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="mt-4">
              <ul>
                {searchResults?.data?.serviceCollections?.map(
                  (service, index) => (
                    <li key={index}>
                      {" "}
                      <Link
                        to={`/service/${service._id}`}
                        onClick={() => {
                          setSearch(false), setSearchHistory();
                        }}
                      >
                        {service.title}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
