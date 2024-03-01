import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Select from 'react-select';
import BrightAlert from "bright-alert";

const WarehouseModal = ({ modalOpen, setModalOpen, product, doobProduct }) => {


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
            const getWarehouseApiUrl = "http://localhost:5001/api/v1/admin/warehouse";

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


        const getAreaApiUrl = `http://localhost:5001/api/v1/admin/warehouse/area/${selectedWarehouse}`;


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

        const getRackApiUrl = `http://localhost:5001/api/v1/admin/warehouse/rack/${selectedWarehouse}/${selectedArea}`;

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

        const getSelfApiUrl = `http://localhost:5001/api/v1/admin/warehouse/self/${selectedWarehouse}/${selectedArea}/${selectedRack}`;


        const selfRes = await fetch(getSelfApiUrl);
        const selfData = await selfRes.json();


        setSelfs(selfData);
        setSelectedSelf('');
        setSelectedCell('')
    };


    const handleSelfChange = async (selectedOption) => {
        const selectedSelfs = selectedOption.value;
        setSelectedSelf(selectedSelfs);

        const getCellApiUrl = `http://localhost:5001/api/v1/admin/warehouse/cell/${selectedWarehouse}/${selectedArea}/${selectedRack}/${selectedSelf}`;

        const cellsRes = await fetch(getCellApiUrl);
        const cellData = await cellsRes.json();
        setCells(cellData);
        setSelectedCell('')
    };


    const handleCellChange = (selectedOption) => {
        const cell = selectedOption.value
        setSelectedCell(cell)
    }


    const updateInfo = (e) => {
        e.preventDefault()
        const handling = e.target.handling.value
        const commission = e.target.commission.value

        const adminCategory = [{ name: selectedWarehouse }, { name: selectedArea }, { name: selectedRack }, { name: selectedSelf }, { name: selectedCell }]

        const data = {
            handling,
            commission,
            warehouse: doobProduct ? adminCategory : product.warehouse
        }

        fetch(`http://localhost:5001/api/v1/admin/update-product-info?productId=${product._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type':
                    'application/json'
            },
            body: JSON.stringify(data),

        }).then((res) => res.json()).then((data) => {
            console.log(data);
            BrightAlert()
        })
    }


    return (
        <div>
            <div
                className={`fixed left-0 top-0 flex z-50 h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${modalOpen ? "block" : "hidden"
                    }`}
            >
                <form
                    onSubmit={updateInfo}

                    className="w-full max-w-[1070px] rounded-[20px] bg-white px-8 py-12 text-center black:bg-black-2 md:px-[70px] md:py-[60px]"
                >
                    <h3 className="pb-[18px] text-xl font-semibold text-black black:text-white sm:text-2xl">
                        Product Approval
                    </h3>
                    <span
                        className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
                    ></span>
                    <div className='flex flex-col mt-3'>

                        <div className="flex gap-4 justify-center">
                            <div className="mb-4">
                                <h1 className="text-xl font-bold mb-2">Commission</h1>
                                <input type="text" name='commission' className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" placeholder="Enter commission" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold mb-2">Handling Free</h1>
                                <input type="text" className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" name='handling' placeholder="Enter handling free" />
                            </div>
                        </div>
                        {doobProduct && <div>
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
                                {selectedWarehouse && <div className="">
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

                                {selectedArea && <div className="">
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

                                {selectedRack && <div className="">
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

                                {selectedSelf && <div className="">
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

                            <div className='my-4 mb-10'>
                                <strong>Selected Warehouses:</strong>
                                <span className='ml-4'>  {selectedWarehouse && selectedWarehouse}
                                    {selectedArea && ` > ${selectedArea}`}
                                    {selectedRack && ` > ${selectedRack} `}
                                    {selectedSelf && ` > ${selectedSelf}`}
                                    {selectedCell && ` > ${selectedCell}`}
                                </span>
                            </div>
                        </div>
                        }
                    </div>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-1/2 px-3">
                            <button
                                type='button'
                                onClick={() => setModalOpen(false)}
                                className="block w-full rounded-md border border-stroke p-3 text-center text-base font-medium text-black transition hover:border-red-600 hover:bg-red-600 hover:text-white black:text-white"
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="w-1/2 px-3">
                            <button type='submit' className="block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-blue-black">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WarehouseModal;