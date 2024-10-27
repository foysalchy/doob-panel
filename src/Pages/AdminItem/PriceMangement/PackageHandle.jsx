import React from "react";
import AllPrice from "./AllPrice";
import AddPrice from "./AddPrice";
import { Link } from "react-router-dom";
import AllPackage from "./AllPackage";

const PackageManagement = () => {
      return (
            <div>
                  <Link
                        className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-900"
                        to="/admin/package-management/add-package"
                  >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                              <svg
                                    className="h-5 w-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                              </svg>
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                              Add Package
                        </span>
                  </Link>
                  <div className="w-full">
                        <AllPackage />
                  </div>
            </div>
      );
};

export default PackageManagement;
