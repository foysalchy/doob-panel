import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { FiPlus, FiMinus, FiTrash2, FiEdit2, FiSave } from "react-icons/fi";
import BrightAlert from 'bright-alert';
import { useEffect } from 'react';
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";

const EditableOrder = ({type, order, setEdit, refetch ,note_type,shopInfo }) => {
      const [editedOrder, setEditedOrder] = useState(order);
      const [isEditingCustomer, setIsEditingCustomer] = useState(false);
      const [note, setNote] = useState(editedOrder.note||'');
      const [Cnote, setCNote] = useState(editedOrder.customer_note||'');
      const [shipping, setShipping] = useState(order?.shipping_charge);
      const [selectedProduct, setSelectedProduct] = useState([]);
      
      const [totalCost, setTotalCost] = useState(0);
      const ratial_price = (productList) => {
            let ratial_price = 0;
            for (let i = 0; i < productList.length; i++) {
                  const price =
                        parseFloat(productList[i]?.price) *
                        parseFloat(productList[i]?.quantity);
                  ratial_price += price;
            }
            return ratial_price;
      };  
        const { data: products = [] } = useQuery({
                  queryKey: ["products"],
                  queryFn: async () => {
                        const res = await fetch(
                              `https://doob.dev/api/v1/seller/all-products-active/${shopInfo._id}`
                        );
                        const data = await res.json();
                        return data;
                  },
            });
            const handleProductChange = (selectedOptions) => {
                 setSelectedProduct(selectedOptions.value)
            };
            const handleProductNew = (selectedVaritaions) => {
                  const product =selectedProduct; 
                   const newProduct = {
                         userId: order?.productList[0]?.userId,
                         quantity: 1,
                         shopId: shopInfo._id,
                         sku:product?.variations[0].SKU,
                         img: product.featuredImage?.src,
                         productName: product.name,
                         price: product?.price,
                         regular_price: product?.regular_price,
                         productId: product?._id,
                         weight: product?.weight,
                         warehouse: product?.warehouse,
                         selectedSize: null,
                         variations:  selectedVaritaions.value,
                         delivery_charge: 50,
                     };
                     
                     setEditedOrder((prevOrder) => ({
                         ...prevOrder,
                         productList: [...prevOrder.productList, newProduct],
                     }));
                     
                     
             };
      
      
      useEffect(() => {
            console.log(editedOrder?.productList,'editedOrder?.productList')
            const toatal = editedOrder?.productList  ? parseInt(ratial_price(editedOrder?.productList))  : parseInt(editedOrder?.price) 
            setTotalCost(parseInt(toatal)+parseInt(shipping))
            console.log(totalCost,'0asdfasd')
      }, [order,shipping,setShipping,editedOrder]);

      const updateQuantity = (productId, change) => {
            const updatedProducts = editedOrder.productList.map(product => {
                  if (product.productId === productId) {
                        const newQuantity = Math.max(1, product.quantity + change);
                        return { ...product, quantity: newQuantity };
                  }
                  return product;
            });
            setEditedOrder({ ...editedOrder, productList: updatedProducts });
      };
       
      
      const deleteProduct = (productId) => {
            const updatedProducts = editedOrder.productList.filter(product => product.productId !== productId);
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
            new_data.note=note;
            new_data.customer_note=Cnote;
            new_data.shipping_charge=shipping
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
                  <div className="max-w-4xl mx-auto   overflow-hidden  bg-white rounded-lg shadow-xl my-8">
                        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-lg">
                              <h2 className="text-xl font-bold text-gray-800">
                              {type==1 ? 'Order Note:':'Edit Order'} : {editedOrder.orderNumber}
                              </h2>
                              <button
                                    onClick={() => setEdit(false)}
                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                              >
                                    <RxCross2 className="text-xl" />
                              </button>
                        </div>
                        <div className="p-6   overflow-auto space-y-6 text-start">
                        {type==0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div >
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
                                          <div className="flex items-center justify-between space-x-2">
                                                <strong>Payment Method:</strong>
                                                <select
                                                      value={editedOrder.method.Getaway}
                                                      onChange={(e) => updatePaymentGateway(e.target.value)}
                                                      className="p-1 border w-[150px] rounded"
                                                >
                                                      <option value="CashOnDelivery">COD    </option>
                                                      <option value="CreditCard">Credit Card</option>
                                                      <option value="PayPal">PayPal</option>
                                                </select>
                                          </div>
                                          <div className="flex items-center justify-between space-x-2 mt-2">
                                                <label htmlFor="shippingTotal" className="font-semibold">
                                                       Shipping Amount:
                                                </label>
                                                <input
                                                      id="shippingTotal"
                                                      type="number"
                                                      defaultValue={
                                                            shipping
                                                      }
                                                      onChange={(e) => {setShipping(e.target.value)}}
                                                      className="p-1 w-[150px] border rounded w-24"
                                                      min="0"
                                                      step="0.01"
                                                />
                                              
                                          </div>
                                        
                                          <div className="flex items-center justify-between space-x-2 mt-2">
                                                <label htmlFor="totalam" className="font-semibold">
                                                       Total Amount:
                                                </label>
                                                <input
                                                      id="totalam"
                                                      type="number"
                                                      value={
                                                            totalCost 
                                                      } 
                                                      className="p-1 w-[150px] border rounded w-24"
                                                      min="0"
                                                      step="0.01"
                                                />

                                          </div>
                                         
                                    </div>
                              </div>
                              ):null}
                              <div >
                                    {console.log(editedOrder,'editedOrder')}
                              {type==0 ? (
                                    <>
                                    <h3 className="text-lg font-semibold mb-2">Products</h3>
                                    <div className='overflow-auto h-[100px]'>
                                          {editedOrder.productList.map((product) => (
                                                <div key={product._id} className="flex items-center justify-between border-b pb-4">
                                                      <div className="flex items-center space-x-4">
                                                            <img src={product.img} alt={product.productName} className="w-16 h-16 object-cover rounded" />
                                                            <div>
                                                                  <p className="font-semibold ptitle">{product.productName}</p>
                                                                  <p>Color: {product.variations.name}{product.variations?.size ? ', Size:':''}{product.variations?.size}</p>
                                          <p>SKU:{product.variations.SKU}</p> 
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
                                                                        onClick={() => updateQuantity(product.productId, -1)}
                                                                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                                                  >
                                                                        <FiMinus />
                                                                  </button>
                                                                  <span className="font-semibold">{product.quantity}</span>
                                                                  <button
                                                                        onClick={() => updateQuantity(product.productId, 1)}
                                                                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                                                  >
                                                                        <FiPlus />
                                                                  </button>
                                                            </div>
                                                            <button
                                                                  onClick={() => deleteProduct(product.productId)}
                                                                  className="p-2 text-red-500 hover:bg-red-100 rounded-full"
                                                            >
                                                                  <FiTrash2 />
                                                            </button>
                                                      </div>
                                                </div>
                                          ))}
                                          
                                    </div>
                                    <div className="">
                                          <label
                                                htmlFor="metaDescription"
                                                className="block text-sm font-medium text-gray-900"
                                          >
                                                Select Product
                                          </label>
                                          <div className='flex items-center gap-2'>
                                          <Select
                                                name=""
                                                placeholder="Select your product"
                                                options={products?.length && products?.map((data, i) => ({
                                                      value: data,
                                                      label: (
                                                            <div className="flex cursor-pointer gap-4 items-center">
                                                                  <div className="flex gap-2 items-center">
                                                                        <span>{i + 1}</span>
                                                                        <img
                                                                              src={data?.images[0]?.src}
                                                                              className="border border-black rounded-sm"
                                                                              style={{
                                                                                    marginRight: "8px",
                                                                                    height: "24px",
                                                                                    width: "24px",
                                                                              }}
                                                                        />
                                                                  </div>
                                                                  {data.name.split(" ").slice(0, 10).join(" ") + "..."}
                                                            </div>
                                                      ),
                                                }))}
                                               
                                                isSearchable 
                                                onChange={handleProductChange}
                                                    className='w-[200px]'
                                          />
                                          <Select
                                                name=""
                                                className='w-[200px]'
                                                placeholder="Select your Variations"
                                                options={selectedProduct && selectedProduct?.variations?.map((data, i) => ({
                                                      value: data,
                                                      label: data.SKU
                                                }))}
                                               
                                                isSearchable 
                                                onChange={handleProductNew}
                                          /></div>

                                    </div>
                                    </>
                              ):null}
                              
                              {note_type=='admin' && (
                                    <div className='mt-6'>
                                          <label htmlFor="">Note</label>
                                                <input 
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                                
                                                className="w-full p-2 border rounded"
                                                type="text" placeholder='note' name="" id="" />
                                    </div>
                                    )}
                                     {note_type=='customer' && (
                                    <div className='mt-6'>
                                          <label htmlFor="">Customer Note</label>
                                                <input 
                                                value={Cnote}
                                                onChange={(e) => setCNote(e.target.value)}
                                                
                                                className="w-full p-2 border rounded"
                                                type="text" placeholder='customer note' name="" id="" />
                                    </div>)}
                                   
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
