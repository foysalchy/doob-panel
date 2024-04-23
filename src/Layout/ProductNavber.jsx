import { Link, NavLink } from "react-router-dom";
import Logo from "../../Logo.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/UserProvider";
import { MdDashboard } from "react-icons/md";
import { BiCart } from "react-icons/bi";

export default function Component() {
    const { search, user, setSearch } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [value, setValue] = useState('')
    const [userDash, setUserDash] = useState(false);


    const searchData = async () => {
        const term = searchTerm;
        // console.log(`https://salenow-v2-backend.vercel.app/api/v1/admin/search?term=${encodeURIComponent(term)}`);
        try {
            const response = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/search?term=${encodeURIComponent(term)}`);
            const data = await response.json();
            // console.log(data);
            setSearchResults(data);
            setSearchHistory([]);

            // Update the context with the current search term
            setSearch(term);
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        // console.log(input);
        setValue(input);
        setSearchTerm(input)
        setSearchResults()
        setSearch(input)
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/admin/search-history?term=${encodeURIComponent(input)}`).then((response) => response.json()).then((data) => setSearchHistory(data))
    };
    const [cardItem, setCardItem] = useState([]);

    useEffect(() => {
        // Function to update the cart from localStorage
        const updateCartFromLocalStorage = () => {
            const myCard = localStorage.getItem('cart-product');
            if (myCard) {
                const parsedCart = JSON.parse(myCard);
                setCardItem(parsedCart);
            }
        };

        // Initial call to update the cart
        updateCartFromLocalStorage();

        // Set interval to check for updates every millisecond (not recommended for performance reasons)
        const interval = setInterval(() => {
            updateCartFromLocalStorage();
        }, 1);

        // Cleanup function to clear the interval
        return () => clearInterval(interval);
    }, []);

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
                <div className=" mx-4 relative w-[500px] md:flex hidden items-center px-1 py-1 border bg-gray-100 rounded-md">
                    <input value={searchTerm} onChange={handleInputChange} className="w-full pl-4  bg-gray-100 outline-none h-full" placeholder="Search........" type="search" />
                    <button
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                        onClick={searchData}>Search</button>
                    {!value == '' &&
                        <div className="bg-white w-full left-0 ring-1 ring-gray-500 absolute top-[52px] z-[1000] p-3">
                            {/* Display search history suggestions */}
                            {searchHistory.length ? <div className="mt-4 w-full">
                                <div className='flex flex-wrap justify-center gap-2'>
                                    {searchHistory.slice(0, 10).map((item, index) => (
                                        <button className='border-2 text-sm px-2 rounded-2xl ' onClick={() => setSearchTerm(item.term)} key={index}>

                                            {item.term}</button>
                                    ))}
                                </div>
                            </div> : ''}
                            {/* Display search results */}
                            {<div className="mt-4 ">
                                <ul>
                                    {searchResults?.data?.productCollections?.filter((p) => p.adminWare).map((product, index) => (
                                        <li>
                                            <Link onClick={() => { setSearch(false), setSearchHistory() }} to={`/products/${product._id}`} className='text-black flex items-center gap-2' key={index}>
                                                <img src={product?.featuredImage.src} className="w-[30px] h-[30px]" />
                                                {product?.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>}

                        </div>}
                </div>
                <div className="flex items-center space-x-4">
                    <a className="text-black hover:text-gray-700" href="#">
                        Track Order
                    </a>

                    <Link to={'/products/my-card'} className="relative mx-auto bg-white border hover:bg-gray-200 p-2 rounded-md w-fit h-fit">
                        <BiCart className="text-2xl" />
                        <span className="absolute -right-2 -top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-500 text-center text-[12px] text-white ">{cardItem.length}</span>
                    </Link>

                    {!user ? (
                        <Link
                            to="/sign-in"
                            className="inline-flex items-center justify-center h-12 px-6  tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-black focus:shadow-outline focus:outline-none"
                            aria-label="Sign up"
                            title="Sign up"
                        >
                            Sign In
                        </Link>
                    ) : (
                        <>
                            {
                                (user && (
                                    <div className="md:hidden lg:flex">
                                        <div className="relative ">
                                            <button
                                                onClick={() => setUserDash(!userDash)}
                                                className="relative "
                                            >
                                                <div className="p-2 flex justify-center items-center px-4 rounded-full bg-gray-300 font-bold">
                                                    <p className="text-2xl text-center">{user?.name.charAt(0)}</p>
                                                </div>

                                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                                            </button>

                                            {userDash && (
                                                <div
                                                    className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                                                    role="menu"
                                                >
                                                    {(user?.role === "supperadmin" && (
                                                        <div method="POST" action="#" className=" p-4">
                                                            <Link
                                                                to="/admin/dashboard"
                                                                className="flex w-full items-center  gap-2 rounded-lg px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                                                role="menuitem"
                                                            >
                                                                <MdDashboard className="h-4 w-4" />

                                                                Dashboard
                                                            </Link>
                                                        </div>




                                                    )) ||
                                                        (user?.role === "seller" && (
                                                            <div method="POST" action="#" className=" p-4">
                                                                <Link
                                                                    to="/seller/dashboard"
                                                                    className="flex w-full items-center  gap-2 rounded-lg px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                                                    role="menuitem"
                                                                >
                                                                    <MdDashboard className="h-4 w-4" />

                                                                    Dashboard
                                                                </Link>
                                                            </div>

                                                        )) ||
                                                        (user?.role === "user" && (
                                                            <div method="POST" action="#" className=" p-4">
                                                                <Link
                                                                    to="/user/dashboard"
                                                                    className="flex w-full items-center  gap-2 rounded-lg px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                                                    role="menuitem"
                                                                >
                                                                    <MdDashboard className="h-4 w-4" />

                                                                    Dashboard
                                                                </Link>
                                                            </div>

                                                        ))

                                                    }

                                                    <div className="pb-2 px-2">
                                                        <strong className="block px-4 text-xs font-medium uppercase text-gray-400">
                                                            Danger Zone
                                                        </strong>

                                                        <div className="px-4">

                                                            <button
                                                                onClick={() => logOut()}
                                                                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                                role="menuitem"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                    />
                                                                </svg>
                                                                Log Out
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
