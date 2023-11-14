import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Select from 'react-select';
import Swal from 'sweetalert2';
const AddRackModal = ({ recall, setOpenModal }) => {



    const { data: warehouses = [], refetch } = useQuery({
        queryKey: ["warehouses"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/api/v1/admin/warehouse");
            const data = await res.json();
            return data;
        },
    });

    const filteredWarehouses = warehouses.filter(warehouse => warehouse.status === true);
    const sortedWarehouses = filteredWarehouses.sort((a, b) => a?.name?.localeCompare(b.name));

    const warehouseOptions = sortedWarehouses.filter((rack) => rack.status).slice(0, 5).map((warehouse) => ({
        value: warehouse.name,
        label: warehouse.name,
    }));





    const [areas, setAreas] = useState([]);

    const handleWarehouseChange = async (selectedOption) => {
        const selectedWarehouse = selectedOption.value;
        console.log(selectedWarehouse);
        const res = await fetch(`http://localhost:5000/api/v1/admin/warehouse/area/${selectedWarehouse}`);
        const data = await res.json();
        setAreas(data);
    };


    const UploadArea = (e) => {
        e.preventDefault()
        const warehouse = e.target.warehouse.value
        const area = e.target.area.value
        const rack = e.target.rack.value
        const data = {
            warehouse,
            area,
            rack
        }
        fetch('http://localhost:5000/api/v1/admin/warehouse/rack', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                data
            )
        }).then((res) => res.json()).then((data) => {
            Swal.fire('Upload Successful', '', 'success')
            setOpenModal(false)
            recall()
            refetch()
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
                        onChange={handleWarehouseChange}
                        name='warehouse'
                        required
                        options={warehouseOptions}
                        placeholder="Please select"
                    />
                </div>
                <div className="mt-4">
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
                        name='area'
                        required
                        options={areas.filter((rack) => rack.status).map((area) => ({
                            value: area.area,
                            label: area.area,
                        }))}
                        placeholder="Please select"
                    />
                </div>

                <div className=" mt-4">
                    <label className="text-sm">Add Rack</label>
                    <input required name='rack' type="text" placeholder="Description" className="w-full p-2 border border-black rounded-md  text-gray-900" />
                </div>


                <button type='submit' className="group mt-10 relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500">
                    <span className="absolute -start-full transition-all group-hover:start-4">

                        <FaLongArrowAltRight />

                    </span>
                    <span className="text-sm font-medium transition-all group-hover:ms-4">Add Area</span>
                </button>
            </form>
        </div>
    );
};


export default AddRackModal;