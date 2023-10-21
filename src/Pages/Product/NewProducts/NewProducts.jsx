import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";

const NewProducts = () => {
  const { user } = useContext(AuthContext)
  const newProducts = [
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

  return (
    <div className="py-4 bg-black rounded mt-6">
      <section className="body-font">
        <div className="px-5">
          <div className="flex justify-between text-white">
            <div className="flex justify-between align-items-center">
              <img
                className="h-5/6"
                src="https://i.ibb.co/zfBPGTy/new-product.png"
                alt="new-product-icon"
              />

              <h3 className="whitespace-nowrap ml-2 font-medium">
                New Product
              </h3>
            </div>
            <button
              type="button"
              className="px-5 py-2 font-semibold rounded bg-gray-500 text-white text-xs "
            >
              SHOP MORE
            </button>
          </div>
        </div>
        <div className="border-b border-gray-500 mx-5 mt-2"></div>
        <div className="container px-5 py-8 mx-auto">
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 -m-4 text-white">
            {newProducts.slice(0, 7).map((product, idx) => {
              return (
                <div
                  key={idx}
                  className="p-4 w-full md:w-11/12 bg-white lg:mx-2  text-black rounded"
                >
                  <a className="block relative h-32 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-cover h-full block"
                      src={product?.image}
                    />
                  </a>
                  <div className="mt-4 text-center">
                    <h3 className="text-xs mb-1 font-medium">
                      {product?.name}
                    </h3>
                    <h2 className="text-xs ">{product?.description}</h2>
                    <div className="flex justify-evenly">
                      <p className="py-0 font-medium">{product?.price}</p>
                      <del>{product.discountPrice}</del>
                    </div>
                    <div className="mt-2">
                      <button
                        type="button"
                        className="px-5 py-2  font-semibold rounded bg-black text-white text-xs "
                      >
                        {user.role === 'seller' ? 'Add My Store' : "Add to card"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewProducts;
