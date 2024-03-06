import JoditEditor from "jodit-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import Swal from "sweetalert2";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BsArrowRight } from "react-icons/bs";
import BrightAlert from "bright-alert";

const AddProduct = () => {
  // Define the query for GET request
  const { data: Commission = {}, isLoading: isCategoriesLoading, refetch } = useQuery({
    queryKey: ['Commission'],
    queryFn: async () => {
      const res = await fetch('https://salenow-v2-backend.vercel.app/api/v1/admin/get-commission-percent');
      const data = await res.json();
      console.log(data);
      return data.data;
    },
  });



  const [loading, setLoading] = useState(false)

  const handleUpload = (e) => {
    e.preventDefault();
    setLoading(true)
    const newProduct = e.target.Commission.value
    const body = { Commission: newProduct }
    fetch("https://salenow-v2-backend.vercel.app/api/v1/admin/add-commission-percent", {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).then((data) => {
      BrightAlert()
      setLoading(false),
        refetch()
    })
  };

  return (
    <div>
      <div className=" mx-auto overflow-hidden  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <h1 className="text-2xl font-bold mt-5">
          Publish your product image and information
        </h1>
        <div className="p-10 border-2 rounded m-10">
          <form onSubmit={handleUpload} className="space-y-4  ">
            <div className="border border-collapse p-4">
              <h1>Product Commission : {Commission?.Commission}</h1>
              <div className="mt-4">
                <label className=" text-black text-sm " htmlFor="Commission">
                  Commission
                </label>
                <input
                  required
                  className="w-full mt-1 rounded-lg border border-gray-900 px-3 py-2 text-sm"
                  placeholder="$80"
                  type="number"
                  id="Commission"
                  name="Commission"
                />
              </div>
            </div>
            <div className="mt-4">
              {loading ? (
                <button
                  disabled
                  className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
                >
                  <span className="text-sm font-medium">Loading...</span>
                  <svg
                    className="animate-spin h-4 w-4 ml-3 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
                >
                  <span className="absolute -end-full transition-all group-hover:end-4">
                    <BsArrowRight />
                  </span>
                  <span className="text-sm font-medium transition-all group-hover:me-4">
                    Add Product
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
