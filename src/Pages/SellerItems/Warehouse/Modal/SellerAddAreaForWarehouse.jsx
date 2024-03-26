import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

const SellerAddAreaForWarehouse = ({
    setNewData,
    recall,
    setOpenModal,
    preSelectWarehouse,
    setWareHouses,
    next,
    setNext
}) => {
    const [nextStae, setNextState] = useState(false)

    console.log(preSelectWarehouse.warehouse, 'data-for-warehouse');

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
        e.preventDefault();
        console.log(next);
        const warehouse = next ? preSelectWarehouse.warehouse : e.target?.warehouse?.value;
        const area = e.target.area.value;
        setWareHouses(prevState => ({
            ...prevState,
            area: area,
            warehouse: warehouse
        }));
        const data = {
            warehouse,
            area,
            shopId: shopInfo._id,
            status: true
        };

        console.log(data, 'data is found');
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
                setNext(true)
                setNewData('Add Rack')
            } else {
                setOpenModal(false)
            }
        })
    }

    // const defaultWarehouse = preSelectWarehouse.warehouse && sortedWarehouses.find(warehouse => preSelectWarehouse.warehouse.includes(warehouse.name));



    return (
        <div>
            <form onSubmit={UploadArea} action="">
                {!next && <div className="mt-10">
                    <label className="text-sm">Select WareHouse</label>
                    <select
                        name='warehouse'
                        className="w-full p-2 border border-black rounded-md  text-gray-900"
                    >
                        {warehouseOptions.map((ware) => (
                            <option value={ware.value}>{ware.label}</option>
                        ))}

                    </select>
                </div>
                }
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