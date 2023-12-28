import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const OrderReviewLayout = () => {
    const location = useLocation();

    const links = [
        {
            path: '/shop/order_review',
            pathName: "Manage Order"
        },
        {
            path: '/shop/order_review/manage_review',
            pathName: "Manage Review"
        },
        {
            path: '/shop/order_review/schedule_drop-offs',
            pathName: "Schedule Drop Offs"
        },
        {
            path: '/shop/order_review/customer_return',
            pathName: "Customer Return"
        }
    ];

    return (
        <div className="h-screen grid grid-cols-5">
            <div className="sidebar h-full p-4">
                <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
                    <img className="w-32 text-black" src="/Logo.png" srcSet="/Logo.png" alt="" />
                    <div className="my-4 bg-gray-600 h-[1px]"></div>
                    {/* links */}
                    <ul className="">
                        {links.map((itm) => (
                            <li key={itm.path} className="mb-3">
                                <Link to={itm.path}>
                                    <div
                                        className={` h-[40px] rounded flex flex-col px-3 items-start justify-center ${location.pathname === itm.path ? 'bg-white' : 'bg-[#25252596] text-white'
                                            }`}
                                    >
                                        {itm.pathName}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="content overflow-x-hidden overflow-y-scroll bg-gray-100 h-full col-span-4 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default OrderReviewLayout;
