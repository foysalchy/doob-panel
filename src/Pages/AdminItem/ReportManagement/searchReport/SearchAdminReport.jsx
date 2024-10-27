import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import React from "react";
import showAlert from "../../../../Common/alert";
export default function SearchAdminReport() {
      const {
            data: searchData = [],
            isLoading,
            refetch,
      } = useQuery({
            queryKey: ["adminSearchData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/get-all-search`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      console.log(searchData);

      const DeleteSearch = (id) => {
            fetch(`https://doob.dev/api/v1/admin/delete-search?id=${id}`, {
                  method: "DELETE",
                  headers: {
                        "content-type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        // alert("Delete successful");
                        refetch();
                        showAlert("Delete successful", "", "success");
                  });
      };

      return (
            <div>
                  <section className="container px-4 mx-auto">
                        <div className="flex flex-col">
                              <div className="-mx-4 -my-2 bar overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                          <div className="bar overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                      <thead className="">
                                                            <tr>
                                                                  <th
                                                                        scope="col"
                                                                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right "
                                                                  >
                                                                        <div className="flex items-center gap-x-3">Search</div>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                                                                  >
                                                                        Date
                                                                  </th>

                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                                                                  >
                                                                        Text
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody className="0">
                                                            {isLoading && (
                                                                  <h2 className="text-black">Loading Data..</h2>
                                                            )}
                                                            {!isLoading &&
                                                                  (() => {
                                                                        // Step 1: Create a Map to store the frequency of each term
                                                                        const termCountMap = new Map();

                                                                        // Step 2: Count the occurrences of each term
                                                                        searchData?.forEach(search => {
                                                                              const term = search.term;
                                                                              termCountMap.set(term, (termCountMap.get(term) || 0) + 1);
                                                                        });

                                                                        // Step 3: Filter the searchData to only keep unique terms
                                                                        const uniqueTerms = new Set();
                                                                        const filteredData = searchData?.filter(search => {
                                                                              if (!uniqueTerms.has(search.term)) {
                                                                                    uniqueTerms.add(search.term);
                                                                                    return true;
                                                                              }
                                                                              return false;
                                                                        });

                                                                        // Step 4: Render the filtered data along with the count of each term
                                                                        return filteredData?.map((search) => {
                                                                              const dateData = search?.date ?? new Date().toDateString();
                                                                              const qty = search?.quantity ? search?.quantity : 0;
                                                                              return (
                                                                                    <tr key={search._id}>
                                                                                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                                {search?.term} ({termCountMap.get(search.term) + qty})
                                                                                          </td>
                                                                                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                                {new Date(dateData).toDateString()}
                                                                                          </td>
                                                                                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                                <div className="flex items-center gap-x-6">
                                                                                                      <button
                                                                                                            onClick={() => DeleteSearch(search._id)}
                                                                                                            className="bg-red-500 text-white px-2 py-1 rounded-md"
                                                                                                      >
                                                                                                            Delete
                                                                                                      </button>
                                                                                                </div>
                                                                                          </td>
                                                                                    </tr>
                                                                              );
                                                                        });
                                                                  })()
                                                            }

                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>
            </div>
      );
}
