import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import showAlert from "../../../Common/alert";
import { Link } from "react-router-dom";
 
import useAddDivToTableCells from "../../../Common/useAddDivToTableCells";
const Withdraw = () => {
      
      const { shopInfo,user } = useContext(AuthContext);
      const { data: orders = [], refetch } = useQuery({
            queryKey: ["my-orders"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/get-my-withdraw-order?shopId=${shopInfo?._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const { data: withdrawHistory = [], refetch: reload } = useQuery({
            queryKey: ["my-withdrawHistory"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/withdraw-for-shop?shopId=${shopInfo?._id}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });


      // State variables for input fields
      const [amount, setAmount] = useState("");
      const [email, setEmail] = useState("");
      const [phone, setPhone] = useState("");
      const [methodx, setMethod] = useState("");
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
                  const price = parseInt(order.price) || 0;
                  const commission = (parseInt(order.commission) || 0) * order.quantity ?? 1;
                  const handling = (parseInt(order.handling) || 0) * order.quantity ?? 1;
                  console.log(
                        price - (commission + handling),
                        "price - (commission + handling)");
                  return (
                        acc +
                        (price - (commission + handling))
                  );
            }, 0);
            setTotalAllTotalPrices(total);

      }, [orders, withdrawHistory]);


      console.log(orders);

      // Calculate total pending withdrawal
      const totalPendingWithdrawal = withdrawHistory
            .filter((withdraw) => !withdraw?.status)
            .reduce((acc, withdraw) => acc + withdraw.amount, 0);

      // Calculate total withdrawal
      const totalWithdrawal = withdrawHistory
            .filter((withdraw) => withdraw?.status)
            .reduce((acc, withdraw) => acc + withdraw.amount, 0);

      const total_request = withdrawHistory.length;

      const total_pending = withdrawHistory.filter(
            (withdraw) => !withdraw?.status
      ).length;
      const total_success = withdrawHistory.filter(
            (withdraw) => withdraw?.status
      ).length;

      const total_request_amount = withdrawHistory.reduce(
            (acc, withdraw) => acc + withdraw.amount,
            0
      );

      // Function to handle withdrawal
      const handleWithdraw = () => {
             console.log(methodx,'useruser')
            if(methodx=='bkash'){
                  setAccountNumber(shopInfo.bkash)
                  setAccountName(user.name)
                  setBankName('Bkash')
            }else if(methodx=='nagad'){
                  setAccountNumber(shopInfo.nagad)
                  setBankName('Nagad')
                  setAccountName(user.name)

            }else if(methodx=='rocket'){
                  setAccountNumber(shopInfo.rocket)
                  setBankName('rocket')
                  setAccountName(user.name)

            }else if(methodx=='bank'){
                  setAccountNumber(shopInfo.account_number)
                  setAccountName(shopInfo.account_name)
                  setBankName(shopInfo.bank)
            }
            fetch("https://doob.dev/api/v1/admin/withdraw", {
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
                        reload()
                        refetch();
                        showAlert("Withdrawal request sent successfully", "", "success");

                        setWithdraw(false);
                        // }
                  });
      };

      const currentAvailableAmount = parseInt(totalAllTotalPrices) - parseInt(total_request_amount);
      useAddDivToTableCells();
      return (
            <div className="max-w-screen-lg mx-auto p-4">
                  <div className="md:flex gap-2 mb-4 items-center justify-between">
                        <h1 className="text-2xl font-bold ">My Orders</h1>

                        <div className="flex items-center  gap-2">
                              <Link  to={"/seller/settings/price-role"} className="bg-gray-900 text-white px-4 py-2 rounded-md">Price Role  </Link>
                  
                              <button
                                    onClick={() => setWithdraw(true)}
                                    className="bg-gray-900 text-white px-4 py-2 rounded-md"
                              >
                                    Withdraw
                              </button>
                              <Link to={"/seller/withdraw-history"}  className="bg-gray-900 text-white px-4 py-2 rounded-md">Withdraw History</Link>
                  
                        </div>
                  </div>
                  <div className="  items-center justify-between">
                            
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="text-center px-3 py-3 text-white  rounded-[5px] group relative overflow-hidden bg-gradient-to-br from-blue-500/90 to-blue-600/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300  ">
                            
                                    <p className="mr-2">Total Pending Withdrawal</p>
                                    <p className="text-white font-bold">
                                          ৳{totalPendingWithdrawal.toFixed(2)}
                                    </p>
                              </div>
                              <div className="text-center px-3 py-3 text-white rounded-[5px] group relative overflow-hidden bg-gradient-to-br from-rose-500/90 to-rose-600/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                            
                                    <p className="mr-2">Total Withdrawal</p>
                                    <p className="text-white font-bold">
                                          ৳{totalWithdrawal.toFixed(2)}
                                    </p>
                              </div>
                              <div className="text-center px-3 py-3 text-white rounded-[5px] group relative overflow-hidden bg-gradient-to-br from-violet-500/90 to-violet-600/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                      
                                    <p className="mr-2">Current Balance</p>
                                    <p className="text-white font-bold">
                                          ৳ {Math.round(currentAvailableAmount)}
                                    </p>
                              </div>
                        </div>
                       
                  </div>

                  
                  <table className=" w-full border-collapse mt-4">
                        <thead>
                              <tr className="bg-gray-200">
                                    <th className="p-3 text-left">Order ID</th>
                                    <th className="p-3 text-left">Product Price</th>
                                    <th className="p-3 text-left">Processing Fee</th>
                                    <th className="p-3 text-left">Packaging Fee</th>
                                    <th className="p-3 text-left">Quantity</th>
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
                                          <td className="p-3">{order.quantity}</td>
                                          <td className="p-3">
                                                ৳
                                                {(
                                                      order.price -
                                                      (parseInt(order.commission * parseInt(order.quantity)) + parseInt(order.handling * parseInt(order.quantity)))
                                                ).toFixed(2)}
                                          </td>{" "}
                                          {/* Calculate and display total amount */}
                                    </tr>
                              ))}
                        </tbody>
                  </table>

                  {
                        withdraw && (
                              <div className="fixed top-0 z-50 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                                    <div className="bg-white p-4 max-w-lg rounded-md">
                                          <h1 className="text-2xl font-bold mb-4">Withdraw</h1>
                                          <p className="mb-4">
                                                Available balance: ৳{currentAvailableAmount}?
                                          </p>
                                          <input
                                                type="number"
                                                className="w-full border border-gray-300  rounded-md px-3 py-2 mb-3"
                                                placeholder="Withdraw Amount"
                                                value={amount}
                                                max={currentAvailableAmount} // Set the minimum value for the input
                                                onChange={(e) =>
                                                      setAmount(Math.min(currentAvailableAmount, e.target.value))
                                                }
                                          />
                                          <input
                                                type="email"
                                                className="w-full border border-gray-300 mt-3 rounded-md px-3 py-2 mb-3"
                                                placeholder="Your Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                          />
                                          <input
                                                type="text"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
                                                placeholder="Your Phone Number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                          />
                                          <select  onChange={(e) => setMethod(e.target.value)} name="method"  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3" id="">
                                                <option value="" selected disabled>select method</option>
                                                {shopInfo.bkash && (<option value="bkash">bkash: {shopInfo.bkash}</option>)}
                                                {shopInfo.nagad && (<option value="nagad">Nagad: {shopInfo.nagad}</option>)}
                                                {shopInfo.rocket && (<option value="rocket">Rocket: {shopInfo.rocket}</option>)}
                                                {shopInfo.bank && ( <option value="bank">Bank: {shopInfo.bank}</option>)}
                                          </select>
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
                        )
                  }
            </div >
      );
};

export default Withdraw;
