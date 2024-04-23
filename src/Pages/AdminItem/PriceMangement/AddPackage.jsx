import React from "react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";

const AddPackage = () => {
  const [formData, setFormData] = useState({
    packageName: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:5001/api/v1/admin/package`,
      //   `https://salenow-v2-backend.vercel.app/api/v1/admin/pricing`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        Swal.fire("Success", "Added Package", "success");
        setFormData({
          packageName: "",
          amount: "",
        });
        e.target.reset();
      });

    console.log(formData, "update.......");
  };

//   console.log(formData);
  return (
    <div>
      <div className="border border-collapse flex justify-center py-20 rounded">
        <div className="w-3/5">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="packageName"
              className="inline-block mb-1 font-medium"
            >
              Package Name
            </label>
            <input
              placeholder="Package Name"
              required
              type="text"
              name="packageName"
              //   value={formData.name}
              onChange={(e) => handleInputChange("packageName", e.target.value)}
              className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
            />
            <label htmlFor="amount" className="inline-block mb-1 font-medium">
              Package Amount
            </label>
            <input
              placeholder="Package Amount"
              type="number"
              name="amount"
              // value={formData.tagname}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              className="flex-grow w-full h-12 px-4 mb-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
            />
            {loading ? (
              <button
                disabled
                className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none "
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
                className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-3"
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <BsArrowRight />
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  Add Package
                </span>
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPackage;
