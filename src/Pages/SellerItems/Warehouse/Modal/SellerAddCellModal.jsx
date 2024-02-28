import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

const SellerAddCellModal = ({ recall, setOpenModal }) => {

    const { shopInfo } = useContext(AuthContext)

    const [areas, setAreas] = useState([]);
    const [racks, setRacks] = useState([]);
    const [selfs, setSelfs] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedRack, setSelectedRack] = useState('');

    const { data: warehouses = [], refetch } = useQuery({
        queryKey: ["warehouses"],
        queryFn: async () => {
            const res = await fetch(`https://backend.doob.com.bd/api/v1/seller/warehouse/get/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });

    const handleWarehouseChange = async (selectedOption) => {
        const selectedWarehouse = selectedOption.value;
        setSelectedWarehouse(selectedWarehouse);

        const areaRes = await fetch(`https://backend.doob.com.bd/api/v1/seller/warehouse/area/${selectedWarehouse}/${shopInfo._id}`);
        const areaData = await areaRes.json();
        setAreas(areaData);
        setSelectedArea('');
        setRacks([]);
        refetch();
    };

    const handleAreaChange = async (selectedOption) => {
        const selectedArea = selectedOption.value;
        setSelectedArea(selectedArea);


        const rackRes = await fetch(`https://backend.doob.com.bd/api/v1/seller/warehouse/rack/${selectedWarehouse}/${selectedArea}/${shopInfo._id}`);
        const rackData = await rackRes.json();
        setRacks(rackData);
        setSelfs([]);
        refetch();
    };

    const handleReckChange = async (selectedOption) => {
        const selectedRack = selectedOption.value;
        setSelectedRack(selectedRack);

        const selfRes = await fetch(`https://backend.doob.com.bd/api/v1/seller/warehouse/self/${selectedWarehouse}/${selectedArea}/${selectedRack}/${shopInfo._id}`);
        console.log(selfRes);
        const selfData = await selfRes.json();
        setSelfs(selfData);
        refetch();
    };


    const UploadArea = (e) => {
        e.preventDefault();
        const warehouse = e.target.warehouse.value;
        const area = e.target.area.value;
        const rack = e.target.rack.value;
        const self = e.target.self.value;
        const cell = e.target.cell.value;
        const data = {
            warehouse,
            area,
            rack,
            self,
            cell,
            shopId: shopInfo._id
        };

        fetch('https://backend.doob.com.bd/api/v1/seller/warehouse/cell', {
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
                        options={warehouses.length && warehouses.filter((warehouse) => warehouse.status) // Filter based on status
                            .map((warehouse) => ({
                                value: warehouse.name,
                                label: warehouse.name,
                            }))
                        }
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
                        options={areas
                            .filter((area) => area.status) // Filter based on status
                            .map((area) => ({
                                value: area.area,
                                label: area.area,
                            }))
                        }
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
                        onChange={handleReckChange}
                        options={racks
                            ?.filter((rack) => rack.status)
                            .map((rack) => ({
                                value: rack.rack,
                                label: rack.rack,
                            }))
                        }
                        placeholder="Please select"
                    />
                </div>
                <div className="mt-4">
                    <label className="text-sm">Select Self</label>
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
                        name='self'
                        required
                        options={selfs?.filter((selfs) => selfs.status).map((self) => ({
                            value: self.self,
                            label: self.self,
                        }))}
                        placeholder="Please select"
                    />
                </div>

                <div className=" mt-4">
                    <label className="text-sm">Add Cell</label>
                    <input required name='cell' type="text" placeholder="Description" className="w-full p-2 border border-black rounded-md  text-gray-900" />
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


export default SellerAddCellModal;