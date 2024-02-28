import React, { useContext, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Lottie from "lottie-react";
import done from "./done1.json";
import { RxCross2 } from 'react-icons/rx';
import { useQuery } from '@tanstack/react-query';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import { ShopAuthProvider } from '../../../../../AuthProvider/ShopAuthProvide';

const AddNewTicket = ({ OpenSupport, setOpenSupport, refetch }) => {

    const { shop_id, shopUser } = useContext(ShopAuthProvider)

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Provide a Image or PDF');
    const [fileLoad, setFileLoad] = useState(false);
    const [Sccenshort, setSccenshort] = useState(false)
    const [description, setDescription] = useState('')
    const handleInputChange = (event) => {
        setFileLoad(true);
        const formData = new FormData();
        let selected = event.target.files[0];
        formData.append("image", selected);
        const image = uploadImage(formData)
    };

    const uploadImage = async (formData) => {
        const url = `http://localhost:5000/api/v1/image/upload-image`;
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const imageData = await response.json();
        setFileName(imageData.imageUrl);
        setFile(imageData.imageUrl);
        return imageData.imageUrl;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const form = event.target;
        const subject = form.elements.subject.value;
        const time = new Date().getTime(); // Convert time to number
        const ticketDetails = {
            name: shopUser.name,
            shopId: shop_id.shop_id,
            email: shopUser.email,
            userId: shopUser._id,
            subject: subject,
            time: time,
            image: file ? file : false,
            description: description,
            comments: []
        }

        fetch(
            `http://localhost:5000/api/v1/shop/support?token=${shopUser._id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ticketDetails),
            }
        )
            .then((res) => res.json())
            .finally(() => {

                Swal.fire({
                    icon: 'success',
                    title: 'Add Successfully!',
                    showConfirmButton: false,
                    timer: 1000
                })
                form.reset()
                setFile()
                setFileName('Provide a Image or PDF')
                setDescription('')
                refetch()
            })
    }


    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    return (
        <div>
            <div className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${OpenSupport ? "block" : "hidden"}`}>
                <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 text-center ">

                    <div className='flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] px-10'>
                        <div className='pb-2 text-xl font-bold text-white text-center sm:text-2xl'>Request a Support Ticket</div>
                        <div onClick={() => setOpenSupport(!OpenSupport)} className='cursor-pointer bg-gray-300 rounded-full  mb-2 p-2 text-2xl hover:bg-gray-400'>
                            <RxCross2 className='text-xl' />
                        </div>
                    </div>
                    <div className='max-h-[500px] px-10 text-start overflow-y-scroll' >
                        <form onSubmit={handleSubmit}>


                            <div className="my-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Subject:
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4 h-52">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Describe the issue:
                                </label>
                                <ReactQuill
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    className=" h-36"
                                />
                            </div>
                            <div>
                                {!Sccenshort ? (
                                    <button
                                        type="button"
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                        onClick={() => setSccenshort(!Sccenshort)}
                                    >
                                        Add Screenshot
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                        onClick={() => { setSccenshort(!Sccenshort), setFile('') }}
                                    >
                                        No Screenshot
                                    </button>
                                )}
                            </div>
                            {Sccenshort && (
                                <label className="flex mb-4 items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer">
                                    {!file ? (
                                        <FaCloudUploadAlt className="w-6 h-6 text-gray-300 text-gray-500" />
                                    ) : fileLoad ? (
                                        <Lottie className="w-6 h-6" animationData={done} loop={false} />
                                    ) : (
                                        <Lottie className="w-6 h-6" animationData={done} loop={false} />
                                    )}
                                    <h2 className="mx-3 text-gray-400">{fileName}</h2>
                                    <input
                                        id="dropzone-file"
                                        onChange={handleInputChange}
                                        type="file" accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                                        name="photo"
                                        className="hidden"
                                    />
                                </label>
                            )}

                            <button
                                type="submit"
                                className="bg-blue-500 block text-white px-4 mt-4 py-2 rounded hover:bg-blue-700"
                            >
                                Submit Request
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddNewTicket;

