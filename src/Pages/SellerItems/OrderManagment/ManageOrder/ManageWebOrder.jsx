import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import ReadyToShipModal from "../../../AdminItem/SellerOrderManagement/ReadyToShipModal";
import OrderInvoice from "./OrderInvoice";
const ManageWebOrder = () => {
  const { shopInfo } = useContext(AuthContext);
  const { data: products = [], refetch } = useQuery({
    queryKey: ["sellerAllOrder"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/get-my-order?shopId=${shopInfo?._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  console.log(
    `https://backend.doob.com.bd/api/v1/seller/get-my-order?shopId=${shopInfo?._id}`
  );

  const [searchQuery, setSearchQuery] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const filteredData =
    products?.length &&
    products?.filter(
      (product) =>
        product.product.name
          ?.toLowerCase()
          .includes(searchQuery?.toLowerCase()) ||
        product._id?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        product.customerName
          ?.toLowerCase()
          .includes(searchQuery?.toLowerCase()) ||
        product.product.productId.toString().includes(searchQuery)
    );

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
    if (selectProducts.length === products.length) {
      // If all products are already selected, deselect all
      setSelectProducts([]);
    } else {
      // Otherwise, select all products
      const allProductIds = products?.map((product) => product._id);
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

  const [readyToShip, setReadyToShip] = useState(false);

  const productStatusUpdate = (status, orderId) => {
    console.log(status, orderId);
    fetch(
      `https://backend.doob.com.bd/api/v1/seller/update-seller-order-status?orderId=${orderId}&status=${status}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, orderId }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });
  };

  const deleteMethod = (orderId) => {
    fetch(
      `https://backend.doob.com.bd/api/v1/seller/delete-seller-order?orderId=${orderId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        BrightAlert();
        refetch();
      });
  };

  return (
    <div>
      <section className=" mx-auto">
        <div className="flex products-center justify-between gap-x-3">
          <div className="flex products-center gap-2">
            <h2 className="text-lg font-medium text-gray-800 ">All Wholesale Order</h2>
            <span className="px-3 py-1 text-xs  bg-blue-100 rounded-full d text-blue-400">
              {products?.length}
            </span>
          </div>
         
      <div className="flex flex-wrap justify-start  items-center gap-4 ">
      <Link
            to={"/seller/orders/manage-order"}
            className={`px-4 py-1 text-white border bg-gray-500
            `}
        >
          Shop Other Order
        </Link>
           <Link
            to={"/seller/orders/web-store-order"}
            className={`px-4 py-1 text-white border bg-gray-900
            `}
        >
          Doob Order
        </Link>
      </div>
          <input
            className="border"
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
          />
          {/* <button onClick={logSelectedProducts} disabled={!selectProducts.length} className='bg-blue-500 px-8 py-2 rounded text-white'> Print</button> */}
        </div>
        <div className="flex flex-col mt-6">
          <div className="overflow-x-auto">
            <div className="py-2">
              {on && (
                <div className="absolute top-0 left-0 right-0 bottom-0 m-auto z-[3000]">
                  <SellerPrintPage setOn={setOn} products={printProduct} />
                </div>
              )}
              <div className=" border border-gray-700 md:rounded-lg">
                <table className="divide-y w-full divide-gray-700">
                  <thead className="bg-gray-900 text-white">
                    <tr>
                      <th className="px-2">
                        <label
                          className="flex items-center gap-2 font-medium"
                          htmlFor="select"
                        >
                          <input
                            id="select"
                            type="checkbox"
                            checked={selectProducts.length === products.length}
                            onChange={handleSelectAll}
                          />
                          Select all
                        </label>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Status</span>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Date and time</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Customer Name</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right"
                      >
                        Order Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right"
                      >
                        Order Price
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left"
                      >
                        <span>Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length &&
                      filteredData?.map((product) => (
                        <React.Fragment key={product._id}>
                          <tr key={product._id}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3">
                                <input
                                  type="checkbox"
                                  checked={selectProducts.includes(product._id)}
                                  onChange={() =>
                                    handleUpdateCheck(product._id)
                                  }
                                />
                                <div className="flex gap-x-2 relative">
                                  <div className="bg-red-400 w-10 h-10 overflow-hidden rounded-full">
                                    <img
                                      className="object-cover w-full h-full hover:cursor-pointer"
                                      src={product.image}
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <h2 className="font-medium text-gray-800">
                                      {product.product &&
                                        product.product.name
                                          .split(" ")
                                          .slice(0, 5)
                                          .join(" ")}
                                    </h2>
                                    <p className="text-sm font-normal text-gray-600">
                                      {product.product.productId}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="border-r px-6 py-4 whitespace-nowrap text-[16px] font-[400] flex flex-col gap-2">
                                {product.status === "pending" && (
                                  <>
                                    <button
                                      //   onClick={() => setReadyToShip(product)}
                                      // onClick={() =>
                                      //   productStatusUpdate(
                                      //     "ready_to_ship",
                                      //     product._id
                                      //   )
                                      // }
                                      className="text-blue-700"
                                    >
                                      Ready to Ship
                                    </button>
                                    <button
                                      onClick={() =>
                                        productStatusUpdate(
                                          "Cancel",
                                          product._id
                                        )
                                      }
                                      className="text-blue-700"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                )}
                                {product.status === "ready_to_ship" && (
                                  <button
                                    // onClick={() =>
                                    //   productStatusUpdate(
                                    //     "shipped",
                                    //     product._id
                                    //   )
                                    // }
                                    className="text-blue-700"
                                  >
                                    Shipped
                                  </button>
                                )}
                                {product.status === "shipped" && (
                                  <div className="flex flex-col gap-2">
                                    <button
                                      // onClick={() =>
                                      //   productStatusUpdate(
                                      //     "delivered",
                                      //     product._id
                                      //   )
                                      // }
                                      className="text-blue-700"
                                    >
                                      Delivered
                                    </button>
                                    <button
                                      // onClick={() =>
                                      //   productStatusUpdate(
                                      //     "failed",
                                      //     product._id
                                      //   )
                                      // }
                                      className="text-blue-700"
                                    >
                                      Failed Delivery
                                    </button>
                                  </div>
                                )}
                                {product.status === "delivered" && (
                                  <button
                                    // onClick={() =>
                                    //   productStatusUpdate(
                                    //     "returned",
                                    //     product._id
                                    //   )
                                    // }
                                    className="text-blue-700"
                                  >
                                    Returned
                                  </button>
                                )}
                                {product.status === "return" && (
                                  <div className="flex flex-col justify-center">
                                    <button
                                      onClick={() => {
                                        setShowAlert(product);
                                        checkBox(product._id);
                                      }}
                                      className="text-blue-700"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() =>
                                        productStatusUpdate(
                                          "failed",
                                          product._id
                                        )
                                      }
                                      className="text-blue-700"
                                    >
                                      Reject
                                    </button>
                                  </div>
                                )}
                                {product.status === "returned" && (
                                  <button
                                    onClick={() =>
                                      productStatusUpdate(
                                        "RefoundOnly",
                                        product._id
                                      )
                                    }
                                    className="text-blue-700"
                                  >
                                    Refund Data
                                  </button>
                                )}
                                {product.status === "Refund" && (
                                  <button
                                    onClick={() => viewDetails(product)}
                                    className="text-blue-700"
                                  >
                                    View Details
                                  </button>
                                )}
                                {![
                                  "pending",
                                  "ready_to_ship",
                                  "shipped",
                                  "delivered",
                                  "return",
                                  "returned",
                                  "Refund",
                                ].includes(product.status) && (
                                    <button className="text-blue-700">
                                      {product.status}
                                    </button>
                                  )}
                                {product._id === readyToShip._id && (
                                  <tr>
                                    <td colSpan="10">
                                      <ReadyToShipModal
                                        readyToShip={readyToShip}
                                        setReadyToShip={setReadyToShip}
                                        productStatusUpdate={
                                          productStatusUpdate
                                        }
                                        orderInfo={product}
                                        refetch={refetch}
                                      />
                                    </td>
                                  </tr>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-2">
                                <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
                                  {new Date(product.date).toLocaleString()}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {product.customerName}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-2">
                                <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
                                  {product.quantity}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-2">
                                <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
                                  {product.price}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-4 flex items-center gap-4 text-sm whitespace-nowrap">
                              <button
                                onClick={() => deleteMethod(product._id)}
                                className="transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none"
                              >
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
                              <button
                                onClick={() =>
                                  setModalOpen(modalOpen ? false : product)
                                }
                                className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                              >
                                <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
                                <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                                  {modalOpen._id === product._id
                                    ? "Close Details"
                                    : "View Details"}
                                </span>
                              </button>
                            </td>
                          </tr>

                          {modalOpen._id === product._id && (
                            <OrderInvoice
                              products={modalOpen}
                              setModalOpen={setModalOpen}
                            />
                          )}
                        </React.Fragment>
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

export default ManageWebOrder;
