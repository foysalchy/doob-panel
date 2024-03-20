import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


const ReleventProduct = ({ productFind }) => {

    const { user } = useContext(AuthContext)

    const TrendingProducts = [
        {
            name: "Olevs 9868 Leather",
            image: "https://i.ibb.co/PNBgKv1/watch.png",
            price: "999",
            discountPrice: "400",
            description: "Analog watch for men",
        },
        {
            name: "Olevs 9868 Leather",
            image: "https://i.ibb.co/PNBgKv1/watch.png",
            price: "999",
            discountPrice: "400",
            description: "Analog watch for men",
        },
        {
            name: "Olevs 9868 Leather",
            image: "https://i.ibb.co/PNBgKv1/watch.png",
            price: "999",
            discountPrice: "400",
            description: "Analog watch for men",
        },
        {
            name: "Olevs 9868 Leather",
            image: "https://i.ibb.co/PNBgKv1/watch.png",
            price: "999",
            discountPrice: "400",
            description: "Analog watch for men",
        },
        {
            name: "Olevs 9868 Leather",
            image: "https://i.ibb.co/PNBgKv1/watch.png",
            price: "999",
            discountPrice: "400",
            description: "Analog watch for men",
        },
        {
            name: "Olevs 9868 Leather",
            image: "https://i.ibb.co/PNBgKv1/watch.png",
            price: "999",
            discountPrice: "400",
            description: "Analog watch for men",
        },
        {
            name: "Olevs 9868 Leather",
            image: "https://i.ibb.co/PNBgKv1/watch.png",
            price: "999",
            discountPrice: "400",
            description: "Analog watch for men",
        },
        {
            name: "Olevs 9868 Leather",
            image: "https://i.ibb.co/PNBgKv1/watch.png",
            price: "999",
            discountPrice: "400",
            description: "Analog watch for men",
        },
    ];

    const { data: releventProduct = [], refetch } = useQuery({
        queryKey: ["releventProduct"],
        queryFn: async () => {
            const res = await fetch("https://salenow-v2-backend.vercel.app/api/v1/admin/products");
            const data = await res.json();
            return data;
        },
    });

    // console.log(releventProduct, "releventProduct", productFind);

    if (!Array.isArray(releventProduct) || !releventProduct.every(item => Array.isArray(item.adminCategory))) {
        console.error("Invalid data format for releventProduct.");
        return null;
    }

    const relevantProducts = releventProduct.filter(product =>
        product.adminCategory.some(category => productFind.adminCategory.includes(category))
    );

    return (
        <div className=" bg-white rounded ">
            <section className="body-font">
                <div className="px-5">
                    <div className="flex justify-between text-black">
                        <div className="flex justify-between align-items-center">

                            <h3 className="whitespace-nowrap ml-2 font-medium">
                                Relevent Products
                            </h3>
                        </div>
                        {/* <button
                            type="button"
                            className="px-5 py-2 font-semibold rounded bg-black text-gray-100 text-xs "
                        >
                            SHOP MORE
                        </button> */}
                    </div>
                </div>
                <div className="border-b border-gray-200 mx-5 mt-2"></div>
                <div className="container px-5 py-8 mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 -m-4 text-black">
                        {relevantProducts.slice(0, 7).map((product, idx) => {
                            return (
                                <Link to={`/products/${product._id}`} className="mt-2">
                                    <div
                                        key={idx}
                                        className="p-4 flex flex-col justify-center items-center w-full md:w-11/12 lg:mx-2 text-black rounded"
                                    >
                                        <a className="block w-full relative h-[220px] rounded overflow-hidden">
                                            <img
                                                alt="ecommerce"
                                                className="object-cover w-full h-full block"
                                                srcSet={product?.featuredImage?.src}
                                                src={product?.featuredImage?.src}
                                            />
                                        </a>
                                        <div className="mt-4 text-start">
                                            <h3 className="text-md mb-1 font-medium">
                                                {product?.name}
                                            </h3>
                                            <div className="text-sm text_editor text-gray-600"
                                                dangerouslySetInnerHTML={{
                                                    __html: product?.shortDescription?.slice(0, 150) + "...",
                                                }}
                                            ></div>

                                            <div className="flex justify-start mt-3">
                                                <p className="py-0 font-medium">{product?.price}</p>
                                                <del>{product.discountPrice}</del>
                                            </div>

                                            {/* <button
                                                type="button"
                                                className="px-3 py-2  font-semibold rounded bg-black text-white text-xs "
                                            >
                                                {user.role === 'seller' ? 'Add My Store' : "Add to card"}
                                            </button> */}

                                        </div>
                                    </div></Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReleventProduct;
