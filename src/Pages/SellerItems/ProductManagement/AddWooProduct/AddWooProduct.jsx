import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import Swal from 'sweetalert2';
import WareHouse from '../SellerAddProduct/Components/WareHouse';
import Meta from '../SellerAddProduct/Components/Meta';
import { BsArrowRight } from 'react-icons/bs';

const AddWooProduct = () => {
    const { shopInfo } = useContext(AuthContext)
    const [adminWare, setAdminWare] = useState(true)
    const [loading, setLoading] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: allProduct = [], refetch } = useQuery({
        queryKey: ["woo-product"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/seller/woo-product/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });

    console.log(selectedOption);

    const handleSelectChange = (product) => {
        setSelectedOption(product);
        // Perform any other actions based on the selected product
    };

    const filteredProducts = allProduct.length && allProduct.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );




    const imageUpload = (image) => {
        const formData = new FormData();
        formData.append("image", image);

        const url = `http://localhost:5000/api/v1/image/upload-image`;

        return fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imageData) => {
                const imageUrl = imageData.imageUrl;
                return imageUrl;
            });
    };


    const dataSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const product = selectedOption
        const form = e.target
        const MetaTag = form?.MetaTag?.value
        const MetaTagMetaDescription = form?.MetaDescription?.value
        const MetaImageFile = form?.MetaImage?.files[0]
        const MetaImage = await imageUpload(MetaImageFile)

        const warehouse = form.warehouse.value
        const area = form?.area?.value || null
        const rack = form?.rack?.value || null
        const self = form?.self?.value || null
        const cell = form?.cell?.value || null

        const warehouseValue = [{ name: warehouse }, { name: area }, { name: rack }, { name: self }, { name: cell }]

        const data = product
        data.shopId = shopInfo._id
        data.metaTitle = MetaTag
        data.metaDescription = MetaTagMetaDescription
        data.MetaImage = MetaImage
        data.warehouseValue = warehouseValue
        data.adminWare = adminWare
        data.woo = true
        data.daraz = false

        console.log(data);
        fetch('http://localhost:5000/api/v1/seller/woo-product/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
            , body: JSON.stringify({ data })
        }).then((res) => res.json()).then((data) => {
            setLoading(false)
            console.log(data);
            if (data.error) {
                Swal.fire(`${data.message}`, '', 'warning')
            }
            else {
                Swal.fire('success', '', 'success')
            }
        })

    }


    return (
        <div>
            <h1 className="text-center">Add Woo Product</h1>
            <form onSubmit={dataSubmit} className='mt-4' action="">
                <div className="relative inline-block w-full">
                    <button
                        className='w-full'
                        type="button"
                        onClick={() => handleSelectChange(false)}
                    >
                        {selectedOption ? (
                            <span className='border w-full p-2 px-4 rounded-md bg-white flex items-center space-x-2'>
                                <img
                                    src={selectedOption.images[0].src}
                                    alt={`Selected Product`}
                                    className="border border-black rounded-sm"
                                    style={{ height: '24px', width: '24px' }}
                                />
                                <span className='capitalize'>{selectedOption.name}</span>
                            </span>
                        ) : (
                            <>
                                {allProduct?.length ? (
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
                                        <span>Your Products are loading, so please wait...</span>
                                    </span>
                                )}
                            </>
                        )}
                    </button>

                    {/* Dropdown with Search */}
                    {!selectedOption && allProduct.length ? (
                        <div className="mt-1 p-2 max-h-40 overflow-y-scroll bg-white border rounded-md">
                            {filteredProducts.length ? (
                                <span>
                                    {filteredProducts.map((product, i) => (
                                        <div
                                            key={i}
                                            onClick={() => handleSelectChange(product)}
                                            className="cursor-pointer hover:bg-gray-100 p-2 flex items-center space-x-2"
                                        >
                                            <div className='w-6'> <span>{i + 1}</span></div>
                                            <img
                                                src={product.images[0].src}
                                                alt={`Product ${i + 1}`}
                                                className="border border-black rounded-sm"
                                                style={{ height: '24px', width: '24px' }}
                                            />
                                            <span className='capitalize'>{`   ${product.name}`}</span>
                                        </div>
                                    ))}
                                </span>
                            ) : "No product found"}
                        </div>
                    ) : ''}
                </div>


                <WareHouse shopInfo={shopInfo} adminWare={adminWare} setAdminWare={setAdminWare} />
                <Meta />
                <div className="mt-4">
                    {
                        loading ?
                            <button type='button' className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4">
                                <span className="text-sm font-medium">
                                    Loading...
                                </span>
                                <svg className="animate-spin h-4 w-4 ml-3 text-white" viewBox="0 0 24 24">

                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                </svg>
                            </button>

                            :
                            <button type='submit'

                                className={!loading ? "group relative cursor-pointer inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 " : "group relative inline-flex items-center overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none mt-4 cursor-not-allowed"}

                            >
                                <span className="absolute -end-full transition-all group-hover:end-4">
                                    <BsArrowRight />
                                </span>

                                <span className="text-sm font-medium transition-all group-hover:me-4">
                                    Upload Product
                                </span>
                            </button>
                    }
                </div>
            </form>
        </div>
    );
};

export default AddWooProduct;