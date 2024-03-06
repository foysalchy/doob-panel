import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import Swal from 'sweetalert2';

const SellerAddContactPage = () => {
    const [loading, setLoading] = useState(false);


    const { shopInfo } = useContext(AuthContext)

    const dataSubmit = (event) => {
        setLoading(true)
        event.preventDefault();
        const media = selectedMedia
        const URL = event.target.url.value
        const password = event.target?.password?.value
        let formData = {}
        if (password) {
            formData = {
                media,
                URL,
                password,
                shop: shopInfo.shopId
            }
        }
        else {
            formData = {
                media,
                URL,
                shop: shopInfo.shopId
            }
        }

        fetch(`https://salenow-v2-backend.vercel.app/api/v1/shop/contactInfo`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                Swal.fire("success", "Your Category Publish Successfully", "success");

                form.reset();
                setPreDeleteUrl("");
                setFileName("");
                refetch();
            });

        event.target.reset();
    }

    const [selectedMedia, setSelectedMedia] = useState('Choose a Social Media');

    const isEmailCheck = (event) => {
        const selectedValue = event.target.value;
        setSelectedMedia(selectedValue);
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (

        <div className="my-10">
            <h1 className="text-2xl font-bold text-center">
                Publish your contact information
            </h1>
            <div className="md:p-10 p-4 border-2  rounded md:m-10 mt-2">
                <form onSubmit={dataSubmit} className="w-full ">

                    <div className='my-4'>
                        <label className="sr-only text-black" htmlFor="title">Select an option</label>
                        <select name='Media' onChange={isEmailCheck}
                            value={selectedMedia} id="countries" className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline">
                            <option disabled>Choose a Social Media</option>

                            <option value="Facebook">Facebook </option>
                            <option value="Messenger">Messenger</option>
                            <option value="Instagram">Instagram </option>
                            <option value="Whatsapp">Whatsapp </option>
                            <option value="Linkedin">Linkedin </option>
                            <option value="Telegram">Telegram </option>
                            <option value="Viber">Viber </option>
                            <option value="Tumblr">Tumblr </option>
                            <option value="Pinterest">Pinterest </option>
                            <option value="Snapchat">Snapchat </option>
                            <option value="Reddit">Reddit </option>
                            <option value="LINE">LINE </option>
                            <option value="YouTube">YouTube </option>
                            <option value="Twitter">Twitter </option>
                            <option value="Skype">Skype </option>
                        </select>
                    </div>
                    <div>
                        <label className="sr-only text-black" htmlFor="title">
                            Provide URL
                        </label>
                        <input
                            required
                            className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                            placeholder={'Provide Your ' + selectedMedia + ' user name only'}
                            type="text"
                            id="title"
                            name="url"
                        />
                    </div>


                    <div className="mt-4">
                        {
                            loading ?
                                <button disabled className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4">
                                    <span className="text-sm font-medium">
                                        Loading...
                                    </span>
                                    <svg className="animate-spin h-4 w-4 ml-3 text-white" viewBox="0 0 24 24">

                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    </svg>
                                </button>

                                :
                                <button type='submit'
                                    className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "

                                >
                                    <span className="absolute -end-full transition-all group-hover:end-4">
                                        <BsArrowRight />
                                    </span>

                                    <span className="text-sm font-medium transition-all group-hover:me-4">
                                        Add Contact
                                    </span>
                                </button>
                        }

                    </div>
                </form>
            </div>
        </div>

    );
};

export default SellerAddContactPage;