import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AddCampaign = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const [loading, setLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(false);



    const [selectedProducts, setSelectedProducts] = useState([]);
    const [prices, setPrices] = useState({});

    const handleProductChange = (selectedOptions) => {

        setSelectedProducts(selectedOptions);


        const newPrices = { ...prices };

        selectedOptions.forEach((option) => {
            console.log(option);
            if (!newPrices) {
                newPrices.campingPrice = 0;
            }
        });
        setPrices(newPrices);
    };

    const handlePriceChange = (product, newPrice) => {
        console.log(product, newPrice);
        product.campingPrice = newPrice

        setPrices((prevPrices) => ({ ...prevPrices, product }));
    };

    const handleRemoveProduct = (product) => {
        setSelectedProducts((prevSelected) => prevSelected.filter((p) => p !== product));
        setPrices((prevPrices) => {
            const newPrices = { ...prevPrices };
            delete newPrices[product.value];
            return newPrices;
        });
    };

    console.log(selectedProducts);

    const { shopInfo } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const form = event.target;
        const name = form.name.value
        const MetaTag = form.metaTitle.value
        const MetaDescription = form.metaDescription.value
        const startTime = form.startTime ? form.startTime.value : ''
        const endTime = form.endTime ? form.endTime.value : ''
        const image = form.image.files[0]
        const MetaImage = form.metaImage.files[0]
        const shopId = shopInfo._id
        const products = selectedProducts.map(({ value }) => ({ product: value }))




        const imageFormData = new FormData();
        imageFormData.append("image", image);
        const imageUrl = await uploadImage(imageFormData);

        const metaImageFormData = new FormData();
        metaImageFormData.append("image", MetaImage);
        const metaImage = await uploadImage(metaImageFormData);

        const formData = {
            name,
            image: imageUrl,
            MetaTag,
            MetaDescription,
            MetaImage: metaImage,
            shopId,
            products,
            isFlash: isChecked,
            startTime,
            endTime,
            shopId: shopInfo._id
        }
        postSlider(formData, form)



    };


    const { data: products = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch(`https://backend.doob.com.bd/api/v1/seller/all-products/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });




    async function uploadImage(formData) {
        const url = "https://backend.doob.com.bd/api/v1/image/upload-image";
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        const imageData = await response.json();
        return imageData.imageUrl;
    }

    const postSlider = (data, form) => {
        console.log(data);

        fetch(`https://backend.doob.com.bd/api/v1/seller/add-campaign`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data), // Pass the data object to JSON.stringify
        })
            .then((res) => res.json())
            .then((responseData) => {
                Swal.fire("success", "Your Brand Publish Successfully", "success");
                setLoading(false);
                form.reset();
                handleGoBack();
            });
    };









    return (
        <div className="">
            <button onClick={() => handleGoBack()} type='button' className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500">
                <span className="absolute -start-full transition-all group-hover:start-4">

                    <FaLongArrowAltLeft />

                </span>
                <span className="text-sm font-medium transition-all group-hover:ms-4">Go Back</span>
            </button>

            <h2 className="text-2xl font-semibold text-black mb-6 text-center">Upload a campaign for your shop</h2>

            <div>
                <div className=' border-black p-10 rounded border-dashed border-2  my-4'>
                    <form onSubmit={handleSubmit} action="">

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                Name
                            </label>
                            <input
                                required
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring border-black"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-900">
                                Image Upload
                            </label>
                            <input
                                required
                                type="file"
                                id="image"
                                name="image"
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring border-black"
                            />
                        </div>

                        <label htmlFor="Toggle2" className="inline-flex items-center space-x-4 cursor-pointer ">
                            <span className="block pb-2 font-semibold text-gray-900">Flash Sell</span>
                            <span className="relative">
                                <input
                                    id="Toggle2"
                                    type="checkbox"
                                    className="hidden peer"
                                    checked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                />
                                <div className={`w-10 h-4 rounded-full shadow ${isChecked ? 'bg-violet-400' : 'bg-gray-600'}`}></div>
                                <div
                                    className={`absolute w-6 h-6 rounded-full shadow -inset-y-1 ${isChecked ? 'peer-checked:right-0' : 'peer-checked:left-0'
                                        } peer-checked:left-auto bg-violet-400`}
                                ></div>
                            </span>

                        </label>

                        {isChecked && <div className="mb-4 flex gap-10">
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-900">
                                    Start Time
                                </label>
                                <input
                                    required
                                    type="datetime-local"
                                    name="startTime"
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring border-black"
                                />
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-900">
                                    End  Time
                                </label>
                                <input
                                    required
                                    type="datetime-local"
                                    name="endTime"
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring border-black"
                                />
                            </div>
                        </div>}



                        <div className="mb-4">
                            <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-900">
                                Meta Title
                            </label>
                            <input
                                required
                                type="text"
                                id="metaTitle"
                                name="metaTitle"
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring border-black"
                                placeholder="Enter meta title"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="metaImage" className="block text-sm font-medium text-gray-900">
                                Meta Image
                            </label>
                            <input
                                required
                                type="file"
                                id="metaImage"
                                name="metaImage"
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring border-black"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-900">
                                Meta Description
                            </label>
                            <textarea
                                required
                                id="metaDescription"
                                name="metaDescription"
                                rows="3"
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring border-black"
                                placeholder="Enter meta description"
                            ></textarea>
                        </div>

                        <div className=''>
                            <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-900">
                                Select Product
                            </label>

                            <Select
                                name=''
                                placeholder='Select woo product'
                                options={products.map((data, i) => ({
                                    value: data,
                                    label: (
                                        <div className='flex cursor-pointer gap-4 items-center'>
                                            <div className='flex gap-2 items-center'>
                                                <span>{i + 1}</span>
                                                <img
                                                    src={data.images[0].src}
                                                    className='border border-black rounded-sm'
                                                    style={{ marginRight: '8px', height: '24px', width: '24px' }}
                                                />
                                            </div>
                                            {data.name.split(' ').slice(0, 10).join(' ') + '...'}
                                        </div>
                                    ),
                                }))}
                                isMulti
                                isSearchable
                                onChange={handleProductChange}
                                value={selectedProducts}
                            />

                        </div>

                        <div className='flex flex-col gap-2 mt-4'>
                            {selectedProducts.map((product, i) => (
                                <div key={i + 200} className='flex p-2 px-4 rounded border border-black  gap-2 justify-between items-center'>
                                    <div className='flex items-start'>
                                        <img className='border border-black rounded-sm'
                                            style={{ marginRight: '8px', height: '24px', width: '24px' }} src={product.value.images[0].src} alt="" />
                                        {product.value.name.split(' ').slice(0, 10).join(' ') + '...'}
                                    </div>

                                    <div className='flex gap-4 items-center'>
                                        <span>Regular Price: {product.value.price}</span>
                                        <input
                                            type='number'
                                            placeholder='Camping Price'
                                            className='py-0.5 px-2 border border-black'
                                            value={product.value.campingPrice || ''}
                                            onChange={(e) => handlePriceChange(product.value, e.target.value)}
                                        />
                                        <button type='button' className='bg-red-500 px-2 py-0.5 rounded ml-4' onClick={() => handleRemoveProduct(product)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button disabled={loading || !selectedProducts.length} type='submit' className="group mt-4 relative inline-flex items-center cursor-pointer overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring  disabled:bg-gray-500 disabled:cursor-no-drop">
                            <span className="absolute -start-full transition-all group-hover:start-4">

                                <FaLongArrowAltRight />

                            </span>
                            <span className="text-sm font-medium transition-all group-hover:ms-4">{loading ? 'Uploading ...' : 'Add New Campaign'}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCampaign;