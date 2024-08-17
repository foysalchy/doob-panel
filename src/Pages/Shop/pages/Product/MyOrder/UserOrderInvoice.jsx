import React, { useContext, useRef, useState } from 'react';
import { FaAnglesRight } from 'react-icons/fa6';
import { useReactToPrint } from 'react-to-print';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
import { AuthContext } from '../../../../../AuthProvider/UserProvider';

const InvoiceSm = ({ order, modalOpen, setModalOpen, formatDate, totalPrice }) => {

      return (
            <div className='bg-[#000000e1] w-[100%] h-[100%] p-2 fixed transparent-scroll overflow-x-auto overflow-y-auto top-0 left-0 z-[2000]'>
                  <button onClick={() => setModalOpen(!modalOpen)} className='bg-[red] m-6 text-white px-8 py-2 top-[-10px] absolute  right-[-14px]'>close</button>
                  <div className="w-full mt-12 h-full p-8 m-auto bg-white" >
                        <header className="clearfix">
                              <div id="logo">
                                    <img src={order?.logo} />
                              </div>
                              <div id="company">
                                    <h2 className="name">{order?.shopName}</h2>
                                    {/* <div>455 Foggy Heights, AZ 85004, US</div> */}
                                    <div>{order?.shopNumber}</div>
                                    <div>
                                          <a href="mailto:company@example.com">{order?.shopEmail}</a>
                                    </div>
                              </div>
                        </header>
                        <main className='main mt-4'>
                              <div id="details" className="clearfix">
                                    <div id="client">
                                          <h1 className='text-3xl font-bold text-blue-500'>INVOICE</h1>
                                          <div className="date">Date of Invoice: {formatDate(order?.timestamp)}</div>
                                          {/* <img src={shoporder?.logo} alt="" className="" /> */}
                                          <div className="to mt-3">INVOICE TO:</div>
                                          <h2 className="name text-sm">{order?.addresses?.fullName}</h2>
                                          <div className="address text-sm">{order?.addresses?.address} {order?.addresses?.area} {order?.addresses?.city} {order?.addresses?.province}</div>
                                          <div className="email text-sm">
                                                <a href="mailto:john@example.com">{order?.addresses?.mobileNumber}</a>
                                          </div>
                                    </div>
                              </div>
                              <div className="flex items-center justify-center bg-white">
                                    <div className="p-6 overflow-scroll px-0">
                                          <table className="w-full min-w-max table-auto text-left">
                                                <thead>
                                                      <tr className=''>
                                                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 bg-green-500 text-white font-bold">
                                                                  <p className="block antialiased font-sans text-md font-bold leading-none  no">#</p>
                                                            </th>
                                                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                                                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Product Image</p>
                                                            </th>
                                                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                                                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Product Name</p>
                                                            </th>
                                                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                                                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Unit Price</p>
                                                            </th>
                                                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                                                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Quantity</p>
                                                            </th>
                                                            <th className="border-y border-blue-gray-100  p-4 bg-green-500 text-white font-bold">
                                                                  <p className="block antialiased font-sans text-md font-bold leading-none  no">Total</p>
                                                            </th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {
                                                            order?.productList?.map((list, index) => <tr key={list?._id} className='border-b bg-gray-50'>
                                                                  <td className="p-4 border-b border-blue-gray-50 bg-green-500 text-white">
                                                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">{index + 1}</p>
                                                                  </td>
                                                                  <td className="p-2 border-b border-blue-gray-50">
                                                                        <img src="https://docs.material-tailwind.com/img/logos/logo-spotify.svg" alt="Spotify" className="inline-block relative object-center   w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1" />
                                                                  </td>

                                                                  <td className="p-4 border-b border-blue-gray-50">
                                                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{list.productName?.split(' ').slice(0, 5).join(" ")}</p>
                                                                  </td>
                                                                  <td className="p-4 border-b border-blue-gray-50">
                                                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{list?.price}</p>
                                                                  </td>
                                                                  <td className="p-4 border-b border-blue-gray-50">
                                                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{list.quantity}</p>
                                                                  </td>
                                                                  <td className="p-4 border-b border-blue-gray-50 bg-green-500 text-white">
                                                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">{parseInt(list?.price) * parseInt(list?.quantity)}</p>
                                                                  </td>
                                                            </tr>)
                                                      }
                                                </tbody>
                                                <tfoot>
                                                      <tr className=''>
                                                            <td colSpan={3} />
                                                            <td className='font-semibold text-md' colSpan={2}>SUBTOTAL</td>
                                                            <td className='font-semibold text-center'>{totalPrice}</td>
                                                      </tr>
                                                      <tr className=''>
                                                            <td colSpan={3} />
                                                            <td className='font-semibold text-md' colSpan={2}>TAX 25%</td>
                                                            <td className='font-semibold text-center'>300</td>
                                                      </tr>
                                                      <tr className=''>
                                                            <td colSpan={3} />
                                                            <td className='font-semibold text-md' colSpan={2}>GRAND TOTAL</td>
                                                            <td className='font-semibold text-center'>{totalPrice + 300} </td>
                                                      </tr>
                                                </tfoot>
                                          </table>
                                    </div>
                              </div>
                        </main>
                        <div className='bg-white w-full p-6'>
                              <div className='text-md font-semibold'>Thank you!</div>
                              Invoice was created on a computer and is valid without the signature and
                              seal.
                        </div>
                  </div>


            </div>
      )
}
const InvoiceLg = ({ order, modalOpen, setModalOpen, formatDate, totalPrice }) => {

      return (
            <div className='bg-[#000000e1] w-[100%] h-[100%] p-2 fixed transparent-scroll overflow-x-auto overflow-y-auto top-0 left-0 z-[2000]'>
                  <button onClick={() => setModalOpen(!modalOpen)} className='bg-white m-6 text-black px-8 py-2 float-right'>close</button>
                  <div className="w-full mt-12 h-full p-8 m-auto bg-white" style={{ width: '210mm', height: '297mm' }}>
                        <header className="clearfix">
                              <div id="logo">
                                    <img src={order?.logo} />
                              </div>
                              <div id="company">
                                    <h2 className="name">{order?.shopName}</h2>
                                    {/* <div>455 Foggy Heights, AZ 85004, US</div> */}
                                    <div>{order?.shopNumber}</div>
                                    <div>
                                          <a href="mailto:company@example.com">{order?.shopEmail}</a>
                                    </div>
                              </div>
                        </header>
                        <main className='main mt-4'>
                              <div id="details" className="clearfix">
                                    <div id="client">
                                          {/* <img src={shoporder?.logo} alt="" className="" /> */}
                                          <div className="to">INVOICE TO:</div>
                                          <h2 className="name">{order?.addresses?.fullName}</h2>
                                          <div className="address">{order?.addresses?.address} {order?.addresses?.area} {order?.addresses?.city} {order?.addresses?.province}</div>
                                          <div className="email">
                                                <a href="mailto:john@example.com">{order?.addresses?.mobileNumber}</a>
                                          </div>
                                    </div>
                                    <div id="invoice">
                                          <h1>INVOICE</h1>
                                          <div className="date">Date of Invoice: {formatDate(order?.timestamp)}</div>
                                    </div>
                              </div>
                              <table className='table' border={0} cellSpacing={0} cellPadding={0}>
                                    <thead className='thead'>
                                          <tr>
                                                <th className="no text-center">#</th>
                                                <th className=" text-center">Product photo</th>
                                                <th className=" text-center">Product Name</th>
                                                <th className=" text-center bg-gray-400">UNIT PRICE</th>
                                                <th className="text-center">QUANTITY</th>
                                                <th className=" text-center no">TOTAL</th>
                                          </tr>
                                    </thead>
                                    <tbody className='tbody'>
                                          {
                                                order?.productList?.map((list, index) => <tr key={index} className='text-center'>
                                                      <td className="no">{index + 1}</td>
                                                      <td className=""><img className='w-20 h-20 border border-opacity-40 rounded object-cover' src={list.img} alt="" /></td>
                                                      <td className="">
                                                            <h3>{list.productName?.split(' ').slice(0, 5).join(" ")}</h3>
                                                      </td>
                                                      <td className=" ">{list?.price}</td>
                                                      <td className=" ">{list.quantity}</td>
                                                      <td className="no ">{parseInt(list?.price) * parseInt(list?.quantity)}</td>
                                                </tr>)
                                          }
                                    </tbody>
                                    <tfoot>
                                          <tr>
                                                <td colSpan={3} />
                                                <td colSpan={2}>SUBTOTAL</td>
                                                <td>{totalPrice}</td>
                                          </tr>
                                          <tr>
                                                <td colSpan={3} />
                                                <td colSpan={2}>TAX 25%</td>
                                                <td>300</td>
                                          </tr>
                                          <tr>
                                                <td colSpan={3} />
                                                <td colSpan={2}>GRAND TOTAL</td>
                                                <td>{totalPrice + 300} </td>
                                          </tr>
                                    </tfoot>
                              </table>
                              <div id="thanks">Thank you!</div>
                              <div id="notices">
                                    <div>NOTICE:</div>

                              </div>
                              <footer>
                                    Invoice was created on a computer and is valid without the signature and
                                    seal.
                              </footer>

                        </main>
                  </div>
            </div>
      )
}

