import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsViewList } from "react-icons/bs";
import { MdDelete, MdOutlineViewInAr } from "react-icons/md";
import EditProductForm from "./EditProduct";
import DemoImage from "./woocommerce-placeholder-600x600.png";
import Swal from "sweetalert2";
import DeleteModal from "../../../../../Common/DeleteModal";
import { BiEdit, BiLeftArrow, BiRightArrow } from "react-icons/bi";
import WebStoreproduct from "./WebStoreProducts";
import PrintPage from "./SellerPrintPage";
import SellerPrintPage from "./SellerPrintPage";
import { RxCross2 } from "react-icons/rx";
import jsPDF from "jspdf";
import Barcode from "react-barcode";

const SellerAllProducts = () => {
  const navigate = useNavigate();
  const { shopInfo } = useContext(AuthContext);
  const [loadingStates, setLoadingStates] = useState({});
  const [printProduct, setPrintProduct] = useState([]);
  const [priceOn, setPriceOn] = useState(false);
  const [stockOn, setStockOn] = useState(false);

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `https://salenow-v2-backend.vercel.app/api/v1/seller/all-products/${shopInfo._id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const [openModal, setOpenModal] = useState(false);
  const [onModal, setOnModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [webStoreProduct, setWebStoreProduct] = useState(false);

  const maxLength = 30;
  const pageSize = 6;

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData =
    products.length &&
    products?.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        (item.sku && item?.sku?.toString()?.includes(searchQuery))
    );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get the current page data
  const currentData = filteredData && filteredData?.slice(startIndex, endIndex);

  const updateProductStatus = (id, status) => {
    console.log(id);
    fetch(
      `https://salenow-v2-backend.vercel.app/api/v1/seller/update-product-status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire(`Success`, "", "success");
        refetch();
      });
  };

  const [deleteId, setDeletId] = useState("");
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const DeleteSeller = (id) => {
    console.log(id);
    setDeletId(id);
    setDeletePopUp(true);
  };
  if (isDelete) {
    fetch(
      `https://salenow-v2-backend.vercel.app/api/v1/seller/delete-product`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: deleteId,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setIsDelete(false);
        Swal.fire("Delete Success", "", "success");
        refetch();
      });

    console.log(deleteId, isDelete);
  }

  const updateProduct = (id, sku, item_id, category) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [id]: true,
    }));
    const data = { category, item_id, sku, id, shopId: shopInfo._id };
    fetch(
      "https://salenow-v2-backend.vercel.app/api/v1/seller/update-product",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoadingStates((prevLoadingStates) => ({
          ...prevLoadingStates,
          [id]: false,
        }));
        if (data.error) {
          Swal.fire(`${data.message}`, "", "warning");
        } else {
          Swal.fire(`${data.message}`, "", "success");
          refetch();
        }
      });
  };

  const { data: priceRole = [] } = useQuery({
    queryKey: ["priceRole"],
    queryFn: async () => {
      const res = await fetch(
        `https://salenow-v2-backend.vercel.app/api/v1/seller/get-price-role/${shopInfo?._id}`
      );
      const data = await res.json();
      return data?.data;
    },
  });

  // select product
  const [selectProducts, setSelectProducts] = useState([]);
  const [on, setOn] = useState(null);

  const handleUpdateCheck = (productId) => {
    setSelectProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(productId)) {
        return prevSelectedProducts.filter((id) => id !== productId);
      } else {
        return [...prevSelectedProducts, productId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectProducts.length === products.length) {
      // If all products are already selected, deselect all
      setSelectProducts([]);
    } else {
      // Otherwise, select all products
      const allProductIds = products.map((product) => product._id);
      setSelectProducts(allProductIds);
    }
  };

  const logSelectedProducts = () => {
    const selectedProductData = products.filter((product) =>
      selectProducts.includes(product._id)
    );
    setPrintProduct(selectedProductData);
    setOn(!on);
  };

  const handleEditPrice = (e) => {
    e.preventDefault();
    const editPrice = e.target.editPrice.value;

    console.log(editPrice);
    setPriceOn(false);
  };

  const handleEditStock = (e) => {
    e.preventDefault();
    const editStock = e.target.editStock.value;

    console.log(editStock);
    setStockOn(false);
  };

  const update_product_multi_vendor = (id, status) => {
    fetch(
      `https://salenow-v2-backend.vercel.app/api/v1/seller/update-product-multivendor`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire(`Success`, "", "success");
        refetch();
      });
  };

  const barcode_generate = () => {
    const pdf = new jsPDF();
    const barcodesPerRow = 3;
    const maxProductsPerPage = 15;
    let productsDisplayed = 0;
    let pageIndex = 0;
    let yPos = 10;

    selectProducts.forEach((productId, index) => {
      // Create a barcode for each product ID using JsBarcode
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, productId, {
        format: "CODE128", // You can specify the barcode format here
        displayValue: false, // Hide the text beneath the barcode
      });

      // Convert canvas to base64 image
      const imgData = canvas.toDataURL("image/png");

      // Add barcode image to PDF
      if (productsDisplayed >= maxProductsPerPage) {
        pdf.addPage();
        pageIndex++; // Increment page index
        yPos = 10; // Reset y position for new page
        productsDisplayed = 0; // Reset products displayed counter
      }

      const rowIndex = Math.floor(productsDisplayed / barcodesPerRow);
      const colIndex = productsDisplayed % barcodesPerRow;

      const xPos = 10 + colIndex * 70; // Adjust position for each column

      pdf.addImage(imgData, "PNG", xPos, yPos, 50, 25); // Adjust position and size as needed
      pdf.setFontSize(11); // Adjust font size for product ID
      pdf.text(xPos, yPos + 30, `${productId}`); // Adjust position for product ID

      productsDisplayed++;

      if (colIndex === barcodesPerRow - 1) {
        yPos += 60; // Increase y position for next row
      }
    });

    // Save or navigate to the PDF page
    pdf.save("barcodes.pdf"); // Save PDF
  };

  const update_product_sorting = (e) => {
    console.log(e.target.value);
    fetch(
      `https://salenow-v2-backend.vercel.app/api/v1/seller/update-product-upcoming`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: e.target.value,
          ids: selectProducts,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire(`Success`, "", "success");
        refetch();
        // meed to reset e  console.log(e.target.value);
        setSelectProducts([]);
      });
  };

  return (
    <div className="">
      <div className="h-0 w-0">
        {" "}
        <DeleteModal
          setOpenModal={setDeletePopUp}
          OpenModal={deletePopUp}
          setIsDelete={setIsDelete}
        />
      </div>

      <Link
        className="group relative inline-flex mb-10 items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
        to="/seller/product-management/add-product"
      >
        <span className="absolute -start-full transition-all group-hover:start-4">
          <svg
            className="h-5 w-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>

        <span className="text-sm font-medium transition-all group-hover:ms-4">
          Add Product
        </span>
      </Link>

      <div className="flex items-center justify-between">
        <div className="relative w-3/5 my-6">
          <input
            type="text"
            id="Search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for..."
            className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>

        <button
          onClick={() => setWebStoreProduct(!webStoreProduct)}
          className="px-6 py-2 bg-black text-white rounded-md"
        >
          {webStoreProduct ? "My Store" : "Web Store"}
        </button>
      </div>

      <section>
        <div className="flex items-center justify-between gap-x-3">
          <div className="flex items-center">
            <h2 className="text-lg font-medium text-gray-800 ">All Product</h2>
            <span className="px-3 py-1 text-xs  bg-blue-100 rounded-full d text-blue-400">
              {products?.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {selectProducts.length ? (
              <select
                onChange={update_product_sorting}
                className="px-8 py-2"
                name=""
                id=""
              >
                <option>Select Status</option>
                <option value={false}>For Your Product</option>
                <option value={true}>Upcoming Product</option>
              </select>
            ) : (
              ""
            )}
            <button
              onClick={barcode_generate}
              className="bg-blue-500 px-8 py-2 rounded text-white"
            >
              Barcode Generate
            </button>

            <button
              onClick={logSelectedProducts}
              disabled={!selectProducts.length}
              className="bg-blue-500 px-8 py-2 rounded text-white"
            >
              Print
            </button>
          </div>{" "}
        </div>
        {webStoreProduct ? (
          <WebStoreproduct priceRole={priceRole} searchQuery={searchQuery} />
        ) : (
          <div className="flex flex-col mt-6">
            <div
              style={{
                overflowY: "scroll", // Always show the scrollbar
                scrollbarWidth: "thin", // For Firefox
                scrollbarColor: "gray transparent", // Set scrollbar color (gray) for Firefox
                msOverflowStyle: "scrollbar", // For Internet Explorer and Edge
              }}
              className="overflow-x-scroll  "
            >
              <div className=" w-[1700px]">
                {on && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 m-auto z-[3000]">
                    {" "}
                    <SellerPrintPage setOn={setOn} products={printProduct} />
                  </div>
                )}

                <div className="overflow-hidden border  border-gray-700 md:rounded-lg">
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
                                selectProducts.length === products.length
                              }
                              onChange={handleSelectAll}
                            />
                          </label>
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm border font-normal text-left rtl:text-right "
                        >
                          <div className="flex items-center gap-x-3">
                            <span>Name</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 border text-sm font-normal text-left rtl:text-right "
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Status</span>
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
                          Regular Price
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 border text-sm font-normal text-left rtl:text-right "
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 border text-sm font-normal text-left rtl:text-right "
                        >
                          Stock Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-4 border py-3.5 text-sm font-normal text-center  "
                        >
                          <span>Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y  divide-gray-200 ">
                      {currentData &&
                        currentData
                          ?.sort((a, b) => b.createdAt - a.createdAt)
                          .map((product) => (
                            <tr>
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
                                  <div className="flex relative items-center gap-x-2">
                                    {product?.images[0] ? (
                                      <div className="imgSm  ">
                                        <img
                                          className="object-cover w-10 h-10 rounded"
                                          srcSet={product?.images[0].src}
                                          src={product?.images[0].src}
                                          alt=""
                                        />
                                        <div
                                          style={{
                                            backgroundImage: `url(${product?.images[0].src})`,
                                          }}
                                          className="absolute top-[-40px] duration-150 abs hidden bg-[url(${product?.featuredImage?.src})] left-[43px] object-cover bg-cover bg-white shadow-xl opacity-100 z-50 w-[150px] h-[150px] ring-1 ring-gray-500"
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
                              <td className="px-12 py-4 text-sm font-medium text-gray-700 flex gap-4 items-start  whitespace-nowrap">
                                {!product.adminWare ? (
                                  <div>
                                    {product.status === true ? (
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
                                    ) : (
                                      <div
                                        onClick={() =>
                                          updateProductStatus(
                                            product?._id,
                                            true
                                          )
                                        }
                                        className="inline-flex items-center px-3 py-1 rounded-full  cursor-pointer gap-x-2 bg-emerald-100/60 bg-gray-800"
                                      >
                                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                        <h2 className="text-sm font-normal text-red-500">
                                          Inactive
                                        </h2>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div>
                                    {!product?.status ? (
                                      <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800">
                                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                                        <h2 className="text-sm font-normal text-yellow-500">
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

                                {product?.multiVendor === true ? (
                                  <div
                                    onClick={() =>
                                      update_product_multi_vendor(
                                        product._id,
                                        false
                                      )
                                    }
                                    className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800"
                                  >
                                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                                    <h2 className="text-sm font-normal text-yellow-500">
                                      Multi Vendor
                                    </h2>
                                  </div>
                                ) : (
                                  <div
                                    onClick={() =>
                                      update_product_multi_vendor(
                                        product._id,
                                        true
                                      )
                                    }
                                    className="inline-flex items-center px-3 py-1 rounded-full  cursor-pointer gap-x-2 bg-emerald-100/60 bg-gray-800"
                                  >
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    <h2 className="text-sm font-normal text-emerald-500">
                                      Single Vendor
                                    </h2>
                                  </div>
                                )}
                              </td>

                              <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                {product?.categories
                                  .filter(
                                    (category) =>
                                      category !== null && category !== ""
                                  )
                                  .map((category) => (
                                    <span key={category?.id}>
                                      {category?.name},{" "}
                                    </span>
                                  ))}
                              </td>
                              <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                {product.regular_price}
                              </td>
                              <td className="px-4  py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  {product.price}{" "}
                                  <button onClick={() => setPriceOn(product)}>
                                    {" "}
                                    <BiEdit className="text-lg" />
                                  </button>
                                  <div
                                    onClick={() => setPriceOn(false)}
                                    className={`fixed z-[100] flex items-center justify-center ${
                                      priceOn?._id == product?._id
                                        ? "visible opacity-100"
                                        : "invisible opacity-0"
                                    } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                  >
                                    <div
                                      onClick={(e_) => e_.stopPropagation()}
                                      className={`text- absolute max-w-md rounded-sm bg-white p-6 drop-shadow-lg dark:bg-white dark:text-black ${
                                        priceOn?._id == product?._id
                                          ? "scale-1 opacity-1 duration-300"
                                          : "scale-0 opacity-0 duration-150"
                                      }`}
                                    >
                                      <form onSubmit={handleEditPrice}>
                                        <h2 className="text-lg font-medium text-gray-800 mb-4">
                                          Update Price
                                        </h2>
                                        <input
                                          name="editPrice"
                                          defaultValue={priceOn?.price}
                                          type="text"
                                          placeholder="update price"
                                          className="w-[300px] py-2 my-4 border px-2 rounded"
                                        />
                                        <div className="flex justify-between">
                                          <button
                                            type="submit"
                                            className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                                          >
                                            Update
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
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm border-2 whitespace-nowrap">
                                <div className="flex items-center gap-x-2">
                                  <div className="flex items-center gap-2">
                                    <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
                                      {product?.stock_quantity}
                                    </p>
                                    <button onClick={() => setStockOn(product)}>
                                      {" "}
                                      <BiEdit className="text-lg" />
                                    </button>

                                    <div
                                      onClick={() => setStockOn(false)}
                                      className={`fixed z-[100] flex items-center justify-center ${
                                        stockOn?._id == product?._id
                                          ? "visible opacity-100"
                                          : "invisible opacity-0"
                                      } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                    >
                                      <div
                                        onClick={(e_) => e_.stopPropagation()}
                                        className={`text- absolute max-w-md rounded-sm bg-white p-6 drop-shadow-lg dark:bg-white dark:text-black ${
                                          stockOn?._id == product?._id
                                            ? "scale-1 opacity-1 duration-300"
                                            : "scale-0 opacity-0 duration-150"
                                        }`}
                                      >
                                        <form onSubmit={handleEditStock}>
                                          <h2 className="text-lg font-medium text-gray-800 mb-4">
                                            Update Stock Quantity
                                          </h2>
                                          <input
                                            name="editStock"
                                            defaultValue={
                                              stockOn?.stock_quantity
                                            }
                                            type="text"
                                            placeholder="update price"
                                            className="w-[300px] py-2 my-4 border px-2 rounded"
                                          />
                                          <div className="flex justify-between">
                                            <button
                                              type="submit"
                                              className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                                            >
                                              Update
                                            </button>

                                            <button
                                              onClick={() => setStockOn(false)}
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
                                    href={`/shop/doob/product/${product._id}`}
                                  >
                                    <BsEye />
                                  </a>

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
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

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
                      className={`px-2 py-1 text-sm rounded-md ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-blue-100/60 text-blue-500"
                      }`}
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
        )}
      </section>
    </div>
  );
};
export default SellerAllProducts;
