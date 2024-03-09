import React, { useState } from 'react';
import { useContext } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

const SellerAddNewWarehouse = ({ setNewData, refetch, setOpenModal }) => {
    const [nextStae, setNextState] = useState(false)
    const { shopInfo } = useContext(AuthContext)
    const UploadArea = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const slag = e.target.slag.value
        const address = e.target.address.value
        const description = e.target.description.value
        const image = e.target.image.files[0]

        const formData = new FormData();
        formData.append("image", image);
        const url = `https://salenow-v2-backend.vercel.app/api/v1/image/upload-image`;
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imageData) => {
                const image = imageData.imageUrl;
                const data = {
                    img: image,
                    name,
                    slag,
                    address,
                    description,
                    shopId: shopInfo._id,
                    status: true
                };
                postWareHouse(data);
            });
    };

    const postWareHouse = (data) => {

        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/warehouse/post`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (nextStae) {
                    setNewData('Add Area')
                } else {
                    setOpenModal(false)
                }
                Swal.fire("Warehouse Upload Successfully", "", "success");
                refetch()
            });
    };

    return (
        <div>
            <form onSubmit={UploadArea} action="">


                <div className=" mt-4">
                    <label className="text-sm">Name</label>
                    <input required name='name' type="text" placeholder="Description" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                </div>
                <div className=" mt-4">
                    <label className="text-sm">Slag</label>
                    <input required name='slag' type="text" placeholder="Description" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                </div>
                <div className=" mt-4">
                    <label className="text-sm">Address</label>
                    <input required name='address' type="text" placeholder="Description" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                </div>
                <div className=" mt-4">
                    <label className="text-sm">Description</label>
                    <textarea required name='description' type="text" placeholder="Description" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                </div>
                <div className=" mt-4">
                    <label className="text-sm">Upload Image</label>
                    <input accept='image/*' required name='image' type="file" placeholder="Description" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                </div>
                <div className="flex items-center w-full justify-between mt-10">
                    <button type='submit' className="group   relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500">
                        <span className="absolute -start-full transition-all group-hover:start-4">
                            <FaLongArrowAltRight />
                        </span>
                        <span className="text-sm font-medium transition-all group-hover:ms-4">Upload Warehouse</span>
                    </button>
                    <button type='submit' onClick={() => setNextState(true)} className="group text-sm relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500">Next</button>
                </div>
            </form>
        </div>
    );
};

export default SellerAddNewWarehouse;