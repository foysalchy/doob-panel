import React from 'react';
import { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import Swal from 'sweetalert2';

const SellerEditWareHouse = ({ setOpenModal, OpenModal, data, refetch }) => {

    const [image, setImage] = useState(data.img);
    const [uploadFile, setUploadFile] = useState(false)

    const handleImageChange = (e) => {
        setUploadFile(true)
        const selectedImage = e.target.files[0];
        const formData = new FormData();
        formData.append("image", selectedImage);
        const url = `http://localhost:5001/api/v1/image/upload-image`;
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imageData) => {
                setUploadFile(false)
                setImage(imageData.imageUrl)
            })

    }

    const UploadNewWarehouse = (e) => {
        e.preventDefault();
        const name = e.target.name.value
        const slag = e.target.slag.value
        const address = e.target.address.value
        const description = e.target.description.value
        const img = image
        const uploadData = {
            name,
            slag,
            address,
            description,
            img
        }

        fetch(`http://localhost:5001/api/v1/seller/warehouse/update/${data._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                uploadData
            )
        }).then((res) => res.json()).then((data) => {
            Swal.fire('Update Successful', '', 'success')
            setOpenModal(false)
            refetch()
        })

    }


    return (
        <div className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${OpenModal ? "block" : "hidden"}`}>
            <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px]">
                <div className='flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border-b'>
                    <div className='pb-2 text-xl font-bold text-dark text-center sm:text-2xl'>Edit Warehouse</div>
                    <div onClick={() => setOpenModal(!OpenModal)} className='cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500'>
                        <RxCross2 className='text-xl' />
                    </div>
                </div>

                <div className='h-[500px]  text-start overflow-y-scroll' >
                    <form onSubmit={UploadNewWarehouse} action="">
                        <div className=" mt-4">
                            <label className="text-sm">Name</label>
                            <input name='name' defaultValue={data.name} type="text" placeholder="Name Of Warehouse" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                        </div>
                        <div className=" mt-4">
                            <label className="text-sm">Slag</label>
                            <input name='slag' defaultValue={data.slag} type="text" placeholder="Slag" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                        </div>
                        <div className=" mt-4">
                            <label className="text-sm">Address</label>
                            <input name='address' defaultValue={data.address} type="text" placeholder="Address" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                        </div>
                        <div className=" mt-4">
                            <label className="text-sm">Description</label>
                            <textarea name='description' defaultValue={data.description} type="text" placeholder="Description" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                        </div>

                        <div className="flex items-center justify-center w-full mt-4">
                            <label className="flex flex-col rounded-lg border-4 border-dashed w-full group text-center">
                                <div className="flex justify-center items-center max-h-48 w-2/5 mx-auto">
                                    {uploadFile ? <div className="flex py-6 items-center justify-center space-x-2">
                                        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-400"></div>
                                        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-400"></div>
                                        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-400"></div>
                                    </div> :
                                        <img className="h-36 py-4 object-center"
                                            src={image}
                                            srcSet={image}
                                            alt="Current Warehouse Image" />}
                                </div>

                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </label>
                        </div>


                        <button type='submit' className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500 mt-4">
                            <span className="absolute -start-full transition-all group-hover:start-4">

                                <FaLongArrowAltRight />

                            </span>
                            <span className="text-sm font-medium transition-all group-hover:ms-4">Update Warehouse</span>
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};


export default SellerEditWareHouse;