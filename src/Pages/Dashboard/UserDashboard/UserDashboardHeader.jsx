import React from 'react';

const UserDashboardHeader = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-lg font-semibold">Personal Profile</h2>
                    <button className="text-sm" variant="ghost">
                        EDIT
                    </button>
                </div>
                <p className="font-medium text-lg">mdnahid056s</p>
                <p className='text-sm mt-2 text-gray-600'>mdnahid056s@gmail.com</p>
                <p className='text-sm text-gray-600'>nahid000</p>
            </div>
            <div className="bg-gray-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-lg font-semibold">Address Book</h2>
                    <button className="text-sm" variant="ghost">
                        EDIT
                    </button>
                </div>
                <p className="text-sm uppercase mb-1">Default Delivery Address</p>
                <p className="font-medium">klgxfxc</p>
                <p>San Francisco</p>
                <p>Dhaka - Manikganj - Shibloya - Shibloya Shibloy</p>
                <p>(+880) 1728364653</p>
            </div>
            <div className="bg-gray-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-lg font-semibold">Default Billing Address</h2>
                    <button className="text-sm" variant="ghost">
                        EDIT
                    </button>
                </div>
                <p className="font-medium">klgxfxc</p>
                <p>San Francisco</p>
                <p>Dhaka - Manikganj - Shibloya - Shibloya Shibloy</p>
                <p>(+880) 1728364653</p>
            </div>
        </div>
    );
};

export default UserDashboardHeader;