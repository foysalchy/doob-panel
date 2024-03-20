import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Select from 'react-select';

const EditWareHouse = ({ adminWare, setAdminWare, shopInfo }) => {


    const [areas, setAreas] = useState([]);
    const [racks, setRacks] = useState([]);
    const [selfs, setSelfs] = useState([]);
    const [cells, setCells] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedRack, setSelectedRack] = useState('');
    const [selectedSelf, setSelectedSelf] = useState('');
    const [selectedCell, setSelectedCell] = useState('');



    const { data: warehouses = [], refetch, isRefetching } = useQuery({
        queryKey: ["warehouses"],
        queryFn: async () => {
            const getWarehouseApiUrl = adminWare ? "https://salenow-v2-backend.vercel.app/api/v1/admin/warehouse" : `https://salenow-v2-backend.vercel.app/api/v1/seller/warehouse/get/${shopInfo._id}`;

            const res = await fetch(getWarehouseApiUrl);
            if (!res.ok) {
                throw new Error(`Failed to fetch data: ${res.statusText}`);
            }
            const data = await res.json();
            return data;
        },
    });

    const handleWarehouseChange = async (selectedOption) => {
        const selectedWarehouse = selectedOption.value;
        setSelectedWarehouse(selectedWarehouse);
        setRacks([]);
        setSelfs([]);
        setCells([]);
        console.log(selectedWarehouse, adminWare);

        const getAreaApiUrl = `https://salenow-v2-backend.vercel.app/api/v1/seller/warehouse/area/${selectedWarehouse}/${shopInfo._id}`;

        console.log(getAreaApiUrl);

        const areaRes = await fetch(getAreaApiUrl);
        const areaData = await areaRes.json();
        setAreas(areaData);
        setSelectedArea('');
        setSelectedRack('');
        setSelectedSelf('');
        setSelectedCell('')
    };

    const handleAreaChange = async (selectedOption) => {
        const selectedArea = selectedOption.value;
        setSelectedArea(selectedArea);
        setSelfs([]);
        setCells([]);

        const getRackApiUrl = `https://salenow-v2-backend.vercel.app/api/v1/seller/warehouse/rack/${selectedWarehouse}/${selectedArea}/${shopInfo._id}`;

        const rackRes = await fetch(getRackApiUrl);
        const rackData = await rackRes.json();
        setRacks(rackData);
        setSelectedRack('');
        setSelectedSelf('');
        setSelectedCell('')
    };

    const handleReckChange = async (selectedOption) => {
        const selectedRack = selectedOption.value;
        setSelectedRack(selectedRack);
        setCells([]);

        const getSelfApiUrl = `https://salenow-v2-backend.vercel.app/api/v1/seller/warehouse/self/${selectedWarehouse}/${selectedArea}/${selectedRack}/${shopInfo._id}`;

        const selfRes = await fetch(getSelfApiUrl);
        const selfData = await selfRes.json();
        setSelfs(selfData);
        setSelectedSelf('');
        setSelectedCell('')
    };

    const handleSelfChange = async (selectedOption) => {
        const selectedSelfs = selectedOption.value;
        console.log(selectedSelfs);
        setSelectedSelf(selectedSelfs);

        const getCellApiUrl = `https://salenow-v2-backend.vercel.app/api/v1/seller/warehouse/cell/${selectedWarehouse}/${selectedArea}/${selectedRack}/${selectedSelf}/${shopInfo._id}`;

        const cellsRes = await fetch(getCellApiUrl);
        const cellData = await cellsRes.json();
        setCells(cellData);
        setSelectedCell('')
    };


    const handleCellChange = (selectedOption) => {
        const cell = selectedOption.value
        setSelectedCell(cell)
    }


    return (
        <div>
            <div className='border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded'>

                <div className=' gap-10'>
                    <span className='font-bold'>Select Warehouse</span>
                    <button type='button' className='flex justify-start mt-2' >
                        <span onClick={() => { setAdminWare(false); refetch(); setSelectedWarehouse(''); setSelectedArea(''); setSelectedRack(''); setSelectedSelf(''); setSelectedCell('') }} className={adminWare ? "px-4 py-2 bg-gray-600 text-white  " : "px-4 py-2 bg-violet-400"}>{shopInfo.shopName}</span>
                        <span onClick={() => { setAdminWare(true); refetch(); setSelectedWarehouse(''); setSelectedArea(''); setSelectedRack(''); setSelectedSelf(''); setSelectedCell('') }} className={!adminWare ? "px-4 py-2 bg-gray-600 text-white " : "px-4 py-2 bg-violet-400"}>Doob</span>
                    </button>
                </div>


                <div className='flex flex-col mt-3'>
                    <span>Warehouse Information <span className='text-red-500'> *</span></span>

                    <div className='grid md:grid-cols-5 mt-3 gap-4'>
                        <div className="">
                            <label className="text-sm">Select Warehouse</label>
                            <Select
                                className=''
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
                                // required
                                options={isRefetching ? [{ label: 'Loading...', value: null }] : warehouses
                                    .filter((warehouse) => warehouse.status) // Filter based on status
                                    .map((warehouse) => ({
                                        value: warehouse.name,
                                        label: warehouse.name,
                                    }))
                                }
                                placeholder="Please select"
                            />
                        </div>
                        {selectedWarehouse && !adminWare && <div className="">
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
                                // required
                                options={areas
                                    .filter((area) => area.status) // Filter based on status
                                    .map((area) => ({
                                        value: area.area,
                                        label: area.area,
                                    }))
                                }
                                placeholder="Please select"
                            />
                        </div>}

                        {selectedArea && !adminWare && <div className="">
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
                                // required
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
                        </div>}

                        {selectedRack && !adminWare && <div className="">
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
                                // required
                                onChange={handleSelfChange}
                                options={selfs?.filter((selfs) => selfs.status).map((self) => ({
                                    value: self.self,
                                    label: self.self,
                                }))}
                                placeholder="Please select"
                            />
                        </div>}

                        {selectedSelf && !adminWare && <div className="">
                            <label className="text-sm">Select Cell</label>
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
                                name='cell'
                                // required
                                onChange={handleCellChange}
                                options={cells.length && cells?.filter((cell) => cell.status).map((cell) => ({
                                    value: cell.cell,
                                    label: cell.cell,
                                }))}
                                placeholder="Please select"
                            />
                        </div>}

                    </div>

                    <div className='mt-4'>
                        <strong>Selected Warehouses:</strong>
                        <span className='ml-4'>  {selectedWarehouse && selectedWarehouse}
                            {selectedArea && ` > ${selectedArea}`}
                            {selectedRack && ` > ${selectedRack} `}
                            {selectedSelf && ` > ${selectedSelf}`}
                            {selectedCell && ` > ${selectedCell}`}
                        </span>
                    </div>

                </div>



            </div>
        </div>
    );
};

export default EditWareHouse;