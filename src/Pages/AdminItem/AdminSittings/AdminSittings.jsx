import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminSittings = () => {
      return (
            <div>
                  <div className='grid grid-cols-3 gap-4 py-10'>
                        <Link
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                              to="/admin/settings/email-template/welcome-mail"
                        >
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>

                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Welcome Template
                              </span>
                        </Link>
                        <Link
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                              to="/admin/settings/email-template/verify-mail"
                        >
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>

                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Verify Accounts Template
                              </span>
                        </Link>
                        <Link
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                              to="/admin/settings/email-template/forget-pass-mail"
                        >
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>

                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Forget Password Template
                              </span>
                        </Link>
                        <Link
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                              to="/admin/settings/email-template/order-mail"
                        >
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>

                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Order Template
                              </span>
                        </Link>
                        <Link
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                              to="/admin/settings/email-template/package-mail"
                        >
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>

                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Package Template
                              </span>
                        </Link>
                        <Link
                              className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                              to="/admin/settings/shipping"
                        >
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>

                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Service Order Template
                              </span>
                        </Link>



                  </div>
            </div>
      );
};

export default AdminSittings;
