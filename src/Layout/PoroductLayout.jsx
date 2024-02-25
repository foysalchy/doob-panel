import React from 'react';
import Component from './ProductNavber';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Components/Footer/Footer';

const PoroductLayout = () => {
    return (
        <div>
            <Component />
            <Outlet />
            <Footer />
        </div>
    );
};

export default PoroductLayout;