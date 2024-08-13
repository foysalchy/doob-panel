import React, { useState } from 'react';
import MultiStepForm from './Multistep';
import DemoNav from './DemoNav';
import { Link } from 'react-router-dom';

const SellerShopInfo = () => {

      const [responsive, setResponsive] = useState(false);

      return (
            <div className=' '>



                  <div className='flex w-full gap-6  '>
                        <div className=" h-full z-50  text-white">
                              <DemoNav responsive={responsive} setResponsive={setResponsive} />
                        </div>
                        <div className='w-full mt-4'>
                              <div>
                                    {responsive && <nav
                                          aria-label="breadcrumb"
                                          className="w-full lg:hidden rounded p-4 mb-4 bg-gray-800 text-gray-100"
                                    >
                                          <ol className="flex h-8 space-x-2">
                                                <li className="md:hidden block">
                                                      <button
                                                            onClick={() => setResponsive(!responsive)}
                                                            className="py-2"
                                                      >
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  viewBox="0 0 512 512"
                                                                  className="w-5 h-5 fill-current text-gray-100"
                                                            >
                                                                  <rect width="352" height="32" x="80" y="96"></rect>
                                                                  <rect width="352" height="32" x="80" y="240"></rect>
                                                                  <rect width="352" height="32" x="80" y="384"></rect>
                                                            </svg>
                                                      </button>
                                                </li>
                                                <li className="flex items-center">
                                                      <Link
                                                            rel="noopener noreferrer"
                                                            to="/seller/dashboard"
                                                            title="Back to homepage"
                                                            className="hover:underline"
                                                      >
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  viewBox="0 0 20 20"
                                                                  fill="currentColor"
                                                                  className="w-5 h-5 pr-1 text-gray-400"
                                                            >
                                                                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                                            </svg>
                                                      </Link>
                                                </li>

                                          </ol>
                                    </nav>}
                              </div>
                              <form className=' mx-auto rounded border-2 p-6' action="">
                                    <div className='' >

                                          <div className='text-center text-xl font-bold border-b pb-2 capitalize'>You must to complete all the fields</div>

                                          <div className='lg:p-10'>

                                                <MultiStepForm />
                                          </div>
                                    </div>

                              </form>
                        </div >
                  </div >
            </div >
      );
};

export default SellerShopInfo;
