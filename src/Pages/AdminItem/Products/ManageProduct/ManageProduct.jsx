import React from "react";
import AddProduct from "../AddProduct";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import SellerPrintPage from "../../../SellerItems/ProductManagement/SellerProductManagement/SellerAllProduct/SellerPrintPage";
import WarehouseModal from "./WarehouseModal";
import { FaAngleRight } from "react-icons/fa6";
import EditProduct from "./EditProduct";
import jsPDF from "jspdf";
import Barcode from "react-barcode";
import { BiEdit, BiSave } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import PrintList from "./PrintList";

const ManageProduct = () => {
  const [openModal, setOpenModal] = useState(false);

  const [doobProduct, setDoobProduct] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products_for_admin"],
    queryFn: async () => {
      const res = await fetch(
        "https://backend.doob.com.bd/api/v1/admin/products"
      );
      const data = await res.json();
      return data;
    },
  });
  const { data: all_products = [], refetch: reload } = useQuery({
    queryKey: ["all_products"],
    queryFn: async () => {
      const res = await fetch(
        "https://backend.doob.com.bd/api/v1/admin/get-all-products"
      );
      const data = await res.json();
      return data;
    },
  });

  const { data: othersProduct = [] } = useQuery({
    queryKey: ["othersProducts"],
    queryFn: async () => {
      const res = await fetch(
        "https://backend.doob.com.bd/api/v1/admin/others-products"
      );
      const data = await res.json();
      return data;
    },
  });

  const [all, setAll] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = all
    ? all_products.filter(
      (item) =>
        (item?.name &&
          item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item?._id && item._id.toString().includes(searchQuery.toLowerCase()))
    )
    : doobProduct
      ? products.filter(
        (item) =>
          (item.name &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item._id && item._id.toString().includes(searchQuery.toLowerCase()))
      )
      : othersProduct.filter(
        (item) =>
          (item.name &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item._id && item._id.toString().includes(searchQuery.toLowerCase()))
      );

  const updateProductStatus = (id, status) => {
    fetch(`https://backend.doob.com.bd/api/v1/seller/update-product-status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        BrightAlert();
        refetch();
        reload()
      });
  };

  // select product
  const [selectProducts, setSelectProducts] = useState([]);
  const [on, setOn] = useState(null);
  const [printProduct, setPrintProduct] = useState([]);

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
    if (selectProducts.length === filteredData.length) {
      // If all products are already selected, deselect all
      setSelectProducts([]);
    } else {
      // Otherwise, select all products
      const allProductIds = filteredData.map((product) => product._id);
      setSelectProducts(allProductIds);
    }
  };

  const logSelectedProducts = () => {
    const selectedProductData = filteredData.filter((product) =>
      selectProducts.includes(product._id)
    );
    setPrintProduct(selectedProductData);
    setOn(!on);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData?.length && filteredData?.slice(startIndex, endIndex);

  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    const message = e.target.message.value;
    console.log(message, openModal._id, "message");
    setLoading(true);

    fetch(
      `https://backend.doob.com.bd/api/v1/admin/product-reject-message?id=${openModal._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: openModal._id,
          message,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setModalOpen(false);
        setLoading(false);
        BrightAlert();
        refetch();
        reload()
      });
  };

  const barcode_generate = () => {
    const pdf = new jsPDF();
    const barcodesPerRow = 3;
    const maxProductsPerPage = 20;
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

  const [loading_start, setLoading_start] = useState(false);
  const create_barcode = () => {
    setLoading_start(true);
    barcode_generate();
    setLoading_start(false);
    // need to selected productId as a pdf and barcode
    // and navigate anoter page
  };

  const [editMode, setEditMode] = useState(false);
  const [editedCommission, setEditedCommission] = useState("");
  const [editedHandling, setEditedHandling] = useState("");
  const [editedValues, setEditedValues] = useState([]);
  const [ware, setWare] = useState([]);
  const [oldprice, setOldPrice] = useState({});

  const check_input = (product_id, commission, handling, warehouse, pice) => {
    setEditMode(product_id);
    setEditedCommission(commission);
    setEditedHandling(handling);
    setWare(warehouse);
    setOldPrice(pice);
  };

  const save_input = () => {
    const handling = editedValues.handling
      ? editedValues.handling
      : oldprice.handling;
    const commission = editedValues.commission
      ? editedValues.commission
      : oldprice.commission;
    const warehouse = ware;
    const data = {
      handling,
      commission,
      warehouse,
    };
    fetch(
      `https://backend.doob.com.bd/api/v1/admin/update-product-info?productId=${editMode}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch();
        reload();
        BrightAlert();
        setEditMode(false);
        setEditedCommission("");
        setEditedHandling("");
        setWare([]);
        setOldPrice({});
      });
  };

  // console.log(products[0]?.warehouse);
  // console.log(currentItems);

  const [reject_message, setRejectMessage] = useState(false);
  const [seller_warehouse, setSellerWarehouse] = useState(false);
  const [doob_warehouse, setDoob_warehouse] = useState(false);

  console.log(currentItems, 'Hello js........');
  return (
    <div className="">
      <Link
        className="group relative inline-flex mb-4 items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
        to="/admin/manage-product/add-product"
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
          AddCommission
        </span>
      </Link>

      <div className="relative w-3/5 my-2">
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


      <div className="flex justify-between items-">
        <div className="flex items-center gap-6">
          <h2 className="text-lg font-medium text-gray-800 ">All Product</h2>
          <span className="px-3 h-[30px] text-xs flex items-center bg-blue-100 rounded-full d text-blue-400">
            {filteredData?.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="bg-blue-500 px-8 py-2 rounded text-white"
            onClick={create_barcode}
          >
            {loading_start ? "Loading" : "Barcode Generate"}
          </button>

          <button
            onClick={logSelectedProducts}
            disabled={!selectProducts.length}
            className="bg-blue-500 rounded px-6 text-white h-full">
            Print
          </button>

          <button
            onClick={() => { setAll(true), setSellerWarehouse(false), setDoobProduct(false), setDoob_warehouse(false) }}
            className={`${all ? "bg-blue-900" : " bg-blue-500"
              } px-8 py-2 rounded text-white`}
          >
            All Warehouse
          </button>
          <button
            onClick={() => {
              setDoobProduct(true), setAll(false), setSellerWarehouse(false), setDoob_warehouse(true)
            }}
            className={`${doob_warehouse ? "bg-blue-900" : " bg-blue-500"
              } px-8 py-2 rounded text-white`}
          >
            Doob Warehouse
          </button>
          <button
            onClick={() => {
              setDoobProduct(false), setAll(false); setDoob_warehouse(false), setSellerWarehouse(true)
            }}
            className={`${seller_warehouse ? "bg-blue-900" : " bg-blue-500"
              } px-8 py-2 rounded text-white`}
          >
            Seller Warehouse
          </button>
        </div>
      </div>



      <section className=" mx-auto">



        <div className="flex flex-col mt-6">
          <div className="overflow-x-auto">
            <div className="  py-2">
              {on && (
                <div className="absolute top-0 left-0 right-0 bottom-0 m-auto z-[3000]">
                  {" "}
                  <PrintList setOn={setOn} products={printProduct} />
                </div>
              )}
              <div className=" overflow-x-auto border  border-gray-700 md:rounded-lg">
                <table className=" divide-y w-full divide-gray-700">
                  <thead className="bg-gray-900 text-white ">
                    <tr>
                      <th className="px-4 py-4 text-sm font-medium  text-gray-700 whitespace-nowrap">
                        <label
                          className="flex items-center gap-2  font-medium "
                          htmlFor="select"
                        >
                          <input
                            id="select"
                            type="checkbox"
                            className="cursor-pointer"
                            checked={
                              selectProducts.length === filteredData.length
                            }
                            onChange={handleSelectAll}
                          />

                        </label>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5  text-sm font-normal text-left rtl:text-right "
                      >
                        <div className="flex items-center">
                          <span>Name</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Status</span>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Category</span>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        Warehouse
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        Commission
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        Handling
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left  "
                      >
                        <span>Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y  divide-gray-200 ">
                    {currentItems.length
                      ? currentItems?.map((product, i) => {
                        return (
                          <tr>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3">
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
                              </div>
                            </td>
                            <td>
                              <div className="flex  duration-150 items-start gap-9 relative">
                                <div className="imgSm w-[20px] h-[20px] bg-red-50">
                                  <div
                                    style={{
                                      backgroundImage: `url(${
                                        product?.featuredImage?.src
                                          ? product?.featuredImage?.src
                                          : product?.images[0]?.src
                                      })`,
                                    }}
                                    className="w-12 h-12 object-cover bg-cover rounded-md border border-[#8080809d] overflow-hidden"
                                  ></div>
                                  <div
                                    style={{
                                      backgroundImage: `url(${
                                        product?.featuredImage?.src
                                          ? product?.featuredImage?.src
                                          : product?.images[0]?.src
                                      })`,
                                    }}
                                    className="absolute top-[-40px] z-50 duration-150 abs hidden bg-[url(${product?.featuredImage?.src})] left-[43px] object-cover bg-cover bg-white shadow-xl w-[150px] h-[150px] ring-1 ring-gray-500"
                                  ></div>
                                </div>

                                <div>
                                  <h2 className="font-medium text-gray-800 ">
                                    {product.name &&
                                      product?.name
                                        .split(" ")
                                        .slice(0, 5)
                                        .join(" ")}
                                  </h2>
                                  <p className="text-sm font-normal  text-gray-400">
                                    {product && product?._id}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              {product.status === true ? (
                                <button
                                  onClick={() =>
                                    updateProductStatus(product._id, false)
                                  }
                                  className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                  <h2 className="text-sm font-normal text-emerald-500">
                                    Active
                                  </h2>
                                </button>
                              ) : (
                                (() => {
                                  {
                                    /* const filteredWarehouses =
                                    product?.warehouse?.filter(
                                      (ware) => ware.name !== ""
                                    ); */
                                  }
                                  // console.log(filteredWarehouses);
                                  return (
                                    <button
                                      // disabled={
                                      //   filteredWarehouses?.length < 2
                                      // }
                                      onClick={() =>
                                        updateProductStatus(product._id, true)
                                      }
                                      className="inline-flex items-center px-3 py-1 rounded-full cursor-pointer gap-x-2 bg-emerald-100/60 bg-gray-800"
                                    >
                                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                      <h2 className="text-sm font-normal text-red-500">
                                        Pending
                                      </h2>
                                    </button>
                                  );
                                })()
                              )}
                            </td>

                            <td className="px-4 py-4 text-sm text-black whitespace-nowrap flex gap-1">
                              {product?.categories?.length &&
                                product?.categories?.map((itm, index) => (
                                  <div
                                    className="text-sm rounded-full flex items-center "
                                    key={index}
                                  >
                                    {itm?.name}
                                    {index !== product.categories.length - 1 ||
                                      (!itm?.name === "" && <FaAngleRight />)}
                                    {index < product.categories.length - 1 && (
                                      <>{itm?.name ? "," : ""}</>
                                    )}
                                  </div>
                                ))}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                              {/* {product?.warehouse?.map((ware) => ware?.name)} */}
                              <button
                                className="inline-flex items-center px-3 py-1 rounded-full cursor-pointer bg-emerald-100/60 bg-gray-800 text-white"
                                onClick={() => setModalOpen(product?._id)}
                              >
                                {" "}
                                {/* {"Select Warehouse"} */}
                                {product?.warehouse?.filter(
                                  (item) => item?.name
                                )?.length
                                  ? product?.warehouse?.map((ware, index) => (
                                      <span key={ware?.name}>
                                        {ware?.name}

                                        {index <
                                          product.warehouse.length - 1 && (
                                          <>{ware?.name ? "," : ""}</>
                                        )}
                                      </span>
                                    ))
                                  : "Select Warehouse"}
                              </button>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-2">
                                {editMode === product._id &&
                                editedCommission ? (
                                  <div className="flex gap-2 ">
                                    <input
                                      type="text"
                                      defaultValue={product?.commission}
                                      onChange={(e) =>
                                        setEditedValues({
                                          commission: e.target.value,
                                        })
                                      }
                                      className="px-3 w-12 py-1 text-sm border rounded bg-gray-100"
                                    />
                                    <button>
                                      <BiSave onClick={save_input} />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() =>
                                      check_input(
                                        product._id,
                                        true,
                                        false,
                                        product.warehouse,
                                        {
                                          commission: product?.commission,
                                          handling: product?.handling,
                                        }
                                      )
                                    }
                                    className="px-3 py-1 flex items-center gap-2 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60"
                                  >
                                    {product?.commission}
                                    <BiEdit />
                                  </button>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-2">
                                {editMode === product._id && editedHandling ? (
                                  <div className="flex gap-2 ">
                                    <input
                                      type="text"
                                      defaultValue={product.handling}
                                      onChange={(e) =>
                                        setEditedValues({
                                          handling: e.target.value,
                                        })
                                      }
                                      className="px-3 py-1 w-12 text-sm border rounded bg-gray-100"
                                    />
                                    <button>
                                      <BiSave onClick={save_input} />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() =>
                                      check_input(
                                        product._id,
                                        false,
                                        true,
                                        product.warehouse,
                                        {
                                          commission: product?.commission,
                                          handling: product?.handling,
                                        }
                                      )
                                    }
                                    className="px-3 py-1 text-xs text-indigo-500 flex items-center gap-2  rounded-full bg-gray-800 bg-indigo-100/60"
                                  >
                                    {product?.handling}
                                    <BiEdit />
                                  </button>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm flex gap-4 whitespace-nowrap">
                              <div className="flex items-center gap-x-2">
                                {/* <button
                                    className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800 text-white"
                                    onClick={() => setModalOpen(product?._id)}
                                  >
                                    {" "}
                                    {"Select Warehouse"}
                                  </button> */}
                                <button className=" transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                                {product.product_status == "reject" ? (
                                  <button
                                    onClick={() => setRejectMessage(product)}
                                    className="px-2 py-1 text-red-500 "
                                  >
                                    Reject Reason
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => setOpenModal(product)}
                                    className=" transition-colors duration-200 text-white rounded px-3 py-1 bg-red-500 hover:text-red-700 focus:outline-none"
                                  >
                                    Reject
                                  </button>
                                )}

                                {/* <button
                              onClick={() => setOpenModal(product)}
                              className=" transition-colors duration-200 hover:text-yellow-500  text-yellow-700 focus:outline-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </button> */}

                                {/* modal */}
                                {/* <EditProduct openModal={openModal} setOpenModal={setOpenModal} product={product} /> */}
                                {/* modal end */}
                              </div>
                              <div>
                                <Link
                                  className="mx-4"
                                  to={`/products/${product._id}`}
                                >
                                  <BsEye />
                                </Link>
                              </div>
                            </td>
                            <div className="h-0 w-0">
                              {modalOpen == product?._id && (
                                <WarehouseModal
                                  doobProduct={doobProduct}
                                  modalOpen={modalOpen}
                                  product={product}
                                  setModalOpen={setModalOpen}
                                  reload={reload}
                                />
                              )}
                            </div>
                            {/* reject modal */}
                            <div>
                              <div
                                onClick={() => setOpenModal(false)}
                                className={`fixed z-[100] flex items-center justify-center ${
                                  openModal._id == product?._id
                                    ? "visible opacity-100"
                                    : "invisible opacity-0"
                                } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                              >
                                <div
                                  onClick={(e_) => e_.stopPropagation()}
                                  className={`text- absolute w-[400px] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-white dark:text-black ${
                                    openModal._id == product?._id
                                      ? "scale-1 opacity-1 duration-300"
                                      : "scale-0 opacity-0 duration-150"
                                  }`}
                                >
                                  <form onSubmit={handleSubmit}>
                                    <h1 className="mb-2 text-2xl font-semibold">
                                      Rejected Message!
                                    </h1>
                                    <textarea
                                      name="message"
                                      className="w-full border mb-6 p-2"
                                      placeholder="typer rejected message"
                                    />
                                    <div className="flex justify-between">
                                      <button
                                        type="submit"
                                        className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                                      >
                                        {loading ? "Loading..." : "Submit"}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setOpenModal(false)}
                                        className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </tr>
                        );
                      })
                      : ""}
                  </tbody>

                  <div>
                    {
                      reject_message && <Show_Reject_Modal openModal={reject_message} setOpenModal={setRejectMessage} />
                    }
                  </div>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex justify-center">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
              <li>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-white border text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-gray-300 leading-tight py-2 px-3 rounded-l-lg"
                >
                  Prev
                </button>
              </li>
              {Array.from(
                { length: Math.ceil(filteredData?.length / itemsPerPage) },
                (_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setCurrentPage(i + 1)}
                      className={`bg-white border ${currentPage === i + 1
                        ? "text-blue-600"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        } border-gray-300 leading-tight py-2 px-3 rounded`}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
              <li>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredData?.length && filteredData?.length / itemsPerPage)
                  }
                  className="bg-white border text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-gray-300 leading-tight py-2 px-3 rounded-r-lg"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default ManageProduct;


const Show_Reject_Modal = ({ openModal, setOpenModal }) => {



  return (
    <div>
      <div>
        <div
          onClick={() => setOpenModal(false)}
          className={`fixed z-[100] flex items-center justify-center ${openModal._id
            ? "visible opacity-100"
            : "invisible opacity-0"
            } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
        >
          <div
            onClick={(e_) => e_.stopPropagation()}
            className={`text- absolute w-[400px] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-white dark:text-black ${openModal._id
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
                value={openModal?.message}
                className="w-full border mb-6 p-2"
                placeholder=" rejected message"
              />
              <div className="flex justify-between">
                {/* <button
                  type="submit"
                  className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                >
                  {"Submit"}
                </button> */}
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
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
  )
}