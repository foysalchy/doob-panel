import React from "react";
import { MdDone } from "react-icons/md";

const ProductDescription = () => {
  return (
    <div className="">
      <h2 className="border-b">
        <span className="font-medium text-xl text-blue-500 border-b-2 border-blue-500">
          Description
        </span>
      </h2>
      <p className="my-8">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit
        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, Quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.{" "}
      </p>
      <ul>
        <li className="flex items-center mb-1">
          <MdDone className="mr-2" /> Some great feature name here
        </li>
        <li className="flex items-center mb-1">
          <MdDone className="mr-2" /> Lorem ipsum dolor sit amet, consectetur
        </li>
        <li className="flex items-center mb-1">
          <MdDone className="mr-2" /> Some great feature name here
        </li>
        <li className="flex items-center mb-1">
          <MdDone className="mr-2" /> Lorem ipsum dolor sit amet, consectetur
        </li>
        <li className="flex items-center mb-1">
          <MdDone className="mr-2" /> Some great feature name here
        </li>
      </ul>
    </div>
  );
};

export default ProductDescription;
