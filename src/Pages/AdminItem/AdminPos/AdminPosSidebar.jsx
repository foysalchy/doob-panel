import React, { useEffect, useState } from 'react';
import { CgClose, CgShoppingCart } from 'react-icons/cg';
import { MdDeleteOutline } from 'react-icons/md';
import ProductList from './AdminProductList';
import deleteSound from '../../../../src/assets/sound_button-21.mp3'
import clickAudio from '../../../../src/assets/sound_beep-29.mp3'
import PosProductsDetails from './AdminPosProductsDetails';
import AdminPosProductsDetails from './AdminPosProductsDetails';

const AdminPosSidebar = ({ cartProducts, setCartProducts, close, setClose }) => {

      const [open, setOpen] = useState(false);
      const [invoice, setInvoice] = useState({});


      const [deleteAudio] = useState(new Audio(deleteSound));
      const [audio] = useState(new Audio(clickAudio));

      useEffect(() => {
            return () => {
                  deleteAudio.pause();
                  deleteAudio.currentTime = 0;
            };
      }, [deleteAudio]);


      useEffect(() => {
            return () => {
                  audio.pause();
                  audio.currentTime = 0;
            };
      }, [audio]);

      const [cash, setCash] = useState(0);
      const [discount, setDiscount] = useState(0);
      const [presents, setPresents] = useState(false);

      const increaseQuantity = (index) => {
            const updatedCart = [...cartProducts];
            updatedCart[index].quantity += 1;
            setCartProducts(updatedCart);
      };

      const decreaseQuantity = (index) => {
            const updatedCart = [...cartProducts];
            updatedCart[index].quantity = Math.max(0, updatedCart[index].quantity - 1);
            setCartProducts(updatedCart);
      };

      const totalPrice = () => {
            return cartProducts.reduce((total, item) => {
                  return total + item.quantity * item.price;
            }, 0);
      };

      let discountAmount = 0

      const calculateChange = () => {
            const cashAmount = cash ? parseInt(cash) : 0;

            if (discount && !presents) {
                  const discountPrice = totalPrice() - parseInt(discount)
                  discountAmount = parseInt(discount)
                  return discountPrice - cashAmount;
            } else if (discount && presents) {
                  const discountPrice = totalPrice() / 100 * parseInt(discount)
                  discountAmount = discountPrice
                  const price = totalPrice() - discountPrice

                  return price - cashAmount;
            } else {
                  return cashAmount - totalPrice();
            }
      };

      const changeAmount = calculateChange();


      const handleSubmit = () => {
            const items = cartProducts
            const total = totalPrice()
            const change = changeAmount
            const present = presents
            const discount = discountAmount
            const data = {
                  items,
                  total,
                  cash,
                  change,
                  discount,
                  present
            }
            setInvoice(data)
            setOpen(true)
      }

      return (
            <div className=' h-full flex flex-col justify-between'>
                  <div className="relative">
                        {
                              <div>
                                    <div className="flex items-center border-b pb-2 justify-between">
                                          <div className='relative '>
                                                <CgShoppingCart className='text-2xl ' />
                                                <span className='absolute top-[-10px] flex justify-center items-center left-8 bg-red-500
                                text-white rounded-full px-2 py-1 text-[10px] font-semibold transform h-6 w-6 p-1 -translate-x-1/2 -translate-y-1
                                6'>{cartProducts.length}</span>
                                          </div>

                                          <button onClick={() => setClose(!close)} className='text-[#fb2464] lg:hidden text-xl'>
                                                <CgClose />
                                          </button>

                                          <button className='bg-[#f1397929] w-[35px] h-[35px] rounded-full flex justify-center items-center'
                                                onClick={() => {
                                                      deleteAudio.play();
                                                      setCartProducts([]);
                                                }}
                                          ><MdDeleteOutline className='text-[#f1397afe] text-xl' /></button>
                                    </div>
                                    <ul className=' h-[280px] bar overflow-x-hidden bar overflow-y-auto'>
                                          {
                                                cartProducts?.map((itm, index) => (
                                                      <li >
                                                            <div className="flex justify-between items-center my-2 bg-white p-2 rounded-md">
                                                                  <div className="flex items-center gap-2">
                                                                        <img src={itm?.img} alt="" className="w-[60px] h-[60px] ring-1 ring-gray-300 rounded-md object-cover" />
                                                                        <div className="">
                                                                              <h3 className="text-sm">{itm?.name.slice(0, 16)}...</h3>
                                                                              <h3 className="text-lg">{itm?.price}</h3>
                                                                        </div>
                                                                  </div>
                                                                  <div className="flex items-center gap-2">
                                                                        <div className="flex border bg-gray-300 items-center">
                                                                              <button
                                                                                    onClick={() => decreaseQuantity(index)}
                                                                                    className="px-3 py-1   bg-gray-300 text-gray-700 rounded-l"
                                                                              >
                                                                                    -
                                                                              </button>
                                                                              <input
                                                                                    type="text"
                                                                                    value={itm?.quantity}
                                                                                    readOnly
                                                                                    className="w-12 text-center bg-white border border-gray-300 text-sm  px-2 py-1"
                                                                              />
                                                                              <button
                                                                                    onClick={() => increaseQuantity(index)}
                                                                                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r"
                                                                              >
                                                                                    +
                                                                              </button>
                                                                        </div>

                                                                  </div>
                                                            </div>
                                                      </li>
                                                ))
                                          }
                                    </ul>
                              </div>
                        }
                  </div>
                  <div className="">
                        <div className="flex items-center bg-gray-500 px-4 py-2  rounded justify-between">
                              <h2 className="text-lg">Total</h2>
                              <h2 className="text-lg">{totalPrice()}</h2>
                        </div>
                        <div className='flex bg-gray-400 justify-between px-4 py-2  mt-4 items-center'>
                              <h1> Discount</h1>
                              <label className='flex gap-2' htmlFor="percents">
                                    <input
                                          id='percents'
                                          type="checkbox"
                                          checked={presents}
                                          onChange={() => setPresents(!presents)}
                                    />
                                    Persentise
                              </label>
                              <input onChange={(e) => setDiscount(e.target.value)} className="bg-transparent text-right ring-1 px-2 w-[80px] ring-gray-300 rounded-md text-lg" type="text px-2" />
                        </div>
                        <div className="flex justify-between bg-green-400 px-4 py-2  mt-4  items-start">
                              <div className="">
                                    <h3 className="text-lg">Cash</h3>
                              </div>
                              <input
                                    value={cash}
                                    onChange={(e) => setCash(e.target.value)}
                                    type="text"
                                    className="bg-transparent px-2 text-right ring-1 w-[80px] ring-gray-300 rounded-md text-lg"
                              />
                        </div>
                        <div className="bg-white p-2  rounded-md mt-2">

                              <div className="flex justify-between flex-wrap mt-3 gap-2">
                                    <button
                                          onClick={() => { setCash(100), audio.play() }}
                                          className='w-[65px] px-3 py-0 rounded bg-gray-200'>100</button>
                                    <button
                                          onClick={() => { setCash(500), audio.play() }}
                                          className='w-[65px] px-3 py-0 rounded bg-gray-200'>500</button>
                                    <button
                                          onClick={() => { setCash(1000), audio.play() }}
                                          className='w-[65px] px-3 py-0 rounded bg-gray-200'>1000</button>
                                    <button
                                          onClick={() => { setCash(2000), audio.play() }}
                                          className='w-[65px] px-3 py-0 rounded bg-gray-200'>2000</button>
                              </div>
                        </div>

                        <div className={` ring-1 font-bold flex items-center justify-between ring-gray-300 text-black rounded p-2 w-full mt-3  ${changeAmount > 0 ? "bg-green-500" : changeAmount < 0 ? "bg-red-500" : ""}`}>
                              <div>Change</div>
                              <div className={`text-end`}>
                                    {parseInt(changeAmount)}
                              </div>
                        </div>

                        <button
                              onClick={() => handleSubmit()}
                              className="bg-gray-900 text-white rounded-md p-2 w-full mt-3">Submit</button>
                  </div>
                  <AdminPosProductsDetails invoice={invoice} open={open} setOpen={setOpen} />
            </div>
      );
};

export default AdminPosSidebar;
