import React, { useState } from 'react';
import { useContext } from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import Swal from 'sweetalert2';

const AddSlider = () => {
    const [selectedFile, setSelectedFile] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileName, setFileName] = useState("");
    const { shopInfo } = useContext(AuthContext)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setFileName(file.name);
        }
    };


    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const [loading, setLoading] = useState(false)
    const UploadSlider = async (e) => {
        e.preventDefault()
        setLoading(true)
        const url = e.target.url.value
        const shop = shopInfo._id
        const imageFormData = new FormData();
        imageFormData.append("image", selectedFile);
        const imageUrl = await uploadImage(imageFormData);

        const data = {
            image: imageUrl,
            link: url,
            shopId: shop,
            // status: false,
            time: new Date(),
            status: true
        };

        console.log(data);
        postSlider(data)

    }


    async function uploadImage(formData) {
        const url = "https://salenow-v2-backend.vercel.app/api/v1/image/upload-image";
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        const imageData = await response.json();
        return imageData.imageUrl;
    }

    const postSlider = (Slider) => {

        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/slider/add`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(Slider),
        })
            .then((res) => res.json())
            .then((data) => {

                Swal.fire("success", "Your Slider Publish Successfully", "success");
                setLoading(false)
                setPreviewUrl("");
                setFileName("");
                handleGoBack()

            });
    };



    return (
        <div>
            <button onClick={() => handleGoBack()} type='button' className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500">
                <span className="absolute -start-full transition-all group-hover:start-4">

                    <FaLongArrowAltLeft />

                </span>
                <span className="text-sm font-medium transition-all group-hover:ms-4">Go Back</span>
            </button>


            <div>
                <div className=' border-black p-10 rounded border-dashed border-2  my-4'>
                    <form onSubmit={UploadSlider} action="">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center w-full  p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer  rounded-xl"
                        >
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    srcSet={previewUrl}
                                    alt="File Preview"
                                    className="mt-2 w-8 h-8"
                                />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-8 h-8 text-gray-500 "
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>
                            )}
                            <h2 className="mt-1 font-medium tracking-wide text-gray-700 ">
                                {fileName ? fileName : " Upload Picture"}
                            </h2>
                            <p className="mt-2 text-xs tracking-wide text-gray-500 ">
                                Upload Your Photo Only.
                            </p>
                            <input
                                required
                                id="dropzone-file"
                                type="file" accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                                name="photo"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>


                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Provide Url</label>
                            <input
                                required
                                name='url'
                                placeholder="www.salenow.vercel.app/"
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-900 focus:outline-none focus:border-blue-500"
                            />
                        </div>



                        <button type='submit' className="group mt-4 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500">
                            <span className="absolute -start-full transition-all group-hover:start-4">

                                <FaLongArrowAltRight />

                            </span>
                            <span className="text-sm font-medium transition-all group-hover:ms-4">{loading ? 'Uploading ...' : 'Add Slider'}</span>
                        </button>
                    </form>
                </div>
            </div>
            <input type='text' />
        </div>
    );
};

export default AddSlider;