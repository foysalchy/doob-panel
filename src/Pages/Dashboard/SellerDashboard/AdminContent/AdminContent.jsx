import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminContent = () => {
      return (
            <div>
                  <div className='grid grid-cols-3 gap-4 py-10 pr-10'>
                        <Link
                              to={'popup-report'}
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-800 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                        >
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>
                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Admin Pop Up
                              </span>
                        </Link>

                        <Link
                              to={'notice-report'}
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500">
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>
                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Admin Notice
                              </span>
                        </Link>
                        <Link
                              to={'pos-report'}
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500">
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>
                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Admin Announcement
                              </span>
                        </Link>
                  </div>

            </div>
      );
};

export default AdminContent;
