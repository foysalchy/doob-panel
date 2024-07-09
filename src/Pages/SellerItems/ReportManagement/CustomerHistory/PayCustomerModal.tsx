import JoditEditor from "jodit-react";
import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";

const PayCustomerModal = ({ OpenModal, setOpenModal, customerInfo, refetch }) => {
    const { shopInfo } = useContext(AuthContext);
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
    const handleFAQUpdate = async (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const description = e.target.description.value;
        const MetaTag = e.target.MetaTag.value;
        const MetaDescription = e.target.MetaDescription.value;

        const data = {
            title,
            description,
            MetaTag,
            MetaDescription,
        };

        try {
            fetch(
                `https://doob.dev/api/v1/seller/page/update-page/${customerInfo?._id}`,
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
                    Swal.fire("Update FAQ Successful", "", "success");
                    refetch();
                    setOpenModal(false);
                });
        } catch (error) {
            console.error("Error updating FAQ:", error);
        }
    };
    const [getaway, setGetaway] = useState("Cash");
    const [selectedWarehouses, setSelectedWarehouses] = useState({});

    const [transactionId, setTransactionId] = useState("")
    const handlePaymentGatewayChange = (selectedOptionsData) => {
        setSelectedWarehouses(selectedOptionsData);
    };
    const warehouseOptions = getwayData?.map((warehouse) => ({
        value: `${warehouse?.mobileType ?? warehouse?.bankName}  ${warehouse?.mobileNumber ?? warehouse?.accountNumber
            }`,
        label: `${warehouse?.mobileType ?? warehouse?.bankName}  ${warehouse?.mobileNumber ?? warehouse?.accountNumber
            }`,
    }));
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
                    onSubmit={handleFAQUpdate}
                >

                    <div className="flex justify-between bg-white-400  py-  items-start">
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
                        <div className="max-h-[100vh] px-10 text-start pt-10">
                            {/* {isPreviewModal} */}

                            <div className="">
                                <div className="">
                                    <label className="text-sm">Select Method</label>
                                    <Select
                                        options={warehouseOptions}
                                        // isMulti
                                        onChange={handlePaymentGatewayChange}
                                        value={selectedWarehouses}
                                        placeholder="Please select"
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                </div>
                            </div>
                            <div className="">
                                {selectedWarehouses?.value && (
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
                                Submit Pay
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PayCustomerModal;
