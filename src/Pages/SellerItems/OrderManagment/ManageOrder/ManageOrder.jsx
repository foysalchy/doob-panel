// import React, { useContext, useState } from 'react';
// import { ordersNav } from './ManageOrderNavData';
// import OrderTable from './OrderTable';
// import ExportModal from './ExportModal';
// import DarazOrderTable from '../DarazOrder/DarazOrderTable';
// import { AuthContext } from '../../../../AuthProvider/UserProvider';
// import { useQuery } from '@tanstack/react-query';
// import WooCommerceOrderTable from '../WoocommerceOrder/WooCommerceOrderTable';

// // import OrderTable from './OrderTable';

// const ManageOrder = () => {

//     let orderCounts = {};
//     const [passData, setPassData] = useState([])
//     // const [porductQuantity, setProductQuantity] = useState(0);
//     const [selectedValue, setSelectedValue] = useState('All');
//     const [openModal, setOpenModal] = useState(false);
//     const [daraz, setDaraz] = useState(false);
//     const [woo, setWoo] = useState(false)

//     const [searchValue, setSearchValue] = useState('');
//     const handleSelectChange = (event) => {
//         setSelectedValue(event.target.value);
//     };

//     const [selectedDate, setSelectedDate] = useState(null)
//     const [details, setDetails] = useState();




//     const { shopInfo } = useContext(AuthContext);

//     const { data: tData = [], refetch } = useQuery({
//         queryKey: ["sellerOrder"],
//         queryFn: async () => {
//             const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/order?shopId=${shopInfo._id}`);
//             const data = await res.json();
//             return data.data;
//         },
//     });

//     const { data: darazOrder = [], } = useQuery({
//         queryKey: ["sellerDaraz"],
//         queryFn: async () => {
//             const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/daraz-order?id=${shopInfo._id}&status=All`);

//             const data = await res.json();
//             return data.data;
//         },
//     });

//     const getOrderCount = (status) => {
//         // Filter orders based on the selected status
//         const filteredOrders = tData.filter((order) => {
//             if (status === 'All' || (status === 'pending' && !order.status) || order.status === status) {
//                 return true;
//             }
//             return false;
//         });
//         return filteredOrders.length;
//     };
//     const getDarazOrderCount = (status) => {
//         // Filter orders based on the selected status
//         const filteredOrders = darazOrder.orders.filter((order) => {
//             if (status === 'All' || (status === 'pending' && !order.statuses[0]) || order.statuses[0] === status) {
//                 return true;
//             }
//             return false;
//         });
//         return filteredOrders.length;
//     };


//     return (
//         <div>
//             <ExportModal openModal={openModal} details={details} setOpenModal={setOpenModal} />
//             <h3 className="font-bold text-xl">Orders Overview</h3>
//             <div className="flex flex-wrap justify-start  items-center gap-4 ">

//                 <button onClick={() => setDaraz(false)} className={`px-4 py-1 border text-white ${daraz ? "bg-gray-500 " : "bg-gray-900"}`}>
//                     Web Order
//                 </button>
//                 <button onClick={() => setDaraz(true)} className={`px-4 py-1 border text-white ${!daraz ? "bg-gray-500 " : "bg-gray-900"}`}>
//                     Daraz Order
//                 </button>
//                 <button onClick={() => setWoo(!woo)} className='px-4 py-1 bg-transparent border'>
//                     Woo Commerce Order
//                 </button>
//             </div>

//             <nav className='flex md:gap-4 gap-2  mt-6'>
//                 {ordersNav?.map((itm) =>
//                     itm?.status === 'dropdown' ? (
//                         <select
//                             key={itm.name}
//                             className={`px-4 border-r bg-transparent relative border-gray-300 flex items-center gap-2 justify-center ${selectedValue === 'pending' ? 'text-red-500' : '' // Change to your desired color
//                                 }`}
//                             value={selectedValue}
//                             onChange={handleSelectChange}
//                         >
//                             <option selected value="pending">Pending </option>
//                             {itm?.dropdownLink?.map((option) => (
//                                 <option key={option}>{option}  </option>
//                             ))}
//                         </select>
//                     ) : (
//                         <button
//                             className={`px-4 border-r md:bg-transparent bg-gray-50 border-gray-300 flex  items-center ${selectedValue === itm.value ? 'text-red-500' : '' // Change to your desired color
//                                 }`}
//                             style={{ whiteSpace: 'nowrap' }}
//                             key={itm.name}
//                             onClick={() => setSelectedValue(itm.value)}
//                         >
//                             {itm.name} {!daraz ? `(${getOrderCount(itm.value)})` : getDarazOrderCount(itm.value)}
//                             {/* {selectedValue === itm.value && porductQuantity} */}
//                         </button>
//                     )
//                 )}
//             </nav>

//             {/* filter */}
//             <div className="flex md:flex-row flex-col items-center gap-4 mt-4">
//                 <button className='px-4 bg-white py-1 border'>Print</button>
//                 <button onClick={() => setOpenModal(!openModal)} className='px-4 py-1 bg-transparent border'>
//                     Export orders
//                 </button>
//                 <input
//                     className="w-[260px] md:mt-0 mt-3 rounded border-gray-400 focus:outline-none p-2 border"
//                     type="date"

//                     // value={selectedDate}
//                     onChange={(e) => setSelectedDate(new Date(e.target.value))}
//                 />
//                 <div className="flex items-center gap-4">
//                     <div className='flex items-center md:mt-0 mt-3 bg-white '>
//                         <input onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder='Search' className="w-[260px] rounded border-gray-400 focus:outline-none p-2 border" />

