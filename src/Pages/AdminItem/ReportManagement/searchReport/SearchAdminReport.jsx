import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import React from "react";

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
        BrightAlert("Delete successful", "", "success");
      });
  };

  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
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
                      searchData?.map((search) => {
                        const dateData =
                          search?.date ?? new Date().toDateString();
                        return (
                          <tr key={search._id}>
                            <td className="px-4 py-4 text-sm  whitespace-nowrap">
                              {search?.term}
                            </td>

                            <td className="px-4 py-4 text-sm  whitespace-nowrap">
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
                      })}
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
