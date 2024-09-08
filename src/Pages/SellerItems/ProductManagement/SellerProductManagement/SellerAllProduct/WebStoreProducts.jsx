import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { MdDelete, MdOutlineViewInAr } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import DemoImage from "./woocommerce-placeholder-600x600.png";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../../../Common/DeleteModal";
import PrintList from "../PrintList";
import LoaderData from "../../../../../Common/LoaderData";
import { BsEye } from "react-icons/bs";

export default function WebStoreproduct({ isLoading, productData, handleUpdateCheck, handleSelectAll, selectProducts, setOn, on, priceRole, searchQuery, isOpenWarehouse, setRejectMessage, rejectMessage, priceOn, handleEditPrice, calculateTotalQuantity, stockOn, handleEditStock, onModal, setPriceOn, setStockOn, updateProductStatus, update_product_multi_vendor, refetchProduct, navigateWareHouseFunction, printProduct }) {
      const { shopInfo } = useContext(AuthContext);
      const [currentPage, setCurrentPage] = useState(1);
      const pageSize = 10;
      const navigate = useNavigate();
      const [loadingStates, setLoadingStates] = useState({});
      const filteredData = productData?.filter(
            (item) =>
                  item.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                  (item.sku && item?.sku?.toString()?.includes(searchQuery))
      );

      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      // Get the current page data
      const currentData = filteredData?.slice(startIndex, endIndex);

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
                        Swal.fire("Delete Success", "", "success");
                        refetchProduct();
                  });

            console.log(deleteId, isDelete);
      }
      

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
                        Swal.fire(`Success`, "", "success");
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
                        style={{
                              overflowY: "scroll", // Always show the scrollbar
                              scrollbarWidth: "thin", // For Firefox
                              scrollbarColor: "gray transparent", // Set scrollbar color (gray) for Firefox
                              msOverflowStyle: "scrollbar", // For Internet Explorer and Edge
                        }}
                        className="overflow-x-scroll  "
                  >
                        <div className=" w-[100%]">
                              {on && (
                                    <div className="absolute top-0 left-0 right-0 bottom-0 m-auto z-[3000]">
                                          {" "}
                                          <PrintList setOn={setOn} products={printProduct} />
                                    </div>
                              )}

                              <div className="overflow-x-scroll border  border-gray-700 md:rounded-lg">
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
                                                                              selectProducts.length === productData.length
                                                                        }
                                                                        onChange={handleSelectAll}
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
                                                            className="px-2 py-3.5 border  text-sm font-normal text-center rtl:text-right "
                                                      >
                                                            <button className="flex">
                                                                  <span>Sync</span>
                                                            </button>
                                                      </th>
                                                      <th
                                                            scope="col"
                                                            className="px-2 py-3.5 border  text-sm font-normal text-center rtl:text-right "
                                                      >
                                                            <button className="flex">
                                                                  <span>Source</span>
                                                            </button>
                                                      </th>
                                                      <th
                                                            scope="col"
                                                            className="px-2 py-3.5 border  text-sm font-normal text-center rtl:text-right "
                                                      >
                                                            <button className="flex">
                                                                  <span>Shop</span>
                                                            </button>
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
                                          {isLoading && <LoaderData />}
                                          <tbody className="bg-white divide-y  divide-gray-200 ">
                                                {currentData
                                                      ? currentData?.map((product, index) => (
                                                            <tr key={product._id}>
                                                                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap   flex items-center justify-center">
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



                                                                  <td className="px-4 py-4 text-sm border-2 font-medium text-gray-700 whitespace-nowrap">
                                                                        <div className="inline-flex items-center gap-x-3">
                                                                              <div className="flex relative  items-center gap-x-2">
                                                                                    {product?.images.length ? (
                                                                                          <div className="imgSm w-10 ">
                                                                                                <img
                                                                                                      className="object-cover w-10 h-10 rounded"
                                                                                                      srcSet={product?.featuredImage?.src ?? product?.images[1].src}
                                                                                                      src={product?.featuredImage?.src ?? product?.images[1].src}
                                                                                                      alt="Product"
                                                                                                />
                                                                                                <div
                                                                                                      style={{
                                                                                                            backgroundImage: `url(${product?.featuredImage?.src})`,
                                                                                                      }}
                                                                                                      className="absolute top-[-40px] duration-150 abs hidden bg-[url(${product?.featuredImage?.src})] left-[43px] object-cover bg-cover rounded bg-white shadow-xl opacity-100 z-[1000] w-[150px] h-[150px] ring-1 ring-gray-500"
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
                                                                                    </div>
                                                                              </div>
                                                                        </div>
                                                                  </td>

                                                                  <td className="px-4 border-r">
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
                                                                  </td>
                                                                  <td className="border-r">
                                                                        <div className="flex justify-center">
                                                                              {(product?.daraz && (
                                                                                    <img
                                                                                          className="w-14 "
                                                                                          src="https://doob.com.bd/assets/Daraz-fe21961a.svg"
                                                                                    />
                                                                              )) ||
                                                                                    (product?.woo && (
                                                                                          <img
                                                                                                className="w-14 "
                                                                                                src="https://doob.com.bd/assets/woocommerce-icon-236845b7.svg"
                                                                                          />
                                                                                    ))}
                                                                        </div>
                                                                  </td>
                                                                  <td className="">
                                                                        <div className="flex justify-center">
                                                                        DOOB
                                                                        </div>
                                                                  </td>
                                                                  
                                                                  <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                                                                      {product?.darazSku?.[0]?.shop || ''}
                                                                                    </td>
                                                                  <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                                                        {product?.categories
                                                                              .filter(
                                                                                    (category) =>
                                                                                          category !== null && category !== ""
                                                                              )
                                                                              .map((category) => (
                                                                                    <span key={category?.id}>
                                                                                          <div>{category?.name}</div>
                                                                                    </span>
                                                                              ))}
                                                                  </td>
                                                                  <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                                                                    {product?.warehouse?.filter(
                                                                                                      (item) => item?.name
                                                                                                )?.length
                                                                                                      ? product?.warehouse?.map((ware, index) => (
                                                                                                            <p key={ware?.name}>{ware?.name}</p>
                                                                                                      ))
                                                                                                      : "No Warehouse"}
                                                                                    </td>
                                                                  <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                                                                          <span className="text-sm text-gray-500">
                                                                                          <div className="flex items-center gap-2 py-3">
                                                                                          price:
                                                                                                <button onClick={() => setPriceOn(product)}>
                                                                                                <BiEdit className="text-lg" />
                                                                                                </button>
                                                                                          </div>
                                                                                                {" "}
                                                                                                {product?.variations?.map((varian) => {
                                                                                                      if (varian?.SKU) {
                                                                                                            return <div className="py-2"><p>{varian?.SKU}</p><span>QTY:{varian?.quantity}</span>||<span>Price:{varian?.offerPrice || varian?.price} </span> <hr></hr></div>;
                                                                                                      }
                                                                                                })}
                                                                                               {product?.multiVendor && (
                                                                                                <div>
                                                                                                <p>
                                                                                                      Range: 1-{product.variantData.product1?.quantity || 1} = Price: {product.variantData.product1?.quantityPrice || "N/A"}
                                                                                                </p>
                                                                                                <p>
                                                                                                      Range: {product.variantData.product1?.quantity + 1 || 2}-{product.variantData.product2?.quantity || product.variantData.product1?.quantity + 9} = Price: {product.variantData.product2?.quantityPrice || "N/A"}
                                                                                                </p>
                                                                                                <p>
                                                                                                      Range: {product.variantData.product2?.quantity + 1 || 11}-{product.variantData.product3?.quantity || product.variantData.product2?.quantity + 40} = Price: {product.variantData.product3?.quantityPrice || "N/A"}
                                                                                                </p>
                                                                                                </div>
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
                                                                                                            className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                                                                                                            >
                                                                                                            Cancel
                                                                                                            </button>
                                                                                                      </div>
                                                                                                      </form>
                                                                                                      </div>
                                                                                                </div>
                                                                                               

                                                                                          </span>     
                                                                                    </td>

                                                                  <td className="px-4 py-4 text-sm border-2 whitespace-nowrap">
                                                                        <div className="flex items-center gap-x-6">
                                                                              <button
                                                                                    onClick={() => DeleteSeller(product._id)}
                                                                                    className=" transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none"
                                                                              >
                                                                                    <MdDelete className="w-5 h-5" />
                                                                              </button>

                                                                              {/* <Link
                                    to={`/seller/product-management/edit/${product?._id}`}
                                    onClick={() => setOnModal(product)}
                                    className=" transition-colors duration-200 hover:text-green-500  text-green-700 focus:outline-none mr-4"
                                  >

                                    <BiEdit className="w-5 h-5" />
                                  </Link> */}
                                                                              <button
                                                                                    // to={`/seller/product-management/edit/${product?._id}`}
                                                                                    // onClick={() => setOnModal(product)}
                                                                                    onClick={() =>
                                                                                          navigate(
                                                                                                `/seller/product-management/edit/${product?._id}`,
                                                                                                {
                                                                                                      state: product,
                                                                                                }
                                                                                          )
                                                                                    }
                                                                                    className=" transition-colors duration-200 hover:text-green-500  text-green-700 focus:outline-none mr-4"
                                                                              >
                                                                                    <BiEdit className="w-5 h-5" />
                                                                              </button>

                                                                              <a
                                                                                    target="_blank"
                                                                                    href={`/shop/${shopInfo.shopId}/product/${product._id}`}
                                                                              >
                                                                                    <BsEye />
                                                                              </a>

                                                                              {product?.product_status === "reject" &&
                                                                                    product?.message && (
                                                                                          <div>
                                                                                                <button
                                                                                                      onClick={() =>
                                                                                                            ReRejectStatusRequestHandler(
                                                                                                                  product?._id
                                                                                                            )
                                                                                                      }
                                                                                                      className="p-2 transition-colors duration-200 hover:bg-red-700  bg-red-500 focus:outline-none mr-4 text-white rounded font-semibold"
                                                                                                >
                                                                                                      {isLoadingRequest && "sending.."} Re
                                                                                                      Request
                                                                                                </button>
                                                                                                <p className="text-red-500 text-sm pt-2 ">
                                                                                                      {product?.message}
                                                                                                </p>
                                                                                          </div>
                                                                                    )}

                                                                              {/* <button product={product} onClick={() => setOnModal(product)} className=" transition-colors duration-200 hover:text-green-500  text-green-700 focus:outline-none mr-4">
                                                            <BiEdit className="w-5 h-5" />
                                                        </button> */}
                                                                              {product.woo && (
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                updateProduct(
                                                                                                      product._id,
                                                                                                      product.sku,
                                                                                                      product.item_id,
                                                                                                      "woo"
                                                                                                )
                                                                                          }
                                                                                          className=" transition-colors duration-200 hover:text-yellow-500  text-yellow-700 focus:outline-none mr-4"
                                                                                    >
                                                                                          {loadingStates[product._id]
                                                                                                ? "Updating..."
                                                                                                : "Update on woo"}
                                                                                    </button>
                                                                              )}
                                                                              {product.daraz && (
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                updateProduct(
                                                                                                      product._id,
                                                                                                      product.variations[0].SKU,
                                                                                                      product.item_id,
                                                                                                      "daraz"
                                                                                                )
                                                                                          }
                                                                                          className=" transition-colors duration-200 hover:text-yellow-500  text-yellow-700 focus:outline-none mr-4"
                                                                                    >
                                                                                          {loadingStates[product._id]
                                                                                                ? "Updating..."
                                                                                                : "Update on Daraz"}
                                                                                    </button>
                                                                              )}

                                                                              {/* modal */}
                                                                              {onModal?._id === product?._id && (
                                                                                    <div
                                                                                          className={`bg-white p-6 fixed w-screen h-full top-0 left-0 z-[3000]`}
                                                                                    >
                                                                                          <EditProductForm product={onModal} />
                                                                                    </div>
                                                                              )}
                                                                        </div>
                                                                        <div></div>
                                                                  </td>
                                                            </tr>
                                                      ))
                                                      : ""}
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
                                                                  className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
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
            //     <div className="flex flex-col ">
            //       <div className="h-0 w-0">
            //         {" "}
            //         <DeleteModal
            //           setOpenModal={setDeletePopUp}
            //           OpenModal={deletePopUp}
            //           setIsDelete={setIsDelete}
            //         />
            //       </div>

            //       <div
            //         style={{
            //           overflowY: "scroll", // Always show the scrollbar
            //           scrollbarWidth: "thin", // For Firefox
            //           scrollbarColor: "gray transparent", // Set scrollbar color (gray) for Firefox
            //           msOverflowStyle: "scrollbar", // For Internet Explorer and Edge
            //         }}
            //         className="  "
            //       >
            //         <div className=" w-[100%]">
            //           <div className="overflow-x-scroll border  border-gray-700 md:rounded-lg">
            //             <table className="w-full">
            //               <thead className="bg-gray-900 text-white ">
            //                 <tr>
            //                   <th
            //                     scope="col"
            //                     className="py-3.5 px-4 text-sm border font-normal text-left rtl:text-right "
            //                   >
            //                     <div className="flex items-center gap-x-3">
            //                       <span>Name</span>
            //                     </div>
            //                   </th>
            //                   <th
            //                     scope="col"
            //                     className="px-12 py-3.5 border text-sm font-normal text-left rtl:text-right "
            //                   >
            //                     <button className="flex items-center gap-x-2">
            //                       <span>Status</span>
            //                     </button>
            //                   </th>
            //                   <th
            //                     scope="col"
            //                     className="px-4 py-3.5 text-sm border font-normal text-left rtl:text-right "
            //                   >
            //                     <button className="flex items-center gap-x-2">
            //                       <span>Categories</span>
            //                     </button>
            //                   </th>
            //                   <th
            //                     scope="col"
            //                     className="px-4 py-3.5 text-sm border font-normal text-left rtl:text-right "
            //                   >
            //                     Regular Price
            //                   </th>
            //                   <th
            //                     scope="col"
            //                     className="px-4 py-3.5 border text-sm font-normal text-left rtl:text-right "
            //                   >
            //                     Price
            //                   </th>
            //                   <th
            //                     scope="col"
            //                     className="px-4 py-3.5 border text-sm font-normal text-left rtl:text-right "
            //                   >
            //                     Your Price
            //                   </th>
            //                   <th
            //                     scope="col"
            //                     className="px-4 py-3.5 border text-sm font-normal text-left rtl:text-right "
            //                   >
            //                     Stock Quantity
            //                   </th>
            //                   <th
            //                     scope="col"
            //                     className="px-4 border py-3.5 text-sm font-normal text-center  "
            //                   >
            //                     <span>Action</span>
            //                   </th>
            //                 </tr>
            //               </thead>
            //               <tbody className="bg-white divide-y  divide-gray-200 ">
            //                 {filteredData &&
            //                   currentData?.map((product) => (
            //                     <tr>
            //                       <td className="px-4 py-4 text-sm border-2 font-medium text-gray-700 whitespace-nowrap">
            //                         <div className="inline-flex items-center gap-x-3">
            //                           <div className="flex items-center gap-x-2">
            //                             {product?.images[0] ? (
            //                               <img
            //                                 className="object-cover w-10 h-10 rounded"
            //                                 srcSet={product?.images[0].src}
            //                                 src={product?.images[0].src}
            //                                 alt=""
            //                               />
            //                             ) : (
            //                               <img
            //                                 className="object-cover border border-black w-10 h-10 rounded"
            //                                 srcSet={DemoImage}
            //                                 src={DemoImage}
            //                                 alt=""
            //                               />
            //                             )}
            //                             <div>
            //                               <h2 className="font-medium text-gray-800  ">
            //                                 {product?.name.split(" ").slice(0, 5).join(" ")}
            //                               </h2>
            //                               <p className="text-sm font-normal text-gray-600 ">
            //                                 {product?.sku}
            //                               </p>
            //                             </div>
            //                           </div>
            //                         </div>
            //                       </td>
            //                       <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
            //                         {!product.adminWare ? (
            //                           <div>
            //                             {product?.status === true ? (
            //                               <div
            //                                 onClick={() =>
            //                                   update_status(product._id, false)
            //                                 }
            //                                 className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800"
            //                               >
            //                                 <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            //                                 <h2 className="text-sm font-normal text-emerald-500">
            //                                   Active
            //                                 </h2>
            //                               </div>
            //                             ) : (
            //                               <div
            //                                 onClick={() =>
            //                                   update_status(product?._id, true)
            //                                 }
            //                                 className="inline-flex items-center px-3 py-1 rounded-full  cursor-pointer gap-x-2 bg-emerald-100/60 bg-gray-800"
            //                               >
            //                                 <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            //                                 <h2 className="text-sm font-normal text-red-500">
            //                                   Inactive
            //                                 </h2>
            //                               </div>
            //                             )}
            //                           </div>
            //                         ) : (
            //                           <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800">
            //                             <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
            //                             <h2 className="text-sm font-normal text-yellow-500">
            //                               Pending
            //                             </h2>
            //                           </div>
            //                         )}
            //                       </td>
            //                       <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
            //                         {product?.categories
            //                           .filter(
            //                             (category) => category !== null && category !== ""
            //                           )
            //                           .map((category) => (
            //                             <span key={category?.id}>{category?.name}, </span>
            //                           ))}
            //                       </td>
            //                       <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
            //                         {product.regular_price}
            //                       </td>
            //                       <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
            //                         {product.price}
            //                       </td>
            //                       <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
            //                         {!myPriceRole(product?.price)
            //                           ? product?.regular_price
            //                           : myPriceRole(product?.price)}
            //                       </td>
            //                       <td className="px-4 py-4 text-sm border-2 whitespace-nowrap">
            //                         <div className="flex items-center gap-x-2">
            //                           <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
            //                             {product.stock_quantity}
            //                           </p>
            //                         </div>
            //                       </td>
            //                       <td className="px-4 py-4 text-sm border-2 whitespace-nowrap">
            //                         <div className="flex items-center gap-x-6">
            //                           <button
            //                             onClick={() => DeleteSeller(product._id)}
            //                             className=" transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none"
            //                           >
            //                             <MdDelete className="w-5 h-5" />
            //                           </button>
            //                           {/* edit Product */}

            //                           <button
            //                             // to={`/seller/product-management/edit/${product?._id}`}
            //                             // onClick={() => setOnModal(product)}
            //                             onClick={() =>
            //                               navigate(
            //                                 `/seller/product-management/edit/${product?._id}`,
            //                                 {
            //                                   state: product,
            //                                 }
            //                               )
            //                             }
            //                             className=" transition-colors duration-200 hover:text-green-500  text-green-700 focus:outline-none mr-4"
            //                           >
            //                             <BiEdit className="w-5 h-5" />
            //                           </button>

            //                           <button
            //                             onClick={() => setOpenModal(true)}
            //                             className=" transition-colors duration-200 hover:text-yellow-500  text-yellow-700 focus:outline-none mr-4"
            //                           >
            //                             <MdOutlineViewInAr className="w-5 h-5" />
            //                           </button>
            //                         </div>
            //                         <div></div>
            //                       </td>
            //                     </tr>
            //                   ))}
            //               </tbody>
            //             </table>
            //           </div>
            //         </div>
            //       </div>

            //       <div className="flex items-center justify-between mt-6">
            //         <button
            //           onClick={() =>
            //             setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            //           }
            //           disabled={currentPage === 1}
            //           className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100  "
            //         >
            //           <svg
            //             xmlns="http://www.w3.org/2000/svg"
            //             fill="none"
            //             viewBox="0 0 24 24"
            //             strokeWidth="1.5"
            //             stroke="currentColor"
            //             className="w-5 h-5 rtl:-scale-x-100"
            //           >
            //             <path
            //               strokeLinecap="round"
            //               strokeLinejoin="round"
            //               d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            //             />
            //           </svg>
            //           <span>previous</span>
            //         </button>
            //         {/* <div className="items-center hidden lg:flex gap-x-3">

            //                     <div className='px-2 py-1 text-sm text-blue-500 rounded-md  bg-blue-100/60'>

            //                         <span> {currentPage}</span>
            //                     </div>

            //                 </div> */}
            //         <div className="items-center hidden lg:flex gap-x-3">
            //           {Array.from(
            //             { length: Math.ceil(filteredData?.length / pageSize) },
            //             (_, index) => (
            //               <div
            //                 key={index}
            //                 className={`px-2 py-1 text-sm rounded-md ${currentPage === index + 1
            //                   ? "bg-blue-500 text-white"
            //                   : "text-blue-500 bg-blue-100/60"
            //                   }`}
            //                 onClick={() => setCurrentPage(index + 1)}
            //               >
            //                 <span>{index + 1}</span>
            //               </div>
            //             )
            //           )}
            //         </div>
            //         <button
            //           onClick={() =>
            //             setCurrentPage((prevPage) =>
            //               Math.min(prevPage + 1, Math.ceil(filteredData?.length / pageSize))
            //             )
            //           }
            //           disabled={currentPage === Math.ceil(filteredData?.length / pageSize)}
            //           className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100  "
            //         >
            //           <span>Next</span>
            //           <svg
            //             xmlns="http://www.w3.org/2000/svg"
            //             fill="none"
            //             viewBox="0 0 24 24"
            //             strokeWidth="1.5"
            //             stroke="currentColor"
            //             className="w-5 h-5 rtl:-scale-x-100"
            //           >
            //             <path
            //               strokeLinecap="round"
            //               strokeLinejoin="round"
            //               d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            //             />
            //           </svg>
            //         </button>
            //       </div>
            //     </div>
      );
}
