import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import Swal from "sweetalert2";

const Withdraw = () => {
  const { shopInfo } = useContext(AuthContext);
  const { data: orders = [], refetch } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/get-my-order?shopId=${shopInfo?._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  const { data: withdrawHistory = [], refetch: reload } = useQuery({
    queryKey: ["my-withdrawHistory"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/admin/withdraw-for-shop?shopId=${shopInfo?._id}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  // State variables for input fields
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");

  // State variable for withdrawal confirmation modal
  const [withdraw, setWithdraw] = useState(false);

  // State to hold the total of all total prices
  const [totalAllTotalPrices, setTotalAllTotalPrices] = useState(0);

  useEffect(() => {
    // Calculate the total of all total prices
    const total = orders.reduce((acc, order) => {
      return (
        acc +
        (order.price + parseInt(order.commission) + parseInt(order.handling))
      );
    }, 0);
    setTotalAllTotalPrices(total);
  }, [orders]);

  // Calculate total pending withdrawal
  const totalPendingWithdrawal = withdrawHistory
    .filter((withdraw) => !withdraw.status)
    .reduce((acc, withdraw) => acc + withdraw.amount, 0);

  // Calculate total withdrawal
  const totalWithdrawal = withdrawHistory
    .filter((withdraw) => withdraw.status)
    .reduce((acc, withdraw) => acc + withdraw.amount, 0);

  const total_request = withdrawHistory.length;
  const total_pending = withdrawHistory.filter(
    (withdraw) => !withdraw.status
  ).length;
  const total_success = withdrawHistory.filter(
    (withdraw) => withdraw.status
  ).length;

  const total_request_amount = withdrawHistory.reduce(
    (acc, withdraw) => acc + withdraw.amount,
    0
  );

  // Function to handle withdrawal
  const handleWithdraw = () => {
    fetch("https://backend.doob.com.bd/api/v1/admin/withdraw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // amount, email, phone, accountNumber, accountName, bankName
      body: JSON.stringify({
        shopId: shopInfo?._id,
        amount: amount,
        email,
        phone,
        accountNumber,
        accountName,
        bankName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire("Withdrawal request sent successfully", "", "success");
        // if (data.success) {
        refetch();
        setWithdraw(false);
        // }
      });
  };

  const currentAvailableAmount = parseInt(totalAllTotalPrices) - parseInt(total_request_amount);
  console.log(currentAvailableAmount);
  console.log(withdrawHistory);

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">My Withdraw</h1>
          <div className="flex items-center">
            <p className="mr-2">Total Pending Withdrawal</p>
            <p className="text-green-500 font-bold">
              ৳{totalPendingWithdrawal.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center">
            <p className="mr-2">Total Withdrawal</p>
            <p className="text-green-500 font-bold">
              ৳{totalWithdrawal.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center">
            <p className="mr-2">Current Balance</p>
            <p className="text-green-500 font-bold">
              ৳ {currentAvailableAmount.toFixed(2)}
            </p>
          </div>
        </div>
        <button
          onClick={() => setWithdraw(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Withdraw
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Product Price</th>
            <th className="p-3 text-left">Commission</th>
            <th className="p-3 text-left">Handling</th>
            <th className="p-3 text-left">Total Amount</th>{" "}
            {/* Add new column for Total Amount */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="p-3">{order._id}</td>
              <td className="p-3 text-left">৳{order.price}</td>
              <td className="p-3">৳{order.commission}</td>
              <td className="p-3">৳{order.handling}</td>
              <td className="p-3">
                ৳
                {(
                  order.price -
                  (parseInt(order.commission) + parseInt(order.handling))
                ).toFixed(2)}
              </td>{" "}
              {/* Calculate and display total amount */}
            </tr>
          ))}
        </tbody>
      </table>

      {withdraw && (
        <div className="fixed top-0 z-50 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 max-w-lg rounded-md">
            <h1 className="text-2xl font-bold mb-4">Withdraw</h1>
            <p className="mb-4">
              Are you sure you want to withdraw ৳{currentAvailableAmount}?
            </p>
            <input
              type="number"
              className="w-full border border-gray-300  rounded-md px-3 py-2 mb-3"
              placeholder="Amount"
              value={amount}
              max={currentAvailableAmount} // Set the minimum value for the input
              onChange={(e) =>
                setAmount(Math.min(currentAvailableAmount, e.target.value))
              }
            />
            <input
              type="email"
              className="w-full border border-gray-300 mt-3 rounded-md px-3 py-2 mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
              placeholder="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
              placeholder="Bank Name"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={handleWithdraw}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setWithdraw(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-4"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdraw;
