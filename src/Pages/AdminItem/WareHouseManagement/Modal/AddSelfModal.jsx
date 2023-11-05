import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Select from 'react-select';
import Swal from 'sweetalert2';
const AddSelfModal = ({ recall, setOpenModal }) => {

    const [areas, setAreas] = useState([]);
    const [racks, setRacks] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [selectedArea, setSelectedArea] = useState('');

    const { data: warehouses = [], refetch } = useQuery({
        queryKey: ["warehouses"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/api/v1/admin/warehouse/");
            const data = await res.json();
            return data;
        },
    });

    const handleWarehouseChange = async (selectedOption) => {
        const selectedWarehouse = selectedOption.value;
        setSelectedWarehouse(selectedWarehouse);

        const areaRes = await fetch(`http://localhost:5000/api/v1/admin/warehouse/area/${selectedWarehouse}`);
        const areaData = await areaRes.json();
        setAreas(areaData);
        setSelectedArea('');
        setRacks([]);
        refetch();
    };

    const handleAreaChange = async (selectedOption) => {
        const selectedArea = selectedOption.value;
        setSelectedArea(selectedArea);


        const rackRes = await fetch(`http://localhost:5000/api/v1/admin/warehouse/rack/${selectedWarehouse}/${selectedArea}`);
        const rackData = await rackRes.json();
        setRacks(rackData);
        refetch();
    };

    const UploadArea = (e) => {
        e.preventDefault();
        const warehouse = e.target.warehouse.value;
        const area = e.target.area.value;
        const rack = e.target.rack.value;
        const self = e.target.self.value;
        const data = {
            warehouse,
            area,
            rack,
            self
        };

        fetch('http://localhost:5000/api/v1/admin/warehouse/self', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then((data) => {
            Swal.fire('Upload Successful', '', 'success');
            setOpenModal(false);
            recall();
            refetch();
        });
    };

    return (
        <div>
            <form onSubmit={UploadArea} action="">
                <div className="mt-10">
                    <label className="text-sm">Select Warehouse</label>
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
                        options={warehouses.map((warehouse) => ({
                            value: warehouse.name,
                            label: warehouse.name,
                        }))}
                        placeholder="Please select"
                    />
                </div>
                <div className="mt-4">
                    <label className="text-sm">Select Area</label>
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
                        onChange={handleAreaChange}
                        name='area'
                        required
                        options={areas.map((area) => ({
                            value: area.area,
                            label: area.area,
                        }))}
                        placeholder="Please select"
                    />
                </div>
                <div className="mt-4">
                    <label className="text-sm">Select Rack</label>
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
                        name='rack'
                        required
                        options={racks?.map((rack) => ({
                            value: rack.rack,
                            label: rack.rack,
                        }))}
                        placeholder="Please select"
                    />
                </div>

                <div className=" mt-4">
                    <label className="text-sm">Add Self</label>
                    <input required name='self' type="text" placeholder="Description" className="w-full p-2 border border-black rounded-md  text-gray-900" />
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


export default AddSelfModal;