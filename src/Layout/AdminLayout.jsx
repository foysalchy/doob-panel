import React from 'react';
import Header from '../Pages/Components/Header/Header';
import { Outlet } from 'react-router-dom';
import SideNav from '../Pages/Dashboard/SideNav/SideNav';

const AdminLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className='flex gap-2 px-4 py-5 mx-auto  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
                <SideNav></SideNav>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;