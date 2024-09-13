import { useQuery } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import SellerStockInvoice from "./SellerStockInvoice";
import { BiEdit, BiSave, BiSearch } from "react-icons/bi";
import BrightAlert from "bright-alert";
import Swal from "sweetalert2";
import LoaderData from "../../../Common/LoaderData";
import { useReactToPrint } from "react-to-print";
import * as XLSX from 'xlsx';
import showAlert from "../../../Common/alert";

const ReadableSellerStock = () => {
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
                showAlert("Update Quantity", "", "success");
                refetch();
            });
    };

    // ! update delivery status
    const [editStatus, setEditStatus] = useState(false);

    const [selectStatusValue, setSelectStatusValue] = useState("");
    const [editMode, setEditMode] = useState(false);
    // console.log("options", options);

    console.log("selectStatusValue", selectStatusValue);
    const updateDeliveryStatusHandler = async (productId, order) => {
        console.log(order);
        // console.log(selectStatusValue, productId, "status", orderId);
        if (order?.status === "cancel" || order?.status === "reject") {
            setEditMode(false);
            return showAlert(`${order?.status}ed can't be updated`, "", "warning");
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
                            showAlert("Update Quantity Status", "", "success");
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
                    showAlert("Update Quantity", "", "success");
                    refetch();
                });
        }
    };

    // print

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleDownloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredStockRequest.map(itm => ({
            Image: itm?.productInfo?.image?.src ?? itm?.productInfo?.image,
            OrderedId: itm?._id,
            Name: itm?.productInfo?.name,
            DeliveryStatus: itm?.delivery_status,
            AdminNote: itm?.reject_note,
            Note: itm?.note,
            Quantity: itm?.quantity,
            Seller: itm?.shopName,
            Warehouse: itm?.warehouse?.map(war => war?.name).join(", "),
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Data");
        XLSX.writeFile(workbook, "StockData.xlsx");
    };


    return (
        <div className="relative">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="flex pb-4 items-center justify-between">
                    <h2 className="text-xl font-semibold pb-4">
                        Stock Quantity Managements
                    </h2>
                    <div className="flex items-center">
                        <div className="flex px-2 items-center p-1  w-[300px] rounded bg-white">
                            <BiSearch />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                type="text"
                                className="px-1 py-1 outline-none w-full"
                                placeholder="search..."
                            />
                        </div>


                        <button onClick={handleDownloadExcel} className='bg-green-700 px-3 ml-2 py-3   text-white text-xs rounded'>Download Excel</button>
                    </div>
                </div>
                <div ref={componentRef} className="relative print-main-box w-full rounded-lg overflow-hidden h-screen">

                    <div className="overflow-x-auto absolute print-table top-0 left-0 right-0 border w-full dark:border-gray-200 border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y  divide-gray-700 ">
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
                                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 text-gray-400"
                                    >
                                        <button className="flex items-center gap-x-2">
                                            <span>Warehouse</span>
                                        </button>
                                    </th>

                                </tr>
                            </thead>
                            {loadingData && <LoaderData />}
                            <tbody className="bg-white divide-y divide-gray-200 print-t-body">
                                {filteredStockRequest?.map((itm, index) => (
                                    <tr key={index + 1}>
                                        <td className="whitespace-nowrap border-r px-2 py-2 font-medium ">
                                            <img
                                                src={
                                                    itm?.productInfo?.image?.src ?? itm?.productInfo?.image
                                                }
                                                alt=""
                                                className="w-[80px] h-[80px] print-stock-img rounded-lg object-cover m-auto"
                                            />
                                        </td>

                                        <td className="px-4 py-4 text-sm font-medium border-r text-gray-700 whitespace-pre-wrap ">
                                            <button
                                                onClick={() => setOn(itm)}
                                                className="text-blue-500 w-[190px] whitespace-pre-wrap print-sock-id"
                                                style={{ wordBreak: 'break-word' }}
                                            >
                                                {itm?._id}
                                            </button>
                                        </td>



                                        <td className="whitespace-wrap text-sm text-start w-[300px] border-r px-6 py-4 font-medium print-stock-name">
                                            {itm?.productInfo?.name.slice(0, 80)}
                                            <br />
                                            <span className="text-xs text-gray-500"> {itm?.SKU}</span>
                                        </td>
                                        <td className="px-4 py-4 text-sm  border-r  whitespace-nowrap">
                                            <div className="bg-green-200 text-green-800 w-[80px] text-center flex items-center justify-center py-1 rounded">
                                                {itm?.delivery_status}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-lg text-gray-700 border-r  whitespace-nowrap">
                                            <div className="text-sm flex items-center gap-2  px-2 py-1 rounded ">
                                                {itm?.reject_note?.slice(0, 25)}..
                                            </div>
                                        </td>
                                        <td className="px-12 py-4 text-sm font-medium border-r text-gray-700 whitespace-nowrap">
                                            <div
                                                // onClick={() => DeactiveHandle(faq?._id)}
                                                className="inline-flex items-center px-3 py-1 rounded-full gap-x-2   text-green-500  "
                                            >
                                                {itm?.note}
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm border-r whitespace-nowrap">
                                            {itm?.quantity}
                                        </td>
                                        {/* <td className="px-4 py-4 text-lg text-gray-700 border-r  whitespace-nowrap">
                                            <div className="text-sm flex items-center gap-2  px-2 py-1 rounded ">
                                                {itm?.shopName}
                                            </div>
                                        </td> */}
                                        <td className="px-4 py-4 text-lg text-gray-700 border-r   whitespace-nowrap">
                                            <div className="text-sm flex items-center gap-2  px-2 py-1 rounded ">
                                                {itm?.warehouse?.map((war) => {
                                                    if (war?.name) {
                                                        return <span key={war?.name}>{war?.name}</span>;
                                                    }
                                                })}
                                            </div>
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
        </div>
    );
};

export default ReadableSellerStock;
