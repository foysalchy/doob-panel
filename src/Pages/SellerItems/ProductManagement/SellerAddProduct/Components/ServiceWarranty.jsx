import React from 'react';
import Select from 'react-select';

const ServiceWarranty = () => {
    return (
        <div>
            <div className='border mt-4 border-gray-400 md:px-10 px-3 py-5 w-full bg-gray-100 rounded'>

                <div className='flex flex-col'>
                    <span className='font-bold'>Service And Warranty</span>
                    <small>Sellers can opt to provide warranty for the customers.</small>
                </div>
                <div className='flex flex-col mt-3'>

                    <Select

                        placeholder='Select your Brand'
                        name='warrantyTypes'
                        options={[
                            { value: 'No warranty', label: 'No Warranty' },
                            { value: 'Brand-warranty', label: 'Brand Warranty' },
                            { value: 'Seller-warranty', label: 'Seller Warranty' },

                        ]}
                    />
                </div>






            </div>
        </div>
    );
};

export default ServiceWarranty;