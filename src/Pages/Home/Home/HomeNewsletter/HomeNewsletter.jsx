import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import showAlert from "../../../../Common/alert";
import { BiSupport } from 'react-icons/bi'
import { Link, NavLink, useLocation } from "react-router-dom";

const HomeNewsletter = () => {
      const [email, setEmail] = useState("");
      const [isValid, setIsValid] = useState(true);
      const [error, setError] = useState("");

      const fromNewsLetter = (event) => {
            event.preventDefault();
            fetch(`https://doob.dev/api/v1/admin/subscriber/${email}`, {
                  method: "POST",
                  headers: {
                        "content-type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        if (data.message) {
                              showAlert(`${data.message}`, "", "success");
                              event.target.reset();
                              setEmail("");
                        } else if (data.errorMessage) {
                              setError(data.errorMessage);
                        } else {
                              setError("Something went wrong");
                        }
                  });
      };

 
      return (
               <div className='bg-[#F2F3F7]'>
                        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
                            <h1 className='text-4xl font-extrabold text-center font-inner'>Start Your ecommerce Journey With Doob Today
                            </h1>
                            <div className='flex justify-center mt-5'>
                                <div>
                                10,000+ Merchants Have Joined Doob
                                </div>
                            </div>
                            <div className="grid md:grid-cols-4 grid-cols-2 m-auto gap-2 justify-center mt-10 ">
                              <div className="hidden md:block"></div>
                              <Link className="bg-[#0a68ff] flex gap-1 items-center text-white md:px-4 px-5 md:py-5 py-3 rounded" to="/price">
                                    <text style={{fontSize:'22px',width:'40px',height:'40px',lineHeight:'40px',background:'white',color:'#0a68ff',borderRadius:'50%',textAlign:'center'}} x="20" y="35" font-family="Arial, sans-serif" font-size="30" fill="green">$</text>
                              <b className="md:text-2xl  text-sm">See Pricing</b></Link>
                              <a href="https://wa.me/+8801748414354" className="bg-[#0a68ff] flex gap-1 items-center text-white md:px-4 px-5 md:py-5 py-3 rounded" target="_blank">
                              <BiSupport style={{fontSize:'15px',width:'40px',height:'40px',lineHeight:'40px',background:'white',color:'#0a68ff',borderRadius:'50%',textAlign:'center',padding:'10px'}} />
                                   <b className="md:text-2xl text-sm"> Contact US Now!</b>
                                   </a>
                            </div>
                            
                        </div>
            
                    </div>
             
      );
};

export default HomeNewsletter;
