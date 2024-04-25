import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Swal from "sweetalert2";

const Daraz = () => {
  const { data: keys = [], refetch } = useQuery({
    queryKey: ["key"],
    queryFn: async () => {
      const res = await fetch(
        "https://salenow-v2-backend.vercel.app/api/v1/daraz/get-key"
      );
      const data = await res.json();
      return data;
    },
  });

  const uploadData = (e) => {
    e.preventDefault();
    const appkey = e.target.appkey.value;
    const secretkey = e.target.secretkey.value;
    const data = {
      appkey,
      secretkey,
    };
    console.log(data);
    fetch("https://salenow-v2-backend.vercel.app/api/v1/daraz/add-key", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Add Key Successful", "", "success");
        refetch();
      });
  };

  return (
    <div>
      <form
        onSubmit={uploadData}
        className=" mr-4 border border-dashed border-black p-6"
      >
        <div>
          <label for="App Key" className="block text-sm mb-2 text-gray-900 ">
            App Key
          </label>

          <input
            type="text"
            required
            name="appkey"
            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label
            for="App Secret Key"
            className="block text-sm mb-2 text-gray-900 "
          >
            App Secret Key
          </label>

          <input
            type="text"
            required
            name="secretkey"
            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
        >
          <span className="absolute -end-full transition-all group-hover:end-4">
            <BsArrowRight />
          </span>

          <span className="text-sm font-medium transition-all group-hover:me-4">
            Set Information
          </span>
        </button>
      </form>

      <div>
        {keys.map((key) => (
          <div className="text-center my-10">
            <h1>{key.appkey}</h1>
            <p>{key.secretkey}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Daraz;
