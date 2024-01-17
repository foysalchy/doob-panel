import React from "react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Select from 'react-select';
import Swal from "sweetalert2";

const AddPrice = () => {
  const [sellerRoutes, setSellerRoutes] = useState(null);
  const [selectLimit, setSelectLimit] = useState(false);
  const [limitValue, setLimitValue] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    tagname: "",
    best: "",
    timeDuration: "",
    benefits: [""],
    permissions: []
  });
  const [loading, setLoading] = useState(false);
  // react selector
  const options = [
    { name: 'Domain Management', route: 'domain-management' },
    { name: 'Channel Integration', route: 'channel-integration' },
    { name: 'Warehouse', route: 'warehouse' },
    { name: 'Staf Account', route: 'staf-account' },
    { name: 'POS', route: 'pos' },
    // Add more options as needed
  ];

  const handleChange = (selectedOption) => {
    setSellerRoutes(selectedOption)
    console.log('Selected Option:', sellerRoutes);
    setFormData({
      ...formData,
      permissions: selectedOption
    });
  };


  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

  };

  const handleBenefitChange = (index, value) => {
    const benefits = [...formData.benefits];
    benefits[index] = value;
    setFormData({
      ...formData,
      benefits,
    });
  };

  const handleAddBenefit = () => {
    setFormData({
      ...formData,
      benefits: [...formData.benefits, ""],
    });
  };

  const handleRemoveBenefit = (index) => {
    const benefits = [...formData.benefits];
    benefits.splice(index, 1);
    setFormData({
      ...formData,
      benefits,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/pricing`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        Swal.fire("success", "Your Category Publish Successfully", "success");
        setFormData({
          name: "",
          price: "",
          tagname: "",
          best: "",
          timeDuration: "",
          benefits: [""],
          permissions: [""]
        });

      });

    console.log(formData, "update.......");
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/pricing`, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       ...formData,
  //       permissions: sellerRoutes, // Include selected permissions in formData
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setLoading(false);
  //       Swal.fire("success", "Your Category Publish Successfully", "success");
  //       setFormData({
  //         name: "",
  //         price: "",
  //         tagname: "",
  //         best: "",
  //         timeDuration: "",
  //         benefits: [""],
  //         permissions: [], // Clear selected permissions after submit
  //       });
  //     });

  //   console.log(formData, "update.......");
  // };

  return (
    <div>

      <div className="border border-collapse flex justify-center py-20 rounded">
        <div className="w-3/5">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="firstName"
              className="inline-block mb-1 font-medium"
            >
              Pricing Name
            </label>
            <input
              placeholder="Business"
              required
              type="text"
              name="priceName"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
            />
            <label
              htmlFor="firstName"
              className="inline-block mb-1 font-medium"
            >
              Tag Name
            </label>
            <input
              placeholder="Most Popular"
              type="text"
              name="tagname"
              value={formData.tagname}
              onChange={(e) => handleInputChange("tagname", e.target.value)}
              className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
            />

            <label
              htmlFor="firstName"
              className="inline-block mb-1 font-medium"
            >
              Pricing Price
            </label>
            <input
              placeholder="$50"
              required
              type="text"
              name="pricingPrice"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
            />

            <div>
              <label
                for="HeadlineAct"
                className="inline-block mb-1 font-medium"
              >
                Time Duration
              </label>

              <div className="relative mt-1.5">
                <input
                  onChange={(e) =>
                    handleInputChange("timeDuration", e.target.value)
                  }
                  type="text"
                  list="HeadlineActArtist"
                  id="HeadlineAct"
                  className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                  placeholder="Please select"
                />
              </div>

              <datalist name="HeadlineAct" id="HeadlineActArtist">
                <option value="10Days">10 days</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Lifetime">Lifetime</option>
              </datalist>
            </div>
            <div>
              <label
                for="HeadlineAct"
                className="inline-block mb-1 font-medium"
              >
                Is it Best
              </label>

              <select
                onChange={(e) => handleInputChange("best", e.target.value)}
                name="best"
                id="HeadlineAct"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            {/* multiple selector */}
            <div>
              <label>Selar permission</label>
              <Select
                options={options}
                isMulti // for multiple selection
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.route}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>
                Benefits:
                {formData.benefits.map((benefit, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      value={benefit}
                      className="flex-grow w-full mt-4 h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                      onChange={(e) =>
                        handleBenefitChange(index, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="bg-red-500 p-2  px-5 rounded inline-block inline-block"
                      onClick={() => handleRemoveBenefit(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </label>
            </div> <br />
            <label>Daraz Limit:</label><br />
            <div className="flex items-center mt-3 gap-3">
              <label htmlFor="ck"><input checked={selectLimit} onChange={() => setSelectLimit(!selectLimit)} type="checkbox" id="ck" /> Life Time</label>
              <input onChange={(e) => setLimitValue(e.target.value)} name="darazLimit" type="tel" className="border px-2 py-1 rounded" placeholder="daraz limit" />
            </div>
            <div className="flex gap-5 items-start mt-10">
              <button
                type="button"
                className="bg-green-500 p-2 px-5 rounded inline-block"
                onClick={handleAddBenefit}
              >
                Add New Benefit Option
              </button>

              {
                loading ?
                  <button disabled className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none ">
                    <span className="text-sm font-medium">
                      Loading...
                    </span>
                    <svg className="animate-spin h-4 w-4 ml-3 text-white" viewBox="0 0 24 24">

                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    </svg>
                  </button>

                  :
                  <button type='submit'
                    className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none "

                  >
                    <span className="absolute -end-full transition-all group-hover:end-4">
                      <BsArrowRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:me-4">
                      Upload Price
                    </span>
                  </button>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPrice;
