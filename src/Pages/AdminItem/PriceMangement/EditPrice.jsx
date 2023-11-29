import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Swal from 'sweetalert2';


const EditPrice = ({ OpenModal, setOpenModal, FAQInfo, refetch }) => {



    const [benefits, setBenefits] = useState(FAQInfo.benefits);

    const appendBenefit = () => {
        const newBenefits = [...benefits, 'New Benefit'];
        setBenefits(newBenefits);
    };

    const removeBenefit = (indexToRemove) => {
        const newBenefits = benefits.filter((_, i) => i !== indexToRemove);

        setBenefits(newBenefits);
    };




    const handleFAQUpdate = async (e) => {
        e.preventDefault();
        const name = e.target.name.value
        const price = e.target.price.value
        const timeDuration = e.target.timeDuration.value
        const best = e.target.best.value
        const MetaTag = e.target.MetaTag.value
        const MetaDescription = e.target.MetaDescription.value

        const data = {
            name,
            price,
            timeDuration,
            best,
            benefits,
            MetaTag,
            MetaDescription
        }



        try {
            fetch(`http://localhost:5000/api/v1/admin/price/update-price/${FAQInfo._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then((res) => res.json()).then((data) => {
                Swal.fire("Update Price Successful", '', 'success');
                refetch();
                setOpenModal(false)
            })

        } catch (error) {
            console.error("Error updating FAQ:", error);
        }
    };




    const handleBenefitChange = (index, value) => {
        // Create a copy of the benefits array
        const newBenefits = [...benefits];

        // Update the value at the specified index
        newBenefits[index] = value;

        // Update the state with the modified array
        setBenefits(newBenefits);
    };




    return (
        <div className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90  px-4 text-start py-5 ${OpenModal ? "block" : "hidden"}`}>
            <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px] ">
                <div className='flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border border-black-b'>
                    <div className='pb-2 text-xl font-bold text-dark text-center sm:text-2xl'>Update FAQ</div>
                    <div onClick={() => setOpenModal(!OpenModal)} className='cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500'>
                        <RxCross2 className='text-xl' />
                    </div>
                </div>

                <form className='h-[500px] overflow-y-scroll' onSubmit={handleFAQUpdate}>
                    <p className='text-start'>Name</p>
                    <input name='name' className='w-full p-2 my-4 border border-black' defaultValue={FAQInfo.name} />
                    <p className='text-start'>Price</p>
                    <input name='price' className='w-full p-2 my-4 border border-black' defaultValue={FAQInfo.price} />
                    <p className='text-start'>Tag Name</p>
                    <input name='tagname' className='w-full p-2 my-4 border border-black' defaultValue={FAQInfo.tagname} />

                    <p

                        className='text-start'
                    >
                        Time Duration
                    </p>

                    <div className="relative mt-1.5">
                        <input
                            defaultValue={FAQInfo.timeDuration}
                            type="text"
                            name='timeDuration'
                            list="HeadlineActArtist"
                            id="HeadlineAct"
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-black border border-black-gray-300 rounded shadow-sm appearance-none focus:border border-black-purple-400 focus:outline-none focus:shadow-outline"
                            placeholder="Please select"
                        />
                    </div>

                    <datalist name="HeadlineAct" id="HeadlineActArtist">
                        <option value="10Days">10 days</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                        <option value="Lifetime">Lifetime</option>
                    </datalist>

                    <div>
                        <p
                            className='text-start'
                        >
                            Is it Best
                        </p>

                        <select
                            defaultValue={FAQInfo.best}
                            name="best"
                            id="HeadlineAct"
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-black  rounded shadow-sm appearance-none focus:border border-black-purple-400 focus:outline-none focus:shadow-outline"
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div>
                        Benefits:
                        <div className='border p-4'>
                            {
                                benefits.map((data, i) => (
                                    <div className='' >
                                        <div

                                            onInput={(e) => handleBenefitChange(i, e.target.textContent)}
                                            contentEditable
                                            key={i}
                                            name='benefit'
                                            ref={(contentEditable) => {
                                                if (contentEditable) {
                                                    const range = document.createRange();
                                                    const selection = window.getSelection();
                                                    range.selectNodeContents(contentEditable);
                                                    range.collapse(false);
                                                    selection.removeAllRanges();
                                                    selection.addRange(range);
                                                }
                                            }}
                                            className='w-full p-2 my-1 border border-black text-start'

                                        >
                                            {data}
                                        </div>
                                        <button type='button' className='bg-red-500 text-start px-4 py-0.5 mb-2 flex justify-start' onClick={() => removeBenefit(i)}>Remove</button>
                                    </div>
                                ))
                            }
                            <button type='button' className='bg-green-500 px-4 py-1' onClick={appendBenefit}>Add More Benefit</button>
                        </div>
                    </div>

                    <input name='MetaTag' placeholder='Meta Tag' className='w-full p-2 my-4 border border-black' defaultValue={FAQInfo.MetaTag} />
                    <textarea name='MetaDescription' placeholder='Meta Description' className='w-full p-2 my-4 border border-black' defaultValue={FAQInfo.MetaTag} />

                    <div className='flex justify-start'>
                        <button type='submit' className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500 mt-4">
                            <span className="absolute -start-full transition-all group-hover:start-4">
                                <svg className="h-5 w-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <span className="text-sm font-medium transition-all group-hover:ms-4">Update Price</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPrice;