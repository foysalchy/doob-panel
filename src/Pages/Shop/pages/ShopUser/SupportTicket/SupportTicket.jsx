import React, { useContext, useState } from 'react';
import AddNewTicket from './AddNewTicket';
import { useQuery } from '@tanstack/react-query';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';
import ViewUserSupportTicket from './ViewUserSupportTicket';

const UserSupportTicket = () => {
    const { shop_id, shopUser } = useContext(ShopAuthProvider)
    const TdStyle = {
        ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-4 lg:px-4`,
        TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-2 px-2 text-center text-base font-medium`,
        TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-4 px-2 text-center text-base font-medium`,
        TdButton: `inline-block px-6 py-2.5 border rounded-md border-blue-500 text-primary hover:bg-blue-500 hover:text-white font-medium`,
    }

    const sliceData = (data) => {
        const words = data.split(' ');
        const firstFiveWords = words.slice(0, 5).join(' ');
        return firstFiveWords;
    }



    const formatDate = (date) => {
        const time = new Date(date);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        };
        return time.toLocaleString(undefined, options);
    };

    const [OpenSupport, setOpenSupport] = useState(false)


    const { data: supportTickets = [], refetch } = useQuery({
        queryKey: ["supportTickets"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/support?shopId=${shop_id.shop_id}&token=${shopUser._id}`);
            const data = await res.json();
            return data;
        },
    });
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };


    const filteredData = supportTickets.filter((item) =>
        item?._id?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        item?.subject?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        String(`#${item.ticketId}`)?.toLowerCase().includes(String(`${searchQuery}`)?.toLowerCase())
    );


    const [viewComment, setViewComment] = useState(false)
    const handleViewDetails = (ticketId) => {
        setViewComment(ticketId);
    };




    return (
        <section className=''>
            <div className='flex justify-between items-start'>
                <button onClick={() => setOpenSupport(true)} className='inline-block px-6 py-2.5 border rounded-md border-blue-500 text-primary hover:bg-blue-500 hover:text-white font-medium -mx-4 mb-4'>New Support Ticket</button>
                <AddNewTicket refetch={refetch} OpenSupport={OpenSupport} setOpenSupport={setOpenSupport} className='w-0 h-0' />
                <div className="relative w-3/5  ">
                    <input
                        type="text"
                        id="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search for..."
                        className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                    />

                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <button type="button" className="text-gray-600 hover:text-gray-700">
                            <span className="sr-only">Search</span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4 text-black"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </button>
                    </span>
                </div>
            </div>
            {filteredData.length ? <div className=''>
                <div className='flex flex-wrap -mx-4'>
                    <div className='w-full '>
                        <div className='max-w-full overflow-x-auto'>
                            <table className='w-full table-auto'>
                                <thead className='text-center bg-gray-900'>
                                    <tr>
                                        <th className={`${TdStyle.ThStyle} rounded-tl-xl`}> Id </th>
                                        <th className={TdStyle.ThStyle}> Subject </th>
                                        <th className={TdStyle.ThStyle}> Status </th>
                                        <th className={TdStyle.ThStyle}> Last Update </th>
                                        <th className={`${TdStyle.ThStyle} rounded-tr-xl`}> Action </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredData.map((ticket) => (
                                        <tr>
                                            <td className={TdStyle.TdStyle}>#{ticket?.ticketId}</td>
                                            <td className={TdStyle.TdStyle2}>
                                                {sliceData(ticket?.subject)}
                                            </td>
                                            <td className={TdStyle.TdStyle}>{!ticket?.status &&
                                                <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                                    <span
                                                        aria-hidden=""
                                                        className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                                                    />
                                                    <span className="relative text-xs">Processing</span>
                                                </span>
                                                || ticket?.status === 'Open' && <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                    <span
                                                        aria-hidden=""
                                                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                    />
                                                    <span className="relative text-xs">Open</span>
                                                </span>
                                                || ticket?.status === 'Closed' && <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                                    <span
                                                        aria-hidden=""
                                                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                                    />
                                                    <span className="relative text-xs">Closed</span>
                                                </span>
                                            }
                                            </td>
                                            <td className={TdStyle.TdStyle2}>{formatDate(ticket?.time)}</td>
                                            <td className={TdStyle.TdStyle2}>
                                                <button onClick={() => handleViewDetails(ticket._id)} className={TdStyle.TdButton}>
                                                    View Ticket
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {viewComment && (


                                        <div>
                                            <ViewUserSupportTicket
                                                refetch={refetch}
                                                viewComment={true}
                                                setViewComment={setViewComment}
                                                ticketDetails={filteredData.find(ticket => ticket._id === viewComment)}
                                            />
                                        </div>

                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> : <div>
                <h1>No Data Found</h1>
            </div>}
        </section>
    );

};

export default UserSupportTicket;