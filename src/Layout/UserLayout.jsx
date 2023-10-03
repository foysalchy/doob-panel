import React from 'react';
import Header from '../Pages/Components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Components/Footer/Footer';

const UserLayout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet />
            <Footer />
        </div>
    );
};

export default UserLayout;