import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CategoriesManagement = () => {
      return (
            <div>
                  <div>
                        <div className='grid md:grid-cols-3 md:gap-4 gap-2 md:py-10 md:pr-10'>
                              <Link
                                    to={'/seller/categories-management/mega-categories-management'}
                                    className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                              >
                                    <span className="absolute -start-full transition-all group-hover:start-10">
                                          <FaLongArrowAltRight />
                                    </span>

                                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                                          Mega Categories Management
                                    </span>
                              </Link>
                              <Link
                                    to={'/seller/categories-management/sub-categories-management'}
                                    className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                              >
                                    <span className="absolute -start-full transition-all group-hover:start-10">
                                          <FaLongArrowAltRight />
                                    </span>

                                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                                          Sub Categories Management
                                    </span>
                              </Link>
                              <Link
                                    to={'/seller/categories-management/mini-categories-management'}
                                    className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                              >
                                    <span className="absolute -start-full transition-all group-hover:start-10">
                                          <FaLongArrowAltRight />
                                    </span>

                                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                                          Mini Categories Management
                                    </span>
                              </Link>
                              <Link
                                    to={'/seller/categories-management/extra-categories-management'}
                                    className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"

                              >
                                    <span className="absolute -start-full transition-all group-hover:start-10">
                                          <FaLongArrowAltRight />
                                    </span>

                                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                                          Extra Categories Management
                                    </span>
                              </Link>





                        </div>

                  </div>
            </div>
      );
};

export default CategoriesManagement;
