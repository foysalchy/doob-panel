import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Email_Template = () => {
      return (
            <div>
                  <div className='grid grid-cols-3 gap-4 py-10'>
                        <Link
                              className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gray-900 px-8 py-6 text-white focus:outline-none focus:ring active:bg-gray-500"
                              to="order-mail"
                        >
                              <span className="absolute -start-full transition-all group-hover:start-10">
                                    <FaLongArrowAltRight />
                              </span>

                              <span className="text-sm font-medium transition-all group-hover:ms-4">
                                    Order Template
                              </span>
                        </Link>

                  </div>

            </div>
      );
};

export default Email_Template;
