import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import WareHouse from "../SellerAddProduct/Components/WareHouse";
import Swal from "sweetalert2";

import { FixedSizeList as List } from "react-window";
import { BsArrowRight } from "react-icons/bs";
import Variants from "../SellerAddProduct/Components/Variants";

const AddDarazProduct = () => {
  const { shopInfo } = useContext(AuthContext);
  const [adminWare, setAdminWare] = useState(true);
  const [loading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [multiVendor, setMultiVendor] = useState(true);
  const [inputFields, setInputFields] = useState(false);
  const [variantInput, setVariantInput] = useState([
    {
      product1: {
        quantity: 1,
        quantityPrice: 1,
      },
      product2: {
        quantity: 1,
        quantityPrice: 1,
      },
      product3: {
        quantity: 1,
        quantityPrice: 1,
      },
      sellingPrice: 1,
    },
  ]);

  const { data: Products = [], refetch } = useQuery({
    queryKey: ["allProduct"],
    queryFn: async () => {
      const res = await fetch(
        `https://backend.doob.com.bd/api/v1/seller/daraz-product/${shopInfo._id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleSelectChange = (product) => {
    setSelectedOption(product);
    // Perform any other actions based on the selected product
  };

  const filteredProducts =
    Products.length &&
    Products.filter((product) =>
      product.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  console.log(selectedOption);

  const dataSubmit = async (e) => {
    e.preventDefault();

    // const product = e.target.darazProduct.value
    const form = e.target;
    const warehouse = form.warehouse.value;
    const area = form.area ? form.area.value : "";
    const rack = form.rack ? form.rack.value : "";
    const self = form.self ? form.self.value : "";
    const cell = form.cell ? form.cell.value : "";

    const adminMegaCategory = form?.adminMegaCategory?.value;
    const adminSubCategory = form?.adminSubCategory?.value;
    const adminMiniCategory = form?.adminMiniCategory?.value;
    const adminExtraCategory = form?.adminExtraCategory?.value;

    const adminCategory = [
      adminMegaCategory,
      adminSubCategory,
      adminMiniCategory,
      adminExtraCategory,
    ];

    const warehouseValue = [
      { name: warehouse },
      { name: area },
      { name: rack },
      { name: self },
      { name: cell },
    ];
    setLoading(true);
    const originalData = selectedOption;
    const renamedData = originalData.skus.map((item) => ({
      name: "",
      image: item.Images || null,
      quantity: item.quantity || "",
      SKU: item.SellerSku || "",
      price: item.price || "",
      offerPrice: item.special_price || "",
      ability: false,
      vendor: false,
    }));

    const Images = originalData.images.map((url) => ({ src: url }));

    const transformedData = {
      videoUrl: originalData.videos,
      brandName: originalData.attributes.brand,
      BnName: originalData.attributes.name_bn,
      name: originalData.attributes.name_en,
      daraz: true,
      woo: false, // You didn't provide this information in the original data
      categories: [originalData.primary_category],
      warehouse: warehouseValue,
      description: originalData.attributes.description,
      stock_quantity: originalData.skus[0].quantity,
      regular_price: originalData.skus[0].price,
      price: originalData.skus[0].special_price || originalData.skus[0].price,
      sale_price:
        originalData.skus[0].special_price || originalData.skus[0].price,
      purchasable: true, // You can modify this based on your logic
      vendor: originalData.skus[0].source,
      total_sales: 0,
      package_width: originalData.skus[0].package_width,
      package_length: originalData.skus[0].package_length,
      package_height: originalData.skus[0].package_height,
      weight: originalData.skus[0].package_weight,
      createdAt: Date.now(),
      status: false, // You can modify this based on your logic
      featuredImage: Images[0],
      images: Images,
      videos: originalData.videos,
      sku: originalData.skus[0].SellerSku,
      metaTitle: originalData.attributes.name,
      metaDescription: originalData.attributes.description,
      MetaImage: Images[0],
      warrantyTypes: originalData.skus[0].warrantyTypes,
      rating_count: 0,
      variations: renamedData,
      shopId: shopInfo._id, // You need to define shopInfo
      adminWare: adminWare,
      item_id: originalData.item_id,
      multiVendor: multiVendor,
      adminCategory,
      variantData: variantInput[0],
      // Add other fields as needed
    };

    console.log(renamedData);
    fetch("https://backend.doob.com.bd/api/v1/seller/daraz-product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: transformedData }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.error);
        setLoading(false);
        Swal.fire(`${data.message}`, "", `${data.error}`);
      });
  };

  return (
    <div>
      <div className="border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded">
        <div className="flex flex-col">
          <span className="font-bold">Add Daraz Product</span>
          <small>
            Having accurate product information raises discoverability.
          </small>
        </div>

        <form onSubmit={dataSubmit} className="mt-4" action="">
          <div className="relative inline-block w-full">
            <button
              className="w-full"
              type="button"
              onClick={() => handleSelectChange(false)}
            >
              {selectedOption ? (
                <span className="border w-full p-2 px-4 rounded-md bg-white flex items-center space-x-2">
                  <img
                    src={selectedOption.images[0]}
                    alt={`Selected Product`}
                    className="border border-black rounded-sm"
                    style={{ height: "24px", width: "24px" }}
                  />
                  <span>{selectedOption.attributes.name}</span>
                </span>
              ) : (
                <>
                  {Products?.length ? (
                    <>
                      <input
                        type="text"
                        className="border w-full p-2 rounded-md bg-white flex items-center space-x-2"
                        placeholder="Search products"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </>
                  ) : (
                    <span className="border w-full p-2 rounded-md bg-white flex items-center space-x-2">
                      <span>Your Products are loading so Please wait ...</span>
                      {/* Additional text goes here */}
                    </span>
                  )}
                </>
              )}
            </button>

            {/* Dropdown with Search */}
            {!selectedOption && Products.length ? (
              <div className="mt-1 p-2 max-h-40 overflow-y-scroll bg-white border rounded-md">
                {filteredProducts.length ? (
                  <span>
                    {filteredProducts.map((product, i) => (
                      <div
                        key={i}
                        onClick={() => handleSelectChange(product)}
                        className="cursor-pointer hover:bg-gray-100 p-2 flex items-center space-x-2"
                      >
                        <span>{i + 1}</span>
                        <img
                          src={product.images[0]}
                          alt={`Product ${i + 1}`}
                          className="border border-black rounded-sm"
                          style={{ height: "24px", width: "24px" }}
                        />
                        <span>{`     ${product.attributes.name}`}</span>
                      </div>
                    ))}
                  </span>
                ) : (
                  "No product found"
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <WareHouse
            shopInfo={shopInfo}
            adminWare={adminWare}
            setAdminWare={setAdminWare}
          />
          <Variants
            adminWare={adminWare}
            multiVendor={multiVendor}
            setMultiVendor={setMultiVendor}
            inputFields={inputFields}
            daraz={true}
            variantInput={variantInput}
            setVariantInput={setVariantInput}
          />
          <div className="mt-4">
            {loading ? (
              <button
                type="button"
                className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
              >
                <span className="text-sm font-medium">Loading...</span>
                <svg
                  className="animate-spin h-4 w-4 ml-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!selectedOption}
                className={
                  !loading && selectedOption
                    ? "group relative cursor-pointer inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
                    : "group relative inline-flex items-center overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none mt-4 cursor-not-allowed"
                }
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <BsArrowRight />
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  Upload Product
                </span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDarazProduct;
