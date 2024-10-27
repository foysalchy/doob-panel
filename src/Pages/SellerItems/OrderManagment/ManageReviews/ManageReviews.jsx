import React, { useState } from 'react';
import { tags } from './reviewTags';
import ReviewTable from './ReviewTable';

const ManageReviews = () => {
      const [openTab, setOpenTap] = useState('product reviews')
      const [currentTag, setCurrentTag] = useState('all review')
      const [search, setSearch] = useState("");
      const [pageSize, setPageSize] = useState(15);

      return (
            <div>
                  <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xl">Manage Review</h3>
                        <div className="flex items-center whitespace-nowrap gap-2">
                              <span className="text-sm">Entire per page</span>
                              <select

                                    className="border w-[50px] px-1 py-2 text-sm rounded"
                                    onChange={(e) => setPageSize(e.target.value)}>
                                    <option value={15}>15</option>
                                    <option value={30}>30</option>
                                    <option value={70}>70</option>
                                    <option value={100}>100</option>

                              </select>
                        </div>
                  </div>
                  <div className="card bg-white md:p-6 mt-6  rounded-lg">
                        {/* <div className="flex gap-4 border-b">
                    <button onClick={() => setOpenTap('product reviews')} className={`${openTab == 'product reviews' ? 'bg-gray-100 rounded-t-md' : ''} md:px-6 px-2 py-2 md:text-lg text-[13px]`}>Product Reviews</button>
                    <button onClick={() => setOpenTap('seller reviews')} className={`${openTab == 'seller reviews' ? 'bg-gray-100 rounded-t-md' : ''} md:px-6 px-2 py-2 md:text-lg text-[13px]`}>Seller Reviews</button>

                </div> */}
                        {/* <div className="flex bar overflow-x-auto items-center mb-6 justify-between">
                    {
                        openTab == 'product reviews' && <div className="mt-4  flex items-center gap-3">
                            {tags?.map(itm => <button key={itm?._id} onClick={() => setCurrentTag(itm?.name)} className={`${currentTag == itm?.name ? 'text-white bg-blue-600' : 'text-white bg-gray-800'}  rounded-lg md:px-6 px-2 py-2 w-[200px]`}>{itm?.name}</button>)}
                        </div>
                    }
                </div> */}
                        <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} className="border w-full border-gray-300 rounded-md px-4 py-2" />
                        <ReviewTable search={search} pageSize={pageSize} setPageSize={setPageSize} />
                  </div>
            </div>
      );
};

export default ManageReviews;
