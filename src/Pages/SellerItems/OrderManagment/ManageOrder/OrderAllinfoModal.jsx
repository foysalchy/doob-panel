import React, { useState ,useContext} from 'react';
import SelectOrderProductInvoice from './SelectOrderProductInvoice';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

const OrderAllinfoModal = ({ status, productList, setModalOn, modalOn, orderInfo }) => {
      // const {img, productName, productId, quantity, price, shopId, userId } = productList
      const [selectedItems, setSelectedItems] = useState([]);



      const handleCheckboxChange = (productId, index) => {
            setSelectedItems((prevSelectedItems) => {
                  if (prevSelectedItems.some(item => item.product._id === productId._id)) {
                        return prevSelectedItems?.filter((item) => item.product._id !== productId._id);
                  } else {
                        return [...prevSelectedItems, { product: productId, index: index }];
                  }
            });
      };

      const handleSelectAll = () => {
            if (selectedItems.length === productList.length) {
                  setSelectedItems([]);
            } else {
                  const allProducts = productList.map((product, index) => ({ product: product, index: index }));
                  setSelectedItems(allProducts);
            }
      };

      const [print, setPrint] = useState(false)




      return (
            <>
                  {
                        selectedItems.length > 0 && print && <SelectOrderProductInvoice print={print} orderInfo={orderInfo} setPrint={setPrint} selectedItems={selectedItems} />
                  }
                  {modalOn && (
                        <div className="p-4">

                              <div className=""> 
                                    <table className="min-w-full   text-center text-sm font-light">
                                           
                                          <tbody>
                                                {productList?.map((item, index) => (
                                                      <ModalTableRow
                                                            orderInfo={orderInfo}
                                                            key={item?._id}
                                                            status={status}
                                                            item={item}
                                                            index={index + 1}
                                                            isSelected={selectedItems.some(itm => itm.product._id === item?._id)}
                                                            onCheckboxChange={handleCheckboxChange}
                                                      />
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  )}
            </>
      );
};

const ModalTableRow = ({ status, item, isSelected, onCheckboxChange, index }) => {
      const handleCheckboxChange = () => {
            onCheckboxChange(item, index);
      };
      const { shopInfo } = useContext(AuthContext);


      const [readyToShip, setReadyToShip] = useState(null);
      const [modalOn, setModalOn] = useState(false);

      return (
            <tr className='   rounded'>
                  
                  <td className="  px-2 pl-3 py-1 w-[45%]">
                        <div className='flex items-center gap-2'>
                              <img className='h-8 w-8 rounded  '    style={{ width: '70px', height: '60px',borderRadius:'10px' }} src={item.img} alt="" />
                              <div className='text-left'>
                                    <a 
                                          target='_blank'
                                          href={
                                                shopInfo?.domain
                                                      ? `https://${shopInfo.domain}/product/${item.productId}`
                                                      : `https://${shopInfo.subDomain}/product/${item.productId}`
                                          }
                                          >
                                          <p className='ptitle h-[20px]'>{item.productName}</p>
                                    </a>
                                    <p>Color: {item.variations.name}{item.variations?.size ? ', Size:':''}{item.variations?.size}</p>
                                    <p>SKU:{item.variations.SKU}</p>
                                  
                              </div>
                        </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td className='text-left'>  <p>৳.{item.price}*{item.quantity}</p></td>
                   
                   
                  {/* <td className="border-r px-2 py-4"> <td className="whitespace-nowrap  px-6 py-4 text-[16px] font-[400] flex flex-col gap-2">
                        {(!item?.status && (
                              <>
                                    <button
                                          onClick={() => setReadyToShip(item)}
                                          // onClick={() =>
                                          //   productStatusUpdate(
                                          //     "ready_to_ship",
                                          //     item?._id
                                          //   )
                                          // }
                                          className="text-[16px] font-[400] text-blue-700"
                                    >
                                          Ready to Shipx
                                    </button>
                                    <button
                                          onClick={() =>
                                                productStatusUpdate("Cancel", item?._id)
                                          }
                                          className="text-[16px] font-[400] text-blue-700"
                                    >
                                          Cancel
                                    </button>
                              </>
                        )) ||
                              (item?.status === "ready_to_ship" && (
                                    <button
                                          onClick={() =>
                                                productStatusUpdate("shipped", item?._id)
                                          }
                                          className="text-[16px] font-[400] text-blue-700"
                                    >
                                          Shipped
                                    </button>
                              )) ||
                              (item?.status === "shipped" && (
                                    <div className="flex flex-col gap-2">
                                          <button
                                                onClick={() =>
                                                      productStatusUpdate(
                                                            "delivered",
                                                            item?._id
                                                      )
                                                }
                                                className="text-[16px] font-[400] text-blue-700"
                                          >
                                                Delivered
                                          </button>
                                          <button
                                                onClick={() =>
                                                      productStatusUpdate("failed", item?._id)
                                                }
                                                className="text-[16px] font-[400] text-blue-700"
                                          >
                                                Failed Delivery
                                          </button>
                                    </div>
                              )) ||
                              (item?.status === "delivered" && (
                                    <button
                                          onClick={() =>
                                                productStatusUpdate("returned", item?._id)
                                          }
                                          className="text-[16px] font-[400] text-blue-700"
                                    >
                                          Returned
                                    </button>
                              )) ||
                              (item?.status === "return" && (
                                    <div>
                                          {item?.rejectNote ? (
                                                <button
                                                      className="text-red-500"
                                                      onClick={() => showRejectNode(item)}
                                                >
                                                      Rejected
                                                </button>
                                          ) : (
                                                <div className="flex flex-col justify-center">
                                                      <button
                                                            onClick={() => {
                                                                  setShowAlert(item),
                                                                        checkBox(item._id);
                                                            }}
                                                            className="text-[16px] font-[400] text-blue-700"
                                                      >
                                                            Approve
                                                      </button>
                                                      <button
                                                            onClick={() =>
                                                                  handleRejectProduct(item)
                                                            }
                                                            className="text-[16px] font-[400] text-blue-700"
                                                      >
                                                            Reject
                                                      </button>
                                                </div>
                                          )}
                                    </div>
                              )) ||
                              (item?.status === "returned" && (
                                    <button
                                          onClick={() =>
                                                productStatusUpdate(
                                                      "RefoundOnly",
                                                      item?._id
                                                )
                                          }
                                          className="text-[16px] font-[400] text-blue-700"
                                    >
                                          Refund Data
                                    </button>
                              )) ||
                              (item?.status === "Refund" && (
                                    <button
                                          onClick={() => viewDetails(item)}
                                          className="text-[16px] font-[400] text-blue-700"
                                    >
                                          View Details
                                    </button>
                              ))}
                  </td>


                  </td> */}
            </tr>
      );
};

export default OrderAllinfoModal;
