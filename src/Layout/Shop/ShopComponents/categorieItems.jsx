import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ShopAuthProvider } from "../../../AuthProvider/ShopAuthProvide";
import { Link } from "react-router-dom";

export default function CategorieItems({ setIsMenuOpen, categories, shopId }) {
    const { shopUser, logOut, shop_id } = useContext(ShopAuthProvider)

    return (
        <div className="h-screen">
            <div className="overflow-x-hidden overflow-y-auto p-2 h-[83%]">
                <ul className="grid grid-cols-3 gap-3">
                    {categories?.map((i, index) => (
                        <li onClick={() => setIsMenuOpen(false)} key={index} className="hover:bg-gray-800 hover:text-white bg-gray-100 duration-200 flex justify-center items-center w-full p-3 rounded-md">
                            <Link className="flex flex-col justify-center items-center gap-2 break-words" to={`/shop/${shopId}/categories/${shop_id.shop_id}/${i?.name}`}>
                                <img
                                    className="h-[50px] w-[50px] rounded text-gray-400 filter grayscale brightness-90 object-cover"
                                    src={i?.img}
                                    srcSet={i?.img}
                                    alt=""
                                />
                                <p className="font-[400] text-center break-words capitalize text-md whitespace-no-wrap">{i?.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}