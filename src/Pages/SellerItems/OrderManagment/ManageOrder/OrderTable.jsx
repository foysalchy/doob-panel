import React, { useContext } from 'react';
import { BiCheck } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import TableRow from './TableRow';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';

const OrderTable = () => {
    // const tData = [
    //     {
    //         order_id: 'a1',
    //         product_id: 'p_1',
    //         document: 'invoice',
    //         documentLink: 'www.google.com',
    //         orderNumber: '0172937463653',
    //         orderDate: '12/28/2023 16:40',
    //         pendingSince: '1hour',
    //         PaymentMethod: 'COD',
    //         RetailPrice: '2719.00',
    //         Status: 'aproved',
    //         ShipOnTimeSLA: '01 Jan 2024 23:59',
    //         ReadytoShip: 'www.google.com',
    //         sendTo: 'Mohammed Sharif Muhuripara, GULBAG, Shima Tower5d, Agrabad, Chittagong Bangladesh Invoice Number: SS652637200152965',
    //         sellerSku: "CD-10N",
    //         product: 'CB Beginner Choise New Accoustic Guitar Natural-কালার_ফ্যামিলি:বাদামী',
    //         img: '',

    //     },
    //     {
    //         document: 'invoice',
    //         documentLink: 'www.google.com',
    //         orderNumber: '0172937463653',
    //         orderDate: '12/28/2023 16:40',
    //         pendingSince: '1hour',
    //         PaymentMethod: 'COD',
    //         RetailPrice: '2719.00',
    //         Status: 'pending',
    //         ShipOnTimeSLA: '01 Jan 2024 23:59',
    //         ReadytoShip: 'www.google.com',
    //         sendTo: 'Mohammed Sharif Muhuripara, GULBAG, Shima Tower5d, Agrabad, Chittagong Bangladesh Invoice Number: SS652637200152965',
    //         sellerSku: "CD-10N",
    //         product: 'CB Beginner Choise New Accoustic Guitar Natural-কালার_ফ্যামিলি:বাদামী',
    //         img: '',
    //         status: 'pending',
    //     },
    //     {
    //         document: 'invoice',
    //         documentLink: 'www.google.com',
    //         orderNumber: '0172937463653',
    //         orderDate: '12/28/2023 16:40',
    //         pendingSince: '1hour',
    //         PaymentMethod: 'COD',
    //         RetailPrice: '2719.00',
    //         Status: 'pending',
    //         ShipOnTimeSLA: '01 Jan 2024 23:59',
    //         ReadytoShip: 'www.google.com',
    //         sendTo: 'Mohammed Sharif Muhuripara, GULBAG, Shima Tower5d, Agrabad, Chittagong Bangladesh Invoice Number: SS652637200152965',
    //         sellerSku: "CD-10N",
    //         product: 'CB Beginner Choise New Accoustic Guitar Natural-কালার_ফ্যামিলি:বাদামী',
    //         img: '',
    //         status: 'pending',

    //     },
    // ]

    const { shopInfo } = useContext(AuthContext)

    const { data: tData = [], refetch } = useQuery({
        queryKey: ["sellerOrder"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/seller/order?shopId=${shopInfo._id}`);
            const data = await res.json();
            return data.data;
        },
    });

    return (
        <div className="flex flex-col overflow-hidden mt-4">
            <div className="overflow-x-auto transparent-scroll sm:-mx-6 lg:-mx-8">
                <div className="inline-block  min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full  bg-white border text-center text-sm font-light ">
                            <thead className="border-b  font-medium  ">
                                <tr>
                                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                                        <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-1" />
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 font-[500]">

                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                                        Document
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 font-[500]">
                                        Order No.
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Order Date
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Pending Since
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Payment Method
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Retail Price
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Status
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Ship-on-Time SLA
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Printed
                                    </th>
                                    <th scope="col" className="border-r px-2 py-4 text-sm font-[500]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tData?.map((itm, index) => <TableRow data={itm} index={index} key={index} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTable;