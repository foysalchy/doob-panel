import { useSearchParams } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { Link } from "react-router-dom";

const SubscriptionModel = () => {
  const [open, setOpen] = useState(false);
  const { user, shopInfo } = useContext(AuthContext);
  const [searchParams] = useSearchParams(); // Get query parameters

  // Extract the 'path' query parameter and transform it
  const path = searchParams.get("path");
  const transformedPath = path
    ? path.replace(/-/g, ' ').toLowerCase()
    : "No path specified";

  return (
    <div className="">
      <div className="bg-white text-black px-10 py-10">
        <div className=" gap-3 justify-center mt-8">
          <h2 className="w-full text-center text-xl text-red-500">
          Please upgrade your subscription Package For  <strong className="text-gree-500">{transformedPath}</strong> Feathures
          </h2>
          <br />
          <div>
          <Link to={`/price`} className="w-[100px] block m-auto">
            <div className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded">
              Update
            </div>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModel;
