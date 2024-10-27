import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SiteContentSeller = () => {
      return (
            <div className='grid md:grid-cols-3 gap-4 md:py-10'>
                  <Link
                        className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                        to="/seller/content-management/brand-management"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-10">
                              <FaLongArrowAltRight />
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                              Brand Management
                        </span>
                  </Link>

                  <Link
                        className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                        to="/seller/content-management/promo-code-management"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-10">
                              <FaLongArrowAltRight />
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                              Promo Code
                        </span>
                  </Link>
                  <Link
                        className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                        to="/seller/content-management/popup-management"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-10">
                              <FaLongArrowAltRight />
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                              Pop Up
                        </span>
                  </Link>
                  <Link
                        className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                        to="/seller/content-management/slider-management"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-10">
                              <FaLongArrowAltRight />
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                              Slider
                        </span>
                  </Link>
                  <Link
                        className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                        to="/seller/content-management/campaign-management"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-10">
                              <FaLongArrowAltRight />
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                              Campaign
                        </span>
                  </Link>
                  <Link
                        className="group relative inline-flex items-center justify-center bar overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                        to="/seller/content-management/feature-management"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-10">
                              <FaLongArrowAltRight />
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                              Feature Image
                        </span>
                  </Link>
            </div>
      );
};

export default SiteContentSeller;
