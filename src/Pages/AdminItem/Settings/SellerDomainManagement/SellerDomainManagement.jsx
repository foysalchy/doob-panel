import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { GiSaveArrow } from 'react-icons/gi';
import { RxCrossCircled } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import DeleteModal from '../../../../Common/DeleteModal';
import BrightAlert from 'bright-alert';

const SellerDomainManagement = () => {

    const { logOut, setUser, setShopInfo, setCookie } = useContext(AuthContext)
    const navigate = useNavigate();

    const { data: shops = [], refetch, isLoading } = useQuery({
        queryKey: ["shops"],
        queryFn: async () => {
            const res = await fetch("https://backend.doob.com.bd/api/v1/shop");
            const data = await res.json();
            return data;
        },
    });

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = shops.filter(
        (item) =>
            item?.shopId?.toString().includes(searchQuery) || item?.shopName?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            item?._id?.toString().includes(searchQuery) || item?.domain?.toString().includes(searchQuery)
    );


    const UpdateStatus = (id, status) => {

        fetch(`https://backend.doob.com.bd/api/v1/shop/domainstatus/${id}?status=${status}`,
            {
                method: "Put",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((res) => res.json())
            .then((data) => {

                Swal.fire('status update', '', 'success')
                refetch()
            })

    }


    const directLogin = async (email) => {

        const userId = email.replace(/[@.]/g, '')
        let password = ''
        await fetch(`https://backend.doob.com.bd/api/v1/admin/seller/pass/${userId}`).then((res) => res.json()).then((data) => {
            password = data.password

        })
        const data = {
            email,
            password,
        };
        console.log(data);

        await fetch("https://backend.doob.com.bd/api/v1/auth/sign-in", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {

                console.log(data);
                setUser(data.user);

                if (data.user) {
                    if (data.user.role === 'seller') {
                        fetch(`https://backend.doob.com.bd/api/v1/shop/checkshop?shopEmail=${data?.user?.shopEmail}`)
                            .then((response) => response.json())
                            .then((result) => {
                                console.log(result, '208');
                                if (result) {
                                    setUser(data.user);
                                    setShopInfo(result.information[0])
                                    navigate("/seller/dashboard");
                                }
                                else {

                                    navigate("/seller/shop-register");
                                }

                            });
                    }

                    if (data.user.role === "supperadmin") {
                        navigate("/admin/dashboard");
                    }
                    if (data.user.role === "user") {
                        navigate('/')
                    }

                }



            });
    };

    const [deleteId, setDeletId] = useState('')
    const [OpenModal, setOpenModal] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const Delete = (id) => {
        setOpenModal(true)
        setDeletId(id)
    }


    if (isDelete) {

        fetch(`https://backend.doob.com.bd/api/v1/shop/delete/${deleteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },

        }).then((res) => res.json()).then((data) => {
            setIsDelete(false)
            setDeletId('')
            Swal.fire('Shop is Deleted', '', 'success')
            refetch('')
            console.log(data);
        })

        console.log(deleteId, isDelete);
    }


    const updateShopStatus = (id, status) => {
        console.log(id, status)
        fetch(`https://backend.doob.com.bd/api/v1/seller/update-shopInfo-for-status?id=${id}&status=${status}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        }).then((res) => res.json()).then((data) => {
            console.log(data);

            if (data.success) {
                BrightAlert();
                refetch()
            }
        })
    }


    return (
        <div className="">

            <div className='h-0 w-0'>   <DeleteModal setOpenModal={setOpenModal} OpenModal={OpenModal} setIsDelete={setIsDelete} /></div>

            {!isLoading &&
                <div className="relative w-3/5 my-6">
                    <input
                        type="text"
                        id="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search for..."
                        className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                    />

                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <button type="button" className="text-gray-600 hover:text-gray-700">
                            <span className="sr-only">Search</span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4 text-black"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </button>
                    </span>
                </div>}

            {!isLoading && <section className=" mr-10 mx-auto">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 ">All Shops</h2>
                    <span className="px-3 py-1 text-xs  bg-blue-100 rounded-full d text-blue-400">
                        {shops?.length}
                    </span>
                </div>
                <div className="flex flex-col mt-6">
                    <div className=" overflow-x-auto ">
                        <div className="  py-2 ml-4">
                            <div className="overflow-hidden  border  border-gray-700 md:rounded-lg">
                                <table className="w-full divide-y  divide-gray-700">
                                    <thead className="bg-gray-50 ">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right  text-gray-400"
                                            >
                                                <div className="flex items-center gap-x-3">
                                                    <span>Name</span>
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right  text-gray-400"
                                            >
                                                <button className="flex items-center gap-x-2">
                                                    <span>Status</span>
                                                </button>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right  text-gray-400"
                                            >
                                                <button className="flex items-center gap-x-2">
                                                    <span>Domain Name</span>
                                                </button>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right  text-gray-400"
                                            >
                                                Email address
                                            </th>

                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y  divide-gray-200 ">
                                        {filteredData.map((shop) => (
                                            <tr className='divide-gray-700'>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <div className="flex items-center gap-x-2 relative group">
                                                            <img
                                                                className="w-8 h-8 object-cover"
                                                                src={shop?.logo}
                                                                srcSet={shop?.logo}
                                                                alt=""
                                                            />
                                                            {/* Tooltip */}
                                                            {/* <div className="absolute top-0 z-50 left-0 hidden group-hover:block p-2">
                                                                <img
                                                                    className="w-40 h-20 object-cover"
                                                                    src={shop?.logo}
                                                                    alt="Tooltip Image"
                                                                />
                                                            </div> */}
                                                        </div>
                                                        <div>
                                                            <h2 className="font-medium text-gray-800">{shop?.shopName}</h2>
                                                            <p className="text-sm font-normal text-gray-600">{shop?.shopId}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                {
                                                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        {shop?.domain && <div >
                                                            {
                                                                shop.domain_status === 'true' ?
                                                                    <button onClick={() => UpdateStatus(shop.shopId, false)} className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800">
                                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                        <h2 className="text-sm font-normal text-emerald-500">
                                                                            Active
                                                                        </h2>
                                                                    </button>
                                                                    :
                                                                    <button onClick={() => UpdateStatus(shop.shopId, true)} className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 bg-gray-800">
                                                                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                                        <h2 className="text-sm font-normal text-red-500">
                                                                            Not  Active
                                                                        </h2>
                                                                    </button>
                                                            }
                                                        </div>}
                                                    </td>
                                                }

                                                <td className="px-4 py-4 text-sm   whitespace-nowrap">
                                                    {shop?.domain &&

                                                        <div className='flex gap-2 items-center'>
                                                            {shop?.domain}

                                                        </div>
                                                    }

                                                </td>
                                                <td className="px-4 py-4 text-sm   whitespace-nowrap">
                                                    {shop?.shopEmail}
                                                    <p>{shop.shopNumber}</p>
                                                </td>

                                                <td className="px-4 py-4 text-sm flex gap-3 items-center whitespace-nowrap">
                                                    <button className='text-green-500' onClick={() => directLogin(shop.seller)}>Login</button>
                                                    <button className='text-red-500' onClick={() => Delete(shop._id)}>Delete</button>
                                                    {shop.status == "false" ?
                                                        <button className='text-red-500' onClick={() => updateShopStatus(shop._id, true)}>Disable</button>
                                                        :
                                                        <button className='text-green-500' onClick={() => updateShopStatus(shop._id, false)}>Enable</button>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            }
        </div>
    );
};


export default SellerDomainManagement;