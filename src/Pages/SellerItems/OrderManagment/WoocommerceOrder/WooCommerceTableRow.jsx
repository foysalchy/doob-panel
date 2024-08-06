import React, { useContext, useEffect, useRef, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import OrderAllinfoModal from "./WooCommerceOrderAllinfoModal";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import WooCommerceOrderAllinfoModal from "./WooCommerceOrderAllinfoModal";
import BrightAlert from "bright-alert";

const WooCommerceTableRow = ({ data, refetch }) => {
  // if (!data) {
  //     return null
  // }

  console.log(data);
  // const { _id, method, ReadytoShip, price, ShipOnTimeSLA, Status, document, documentLink, orderDate, orderNumber, pendingSince, quantity, product, sellerSku, sendTo, timestamp, productList } = data;

  // const [formattedDate, setFormattedDate] = useState('');
  // const [emptyAction, setEmptyAction] = useState(true);
  const { checkUpData, setCheckUpData, shopInfo } = useContext(AuthContext);
  const [modalOn, setModalOn] = useState(false);
  // useEffect(() => {
  //     const Timestamp = timestamp;
  //     const date = new Date(Timestamp);

  //     // Format the date and time as per your requirements
  //     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  //     const formatted = date.toLocaleDateString('en-US', options);

  //     setFormattedDate(formatted);
  // }, []);

  // //? summation productList product total price
  // let ratial_price = 0;
  // for (let i = 0; i < productList.length; i++) {
  //     const price = parseFloat(productList[i]?.price);
  //     ratial_price += price

  // }

  function getTimeAgo(timestamp) {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - new Date(timestamp).getTime();

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  }

  const update_order_status = (status, order_id) => {
    fetch(
      `https://doob.dev/api/v1/seller/woo-order-status-update?order_id=${order_id}&status=${status}&shop_id=${shopInfo?._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        BrightAlert({ timeDuration: 3000 });
        refetch();
      });
  };

  return (
    <tr className="border-b ">
      <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">
        <div class="flex">
          <input
            type="checkbox"
            class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            id="hs-checkbox-group-1"
          />
        </div>
      </td>
      <td className="whitespace-nowrap border-r text-2xl">
        <button onClick={() => setModalOn(!modalOn)} className=" px-4 py-4">
          +
        </button>
        {/* {data.order_key} */}
        {/* <WooCommerceOrderAllinfoModal status={Status ? Status : 'Process'} setModalOn={setModalOn} modalOn={modalOn} productList={productList} /> */}
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 ">
        <Link
          to={`/invoice/${data?.id}`}
          className="text-blue-600 font-[500] text-[16px]"
        >
          {data?.id}
        </Link>
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
        {/* {data?.id} */}
        {/* <Link onClick={() => setCheckUpData(data)} to="woocommerce-order-checkup" className='text-blue-500 font-[400]'>{data.id}</Link> */}
        <h4>{data?.number}</h4>
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
        {/* {formattedDate} */}
        {new Date(data?.date_created).toLocaleString()}
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
        {getTimeAgo(data?.date_created)}
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
        {data?.payment_method_title}
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
        {data?.total}
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400]">
        {data?.status}
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
        {
          <td className="border-r px-6 py-4 flex items-center gap-2">
            <td className="whitespace-nowrap  px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
              {(data?.status === "pending" && (
                <>
                  <button
                    className="text-[16px] font-[400] text-blue-700"
                    onClick={() => update_order_status("processing", data?.id)}
                  >
                    Ready to Ship
                  </button>
                  <button
                    onClick={() => update_order_status("cancelled", data?.id)}
                    className="text-[16px] font-[400] text-blue-700"
                  >
                    Cancel
                  </button>
                </>
              )) ||
                (data?.status === "processing" && (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => update_order_status("on-hold", data?.id)}
                      className="text-[16px] font-[400] text-blue-700"
                    >
                      On Hold
                    </button>
                    <button
                      onClick={() => update_order_status("completed", data?.id)}
                      className="text-[16px] font-[400] text-blue-700"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => update_order_status("cancelled", data?.id)}
                      className="text-[16px] font-[400] text-blue-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => update_order_status("failed", data?.id)}
                      className="text-[16px] font-[400] text-blue-700"
                    >
                      Failed
                    </button>
                  </div>
                )) ||
                (data?.status === "on-hold" && (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => update_order_status("completed", data?.id)}
                      className="text-[16px] font-[400] text-blue-700"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => update_order_status("failed", data?.id)}
                      className="text-[16px] font-[400] text-blue-700"
                    >
                      Failed
                    </button>
                    <button
                      onClick={() => update_order_status("cancelled", data?.id)}
                      className="text-[16px] font-[400] text-blue-700"
                    >
                      Cancel
                    </button>
                  </div>
                )) ||
                (data?.status === "completed" && (
                  <button
                    onClick={() => update_order_status("refunded", data?.id)}
                    className="text-[16px] font-[400] text-blue-700"
                  >
                    Refund
                  </button>
                ))}
            </td>
          </td>
        }
      </td>
    </tr>
  );
};

export default WooCommerceTableRow;
