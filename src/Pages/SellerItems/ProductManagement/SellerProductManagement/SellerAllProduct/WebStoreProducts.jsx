import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { MdDelete, MdOutlineViewInAr } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import DemoImage from "./woocommerce-placeholder-600x600.png";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import DarazLogo from "./daraz.png";

import DeleteModal from "../../../../../Common/DeleteModal";
import PrintList from "../PrintList";
import LoaderData from "../../../../../Common/LoaderData";
import { BsEye } from "react-icons/bs";
import showAlert from "../../../../../Common/alert";
import { CiRedo } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import useAddDivToTableCells from "../../../../../Common/useAddDivToTableCells";

export default function WebStoreproduct({ daraz_shop, price_range, product_status, loadingWeb, productData, handleUpdateCheck, handleSelectAll, selectProducts, setOn, on, priceRole, searchQuery, isOpenWarehouse, setRejectMessage, rejectMessage, priceOn, handleEditPrice, calculateTotalQuantity, stockOn, handleEditStock, onModal, setPriceOn, setStockOn, updateProductStatus,updateProductSheet, update_product_multi_vendor, refetchProduct, navigateWareHouseFunction, printProduct, set_trash, trash, trash_product }) {
      useAddDivToTableCells()
      const { shopInfo } = useContext(AuthContext);
      const [currentPage, setCurrentPage] = useState(1);
      const pageSize = 10;
      const navigate = useNavigate();
      const [loadingStates, setLoadingStates] = useState({});
      const [showAll, setShowAll] = useState(false);
      const [activeId, setActiveId] = useState(null);
 
      const filteredData = productData?.filter((item) => {
            // Search query filter
            const matchesSearchQuery =
              item.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
              (item.sku && item?.sku?.toString().includes(searchQuery))||
              (item._id && item?._id?.toString().includes(searchQuery));
          
            // Product status filter
            const matchesProductStatus =
              product_status === item?.status || product_status === "";
          
            // Price range filter
            const matchesPriceRange = price_range
              ? item.price >= (price_range.min ?? 0) &&
                item.price <= (price_range.max ?? Infinity)
              : true;
          
            // Daraz shop filter
            const matchesDarazShop =
              daraz_shop === item?.darazSku?.[0]?.shop || daraz_shop === "";
          
            // Trash filter
            const matchesTrash =
              trash === true
                ? item.trash === true
                : item.trash === false || item.trash === undefined;
          
            // Combine all conditions
            return (
              matchesSearchQuery &&
              matchesProductStatus &&
              matchesPriceRange &&
              matchesDarazShop &&
              matchesTrash
            );
          });
          


      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      console.log(filteredData, 'filteredData')
      // Get the current page data
      const currentData = filteredData?.sort((a, b) => a.createdAt - b.createdAt).slice(startIndex, endIndex);

      const [deleteId, setDeletId] = useState("");
      const [deletePopUp, setDeletePopUp] = useState(false);
      const [isDelete, setIsDelete] = useState(false);

      const DeleteSeller = (id) => {
            console.log(id);
            setDeletId(id);
            setDeletePopUp(true);
      };
      if (isDelete) {
            fetch(`https://doob.dev/api/v1/seller/delete-product`, {
                  method: "DELETE",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                        id: deleteId,
                  }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setIsDelete(false);
                        showAlert("Delete Success", "", "success");
                        refetchProduct();
                  });

            console.log(deleteId, isDelete);
      }

      const updateProduct = (id, sku, item_id, category) => {
            setLoadingStates((prevLoadingStates) => ({
                  ...prevLoadingStates,
                  [id]: true,
            }));
            const data = { category, item_id, sku, id, shopId: shopInfo._id };
            fetch("https://doob.dev/api/v1/seller/update-product", {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((response) => response.json())
                  .then((data) => {
                        console.log(data);
                        setLoadingStates((prevLoadingStates) => ({
                              ...prevLoadingStates,
                              [id]: false,
                        }));
                        if (data.error) {
                              showAlert(`${data.message}`, "", "warning");
                        } else {
                              if (updateStart) {
                              } else {
                                    showAlert(`${data.message}`, "", "success");
                              }
                              refetchProduct();
                        }
                  });
      };

      const myPriceRole = (pocket) => {
            // Log the input pocket value
            console.log("Input Pocket:", pocket);

            // Find the relevant price range based on the pocket value
            const priceRange = priceRole.find((category) => {
                  const from = parseInt(category.to);
                  const to = parseInt(category.from);
                  const parsedPocket = parseInt(pocket);
                  console.log("Comparing:", from, to, parsedPocket);
                  return parsedPocket >= from && parsedPocket <= to;
            });

            // Log the found price range
            console.log("Price Range:", priceRange);

            // Check if the priceRange is valid
            if (!priceRange) {
                  console.log("Price range not found for the given pocket value.");
                  return null;
            }

            // Parse the priceRange value based on whether it's a percentage or not
            const price = parseFloat(priceRange.priceRange);
            const data =
                  priceRange.percentage === "yes"
                        ? parseFloat(pocket) + (parseFloat(pocket) * price) / 100
                        : parseFloat(pocket) + price;

            // Return the calculated data
            return data;
      };
      const [openDropdownId, setOpenDropdownId] = useState(null); // State for tracking the open dropdown

      const toggleDropdown = (productId) => {
        setOpenDropdownId(openDropdownId === productId ? null : productId);
      };
      const update_status = (product_id, status) => {
            fetch(`https://doob.dev/api/v1/seller/update-product-status`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                        id: product_id,
                        status: status,
                  }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert(`Success`, "", "success");
                        refetchProduct();
                  });
      };


      console.log(selectProducts.length === productData.length, productData.length, selectProducts);

      return (
            <div className="flex flex-col mt-6">
                  <div className="h-0 w-0">
                        {" "}
                        <DeleteModal
                              setOpenModal={setDeletePopUp}
                              OpenModal={deletePopUp}
                              setIsDelete={setIsDelete}
                        />
                  </div>
                  <div
                      
                  >
                        <div className=" w-[100%]">
                              {on && (
                                    <div className="absolute top-0 left-0 right-0 bottom-0 m-auto z-[3000]">
                                          {" "}
                                          <PrintList setOn={setOn} products={printProduct} />
                                    </div>
                              )}

                              <div className="bar   border  border-gray-700 md:rounded-lg">
                                    <table className="w-full">
                                          <thead className="bg-gray-900 text-white ">
                                                <tr>
                                                      <th className="px-2 text-center">
                                                            <label
                                                                  className="flex justify-center items-center gap-2  font-medium"
                                                                  htmlFor="select"
                                                            >
                                                                  <input
                                                                        id="select"
                                                                        type="checkbox"
                                                                        checked={
                                                                              selectProducts.length === currentData?.filter((product) => {
                                                                                    if (trash === true) {
                                                                                          return product.trash === true
                                                                                    }
                                                                                    else {
                                                                                          return product.trash === false || product.trash === undefined
                                                                                    }
                                                                              })?.length
                                                                        }
                                                                        onChange={() => handleSelectAll(currentData?.filter((product) => {
                                                                              if (trash === true) {
                                                                                    return product.trash === true
                                                                              }
                                                                              else {
                                                                                    return product.trash === false || product.trash === undefined
                                                                              }
                                                                        }))}
                                                                  />
                                                            </label>
                                                      </th>
                                                      <th
                                                                              scope="col"
                                                                              className="py-3.5 px-4 w-[100px] text-sm border font-normal text-left rtl:text-right "
                                                                        >
                                                                              <div className="flex items-center gap-x-3">
                                                                                    <span>Name</span>
                                                                              </div>
                                                                        </th>

                                                                        <th
                                                                              scope="col"
                                                                              className="px-2 py-3.5 border w-[40px] text-sm font-normal text-center rtl:text-right "
                                                                        >
                                                                              <span>Status</span>
                                                                        </th>
                                                                       
                                                                      
                                                                       
                                                                      
                                                                        <th
                                                                              scope="col"
                                                                              className="px-4 py-3.5 text-sm border font-normal text-left rtl:text-right "
                                                                        >
                                                                              <button className="flex items-center gap-x-2">
                                                                                    <span>Categories</span>
                                                                              </button>
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className="px-4 py-3.5 text-sm border font-normal text-left rtl:text-right "
                                                                        >
                                                                              <button className="flex items-center gap-x-2">
                                                                                    <span>Warehouse</span>
                                                                              </button>
                                                                        </th>

                                                                        <th
                                                                              style={{ width: "110px" }}
                                                                              scope="col"
                                                                              className="px-4 py-3.5 border text-sm font-normal text-left rtl:text-right "
                                                                        >
                                                                              Price/Qty
                                                                        </th>

                                                                        <th
                                                                              scope="col"
                                                                              className="px-4 border py-3.5 text-sm font-normal text-center  "
                                                                        >
                                                                              <span>Action</span>
                                                                        </th>
                                                </tr>
                                          </thead>
                                          {loadingWeb && <LoaderData />}
                                          <tbody className="bg-white divide-y  divide-gray-200 ">
                                                {currentData?.reverse()?.map((product, index) => (
                                                            <tr key={product._id}>
                                                                  <td className="px-4 py-4 text-sm font-medium text-gray-700  ">
                                                                        <label>
                                                                              <input
                                                                                    type="checkbox"
                                                                                    checked={selectProducts.includes(
                                                                                          product._id
                                                                                    )}
                                                                                    onChange={() =>
                                                                                          handleUpdateCheck(product._id)
                                                                                    }
                                                                              />
                                                                        </label>
                                                                  </td>



                                                                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                                          <div className="inline-flex items-center gap-x-3">
                                                                                                <div className="flex relative  items-center gap-x-2">
                                                                                                      {product?.featuredImage && product?.featuredImage?.src ? (
                                                                                                            <div className="imgSm w-10 ">
                                                                                                                  <img
                                                                                                                        className="object-cover w-10 h-10 rounded"
                                                                                                                        srcSet={product?.featuredImage?.src ?? product?.images[1].src}
                                                                                                                        src={product?.featuredImage?.src ?? product?.images[1].src}
                                                                                                                        alt="Product"
                                                                                                                  />
                                                                                                                  <div

                                                                                                                        className="absolute top-[-40px] duration-150 abs hidden  left-[43px] object-cover bg-cover rounded bg-white shadow-xl opacity-100 z-[1000] w-[150px] h-[150px] ring-1 ring-gray-500"
                                                                                                                  ></div>
                                                                                                            </div>
                                                                                                      ) : (
                                                                                                            <img
                                                                                                                  className="object-cover border border-black w-10 h-10 rounded"
                                                                                                                  srcSet={DemoImage}
                                                                                                                  src={DemoImage}
                                                                                                                  alt=""
                                                                                                            />
                                                                                                      )}
                                                                                                      <div>
                                                                                                            <h2 className="font-medium text-gray-800  ">
                                                                                                                  {product?.name
                                                                                                                        .split(" ")
                                                                                                                        .slice(0, 5)
                                                                                                                        .join(" ")}
                                                                                                            </h2>
                                                                                                            <p className="text-sm font-normal text-gray-600 ">
                                                                                                                  {product?.sku}
                                                                                                            </p>
                                                                                                            <p>shop:  {product?.darazSku?.[0]?.shop || ''}</p>
                                                                                                            <div>
                                                                                                            <div className="flex align-items-center">
                                                                                               {(product?.daraz && (
                                                                                                      <img
                                                                                                      title="SYC"
                                                                                                         
                                                                                                            style={{width:'50px',height:'20px'}}
                                                                                                            src={DarazLogo}
                                                                                                      />
                                                                                                )) ||
                                                                                                      (product?.woo && (
                                                                                                            <img
                                                                                                              title="SYC"
                                                                                                              style={{width:'40px',height:'20px'}}
                                                                                                                  src={WooCommerceLogo}
                                                                                                            />
                                                                                                      ))}
                                                                                          | <b title="source">DOOB</b>
                                                                                              
                                                                                                       
                                                                                          </div>
                                                                                                            </div>
                                                                                                      </div>
                                                                                                      
                                                                                                </div>
                                                                                          </div>
                                                                                    </td>

                                                                  <td className="px-4 ">
                                                                        <div>
                                                                              {product.product_status === "reject" ? (
                                                                                    <div>
                                                                                          {" "}
                                                                                          <div
                                                                                                onClick={() =>
                                                                                                      setRejectMessage(product)
                                                                                                }
                                                                                                className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800"
                                                                                          >
                                                                                                <span className="h-1.5 w-1.5 rounded-full bg-danger-600" />
                                                                                                <h2 className="text-sm font-normal text-danger-600">
                                                                                                      Rejected
                                                                                                </h2>
                                                                                          </div>
                                                                                    </div>
                                                                              ) : (
                                                                                    <div>
                                                                                          {!product.adminWare ? (
                                                                                                <div>
                                                                                                      {
                                                                                                            <div className="h-full">
                                                                                                                  {product?.status === true ? (
                                                                                                                        <div
                                                                                                                              onClick={() =>
                                                                                                                                    update_status(
                                                                                                                                          product._id,
                                                                                                                                          false
                                                                                                                                    )
                                                                                                                              }
                                                                                                                              className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800"
                                                                                                                        >
                                                                                                                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                                                                              <h2 className="text-sm font-normal text-emerald-500">
                                                                                                                                    Active
                                                                                                                              </h2>
                                                                                                                        </div>
                                                                                                                  ) : (
                                                                                                                        <div
                                                                                                                              onClick={() =>
                                                                                                                                    update_status(
                                                                                                                                          product?._id,
                                                                                                                                          true
                                                                                                                                    )
                                                                                                                              }
                                                                                                                              className="inline-flex items-center px-3 py-1 rounded-full  cursor-pointer gap-x-2 bg-emerald-100/60 bg-gray-800"
                                                                                                                        >
                                                                                                                              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                                                                                                                              <h2 className="text-sm font-normal text-yellow-500">
                                                                                                                                    Inactive
                                                                                                                              </h2>
                                                                                                                        </div>
                                                                                                                  )}
                                                                                                            </div>
                                                                                                      }
                                                                                                </div>
                                                                                          ) : (
                                                                                                <div >
                                                                                                      {!product?.status ? (
                                                                                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800">
                                                                                                                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                                                                                                  <h2 className="text-sm font-normal text-orange-500">
                                                                                                                        Pending
                                                                                                                  </h2>
                                                                                                            </div>
                                                                                                      ) : (
                                                                                                            <div
                                                                                                                  onClick={() =>
                                                                                                                        updateProductStatus(
                                                                                                                              product._id,
                                                                                                                              false
                                                                                                                        )
                                                                                                                  }
                                                                                                                  className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800"
                                                                                                            >
                                                                                                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                                                                  <h2 className="text-sm font-normal text-emerald-500">
                                                                                                                        Active
                                                                                                                  </h2>
                                                                                                            </div>
                                                                                                      )}
                                                                                                </div>
                                                                                          )}
                                                                                    </div>
                                                                              )}
                                                                        </div>
                                                                        <div className="flex justify-center mt-1">
                                                                                                      {product?.sheet === true ? (
                                                                                                            <div
                                                                                                                  onClick={() =>
                                                                                                                        updateProductSheet(
                                                                                                                              product._id,
                                                                                                                              false
                                                                                                                        )
                                                                                                                  }
                                                                                                                  className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800"
                                                                                                            >
                                                                                                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                                                                  <h2 className="text-sm font-normal text-emerald-500">
                                                                                                                        FB On
                                                                                                                  </h2>
                                                                                                            </div>
                                                                                                      ) : (
                                                                                                            <div
                                                                                                                  onClick={() =>
                                                                                                                        updateProductSheet(
                                                                                                                              product?._id,
                                                                                                                              true,
                                                                                                                        )
                                                                                                                  }
                                                                                                                  className="inline-flex items-center px-3 py-1 rounded-full  cursor-pointer gap-x-2 bg-emerald-100/60 bg-gray-800"
                                                                                                            >
                                                                                                                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                                                                                                                  <h2 className="text-sm font-normal text-yellow-500">
                                                                                                                        FB Off
                                                                                                                  </h2>
                                                                                                            </div>
                                                                                                      )}
                                                                                                </div>
                                                                  </td>
                                                                

                                                                       <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                        {product?.categories &&
                                                                        product?.categories.filter((category) => category !== null && category !== "").length > 0 ? (
                                                                        product?.categories
                                                                              .filter((category) => category !== null && category !== "")
                                                                              .map((category) => (
                                                                              <span key={category?.id}>
                                                                              <div>{category?.name || 'Uncategorized'}</div>
                                                                              </span>
                                                                              ))
                                                                        ) : (
                                                                        <div>Uncategorized</div>
                                                                        )}
                                                                        </td>
                                                                  <td className="px-4 py-4 text-sm  text-gray-500  whitespace-nowrap">
                                                                        {product?.warehouse?.filter(
                                                                              (item) => item?.name
                                                                        )?.length
                                                                              ? product?.warehouse?.map((ware, index) => (
                                                                                    <p key={ware?.name}>{ware?.name}</p>
                                                                              ))
                                                                              : "No Warehouse"}
                                                                  </td>
                                                                  <td className="px-4 py-4 text-sm  text-gray-500  whitespace-nowrap">
                                                                        <span className="text-sm text-gray-500">
                                                                              
                                                                                   
                                                                                    <button className="text-xs text-blue-500 border border-blue-500 px-2 py-1 rounded-lg"  onClick={() => setPriceOn(product)}>
                                                                                          Price Edit
                                                                                    </button>
                                                                             
                                                                              {" "}
                                                                              {Array.isArray(product?.variations) &&
  product?.variations
    ?.slice(0, showAll && activeId === product._id ? product?.variations.length : 1)
    ?.map((variant, index) => {
            const variantData = product?.variantData?.[index] || {};
            const product1 = variantData?.product1 || {};
            const product2 = variantData?.product2 || {};
            const product3 = variantData?.product3 || {};

            return (
              <div key={index}>
                {variant?.SKU ? (
                  // First set of data
                  <div>
                    <p>{variant?.SKU}</p>
                    <span>QTY: {variant?.quantity} </span> ||{" "}
                    <span>Price: {variant?.offerPrice || variant?.price} </span>

                    {variant?.quantity == 0 && product?.adminWare  &&(
                      <p className="text-red-500">Request Pending of Doob Warehouse</p>
                    )}
                  </div>
                ) : (
                  <></>
                )}
             
                <hr className="pb-1" />
                {/* You can add additional data here */}
              </div>
            );
          })}

      {/* Toggle button */}
      {product?.variations?.length > 1 && (
        <button
        onClick={() =>
            setActiveId(activeId === product._id ? null : product._id) || setShowAll(!showAll)
          }
          className="mt-2 text-blue-500 underline hover:text-blue-700"
        >
           {showAll && activeId === product._id ? "Show Less" : "Show All"}
        </button>
      )}



                                                                              {/* Modal for editing all variations */}
                                                                              <div
                                                                                    onClick={() => setPriceOn(false)}
                                                                                    className={`fixed z-[100] flex items-center justify-center ${priceOn?._id === product?._id
                                                                                          ? "visible opacity-100"
                                                                                          : "invisible opacity-0"
                                                                                          } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                                                              >
                                                                                    <div
                                                                                          onClick={(e_) => e_.stopPropagation()}
                                                                                          className={`absolute max-w-md rounded-sm bg-white p-6 drop-shadow-lg dark:bg-white dark:text-black ${priceOn?._id === product?._id
                                                                                                ? "scale-1 opacity-1 duration-300"
                                                                                                : "scale-0 opacity-0 duration-150"
                                                                                                }`}
                                                                                    >
                                                                                          <form onSubmit={handleEditPrice}>
                                                                                                <h2 className="text-lg font-medium text-gray-800 mb-4">
                                                                                                      Update Prices for All Variations
                                                                                                </h2>

                                                                                                {priceOn?.variations?.map((variation, index) => (
                                                                                                      <div key={variation.SKU} className="mb-4">
                                                                                                            <p>{variation.SKU}</p>
                                                                                                            {/* Input for price */}
                                                                                                            <input
                                                                                                                  name={`price-${index}`}
                                                                                                                  defaultValue={variation.price}
                                                                                                                  type="number" // Set input type to number for better validation
                                                                                                                  placeholder={`Update price for ${variation.SKU}`}
                                                                                                                  className="w-[130px] py-2 my-2 border px-2 rounded"
                                                                                                            />
                                                                                                            {/* Input for discount price */}
                                                                                                            <input
                                                                                                                  name={`offerPrice-${index}`}
                                                                                                                  defaultValue={variation.offerPrice}
                                                                                                                  type="number" // Set input type to number for better validation
                                                                                                                  placeholder={`Update discount price for ${variation.SKU}`}
                                                                                                                  className="w-[130px] py-2 border px-2 rounded"
                                                                                                            />
                                                                                                      </div>
                                                                                                ))}

                                                                                                <div className="flex justify-between">
                                                                                                      <button
                                                                                                            type="submit"
                                                                                                            className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                                                                                                      >
                                                                                                            Update All
                                                                                                      </button>
                                                                                                      <button
                                                                                                            onClick={() => setPriceOn(false)}
                                                                                                            className="rounded-sm border ed-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                                                                                                      >
                                                                                                            Cancel
                                                                                                      </button>
                                                                                                </div>
                                                                                          </form>
                                                                                    </div>
                                                                              </div>


                                                                        </span>
                                                                  </td>

                                                                  <td   className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="relative">
            {/* Dropdown Toggle */}
            <button
              onClick={() => toggleDropdown(product._id)}
              className="transition-colors duration-200 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
                <HiOutlineDotsVertical className="w-6 h-6" />
            </button>

            {/* Dropdown Menu */}
            {openDropdownId === product._id && (
             <div className={`absolute z-50 w-38 px-2 py-2 right-0 bg-white border border-gray-200 shadow-lg rounded-lg top-full  mb-2`}>  {/* Trash/Restore Button */}
                {!product.trash ? (
                  <button
                    onClick={() => trash_product({ id: product._id, trash: true })}
                    className="block w-full text-left text-red-500 hover:text-red-700 transition-colors duration-200 mb-2"
                  >
                    <MdDelete className="inline-block mr-2 w-5 h-5" />
                    Trash
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => trash_product({ id: product._id, trash: false })}
                      className="block w-full text-left text-green-500 hover:text-green-700 transition-colors duration-200 mb-2"
                    >
                      <CiRedo className="inline-block mr-2 w-5 h-5" />
                      Restore
                    </button>
                    <button
                      onClick={() => DeleteSeller(product._id)}
                      className="block w-full text-left text-red-500 hover:text-red-700 transition-colors duration-200 mb-2"
                    >
                      <MdDelete className="inline-block mr-2 w-5 h-5" />
                      Delete Permanently
                    </button>
                  </>
                )}

                {/* Edit Button */}
                <button
                  onClick={() =>
                    navigate(`/seller/product-management/edit/${product._id}`, { state: product })
                  }
                  className="block w-full text-left text-green-700 hover:text-green-500 transition-colors duration-200 mb-2"
                >
                  <BiEdit className="inline-block mr-2 w-5 h-5" />
                  Edit
                </button>

                {/* View Button */}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                        shopInfo?.domain
                              ? `https://${shopInfo.domain}/product/${product._id}`
                              : `https://${shopInfo.subDomain}/product/${product._id}`
                  }
                  className="block w-full text-left text-blue-700 hover:text-blue-500 transition-colors duration-200 mb-2"
                >
                  <BsEye className="inline-block mr-2 w-5 h-5" />
                  View
                </a>

                {/* Reject Status Re-Request */}
                {product.product_status === "reject" && product.message && (
                  <div>
                    <button
                      onClick={() => ReRejectStatusRequestHandler(product._id)}
                      className="block w-full text-left text-white bg-red-500 hover:bg-red-700 transition-colors duration-200 rounded p-2 mb-2"
                    >
                      {loadingWebRequest ? "Sending..." : "Re-Request"}
                    </button>
                    <p className="text-red-500 text-sm">{product.message}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </td>
                                                            </tr>
                                                     ))}
                                                {isOpenWarehouse && (
                                                      <div className="container mx-auto py-20">
                                                            <div
                                                                  className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90  px-4 py-5 ${isOpenWarehouse ? "block" : "hidden"
                                                                        }`}
                                                            >
                                                                  <div className="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px]">
                                                                        <h3 className="pb-2 text-xl font-bold text-dark sm:text-2xl">
                                                                              It Is not your warehouse
                                                                        </h3>

                                                                        <span
                                                                              className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
                                                                        ></span>
                                                                        <p className="mb-10 text-base leading-relaxed text-body-color">
                                                                              <span>
                                                                                    You can Edit your warehouse by Click on Edit
                                                                                    button. For Cancel Click on OK button
                                                                              </span>
                                                                              <br />
                                                                        </p>
                                                                        <div className="flex flex-wrap -mx-3">
                                                                              <div className="w-1/2 px-3">
                                                                                    <button
                                                                                          // onClick={() => SubmitData(false)}
                                                                                          onClick={() => navigateWareHouseFunction()}
                                                                                          className="block w-full rounded-lg border  p-3 text-center text-base font-medium text-dark transition border-green-600 hover:bg-green-600 hover:text-white"
                                                                                    >
                                                                                          Edit
                                                                                    </button>
                                                                              </div>
                                                                              <div className="w-1/2 px-3">
                                                                                    <button
                                                                                          onClick={() => setIsWarehouse(false)}
                                                                                          className={`block w-full p-3 text-base font-medium text-center text-white transition border rounded-lg border-primary bg-red-600 hover:bg-red-700`}
                                                                                    >
                                                                                          OK
                                                                                    </button>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                )}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  </div>
                  {rejectMessage && (
                        <div>
                              <div>
                                    <div
                                          onClick={() => setRejectMessage(false)}
                                          className={`fixed z-[100] flex items-center justify-center visible opacity-100 inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                    >
                                          <div
                                                className={`text- absolute w-[400px] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-white dark:text-black ${rejectMessage._id
                                                      ? "scale-1 opacity-1 duration-300"
                                                      : "scale-0 opacity-0 duration-150"
                                                      }`}
                                          >
                                                <form>
                                                      <h1 className="mb-2 text-2xl font-semibold">
                                                            Rejected Message!
                                                      </h1>
                                                      <textarea
                                                            name="message"
                                                            value={rejectMessage?.message}
                                                            className="w-full border mb-6 p-2"
                                                            placeholder=" rejected message"
                                                      />
                                                      <div className="flex justify-between">
                                                            <button
                                                                  type="button"
                                                                  onClick={() => setRejectMessage(false)}
                                                                  className="rounded-sm border ed-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                                                            >
                                                                  Cancel
                                                            </button>
                                                      </div>
                                                </form>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  )}
                  <div className="flex items-center gap-4 mt-6">
                        <button
                              onClick={() =>
                                    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                              }
                              disabled={currentPage === 1}
                              className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100  "
                        >
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 rtl:-scale-x-100"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                    />
                              </svg>
                              <span>Previous</span>
                        </button>

                        {/* Show all pages */}
                        <div className="flex items-center gap-x-3">
                              {Array.from(
                                    { length: Math.ceil(filteredData?.length / pageSize) },
                                    (_, index) => (
                                          <div
                                                key={index}
                                                className={`flex items-center px-3 py-2 cursor-pointer text-sm text-gray-700 capitalize transition-colors duration-200 border rounded-md gap-x-2   ${currentPage === index + 1
                                                      ? "bg-blue-500 text-white"
                                                      : "bg-blue-100/60 text-blue-500"
                                                      }`}
                                                onClick={() => setCurrentPage((prevPage) => index + 1)}
                                          >
                                                <span>{index + 1}</span>
                                          </div>
                                    )
                              )}
                        </div>

                        <button
                              onClick={() =>
                                    setCurrentPage((prevPage) =>
                                          Math.min(
                                                prevPage + 1,
                                                Math.ceil(filteredData?.length / pageSize)
                                          )
                                    )
                              }
                              disabled={
                                    currentPage === Math.ceil(filteredData?.length / pageSize)
                              }
                              className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100  "
                        >
                              <span>Next</span>
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 rtl:-scale-x-100"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                              </svg>
                        </button>
                  </div>
            </div>

      );
}
