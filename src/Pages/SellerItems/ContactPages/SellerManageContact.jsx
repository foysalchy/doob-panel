import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import LoaderData from "../../../Common/LoaderData";
import showAlert from "../../../Common/alert";
import useAddDivToTableCells from "../../../Common/useAddDivToTableCells";

const SellerManageContact = () => {
      const { shopInfo } = useContext(AuthContext);

      const {
            data: contact = [],
            refetch,
            isLoading: loadingContact,
      } = useQuery({
            queryKey: ["contact"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/contact/${shopInfo?.shopId}`
                  );
                  const data = await res.json();
                  return data;
            },
      });
      
    
      const statusHandelar = (modal,place) => {
           
            const id = modal._id;
            let status;
            if (place === 'footer') {
                status = modal.footer === true || modal.footer === 'true' ? false : true;
            } else {
                status = modal.modal === true || modal.modal === 'true' ? false : true;
            }
            
           

            fetch(
                  `https://doob.dev/api/v1/shop/contact/status/?id=${id}&status=${status}&place=${place}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ status }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        
                        showAlert(`status change success`, "", "success");
                        refetch();
                  });
      };
      const DeleteCategory = (id) => {
            fetch(`https://doob.dev/api/v1/shop/contact/${shopInfo.shopId}?id=${id}`, {
                  method: "DELETE",
                  headers: {
                        "content-type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert("Contact Information Deleted Successfully", "", "success");
                        refetch();
                  });
      };

      const [searchQuery, setSearchQuery] = useState("");

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };

      const filteredData = contact.filter((item) =>
            item?.media?.toLowerCase().includes(searchQuery?.toLowerCase())
      );
      useAddDivToTableCells()
      return (
            <div>
                    <div className="flex justify-between items-center gap-2">
                  <Link
                        className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-3 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                        to="/seller/manage-contact/add-contact"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <FaArrowRightLong className="h-5 w-5 rtl:rotate-180" />
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                              Add   New
                        </span>
                  </Link>
                  <div className="relative my-3">
                        <input
                              type="text"
                              id="Search"
                              value={searchQuery}
                              onChange={handleSearch}
                              placeholder="Search for..."
                              className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                        />

                        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
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
                  </div></div>
                  {loadingContact && <LoaderData />}
                  <div className="bar  mt-1 ">
                        {filteredData.length ? (
                              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                    <thead className="text-left bg-gray-800 rounded-xl">
                                          <tr>
                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-100">
                                                      Media Name
                                                </th>

                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-100">
                                                      Media URL
                                                </th>
                                               
                                                
                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-100">
                                                      Action
                                                </th>
                                          </tr>
                                    </thead>

                                    <tbody className="divide-y  divide-gray-200">
                                          {filteredData.map((media, index) => (
                                                <tr>
                                                      <td className="whitespace-nowrap  px-4 py-2 font-medium text-gray-900">
                                                            {media.media}
                                                      </td>

                                                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                            {media.URL}
                                                      </td>
                                                      <td className="whitespace-nowrap px-4 gap-2 py-2">
                                                            <button
                                                                  onClick={() => statusHandelar(media,'footer')}
                                                                  className={`inline-block rounded ${media.footer =='true' ? 'bg-green-600' : 'bg-red-600'} px-4 py-2 text-xs font-medium text-white hover:bg-red-700`}

                                                            >
                                                                  Footer
                                                            </button>
                                                            <button
                                                                    onClick={() => statusHandelar(media,'modal')}
                                                                    className={`inline-block rounded ${media.modal =='true' ? 'bg-green-600' : 'bg-red-600'} mx-2 px-4 py-2 text-xs font-medium text-white hover:bg-red-700`}
                                                            >
                                                                  Modal
                                                            </button>
                                                            <button
                                                                  onClick={() => DeleteCategory(media._id)}
                                                                  className="inline-block rounded  bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                                                            >
                                                                  Delete
                                                            </button>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        ) : (
                              <h1>No Data Found</h1>
                        )}
                  </div>
            </div>
      );
};

export default SellerManageContact;
