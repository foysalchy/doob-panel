import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ReportManagement = () => {
      return (
            <div>
                  <div className='grid grid-cols-3 gap-4 py-10 pr-10'>
                        <Link
                              to={'commission-report'}
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-800 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                        >
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>
                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Processing Fee Report
                              </span>
                        </Link>

                        <Link
                              to={'customer-report'}
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500">
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>
                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Customer Report
                              </span>
                        </Link>
                        <Link
                              to={'pos-report'}
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500">
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>
                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    POS Report
                              </span>
                        </Link>
                        <Link
                              to={'sales-report'}
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500" >
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>
                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Sales Report
                              </span>
                        </Link>
                        <Link
                              to={'subscriber-report'}
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500">
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>
                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Subscriber Report
                              </span>
                        </Link>
                        <Link
                              to={'user-search-report'}
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                        >
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>
                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    User Search Report
                              </span>
                        </Link>
                        <Link
                              to={'warehouse-report'}
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                        >
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>
                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Warehouse Report
                              </span>
                        </Link>

                  </div>

            </div>
      );
};

export default ReportManagement;
