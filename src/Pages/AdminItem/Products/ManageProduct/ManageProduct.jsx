import React from "react";
import AddProduct from "../AddProduct";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import SellerPrintPage from "../../../SellerItems/ProductManagement/SellerProductManagement/SellerAllProduct/SellerPrintPage";
import WarehouseModal from "./WarehouseModal";

const ManageProduct = () => {

  const [doobProduct, setDoobProduct] = useState(false)

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/admin/products");
      const data = await res.json();
      return data;
    },
  });

  const { data: othersProduct = [] } = useQuery({
    queryKey: ["othersProducts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/admin/others-products");
      const data = await res.json();
      return data;
    },
  });


  const [searchQuery, setSearchQuery] = useState("");

  const [modalOpen, setModalOpen] = useState(false)

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = doobProduct
    ? products.filter((item) =>
      (item.name && item.name.toLowerCase().includes(searchQuery?.toLowerCase())) ||
      (item._id && item._id.toString().includes(searchQuery))
    )
    : othersProduct.filter((item) =>
      (item.name && item.name.toLowerCase().includes(searchQuery?.toLowerCase())) ||
      (item._id && item._id.toString().includes(searchQuery))
    );

  const updateProductStatus = (id, status) => {
    console.log(id);
    fetch(`http://localhost:5000/api/v1/seller/update-product-status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        status
      })

    }).then((res) => res.json()).then((data) => {
      BrightAlert()
      refetch()
    })
  }



  // select product
  const [selectProducts, setSelectProducts] = useState([]);
  const [on, setOn] = useState(null);
  const [printProduct, setPrintProduct] = useState([]);

  const handleUpdateCheck = (productId) => {
    setSelectProducts(prevSelectedProducts => {
      if (prevSelectedProducts.includes(productId)) {
        return prevSelectedProducts.filter(id => id !== productId);
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
      const allProductIds = filteredData.map(product => product._id);
      setSelectProducts(allProductIds);
    }
  };

  const logSelectedProducts = () => {
    const selectedProductData = filteredData.filter(product => selectProducts.includes(product._id));
    setPrintProduct(selectedProductData)
    setOn(!on)
  };



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
          Add Commission
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

      <section className=" mx-auto">
        <div className="flex items-center justify-between gap-x-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium text-gray-800 ">All Product</h2>
            <span className="px-3 py-1 text-xs  bg-blue-100 rounded-full d text-blue-400">
              {products?.length}
            </span>
          </div>

          <div className='flex gap-2 items-center'>
            <button onClick={logSelectedProducts} disabled={!selectProducts.length} className='bg-blue-500 px-8 py-2 rounded text-white'> Print</button>
            <button onClick={() => setDoobProduct(!doobProduct)} className='bg-blue-500 px-8 py-2 rounded text-white'>{!doobProduct ? "Your product" : " Others Product"}</button>
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <div className="overflow-x-auto">
            <div className="  py-2">
              {on &&
                <div className='absolute top-0 left-0 right-0 bottom-0 m-auto z-[3000]'> <SellerPrintPage setOn={setOn} products={printProduct} /></div>
              }
              <div className="overflow-hidden border border-gray-200 border-gray-700 md:rounded-lg">
                <table className=" divide-y w-full divide-gray-700">
                  <thead className="bg-gray-900 text-white ">
                    <tr>
                      <th className='px-2'>
                        <label className='flex items-center gap-2  font-medium' htmlFor="select">
                          <input id='select' type="checkbox" checked={selectProducts.length === filteredData.length} onChange={handleSelectAll} />
                          Select all
                        </label>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right "
                      >
                        <div className="flex items-center gap-x-3">

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
                        Email address
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                      >
                        Teams
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left  ">
                        <span >Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y  divide-gray-200 ">
                    {filteredData?.map((product) => (
                      <tr>

                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <label>
                              <input
                                type="checkbox"
                                checked={selectProducts.includes(product._id)}
                                onChange={() => handleUpdateCheck(product._id)}
                              />
                            </label>
                            <div className="flex  duration-150 items-center gap-x-2 relative">
                              <div className="imgSm bg-red-400">
                                <img
                                  className="object-cover  w-10 h-10 rounded hover:cursor-pointer"
                                  srcSet={product?.featuredImage && product?.featuredImage?.src}
                                  src={product?.featuredImage && product?.featuredImage?.src}
                                  alt=""
                                />
                                <div
                                  style={{
                                    backgroundImage: `url(${product?.featuredImage?.src})`,
                                  }}
                                  className="absolute top-[-40px] duration-150 abs hidden bg-[url(${product?.featuredImage?.src})] left-[43px] object-cover bg-cover bg-white shadow-xl w-[150px] h-[150px] ring-1 ring-gray-500"
                                >
                                </div>
                              </div>

                              <div>
                                <h2 className="font-medium text-gray-800 ">
                                  {product.name && product?.name.split(" ").slice(0, 5).join(" ")}
                                </h2>
                                <p className="text-sm font-normal text-gray-600 text-gray-400">{product && product?._id}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {product.status === true ?
                            <div
                              onClick={() => updateProductStatus(product._id, false)}
                              className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              <h2 className="text-sm font-normal text-emerald-500">
                                Active
                              </h2>
                            </div> :
                            <div
                              onClick={() => updateProductStatus(product?._id, true)}
                              className="inline-flex items-center px-3 py-1 rounded-full  cursor-pointer gap-x-2 bg-emerald-100/60 bg-gray-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                              <h2 className="text-sm font-normal text-red-500">
                                Pending
                              </h2>
                            </div>}
                        </td>

                        <td className="px-4 py-4 text-sm text-white  whitespace-nowrap">
                          <button className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800" onClick={() => setModalOpen(product?._id)}> Select Warehouse</button>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          authurmelo@example.com
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
                              Design
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
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
                            <button className=" transition-colors duration-200 hover:text-yellow-500  text-yellow-700 focus:outline-none">
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
                            </button>
                          </div>
                        </td>
                        <div className="h-0 w-0">
                          {modalOpen == product?._id && <WarehouseModal doobProduct={doobProduct} modalOpen={modalOpen} product={product} setModalOpen={setModalOpen} />}
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageProduct;
