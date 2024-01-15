import React, { useState } from 'react';
import { tags } from './reviewTags';
import ReviewTable from './ReviewTable';

const ManageReviews = () => {
    const [openTab, setOpenTap] = useState('product reviews')
    const [currentTag, setCurrentTag] = useState('all review')

    return (
        <div>
            <h3 className="font-bold text-xl">Manage Order</h3>
            <div className="card bg-white md:p-6 mt-6  rounded-lg">
                <div className="flex gap-4 border-b">
                    <button onClick={() => setOpenTap('product reviews')} className={`${openTab == 'product reviews' ? 'bg-gray-100 rounded-t-md' : ''} md:px-6 px-2 py-2 md:text-lg text-[13px]`}>Product Reviews</button>
                    <button onClick={() => setOpenTap('seller reviews')} className={`${openTab == 'seller reviews' ? 'bg-gray-100 rounded-t-md' : ''} md:px-6 px-2 py-2 md:text-lg text-[13px]`}>Seller Reviews</button>

                </div>
                <div className="flex overflow-x-auto items-center mb-6 justify-between">
                    {
                        openTab == 'product reviews' && <div className="mt-4  flex items-center gap-3">
                            {tags?.map(itm => <button key={itm?._id} onClick={() => setCurrentTag(itm?.name)} className={`${currentTag == itm?.name ? 'text-white bg-blue-600' : 'text-white bg-gray-800'}  rounded-lg md:px-6 px-2 py-2 w-[200px]`}>{itm?.name}</button>)}
                        </div>
                    }
                </div>
                <input type="text" placeholder="Search..." className="border w-full border-gray-300 rounded-md px-4 py-2" />
                <ReviewTable />
            </div>
        </div>
    );
};

export default ManageReviews;