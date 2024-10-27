import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { CgClose } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useEffect } from "react";

const ExportModal = ({ openModal, setOpenModal, details }) => {
      const totalPrice = details?.order
            ? details?.order?.productList?.reduce(
                  (total, product) => parseInt(total) + parseInt(product.price),
                  0
            )
            : 0;

      return (
            <div
                  className={`${openModal ? "flex" : "hidden"
                        } fixed z-50 top-0 left-0 h-full min-h-screen w-full items-center justify-center bg-[black] bg-opacity-90 px-20 py-5`}
            >
                  <div className="flex bg-white flex-col max-w-2xl bar overflow-hidden mt-4 p-6">
                        <div className="flex items-center justify-between">
                              <h1 className="text-2xl font-semibold">Refound Order</h1>
                              <button onClick={() => setOpenModal(!openModal)} className=" ml-10">
                                    <GrClose />
                              </button>
                        </div>

                        {details?.refund ? (
                              <div className="bar overflow-x-auto mt-4 transparent-scroll sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
                                          <div className="bar overflow-hidden">
                                                <table className="min-w-full  bg-white border text-center text-sm font-light ">
                                                      <thead className="border-b  font-medium  ">
                                                            <tr>
                                                                  {/* <th scope="col" className="border-r px-2 py-4 font-[500]">
                                            Refund Date
                                        </th> */}
                                                                  <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                        Getway
                                                                  </th>
                                                                  <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                        name
                                                                  </th>
                                                                  <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                        account_number
                                                                  </th>

                                                                  <th scope="col" className="border-r px-2 py-4 font-[500]">
                                                                        Price
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            <tr className="border-b ">
                                                                  {/* <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                            <span> {details?.refund?.data?.getway ? details?.refund?.data?.getway : details?.refund?.data?.bank_name}</span>
                                        </td> */}
                                                                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
                                                                        <span>
                                                                              {" "}
                                                                              {details?.refund?.data?.getway
                                                                                    ? details?.refund?.data?.getway
                                                                                    : details?.refund?.data?.bank_name}
                                                                        </span>
                                                                  </td>
                                                                  <td className="whitespace-nowrap w-[60px] word-wrap border-r px-6 py-4 font-medium ">
                                                                        {details?.refund?.data?.name
                                                                              ? details?.refund?.data?.name
                                                                              : details?.refund?.data?.holder}
                                                                  </td>
                                                                  <td className="whitespace-nowrap w-[60px] word-wrap border-r px-6 py-4 font-medium ">
                                                                        {details?.refund?.data?.account_number
                                                                              ? details?.refund?.data?.account_number
                                                                              : details?.refund?.data?.ac}
                                                                  </td>
                                                                  <td className="whitespace-nowrap w-[60px] word-wrap border-r px-6 py-4 font-medium ">
                                                                        {totalPrice}
                                                                  </td>
                                                            </tr>
                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              </div>
                        ) : (
                              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
                        )}
                  </div>
            </div>
      );
};

export default ExportModal;
