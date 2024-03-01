import React, { useContext, useState } from 'react';
import Header from '../Pages/Components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Components/Footer/Footer';
import { BiSupport } from 'react-icons/bi'
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { BsMessenger } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { AuthContext } from '../AuthProvider/UserProvider';
import Search from './Search';

const MainLayout = () => {
    const [modal, setModal] = useState(false)
    const { search, setSearch } = useContext(AuthContext)
    const modalToggol = () => {
        setModal(!modal);
    };


    return (
        <div>
            <Header></Header>
            <div className='relative pt-20 w-[100%] overflow-hidden'>
                {<Outlet ></Outlet>}

                {/* {search && <Search />} */}

                <button className='fixed bottom-11 right-3'>
                    <BiSupport onClick={modalToggol} className='text-5xl bg-gray-100 shadow shadow-slate-500 p-2 text-blue-500 rounded-full'></BiSupport>
                </button>
                {modal && <div className='fixed bottom-48 right-20 z-50'>
                    <div
                        className="absolute end-0 z-10 mt-2 w-44 rounded-md border border-gray-100 bg-white shadow-lg"
                        role="menu"
                    >
                        <div className="p-2">


                            <a
                                href="https://wa.me/01792205520"
                                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-teal-700 hover:bg-teal-50"
                                role="menuitem"
                                target="_blank"
                            >
                                <AiOutlineWhatsApp />   Whatsapp
                            </a>

                            <a
                                href="https://www.facebook.com/brightfuturesoft"
                                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
                                role="menuitem"
                                target="_blank"
                            >
                                <BsMessenger />   Messenger
                            </a>

                            <a
                                href="mailto:info@brightfuturesoft.com"
                                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                role="menuitem"
                                target="_blank"
                            >
                                <MdEmail />  Email
                            </a>


                        </div>
                    </div>
                </div>}
            </div>
            <Footer></Footer>
        </div >
    );
};

export default MainLayout;