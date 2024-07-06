import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Dropdown, Ripple, initTE } from "tw-elements";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
initTE({ Dropdown, Ripple });

const ProductHero = () => {
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
  const navigate = useNavigate();

  // const { data: megaSideCategoryData = [], refetch: refetchMegaCategory } =
  //   useQuery({
  //     queryKey: ["megaProductSideCategoryData"],
  //     queryFn: async () => {
  //       const res = await fetch(
  //         "https://doob.dev/api/v1/admin/category/megacategory"
  //       );
  //       const data = await res.json();
  //       return data.rows.slice(0, 6);
  //     },
  //   });
  const { data: megaSideCategoryData = [], refetch: refetchMegaCategory } =
    useQuery({
      queryKey: ["megaProductSideCategoryData"],
      queryFn: async () => {
        const res = await fetch(
          "https://doob.dev/api/v1/admin/category/megacategory"
        );
        const data = await res.json();
        return data.rows;
      },
    });

  console.log(megaSideCategoryData, "megaSideCategoryData");
  // console.log(megaCategory, "megaCategory");

  const { data: heroBanner = [] } = useQuery({
    queryKey: "heroSideBanner",
    queryFn: async () => {
      const res = await fetch("https://doob.dev/api/v1/admin/slider");
      const data = await res.json();
      return data?.data;
    },
  });

  const blankImg = "https://doob.dev/api/v1/image/66036ed3df13bd9930ac229c.jpg";
  const bannerFind = heroBanner?.filter((item) => item.status === "true");

  useEffect(() => {
    const fetchData = async () => {
      const subCategoryPromises = megaSideCategoryData.map(async (item) => {
        try {
          const response = await fetch(
            `https://doob.dev/api/v1/admin/category/subcategory?id=${item?._id}`
          );
          const data = await response.json();
          return data.subCategory;
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
        try {
          const response = await fetch(
            `https://doob.dev/api/v1/admin/category/miniCategory?id=${itm?._id}`
          );
          const data = await response.json();
          return data.row;
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
          try {
            const response = await fetch(
              `https://doob.dev/api/v1/admin/category/extraCategory?id=${itm?._id}`
            );
            const data = await response.json();
            return data.rows;
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
    if (filteredSubCategory.length === 0) {
      navigate(`/products/catagory/${category?._id}`);
    }
    setSubCategoryData(filteredSubCategory);
    setminiCategoryData([]);
    setExtraCategoryData([]);
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const miniCategoryHandler = async (category, index) => {
    const filteredSubCategory = allCategory?.miniCategorys.filter(
      (miniCategory) => miniCategory.subCategoryId === category?._id
    );
    if (filteredSubCategory.length === 0) {
      navigate(`/products/catagory/${category?._id}`);
    }
    setminiCategoryData(filteredSubCategory);
    setActive({ ...active, step1: category?._id });
  };

  const extraCategoryHandler = async (category, index) => {
    // console.log(allCategory.extraCategorys[0].miniCategoryId, 'dd');
    const filteredSubCategory = allCategory?.extraCategorys.filter(
      (extraCategory) => extraCategory?.miniCategoryId === category?._id
    );
    if (filteredSubCategory.length === 1) {
      navigate(`/products/catagory/${category?._id}`);
    }
    setExtraCategoryData(filteredSubCategory);
    setActive({ ...active, step2: category?._id });

    console.log(filteredSubCategory, "filteredSubCategory");
  };

  return (
    <div className="flex gap-4 ">
      <div className="bg-white  w-[340px] relative lg:flex hidden flex-col  rounded-lg p-4 ">
        {!megaSideCategoryData ? (
          <>
            <Skeleton
              style={{
                height: "28px",
              }}
              count={10}
            />
          </>
        ) : (
          megaSideCategoryData.map((item, index) => (
            <div key={index} className="  inline-block">
              {/* Dropdown toggle button */}
              <button
                onClick={() => subCategoryHandler(item, index)}
                className={`flex  items-center  w-full justify-between px-2 py-1 capitalize text-sm font-normal  hover:bg-gray-100 hover:text-black  relative  ${
                  openDropdownIndex === index
                    ? "bg-gray-100 text-black"
                    : "text-black"
                } rounded`}
              >
                <span className="flex gap-2 items-center ">
                  <img
                    src={item?.image}
                    alt=""
                    className="w-8 h-8  ring-1 ring-gray-200 ml-2"
                  />{" "}
                  {item?.name}
                </span>
                {allCategory?.subCategorys.filter(
                  (subCategory) => subCategory.megaCategoryId === item?._id
                ).length >= 1 && <FaAngleRight className="absolute right-2" />}
              </button>

              {/* Dropdown menu */}
              {openDropdownIndex === index && (
                <div
                  onClick={() => setOpenDropdownIndex(null)}
                  className="absolute right-[-196px] top-0 z-20 w-48 h-full py-1 capitalize mt-2 px-2 origin-top-right bg-white"
                >
                  {subCategoryData.map((subCategory, index) => (
                    <div key={index}>
                      {miniCategoryData?.length > 0 ? (
                        <div
                        // to={`/category-products/${shopInfo?.shopId}/${itm?.megaCategoryId}`}
                        >
                          <div>
                            {miniCategoryData?.length >= 1 ? (
                              <div
                                onMouseMove={() =>
                                  miniCategoryHandler(subCategory, index)
                                }
                                className={`flex  items-center hover:bg-gray-100 w-full justify-between px-2 py-1 capitalize text-sm font-normal cursor-pointer mb-1 rounded relative  ${
                                  active?.step1 === subCategory?._id
                                    ? "text-black bg-gray-100"
                                    : "text-black"
                                }`}
                                type="button"
                                id={item?._id}
                                data-te-dropdown-toggle-ref
                                aria-expanded="false"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                              >
                                <span className="flex items-center ">
                                  <img
                                    src={subCategory?.img}
                                    alt=""
                                    className="w-8 h-8 rounded-full ring-1 ring-gray-200"
                                  />{" "}
                                  {subCategory?.subCategory}
                                </span>
                              </div>
                            ) : (
                              <Link
                                to={`/category-products/${shopInfo?.shopId}/${subCategory?._id}`}
                                className={`flex  items-center hover:bg-gray-100 w-full justify-between px-2 py-1 capitalize text-sm font-normal cursor-pointer mb-1 rounded relative  ${
                                  active?.step1 === subCategory?._id
                                    ? "text-black bg-gray-100"
                                    : "text-black"
                                }`}
                                type="button"
                                id={item?._id}
                                data-te-dropdown-toggle-ref
                                aria-expanded="false"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                              >
                                <span className="flex items-center ">
                                  <img
                                    src={subCategory?.img}
                                    alt=""
                                    className="w-8 h-8 rounded-full ring-1 ring-gray-200"
                                  />{" "}
                                  {subCategory?.subCategory}
                                </span>
                              </Link>
                            )}
                          </div>

                          {miniCategoryData.length ? (
                            ""
                          ) : (
                            <div className="bg-white    border-gray-400 absolute top-0 h-full right-[-180px] px-2 w-[190px]">
                              {miniCategoryData.map((miniCategory, index) => (
                                <div key={index}>
                                  {!megaSideCategoryData.length == 0 ? (
                                    <Link
                                      to={`/products/catagory/${miniCategory?._id}`}
                                    >
                                      <div
                                        onMouseMove={() =>
                                          extraCategoryHandler(
                                            miniCategory,
                                            index
                                          )
                                        }
                                        className={`flex mt-2 items-center  w-full justify-between px-2 py-1 capitalize text-sm font-normal rounded hover:bg-gray-100 hover:text-black  relative  ${
                                          active?.step2 === miniCategory?._id
                                            ? "bg-gray-100 text-black"
                                            : "text-black"
                                        }`}
                                      >
                                        <span className="flex items-center ">
                                          <img
                                            src={miniCategory?.img}
                                            alt=""
                                            className="w-8 h-8 rounded-full ring-1 ring-gray-200"
                                          />{" "}
                                          {miniCategory?.miniCategoryName}
                                        </span>
                                      </div>
                                    </Link>
                                  ) : (
                                    <div
                                      onMouseMove={() =>
                                        extraCategoryHandler(
                                          miniCategory,
                                          index
                                        )
                                      }
                                      className="flex justify-between items-center px-2 py-1 capitalize text-sm font-normal hover:text-white  hover:bg-black   "
                                    >
                                      {miniCategory?.miniCategoryName}
                                    </div>
                                  )}
                                </div>
                              ))}
                              {extraCategoryData.length == 0 ? (
                                ""
                              ) : (
                                <div className="absolute w-[500px] p-2 bg-white right-[-500px] grid grid-cols-5  top-0 h-full">
                                  {extraCategoryData?.map(
                                    (extraCategory, index) => (
                                      <div key={index}>
                                        {extraCategoryData.length == 0 ? (
                                          <div>
                                            {extraCategory?.extraCategoryName}
                                          </div>
                                        ) : (
                                          <Link
                                            to={`/products/catagory/${extraCategory?._id}`}
                                          >
                                            <div className="py-1 capitalize px-2">
                                              <span className="flex flex-col hover:bg-gray-100 items-center  w-[90px] p-2 rounded-lg ">
                                                <img
                                                  src={extraCategory?.img}
                                                  alt=""
                                                  className="w-14 h-14 object-cover rounded-full ring-1 ring-gray-200"
                                                />
                                                <p className="text-xs font-semibold text-center">
                                                  {
                                                    extraCategory?.extraCategoryName
                                                  }
                                                </p>
                                              </span>
                                            </div>
                                          </Link>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          onMouseMove={() =>
                            miniCategoryHandler(subCategory, index)
                          }
                          onClick={() =>
                            navigate(`/products/catagory/${subCategory?._id}`)
                          }
                          className={`flex items-center  w-full justify-between cursor-pointer hover:bg-gray-100 px-2 py-1 capitalize text-sm font-normal  mb-1 rounded relative  ${
                            active?.step2 === subCategory?._id
                              ? "black-black "
                              : "text-black"
                          }`}
                          type="button"
                          id={item?._id}
                          data-te-dropdown-toggle-ref
                          aria-expanded="false"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          <span className="flex items-center gap-2 w-full ">
                            <img
                              src={subCategory?.img}
                              alt=""
                              className="w-8 h-8 rounded-full ring-1 ring-gray-200"
                            />{" "}
                            {subCategory?.subCategory}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="lg:w-[80%] w-[100%]">
        {bannerFind.length > 0 ? (
          <Swiper
            autoplay={{ delay: 3000 }}
            modules={[Autoplay]}
            className="mySwiper rounded-md"
          >
            {bannerFind.map((i, index) => (
              <SwiperSlide key={index}>
                <img
                  className=" w-full lg:h-[350px] h-[150px] object-cover  object-center rounded"
                  src={i?.image}
                  srcSet={i?.image}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img
            className=" w-full lg:h-[350px] h-[150px] object-cover  object-center rounded"
            src={blankImg}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default ProductHero;
