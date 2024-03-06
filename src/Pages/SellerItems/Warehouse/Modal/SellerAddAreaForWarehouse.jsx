import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

const SellerAddAreaForWarehouse = ({ setNewData, recall, setOpenModal }) => {
    const [nextStae, setNextState] = useState(false)
    const { shopInfo } = useContext(AuthContext)
    const { data: warehouses = [], refetch } = useQuery({
        queryKey: ["warehouses"],
        queryFn: async () => {
            const res = await fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/warehouse/get/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });

    const filteredWarehouses = warehouses.filter(warehouse => warehouse.status === true);
    const sortedWarehouses = filteredWarehouses.filter(warehouse => warehouse.status).sort((a, b) => a?.name?.localeCompare(b.name));

    const warehouseOptions = sortedWarehouses.map((warehouse) => ({
        value: warehouse.name,
        label: warehouse.name,
    }));


    const UploadArea = (e) => {
        e.preventDefault()
        const warehouse = e.target.warehouse.value
        const area = e.target.area.value
        const data = {
            warehouse,
            area,
            shopId: shopInfo._id,
            status: nextStae
        }
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/warehouse/area/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                data
            )
        }).then((res) => res.json()).then((data) => {
            Swal.fire('Upload Successful', '', 'success')
            recall()
            refetch()
            if (nextStae) {
                setNewData('Add Rack')
            } else {
                setOpenModal(false)
            }
        })
    }
    return (
        <div>
            <form onSubmit={UploadArea} action="">
                <div className="mt-10">
                    <label className="text-sm">Select WareHouse</label>
                    <Select
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                cursor: 'pointer',
                            }),
                            option: (provided) => ({
                                ...provided,
                                cursor: 'pointer',
                            }),
                        }}
                        name='warehouse'
                        required
                        options={warehouseOptions}
                        placeholder="Please select"
                    />
                </div>

                <div className=" mt-4">
                    <label className="text-sm">Add Area</label>
                    <input required name='area' type="text" placeholder="Description" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                </div>


                <div className='flex items-center justify-between mt-10'>
                    <button type='submit' className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500">
                        <span className="absolute -start-full transition-all group-hover:start-4">

                            <FaLongArrowAltRight />

                        </span>
                        <span className="text-sm font-medium transition-all group-hover:ms-4">Add Area</span>
                    </button>
                    <button type='submit' onClick={() => setNextState(true)} className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500">Next</button>
                </div>
            </form>
        </div>
    );
};

export default SellerAddAreaForWarehouse;