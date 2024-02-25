import { Link, NavLink } from "react-router-dom";
import Logo from "../../Logo.png";

export default function Component() {
    return (
        <div className="bg-white shadow-md">
            <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-8">
                <NavLink
                    to="/"
                    aria-label="Company"
                    title="Company"
                    className="inline-flex items-center"
                >
                    <img className="w-32 text-black" src={Logo} srcSet={Logo} alt="" />

                </NavLink>
                <div className="flex-1 mx-4">
                    <input className="w-full px-4 py-2 border rounded-md" placeholder="Khoj the Search........" type="search" />
                </div>
                <div className="flex items-center space-x-4">
                    <a className="text-black hover:text-gray-700" href="#">
                        Track Order
                    </a>
                    <a className="text-black hover:text-gray-700" href="#">
                        My Cart
                    </a>
                    <Link to='/sign-in' className="text-black hover:text-gray-700" href="#">
                        Log-in
                    </Link>
                    <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">Download APP</button>
                </div>
            </div>
        </div>
    )
}
