import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import SellerStockInvoice from "./SellerStockInvoice";
import { BiEdit, BiSave, BiSearch } from "react-icons/bi";
import BrightAlert from "bright-alert";
import Swal from "sweetalert2";
import LoaderData from "../../../Common/LoaderData";

const SellerStockManagement = () => {
  const [on, setOn] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  const { shopInfo } = useContext(AuthContext);
  const {
    data: stockRequestData = [],
    refetch,
    isLoading: loadingData,
  } = useQuery({
    queryKey: ["stockRequestData"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/admin/seller-stock-request?shopId=${shopInfo._id}`
      );
      const data = await res.json();
      console.log(data, "data");
      return data?.data;
    },
  });
  const filteredStockRequest = searchQuery
    ? stockRequestData.filter((item) =>
        item._id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : stockRequestData;

  // const filterData = stockRequest.filter(itm => itm?._id.toLowerCase().includes(searchValue.toLowerCase()));

  const cancelHandler = async (productId, orderId) => {
    console.log(productId, orderId);
    return fetch(
      `https://doob.dev/api/v1/admin/stock-request-update?productId=${productId}&orderId=${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "cancel",
          admin_note: "",
          reject_note: "",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        BrightAlert("Update Quantity", "", "success");
        refetch();
      });
  };

  // ! update delivery status
  const [editStatus, setEditStatus] = useState(false);
  
  const [selectStatusValue, setSelectStatusValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const statusOptionsData = ["pending", "purchasing", "shipped"];
  // console.log("options", options);

  console.log("selectStatusValue", selectStatusValue);
  const updateDeliveryStatusHandler = async (productId, order) => {
    console.log(order);
    // console.log(selectStatusValue, productId, "status", orderId);
    if (order?.status === "cancel" || order?.status === "reject") {
      setEditMode(false);
      return Swal.fire(`${order?.status}ed can't be updated`, "", "warning");
    }
    // return;
    return fetch(
      `https://doob.dev/api/v1/admin/stock-status-update?productId=${productId}&orderId=${order?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          delivery_status: selectStatusValue,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        BrightAlert(data?.message ?? "Updated Delivery", "", "success");
        refetch();
        setEditMode(false);
        false;
      });
  };

  const [adminNote, setAdminNote] = useState("");

  const handleUpdate = (data, status) => {
    console.log(data, status);

    if (status === "reject") {
      Swal.fire({
        title: "Write Note for Reject",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Submit",
        showLoaderOnConfirm: true,
        preConfirm: async (note) => {
          console.log(note); // Log the input value
          setAdminNote(note);

          const bodyData = {
            status: status,
            rejectNote: note, // Update rejectNote here
          };

          console.log(bodyData, "bodyData");

          // return;

          // Make the fetch call inside the preConfirm callback
          return fetch(
            `https://doob.dev/api/v1/admin/stock-request-update?productId=${data?.productId}&orderId=${data?._id}&quantity=${data?.quantity}&SKU=${data?.SKU}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bodyData),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              BrightAlert("Update Quantity Status", "", "success");
              refetch();
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    } else {
      const bodyData = {
        status: status,
      };

      console.log(bodyData, "bodyData");
      // return;

      // Make the fetch call inside the preConfirm callback
      return fetch(
        `https://doob.dev/api/v1/admin/stock-request-update?productId=${data?.productId}&orderId=${data?._id}&quantity=${data?.quantity}&SKU=${data?.SKU}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          BrightAlert("Update Quantity", "", "success");
          refetch();
        });
    }
  };

  return (
    <div className="relative">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="flex pb-4 items-center justify-between">
          <h2 className="text-xl font-semibold pb-4">
            Stock Quantity Managements
          </h2>
          <div className="flex px-2 items-center p-1  w-[60%] rounded bg-white">
            <BiSearch />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              className="px-1 py-1 outline-none w-full"
              placeholder="search..."
            />
          </div>
        </div>

        <div className="overflow-hidden border border-gray-200 border-gray-700 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 divide-gray-700 ">
            <thead className="bg-gray-50 ">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  <div className="flex items-center gap-x-3">
                    <span>Image</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  <div className="flex items-center gap-x-3">
                    <span>Ordered Id</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-12 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  <button className="flex items-center gap-x-2">
                    <span>Name</span>
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-12 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  <button className="flex items-center gap-x-2">
                    <span>Delivery Status</span>
                  </button>
                </th>

                <th
                  scope="col"
                  className="px-4 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  Admin Note
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  Note
                </th>

                <th
                  scope="col"
                  className="px-4 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  Quantity
                </th>

                <th
                  scope="col"
                  className="px-12 py-3.5 text-sm font-normal border-r text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  <button className="flex items-center gap-x-2">
                    <span>Seller</span>
                  </button>
                </th>

                <th
                  scope="col"
                  className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  <button className="flex items-center gap-x-2">
                    <span>Warehouse</span>
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                >
                  <button className="flex items-center gap-x-2">
                    <span>Action</span>
                  </button>
                </th>
              </tr>
            </thead>
            {loadingData && <LoaderData />}
            <tbody className="bg-white divide-y divide-gray-200 ">
              {filteredStockRequest?.map((itm, index) => (
                <tr key={index + 1}>
                  <td className="whitespace-nowrap border-r px-2 py-2 font-medium ">
                    <img
                      src={
                        itm?.productInfo?.image?.src ?? itm?.productInfo?.image
                      }
                      alt=""
                      className="w-[80px] h-[80px] rounded-lg object-cover m-auto"
                    />
                  </td>

                  <td className="px-4 py-4 text-sm font-medium border-r text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center gap-x-3">
                      <div className="w-5/12">
                        <h2 className="font-medium text-gray-800  ">
                          <button
                            onClick={() => setOn(itm)}
                            className="  text-blue-500"
                          >
                            {itm?._id}
                          </button>
                        </h2>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-wrap text-sm text-start w-[300px] border-r px-6 py-4 font-medium ">
                    {itm?.productInfo?.name.slice(0, 80)}
                    <br />
                    <span className="text-xs text-gray-500"> {itm?.SKU}</span>
                  </td>
                  <td className="px-4 py-4 text-lg text-gray-700 border-r  whitespace-nowrap">
                    {/* <button className="text-sm flex items-center gap-2  px-2 py-1 rounded ">
                      {itm?.delivery_status}
                    </button> */}
                    <div className="my-3 flex items-center gap-1">
                      {editMode === itm._id ? (
                        <div className="flex gap-2 ">
                          <select
                            // options={statusOptions}
                            // aria-readonly
                            // disabled={editStatus}
                            onChange={(e) =>
                              setSelectStatusValue(e.target.value)
                            }
                            className="rounded-lg p-1"
                          >
                            {statusOptionsData?.map((item) => (
                              <option value={item} key={item}>
                                {item}{" "}
                              </option>
                            ))}
                          </select>
                          <button>
                            <BiSave
                              onClick={() =>
                                updateDeliveryStatusHandler(itm?.productId, itm)
                              }
                            />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditMode(itm?._id)}
                          className="px-3 py-1 flex items-center gap-2 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60"
                        >
                          {itm?.delivery_status}
                          <BiEdit />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-lg text-gray-700 border-r  whitespace-nowrap">
                    <button className="text-sm flex items-center gap-2  px-2 py-1 rounded ">
                      {itm?.reject_note?.slice(0, 25)}..
                    </button>
                  </td>
                  <td className="px-12 py-4 text-sm font-medium border-r text-gray-700 whitespace-nowrap">
                    <button
                      // onClick={() => DeactiveHandle(faq?._id)}
                      className="inline-flex items-center px-3 py-1 rounded-full gap-x-2   text-green-500  "
                    >
                      {itm?.note}
                    </button>
                  </td>

                  <td className="px-4 py-4 text-sm border-r whitespace-nowrap">
                    {itm?.quantity}
                  </td>
                  <td className="px-4 py-4 text-lg text-gray-700 border-r  whitespace-nowrap">
                    <button className="text-sm flex items-center gap-2  px-2 py-1 rounded ">
                      {itm?.shopName}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-lg text-gray-700 border-r   whitespace-nowrap">
                    <button className="text-sm flex items-center gap-2  px-2 py-1 rounded ">
                      {itm?.warehouse?.map((war) => {
                        if (war?.name) {
                          return <span key={war?.name}>{war?.name}</span>;
                        }
                      })}
                    </button>
                  </td>
                  <td className="px-4 py-4 flex gap-2  text-lg text-gray-700  whitespace-nowrap">
                    {itm?.status === "pending" ? (
                      <div className="flex gap-2 whitespace-nowrap">
                        {itm?.status === "reject" ? (
                          <h2 className="text-red-400 text-sm">rejected</h2>
                        ) : itm?.status === "cancel" ? (
                          <h2>Canceled</h2>
                        ) : (
                          <button
                            // onClick={() => handleUpdate(itm, "reject")}
                            onClick={() =>
                              cancelHandler(itm?.productId, itm?._id)
                            }
                            className="inline-flex rounded-full gap-x-2 text-sm items-center gap-2 bg-orange-500 px-2 py-1 text-white"
                          >
                            Cancel
                          </button>
                        )}

                        {!itm.adminWare && (
                          <div>
                            {itm?.status === "reject" ? (
                              <button
                                disabled
                                // onClick={() => handleUpdate(itm, "")}
                                className="inline-flex items-center rounded-full gap-x-2  text-sm  gap-2 bg-red-600 px-2 py-1  text-white "
                              >
                                Rejected
                              </button>
                            ) : (
                              <div className="">
                                {itm?.status === "pending" ? (
                                  <div className="flex gap-2">
                                    <button
                                      disabled={
                                        itm?.status === "cancel" ? true : false
                                      }
                                      onClick={() =>
                                        handleUpdate(itm, "active")
                                      }
                                      className="inline-flex  rounded-full gap-x-2    text-sm items-center gap-2 bg-[#23b123ea] px-2 py-1 text-white "
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleUpdate(itm, "reject")
                                      }
                                      className="inline-flex  rounded-full gap-x-2    text-sm items-center gap-2 bg-orange-500 px-2 py-1 text-white "
                                    >
                                      Reject
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    disabled
                                    // onClick={() => handleUpdate(itm, "")}
                                    className="inline-flex  rounded-full gap-x-2    text-sm items-center gap-2 bg-[#23b123ea] px-2 py-1 text-white "
                                  >
                                    Active
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <h2 className="capitalize">{itm?.status}</h2>
                    )}
                  </td>
                  {on?._id === itm?._id && (
                    <SellerStockInvoice setOn={setOn} products={itm} />
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerStockManagement;
