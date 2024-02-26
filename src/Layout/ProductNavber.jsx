import { Link, NavLink } from "react-router-dom";
import Logo from "../../Logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/UserProvider";

export default function Component() {
    const { search, setSearch } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);

    const searchData = async () => {
        const term = searchTerm;
        console.log(`https://backend.doob.com.bd/api/v1/admin/search?term=${encodeURIComponent(term)}`);
        try {
            const response = await fetch(`https://backend.doob.com.bd/api/v1/admin/search?term=${encodeURIComponent(term)}`);
            const data = await response.json();
            console.log(data);
            setSearchResults(data);

            // Update the context with the current search term
            setSearch(term);
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        console.log(input);
        setSearchTerm(input)
        setSearchResults()

        fetch(`https://backend.doob.com.bd/api/v1/admin/search-history?term=${encodeURIComponent(input)}`).then((response) => response.json()).then((data) => setSearchHistory(data))
    };


    console.log( searchHistory, "searchResult ");
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
                <div className=" mx-4 w-[500px] md:flex hidden items-center px-1 py-1 border rounded-md">
                    <input onChange={handleInputChange} className="w-full outline-none h-full" placeholder="Khoj the Search........" type="search" />
                    <button
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                        onClick={searchData}>Search</button>
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
