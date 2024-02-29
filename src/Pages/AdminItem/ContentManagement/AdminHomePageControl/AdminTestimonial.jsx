import React, { useEffect, useState } from 'react';
import CmsTitle from './CmsTitle';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

const AdminTestimonial = ({ setCustomerData }) => {
    const [on, setOn] = useState(false);
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [position, setPosition] = useState('')
    const [description, setDescription] = useState('')
    const [data, setData] = useState([]);


    const addItems = () => {
        setData([...data, {
            id: data.length + 1,
            name: name,
            img: '',
            position: position,
            description: description
        }]);

        setName('');
        setDescription('');
        setPosition('');
    }

    useEffect(() => {
        setCustomerData(data)
    }, [data, name, position, description, setCustomerData, description])

    return (
        <div>
            <section
                style={{
                    transition: 'all 0.3s ease-in-out',
                }}
                className={`border overflow-hidden rounded ${on ? 'max-h-[1000px]' : 'max-h-[60px]'} cursor-pointer `}>
                <header
                    onClick={() => setOn(!on)}
                    className='bg-gray-100 md:p-4 p-2 flex items-center justify-between'>
                    <CmsTitle text=" Most Popular Customers" />

                    <span
                        className='text-gray-500'>
                        {!on ? <FaAngleDown /> : <FaAngleUp />}
                    </span>
                </header>
                <figure
                    className='bg-gray-50 p-3'
                >
                    <div className="form-group flex flex-col gap-2">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="cart border p-6 rounded duration-150 hover:shadow-md">
                                <h3 className="text-md border-b mb-3 pb-2 text-center font-semibold">
                                    Add Customers
                                </h3>

                                <div className='flex flex-col gap-2'>
                                    <label
                                        className='text-sm capitalize '
                                        htmlFor="customerName ">
                                        Customer Name
                                    </label>
                                    <input
                                        id='customerName'
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        type="text"
                                        className='bg-gray-100 text-black border rounded-lg border-gray-500 px-2 py-2'
                                        placeholder='name'
                                        name="customerName" />
                                </div>

                                <div className='flex flex-col gap-2 mt-6'>
                                    <label
                                        className='text-sm capitalize '
                                        htmlFor="customerImg ">
                                        Customer Position
                                    </label>
                                    <input
                                        value={img}
                                        type="file"
                                        className='bg-gray-100 text-black border rounded-lg border-gray-500 px-2 py-2'
                                        placeholder='Customer Photo'
                                        name="customerImg" />
                                </div>

                                <div className='flex flex-col gap-2 mt-6'>
                                    <label
                                        className='text-sm capitalize '
                                        htmlFor="fDescription ">
                                        Customer Position
                                    </label>
                                    <input
                                        onChange={(e) => setPosition(e.target.value)}
                                        value={position}
                                        type="text"
                                        className='bg-gray-100 text-black border rounded-lg border-gray-500 px-2 py-2'
                                        placeholder='Customer Position'
                                        name="customerPosition" />
                                </div>

                                <div className='flex flex-col gap-2 mt-6'>
                                    <label
                                        className='text-sm capitalize '
                                        htmlFor="fDescription ">
                                        Customer Description
                                    </label>
                                    <textarea
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        type="text"
                                        className='bg-gray-100 text-black border rounded-lg border-gray-500 px-2 py-2'
                                        placeholder='Customer Description'
                                        name="customerDescription" />
                                </div>

                                <button onClick={addItems} className='mt-3 bg-gray-900 w-full text-white px-6 py-2 rounded'>+ Add</button>
                            </div>

                            <div className='col-span-2'>
                                <>
                                    <div className="">
                                        <div className="w-full overflow-hidden rounded-md border">
                                            <div className="w-full overflow-x-auto">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                            <th className="px-4 py-3 border-b border-black">Photo</th>
                                                            <th className="px-4 py-3 border-b border-black">Name</th>
                                                            <th className="px-4 py-3 border-b border-black">Position</th>
                                                            <th className="px-4 py-3 border-b border-black">Description</th>
                                                            <th className="px-4 py-3 border-b border-black">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white">
                                                        {!data.length < 1 ?
                                                            data?.map(itm => <tr key={itm?.id} className="text-gray-700">
                                                                <td className="px-4 w-[70px] py-3 border">
                                                                    <div className="flex items-center text-sm">
                                                                        <img className='w-[30px] h-[30px] rounded-full bg-gray-100' src="https://randomuser.me/api/portraits/men/1.jpg" alt="" />
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 w-[200px] py-3 border">
                                                                    <div className="flex items-center text-sm">
                                                                        <p className="text-xs text-gray-600">{itm?.name}</p>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 w-[100px] py-3 border">
                                                                    <div className="flex items-center text-sm">
                                                                        <p className="text-xs text-gray-600">{itm?.position}</p>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3 w-[400px] border">
                                                                    <p className="text-xs text-gray-600">
                                                                        {itm?.description}
                                                                    </p>
                                                                </td>
                                                                <td className="px-4 py-3 flex items-center gap-2 ">
                                                                    <button className="text-red-600 bg-[#ff00482b] duration-150 hover:bg-[#ff004861] px-4 py-1 text-sm rounded-md">
                                                                        Delete
                                                                    </button>
                                                                    <button className="text-blue-600 bg-[#0088ff2b] duration-150 hover:bg-[#005eff61] px-4 py-1 text-sm rounded-md">
                                                                        Edit
                                                                    </button>
                                                                </td>
                                                            </tr>)
                                                            :
                                                            <tr className='h-[500px] bg-gray-50'>
                                                                <td colSpan="5" className="text-center py-4">No Data Found</td>
                                                            </tr>
                                                        }


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            </div>
                        </div>

                    </div>
                </figure>
            </section>

        </div>
    );
};

export default AdminTestimonial;