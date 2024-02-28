import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import JoditEditor from "jodit-react";
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const SendEmail = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);


    const { data: options = [], refetch } = useQuery({
        queryKey: ["options"],
        queryFn: async () => {
            const res = await fetch("https://backend.doob.com.bd/api/v1/users");
            const data = await res.json();
            return data;
        },
    });




    const filteredOptions = options?.filter((option) =>
        option?.email?.toLowerCase().includes(searchTerm?.toLowerCase())

    ).slice(0, 4);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCheckboxChange = (option) => {
        if (selectedOptions.includes(option?.email)) {
            setSelectedOptions((prevSelected) =>
                prevSelected.filter((selected) => selected !== option?.email)
            );
        } else {
            setSelectedOptions((prevSelected) => [...prevSelected, option?.email]);
        }
    };

    const handleDeleteClick = (selected) => {
        setSelectedOptions((prevSelected) =>
            prevSelected.filter((item) => item !== selected)
        );
    };

    useEffect(() => {

        setSearchTerm('');
    }, [selectedOptions]);


    const [selectedMedia, setSelectedMedia] = useState('Select Your Option');

    const handleGetaway = (event) => {
        const selectedValue = event.target.value;
        setSelectedMedia(selectedValue);
    };


    const [loading, setLoading] = useState(false)

    const emailData = (event) => {
        setLoading(true)
        event.preventDefault();
        const form = event.target;
        const subject = form.subject.value
        const message = form.message.value
        const select = selectedMedia
        let formData = ''
        if (selectedMedia === 'Select By Email') {
            formData = {
                subject,
                message,
                users: selectedOptions,
                select
            }
        }
        else {

            formData = {
                subject,
                message,
                select,


            }
        }
        fetch('https://backend.doob.com.bd/api/v1/admin/send-email', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                formData
            )
        })
            .then(response => response.json())
            .finally(() => {
                setLoading(false)
                alert(data.message)
                form.reset()
            })


    }


    return (
        <div >



            <form onSubmit={emailData} className='border p-4 border-collapse'>
                <select
                    name="HeadlineAct"
                    id="HeadlineAct"
                    onChange={handleGetaway}
                    value={selectedMedia}
                    className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                >
                    <option disabled>Select Your Option</option>
                    <option value="All Users">All Users</option>
                    <option value="All Seller"> All Seller</option>
                    <option value="All Subscriber">All Subscriber</option>
                    <option value="Select By Email">Select By Email</option>

                </select>


                {selectedMedia === 'Select By Email' &&
                    <div>

                        <div>
                            <label for="email" className="block text-sm text-gray-900 ">Search Email Address </label>

                            <input type="email"
                                id="multiSelect"
                                value={searchTerm}
                                onChange={handleInputChange}
                                placeholder="john@example.com" className="flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline" />

                        </div>
                        <div className="mt-2 flex gap-5 flex-wrap">
                            {filteredOptions?.map((option) => (
                                <label key={option?.email} className="block cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={option?.email}
                                        checked={selectedOptions.includes(option?.email)}
                                        onChange={() => handleCheckboxChange(option)}
                                        className="mr-2"
                                    />
                                    {option?.email}
                                </label>
                            ))}
                        </div>
                        <div className="mt-4">
                            <p className="text-lg font-bold text-gray-700">Selected Options:</p>
                            <ul className="flex items-start flex-wrap gap-2 mt-2">
                                {selectedOptions?.map((selected) => (
                                    <li key={selected} className="flex items-center bg-gray-200 px-2 py-0.5 rounded mb-2">
                                        <span className="mr-2 text-sm text-gray-800">
                                            {options?.find((option) => option?.email == selected)?.email}
                                        </span>
                                        <button
                                            onClick={() => handleDeleteClick(selected)}
                                            className="text-red-500 focus:outline-none"
                                        >
                                            &#10005;
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                }
                {selectedMedia !== 'Select Your Option' &&
                    <div>
                        <input type="text"
                            id="multiSelect"
                            name='subject'
                            placeholder="Provide Email Subject" className="flex-grow mt-4 w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline" />

                        <JoditEditor className='mt-4' name="message" id="message"></JoditEditor>

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
                                        Send Email
                                    </span>
                                </button>
                        }</div>}
            </form>


        </div>
    );
};



export default SendEmail;