//                     </div>
//                 </div>


//             </div>


//             <div className='mt-12 overflow-auto'>
//                 {/* table */}
//                 {
//                     !daraz ?
//                         <OrderTable setPassData={setPassData} ordersNav={ordersNav} orderCounts={orderCounts} selectedDate={selectedDate} setDetails={setDetails} setOpenModal={setOpenModal} selectedValue={selectedValue} searchValue={searchValue} />
//                         :
//                         <DarazOrderTable selectedValue={selectedValue} searchValue={searchValue} />
//                         || woo && <WooCommerceOrderTable searchValue={searchValue} />

//                 }
//             </div>
//         </div>
//     );
// };

// export default ManageOrder;
import React, { useContext, useState } from 'react';
import { ordersNav } from './ManageOrderNavData';
import OrderTable from './OrderTable';
import ExportModal from './ExportModal';
import DarazOrderTable from '../DarazOrder/DarazOrderTable';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import WooCommerceOrderTable from '../WoocommerceOrder/WooCommerceOrderTable';

const ManageOrder = () => {
    const { shopInfo } = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState('All');
    const [searchValue, setSearchValue] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [details, setDetails] = useState();
    const [daraz, setDaraz] = useState(false);
    const [woo, setWoo] = useState(false);
    const [passData, setPassData] = useState([])

    const { data: tData = [], refetch } = useQuery({
        queryKey: ["sellerOrder"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/order?shopId=${shopInfo._id}`);
            const data = await res.json();
            return data.data;
        },
    });

    const { data: darazOrder = [] } = useQuery({
        queryKey: ["sellerDaraz"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/daraz-order?id=${shopInfo._id}&status=All`);
            const data = await res.json();
            return data.data;
        },
    });

    const getOrderCount = (orders, status) => {
        return orders.filter(order => status === 'All' || (status === 'pending' && !order.status) || order.status === status).length;
    };

    const getDarazOrderCount = (orders, status) => {
        return orders.filter(order => status === 'All' || (status === 'pending' && !order.statuses[0]) || order.statuses[0] === status).length;
    };

    return (
        <div>
            <ExportModal openModal={openModal} details={details} setOpenModal={setOpenModal} />
            <h3 className="font-bold text-xl">Orders Overview</h3>
            <div className="flex flex-wrap justify-start  items-center gap-4 ">
                <button onClick={() => setDaraz(false)} className={`px-4 py-1 border text-white ${!daraz ? "bg-gray-900" : "bg-gray-500"}`}>
                    Web Order
                </button>
                <button onClick={() => setDaraz(true)} className={`px-4 py-1 border text-white ${daraz ? "bg-gray-900" : "bg-gray-500"}`}>
                    Daraz Order
                </button>
                <button onClick={() => setWoo(!woo)} className='px-4 py-1 bg-transparent border'>
                    Woo Commerce Order
                </button>
            </div>

            <nav className='flex md:gap-4 gap-2  mt-6'>
                {ordersNav?.map((itm) =>
                    itm?.status === 'dropdown' ? (
                        <select
                            key={itm.name}
                            className={`px-4 border-r bg-transparent relative border-gray-300 flex items-center gap-2 justify-center ${selectedValue === 'pending' ? 'text-red-500' : ''}`}
                            value={selectedValue}
                            onChange={e => setSelectedValue(e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            {itm?.dropdownLink?.map(option => (
                                <option key={option}>{option}</option>
                            ))}
                        </select>
                    ) : (
                        <button
                            key={itm.name}
                            className={`px-4 border-r md:bg-transparent bg-gray-50 border-gray-300 flex  items-center ${selectedValue === itm.value ? 'text-red-500' : ''}`}
                            style={{ whiteSpace: 'nowrap' }}
                            onClick={() => setSelectedValue(itm.value)}
                        >
                            {itm.name} {!daraz ? `(${getOrderCount(tData, itm.value)})` : getDarazOrderCount(darazOrder.orders, itm.value)}
                        </button>
                    )
                )}
            </nav>

            <div className="flex md:flex-row flex-col items-center gap-4 mt-4">
                <button className='px-4 bg-white py-1 border'>Print</button>
                <button onClick={() => setOpenModal(!openModal)} className='px-4 py-1 bg-transparent border'>
                    Export orders
                </button>
                <input
                    className="w-[260px] md:mt-0 mt-3 rounded border-gray-400 focus:outline-none p-2 border"
                    type="date"
                    onChange={e => setSelectedDate(new Date(e.target.value))}
                />
                <div className="flex items-center gap-4">
                    <div className='flex items-center md:mt-0 mt-3 bg-white '>
                        <input onChange={e => setSearchValue(e.target.value)} type="text" placeholder='Search' className="w-[260px] rounded border-gray-400 focus:outline-none p-2 border" />
                    </div>
                </div>
            </div>

            <div className='mt-12 overflow-auto'>
                {/* <WooCommerceOrderTable searchValue={searchValue} /> */}
                {!daraz ?
                    <OrderTable setPassData={setPassData} ordersNav={ordersNav} selectedDate={selectedDate} setDetails={setDetails} setOpenModal={setOpenModal} selectedValue={selectedValue} searchValue={searchValue} />
                    :
                    <DarazOrderTable selectedValue={selectedValue} searchValue={searchValue} />
                }
            </div>
        </div>
    );
};

export default ManageOrder;

