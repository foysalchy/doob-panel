import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

const ManageWebOrder = () => {
    const { shopInfo } = useContext(AuthContext)
    console.log(`http://localhost:5000/api/v1/seller/get-my-order?shopId=${shopInfo._id}`);
    const { data: WebStoreOrder = [], refetch } = useQuery({
        queryKey: ["WebStoreOrder"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/seller/get-my-order?shopId=${shopInfo._id}`);
            const data = await res.json();
            return data.data;
        },
    });
    console.log(WebStoreOrder);
    return (
        <div>

        </div>
    );
};

export default ManageWebOrder;