import React from 'react';
import SideNavberSeller from '../Pages/Dashboard/SellerDashboard/SideNavberSeller/SideNavberSeller';
import { Outlet } from 'react-router-dom';

const SellerDashLayout = () => {
    return (
        <div className='flex gap-4'>
            <SideNavberSeller />
            <div className='w-full'>
                <Outlet />
            </div>

        </div>
    );
};

export default SellerDashLayout;