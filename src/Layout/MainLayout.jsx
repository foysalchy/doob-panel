import React from 'react';
import Header from '../Pages/Components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Components/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;