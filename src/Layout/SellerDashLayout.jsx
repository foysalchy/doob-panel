import React from 'react';
import SideNavberSeller from '../Pages/Dashboard/SellerDashboard/SideNavberSeller/SideNavberSeller';
import { Outlet } from 'react-router-dom';

const SellerDashLayout = () => {
    return (
        <div className='flex  h-screen'>
            <SideNavberSeller />
            <div className='flex-1 overflow-y-auto p-4 sm:p-0'>
                <Outlet />
            </div>

        </div>
    );
};

export default SellerDashLayout;