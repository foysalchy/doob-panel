import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { ShopAuthProvider } from "../../../AuthProvider/ShopAuthProvide";

export default function CategorieItems({ setIsMenuOpen }) {
  const pathname = window.location.pathname;
  const idMatch = pathname.match(/\/shop\/([^/]+)/);

  const shopId = idMatch ? idMatch[1] : null;

  console.log("Shop ID:", shopId);
  const {
    data: categories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/shop/category/get/${shopId}`
      );
      const data = await res.json();
      return data;
    },
  });

  console.log(categories, "checkkkkkkkkkk");

  const { shop_id } = useContext(ShopAuthProvider);

  const { data: Banar = [] } = useQuery({
    queryKey: ["banar"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/shop/slider/get/${shopId}`
      );
      const data = await res.json();
      return data;
    },
  });

  const { data: adds } = useQuery({
    queryKey: ["adds"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/shop/popup/get/${shopId}`
      );
      const data = await res.json();
      return data;
    },
  });

  console.log(adds);

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const lastModalShownTimestamp = localStorage.getItem(
      "lastModalShownTimestamp"
    );

    // Check if the modal hasn't been shown in the last 24 hours for this device
    if (
      (!lastModalShownTimestamp ||
        Date.now() - parseInt(lastModalShownTimestamp, 10) >=
        5 * 60 * 60 * 1000) &&
      window.location.pathname === `/shop/${shopId}`
    ) {
      // Show the modal after 5 seconds
      const timeoutId = setTimeout(() => {
        setShowModal(true);

        // Update the timestamp to the current time
        localStorage.setItem("lastModalShownTimestamp", Date.now().toString());
      }, 5000);

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [shopId]);

  // copy
  const [allCategory, setAllCategory] = useState({
    subCategorys: [],
    miniCategorys: [],
    extraCategorys: [],
  });
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [miniCategoryData, setminiCategoryData] = useState([]);
  const [extraCategoryData, setExtraCategoryData] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [active, setActive] = useState({
    step1: null,
    step2: null,
  });
  const { user, shopInfo } = useContext(AuthContext);

  const { data: megaSideCategoryData = [], refetch: refetchMegaCategory } =
    useQuery({
      queryKey: ["megaSideCategoryDataSaller"],
      queryFn: async () => {
        const res = await fetch(
          `https://backend.doob.com.bd/api/v1/shop/category/get/${shopId}`
        );
        const data = await res.json();
        return data.slice(0, 7);
      },
    });

  const { data: heroBanner = [] } = useQuery({
    queryKey: "heroBanner",
    queryFn: async () => {
      const res = await fetch(
        "https://backend.doob.com.bd/api/v1/admin/slider"
      );
      const data = await res.json();
      return data?.data;
    },
  });

  // const blankImg = 'https://backend.doob.com.bd/api/v1/image/66036ed3df13bd9930ac229c.jpg';
  const bannerFind = heroBanner?.filter((item) => item.status === "true");
  // https://backend.doob.com.bd/api65e8a0a2e04a44a47ce186c3
  useEffect(() => {
    const fetchData = async () => {
      const subCategoryPromises = megaSideCategoryData
        ?.filter((itm) => itm?.menu === true)
        .map(async (item) => {
          try {
            const response = await fetch(
              `https://backend.doob.com.bd/api/v1/category/seller/sub-category-by-id?shopId=${shop_id?.shop_id}&id=${item?._id}`
            );
            const data = await response.json();
            console.log(data, "data....**");
            return data;
          } catch (error) {
            console.error("Error:", error);
            return [];
          }
        });

      const subCategories = await Promise.all(subCategoryPromises);
      setAllCategory((prevCategory) => ({
        ...prevCategory,
        subCategorys: subCategories.flat(),
      }));
    };

    if (megaSideCategoryData.length) {
      fetchData();
    }
  }, [megaSideCategoryData]);

  useEffect(() => {
    const fetchData = async () => {
      const miniCategoryPromises = allCategory.subCategorys.map(async (itm) => {
        // console.log(`https://backend.doob.com.bd/api/v1/category/seller/mini-category-by-id?shopId=${shop_id?.shop_id}&id=${itm?._id}`, '**********')
        try {
          const response = await fetch(
            `https://backend.doob.com.bd/api/v1/category/seller/mini-category-by-id?shopId=${shop_id?.shop_id}&id=${itm?._id}`
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error:", error);
          return [];
        }
      });

      const miniCategories = await Promise.all(miniCategoryPromises);
      setAllCategory((prevCategory) => ({
        ...prevCategory,
        miniCategorys: miniCategories.flat(),
      }));
    };

    if (allCategory.subCategorys.length) {
      fetchData();
    }
  }, [allCategory.subCategorys]);

  useEffect(() => {
    const fetchData = async () => {
      const extraCategoryPromises = allCategory.miniCategorys.map(
        async (itm) => {
          // console.log(`https://backend.doob.com.bd/api/v1/category/seller/extra-category-by-id?shopId=${shop_id?.shop_id}&id=${itm?._id}`, '************---->')
          try {
            const response = await fetch(
              `https://backend.doob.com.bd/api/v1/category/seller/extra-category-by-id?shopId=${shop_id?.shop_id}&id=${itm?._id}`
            );
            const data = await response.json();
            return data;
          } catch (error) {
            console.error("Error:", error);
            return [];
          }
        }
      );

      const extraCategories = await Promise.all(extraCategoryPromises);
      setAllCategory((prevCategory) => ({
        ...prevCategory,
        extraCategorys: extraCategories.flat(),
      }));
    };

    if (allCategory.miniCategorys.length) {
      fetchData();
    }
  }, [allCategory.miniCategorys]);

  const subCategoryHandler = async (category, index) => {
    const filteredSubCategory = allCategory?.subCategorys.filter(
      (subCategory) => subCategory.megaCategoryId === category?._id
    );

    console.log(allCategory, "++++");

    setSubCategoryData(filteredSubCategory);
    setminiCategoryData([]);
    setExtraCategoryData([]);
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const miniCategoryHandler = async (category, index) => {
    const filteredSubCategory = allCategory?.miniCategorys.filter(
      (miniCategory) => miniCategory.subCategoryId === category?._id
    );

    setminiCategoryData(filteredSubCategory);
    setActive({ ...active, step1: category?._id });
  };

  const extraCategoryHandler = async (category, index) => {
    // console.log(allCategory.extraCategorys[0].miniCategoryId, 'dd');
    const filteredSubCategory = allCategory?.extraCategorys.filter(
      (extraCategory) => extraCategory?.miniCategoryId === category?._id
    );

    setExtraCategoryData(filteredSubCategory);
    setActive({ ...active, step2: category?._id });

    console.log(filteredSubCategory, "filteredSubCategory");
  };

  console.log(allCategory, "test....======");

  return (
    <div className="bg-[white] h-[90vh] fixed p-2 z-[3000] overflow-y-auto  w-full top-0">
      <button onClick={() => setIsMenuOpen(false)}>x</button>

      <div className="grid grid-cols-4 gap-2 pt-2 h-full overflow-y-">
        {/* mega category */}
        <div className="">
          {megaSideCategoryData
            ?.filter((itm) => itm?.menu === true)
            .map((item, index) => (
              <div key={index} className="">
                {!subCategoryData.length === 0 ? (
                  <Link to={`/products/catagory/${item?._id}`}>
                    <div
                      onClick={() => subCategoryHandler(item, index)}
                      className={`flex flex-col gap-2 bg-gray-100 w-full h-auto rounded  items-center justify-center mb-2 px-2 py-2 text-sm font-normal   relative  ${openDropdownIndex === index ? "" : "text-black"
                        }`}
                    >
                      <img
                        src={item?.image}
                        alt=""
                        className="w-[70px]  h-[60px] object-cover ring-1 ring-gray-400"
                      />
                      <p className="text-sm text-center">{item?.name}++</p>
                    </div>
                  </Link>
                ) : (
                  <div className="">
                    <button
                      onClick={() => subCategoryHandler(item, index)}
                      className={`${openDropdownIndex === index
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-black"
                        } flex flex-col gap-2 w-full h-auto rounded  items-center justify-center mb-2 px-2 py-2 text-sm font-normal   relative `}
                    >
                      <img
                        src={item?.image}
                        alt=""
                        className="w-[60px]  h-[60px] object-cover ring-1 ring-gray-400"
                      />
                      <p className="text-sm">{item?.name}..</p>
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
        {/* Sub category */}
        <div className="col-span-3">
          {allCategory?.subCategorys.map((item, index) => (
            <div className="space-y-2 mb-2">
              <details
                onClick={() => miniCategoryHandler(item, index)}
                className={` overflow-hidden rounded   [&_summary::-webkit-details-marker]:hidden }`}
              >
                <summary
                  className={`${active.step1 === item._id
                    ? "bg-gray-900 text-white"
                    : "bg-white text-black"
                    } flex cursor-pointer items-center justify-between gap-2 p-4 transition`}
                >
                  <p className="text-sm">{item.subCategoryName}</p>

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

                <div className="-t -gray-200 bg-gray-50">
                  {active.step1 === item._id && (
                    <ul className="space-y-1 -t -gray-200 p-1">
                      {miniCategoryData.map((miniItem, miniIndex) => (
                        <div className="space-y-2 mb-2">
                          <details
                            onClick={() =>
                              extraCategoryHandler(miniItem, miniIndex)
                            }
                            className={`overflow-hidden rounded   [&_summary::-webkit-details-marker]:hidden }`}
                          >
                            <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
                              <span className="text-sm font-medium">
                                {" "}
                                {miniItem?.miniCategoryName.slice(0, 10)}{" "}
                              </span>

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

                            <div className="-t -gray-200 bg-gray-50">
                              {
                                <ul className=" -gray-200 p-1 grid grid-cols-3 gap-2">
                                  {extraCategoryData.map(
                                    (extraItem, extraIndex) => (
                                      <div
                                        onClick={() => setOn(false)}
                                        key={extraItem._id}
                                        className=""
                                      >
                                        <Link
                                          className=" w-full h-full flex justify-between"
                                          to={`/products/catagory/${item?._id}`}
                                        >
                                          <div className="flex flex-col bg-gray-100 hover:bg-red-50 duration-150 hover:ring-1 ring-red-400 p-2 rounded items-center justify-between w-full gap-1">
                                            <img
                                              src={extraItem?.img}
                                              alt=""
                                              className="w-[50px] h-[50px]  bg-red-50 ring-1 ring-red-300 p-1 object-cover"
                                            />
                                            <p className="text-xs">
                                              {extraItem.extraCategoryName.slice(
                                                0,
                                                10
                                              )}
                                            </p>
                                          </div>
                                        </Link>
                                      </div>
                                    )
                                  )}
                                </ul>
                              }
                            </div>
                          </details>
                        </div>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            </div>
            //   <div className="" key={item._id}>
            //         <div className="">
            //             <button
            //                 onClick={() => miniCategoryHandler(item, index)}
            //                 className={`${active.step1 === item._id ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} flex gap-2 w-full h-auto rounded items-center justify-between mb-2 px-2 py-3 text-sm font-normal relative`}>
            //                 <p className="text-sm">{item.subCategory}</p>
            //                 <FaAngleDown />
            //             </button>
            //         </div>
            //         {active.step1 === item._id && (
            //             <div className={`${miniCategoryData.length && ' p-1   mb-3 '}`}>
            //                 {
            //                     miniCategoryData.map((miniItem, miniIndex) => (
            //                         <div>

            //                             <div className={`${active.step2 === miniItem._id ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} flex gap-2  w-full rounded items-center justify-between mb-2 px-2 py-3 text-sm font-normal relative`} key={miniItem._id}>
            //                                 <Link className=" w-full h-full flex items-center justify-between" to={`/products/catagory/${item?._id}`}>
            //                                     <div className="w-full">
            //                                         <button className="flex items-center justify-between w-full gap-1"
            //                                             onClick={() => extraCategoryHandler(miniItem, miniIndex)}
            //                                         >
            //                                             <p className="">{miniItem.miniCategoryName.slice(0, 10)}</p>
            //                                             <FaAngleDown />
            //                                         </button>
            //                                     </div>
            //                                 </Link>
            //                                 <div>
            //                                 </div>
            //                             </div>
            // {active.step2 === miniItem._id && (
            //     <div className={`${extraCategoryData.length ? 'grid grid-cols-3 gap-2 ' : ''} bg-white rounded-md p-1`}>
            // {extraCategoryData.map((extraItem, extraIndex) => (
            //     <div key={extraItem._id} className="">
            //         <Link className=" w-full h-full flex justify-between" to={`/products/catagory/${item?._id}`}>
            //             <div className="flex flex-col bg-gray-100 hover:bg-red-50 duration-150 hover:ring-1 ring-red-400 p-2 rounded items-center justify-between w-full gap-1">
            //                 <img src={extraItem?.img} alt="" className="w-[50px] h-[50px]  bg-red-50 ring-1 ring-red-300 p-1 object-cover" />
            //                 <p className="text-xs">{extraItem.extraCategoryName.slice(0, 10)}</p>
            //             </div>
            //         </Link>
            //     </div>
            // ))}
            //     </div>
            // )}
            //                         </div>

            //                     ))}
            //             </div>
            //         )}
            //     </div>
          ))}
        </div>
      </div>
    </div>
  );
}
