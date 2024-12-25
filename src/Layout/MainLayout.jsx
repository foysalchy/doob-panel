import React, { useContext, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import Header from '../Pages/Components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Components/Footer/Footer';
import { BiSupport } from 'react-icons/bi'
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { BsMessenger } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { AuthContext } from '../AuthProvider/UserProvider';
import Search from './Search';
import { ImFacebook } from "react-icons/im";
import { SlSocialTwitter } from "react-icons/sl";
import {
      FaFacebook,
      FaFacebookMessenger,
      FaInstagram,
      FaLine,
      FaLinkedin,
      FaPinterest,
      FaReddit,
      FaSkype,
      FaSnapchat,
      FaSquareXTwitter,
      FaTelegram,
      FaTumblr,
      FaViber,
      FaWhatsapp,
      FaYoutube,
} from "react-icons/fa6";


const MainLayout = () => {
      const [modal, setModal] = useState(false)
      const { search, setSearch } = useContext(AuthContext)
      const modalToggol = () => {
            setModal(!modal);
      };

   const {
            data: contacts = [],
            isLoading,
      } = useQuery({
            queryKey: ["contact"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/contact"
                  );
                  const data = await res.json();
                  return data;
            },
      });
      return (
            <div>
                  <Header></Header>
                  <div className='relative pt-20 w-[100%] bar overflow-hidden'>
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
                                    {contacts.length &&
                                                                  contacts?.map((cont) => (
                                                                        <>
                                                                        <div key={cont._id}>
                                                                                                   {(cont.media === "Facebook" && cont.modal=='true'  && (
                                                                                                         <a
                                                                                                               href={`${cont.URL}`}
                                                                                                               target="_blank"
                                                                                                                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                                                                         >
                                                                                                               <ImFacebook className="cursor-pointer  mx-0  rounded-full text-3xl bg-transparent p-1 " /> Facebook
                                                                                                         </a>
                                                                                                   ))
                                                                                                         ||
                                                                                                         (cont.media === "Twitter"   && cont.modal=='true'   && (
                                                                                                               <a
                                                                                                                     href={`${cont.URL}`}
                                                                                                                     target="_blank"
                                                                                                                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                                                                               >
                                                                                                                     <SlSocialTwitter className="cursor-pointer mx-0  rounded-full text-gray-100  text-3xl bg-transparent p-1 " /> Twitter
                                                                                                               </a>
                                                                                                         )) ||
                                                                                                         (cont.media === "Messenger"  && cont.modal=='true'  && (
                                                                                                               <a href={`${cont.URL}`} target="_blank"  className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50">
                                                                                                                     <FaFacebookMessenger className="cursor-pointer mx-0  rounded-full text-[#ffffff]  bg-transparent p-1  text-3xl" /> Messenger
                                                                                                               </a>
                                                                                                         )) ||
                                                                                                         (cont.media === "Instagram"  && cont.modal=='true'  && (
                                                                                                               <a className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                                                                                     href={`${cont.URL}`}
                                                                                                                     target="_blank"
                                                                                                               >
                                                                                                                     <FaInstagram className="cursor-pointer mx-0  rounded-full text-red-100   text-3xl bg-transparent p-1 " /> Instagram
                                                                                                               </a>
                                                                                                         )) ||
                                                                                                         (cont.media === "Whatsapp"  && cont.modal=='true'  && (
                                                                                                               <a href={`${cont.URL}`} target="_blank"  className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50">
                                                                                                                     <FaWhatsapp className="cursor-pointer mx-0  rounded-full text-3xl bg-transparent p-1 " /> Whatsapp
                                                                                                               </a>
                                                                                                         )) ||
                                                                                                         (cont.media === "Viber"  && cont.modal=='true'  && (
                                                                                                               <a className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                                                                                     href={`${cont.URL}`}
                                                                                                                     target="_blank"
                                                                                                               >
                                                                                                                     <FaViber className="cursor-pointer mx-0  rounded-full text-3xl bg-transparent p-1 " /> Viber
                                                                                                               </a>
                                                                                                         )) ||
                                                                                                         (cont.media === "Telegram"  && cont.modal=='true'  && (
                                                                                                               <a href={`${cont.URL}`} target="_blank"  className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50">
                                                                                                                     <FaTelegram className="cursor-pointer mx-0  rounded-full text-white text-3xl bg-transparent p-1 " /> Telegram
                                                                                                               </a>
                                                                                                         )) ||
                                                                                                         (cont.media === "Skype"  && cont.modal=='true'  && (
                                                                                                               <a href={`${cont.URL}`} target="_blank"  className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50">
                                                                                                                     <FaSkype className="cursor-pointer  mx-0 rounded-full text-3xl bg-transparent p-1 " /> Skype
                                                                                                               </a>
                                                                                                         )) ||
                                                                                                         (cont.media === "YouTube"  && cont.modal=='true'  && (
                                                                                                               <a className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                                                                                     href={`${cont.URL}`}
                                                                                                                     target="_blank"
                                                                                                               >
                                                                                                                     <FaYoutube className="cursor-pointer mx-0  rounded-full text-3xl bg-transparent p-1 " /> YouTube
                                                                                                               </a>
                                                                                                         )) ||
                                                                                                         (cont.media === "LINE"  && cont.modal=='true'  && (
                                                                                                               <a href={`${cont.URL}`} target="_blank"  className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50">
                                                                                                                     <FaLine className="cursor-pointer mx-0  rounded-full text-3xl bg-transparent p-1 " /> LINE
                                                                                                               </a>
                                                                                                         )) ||
                                                                                                         (cont.media === "Reddit"  && cont.modal=='true'  && (
                                                                                                               <a className="flex w-full items-center  mx-0  gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                                                                                     href={`${cont.URL}`}
                                                                                                                     target="_blank"
                                                                                                               >
                                                                                                                     <FaReddit className="bg-transparent p-1 mx-0  text-white border  text-3xl" /> Reddit
                                                                                                               </a>
                                                                                                         )) ||
                                                                                                         (cont.media === "Snapchat"  && cont.modal=='true'  && (
                                                                                                               <a className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                                                                                     href={`${cont.URL}`}
                                                                                                                     target="_blank"
                                                                                                               >
                                                                                                                     <FaSnapchat className=" p-1 mx-0  text-3xl" /> Snapchat
                                                                                                               </a>
                                                                                                         )) ||
                                                                                                         (cont.media === "Pinterest"  && cont.modal=='true'  && (
                                                                                                               <a className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                                                                                     href={`${cont.URL}`}
                                                                                                                     target="_blank"
                                                                                                               >
                                                                                                                     <FaPinterest className="cursor-pointer mx-0  rounded-full text-3xl bg-transparent p-1 " /> Pinterest
                                                                                                               </a>
                                                                                                         )) ||
                                                                                                         (cont.media === "Tumblr"  && cont.modal=='true'  && (
                                                                                                               <a className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                                                                                     href={`${cont.URL}`}
                                                                                                                     target="_blank"
                                                                                                               >
                                                                                                                     <FaTumblr className="cursor-pointer mx-0  rounded-full text-3xl bg-transparent p-1 " /> Tumblr
                                                                                                               </a>
                                                                                                         )) ||
                                                                                                         (cont.media === "Linkedin"  && cont.modal=='true'  && (
                                                                                                               <a className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                                                                                     href={`${cont.URL}`}
                                                                                                                     target="_blank"
                                                                                                               >
                                                                                                                     <FaLinkedin className="cursor-pointer mx-0  text-3xl bg-transparent p-1 " /> Linkedin
                                                                                                               </a>
                                                                                                         ))}
                                                                                             </div>
                                                                   </>
                                                                  ))}
 

                                          <a
                                                href="mailto:info@doob.com.bd"
                                               className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                role="menuitem"
                                                target="_blank"
                                          >
                                                <MdEmail  className="cursor-pointer mx-0  text-3xl bg-transparent p-1 " />  Email
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
