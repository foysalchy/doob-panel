import JoditEditor from "jodit-react";
import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";

const PayCustomerModal = ({ OpenModal, setOpenModal, customerInfo, refetch }) => {
    const { shopInfo, user } = useContext(AuthContext);

    console.log(customerInfo, 'customerInfo')

    const {
        data: getwayData = [],
        refetch: refetchGatway,
        isLoading,
    } = useQuery({
        queryKey: ["getwayDataQueryData"],
        queryFn: async () => {
            const res = await fetch(
                `https://doob.dev/api/v1/seller/pos-payment?shopId=${shopInfo.shopId}`
            );
            const data = await res.json();
            return data.data;
        },
    });
    console.log(getwayData)

    const [getaway, setGetaway] = useState("Cash");
    const [selectedMobileMethod, setSelectedMobileMethod] = useState({});
    const [cash, setCash] = useState(0);
    const [loadingSubmit, setIsLoadingSubmit] = useState(false)

    const [transactionId, setTransactionId] = useState("")
    const setCashValue = (value) => {
        if (parseInt(value) >= 0) {
            setCash(parseInt(value));
        } else {
            setCash(0);
        }
    };
    // console.log(cash)
    // console.log(customerInfo?.dueAmount)
    const dueAmmount = customerInfo?.dueAmount ?? 0
    const totalDueAmmount = dueAmmount + cash
    // console.log(totalDueAmmount)

    const handlePaymentGatewayChange = (selectedOptionsData) => {
        setSelectedMobileMethod(selectedOptionsData);
    };
    const warehouseOptions = getwayData?.map((warehouse) => ({
        value: `${warehouse?.mobileType ?? warehouse?.bankName}  ${warehouse?.mobileNumber ?? warehouse?.accountNumber
            }`,
        label: `${warehouse?.mobileType ?? warehouse?.bankName}  ${warehouse?.mobileNumber ?? warehouse?.accountNumber
            }`,
    }));


    const handlePaySubmit = async (e) => {
        e.preventDefault();
        setIsLoadingSubmit(true)

        const bodyData = {
            shopId: shopInfo?.shopId,
            email: customerInfo?.email,
            dueAmount: cash,
        };
        // console.log("🚀  ~ bodyData:", bodyData)

        try {
            fetch(`https://doob.dev/api/v1/seller/update-pos-user`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(bodyData),
            })
                .then((res) => res.json())
                .then((responseData) => {
                    // setLoading(false);
                    console.log(responseData);
                    // setLoadingInvoice(false);
                    if (responseData.success) {
                        // Swal.fire("Success", "Submitted", "success");
                        addPaymentTransaction()
                        // setInvoice(data);

                    } else {
                        Swal.fire("error", responseData?.error, "error");
                    }
                });
        } catch (error) {
            console.log(error)

            Swal.fire("Success", error?.message ?? "failed to SUbmit", "error");
            // setLoadingInvoice(false);
        }
    };



    console.log(user, 'user');
    const addPaymentTransaction = () => {
        const bodyData = {
            invoice: {
                total: totalDueAmmount,
                present: totalDueAmmount,
                cash,
                discount: 0,
                change: totalDueAmmount > 0 ? totalDueAmmount : 0,
                // change,
                // discount,
                // present,
                getaway,
                transactionId: transactionId ?? getaway,
                // items,
                // total,
                // cash,
                // change,
                // discount,
                // present,
                // getaway,
                // transactionId,
            },
            userInfo: {
                email: customerInfo?.email,
                phoneNumber: customerInfo?.phoneNumber,
                // address,
            },

            shopId: shopInfo._id,
            date: new Date().getTime(),
        };

        // console.log(bodyData, "data....");
        fetch(`https://doob.dev/api/v1/seller/pos-report`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
        })
            .then((res) => res.json())
            .then((resultData) => {
                if (resultData.status) {
                    setIsLoadingSubmit(false)
                    // BrightAlert({ timeDuration: 3000 })
                    setOpenModal(true);
                    refetch()

                } else {
                    setOpenModal(true);
                }
            });
    }
    return (
        <div
            className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${OpenModal ? "block" : "hidden"
                }`}
        >
            <div className="w-full max-w-[800px] rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px] ">
                <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border-b">
                    <div className="pb-2 text-xl font-bold text-dark text-center sm:text-2xl">
                        Pay POS
                    </div>
                    <div
                        onClick={() => setOpenModal(!OpenModal)}
                        className="cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500"
                    >
                        <RxCross2 className="text-xl" />
                    </div>
                </div>

                <form
                    className="h-[500px] overflow-y-scroll"
                    onSubmit={handlePaySubmit}
                >

                    {/* due ammount */}
                    {totalDueAmmount > 0 ? (
                        <div>
                            Total Change : <p className="text-green-600">{totalDueAmmount}</p>
                        </div>
                    ) : (
                        <div>
                            Total Due : <p className="text-red-500">{totalDueAmmount}</p>
                        </div>
                    )}
                    <div className="py-2">
                        Paid:{" "}
                        <div>
                            {" "}
                            <input
                                defaultValue="0"
                                value={cash}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setCashValue(value === "" ? "0" : value);
                                }}
                                type="number"
                                className="bg-transparent px-2  ring-1 w-[80px] ring-gray-300 rounded-md text-lg"
                            />
                        </div>
                    </div>

                    <div className="flex justify py-3  gap-3 bg-white-400  py-  items-start">
                        <div className="">
                            <h3 className="text-md">Payment Method :</h3>
                        </div>
                        <label>
                            <input
                                name="paymentMethod"
                                value="Cash"
                                defaultChecked
                                onChange={(e) => setGetaway(e.target.value)}
                                type="radio"
                                className=""
                            />{" "}
                            Cash
                        </label>
                        <label>
                            <input
                                name="paymentMethod"
                                value="mobile_bank"
                                onChange={(e) => {
                                    setGetaway(e.target.value);

                                }}
                                type="radio"
                                className=""
                            />{" "}
                            Mobile Bank
                        </label>
                    </div>
                    {getaway === "mobile_bank" &&
                        <div className="max-h-[100vh] text-start pt-10">
                            {/* {isPreviewModal} */}

                            <div className="">
                                <div className="">
                                    <label className="text-sm">Select Method</label>
                                    <Select
                                        options={warehouseOptions}
                                        // isMulti
                                        onChange={handlePaymentGatewayChange}
                                        value={selectedMobileMethod}
                                        placeholder="Please select"
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                </div>
                            </div>
                            <div className="">
                                {selectedMobileMethod?.value && (
                                    <div className="mt-5">
                                        <label htmlFor="transactionId">Enter transaction Id</label>
                                        <input
                                            placeholder="Enter the Payment Transaction ID"
                                            required
                                            type="text"
                                            onChange={(event) => setTransactionId(event.target.value)}
                                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                                            id="transactionId"
                                            name="transactionId"
                                        />
                                    </div>
                                )}
                            </div>

                        </div>}
                    <div className="flex justify-start">
                        <button
                            type="submit"
                            className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500 mt-4"
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
                                {
                                    loadingSubmit ? "loading...." : " Submit Pay"
                                }
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PayCustomerModal;
