import { Link, NavLink } from "react-router-dom";
import Logo from "../../Logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/UserProvider";

export default function Component() {
    const { search, setSearch } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [value, setValue] = useState('')
    const searchData = async () => {
        const term = searchTerm;
        // console.log(`https://backend.doob.com.bd/api/v1/admin/search?term=${encodeURIComponent(term)}`);
        try {
            const response = await fetch(`https://backend.doob.com.bd/api/v1/admin/search?term=${encodeURIComponent(term)}`);
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
        fetch(`https://backend.doob.com.bd/api/v1/admin/search-history?term=${encodeURIComponent(input)}`).then((response) => response.json()).then((data) => setSearchHistory(data))
    };


    console.log(value, "searchResult....... ");
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
                <div className=" mx-4 relative w-[500px] md:flex hidden items-center px-1 py-1 border rounded-md">
                    <input value={searchTerm} onChange={handleInputChange} className="w-full outline-none h-full" placeholder="Khoj the Search........" type="search" />
                    <button
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                        onClick={searchData}>Search</button>
                    {!value == '' &&
                        <div className="bg-white w-full left-0 ring-1 ring-gray-500 absolute top-[52px] z-[1000] p-3">
                            {/* Display search history suggestions */}
                            {searchHistory.length && <div className="mt-4 w-full">
                                <div className='flex flex-wrap justify-center gap-2'>
                                    {searchHistory.slice(0, 10).map((item, index) => (
                                        <button className='border-2 text-sm px-2 rounded-2xl ' onClick={() => setSearchTerm(item.term)} key={index}>

                                            {item.term}</button>
                                    ))}
                                </div>
                            </div>}
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
