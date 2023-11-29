import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Select from 'react-select';
import { AuthContext } from '../../../../AuthProvider/UserProvider';

const AddDarazProduct = () => {

    const { shopInfo } = useContext(AuthContext)
    const { data: allProduct = [], refetch } = useQuery({
        queryKey: ["allProduct"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/seller/daraz-product/${shopInfo._id}`);
            const data = await res.json();
            return data;
        },
    });


    return (
        <div>
            <h1 className="text-center">Add Daraz Product</h1>
            <form className='mt-4' action="">
                <Select
                    placeholder='select daraz product'
                    options={[
                        { value: 'chocolate', label: 'Chocolate' },
                        { value: 'strawberry', label: 'Strawberry' },
                    ]}
                />
            </form>
        </div>
    );
};

export default AddDarazProduct;


