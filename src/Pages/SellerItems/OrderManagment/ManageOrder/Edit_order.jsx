import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { FiPlus, FiMinus, FiTrash2, FiEdit2, FiSave } from "react-icons/fi";
import BrightAlert from 'bright-alert';

const EditableOrder = ({ order, setEdit, refetch }) => {
      const [editedOrder, setEditedOrder] = useState(order);
      const [isEditingCustomer, setIsEditingCustomer] = useState(false);

      const updateQuantity = (productId, change) => {
            const updatedProducts = editedOrder.productList.map(product => {
                  if (product._id === productId) {
                        const newQuantity = Math.max(1, product.quantity + change);
                        return { ...product, quantity: newQuantity };
                  }
                  return product;
            });
            setEditedOrder({ ...editedOrder, productList: updatedProducts });
      };

      const deleteProduct = (productId) => {
            const updatedProducts = editedOrder.productList.filter(product => product._id !== productId);
            setEditedOrder({ ...editedOrder, productList: updatedProducts });
      };

      const updateCustomerDetails = (field, value) => {
            setEditedOrder({
                  ...editedOrder,
                  addresses: { ...editedOrder.addresses, [field]: value }
            });
      };

      const updateProductPrice = (productId, newPrice) => {
            const updatedProducts = editedOrder.productList.map(product => {
                  if (product._id === productId) {
                        return { ...product, price: parseFloat(newPrice) };
                  }
                  return product;
            });
            setEditedOrder({ ...editedOrder, productList: updatedProducts });
      };

      const updatePaymentGateway = (newGateway) => {
            setEditedOrder({
                  ...editedOrder,
                  method: { ...editedOrder.method, Getaway: newGateway }
            });
      };

       const handleSave = () => {
            const new_data = editedOrder
            const order_id = editedOrder._id
            delete new_data._id
            const body = {
                  order_id: order_id,
                  order_data: new_data
            }
            console.log(order_id, body, 'body');
            fetch("https://doob.dev/api/v1/seller/update-order-data", {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(body),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        BrightAlert(data.message);
                        refetch()
                        console.log(data);
                        setEdit(false);
                  });


      };



      return (
            <div className="fixed inset-0 h-full w-full z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
                  <div className="max-w-4xl mx-auto h-[90%] overflow-hidden  bg-white rounded-lg shadow-xl my-8">
                        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-lg">
                              <h2 className="text-xl font-bold text-gray-800">
                                    Edit Order: {editedOrder.orderNumber}
                              </h2>
                              <button
                                    onClick={() => setEdit(false)}
                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                              >
                                    <RxCross2 className="text-xl" />
                              </button>
                        </div>
                        <div className="p-6 h-[80%] overflow-auto space-y-6 text-start">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                          <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
                                                Customer Information
                                                <button
                                                      onClick={() => setIsEditingCustomer(!isEditingCustomer)}
                                                      className="text-blue-500 hover:text-blue-700"
                                                >
                                                      <FiEdit2 />
                                                </button>
                                          </h3>
                                          {isEditingCustomer ? (
                                                <div className="space-y-2">
                                                      <input
                                                            type="text"
                                                            value={editedOrder.addresses.fullName}
                                                            onChange={(e) => updateCustomerDetails('fullName', e.target.value)}
                                                            className="w-full p-2 border rounded"
                                                            placeholder="Full Name"
                                                      />
                                                      <input
                                                            type="text"
                                                            value={editedOrder.addresses.mobileNumber}
                                                            onChange={(e) => updateCustomerDetails('mobileNumber', e.target.value)}
                                                            className="w-full p-2 border rounded"
                                                            placeholder="Mobile Number"
                                                      />
                                                      <input
                                                            type="email"
                                                            value={editedOrder.addresses.email}
                                                            onChange={(e) => updateCustomerDetails('email', e.target.value)}
                                                            className="w-full p-2 border rounded"
                                                            placeholder="Email"
                                                      />
                                                      <input
                                                            type="text"
                                                            value={editedOrder.addresses.address}
                                                            onChange={(e) => updateCustomerDetails('address', e.target.value)}
                                                            className="w-full p-2 border rounded"
                                                            placeholder="Address"
                                                      />
                                                </div>
                                          ) : (
                                                <div>
                                                      <p><strong>Name:</strong> {editedOrder.addresses.fullName}</p>
                                                      <p><strong>Mobile:</strong> {editedOrder.addresses.mobileNumber}</p>
                                                      <p><strong>Email:</strong> {editedOrder.addresses.email}</p>
                                                      <p><strong>Address:</strong> {editedOrder?.addresses?.address}</p>
                                                </div>
                                          )}
                                    </div>
                                    <div>
                                          <h3 className="text-lg font-semibold mb-2">Order Details</h3>
                                          <p><strong>Order Number:</strong> {editedOrder.orderNumber}</p>
                                          <div className="flex items-center space-x-2">
                                                <strong>Payment Method:</strong>
                                                <select
                                                      value={editedOrder.method.Getaway}
                                                      onChange={(e) => updatePaymentGateway(e.target.value)}
                                                      className="p-1 border rounded"
                                                >
                                                      <option value="CashOnDelivery">Cash On Delivery</option>
                                                      <option value="CreditCard">Credit Card</option>
                                                      <option value="PayPal">PayPal</option>
                                                </select>
                                          </div>
                                          <div className="flex items-center space-x-2 mt-2">
                                                <label htmlFor="shippingTotal" className="font-semibold">
                                                       Total Amount:
                                                </label>
                                                <input
                                                      id="shippingTotal"
                                                      type="number"
                                                      defaultValue={
                                                            editedOrder?.promoHistory?.shipping_total ??
                                                            editedOrder?.promoHistory?.normalPrice
                                                      }
                                                      onChange={(e) => {
                                                            const value = parseFloat(e.target.value) || 0; // ভ্যালিড নাম্বার নিশ্চিত করা
                                                            setEditedOrder((prev) => {
                                                                  const promoHistory = { ...prev.promoHistory };

                                                                  if (promoHistory.shipping_total !== undefined) {
                                                                        promoHistory.shipping_total = value; // যদি `shipping_total` থাকে, তাহলে আপডেট
                                                                  } else if (promoHistory.normalPrice !== undefined) {
                                                                        promoHistory.normalPrice = value; // যদি `normalPrice` থাকে, তাহলে আপডেট
                                                                  }

                                                                  return { ...prev, promoHistory };
                                                            });
                                                      }}
                                                      className="p-1 border rounded w-24"
                                                      min="0"
                                                      step="0.01"
                                                />

                                          </div>
                                          <p><strong>Shop ID:</strong> {editedOrder.shopId}</p>
                                    </div>
                              </div>
                              <div>
                                    <h3 className="text-lg font-semibold mb-2">Products</h3>
                                    <div className="space-y-4">
                                          {editedOrder.productList.map((product) => (
                                                <div key={product._id} className="flex items-center justify-between border-b pb-4">
                                                      <div className="flex items-center space-x-4">
                                                            <img src={product.img} alt={product.productName} className="w-16 h-16 object-cover rounded" />
                                                            <div>
                                                                  <p className="font-semibold">{product.productName}</p>
                                                                  <div className="flex items-center space-x-2">
                                                                        <span>Price: </span>
                                                                        <input
                                                                              type="number"
                                                                              value={product.price}
                                                                              onChange={(e) => updateProductPrice(product._id, e.target.value)}
                                                                              className="w-20 p-1 border rounded"
                                                                              min="0"
                                                                              step="0.01"
                                                                        />
                                                                         BDT
                                                                  </div>
                                                            </div>
                                                      </div>
                                                      <div className="flex items-center space-x-4">
                                                            <div className="flex items-center space-x-2">
                                                                  <button
                                                                        onClick={() => updateQuantity(product._id, -1)}
                                                                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                                                  >
                                                                        <FiMinus />
                                                                  </button>
                                                                  <span className="font-semibold">{product.quantity}</span>
                                                                  <button
                                                                        onClick={() => updateQuantity(product._id, 1)}
                                                                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                                                  >
                                                                        <FiPlus />
                                                                  </button>
                                                            </div>
                                                            <button
                                                                  onClick={() => deleteProduct(product._id)}
                                                                  className="p-2 text-red-500 hover:bg-red-100 rounded-full"
                                                            >
                                                                  <FiTrash2 />
                                                            </button>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-b-lg">
                              <div className="flex justify-end space-x-4">
                                    <button
                                          onClick={() => setEdit(false)}
                                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-200"
                                    >
                                          Cancel
                                    </button>
                                    <button
                                          onClick={handleSave}
                                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 flex items-center"
                                    >
                                          <FiSave className="mr-2" />
                                          Save Changes
                                    </button>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default EditableOrder;
