import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { ShopAuthProvider } from "../../../../../../AuthProvider/ShopAuthProvide";
import { FaFilter, FaStar } from "react-icons/fa6";
import { IoGrid, IoListSharp } from "react-icons/io5";
import { CgClose } from "react-icons/cg";

const CategoryByProduct = () => {
      const products = useLoaderData();
      // const { shopInfo } = useContext(AuthContext);
      const pathname = window.location.pathname;
      const idMatch = pathname.match(/\/shop\/([^/]+)/);
      const [filteredData, setFilteredData] = useState(products?.data);
      const shopId = idMatch ? idMatch[1] : null;
      const [minPrice, setMinPrice] = useState(false);
      const [maxPrice, setMaxPrice] = useState(false);
      const [checkedBrands, setCheckedBrands] = useState([]);
      const [brands, setBrands] = useState([]);
      const [isGrid, setIsGrid] = useState("list");
      const [selectedItem, setSelectedItem] = useState([]);
      const [openModal, setOpenModal] = useState(false);

      const { data: categories = [], isLoading, refetch } = useQuery({
            queryKey: ["categories"],
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/shop/category/get/${shopId}`);
                  const data = await res.json();
                  return data;
            },
      });
      const { data: seller_brands = [] } = useQuery({
            queryKey: ["seller_brands"],
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/brands/get/${shopId}`);
                  const data = await res.json();
                  return data.data;
            },
      });






      const [categroyValue, setCategoryValue] = useState("");
      const [selectedValues, setSelectedValues] = useState([]);
      const [loadingProducts, setLoadingProducts] = useState(false);
      const [filteredProducts, setFilteredProducts] = useState([]);

      // Function to fetch filtered products
      const fetchFilteredProducts = async () => {
            setLoadingProducts(true);

            const brandNames = JSON.stringify(selectedBrandValues);
            const params = new URLSearchParams();

            params.append("categories", categroyValue);



            if (min) {
                  params.append("minPrice", min);
            }

            if (max) {
                  params.append("maxPrice", max);
            }

            if (selectedBrandValues.length) {
                  params.append("brandName", brandNames);
            }

            if (selectedRatings.length) {
                  params.append("rating_count", selectedRatings);
            }


            const url = `https://doob.dev/api/v1/seller/filter-products?${params.toString()}`;
            console.log(url, "url");
            const res = await fetch(url);
            const data = await res.json();
            setFilteredProducts(data);
            setLoadingProducts(false);
      };




      const [showAllBrands, setShowAllBrands] = useState(false);
      const [selectedBrandValues, setSelectedBrandValues] = useState([]);


      const handleBrandCheck = (key) => {
            const isSelected = selectedBrandValues.includes(key);
            const selectItm = selectedItem.includes(key);
            let updatedSelect;
            let updatedSelectedValues;
            if (isSelected) {
                  updatedSelectedValues = selectedBrandValues?.filter(
                        (value) => value !== key
                  );
            } else {
                  updatedSelectedValues = [...selectedBrandValues, key];
            }
            setSelectedBrandValues(updatedSelectedValues);

            if (selectItm) {
                  updatedSelect = selectedItem.filter((value) => value !== key);
            } else {
                  updatedSelect = [...selectedItem, key];
            }

            setSelectedItem(updatedSelect);
      };

      useEffect(() => {
            filterWithBrand(selectedValues);
      }, [selectedValues]);

      const filterWithBrand = (brand) => {
            console.log(brand, "Brands....");
      };

      const allFeatures = [
            { key: "red", value: "Red" },
            { key: "metardo", value: "Metardo" },
            { key: "iPhone_12_pro", value: "iPhone 12 Pro" },
            { key: "macMini", value: "Mac Mini" },
            { key: "watch", value: "Watch" },
      ];

      const [selectedFeature, setSelectedFeature] = useState([]);
      const [showAllFeature, setShowAllFeature] = useState(false);



      const handleFeatureCheck = (key) => {
            const isSelected = selectedValues.includes(key);
            const selectItm = selectedItem.includes(key);
            let updatedSelect;
            let updatedSelectedValues;
            if (isSelected) {
                  updatedSelectedValues = selectedValues?.filter((value) => value !== key);
            } else {
                  updatedSelectedValues = [...selectedValues, key];
            }
            setSelectedValues(updatedSelectedValues);
            // Log all selected features
            setSelectedFeature(updatedSelectedValues);
      };


      const [minValue, set_minValue] = useState(25);
      const [maxValue, set_maxValue] = useState(75);
      const handleInput = (e) => {
            set_minValue(e.minValue);
            set_maxValue(e.maxValue);
      };


      const rating = [
            { key: "1", value: 1 },
            { key: "2", value: 2 },
            { key: "3", value: 3 },
            { key: "4", value: 4 },
            { key: "5", value: 5 },
      ];

      const myRating = (key) => {
            const stars = Array.from({ length: key }, (_, index) => index + 1);
            return stars;
      };

      const [selectedRatings, setSelectedRatings] = useState([]);

      const handleCheckboxChange = (event, ratingKey) => {
            if (event.target.checked) {
                  setSelectedRatings((prev) => [...prev, ratingKey]);
            } else {
                  setSelectedRatings((prev) => prev.filter((key) => key !== ratingKey));
            }
      };

      const closeSelectedItem = (data) => {
            const findData = selectedItem.filter((item) => item !== data);
            setSelectedItem(findData);
      };

      const [min, setMin] = useState(0);
      const [max, setMax] = useState(0);

      const handleSubmitPrice = (e) => {
            e.preventDefault();
            const min = e.target.min.value;
            const max = e.target.max.value;

            setMin(parseInt(min));
            setMax(parseInt(max));
      };

      const filterAllData = (
            categoryValue,
            brandNames,
            products,
            selectedFeature,
            selectedRatings,
            minPrice,
            maxPrice
      ) => {
            if (
                  categoryValue === "" &&
                  brandNames.length === 0 &&
                  selectedRatings.length === 0 &&
                  minPrice === 0 &&
                  maxPrice === 0
            ) {
                  return products?.data;
            }

            return products?.data?.filter((product) => {
                  const categoryMatch =
                        categoryValue === "" ||
                        product.categories.some(
                              (category) =>
                                    category?.name.toLowerCase() === categoryValue.toLowerCase()
                        );

                  const brandMatch =
                        brandNames.length === 0 || brandNames.includes(product.brandName);

                  const featureMatch =
                        selectedFeature.length === 0 ||
                        product?.variations.some((variation) => {
                              return selectedFeature.some(
                                    (nameObj) => nameObj.toLowerCase() === variation?.name.toLowerCase()
                              );
                        });

                  const ratingMatch =
                        selectedRatings.length === 0 ||
                        selectedRatings.includes(product.rating_count.toString());

                  const priceMatch =
                        (minPrice === 0 || parseInt(product.price) >= minPrice) &&
                        (maxPrice === 0 || parseInt(product.price) <= maxPrice);

                  return (
                        categoryMatch && brandMatch && featureMatch && ratingMatch && priceMatch
                  );
            });
      };

      // const filterData = filterAllData(
      //   categroyValue,
      //   selectedBrandValues,
      //   products?.data,
      //   selectedFeature,
      //   selectedRatings,
      //   min,
      //   max
      // );

      useEffect(() => {
            fetchFilteredProducts();
      }, [selectedBrandValues, min, max, selectedRatings, categroyValue]);

      const filterData = filteredProducts;

      return (
            <section className="text-gray-600 body-font">
                  <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                        <div className="md:grid gap-3 grid-cols-4">
                              <div className="">
                                    <div className=" md:flex hidden flex-col gap-2">
                                          <div className="space-y-2">
                                                <details className="overflow-hidden  border-t [&_summary::-webkit-details-marker]:hidden">
                                                      <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white py-2 px-4 text-gray-900 transition">
                                                            <span className="text-md font-bold"> Category </span>

                                                            <span className="transition group-open:-rotate-180">
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
                                                                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                                        />
                                                                  </svg>
                                                            </span>
                                                      </summary>

                                                      <div className=" border-gray-200 bg-white">
                                                            <ul className="space-y-1 px-4 pb-4 pt-0">
                                                                  {categories.length &&
                                                                        categories
                                                                              .slice(
                                                                                    0,
                                                                                    showAllBrands ? categories.length : 4
                                                                              )
                                                                              .map((itm) => (
                                                                                    <li key={itm.key}>
                                                                                          <button
                                                                                                onClick={() => setCategoryValue(itm?.name)}
                                                                                                className="inline-flex hover:text-blue-600 duration-150 items-center gap-2"
                                                                                          >
                                                                                                <span className="text-sm font-medium">
                                                                                                      {itm.name}
                                                                                                </span>
                                                                                          </button>
                                                                                    </li>
                                                                              ))}
                                                                  {categories.length > 4 && (
                                                                        <li className="text-blue-500">
                                                                              <button
                                                                                    onClick={() => setShowAllBrands(!showAllBrands)}
                                                                              >
                                                                                    {!showAllBrands ? "Show All" : "Show Less"}
                                                                              </button>
                                                                        </li>
                                                                  )}
                                                            </ul>
                                                      </div>
                                                </details>
                                          </div>

                                          <div className="space-y-2">
                                                <details className="overflow-hidden rounded border-t border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                                                      <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white px-4 py-2 text-gray-900 transition">
                                                            <span className="text-md font-bold"> Brands </span>

                                                            <span className="transition group-open:-rotate-180">
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
                                                                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                                        />
                                                                  </svg>
                                                            </span>
                                                      </summary>

                                                      <div className="  border-gray-200 bg-white">
                                                            <ul className="space-y-1 border-gray-200 px-4 pb-4 pt-2">
                                                                  {seller_brands.length &&
                                                                        seller_brands
                                                                              .slice(0, seller_brands ? seller_brands.length : 4)
                                                                              .map((itm) => (
                                                                                    <li key={itm._id}>
                                                                                          <label
                                                                                                htmlFor={itm.name}
                                                                                                className="inline-flex items-center gap-2"
                                                                                          >
                                                                                                <input
                                                                                                      type="checkbox"
                                                                                                      id={itm.key}
                                                                                                      className="h-5 w-5 rounded border-gray-300"
                                                                                                      onChange={() => handleBrandCheck(itm.name)}
                                                                                                />
                                                                                                <span className="text-sm font-medium text-gray-700">
                                                                                                      {itm.name}
                                                                                                </span>
                                                                                          </label>
                                                                                    </li>
                                                                              ))}
                                                                  {seller_brands.length > 4 && (
                                                                        <li className="text-blue-500">
                                                                              <button
                                                                                    onClick={() => setShowAllBrands(!showAllBrands)}
                                                                              >
                                                                                    {!showAllBrands ? "Show All" : "Show Less"}
                                                                              </button>
                                                                        </li>
                                                                  )}
                                                            </ul>
                                                      </div>
                                                </details>
                                          </div>


                                          {/*---------------------*/}
                                          {/*        Price        */}
                                          {/*---------------------*/}
                                          <div className="space-y-2">
                                                <details className="overflow-hidden border-t border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                                                      <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white px-4 pt-4  text-gray-900 transition">
                                                            <span className="text-md font-bold"> Price </span>

                                                            <span className="transition group-open:-rotate-180">
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
                                                                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                                        />
                                                                  </svg>
                                                            </span>
                                                      </summary>

                                                      <div className="  bg-white">
                                                            {/* <MultiRangeSlider
                                            min={0}
                                            max={100}
                                            className="shadow-0"
                                            ruler={false}
                                            thumbLeftColor={'blue'}
                                            thumbRightColor={'blue'}
                                            barInnerColor={'#0375e8'}
                                            step={5}
                                            minValue={minValue}
                                            maxValue={maxValue}
                                            onInput={(e) => {
                                                handleInput(e);
                                            }}
                                        /> */}

                                                            <form
                                                                  onSubmit={handleSubmitPrice}
                                                                  className="md:p-4 pb-4 pt-1"
                                                            >
                                                                  <div className="flex justify-between gap-4">
                                                                        <div>
                                                                              <span>Min</span>
                                                                              <label
                                                                                    htmlFor="FilterPriceFrom"
                                                                                    className="flex items-center gap-2  ring-1 ring-gray-500 rounded px-2 py-1"
                                                                              >
                                                                                    <span className="text-xl font-semibold text-gray-600">
                                                                                          ৳
                                                                                    </span>
                                                                                    <input
                                                                                          defaultValue={minPrice}
                                                                                          type="number"
                                                                                          name="min"
                                                                                          id="FilterPriceFrom"
                                                                                          placeholder="From"
                                                                                          className="w-full"
                                                                                    />
                                                                              </label>
                                                                        </div>

                                                                        <div>
                                                                              <span>Max</span>
                                                                              <label
                                                                                    htmlFor="FilterPriceTo"
                                                                                    className="flex items-center gap-2  ring-1 ring-gray-500 rounded px-2 py-1"
                                                                              >
                                                                                    <span className="text-xl font-semibold text-gray-600">
                                                                                          ৳
                                                                                    </span>
                                                                                    <input
                                                                                          defaultValue={maxPrice}
                                                                                          type="number"
                                                                                          name="max"
                                                                                          id="FilterPriceTo"
                                                                                          placeholder="To"
                                                                                          className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                                                    />
                                                                              </label>
                                                                        </div>
                                                                  </div>

                                                                  <button
                                                                        type="submit"
                                                                        className="text-blue-600 w-full py-2 rounded border border-gray-500 mt-3"
                                                                  >
                                                                        Apply
                                                                  </button>
                                                            </form>
                                                      </div>
                                                </details>
                                          </div>

                                          {/*---------------------*/}
                                          {/*        Rating       */}
                                          {/*---------------------*/}

                                          <div className="space-y-2">
                                                <details className="overflow-hidden  border-t border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                                                      <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white px-4 py-2 text-gray-900 transition">
                                                            <span className="text-md font-bold"> Rating </span>

                                                            <span className="transition group-open:-rotate-180">
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
                                                                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                                        />
                                                                  </svg>
                                                            </span>
                                                      </summary>

                                                      <div className="  border-gray-200 bg-white">
                                                            <ul className="space-y-1 border-gray-200 px-4 pb-4 pt-2">
                                                                  {rating.length &&

                                                                        rating.map((itm) => (
                                                                              <li key={itm.key}>
                                                                                    <label
                                                                                          htmlFor={itm.key}
                                                                                          className="inline-flex items-center gap-2"
                                                                                    >
                                                                                          <input
                                                                                                type="checkbox"
                                                                                                id={itm.key}
                                                                                                onChange={(event) =>
                                                                                                      handleCheckboxChange(event, itm.key)
                                                                                                }
                                                                                                className="h-5 w-5 rounded border-gray-300"
                                                                                          />
                                                                                          {myRating(itm.value).map((itm) => (
                                                                                                <FaStar className="text-orange-500" />
                                                                                          ))}
                                                                                    </label>
                                                                              </li>
                                                                        ))}

                                                            </ul>
                                                      </div>
                                                </details>
                                          </div>
                                    </div>
                              </div>

                              <div className="col-span-3">
                                    <header className="border rounded-md md:p-4 p-2 flex items-center justify-between">
                                          <h6 className="">Products</h6>
                                          <div className="flex items-center gap-3">
                                                <button
                                                      onClick={() => setOpenModal(true)}
                                                      type="button"
                                                      className="border p-2 block md:hidden rounded-lg"
                                                >
                                                      <FaFilter className="text-xl" />
                                                </button>

                                                <div className="inline-flex rounded-lg shadow-sm">
                                                      <button
                                                            onClick={() => setIsGrid("grid")}
                                                            type="button"
                                                            className="py-2 px-2 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   "
                                                      >
                                                            <IoGrid className="text-xl" />
                                                      </button>
                                                      <button
                                                            onClick={() => setIsGrid("list")}
                                                            type="button"
                                                            className="py-2 px-2 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   "
                                                      >
                                                            <IoListSharp className="text-xl" />
                                                      </button>
                                                </div>
                                          </div>

                                          {/* modal */}
                                          <div
                                                onClick={() => setOpenModal(false)}
                                                className={`fixed z-[100] flex items-center justify-center ${openModal ? "visible opacity-100" : "invisible opacity-0"
                                                      } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
                                          >
                                                <div
                                                      onClick={(e_) => e_.stopPropagation()}
                                                      className={`text- absolute overflow-y-auto bg-white p-6 drop-shadow-lg dark:bg-gray-50 dark:text-black h-screen w-full ${openModal
                                                            ? "scale-1 opacity-1 duration-300"
                                                            : "scale-0 opacity-0 duration-150"
                                                            }`}
                                                >
                                                      <div className="flex mb-2 items-center justify-between  border-b pb-2">
                                                            <h1 className="mb-2 text-2xl font-semibold">Filter</h1>
                                                            <button
                                                                  onClick={() => setOpenModal(false)}
                                                                  className="rounded-md   border-rose-600 px-6 py-[6px] text-rose-600 duration-150 "
                                                            >
                                                                  <CgClose />
                                                            </button>
                                                      </div>
                                                      <div className=" md:hidden flex flex-col gap-2">
                                                            {/*----------------*/}
                                                            {/*   Category     */}
                                                            {/*----------------*/}
                                                            <div className="space-y-2">
                                                                  <details className="overflow-hidden  border-t [&_summary::-webkit-details-marker]:hidden">
                                                                        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white py-2 px-4 text-gray-900 transition">
                                                                              <span className="text-md font-bold"> Category </span>

                                                                              <span className="transition group-open:-rotate-180">
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
                                                                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                                                          />
                                                                                    </svg>
                                                                              </span>
                                                                        </summary>

                                                                        <div className=" border-gray-200 bg-white">
                                                                              <ul className="space-y-1 px-4 pb-4 pt-0">
                                                                                    {categories.length &&
                                                                                          categories
                                                                                                .slice(
                                                                                                      0,
                                                                                                      showAllBrands
                                                                                                            ? categories.length
                                                                                                            : 4
                                                                                                )
                                                                                                .map((itm) => (
                                                                                                      <li key={itm.key}>
                                                                                                            <button
                                                                                                                  onClick={() => setCategoryValue(itm?.name)}
                                                                                                                  className="inline-flex hover:text-blue-600 duration-150 items-center gap-2"
                                                                                                            >
                                                                                                                  <span className="text-sm font-medium">
                                                                                                                        {itm.name}
                                                                                                                  </span>
                                                                                                            </button>
                                                                                                      </li>
                                                                                                ))}
                                                                                    {categories.length > 4 && (
                                                                                          <li className="text-blue-500">
                                                                                                <button
                                                                                                      onClick={() =>
                                                                                                            setShowAllBrands(!showAllBrands)
                                                                                                      }
                                                                                                >
                                                                                                      {!showAllBrands ? "Show All" : "Show Less"}
                                                                                                </button>
                                                                                          </li>
                                                                                    )}
                                                                              </ul>
                                                                        </div>
                                                                  </details>
                                                            </div>

                                                            {/*----------------*/}
                                                            {/*     Brand       */}
                                                            {/*----------------*/}
                                                            <div className="space-y-2">
                                                                  <details className="overflow-hidden rounded border-t border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                                                                        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white px-4 py-2 text-gray-900 transition">
                                                                              <span className="text-md font-bold"> Brands </span>

                                                                              <span className="transition group-open:-rotate-180">
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
                                                                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                                                          />
                                                                                    </svg>
                                                                              </span>
                                                                        </summary>

                                                                        <div className="  border-gray-200 bg-white">
                                                                              <ul className="space-y-1 border-gray-200 px-4 pb-4 pt-2">
                                                                                    {seller_brands.length &&
                                                                                          seller_brands
                                                                                                .slice(0, showAllBrands ? allBrand.length : 4)
                                                                                                .map((itm) => (
                                                                                                      <li key={itm._id}>
                                                                                                            <label
                                                                                                                  htmlFor={itm._id}
                                                                                                                  className="inline-flex items-center gap-2"
                                                                                                            >
                                                                                                                  <input
                                                                                                                        type="checkbox"
                                                                                                                        id={itm.key}
                                                                                                                        className="h-5 w-5 rounded border-gray-300"
                                                                                                                        onChange={() =>
                                                                                                                              handleBrandCheck(itm.name)
                                                                                                                        }
                                                                                                                  />
                                                                                                                  <span className="text-sm font-medium text-gray-700">
                                                                                                                        {itm.name}
                                                                                                                  </span>
                                                                                                            </label>
                                                                                                      </li>
                                                                                                ))}
                                                                                    {seller_brands.length > 4 && (
                                                                                          <li className="text-blue-500">
                                                                                                <button
                                                                                                      onClick={() =>
                                                                                                            setShowAllBrands(!showAllBrands)
                                                                                                      }
                                                                                                >
                                                                                                      {!showAllBrands ? "Show All" : "Show Less"}
                                                                                                </button>
                                                                                          </li>
                                                                                    )}
                                                                              </ul>
                                                                        </div>
                                                                  </details>
                                                            </div>


                                                            {/*---------------------*/}
                                                            {/*        Price        */}
                                                            {/*---------------------*/}
                                                            <div className="space-y-2">
                                                                  <details className="overflow-hidden border-t border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                                                                        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white px-4 pt-4  text-gray-900 transition">
                                                                              <span className="text-md font-bold"> Price </span>

                                                                              <span className="transition group-open:-rotate-180">
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
                                                                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                                                          />
                                                                                    </svg>
                                                                              </span>
                                                                        </summary>

                                                                        <div className="  bg-white">
                                                                              {/* <MultiRangeSlider
                                            min={0}
                                            max={100}
                                            className="shadow-0"
                                            ruler={false}
                                            thumbLeftColor={'blue'}
                                            thumbRightColor={'blue'}
                                            barInnerColor={'#0375e8'}
                                            step={5}
                                            minValue={minValue}
                                            maxValue={maxValue}
                                            onInput={(e) => {
                                                handleInput(e);
                                            }}
                                        /> */}

                                                                              <form
                                                                                    onSubmit={handleSubmitPrice}
                                                                                    className="md:p-4 pb-4 pt-1"
                                                                              >
                                                                                    <div className="flex justify-between gap-4">
                                                                                          <div>
                                                                                                <span>Min</span>
                                                                                                <label
                                                                                                      htmlFor="FilterPriceFrom"
                                                                                                      className="flex items-center gap-2  ring-1 ring-gray-500 rounded px-2 py-1"
                                                                                                >
                                                                                                      <span className="text-xl font-semibold text-gray-600">
                                                                                                            ৳
                                                                                                      </span>
                                                                                                      <input
                                                                                                            defaultValue={minPrice}
                                                                                                            type="number"
                                                                                                            name="min"
                                                                                                            id="FilterPriceFrom"
                                                                                                            placeholder="From"
                                                                                                            className="w-full"
                                                                                                      />
                                                                                                </label>
                                                                                          </div>

                                                                                          <div>
                                                                                                <span>Max</span>
                                                                                                <label
                                                                                                      htmlFor="FilterPriceTo"
                                                                                                      className="flex items-center gap-2  ring-1 ring-gray-500 rounded px-2 py-1"
                                                                                                >
                                                                                                      <span className="text-xl font-semibold text-gray-600">
                                                                                                            ৳
                                                                                                      </span>
                                                                                                      <input
                                                                                                            defaultValue={maxPrice}
                                                                                                            type="number"
                                                                                                            name="max"
                                                                                                            id="FilterPriceTo"
                                                                                                            placeholder="To"
                                                                                                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                                                                      />
                                                                                                </label>
                                                                                          </div>
                                                                                    </div>

                                                                                    <button
                                                                                          type="submit"
                                                                                          className="text-blue-600 w-full py-2 rounded border border-gray-500 mt-3"
                                                                                    >
                                                                                          Apply
                                                                                    </button>
                                                                              </form>
                                                                        </div>
                                                                  </details>
                                                            </div>

                                                            {/*---------------------*/}
                                                            {/*        Rating       */}
                                                            {/*---------------------*/}

                                                            <div className="space-y-2">
                                                                  <details className="overflow-hidden  border-t border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                                                                        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white px-4 py-2 text-gray-900 transition">
                                                                              <span className="text-md font-bold"> Rating </span>

                                                                              <span className="transition group-open:-rotate-180">
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
                                                                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                                                          />
                                                                                    </svg>
                                                                              </span>
                                                                        </summary>

                                                                        <div className="  border-gray-200 bg-white">
                                                                              <ul className="space-y-1 border-gray-200 px-4 pb-4 pt-2">
                                                                                    {rating.length &&

                                                                                          rating.map((itm) => (
                                                                                                <li key={itm.key}>
                                                                                                      <label
                                                                                                            htmlFor={itm.key}
                                                                                                            className="inline-flex items-center gap-2"
                                                                                                      >
                                                                                                            <input
                                                                                                                  type="checkbox"
                                                                                                                  id={itm.key}
                                                                                                                  onChange={(event) =>
                                                                                                                        handleCheckboxChange(event, itm.key)
                                                                                                                  }
                                                                                                                  className="h-5 w-5 rounded border-gray-300"
                                                                                                            />
                                                                                                            {myRating(itm.value).map((itm) => (
                                                                                                                  <FaStar className="text-orange-500" />
                                                                                                            ))}
                                                                                                      </label>
                                                                                                </li>
                                                                                          ))}

                                                                              </ul>
                                                                        </div>
                                                                  </details>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </header>

                                    <div className="flex flex-wrap gap-3 items-center mt-3">
                                          {selectedItem.length
                                                ? selectedItem?.map((itm) => (
                                                      <div className="border border-blue-500 text-blue-600 flex items-center justify-between px-2 py-1 rounded">
                                                            {itm}{" "}
                                                            <button onClick={() => closeSelectedItem(itm)}>
                                                                  <CgClose />
                                                            </button>
                                                      </div>
                                                ))
                                                : ""}
                                    </div>

                                    <br />
                                    {loadingProducts ? <div className={"md:grid grid-cols-3 gap-3"
                                    }>
                                          {Array.from({ length: 10 }).map((_, index) => (
                                                <div key={index} className="flex flex-col m-8 rounded shadow-md  w-[270px] animate-pulse h-96">
                                                      <div className="h-48 rounded-t dark:bg-gray-300"></div>
                                                      <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
                                                            <div className="w-full h-6 rounded dark:bg-gray-300"></div>
                                                            <div className="w-full h-6 rounded dark:bg-gray-300"></div>
                                                            <div className="w-3/4 h-6 rounded dark:bg-gray-300"></div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div> : <div>

                                          <div
                                                className={`${isGrid === "grid" ? "md:grid grid-cols-3 gap-3" : ""
                                                      }`}
                                          >
                                                {filterData?.length ?
                                                      filterData?.map((itm) => (
                                                            <div key={itm?._id}>

                                                                  {isGrid === "list" ? (
                                                                        <div className="group md:grid grid-cols-3 mb-3 gap-3 w-full p-3 border rounded-lg">
                                                                              <a
                                                                                    className="relative  border flex h-60 overflow-hidden rounded-xl"
                                                                                    href="#"
                                                                              >
                                                                                    <img
                                                                                          className="peer absolute top-0 right-0 h-full w-full object-cover"
                                                                                          src={itm?.featuredImage?.src}
                                                                                          alt="product image"
                                                                                    />
                                                                                    <img
                                                                                          className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                                                                                          src={itm?.images?.length ? itm?.images[1]?.src : itm?.featuredImage?.src}
                                                                                          alt="product image"
                                                                                    />
                                                                                    <svg
                                                                                          className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                          aria-hidden="true"
                                                                                          role="img"
                                                                                          width="1em"
                                                                                          height="1em"
                                                                                          preserveAspectRatio="xMidYMid meet"
                                                                                          viewBox="0 0 32 32"
                                                                                    >
                                                                                          <path
                                                                                                fill="currentColor"
                                                                                                d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
                                                                                          />
                                                                                    </svg>
                                                                                    {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> */}
                                                                              </a>

                                                                              <div className="col-span-2">
                                                                                    <h5 className="text-lg tracking-tight text-slate-900">
                                                                                          {itm?.name}
                                                                                    </h5>

                                                                                    <div className="flex text-2xl mt-3 items-center gap-6">
                                                                                          <h1 className="font-bold  ">
                                                                                                ৳{itm?.regular_price}
                                                                                          </h1>
                                                                                          <del className="font-bold   text-gray-400">
                                                                                                ৳{itm?.price}
                                                                                          </del>
                                                                                    </div>

                                                                                    <div className="flex items-center gap-4">
                                                                                          <div className="flex items-center gap-1 text-orange-500">
                                                                                                {myRating(itm.rating_count).map((itm) => (
                                                                                                      <FaStar className="text-orange-500" />
                                                                                                ))}{" "}
                                                                                                {itm.rating_count}
                                                                                                <div className="w-[5px] h-[5px] bg-gray-400  text-transparent rounded-full">
                                                                                                      .
                                                                                                </div>
                                                                                          </div>
                                                                                          <div className="flex items-center gap-2">
                                                                                                {itm?.total_sales} orders{" "}
                                                                                                <div className="w-[5px] h-[5px] bg-gray-400  text-transparent rounded-full">
                                                                                                      .
                                                                                                </div>
                                                                                          </div>
                                                                                    </div>

                                                                                    <div className=" ">
                                                                                          {/* <p dangerouslySetInnerHTML={{ __html: itm?.shortDescription }} /> */}
                                                                                          <p className="text-gray-400 mt-2">
                                                                                                {itm?.metaDescription?.slice(0, 200)}
                                                                                          </p>
                                                                                    </div>

                                                                                    <div className="flex items-center gap-3 mt-3">
                                                                                          <Link>
                                                                                                <div className="bg-black px-4 py-2 rounded-md text-white">
                                                                                                      Add to Cart
                                                                                                </div>
                                                                                          </Link>
                                                                                          <Link to={`product/${itm?._id}`}>
                                                                                                <div className="bg-blue-500 px-4 py-2 rounded-md text-white">
                                                                                                      Buy Now
                                                                                                </div>
                                                                                          </Link>
                                                                                    </div>
                                                                              </div>
                                                                        </div>
                                                                  ) : (
                                                                        <div className="group grid  mb-3 gap-3 w-full p-3 border rounded-lg">
                                                                              <a
                                                                                    className="relative  border h-60 w-[270px] flex  overflow-hidden rounded-xl"
                                                                                    href="#"
                                                                              >
                                                                                    <img
                                                                                          className="peer absolute top-0 right-0  h-60 w-72 object-cover"
                                                                                          src={itm?.featuredImage?.src}
                                                                                          alt="product image"
                                                                                    />
                                                                                    <img
                                                                                          className="peer absolute top-0 -right-96  h-60 w-72 object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                                                                                          src={itm?.images?.length ? itm?.images[1]?.src : itm?.featuredImage?.src}
                                                                                          alt="product image"
                                                                                    />
                                                                                    <svg
                                                                                          className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                          aria-hidden="true"
                                                                                          role="img"
                                                                                          width="1em"
                                                                                          height="1em"
                                                                                          preserveAspectRatio="xMidYMid meet"
                                                                                          viewBox="0 0 32 32"
                                                                                    >
                                                                                          <path
                                                                                                fill="currentColor"
                                                                                                d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
                                                                                          />
                                                                                    </svg>
                                                                                    {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> */}
                                                                              </a>

                                                                              <div className="">
                                                                                    <h5 className="text-lg tracking-tight text-slate-900">
                                                                                          {itm?.name}
                                                                                    </h5>

                                                                                    <div className="flex text-2xl mt-3 items-center gap-6">
                                                                                          <h1 className="font-bold  ">
                                                                                                ৳{itm?.regular_price}
                                                                                          </h1>
                                                                                          <del className="font-bold   text-gray-400">
                                                                                                ৳{itm?.price}
                                                                                          </del>
                                                                                    </div>

                                                                                    <div className="flex items-center gap-4">
                                                                                          <div className="flex items-center gap-1 text-orange-500">
                                                                                                {myRating(itm.rating_count).map((itm) => (
                                                                                                      <FaStar className="text-orange-500" />
                                                                                                ))}{" "}
                                                                                                {itm.rating_count}
                                                                                                <div className="w-[5px] h-[5px] bg-gray-400  text-transparent rounded-full">
                                                                                                      .
                                                                                                </div>
                                                                                          </div>
                                                                                          <div className="flex items-center gap-2">
                                                                                                {itm?.total_sales} orders{" "}
                                                                                                <div className="w-[5px] h-[5px] bg-gray-400  text-transparent rounded-full">
                                                                                                      .
                                                                                                </div>
                                                                                          </div>
                                                                                    </div>

                                                                                    {/* <div className=" ">

                              <p className="text-gray-400 mt-2">
                                {itm?.metaDescription?.slice(0, 200)}
                              </p>
                            </div> */}

                                                                                    <div className="flex items-center gap-3 mt-3">
                                                                                          <Link>
                                                                                                <div className="bg-black px-4 py-2 rounded-md text-white">
                                                                                                      Add to Cart
                                                                                                </div>
                                                                                          </Link>
                                                                                          <Link>
                                                                                                <div className="bg-blue-500 px-4 py-2 rounded-md text-white">
                                                                                                      Buy Now
                                                                                                </div>
                                                                                          </Link>
                                                                                    </div>
                                                                              </div>
                                                                        </div>
                                                                  )}
                                                            </div>
                                                      )) : <h1>Here is no product found</h1>}
                                          </div>

                                          {/* sm */}
                                          <div className="md:hidden block gap-4 w-full ">
                                                {filterData.length ?
                                                      filterData?.map((itm) => (
                                                            <div key={itm?._id}>
                                                                  <div className="group  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white duration-150 hover:shadow-md">
                                                                        <a
                                                                              className="relative mx-3 mt-3 flex h-40 overflow-hidden rounded-xl"
                                                                              href="#"
                                                                        >
                                                                              <img
                                                                                    className="peer absolute top-0 right-0 h-full w-full object-cover"
                                                                                    src={itm?.featuredImage?.src}
                                                                                    alt="product image"
                                                                              />
                                                                              <img
                                                                                    className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                                                                                    src={itm?.images?.length ? itm?.images[1]?.src : itm?.featuredImage?.src}
                                                                                    alt="product image"
                                                                              />
                                                                              <svg
                                                                                    className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    aria-hidden="true"
                                                                                    role="img"
                                                                                    width="1em"
                                                                                    height="1em"
                                                                                    preserveAspectRatio="xMidYMid meet"
                                                                                    viewBox="0 0 32 32"
                                                                              >
                                                                                    <path
                                                                                          fill="currentColor"
                                                                                          d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
                                                                                    />
                                                                              </svg>
                                                                              {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> */}
                                                                        </a>
                                                                        <div className="mt-4 px-5 pb-5">
                                                                              <h5 className="text-lg tracking-tight text-slate-900">
                                                                                    {itm?.name?.slice(0, 18)}...
                                                                              </h5>
                                                                              <div className="mt-2 mb-5 flex items-center justify-between">
                                                                                    <p>
                                                                                          <span className="text-xl font-bold text-slate-900">
                                                                                                ৳{itm?.price}
                                                                                          </span>
                                                                                          <span className="text-sm text-slate-900 line-through">
                                                                                                ৳{itm?.regular_price}
                                                                                          </span>
                                                                                    </p>
                                                                              </div>
                                                                              <Link
                                                                                    to={`/products/${itm._id}`}
                                                                                    className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                                                              >
                                                                                    <svg
                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                          className="mr-2 h-6 w-6"
                                                                                          fill="none"
                                                                                          viewBox="0 0 24 24"
                                                                                          stroke="currentColor"
                                                                                          strokeWidth={2}
                                                                                    >
                                                                                          <path
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                                                          />
                                                                                    </svg>
                                                                                    Buy Now
                                                                              </Link>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      )) : <h1>Here is no product found</h1>}
                                          </div>
                                    </div>}
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default CategoryByProduct;