const UserOrderInvoice = ({ order, modalOpen, setModalOpen }) => {
      const { shopUser } = useContext(ShopAuthProvider)
      const { shopInfo } = useContext(AuthContext);

      const [steps, setStep] = useState({
            stepsItems: ["Order", "Processing", "Delivered"],
      })

      const totalPrice = order?.productList?.reduce((total, item) => {
            return total + item?.price * item?.quantity;
      }, 0);

      let subtotal = 0;

      const productList = order?.productList.map((product) => {
            const productSubtotal = product.price * product.quantity;
            subtotal += productSubtotal;
            return subtotal;
      })

      let currentStep;
      if (!order?.status) {
            currentStep = 2;
      } else if (order?.status === 'delivered') {
            currentStep = 5;
      } else if (order?.status === 'ready_to_ship') {
            currentStep = 3;
      } else if (order?.status === 'shipped') {
            currentStep = 4;
      } else if (order?.status === 'canceled' || "failed" || 'returned') {
            currentStep = 5;
      } else {
            // Default to 1 or any other appropriate value
            currentStep = 1;
      }
      function formatDate(timestamp) {
            // Check if the timestamp is in seconds, and convert it to milliseconds if needed
            if (timestamp.toString().length === 10) {
                  timestamp *= 1000;
            }
            const date = new Date(timestamp);

            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);

            const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

            return `${formattedDate} `;
      }

      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });

      const InvoicePage = ({ order }) => {
            console.log(order, "order");
            return (
                  <>
                        <div
                              ref={componentRef}
                              className="p-12 mx-8 print-data bg-white  mt-6">

                              <header className="flex items-start justify-between">
                                    <img src={shopInfo?.logo} alt="logo" className='w-[200px]' />
                                    <div className='whitespace-wrap w-[300px]'>
                                          <p className='text-gray-600 text-end'>{shopInfo?.shopName}</p>
                                          <p className='text-gray-600 text-end'>{shopInfo?.address}</p>
                                          <p className='text-gray-600 text-end'>{shopInfo?.shopEmail}</p>
                                          <p className='text-gray-600 text-end'>{shopInfo?.shopNumber}</p>
                                    </div>
                              </header>

                              <main>
                                    <div className="flex items-center justify-center py-1 font-bold text-gray-600 bg-gray-200 mt-8 text-center ">
                                          SALES INVOICE
                                    </div>

                                    {/*.*/}
                                    {/*.... Address ...*/}
                                    {/*.*/}
                                    <div className="flex items-center justify-between mt-4">
                                          <div>
                                                <div className='flex items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Name :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{order?.addresses?.fullName}</p>
                                                </div>

                                                <div className='flex items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Phone :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{order?.addresses?.mobileNumber}</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Address :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{order?.addresses?.address}</p>
                                                      <p className="text-gray-600 text-sm">{order?.addresses?.address}</p>
                                                      <p className="text-gray-600 text-sm">{order?.addresses?.city}</p>
                                                </div>
                                          </div>

                                          <div>
                                                <li className='flex justify-start items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Invoice No :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{order?._id}</p>
                                                </li>
                                                <li className='flex justify-start items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Invoice Date :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{
                                                            new Date().toDateString(new Date())
                                                      }</p>
                                                </li>
                                                <br />
                                                <li className='flex justify-start items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Payment Date :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{
                                                            new Date().toDateString(shopInfo?.paymentDate)
                                                      }</p>
                                                </li> <li className='flex justify-start items-center gap-2'>
                                                      <h4 className='font-semibold text-gray-700 text-sm'>
                                                            Order Date :
                                                      </h4>
                                                      <p className="text-gray-600 text-sm">{
                                                            new Date().toDateString(shopInfo?.date)
                                                      }</p>
                                                </li>

                                          </div>

                                    </div>

                                    {/*.*/}
                                    {/*.... Product ...*/}
                                    {/*.*/}

                                    <section className="container mx-auto mt-8">
                                          <div className="w-full mb-8 overflow-hidden">
                                                <div className="w-full overflow-x-auto">
                                                      <table className="w-full">
                                                            <thead>
                                                                  <tr className="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-900 uppercase border-b border-gray-900">
                                                                        <th className="px-4 py-2">Photo</th>
                                                                        <th className="px-4 py-2">Name</th>
                                                                        <th className="px-4 py-2 whitespace-nowrap">Stock Quantity</th>
                                                                        <th className="px-4 py-2">Price</th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody className="bg-white">
                                                                  {
                                                                        order?.productList?.map(itm => <tr key={itm?._id} className="text-gray-700">
                                                                              <td className="px-2 w-[90px] py-2 border border-gray-800">
                                                                                    <img src={itm?.img ? itm?.img : ''} alt="photo" className="w-12 h-12 border object-cover m-auto rounded bg-indigo-400" />
                                                                              </td>
                                                                              <td className="px-2 py-2 w-[500px] text-sm border border-gray-800">
                                                                                    {itm?.productName}
                                                                              </td>

                                                                              <td className="px-2 py-2 text-sm border text-center border-gray-800">
                                                                                    {itm?.stock_quantity ? itm?.stock_quantity : 0}
                                                                              </td>
                                                                              <td className="px-2 py-2 text-sm text-center border border-gray-800">
                                                                                    {itm?.price ? itm?.price : 0}
                                                                              </td>


                                                                        </tr>)
                                                                  }


                                                                  {/* <tr>
                                                <td colSpan={2} className='px-1 py-2 text-sm border  border-gray-800'></td>
                                                <td colSpan={1} className='px-1 py-2 text-sm border-b  border-gray-800 text-end'>
                                                    TOTAL:
                                                </td>
                                                <td colSpan={1} className='px-1 py-2 text-sm border  border-gray-800 text-start'>
                                                    $5000
                                                </td>
                                            </tr> */}
                                                                  {/* Add more rows here */}
                                                            </tbody>
                                                      </table>
                                                      <tfoot className='float-right mt-3  font-semibold'>
                                                            <tr>
                                                                  <td colSpan={3} />
                                                                  <td colSpan={2}>SUBTOTAL</td>
                                                                  <td>{totalPrice}</td>
                                                            </tr>
                                                            <tr>
                                                                  <td colSpan={3} />
                                                                  <td colSpan={2}>TAX 25%</td>
                                                                  <td>300</td>
                                                            </tr>
                                                            <tr>
                                                                  <td colSpan={3} />
                                                                  <td colSpan={2}>GRAND TOTAL</td>
                                                                  <td>{totalPrice + 300} </td>
                                                            </tr>
                                                      </tfoot>
                                                </div>
                                          </div>
                                    </section>

                                    <div className="flex justify-between ">
                                          <div></div>
                                          <div className="  gap-12 flex justify-between">
                                                <ul className='space-y-2'>
                                                      {/* <li>Sub Total</li> */}
                                                      {/* <li className=' font-bold'>Total :</li> */}
                                                </ul>

                                                <ul className='space-y-2'>

                                                      <li className='  font-bold'>
                                                            {/* ৳{totalPrice} */}
                                                      </li>
                                                </ul>
                                          </div>
                                    </div>



                              </main>
                              <footer>

                              </footer>
                        </div>
                  </>
            )
      }

      return (
            <>

                  <div className="bg-[#f2f2f2ca] fixed top-0 left-0 right-0 bottom-0 p-3 z-10">
                        <div className="flex items-center gap-1">
                              <button onClick={handlePrint} className='bg-[#3676ff] text-white px-8 py-2 float-right'>Print</button>

                              <button onClick={() => setModalOpen(!modalOpen)} className='bg-[#ff0033]  text-white px-8 py-2 float-right'>close</button>
                        </div>
                        <InvoicePage order={order} />
                  </div>

                  {/* {order &&
                <div>
                    <div className="md:block block">
                        <InvoiceSm order={order} modalOpen={modalOpen} setModalOpen={setModalOpen} formatDate={formatDate} totalPrice={totalPrice} />
                    </div>
                    <div className="md:hidden hidden">
                        <InvoiceLg order={order} modalOpen={modalOpen} setModalOpen={setModalOpen} formatDate={formatDate} totalPrice={totalPrice} />
                    </div>
                </div>

            } */}
            </>
      );
};

export default UserOrderInvoice;
