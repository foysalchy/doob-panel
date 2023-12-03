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

    const { data: allProduct = [], refetch } = useQuery({
        queryKey: ["woo-product"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/woo-product/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });



    const imageUpload = (image) => {
        const formData = new FormData();
        formData.append("image", image);

        const url = `https://salenow-v2-backend.vercel.app/api/v1/image/upload-image`;

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
        e.preventDefault()
        const product = e.target.wooProduct.value
        const form = e.target
        const MetaTag = form?.MetaTag?.value
        const MetaTagMetaDescription = form?.MetaDescription?.value
        const MetaImageFile = form?.MetaImage?.files[0]
        const MetaImage = await imageUpload(MetaImageFile)

        const warehouse = form.warehouse.value
        const area = form.area.value
        const rack = form.rack.value
        const self = form.self.value
        const cell = form.cell.value

        const warehouseValue = [{ name: warehouse }, { name: area }, { name: rack }, { name: self }, { name: cell }]

        const data = JSON.parse(product)
        data.shopId = shopInfo._id
        data.metaTitle = MetaTag
        data.metaDescription = MetaTagMetaDescription
        data.MetaImage = MetaImage
        data.warehouseValue = warehouseValue
        data.adminWare = adminWare
        console.log(data);

        fetch('https://salenow-v2-backend.vercel.app/api/v1/seller/woo-product/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
            , body: JSON.stringify({ data })
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            Swal.fire('success', '', 'success')
        })

    }


    return (
        <div>
            <h1 className="text-center">Add Woo Product</h1>
            <form onSubmit={dataSubmit} className='mt-4' action="">
                <Select
                    name='wooProduct'
                    placeholder='select woo product'
                    options={allProduct.length && allProduct.map((data) => (
                        { value: JSON.stringify(data), label: data.name }
                    ))}
                />

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