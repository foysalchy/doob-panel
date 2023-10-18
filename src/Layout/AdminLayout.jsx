import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavAdmin from '../Pages/Dashboard/SideNavAdmin/SideNavAdmin';
import MiniSideberAdmin from '../Pages/Dashboard/SideNavAdmin/MiniSideberAdmin';

const AdminLayout = () => {
    return (
        <div>

            <div className='flex gap-8 px-4 '>
                <SideNavAdmin />
                <div className='pr-16 w-full'>
                    <Outlet />
                </div>
                <div className='fixed  right-0 '>
                    <MiniSideberAdmin />
                </div>
            </div>



        </div>
    );
};

export default AdminLayout;